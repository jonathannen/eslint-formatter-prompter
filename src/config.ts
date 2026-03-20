import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

export interface PrompterConfig {
  header?: string | null;
  footer?: string | null;
  ruleMessages?: Record<string, string>;
}

const CONFIG_FILENAMES = [
  '.eslint-formatter-prompter.json',
  '.eslint-formatter-prompterrc',
  '.eslint-formatter-prompterrc.json',
];

export function loadConfig(cwd: string = process.cwd()): PrompterConfig {
  for (const filename of CONFIG_FILENAMES) {
    try {
      const filePath = resolve(cwd, filename);
      const content = readFileSync(filePath, 'utf-8');
      return JSON.parse(content) as PrompterConfig;
    } catch {
      // File doesn't exist or isn't valid JSON, try next
    }
  }
  return {};
}
