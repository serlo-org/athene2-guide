---
layout: section
title: SASS
anchor: sass
group: 'ui'
---

### Verwendete thirdparty Frameworks (siehe auch `bower.json`)

* [sass-bootstrap](https://github.com/jlong/sass-bootstrap) 3.0.0

### Namenskonvention

Klassen: .my-class
IDs: #myClass
Zustände: .is-active, .is-hovered, .is-hidden



### Struktur

Sass Variablen und base-styles sind im Ordner "styles/base" anzulegen.

Es wird unterschieden zwischen `modulen`, `partials`. Partials sind bestimmte bereiche der Website (z.B. die Top Navigation Bar).
Module sind *wiederverwendbare* Styles, die sowohl von Partials als auch anderen Modulen benutzt werden. Die `.nav` Klasse von Bootstrap ist ein perfektes Beispiel für ein Modul.
Ansatzweise findet der [Smacss Ansatz](http://smacss.com/) Anwendung.

### Bootstrap

Bootstraps Variablen können überschrieben werden in `source/styles/base/_bootstrap_override.scss`.