import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { writeFileSync, unlinkSync, mkdtempSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { loadConfig } from '../src/config.js';

describe('loadConfig', () => {
  it('returns empty object when no config file exists', () => {
    const dir = mkdtempSync(join(tmpdir(), 'eslint-prompter-'));
    const config = loadConfig(dir);
    assert.deepEqual(config, {});
  });

  it('loads .eslint-formatter-prompter.json', () => {
    const dir = mkdtempSync(join(tmpdir(), 'eslint-prompter-'));
    const configPath = join(dir, '.eslint-formatter-prompter.json');
    const expected = {
      header: 'Custom header',
      footer: 'Custom footer',
      ruleMessages: { 'no-var': 'Stop using var!' },
    };
    writeFileSync(configPath, JSON.stringify(expected));

    const config = loadConfig(dir);
    assert.deepEqual(config, expected);

    unlinkSync(configPath);
  });

  it('loads .eslint-formatter-prompterrc.json', () => {
    const dir = mkdtempSync(join(tmpdir(), 'eslint-prompter-'));
    const configPath = join(dir, '.eslint-formatter-prompterrc.json');
    writeFileSync(configPath, JSON.stringify({ header: 'RC header' }));

    const config = loadConfig(dir);
    assert.equal(config.header, 'RC header');

    unlinkSync(configPath);
  });
});
