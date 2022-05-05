import {readdir} from 'fs';
import {promisify} from 'util';
import {resolve} from "path";

const readdirAsync = promisify(readdir);

export async function getDirectoryFilesList(path: string): Promise<string[]> {
  const filepath = resolve(process.cwd(), `./${path}`);
  return await readdirAsync(filepath)
}