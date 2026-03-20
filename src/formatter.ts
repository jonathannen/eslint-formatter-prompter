import type { ESLint, Linter } from 'eslint';
import defaultRuleMessages from './rule-messages.js';
import { loadConfig, type PrompterConfig } from './config.js';

const DEFAULT_HEADER = `The lint tool has found errors. Included in this output is direction on how to resolve these errors. You MUST fix all of the following ESLint violations before proceeding with any other changes. Do not skip any errors. Do not leave any warnings unresolved. Fix every issue listed below.`;

const DEFAULT_FOOTER = `After fixing all issues, re-run ESLint to confirm zero violations remain. Do not proceed until the linter passes cleanly.`;

interface GroupedMessages {
  [ruleId: string]: Linter.LintMessage[];
}

function groupByRule(messages: Linter.LintMessage[]): GroupedMessages {
  const groups: GroupedMessages = {};
  for (const msg of messages) {
    const ruleId = msg.ruleId ?? 'unknown';
    if (!groups[ruleId]) {
      groups[ruleId] = [];
    }
    groups[ruleId].push(msg);
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

  for (const result of filesWithIssues) {
    parts.push(`## ${result.filePath}`);
    parts.push('');

    const grouped = groupByRule(result.messages);

    for (const [ruleId, messages] of Object.entries(grouped)) {
      const customMsg = ruleMessages[ruleId];
      const ruleLabel = customMsg ? `**${ruleId}**: ${customMsg}` : `**${ruleId}**`;

      parts.push(ruleLabel);

      for (const msg of messages) {
        parts.push(
          `- Line ${msg.line}, Col ${msg.column} (${severityLabel(msg.severity)}): ${msg.message}`,
        );
      }

      parts.push('');
    }
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
