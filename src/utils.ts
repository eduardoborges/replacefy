export function cleanString(str: string) {
  return str.trim().replaceAll(/ /g, '').replaceAll(/\s/g, '');
}
