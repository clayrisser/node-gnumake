import execa from 'execa';
import path from 'path';
import pkgDir from 'pkg-dir';
import where from './where';

async function dirs(args: string[] = []) {
  let command = await where('dirs')!;
  if (!command) {
    const shxPath =
      (await pkgDir(require.resolve('shx'))) ||
      path.resolve(__dirname, '../node_modules/shx');
    args = [path.resolve(shxPath, 'lib', 'dirs.js'), ...args];
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
  dirs(process.argv.slice(2, process.argv.length)).catch(console.error);
}
