#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const ncp = require('ncp').ncp;

const projectName = process.argv[2] || 'my-microservice';
const projectPath = path.join(process.cwd(), projectName);
const templatePath = path.join(__dirname, 'templates');

if (fs.existsSync(projectPath)) {
  console.error(`Directory ${projectName} already exists!`);
  process.exit(1);
}

fs.mkdirSync(projectPath);

ncp(templatePath, projectPath, (err) => {
  if (err) {
    return console.error(err);
  }

  console.log('Installing dependencies...');
  execSync('npm install', { cwd: projectPath, stdio: 'inherit' });

  console.log('Project setup complete!');
  console.log(`cd ${projectName} && npm start`);
});
