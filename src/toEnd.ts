import execa from 'execa';
import path from 'path';
import pkgDir from 'pkg-dir';

export default async function toEnd(args: string[] = []) {
  const command = 'node';
  const shxPath =
    (await pkgDir(require.resolve('shx'))) ||
    path.resolve(__dirname, '../node_modules/shx');
  args = [path.resolve(shxPath, 'lib', 'toEnd.js'), ...args];
  const ps = execa(command, args, { stdio: 'inherit' });
  try {
    return await ps;
  } catch (err) {
    if (err.exitCode) return process.exit(err.exitCode);
    throw err;
  }
}

if (require.main === module) {
  toEnd(process.argv.slice(2, process.argv.length)).catch(console.error);
}
