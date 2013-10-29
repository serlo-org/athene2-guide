---
layout: section
title: Javascript
anchor: javascript
group: 'ui'
---

### Verwendete thirdparty Frameworks/Libraries (siehe auch `bower.json`)

* [requirejs](http://requirejs.org/) 2.1.8
* [jQuery](http://jquery.com/) 1.10.2
* [underscore.js](http://underscorejs.org) 1.5.2
* [modernizr](http://modernizr.com) 2.6.2

### Linting

Alle JS Dateien werden über grunt mit jshint geprüft.

### JS Module

Eigene Module müssen mit requirejs eingebunden werden:

```javascript
/*global define*/
define('myModule', ['jquery'], function ($) {
    "use strict";
    var MyModule = function () {...};

    return MyModule;
});
```

(siehe auch [http://requirejs.org/](http://requirejs.org/))

Um module verwenden zu können müssen sie in der mainConfig (scripts/main.js) registriert werden:

```javascript
require.config({
    paths: {
        "myModule": "modules/my_module"
    }
});
```

Dann können sie z.B. in der Hauptapplikation (scripts/ATHENE2.js) verwendet werden:

```javascript
define("ATHENE2", ['jquery', 'referrer_history', 'my_module'], function ($, ReferrerHistory, MyModule) {
    "use strict";
    var myInstance = new MyModule();
});
```

## Events

Das `events` Modul erweitert Objekte und Klassen um die Funktionen

* addEventListener(eventName, callback)
* trigger(eventName, data[, moreData])

und gibt ihnen einen eigenen `eventScope`:

```javascript
define(['events'], function (eventScope) {
    var myObject = {
        name: 'Athene'
    };
    
    // Give the Object/Class an event scope
    eventScope(myObject);
    
    // Add an event listener
    myObject.addEventListener('name changed', function (data) {
        console.log('Name changed to: ' + data);
    });
    
    // define, when to trigger what kind of events
    myObject.changeName = function (newName) {
        if (this.name !== newName) {
            this.name = newName;
            this.trigger('name changed', this.name);
        }
    };
    
    // calling the function will log
    // "Name changed to: Athene2"
    myObject.changeName('Athene2');
});
```

## Common

Das `common` Modul bietet einige Helfer Funktionen. Dazu schaut man am besten direkt in das Modul.
Die Wichtigste ist wohl das `logging`:

Anstatt direkt mit `console.log` zu arbeiten, gibt es `Common.log`. Dies ist ein Wrapper, der verhindert, dass es zu Fehlern kommt, wenn versehentlich ein `console.log` im Code bleibt.

Außerdem hat hat das Common Objekt einen EventScope, über den es möglich ist zwischen verschiedenen Modulen zu kommunizieren.

## System Notifications

Bietet die Möglichkeit für den Benutzer Statusmeldungen zu generieren:

```javascript
// your module
define(['system_notification'], function (SystemNotification) {
    SystemNotification.notify('The force is strong with you');
    // or with specified status-level and html set to true
    SystemNotification.notify('The force is <strong>strong</strong> with you', 'success', true);
});
```

Vorhandene Status Level: 

* info (default)
* success
* warning
* danger

**Außerdem** ist es möglich einer Notification eine `uniqueID` zu geben, um "Massen-Notifications" zu verhindern:

```javascript
SystemNotification.notify('You typed the wrong answer <strong>again</strong>!', 'warning', true, 'wrong-answer');
```

## String translation

Das Translator (`source/scripts/modules/serlo_translator`) Modul ermöglicht es das interface Übersetzbar zu machen.

```javascript
// your module
define(['translator'], function (t) {
    "use strict";
    // normaler string
    t('Hello'); // => 'Hallo'
    // string mit placeholdern
    t('Hello %s', 'Athene'); // => 'Hallo Athene'
    // string mit number
    t('Since %d days', 2); // => 'Seit 2 Tagen'
    // Kombinationen
    t('Hello %s, you have %d new messages', 'Athene', 3); // => 'Hallo Athene, du hast 3 neue Nachrichten'
});
```

Singular/Plural Unterstützung gibt es **nicht**.

Die Übersetzungen dazu befinden sich in `source/lang/en_EN.json`. Diese Dateien werden von `grunt` automatisch zum `i18n` Modul konkatiniert.

### Update der Sprach-Dateien

Der Grunt Task `grunt language-update` parst alle Javascript Dateien im Verzeichnis `source/scripts` nach Aufrufen der `t()` Funktion und erweitert automatisch alle `source/lang/language.json` um die fehlenden Strings.
Dieser Task muss allerdings händisch ausgeführt werden.

