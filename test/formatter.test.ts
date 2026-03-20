import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import type { ESLint } from 'eslint';
import { formatResults } from '../src/formatter.js';

function makeResult(filePath: string, messages: Partial<ESLint.LintMessage>[]): ESLint.LintResult {
  const fullMessages = messages.map((m) => ({
    ruleId: m.ruleId ?? null,
    severity: m.severity ?? 2,
    message: m.message ?? '',
    line: m.line ?? 1,
    column: m.column ?? 1,
    nodeType: m.nodeType ?? null,
  })) as ESLint.LintMessage[];

  return {
    filePath,
    messages: fullMessages,
    errorCount: fullMessages.filter((m) => m.severity === 2).length,
    warningCount: fullMessages.filter((m) => m.severity === 1).length,
    fixableErrorCount: 0,
    fixableWarningCount: 0,
    usedDeprecatedRules: [],
    suppressedMessages: [],
  };
}

describe('formatResults', () => {
  it('returns empty string when no issues', () => {
    const result = formatResults([makeResult('/app/clean.js', [])]);
    assert.equal(result, '');
  });

  it('formats a single error with default header and footer', () => {
    const result = formatResults([
      makeResult('/app/src/index.js', [
        {
          ruleId: 'no-unused-vars',
          severity: 2,
          message: "'x' is defined but never used",
          line: 5,
          column: 7,
        },
      ]),
    ]);

    assert.ok(result.includes('You MUST fix all'));
    assert.ok(result.includes('**no-unused-vars**'));
    assert.ok(result.includes('Remove the unused variable'));
    assert.ok(result.includes('Line 5, Col 7 (error)'));
    assert.ok(result.includes('1 error(s), 0 warning(s)'));
    assert.ok(result.includes('re-run ESLint'));
  });

  it('formats warnings correctly', () => {
    const result = formatResults([
      makeResult('/app/foo.js', [
        {
          ruleId: 'no-console',
          severity: 1,
          message: 'Unexpected console statement',
          line: 10,
          column: 3,
        },
      ]),
    ]);

    assert.ok(result.includes('Line 10, Col 3 (warning)'));
    assert.ok(result.includes('0 error(s), 1 warning(s)'));
  });

  it('groups multiple violations of the same rule', () => {
    const result = formatResults([
      makeResult('/app/bar.js', [
        {
          ruleId: 'no-var',
          severity: 2,
          message: 'Unexpected var, use let or const instead.',
          line: 1,
          column: 1,
        },
        {
          ruleId: 'no-var',
          severity: 2,
          message: 'Unexpected var, use let or const instead.',
          line: 5,
          column: 1,
        },
        {
          ruleId: 'prefer-const',
          severity: 2,
          message: "'x' is never reassigned. Use 'const' instead.",
          line: 3,
          column: 5,
        },
      ]),
    ]);

    // no-var should appear once as a heading with two items under it
    const noVarMatches = result.match(/\*\*no-var\*\*/g);
    assert.equal(noVarMatches?.length, 1);

    assert.ok(result.includes('Line 1, Col 1'));
    assert.ok(result.includes('Line 5, Col 1'));
    assert.ok(result.includes('**prefer-const**'));
  });

  it('supports custom header and footer', () => {
    const result = formatResults(
      [
        makeResult('/app/x.js', [
          {
            ruleId: 'eqeqeq',
            severity: 2,
            message: "Expected '===' and instead saw '=='.",
            line: 1,
            column: 1,
          },
        ]),
      ],
      { header: 'CUSTOM HEADER', footer: 'CUSTOM FOOTER' },
    );

    assert.ok(result.startsWith('CUSTOM HEADER'));
    assert.ok(result.includes('CUSTOM FOOTER'));
    assert.ok(!result.includes('You MUST fix'));
  });

  it('supports disabling header and footer with null', () => {
    const result = formatResults(
      [
        makeResult('/app/x.js', [
          {
            ruleId: 'eqeqeq',
            severity: 2,
            message: "Expected '===' and instead saw '=='.",
            line: 1,
            column: 1,
          },
        ]),
      ],
      { header: null, footer: null },
    );

    assert.ok(!result.includes('You MUST fix'));
    assert.ok(!result.includes('re-run ESLint'));
    assert.ok(result.startsWith('**eqeqeq**'));
  });

  it('supports custom rule messages', () => {
    const result = formatResults(
      [
        makeResult('/app/x.js', [
          { ruleId: 'eqeqeq', severity: 2, message: "Expected '==='.", line: 1, column: 1 },
        ]),
      ],
      { ruleMessages: { eqeqeq: 'ALWAYS use triple equals, no exceptions.' } },
    );

    assert.ok(result.includes('ALWAYS use triple equals'));
    assert.ok(!result.includes('Use strict equality'));
  });

  it('handles unknown rules gracefully', () => {
    const result = formatResults([
      makeResult('/app/x.js', [
        {
          ruleId: 'some-plugin/obscure-rule',
          severity: 2,
          message: 'Something is wrong',
          line: 1,
          column: 1,
        },
      ]),
    ]);

    assert.ok(result.includes('**some-plugin/obscure-rule**'));
    assert.ok(result.includes('Something is wrong'));
  });

  it('handles multiple files grouped by rule', () => {
    const result = formatResults([
      makeResult('/app/a.js', [
        { ruleId: 'no-var', severity: 2, message: 'Unexpected var.', line: 1, column: 1 },
      ]),
      makeResult('/app/b.js', [
        {
          ruleId: 'no-console',
          severity: 1,
          message: 'Unexpected console statement.',
          line: 2,
          column: 1,
        },
      ]),
    ]);

    // Rules should appear as top-level headings, files indented underneath
    assert.ok(result.includes('**no-var**'));
    assert.ok(result.includes('/app/a.js:'));
    assert.ok(result.includes('**no-console**'));
    assert.ok(result.includes('/app/b.js:'));
    assert.ok(result.includes('1 error(s), 1 warning(s) across 2 file(s)'));
  });

  it('groups same rule across multiple files together', () => {
    const result = formatResults([
      makeResult('/app/a.js', [
        { ruleId: 'no-var', severity: 2, message: 'Unexpected var.', line: 1, column: 1 },
      ]),
      makeResult('/app/b.js', [
        { ruleId: 'no-var', severity: 2, message: 'Unexpected var.', line: 3, column: 1 },
      ]),
    ]);

    // no-var should appear only once, with both files listed underneath
    const noVarMatches = result.match(/\*\*no-var\*\*/g);
    assert.equal(noVarMatches?.length, 1);
    assert.ok(result.includes('/app/a.js:'));
    assert.ok(result.includes('/app/b.js:'));
  });

  it('omits file path line for single-file results', () => {
    const result = formatResults([
      makeResult('/app/a.js', [
        { ruleId: 'no-var', severity: 2, message: 'Unexpected var.', line: 1, column: 1 },
      ]),
    ]);

    // Single file should not show indented file paths under rules
    assert.ok(!result.includes('/app/a.js:'));
    assert.ok(result.includes('**no-var**'));
  });

  it('skips files with no messages', () => {
    const result = formatResults([
      makeResult('/app/clean.js', []),
      makeResult('/app/dirty.js', [
        { ruleId: 'no-var', severity: 2, message: 'Unexpected var.', line: 1, column: 1 },
      ]),
    ]);

    assert.ok(!result.includes('clean.js'));
    assert.ok(result.includes('**no-var**'));
    assert.ok(result.includes('across 1 file(s)'));
  });
});
