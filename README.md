# Frontend Asset Guidelines

*Note:*
This is a skeleton assets project with Grunt as a task runner. Not all tasks will be needed on every project so remove ones that are not needed or used.

Grunt tasks have been simplified but I have kept a branch called feature/enhanced with the additional tasks in.

## First time set up
Because of the amount of tasks this can sometimes be a bit tricky to set up. If you are having difficult it's possible you have wrong versions of key components.

Running `npm install --production` will only install core plugins.

`npm install` includes additional modules you may not need, such as KSS, Grunticon and Validation tasks.

Open up the terminal and cd to the directory you want to place the project. Then run the following command

    git clone git@gitlab.rippleffect.com:front-end/php-skeleton.git

in the terminal, direct to the Grunt folder (/grunt/) and run `npm install`

Ensure that the version of Node.js is v.0.12.7 (minimum requirements)

Check current version of Node.js - `nodejs --version`

Update to current Version of Node.js -

    sudo npm cache clean -f
    sudo npm install -g n
    sudo n stable

If encountering error when running npm install  direct to the root folder and run the following command…

    sudo chown -R $USER /usr/local

Update the required gems using `sudo gem update --system`

You may have to also install the SCSS Lint gem - `sudo gem install scss-lint`

You should be good to go, run grunt

## Global installs
Grunt, Sass, Bower and Bourbon need to be installed on a global basis

## Bower installation
Bower is used for the installation of modules. The bower_component's folder is store in the web directory. We *do commit* the bower folder
A bower.json file will installed basic packages that are used on the site. More packages can be added on a per project basis.
Bower will need to be installed for the project when pulling down from git.

## Grunt
Grunt is used for automated tasks. It is used for compilation, testing, Styleguide generation and validation. The default task does not have a watch command so that it can be run with a Continuous Integration environment. Grunt is installed in the web directory so that it's easy to get to for running tasks and so that you can use the same gruntfile for multiple themes if needed.

## Concatenation and Minification
Files should be concatenated and minified for production. If the CMS has the ability to do this then use that functionality. If not minification and concatenation tasks can be added to Grunt.

## SCSS linting
SCSS linting is used with a CCF1 standard - http://github.com/adamhughes86/CCF1

## Vendor Prefixes
Autoprefixer is used as a grunt task to generate vendor prefixes. Don't use Bourbon or a mixin for prefixing.

## Styleguide generation
A styleguide is generated in the assets folder `assets/styleguide` and can be accessed through a server. This is created with KSS. Comments must adhere to a KSS format otherwise the handlebars generation will fail. A custom KSS theme has been added into the Grunt folder. New modules can have a HTML version added into a KSS comment to provide clarity. These must be manually updated.
