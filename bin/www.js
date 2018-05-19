#!/usr/bin/env node
require('dotenv').config();
const chalk = require('chalk');
const http = require('http');
const app = require('../server');
const https = require('https');
const certsPath = path.join(__dirname, '../certs2', 'server');
const caCertsPath = path.join(__dirname, '../certs2', 'ca');

// const compression = require('compression')
const options = {
  key: fs.readFileSync(path.join(certsPath, 'my-server.key.pem'))
  // This certificate should be a bundle containing your server certificate and any intermediates
  // cat certs/cert.pem certs/chain.pem > certs/server-bundle.pem
  , cert: fs.readFileSync(path.join(caCertsPath, 'root.crt.pem'))
  // ca only needs to be specified for peer-certificates
  //, ca: [ fs.readFileSync(path.join(caCertsPath, 'intermediate.crt.pem'))
  //,fs.readFileSync(path.join(caCertsPath, 'root.crt.pem'))  
  //]
  , requestCert: false
  , rejectUnauthorized: true
};

const port = process.env.SHOPIFY_APP_PORT || '3000';
app.set('port', port);

// const server = http.createServer(app);
const server = https.createServer(options,app);
server.listen(port, err => {
  if (err) {
    return console.log('😫', chalk.red(err));
  }
  console.log(`🚀 Now listening on port ${chalk.green(port)}`);
});
