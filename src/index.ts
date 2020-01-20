import execa from 'execa';
import fs from 'fs';
import path from 'path';

export default async function make(args: string[] = []) {
  const commandPath = path.resolve(
    __dirname,
    '../bin',
    ({
      linux: 'make',
      darwin: 'make',
      win32: 'make.exe'
    } as {
      [key: string]: string;
    })[process.platform]
  );
  const command = fs.existsSync(commandPath) ? commandPath : 'make';
  const ps = execa(command, args, { stdio: 'inherit' });
  try {
    return await ps;
  } catch (err) {
    if (err.exitCode) return process.exit(err.exitCode);
    throw err;
  }
}
