/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import * as core from '@actions/core';
import fs from 'fs/promises';
import { glob } from 'glob';

/**
 * Replace Environment Variables in a file.
 * @param {string} from Glob pattern to match files.
 * @param {string} to Glob pattern to match files.
 * @returns {Promise<boolean>} True if files were replaced.
 */
export default async function replace(from: string) {
  const files = await glob(from, { withFileTypes: true });

  if (files.length === 0) {
    core.info(`[replacefy] no files found matching ${from}`);
    return false;
  }

  for (const file of files) {
    core.info(`[replacefy] [read] ${file.fullpath()}`);
    const contents = await fs.readFile(file.fullpath(), 'utf8');
    const replaced = contents.replaceAll(
      /__([A-Z0-9_]+)__|{{([A-Z0-9_]+)}}/g,
      (_, p1, p2) => {
        const key = p1 || p2;
        return process.env[key] || '';
      },
    );
    await fs.writeFile(file.fullpath(), replaced);
    core.info(`[replacefy] [saved] ${file.fullpath()}`);
  }

  return true;
}
