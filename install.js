var execa = require('execa');
var fs = require('fs');
var path = require('path');

if (fs.existsSync(path.resolve(__dirname, 'lib/install.js'))) {
  execa.sync('node', ['lib/install.js'], {
    stdio: 'inherit'
  });
} else {
  execa.sync('babel-node', ['--extensions', '.ts,.tsx', 'src/install'], {
    stdio: 'inherit'
  });
}
