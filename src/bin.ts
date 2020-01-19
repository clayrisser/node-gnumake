import make from './index';

(async () => {
  await make(process.argv.slice(2, process.argv.length));
})().catch(console.error);
