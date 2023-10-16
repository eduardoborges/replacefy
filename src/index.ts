import * as core from '@actions/core';
import replace from './replace';

// most @actions toolkit packages have async methods

async function main() {
  try {
    const file = process.env.TEST ? './test.txt' : core.getInput('file');

    if (!file) {
      core.warning('`file` was not set, using default value.');
    }
    core.info('Starting Process');

    const res = await replace(file, file);

    if (res) {
      core.info('All ok.');
    } else {
      core.info('Something went wrong, check the logs.');
    }
  } catch (err) {
    // setFailed logs the message and sets a failing exit code
    // core.setFailed(`Action failed with error ${err}`);
  }
}

main().then(() => {
  core.info('Process finished.');
});
