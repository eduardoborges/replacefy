import core from '@actions/core';
import replace from './main';

// most @actions toolkit packages have async methods
async function main() {
  try {
    const from = core.getInput('from_file');
    const to = core.getInput('to_file');

    if (!from) {
      core.warning('`from_file` was not set, defaults to `README.md`');
    }

    if (!to) {
      core.warning('`from_file` was not set, defaults to `README.md`');
    }

    core.info('Starting Process');

    // split GITHUB_REPOSITORY into REPOSITORY_ACCOUNT and REPOSITORY_SLUG
    const repo = (process.env.GITHUB_REPOSITORY as string).split('/');
    const account = repo[0];
    const slug = repo[1];

    process.env.REPOSITORY_ACCOUNT = account;
    process.env.REPOSITORY_SLUG = slug;

    // debug is only output if you set the secret `ACTIONS_RUNNER_DEBUG` to true
    const res = await replace(from, to);
    if (res) {
      core.info('All ok.');
    } else {
      core.info('Something went wrong, check the logs.');
    }
  } catch (err) {
    // setFailed logs the message and sets a failing exit code
    core.setFailed(`Action failed with error ${err}`);
  }
}

main().then(() => {
  core.info('Process finished.');
});
