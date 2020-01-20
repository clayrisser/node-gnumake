import execa from 'execa';
import path from 'path';

export default async function where(
  program: string,
  unixCommand?: string,
  PATH = process.env.PATH
): Promise<string | null> {
  if (!unixCommand) {
    const binPath = path.resolve(__dirname, '../../.bin');
    process.env.PATH = PATH?.replace(new RegExp(binPath, 'g'), '');
  }
  const command =
    process.platform === 'win32' ? 'whereis' : unixCommand || 'where';
  let result = null;
  try {
    const ps = await execa(command, [program], { stdio: 'pipe' });
    if (ps.exitCode === 0) result = ps.stdout;
  } catch (err) {
    if (process.platform !== 'win32' && !unixCommand) {
      return where(program, 'which', PATH);
    }
  }
  process.env.PATH = PATH;
  if (typeof result === 'string') {
    result = result.split(' ').pop() || null;
    if (!result?.length) result = null;
  }
  return result;
}
