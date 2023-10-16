import * as core from '@actions/core';
import fs from 'fs';

/**
 * Replace Environment Variables in a file.
 */
export default async function main(from: fs.PathLike, to = from): Promise<boolean> {
  let result = true;

  try {
    if (fs.existsSync(from)) {
      const data = fs.readFileSync(from, 'utf8');
      const res = data.replace(/\${\w+}/gi, (contents) => {
        const match = contents.match(/\${(?<var>\w+)}/i);
        if (!match) return contents;

        let env = process.env[match[1]];

        if (typeof env === 'undefined') {
          console.info(`Environment Variable ${match[1]} not found!`);
          result = false;
          env = contents;
        } else {
          console.info(`Replacing Environment Variable ${match[1]}.`);
        }

        return env;
      });
      fs.writeFileSync(to, res);
      console.info(`File ${to} saved.`);
    } else {
      result = false;
    }
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(err.message);
    }
    if (typeof err === 'string') {
      console.error(err);
    }
  }

  return result;
}
