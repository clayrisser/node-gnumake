import fs from 'fs';
import https from 'https';
import path from 'path';
import tar from 'tar';
import { IncomingMessage } from 'http';
import where from './where';

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

async function install() {
  if (await where('make')) return;
  const binPath = path.resolve(__dirname, '../bin');
  const tarPath = path.resolve(binPath, 'make.tar.gz');
  const url = `https://github.com/codejamninja/portable-make/releases/download/${options.version}/make-${process.platform}-${options.version}.tar.gz`;
  console.info('downloading ->', url);
  await download(url, tarPath);
  console.log('extracting ->', tarPath);
  await tar.x({
    C: binPath,
    file: tarPath,
  });
}

install().catch(console.error);
