import execa from 'execa';
import path from 'path';
import pkgDir from 'pkg-dir';

export default async function head(args: string[] = []) {
  let command = 'head';
  if (process.platform === 'win32') {
    const shxPath =
      (await pkgDir(require.resolve('shx/lib/shx'))) ||
      path.resolve(__dirname, '../node_modules/shx');
    args = [path.resolve(shxPath, 'lib/cli.js'), command, ...args];
    command = 'node';
  }
  const ps = execa(command, args, { stdio: 'inherit' });
  try {
    return await ps;
  } catch (err) {
    if (err.exitCode) return process.exit(err.exitCode);
    throw err;
  }
}

if (require.main === module) {
  head(process.argv.slice(2, process.argv.length)).catch(console.error);
}
