# Frontend Asset Guidelines

## Global installs
Grunt, Sass, Bower and Bourbon need to be installed on a global basis

## Bower installation
Bower is used for the installation of modules. The bower_component's folder is store in the web directory. Do not commit the bower_components folder.
A bower.json file will installed basic packages that are used on the site. More packages can be added on a per project basis.
Bower will need to be installed for the project when pulling down from git.

## Grunt
Grunt is used for automated tasks. It is used for compilation, testing, Styleguide generation and validation. The default task does not have a watch command so that it can be run with a Continuous Integration environment. Grunt is installed in the web directory so that it's easy to get to for running tasks and so that you can use the same gruntfile for multiple themes if needed.

## Concatenation and Minification
Files should be concatenated and minified for production. If the CMS has the ability to do this then use that functionality. If not minification and concatenation tasks can be added to Grunt.

## SCSS linting
SCSS linting is used with a CCF1 standard - http://github.com/adamhughes86/CCF1

## SVG's
SVG's are preferred over iconfonts and sprites. Grunticon is used so that fallbacks are created. Grunticon has the ability to embed SVG's in the document but a Javascript function needs to be added to the head of the file.

## Styleguide generation
A styleguide is generated in the assets folder `assets/styleguide` and can be accessed through a server. This is created with KSS. Comments must adhere to a KSS format otherwise the handlebars generation will fail. A custom KSS theme has been added into the Grunt folder. New modules can have a HTML version added into a KSS comment to provide clarity. These must be manually updated.

## Regression Testing with PhantomCSS
The styleguide can be used to do Regression Testing. Regression tests are handled with PhantomCSS and run on their own Grunt task `grunt regression`.

## Validating
