/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import * as core from '@actions/core';
import fs from 'fs/promises';
import { Path, glob } from 'glob';
import { cleanString } from './utils';

/**
 * Replace Environment Variables in a file.
 * @param {string} from Glob pattern to match files.
 * @param {string} to Glob pattern to match files.
 * @returns {Promise<boolean>} True if files were replaced.
 */
export default async function replace(from: string) {
  let files: string[] | Path[] = await glob(from, { withFileTypes: true });

  if (files.length === 0) {
    files = from.split('\n').map(cleanString);
    files = from.split(',').map(cleanString);

    console.log(files);

    if (files.length === 0) {
      core.info(`[replacefy] no files found matching ${from}`);
      return false;
    }
  }

  for (const file of files) {
    const fullpath = typeof file === 'string' ? file : file.fullpath();

    core.info(`[replacefy] [read] ${fullpath}`);
    const contents = await fs.readFile(fullpath, 'utf8');

    const replaced = contents.replaceAll(
      /__([A-Z0-9_]+)__|{{([A-Z0-9_ ]+)}}/g,
      (_, p1: string, p2: string) => {
        const key = p1 || p2;
        return process.env[key.trim()] || '';
      },
    );

    await fs.writeFile(fullpath, replaced);
    core.info(`[replacefy] [saved] ${fullpath}`);
  }

  return true;
}
