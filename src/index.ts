import * as core from '@actions/core';
import replace from './replace';

// most @actions toolkit packages have async methods

async function main() {
  try {
    const file = core.getInput('file');

    if (!file) core.warning('`file` was not set, using default value.');
    core.info('Starting Process');

    const res = await replace(file);

    if (res) {
      core.info('All ok.');
    } else {
      core.info('Something went wrong, check the logs.');
    }
  } catch (err) {
    if (err instanceof Error || typeof err === 'string') {
      core.setFailed(err);
    }
  }
}

main().then(() => {
  core.info('Process finished.');
});
