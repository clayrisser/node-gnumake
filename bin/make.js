#!/usr/bin/env node

require('@babel/polyfill');
if (require.main === module) require('../lib/bin');
