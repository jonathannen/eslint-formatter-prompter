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

  const parts: string[] = [];

  if (header) {
    parts.push(header);
    parts.push('');
  }

  const grouped = groupByRule(filesWithIssues);

  for (const [ruleId, group] of grouped) {
    const customMsg = ruleMessages[ruleId];
    const ruleLabel = customMsg ? `**${ruleId}**: ${customMsg}` : `**${ruleId}**`;
    parts.push(ruleLabel);

    // Group violations by file within each rule
    const byFile = new Map<string, Linter.LintMessage[]>();
    for (const v of group.violations) {
      let msgs = byFile.get(v.filePath);
      if (!msgs) {
        msgs = [];
        byFile.set(v.filePath, msgs);
      }
      msgs.push(v.message);
    }

    for (const [filePath, messages] of byFile) {
      if (filesWithIssues.length > 1) {
        parts.push(`  ${filePath}:`);
      }
      for (const msg of messages) {
        parts.push(
          `- Line ${msg.line}, Col ${msg.column} (${severityLabel(msg.severity)}): ${msg.message}`,
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
