const {existsSync, readFileSync, writeFileSync} = require('fs');

if(!existsSync('./.env')) {
 console.log('No .env file found, creating one...');
  // writeFileSync('./.env', readFileSync('./.env.example'));
}