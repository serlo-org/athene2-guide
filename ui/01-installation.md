---
layout: section
title: Installation
anchor: installation
group: 'ui'
---

### Get started

Als erstes müssen alle Dependencies geladen werden:

    cd src/modules/Ui/assets
    npm install && bower install

> Note: Nach dem installieren sollte der `bower_components` Ordner mit allen dependencies in `assets/source` und **nicht** in `assets/` sein. Wenn das nicht der Fall ist bitte manuell kopieren.

### Datei Struktur

Sämtliche Source Dateien befinden sich in `Ui/assets/source`.
Kompiliertes CSS / JS sowie automatisch optimierte Bilder werden von Grunt in `Ui/assets/build` erstellt.

Von dort werden die Dateien von Assetic "abgeholt".

### Grunt

Athene2/Ui hat 2 vordefinierte Grunt Tasks:

`grunt dev`:

* führt einen `watch` Befehl auf Sass-, Javascript- und Bilddateien aus
* Sass Dateien werden zu unkomprimiertem CSS mit Kommentaren
* erstellt automatisch vendor prefixes für CSS3 (z.b. -webkit-transition)
* packt alle requirejs module in ein `scripts.js`
* prüft Javascript mit [jshint](http://www.jshint.com/)

`grunt build`:

Macht das selbe wie `grunt dev` plus:

* minified Dateien für CSS / Javascript (styles.min.css / scripts.min.js)
* erstellt einen modernizr custom build, basierend auf allen CSS/JS Dateien

