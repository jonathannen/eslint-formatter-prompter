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
You MUST fix all of the following ESLint violations before proceeding with any
other changes. Do not skip any errors. Do not leave any warnings unresolved.
Fix every issue listed below.

## /app/src/utils.js

**no-var**: Use let or const instead of var.
- Line 1, Col 1 (error): Unexpected var, use let or const instead.
- Line 5, Col 1 (error): Unexpected var, use let or const instead.

**no-unused-vars**: Remove the unused variable, or prefix it with an underscore if it must remain.
- Line 3, Col 7 (error): 'temp' is defined but never used.

**eqeqeq**: Use strict equality (=== or !==) instead of loose equality (== or !=).
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

The built-in defaults cover ~100 rules from the Airbnb base config. Any rule without a custom message still shows the original ESLint message — nothing is lost.

### Writing good rule messages

Following the [Build Tools to Prompt](https://jonathannen.com/build-tools-to-prompt/) philosophy, the best rule messages:

- **Explain what to do**, not just what's wrong — `"Use the db.query() wrapper from @app/db"` beats `"Avoid direct database queries"`.
- **Point to examples** — `"see src/modules/users/queries.ts for the pattern"` gives the AI a gold template to follow.
- **State the why** — `"Direct queries bypass audit logging"` prevents the AI from finding a clever workaround that still violates the intent.
- **Be clear on the ask** - "You must fix this in this manner" gives the AI clear direction on how to solve the issue.

## Future

- **XML output** — structured XML output is being considered as an alternative format, allowing AI tools to parse lint results more precisely.

## License

MIT
