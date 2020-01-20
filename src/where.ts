import execa from 'execa';
import path from 'path';

export default async function where(
  program: string,
  unixCommand?: string,
  PATH = process.env.PATH
): Promise<string | null> {
  if (!unixCommand) {
    const binPath = path.resolve(__dirname, '../../.bin');
    process.env.PATH = PATH?.replace(binPath, '');
  }
  const command =
    process.platform === 'win32' ? 'whereis' : unixCommand || 'where';
  let result = null;
  try {
    console.log(command, [program]);
    const ps = await execa(command, [program], { stdio: 'pipe' });
    console.log('exitCode', ps.exitCode);
    if (ps.exitCode === 0) result = ps.stdout;
  } catch (err) {
    console.log('error');
    if (process.platform !== 'win32' && !unixCommand) {
      return where(program, 'which', PATH);
    }
  }
  process.env.PATH = PATH;
  return result;
}
