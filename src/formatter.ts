import path from 'node:path';
import type { ESLint, Linter } from 'eslint';
import defaultRuleMessages from './rule-messages.js';
import { loadConfig, type PrompterConfig } from './config.js';

const DEFAULT_HEADER = `The lint tool has found errors. Included in this output is direction on how to resolve these errors. You MUST fix all of the following ESLint violations before proceeding with any other changes. Do not skip any errors. Do not leave any warnings unresolved. Fix every issue listed below.`;

const DEFAULT_FOOTER = `After fixing all issues, re-run ESLint to confirm zero violations remain. Do not proceed until the linter passes cleanly.`;

interface FileViolation {
  filePath: string;
  message: Linter.LintMessage;
}

interface RuleGroup {
  violations: FileViolation[];
}

function groupByRule(results: ESLint.LintResult[]): Map<string, RuleGroup> {
  const groups = new Map<string, RuleGroup>();
  for (const result of results) {
    for (const msg of result.messages) {
      const ruleId = msg.ruleId ?? 'unknown';
      let group = groups.get(ruleId);
      if (!group) {
        group = { violations: [] };
        groups.set(ruleId, group);
      }
      group.violations.push({ filePath: result.filePath, message: msg });
    }
  }
  return groups;
}

function severityLabel(severity: number): string {
  return severity === 2 ? 'error' : 'warning';
}

/**
 * Look up a rule message, falling back from scoped rules (e.g. @typescript-eslint/no-unused-vars)
 * to the base rule name (no-unused-vars) if no specific message exists.
 */
function getRuleMessage(ruleId: string, ruleMessages: Record<string, string>): string | undefined {
  if (ruleMessages[ruleId]) {
    return ruleMessages[ruleId];
  }
  // Try base rule name: @scope/plugin/rule-name -> rule-name, @scope/rule-name -> rule-name
  const slashIndex = ruleId.lastIndexOf('/');
  if (slashIndex !== -1) {
    const baseRule = ruleId.slice(slashIndex + 1);
    return ruleMessages[baseRule];
  }
  return undefined;
}

function relativePath(filePath: string, cwd: string): string {
  const rel = path.relative(cwd, filePath);
  return rel || filePath;
}

export function formatResults(results: ESLint.LintResult[], options: PrompterConfig = {}): string {
  const filesWithIssues = results.filter((r) => r.messages.length > 0);

  if (filesWithIssues.length === 0) {
    return '';
  }

  const header = options.header === undefined ? DEFAULT_HEADER : options.header;
  const footer = options.footer === undefined ? DEFAULT_FOOTER : options.footer;
  const ruleMessages: Record<string, string> = {
    ...defaultRuleMessages,
    ...options.ruleMessages,
  };
  const cwd = process.cwd();
  const multiFile = filesWithIssues.length > 1;

  const parts: string[] = [];

  if (header) {
    parts.push(header);
    parts.push('');
  }

  const grouped = groupByRule(filesWithIssues);

  // Rules where individual line violations are noise — just list affected files
  const fileOnlyRules = new Set(['prettier/prettier']);

  for (const [ruleId, group] of grouped) {
    const customMsg = getRuleMessage(ruleId, ruleMessages);
    const ruleLabel = customMsg ? `**${ruleId}**: ${customMsg}` : `**${ruleId}**`;
    parts.push(ruleLabel);

    if (fileOnlyRules.has(ruleId)) {
      const files = [...new Set(group.violations.map((v) => relativePath(v.filePath, cwd)))];
      for (const file of files) {
        parts.push(`- ${file}`);
      }
    } else {
      for (const v of group.violations) {
        const msg = v.message;
        const filePrefix = multiFile ? `${relativePath(v.filePath, cwd)} ` : '';
        parts.push(
          `- ${filePrefix}Line ${msg.line}, Col ${msg.column} (${severityLabel(msg.severity)}): ${msg.message}`,
        );
      }
    }

    parts.push('');
  }

  let errorCount = 0;
  let warningCount = 0;
  for (const result of filesWithIssues) {
    errorCount += result.errorCount;
    warningCount += result.warningCount;
  }

  parts.push(
    `**Summary**: ${errorCount} error(s), ${warningCount} warning(s) across ${filesWithIssues.length} file(s).`,
  );
  parts.push('');

  if (footer) {
    parts.push(footer);
  }

  return parts.join('\n');
}

/**
 * ESLint formatter entry point.
 * ESLint calls this function with the lint results array.
 */
const formatter: ESLint.Formatter['format'] = function format(
  results: ESLint.LintResult[],
): string {
  const config = loadConfig();
  return formatResults(results, config);
};

export default formatter;
