/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import fs from 'fs/promises';
import { glob } from 'glob';
import replace from './replace';

describe('.replace', () => {
  const TEST_FOLDER = './test';

  beforeEach(async () => {
    await fs.mkdir(TEST_FOLDER, { recursive: true });
    await fs.writeFile(`${TEST_FOLDER}/1.txt`, 'Hello, __NAME__!', 'utf8');
    await fs.writeFile(`${TEST_FOLDER}/2.txt`, 'Hello, {{NAME}}!', 'utf8');
    await fs.writeFile(`${TEST_FOLDER}/3.txt`, 'Hello, {{NAME}} __NAME__!', 'utf8');
  });

  afterEach(async () => {
    // await fs.rm(TEST_FOLDER, { recursive: true });
  });

  it('should replace matching __NAME__ pattern ', async () => {
    const file = `${TEST_FOLDER}/1.txt`;
    process.env.NAME = 'World';

    const result = await replace(file);
    const contents = await fs.readFile(file, 'utf8');

    expect(result).toBe(true);
    expect(contents).toBe('Hello, World!');
  });

  it('should replace matching {{NAME}} pattern', async () => {
    const file = `${TEST_FOLDER}/2.txt`;
    process.env.NAME = 'World';

    const result = await replace(file);
    const contents = await fs.readFile(file, 'utf8');

    expect(result).toBe(true);
    expect(contents).toBe('Hello, World!');
  });

  it('should replace matching {{NAME}} and __NAME__ pattern', async () => {
    const file = `${TEST_FOLDER}/3.txt`;
    process.env.NAME = 'World';

    const result = await replace(file);
    const contents = await fs.readFile(file, 'utf8');

    expect(result).toBe(true);
    expect(contents).toBe('Hello, World World!');
  });

  it('should replace matching txt files and all patterns', async () => {
    const match = `${TEST_FOLDER}/*.txt`;
    process.env.NAME = 'World';

    const result = await replace(match);
    const files = await glob(match);

    expect(result).toBe(true);

    for (const file of files) {
      const contents = await fs.readFile(file, 'utf8');
      expect(contents).toMatch(/Hello, World!|Hello, World World!/g);
    }
  });

  it('should replace matching {{ NAME }} with spaces', async () => {
    const match = `${TEST_FOLDER}/4.txt`;
    await fs.writeFile(match, 'Hello, {{ NAME }}!', 'utf8');
    process.env.NAME = 'World';

    const result = await replace(match);

    expect(result).toBe(true);

    const contents = await fs.readFile(match, 'utf8');
    expect(contents).toMatch('Hello, World!');
  });

  it('should replace matching {{ NAME }} with spaces and multiple files', async () => {
    const match = `${TEST_FOLDER}/4.txt\n${TEST_FOLDER}/5.txt`;
    await fs.writeFile(`${TEST_FOLDER}/4.txt`, 'Hello, {{ NAME }}!', 'utf8');
    await fs.writeFile(`${TEST_FOLDER}/5.txt`, 'Hello, {{ NAME }}!', 'utf8');
    process.env.NAME = 'World';

    const result = await replace(match);

    expect(result).toBe(true);

    const files = await glob(match);
    for (const file of files) {
      const contents = await fs.readFile(file, 'utf8');
      expect(contents).toMatch('Hello, World!');
    }
  });
});
