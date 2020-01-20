import fs from 'fs';
import https from 'https';
import path from 'path';
import tar from 'tar';
import { IncomingMessage } from 'http';

const options = {
  version: '3.75'
};

async function download(url: string): Promise<IncomingMessage> {
  console.info('downloading ->', url);
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
          return resolve(download(res.headers.location));
        }
        return reject(res.statusCode);
      })
      .on('error', (err: Error) => {
        reject(err);
      })
      .end();
  });
}

(async () => {
  const binPath = path.resolve(__dirname, '../bin');
  const tarPath = path.resolve(binPath, 'make.tar.gz');
  const stream = await download(
    `https://github.com/codejamninja/portable-make/releases/download/${options.version}/make-${process.platform}-${options.version}.tar.gz`
  );
  await new Promise((resolve, reject) => {
    try {
      const file = fs.createWriteStream(tarPath);
      stream.pipe(file);
      return file.on('finish', () => {
        file.close();
        return resolve();
      });
    } catch (err) {
      return reject(err);
    }
  });
  console.log('extracting ->', tarPath);
  await tar.x({
    C: binPath,
    file: tarPath
  });
})().catch(console.error);
