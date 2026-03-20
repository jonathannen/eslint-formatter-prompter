/**
 * Default AI-friendly messages for common ESLint rules (Airbnb base).
 * Each message tells the AI exactly what to do and what NOT to do,
 * preventing common incorrect fixes.
 */
const defaultRuleMessages: Record<string, string> = {
  // Possible Errors
  'no-console':
    'Remove the console statement entirely. Do not comment it out or wrap it in a condition.',
  'no-debugger': 'Remove the debugger statement entirely. Do not replace it with console.log.',
  'no-dupe-args':
    'Rename the duplicate parameter to a unique, meaningful name. The last duplicate shadows earlier ones — determine which the function body intended to use.',
  'no-dupe-keys':
    'Remove or rename the duplicate object key. The last duplicate silently overwrites earlier ones — determine which value was intended and keep only that one.',
  'no-duplicate-case':
    'Fix the duplicate case value. This is likely a copy-paste error — the duplicate case body probably belongs under a different value. Do not just delete the case block.',
  'no-empty':
    'Add a descriptive comment inside the empty block explaining why it is intentionally empty (e.g., // intentional no-op). Do not add placeholder code.',
  'no-extra-semi': 'Remove the redundant semicolon.',
  'no-unreachable':
    'Remove the unreachable code after the return/throw/break/continue, or move it above the exit statement if it was meant to execute.',
  'no-unsafe-negation':
    'Wrap the relational expression in parentheses: change `!key in obj` to `!(key in obj)` or `!a instanceof B` to `!(a instanceof B)`. Almost always the intent is to negate the result, not the left operand.',
  'valid-typeof':
    'Fix the typeof comparison string. Valid values are: "undefined", "object", "boolean", "number", "string", "function", "symbol", "bigint". This is likely a typo — correct the string to the intended type.',

  // Best Practices
  curly: 'Add curly braces around the control statement body, even for single statements.',
  'default-case':
    'Add a default case to the switch statement. If omission is intentional, add a `// no default` comment as the last item in the switch body.',
  'dot-notation':
    'Replace bracket notation with dot notation: change `obj["prop"]` to `obj.prop`. Only use brackets for dynamic keys or property names with special characters.',
  eqeqeq:
    'Replace == with === and != with !==. If comparing against null to catch both null and undefined, check whether the project config allows `== null` before changing it.',
  'guard-for-in':
    'Add a hasOwn check inside the for-in loop: `if (Object.hasOwn(obj, key))`, or replace the for-in loop with Object.keys(obj).forEach() or Object.entries().',
  'no-alert':
    'Remove the alert/confirm/prompt call. These are browser-native dialogs not suitable for production.',
  'no-caller':
    'Replace arguments.callee with a named function reference. Give the function a name and call it directly for recursion.',
  'no-else-return':
    'Remove the else wrapper since the if block already returns. Keep the code that was inside the else — just un-indent it.',
  'no-empty-function':
    'Add a comment inside the empty function explaining why it is intentionally empty (e.g., // no-op callback). Do not add placeholder code.',
  'no-eval':
    'Remove the eval() call. Use bracket notation for dynamic property access, JSON.parse() for data parsing, or refactor to avoid runtime code evaluation.',
  'no-extend-native':
    'Do not modify native prototypes (Array.prototype, Object.prototype, etc.). Create a standalone utility function instead.',
  'no-extra-bind':
    'Remove the .bind() call — this function does not reference `this`, so the binding has no effect.',
  'no-fallthrough':
    'Add a break statement at the end of the case. If fallthrough is intentional, add a `// falls through` comment instead of a break.',
  'no-global-assign': 'Do not reassign global variables like Object, undefined, or window. Use a local variable with a different name.',
  'no-implied-eval':
    'Pass a function to setTimeout/setInterval instead of a string. Change `setTimeout("code", delay)` to `setTimeout(() => { code }, delay)`.',
  'no-iterator':
    'Replace __iterator__ with the standard Symbol.iterator protocol. Use `[Symbol.iterator]()` method instead.',
  'no-labels':
    'Remove the label and refactor the control flow. Extract inner logic into a function or use a boolean flag instead of labeled break/continue.',
  'no-lone-blocks':
    'Remove the unnecessary wrapping braces. Keep the inner statements — only the block wrapper is redundant.',
  'no-loop-func':
    'This function inside a loop captures a variable that changes each iteration, causing a closure bug. Fix by changing `var` to `let` in the loop, or move the function outside the loop.',
  'no-multi-spaces': 'Replace multiple consecutive spaces with a single space.',
  'no-multi-str':
    'Replace the backslash-newline multiline string with a template literal or string concatenation.',
  'no-new':
    'Assign the constructor result to a variable: `const x = new Thing()`. Do not use `new` purely for side effects.',
  'no-new-func':
    'Replace `new Function(...)` with a standard function declaration or arrow function. Do not construct functions from strings.',
  'no-new-wrappers':
    'Remove `new` from the primitive wrapper. Use `String(val)`, `Number(val)`, or `Boolean(val)` without `new` for type conversion. `new String()` creates an object, not a primitive.',
  'no-octal':
    'Replace the legacy octal literal (leading zero, e.g., 071) with the decimal equivalent or ES6 octal syntax (0o71).',
  'no-octal-escape':
    'Replace the octal escape sequence with a Unicode escape (\\u00XX) or hex escape (\\xXX).',
  'no-param-reassign':
    'Do not reassign function parameters. Create a new local variable: `const result = param + 1` instead of `param = param + 1`.',
  'no-proto':
    'Replace __proto__ with Object.getPrototypeOf() for reading or Object.setPrototypeOf() for writing.',
  'no-redeclare':
    'Remove the duplicate var declaration. Either just reassign the variable (drop the `var` keyword) or use let/const which prevents redeclaration entirely.',
  'no-return-assign':
    'Separate the assignment from the return statement. Put the assignment on its own line, then return the variable. If === was intended instead of =, fix the operator.',
  'no-return-await':
    'Remove the redundant `await` before return — the async function already wraps the value in a Promise. Exception: keep `await` if inside a try block where you need to catch rejections.',
  'no-script-url':
    'Replace the javascript: URL with an event handler. Use addEventListener() or onClick, not `href="javascript:..."`.',
  'no-self-assign':
    'Remove the self-assignment (x = x) — it has no effect. This is likely a typo; check if a different variable was intended on one side.',
  'no-self-compare':
    'Fix the self-comparison (x === x). If checking for NaN, use Number.isNaN(x) instead. Otherwise, this is likely a typo — use the intended variable.',
  'no-sequences':
    'Split the comma-operator expression into separate statements. The comma operator evaluates both expressions but only returns the last value, which is error-prone.',
  'no-throw-literal':
    'Throw an Error object: `throw new Error("message")` instead of throwing a string, number, or other literal. Error objects provide stack traces.',
  'no-unused-expressions':
    'This expression produces a value that is never used. Either assign the result to a variable, call it as a function for its side effect, or remove it.',
  'no-useless-catch':
    'Remove the try/catch — the catch block only rethrows the same error with no added handling. Keep the finally block if one exists.',
  'no-useless-concat':
    'Merge the adjacent string literals into a single string. "a" + "b" should just be "ab".',
  'no-useless-escape':
    'Remove the unnecessary backslash — this character does not need escaping in this context.',
  'no-useless-return':
    'Remove the trailing return statement — the function ends here naturally without it.',
  'no-void': 'Remove the void operator. Use `undefined` directly if needed.',
  'no-with':
    'Replace the with statement with explicit property access or destructuring: `const { x, y } = obj` instead of `with (obj)`.',
  'prefer-promise-reject-errors':
    'Reject with an Error object: `Promise.reject(new Error("message"))` instead of a string or other value. Error objects provide stack traces.',
  radix: 'Add the radix parameter to parseInt(): `parseInt(value, 10)` for decimal parsing.',
  'vars-on-top':
    'Move the var declaration to the top of the function scope. Better yet, convert to let/const with block scoping.',
  'wrap-iife':
    'Wrap the immediately-invoked function expression in parentheses: `(function() { ... }())`.',
  yoda:
    'Reverse the comparison to natural order — put the variable first: change `"red" === color` to `color === "red"`. Flip the operator for inequalities.',

  // Variables
  'no-delete-var':
    'Remove the delete statement — delete is for object properties, not variables. Let the variable go out of scope or set it to null.',
  'no-shadow':
    'Rename the inner variable to avoid shadowing the outer scope variable of the same name. Choose a more specific name that reflects its purpose in this scope.',
  'no-shadow-restricted-names':
    'Rename this identifier — it shadows a JavaScript built-in (undefined, NaN, Infinity, etc.). Using these names as variables causes subtle bugs.',
  'no-undef':
    'This variable is not defined. Add the missing import or declaration. Do not add a dummy declaration — find where this value actually comes from.',
  'no-undef-init':
    'Remove `= undefined` from the declaration — variables are undefined by default. Just use `let x;` instead of `let x = undefined;`.',
  'no-unused-vars':
    'Remove the unused variable. If it is a function parameter that must remain for positional reasons, prefix it with an underscore (_). Do not add an eslint-disable comment or fake usage.',
  'no-use-before-define':
    'Move the declaration above its first usage. Do not change the declaration — reorder the code so definitions come before references.',

  // Stylistic
  camelcase:
    'Rename the identifier to camelCase: e.g., my_var becomes myVar. For destructured properties from external APIs, rename inline: `const { snake_case: camelCase } = obj`.',
  'func-names':
    'Add a name to the function expression: `const x = function myFunc() {}`. Do not convert to an arrow function — that changes `this` binding.',
  'new-cap':
    'Constructors must be capitalized: `new Person()`, not `new person()`. Non-constructor functions must be lowercase. If this is not a constructor, remove `new`.',
  'no-array-constructor':
    'Use array literal syntax: `[1, 2, 3]` instead of `Array(1, 2, 3)`. Note: `new Array(n)` with a single number argument creates a sparse array and is allowed.',
  'no-bitwise':
    'Replace the bitwise operator with the likely intended logical operator: `|` should probably be `||`, `&` should probably be `&&`. If bitwise is intentional, add an eslint-disable comment with justification.',
  'no-continue':
    'Replace the continue statement by inverting the condition: change `if (x) { continue; } doStuff();` to `if (!x) { doStuff(); }`.',
  'no-lonely-if':
    'Convert the lonely if inside else to an else-if: change `else { if (cond) {} }` to `else if (cond) {}`.',
  'no-mixed-operators':
    'Add parentheses to clarify operator precedence. Do not change the operators or logic — just make the grouping explicit.',
  'no-multi-assign':
    'Split the chained assignment into separate statements. `a = b = c = 5` should become three separate assignments, each with its own declaration if needed.',
  'no-nested-ternary':
    'Replace the nested ternary with if/else statements or extract the inner ternary into a named variable. Do not just add parentheses — the nesting must be eliminated.',
  'no-new-object':
    'Use object literal syntax: `{}` instead of `new Object()`.',
  'no-plusplus':
    'Replace ++ with += 1 and -- with -= 1.',
  'no-restricted-syntax':
    'This syntax is restricted by the project ESLint config. Check the rule configuration for the required alternative and follow its custom message.',
  'no-underscore-dangle':
    'Remove the leading/trailing underscore from the identifier. For private class members, use ES2022 private fields (#field) instead.',
  'no-unneeded-ternary':
    'Simplify the ternary. `x ? true : false` should be just `x`. `x ? false : true` should be `!x`. `x ? x : fallback` should be `x || fallback`.',
  'one-var': 'Use one variable declaration per statement: `let a; let b;` instead of `let a, b;`.',
  'operator-assignment':
    'Use the shorthand operator: change `x = x + y` to `x += y`.',
  'prefer-object-spread':
    'Replace Object.assign({}, obj) with spread syntax: `{ ...obj }`. Only applies when the first argument is an object literal.',
  'spaced-comment': 'Add a space after the comment marker: `// comment` not `//comment`.',

  // ES6
  'arrow-body-style':
    'Remove the braces and return keyword from the arrow function: change `() => { return x; }` to `() => x`. For object literals, wrap in parentheses: `() => ({ key: value })`.',
  'constructor-super':
    'Add a super() call in the derived class constructor before any `this` usage. If this is not a derived class, remove the super() call.',
  'no-class-assign': 'Do not reassign the class name. Use a different variable name.',
  'no-const-assign':
    'This variable is declared with const but is being reassigned. Change const to let if reassignment is needed. Do not change const to let if only properties are being mutated — `const obj = {}; obj.key = 1;` is valid.',
  'no-dupe-class-members':
    'Remove or rename the duplicate class member. The last duplicate silently overwrites earlier ones — determine which implementation was intended.',
  'no-duplicate-imports':
    'Merge the duplicate import statements into a single import: `import defaultExport, { named } from "module"`.',
  'no-new-symbol':
    'Remove `new` — Symbol is not a constructor. Call it as a function: `Symbol("description")`.',
  'no-this-before-super':
    'Move super() above the `this` reference in the constructor. Do not remove the `this` usage — reorder so super() comes first.',
  'no-useless-computed-key':
    'Remove the unnecessary brackets from the computed property key: change `{["name"]: value}` to `{name: value}`.',
  'no-useless-constructor':
    'Remove the empty constructor — ES2015 provides an equivalent default constructor automatically.',
  'no-useless-rename':
    'Remove the redundant rename: change `import { foo as foo }` to `import { foo }`.',
  'no-var':
    'Replace var with const (if never reassigned) or let (if reassigned). Prefer const. Note that var is function-scoped while let/const are block-scoped — verify this does not change behavior in loops or conditionals.',
  'object-shorthand':
    'Use shorthand syntax: change `{x: x}` to `{x}` and `{method: function() {}}` to `{method() {}}`. Do not convert arrow function values — they have different `this` binding.',
  'prefer-arrow-callback':
    'Convert the callback to an arrow function. Do not convert if the callback uses its own `this` binding — arrow functions inherit `this` from the enclosing scope.',
  'prefer-const':
    'Change let to const — this variable is never reassigned after initialization.',
  'prefer-destructuring':
    'Use destructuring: change `const x = obj.x` to `const { x } = obj` or `const x = arr[0]` to `const [x] = arr`.',
  'prefer-numeric-literals':
    'Use a numeric literal instead of parseInt: change `parseInt("1A", 16)` to `0x1A`, `parseInt("71", 8)` to `0o71`, `parseInt("11", 2)` to `0b11`.',
  'prefer-rest-params':
    'Replace the arguments object with rest parameters: change `function f() { use(arguments) }` to `function f(...args) { use(args) }`.',
  'prefer-spread':
    'Replace .apply() with spread syntax: change `fn.apply(null, args)` to `fn(...args)`. Only safe when the .apply() context is null, undefined, or the same object.',
  'prefer-template':
    'Replace string concatenation with a template literal: change `"Hello " + name` to `` `Hello ${name}` ``.',
  'require-yield':
    'Add a yield expression to the generator function, or convert it to a regular function if generator behavior is not needed.',
  'symbol-description':
    'Add a descriptive string argument to Symbol(): `Symbol("mySymbol")`. This aids debugging.',

  // Import plugin
  'import/no-unresolved':
    'Fix the import path — the module cannot be resolved. Check for typos, verify the file exists, and ensure the dependency is installed. Do not create a stub file to silence this.',
  'import/named':
    'Fix the named import — this export does not exist in the source module. Check what the module actually exports and use the correct name.',
  'import/default':
    'The imported module has no default export. Switch to a named import: `import { name } from "module"`, or add a default export to the source module if appropriate.',
  'import/namespace':
    'The accessed property does not exist on the namespace import. Check what the module actually exports and use a valid export name.',
  'import/export':
    'Remove the duplicate export. This module exports the same name twice — keep only the intended one.',
  'import/no-named-as-default':
    'You are importing the default export with a name that matches a named export. You likely want a named import: change `import bar from "./foo"` to `import { bar } from "./foo"`.',
  'import/no-named-as-default-member':
    'Use a named import instead of accessing a named export as a property of the default: change `import foo from "./m"; foo.bar` to `import { bar } from "./m"`.',
  'import/no-mutable-exports':
    'Change the exported `let` or `var` to `const`. If the value must change, export a getter function instead of a mutable binding.',
  'import/no-amd':
    'Replace AMD define/require with ES module import/export syntax.',
  'import/first':
    'Move all import statements to the top of the file, before any executable code.',
  'import/no-duplicates':
    'Merge the duplicate imports from this module into a single import statement.',
  'import/extensions':
    'Fix the file extension in the import path to match the project ESLint config (add or remove the extension as required).',
  'import/order':
    'Reorder the imports to match the configured group order (typically: builtins, external packages, internal, parent, sibling, index).',
  'import/newline-after-import':
    'Add a blank line after the last import statement, before any other code.',
  'import/prefer-default-export':
    'This module has a single named export. Convert it to a default export, or add additional exports if more are planned.',
  'import/no-absolute-path':
    'Replace the absolute import path with a relative path or package alias.',
  'import/no-dynamic-require':
    'Replace the dynamic require() with a static string path or refactor to use ES module import().',
  'import/no-webpack-loader-syntax':
    'Remove the Webpack loader prefix (!) from the import path. Configure loaders in the Webpack config instead.',
  'import/no-self-import':
    'This module imports itself — likely a refactoring mistake. Remove the self-import or change it to the intended module.',
  'import/no-cycle':
    'Break the circular dependency. Extract shared code into a separate module that both sides can import, use dependency injection, or restructure the module boundaries. Do not just move the import to a different line.',
  'import/no-useless-path-segments':
    'Simplify the import path by removing unnecessary segments (extra ../, double slashes, trailing /index).',
  'import/no-relative-packages':
    'Import the sibling package by its package name instead of a relative path.',

  // Strict
  strict:
    'Fix the "use strict" directive placement per the project ESLint config. In ES modules, remove it entirely — modules are strict by default.',
};

export default defaultRuleMessages;
