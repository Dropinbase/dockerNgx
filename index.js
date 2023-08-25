#!/usr/bin/env node

const program = require('commander');
const fs = require('fs-extra');
const yauzl = require('yauzl');

// Define your CLI program
program
  .version('1.0.9')
  .description('Dropinbase CLI tool for starting a new Docker nginx project');

// Define the 'start' command
program
  .command('init <projectName>')
  .description('Start a new project')
  .action(async (projectName) => {
    // Path to the template zip file
    const srcPath = `${__dirname}/template.zip`;

    // Directory where the new project should be created
    const destPath = `${process.cwd()}/${projectName}`;

    // Temporary zip path
    const zipPath = `${destPath}/template.zip`;

    await copyAndExtractZip(srcPath, destPath, zipPath);
  });

async function copyAndExtractZip(srcPath, destPath, zipPath) {
  // Step 1: Create project directory
  fs.ensureDirSync(destPath);

  // Step 2: Copy zip file to the project directory
  fs.copyFileSync(srcPath, zipPath);

  // Step 3: Extract zip file
  return new Promise((resolve, reject) => {
    yauzl.open(zipPath, { lazyEntries: true }, (err, zipfile) => {
      if (err) return reject(err);

      zipfile.readEntry();

      zipfile.on('entry', (entry) => {
        const filePath = `${destPath}/${entry.fileName}`;
        if (/\/$/.test(entry.fileName)) {
          fs.mkdirp(filePath, (err) => {
            if (err) return reject(err);
            zipfile.readEntry();
          });
        } else {
          zipfile.openReadStream(entry, (err, readStream) => {
            if (err) return reject(err);
            readStream.on('end', () => zipfile.readEntry());
            const writeStream = fs.createWriteStream(filePath);
            readStream.pipe(writeStream);
          });
        }
      });

      zipfile.on('end', () => {
        fs.removeSync(zipPath); // Remove the copied zip file
        resolve();
      });
    });
  });
}

program.parse(process.argv);
