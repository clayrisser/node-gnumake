import execa from 'execa';

export default async function make(args: string[] = []) {
  const ps = execa('make', args, { stdio: 'inherit' });
  try {
    return await ps;
  } catch (err) {
    if (err.exitCode) return process.exit(err.exitCode);
    throw err;
  }
}
