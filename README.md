# eslint-formatter-prompter

Your linter is already talking to your AI — this makes it say the right things.

`eslint-formatter-prompter` is a concrete implementation of the [Build Tools to Prompt](https://jonathannen.com/build-tools-to-prompt/) approach. It replaces ESLint's default output with structured, directive messages that tell AI _what to fix_ and _why_ — instead of dumping raw lint errors and hoping it figures it out.

## Why?

Standard ESLint output assumes a human developer who understands project conventions. When AI reads `'x' is defined but never used  no-unused-vars`, it might remove the variable, comment out the line, or add an eslint-disable — all technically valid, none necessarily correct.

`eslint-formatter-prompter` solves this by:

1. **Adding directive context** to every rule — not just _what_ failed, but _what to do about it_
2. **Framing output as instructions** — a header tells the AI it MUST fix all violations before proceeding, preventing it from routing around errors
3. **Grouping by rule** — reducing noise and token waste by clustering related violations together
4. **Being fully customizable** — override any rule message, header, or footer to match your project's conventions

## Install

```bash
pnpm add --save-dev eslint-formatter-prompter
```

## Usage

ESLint resolves `eslint-formatter-` prefixed packages automatically, so you just use `prompter`:

```bash
eslint --format prompter .
```

### With Claude Code hooks

The real power comes from running this automatically. Use a [Claude Code PostToolUse hook](https://docs.anthropic.com/en/docs/claude-code/hooks) to lint every file write:

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "command": "eslint --format prompter ${file_path}"
      }
    ]
  }
}
```

Now every time the AI writes a file, it immediately sees actionable lint feedback — creating the tight feedback loop described in [Build Tools to Prompt](https://jonathannen.com/build-tools-to-prompt/).

## Example output

Given a file with lint errors, the formatter produces:

```
The lint tool has found errors. Included in this output is direction on how to resolve these errors. You MUST fix all of the following ESLint violations before proceeding with any other changes. Do not skip any errors. Do not leave any warnings unresolved. Fix every issue listed below.

**no-var**: Replace var with const (if never reassigned) or let (if reassigned). Prefer const. Note that var is function-scoped while let/const are block-scoped — verify this does not change behavior in loops or conditionals.
- Line 1, Col 1 (error): Unexpected var, use let or const instead.
- Line 5, Col 1 (error): Unexpected var, use let or const instead.

**no-unused-vars**: Remove the unused variable. If it is a function parameter that must remain for positional reasons, prefix it with an underscore (_). Do not add an eslint-disable comment or fake usage.
- Line 3, Col 7 (error): 'temp' is defined but never used.

**eqeqeq**: Replace == with === and != with !==. If comparing against null to catch both null and undefined, check whether the project config allows `== null` before changing it.
- Line 8, Col 10 (error): Expected '===' and instead saw '=='.

**Summary**: 4 error(s), 0 warning(s) across 1 file(s).

After fixing all issues, re-run ESLint to confirm zero violations remain.
Do not proceed until the linter passes cleanly.
```

Compare that to the default ESLint output and consider which one an AI is more likely to act on correctly.

## Configuration

Create a `.eslint-formatter-prompter.json` in your project root:

```json
{
  "header": "Fix these lint errors. Do not proceed until all are resolved.",
  "footer": "Run the linter again to verify.",
  "ruleMessages": {
    "no-console": "Remove console statements. Use the logger from @app/logging instead — see src/lib/logger.ts for usage.",
    "import/no-cycle": "Break this circular dependency. See docs/architecture.md for the intended module graph."
  }
}
```

| Option         | Type                     | Description                                                                  |
| -------------- | ------------------------ | ---------------------------------------------------------------------------- |
| `header`       | `string \| null`         | Message shown before violations. Set to `null` to disable.                   |
| `footer`       | `string \| null`         | Message shown after violations. Set to `null` to disable.                    |
| `ruleMessages` | `Record<string, string>` | Per-rule AI instructions. Merged with (and overrides) the built-in defaults. |

The built-in defaults cover ~100 common rules with directive messages that prevent typical AI mistakes (e.g., telling the AI _not_ to add eslint-disable comments, or warning about scoping differences when replacing `var`). Any rule without a custom message still shows the original ESLint message — nothing is lost.

### Custom messages are where the real power is

The built-in messages are a solid starting point, but they are generic by definition. The real payoff comes from **project-specific custom messages** that encode _your_ conventions, _your_ preferred patterns, and _your_ architecture.

A built-in message can say "Remove the console statement." A custom message can say "Remove console statements. Use the logger from @app/logging instead — see src/lib/logger.ts for usage." The difference is the AI knowing exactly what to replace it with, not just what to remove.

Following the [Build Tools to Prompt](https://jonathannen.com/build-tools-to-prompt/) philosophy, the best custom messages:

- **Point to your code** — `"Use the db.query() wrapper from @app/db — see src/modules/users/queries.ts for the pattern"` gives the AI a gold template to follow.
- **State your why** — `"Direct queries bypass audit logging"` prevents the AI from finding a clever workaround that still violates the intent.
- **Name the replacement** — `"Use @app/logging instead"` is better than `"Use a proper logging utility"`. Be specific.
- **Be directive** — `"You must use the Result type from @app/types for all error handling"` gives the AI clear, unambiguous direction.

## Future

- **XML output** — structured XML output is being considered as an alternative format, allowing AI tools to parse lint results more precisely.

## License

MIT
