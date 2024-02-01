#!/usr/bin/env node

const program = require('commander');
const fs = require('fs-extra');
const yauzl = require('yauzl');

// Define your CLI program
program
  .version('1.1.2')
  .description('Dropinbase CLI tool for starting a new Docker nginx project');

// Define the 'start' command
program
  .command('init <projectName>')
  .description('Start a new project')
  .action(async (projectName) => {
    // Path to the template zip file
    const srcPath = `${__dirname}/template.zip`;

    // Directory where the new project should be created
    // Replace spaces with underscores in projectName
    const sanitizedProjectName = projectName.replace(/\s+/g, '_');
    const destPath = `${process.cwd()}/${sanitizedProjectName}`;

    // Temporary zip path
    const zipPath = `${destPath}/template.zip`;

    await copyAndExtractZip(srcPath, destPath, zipPath);
    await updateDockerCompose(destPath, projectName);
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
async function updateDockerCompose(destPath, projectName) {
  const dockerComposePath = `${destPath}/docker-compose.yml`;

  try {
    // Read docker-compose file
    let content = await fs.readFile(dockerComposePath, 'utf8');

    // Replace container name, removing spaces from projectName
    content = content.replace(/container_name:\s*\w+/g, `container_name: ${projectName.replace(/\s+/g, '')}`);

    // Write the updated content back to docker-compose.yml
    await fs.writeFile(dockerComposePath, content, 'utf8');
  } catch (err) {
    console.error('Error updating docker-compose file:', err);
    throw err;
  }
}

program.parse(process.argv);
