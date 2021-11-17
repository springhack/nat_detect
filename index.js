/*
 *  Author: SpringHack - springhack@live.cn
 *  Last modified: 2021-11-17 17:42:40
 *  Filename: index.js
 *  Description: Created by SpringHack using vim automatically.
 */
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers')
const getNatType = require('nat-type-identifier');

const defaultParams = {
  logsEnabled: true,
  sampleCount: 20,
  stunHost: "stun.sipgate.net"
};

const switches = {
  'enable-log': 'logsEnabled',
  'count': 'sampleCount',
  'host': 'stunHost'
};

const argv = yargs(hideBin(process.argv))
  .command('enable-log', 'Enable debugging log')
  .command('count', 'Set sample count')
  .command('host', 'Set stun host')
  .parse();

const params = {
  ...defaultParams
};

Object.keys(switches).forEach((key) => {
  if (Reflect.has(argv, key)) {
    let arg = argv[key];
    try {
      arg = JSON.parse(argv[key]);
    } catch (_) {}
    if (typeof arg === typeof defaultParams[switches[key]]) {
      params[switches[key]] = arg;
    }
  }
});

console.error('Params:', params);

getNatType(params)
  .then(result => console.log(result));
