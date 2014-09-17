---
layout: section
title: Installation
anchor: installation
group: 'ui'
---

### Getting Started

Initially all dependencies should be loaded. 
Als erstes müssen alle Dependencies geladen werden:

    cd src/modules/Ui/assets
    npm install && bower install

Important: After the installation finishes, the 'browser_components' directory should have the dependencies in 'asset/source' subdirectory and NOT in the 'assets' subdirectory. If this is not the case, the depencies should be manually copied into the proper 'assets/source' subdirectory.

> Note: Nach dem installieren sollte der `bower_components` Ordner mit allen dependencies in `assets/source` und **nicht** in `assets/` sein. Wenn das nicht der Fall ist bitte manuell kopieren.

### File Structure

The entire source files are located in the directory 'ui/assets/source'. 
Sämtliche Source Dateien befinden sich in `Ui/assets/source`.

The Grunt system creates optimised pictures and extensive CSS and Java Script and stores them in 'ui/assets/build', where they are used by Assetic for further processing.

Kompiliertes CSS / JS sowie automatisch optimierte Bilder werden von Grunt in `Ui/assets/build` erstellt.

Von dort werden die Dateien von Assetic "abgeholt".

### Grunt - Automation, Configration Management

Athene2/ui has two predefined Grunt tasks:
Athene2/Ui hat 2 vordefinierte Grunt Tasks:

`grunt dev`:

* führt einen `watch` Befehl auf Sass-, Javascript- und Bilddateien aus
* Executes a 'watch' command on Sass, JS and picture files
* Sass Dateien werden zu unkomprimiertem CSS mit Kommentaren
* Makes the Sass files into uncompressed CSS with comments
* Creates vendor prefixes for CSS3, for instance -webkit-transition
* Puts all the required js modules into a 'scripts.js'

* packt alle requirejs module in ein `scripts.js`
* prüft Javascript mit [jshint](http://www.jshint.com/)
* Checks the Java Script with [jshint](http://www.jshint.com/)

`grunt build`:

Macht das selbe wie `grunt dev` plus:
This is the same as 'grunt dev' with the following additions:

* minified Dateien für CSS / Javascript (styles.min.css / scripts.min.js)
* shrinks files for CSS / Java Script (styles.min.css / scripts.min.js)
* erstellt einen modernizr custom build, basierend auf allen CSS/JS Dateien
* Creates a 'moderizr' custom build  based on all CSS/JS files
