import fs from 'fs';
import https from 'https';
import path from 'path';
import pkgDir from 'pkg-dir';
import tar from 'tar';
import { IncomingMessage } from 'http';
import where from './where';

const pkg = require('../package.json');

const options = {
  version: '3.75',
};

async function downloadStream(url: string): Promise<IncomingMessage> {
  return new Promise((resolve, reject) => {
    https
      .request(url, (res: IncomingMessage) => {
        if (res.statusCode === 200) {
          return resolve(res);
        }
        if (
          (res.statusCode === 301 || res.statusCode === 302) &&
          res.headers.location
        ) {
          return resolve(downloadStream(res.headers.location));
        }
        return reject(res.statusCode);
      })
      .on('error', (err: Error) => {
        reject(err);
      })
      .end();
  });
}

async function download(url: string, outputPath: string): Promise<void> {
  const stream = await downloadStream(url);
  await new Promise((resolve, reject) => {
    try {
      const file = fs.createWriteStream(outputPath);
      stream.pipe(file);
      return file.on('finish', () => {
        file.close();
        return resolve();
      });
    } catch (err) {
      return reject(err);
    }
  });
}

async function enabledSystemBinaries() {
  if (process.platform === 'win32') return;
  await Promise.all(
    Object.keys(pkg.bin)
      .filter((bin: string) => bin !== 'make')
      .map((bin: string) =>
        (async () => {
          if (!(await where(bin))) {
            const binDirPath = path.resolve(
              (await pkgDir(process.cwd())) || process.cwd(),
              'node_modules/.bin'
            );
            const bins: string[] = [bin, `${bin}.cmd`, `${bin}.pw1`];
            await Promise.all(
              bins.map((bin: string) =>
                (() => {
                  const binPath = path.resolve(binDirPath, bin);
                  if (fs.existsSync(binPath)) {
                    fs.renameSync(binPath, path.resolve(binDirPath, `_${bin}`));
                  }
                })()
              )
            );
          }
        })()
      )
  );
}

async function install() {
  if (await where('make')) return;
  const binPath = path.resolve(__dirname, '../bin');
  const tarPath = path.resolve(binPath, 'make.tar.gz');
  fs.mkdirSync(binPath);
  const url = `https://github.com/codejamninja/portable-make/releases/download/${options.version}/make-${process.platform}-${options.version}.tar.gz`;
  console.info('downloading ->', url);
  await download(url, tarPath);
  console.log('extracting ->', tarPath);
  await tar.x({
    C: binPath,
    file: tarPath,
  });
  await enabledSystemBinaries();
}

install().catch(console.error);
