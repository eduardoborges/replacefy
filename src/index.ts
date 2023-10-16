import core from '@actions/core';
import replace from './main';

// most @actions toolkit packages have async methods

async function main() {
  try {
    const file = process.env.TEST ? './test.txt' : core.getInput('file');

    if (!file) {
      console.debug('`file` was not set, using default value.');
    }
    console.info('Starting Process');

    const res = await replace(file, file);

    if (res) {
      console.info('All ok.');
    } else {
      console.info('Something went wrong, check the logs.');
    }
  } catch (err) {
    // setFailed logs the message and sets a failing exit code
    // core.setFailed(`Action failed with error ${err}`);
  }
}

main().then(() => {
  console.info('Process finished.');
});
