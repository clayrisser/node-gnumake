#!/usr/bin/env node

if (require.main === module) {
  require('../lib')
    .default(process.argv.slice(2, process.argv.length))
    .catch(console.error);
}
