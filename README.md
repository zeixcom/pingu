# pingu

A frontend boilerplate for your amazing projects

We use Pingu in our daily work to create amazing frontend sites.

Features
--------

* Gulp tasks ready to develop
* Can be used with ci pipelines, e.g. in GitLab
* Scaffolding-Tool to create easily new components, pages or layouts
* ES6/ES7 ready to use JS structure
* Modern scss utils, to simplify your styling
* Included preview pages, to show how components, pages, layouts look
* Framework for Components to use certain repeated functions over and over

File Structure
--------------

File and folder structure is rather simple. In the root folders are all essential files for options like the `pingu.config.yaml`, where you can set basic options.

There are 2 subdirectories by default the `config` and `src` directories.

`config`: Here we store all the gulp tasks and scaffolding files, you will also find here the webpack configuration and all necessary files to get the project run.

`src`: This is the directory for all source files, like twig and js files. This is your main working directory.

`tmp`: This directory is only created when you run the development gulp task (later more)

`build`: This directory is created when you run the build gulp task ()

Get Started
-----------

To throttle up browsersync and start developing you have to installed current version of npm and preferrably yarn

Go the directory in your console, after you copied the boilerplate to your new project directory

```
yarn install
````
This will install all depedencies, in your local `node_modules` folder

When this sucessfully completed you can start the running task with:

```
gulp
```

Now it will complete all tasks and open a new browser tab with a running browsersync instance.

If you want to build the project with minified assets, you can run the build process and you will get a much smaller version of your source files.

```
gulp production
```

This won't open a browsersync instance, to watch it in action, you have to upload it to a ftp server or any other form of deployment.

Page, Components, Layouts
---------------



