/**
 * Default AI-friendly messages for common ESLint rules (Airbnb base).
 * Each message explains what the AI should do to fix the violation.
 */
const defaultRuleMessages: Record<string, string> = {
  // Possible Errors
  'no-console': 'Remove console statements. Use a proper logging utility if logging is needed.',
  'no-debugger': 'Remove the debugger statement.',
  'no-dupe-args': 'Remove the duplicate argument name in the function definition.',
  'no-dupe-keys': 'Remove the duplicate key in the object literal.',
  'no-duplicate-case': 'Remove the duplicate case label in the switch statement.',
  'no-empty': 'Remove the empty block statement or add a comment explaining why it is empty.',
  'no-extra-semi': 'Remove the unnecessary semicolon.',
  'no-unreachable': 'Remove the unreachable code after return, throw, continue, or break.',
  'no-unsafe-negation':
    'Fix the unsafe negation. Use parentheses to clarify the intended operation.',
  'valid-typeof':
    'Fix the typeof comparison to use a valid string: "undefined", "object", "boolean", "number", "string", "function", "symbol", or "bigint".',

  // Best Practices
  curly: 'Add curly braces to the control statement body.',
  'default-case': 'Add a default case to the switch statement.',
  'dot-notation': 'Use dot notation instead of bracket notation to access the property.',
  eqeqeq: 'Use strict equality (=== or !==) instead of loose equality (== or !=).',
  'guard-for-in':
    'Add an if statement to filter unwanted properties from the prototype chain in the for-in loop.',
  'no-alert': 'Remove the alert/confirm/prompt call. Use a proper UI notification system.',
  'no-caller':
    'Remove the use of arguments.caller or arguments.callee. Refactor to use named functions.',
  'no-else-return': 'Remove the else clause since the if block contains a return statement.',
  'no-empty-function': 'Remove the empty function or add a comment explaining why it is empty.',
  'no-eval': 'Remove the eval() call. Find a safer alternative.',
  'no-extend-native': 'Do not extend native objects. Create a utility function instead.',
  'no-extra-bind': 'Remove the unnecessary .bind() call.',
  'no-fallthrough': 'Add a break statement or a "falls through" comment to the switch case.',
  'no-global-assign': 'Do not reassign global variables. Use a local variable instead.',
  'no-implied-eval':
    'Do not use string arguments with setTimeout/setInterval. Pass a function instead.',
  'no-iterator': 'Do not use the __iterator__ property. Use ES6 iterators and generators.',
  'no-labels': 'Remove the label. Refactor the code to avoid using labeled statements.',
  'no-lone-blocks': 'Remove the unnecessary block statement.',
  'no-loop-func':
    'Do not create functions within loops. Extract the function outside the loop or use a closure.',
  'no-multi-spaces': 'Remove the multiple spaces. Use single spaces.',
  'no-multi-str': 'Do not use multiline strings with backslash. Use template literals instead.',
  'no-new': 'Do not use the new keyword for side effects. Assign the result to a variable.',
  'no-new-func': 'Do not use the Function constructor. Declare the function directly.',
  'no-new-wrappers':
    'Do not use primitive wrapper constructors (new String, new Number, new Boolean). Use the literal form.',
  'no-octal': 'Do not use octal literals. Use the 0o prefix for octal numbers.',
  'no-octal-escape':
    'Do not use octal escape sequences. Use Unicode escape sequences or template literals.',
  'no-param-reassign': 'Do not reassign function parameters. Create a new variable instead.',
  'no-proto': 'Do not use __proto__. Use Object.getPrototypeOf() instead.',
  'no-redeclare':
    'Do not redeclare variables. Use a different name or remove the duplicate declaration.',
  'no-return-assign':
    'Do not use assignment in the return statement. Separate the assignment from the return.',
  'no-return-await':
    'Remove the unnecessary await before return. The async function already wraps the value in a promise.',
  'no-script-url': 'Do not use javascript: URLs. Use event handlers instead.',
  'no-self-assign': 'Remove the self-assignment as it has no effect.',
  'no-self-compare': 'Remove the self-comparison. If checking for NaN, use Number.isNaN().',
  'no-sequences':
    'Do not use the comma operator. Separate the expressions into individual statements.',
  'no-throw-literal': 'Throw an Error object instead of a literal value.',
  'no-unused-expressions': 'Remove the unused expression or convert it to a proper statement.',
  'no-useless-catch': 'Remove the useless catch clause that only rethrows the error.',
  'no-useless-concat': 'Remove the useless string concatenation. Combine the strings into one.',
  'no-useless-escape': 'Remove the unnecessary escape character.',
  'no-useless-return': 'Remove the unnecessary return statement.',
  'no-void': 'Do not use the void operator.',
  'no-with': 'Do not use the with statement. Use local variables instead.',
  'prefer-promise-reject-errors':
    'Pass an Error object to Promise.reject() instead of a non-Error value.',
  radix: 'Add the radix parameter (usually 10) to parseInt().',
  'vars-on-top': 'Move variable declarations to the top of their scope.',
  'wrap-iife': 'Wrap the immediately invoked function expression (IIFE) properly.',
  yoda: 'Reverse the Yoda condition to use natural comparison order (variable first, then literal).',

  // Variables
  'no-delete-var': 'Do not use delete on variables. Delete is only for object properties.',
  'no-shadow': 'Rename the variable to avoid shadowing the outer scope variable.',
  'no-shadow-restricted-names': 'Do not shadow restricted names (undefined, NaN, Infinity, etc.).',
  'no-undef': 'The variable is not defined. Either declare it, import it, or add a global comment.',
  'no-undef-init': 'Remove the explicit initialization to undefined.',
  'no-unused-vars':
    'Remove the unused variable, or prefix it with an underscore if it must remain.',
  'no-use-before-define': 'Move the declaration before its first usage, or reorder the code.',

  // Stylistic
  camelcase: 'Rename the identifier to use camelCase.',
  'func-names': 'Add a name to the function expression.',
  'new-cap':
    'Constructors must start with an uppercase letter. Non-constructors must start with a lowercase letter.',
  'no-array-constructor': 'Use array literal notation [] instead of the Array constructor.',
  'no-bitwise':
    'Do not use bitwise operators. If intentional, add an eslint-disable comment with justification.',
  'no-continue': 'Refactor to avoid using the continue statement.',
  'no-lonely-if': 'Combine the lonely if statement with the outer else into an else-if.',
  'no-mixed-operators': 'Add parentheses to clarify the order of operations.',
  'no-multi-assign': 'Do not chain assignments. Split into separate assignment statements.',
  'no-nested-ternary':
    'Replace the nested ternary with an if-else statement or extract to a function.',
  'no-new-object': 'Use object literal notation {} instead of the Object constructor.',
  'no-plusplus': 'Use += 1 or -= 1 instead of ++ or -- operators.',
  'no-restricted-syntax':
    'This syntax is restricted by the project configuration. Refactor to use an allowed alternative.',
  'no-underscore-dangle': 'Remove the dangling underscore from the identifier name.',
  'no-unneeded-ternary': 'Simplify the unnecessary ternary expression.',
  'one-var': 'Use one variable declaration per line.',
  'operator-assignment':
    'Use the shorthand operator assignment (e.g., x += 1 instead of x = x + 1).',
  'prefer-object-spread': 'Use the object spread syntax {...obj} instead of Object.assign().',
  'spaced-comment': 'Add a space after the comment marker (//, /*, etc.).',

  // ES6
  'arrow-body-style': 'Simplify the arrow function body. Use a concise body when possible.',
  'constructor-super': 'Add a super() call in the constructor of the derived class.',
  'no-class-assign': 'Do not reassign the class declaration.',
  'no-const-assign': 'Do not reassign a const variable. Use let if reassignment is needed.',
  'no-dupe-class-members': 'Remove the duplicate class member.',
  'no-duplicate-imports': 'Combine the duplicate import statements into a single import.',
  'no-new-symbol': 'Do not use new with Symbol. Call Symbol() as a function.',
  'no-this-before-super': 'Do not use this/super before calling super() in the constructor.',
  'no-useless-computed-key':
    'Remove the unnecessary computed property key. Use a static key instead.',
  'no-useless-constructor':
    'Remove the unnecessary constructor. The class will use the default constructor.',
  'no-useless-rename':
    'Remove the useless rename. The import/export/destructuring name is the same.',
  'no-var': 'Use let or const instead of var. Prefer const over let.',
  'object-shorthand': 'Use the shorthand method/property syntax in the object literal.',
  'prefer-arrow-callback':
    'Use an arrow function instead of a function expression for the callback.',
  'prefer-const': 'Use const instead of let since this variable is never reassigned.',
  'prefer-destructuring': 'Use destructuring to extract the value.',
  'prefer-numeric-literals':
    'Use numeric literal syntax (0b, 0o, 0x) instead of parseInt() for binary, octal, and hexadecimal.',
  'prefer-rest-params': 'Use rest parameters (...args) instead of the arguments object.',
  'prefer-spread': 'Use the spread operator instead of .apply().',
  'prefer-template': 'Use template literals instead of string concatenation.',
  'require-yield': 'Add a yield expression in the generator function.',
  'symbol-description': 'Add a description string to the Symbol() call.',

  // Import plugin
  'import/no-unresolved':
    'Fix the import path. The module cannot be resolved. Check the path and ensure the dependency is installed.',
  'import/named': 'Fix the named import. The exported name does not exist in the target module.',
  'import/default': 'Fix the default import. The target module has no default export.',
  'import/namespace':
    'Fix the namespace import. The dereferenced property does not exist in the imported module.',
  'import/export': 'Fix the duplicate or conflicting export.',
  'import/no-named-as-default':
    'Do not import a named export as the default. Use the named import syntax.',
  'import/no-named-as-default-member':
    'Do not access a named export as a property of the default export. Import it directly.',
  'import/no-mutable-exports':
    'Do not export mutable bindings (let/var). Use const or export a function.',
  'import/no-amd': 'Do not use AMD require/define. Use ES module import/export.',
  'import/first': 'Move all imports to the top of the file, before any other statements.',
  'import/no-duplicates': 'Merge the duplicate import statements for this module.',
  'import/extensions': 'Fix the file extension in the import path per project configuration.',
  'import/order': 'Reorder the imports to match the configured import ordering.',
  'import/newline-after-import': 'Add a blank line after the import statements.',
  'import/prefer-default-export':
    'Use a default export since this module only has a single named export.',
  'import/no-absolute-path': 'Do not use absolute paths in imports. Use relative paths.',
  'import/no-dynamic-require': 'Do not use dynamic require(). Use static imports.',
  'import/no-webpack-loader-syntax': 'Do not use webpack loader syntax in imports.',
  'import/no-self-import': 'Remove the self-import. A module must not import itself.',
  'import/no-cycle': 'Break the circular dependency between these modules.',
  'import/no-useless-path-segments':
    'Simplify the import path by removing unnecessary path segments.',
  'import/no-relative-packages':
    'Do not use relative imports to access packages. Use the package name.',

  // Strict
  strict: 'Fix the strict mode directive per project configuration.',
};

export default defaultRuleMessages;
