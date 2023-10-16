/* eslint-disable no-template-curly-in-string */
import fs from 'fs';
import path from 'path';
import replace from './replace';

describe('replace', () => {
  const testFile = path.join(__dirname, '../test.txt');
  const testFileCopy = path.join(__dirname, '../test-copy.txt');

  beforeEach(() => {
    fs.writeFileSync(testFile, 'Hello, ${NAME}!');
  });

  afterEach(() => {
    try {
      fs.unlinkSync(testFile);
      fs.unlinkSync(testFileCopy);
    } catch (err: unknown) {
      //
    }
  });

  it('should replace environment variables in a file', async () => {
    process.env.NAME = 'World';
    const result = await replace(testFile, testFileCopy);
    expect(result).toBe(true);

    const contents = fs.readFileSync(testFileCopy, 'utf8');
    expect(contents).toBe('Hello, World!');
  });

  it('should return false if the file does not exist', async () => {
    const result = await replace('nonexistent.txt', testFileCopy);
    expect(result).toBe(false);
  });
});
