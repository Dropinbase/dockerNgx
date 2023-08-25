DibClient Documentation
Overview
This documentation explains how to startup the Dropinbase project and use Gulp 
to build CSS for the DibClient project. 


Docker Commands
If you're using Docker, the following npm scripts are available for convenience:

start: Builds and starts the Docker containers.
Then visit https://localhost for the installer follow the steps

docker:rebuild: Rebuilds the Docker image and starts the containers.
docker:restart: Restarts the Docker containers.



Custom themes overrides of templates
By using the Gulp commands, you will be able to generate a CSS 
file located at /files/themes/overrides/setNgxMaterial/css/theme.css. This file gives you the 
ability to override styles in the application.

Alternatively, you can also start an Angular project and generate 
a theme to be added to the theme.css file.

Prerequisites
Ensure you have the following installed:

Node.js
npm
Docker (if you're using it)
Run npm install to install all dependencies before proceeding.

Using Gulp to Build CSS
The Gulp setup is already included in the project's package.json. The following 
npm scripts are used to facilitate the Gulp build process for SCSS files:

gulp: Runs the default Gulp tasks.
build:scss: Builds SCSS files using Gulp.
watch:scss: Watches the SCSS files for changes and rebuilds them.
Steps
Build SCSS files

To build your SCSS files into CSS, use the following command:

arduino
Copy code
npm run build:scss
This command will generate a new CSS file at /files/themes/overrides/setNgxMaterial/css/theme.css.

Watch SCSS files for changes

If you want to automatically build SCSS files whenever they change, use the following command:

arduino
Copy code
npm run watch:scss
This will start a watcher that recompiles SCSS files into CSS whenever you make changes.

Using Angular to Generate a Theme
As an alternative, you can start an Angular project and generate a theme which can be added to the theme.css project file. However, the Gulp scripts included in this project simplify the build process for you.


License
This project is licensed under the GDP license.

Author
Dropinbase.com