const http = require('http');
const https = require('https');

/**
 * getJSON:  RESTful GET request returning JSON object(s)
 * @param options: http options object
 * @param callback: callback to pass the results JSON object(s) back
 */

module.exports.getJSON = (options, onResult) => {
  const port = options.port == 443 ? https : http;

  let output = '';

  const req = port.request(options, (res) => {
    res.setEncoding('utf8');

    res.on('data', (chunk) => {
      output += chunk;
    });

    res.on('end', () => {
      let obj = JSON.parse(output);

      onResult(res.statusCode, obj);
    });
  });

  req.on('error', (err) => {
    console.log(err.message);
  });

  req.end();
};