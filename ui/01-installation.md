---
layout: section
title: Installation
anchor: installation
group: 'ui'
---

### Getting Started

Initially all dependencies should be loaded. 

    cd src/modules/Ui/assets
    npm install && bower install

Important: After the installation finishes, the `browser_components` directory should have the dependencies in `asset/source` subdirectory and NOT in the `assets` subdirectory. If this is not the case, the depencies should be manually copied into the proper `assets/source` subdirectory.


### File Structure

The entire source files are located in the directory `ui/assets/source`. 

The Grunt system creates optimised pictures and extensive CSS and Java Script and stores them in `ui/assets/build`, where they are used by Assetic for further processing.


### Grunt - Automation, Configration Management

Athene2/ui has two predefined Grunt tasks:

`grunt dev`:

* Executes a `watch` command on Sass, JS and picture files
* Makes the Sass files into uncompressed CSS with comments
* Creates vendor prefixes for CSS3, for instance -webkit-transition
* Puts all the required js modules into a `scripts.js`
* Checks the Java Script with [jshint](http://www.jshint.com/)

`grunt build`:

This is the same as 'grunt dev' with the following additions:

* shrinks files for CSS / Java Script (styles.min.css / scripts.min.js)
* Creates a 'moderizr' custom build  based on all CSS/JS files
