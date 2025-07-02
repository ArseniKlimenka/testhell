const minimist = require('minimist');
const runner = require('@adinsure-tools/test-runner/dist/mocha-runner.js');

const args = minimist(process.argv);
runner.runApiTests(args.env ?? 'local');
