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

{% highlight javascript %}
/*global define*/
define('myModule', ['jquery'], function ($) {
    "use strict";
    var MyModule = function () {...};

    return MyModule;
});
{% endhighlight %}

(siehe auch [http://requirejs.org/](http://requirejs.org/))

Um module verwenden zu können müssen sie in der mainConfig (scripts/main.js) registriert werden:

{% highlight javascript %}
require.config({
    paths: {
        "myModule": "modules/my_module"
    }
});
{% endhighlight %}

Dann können sie z.B. in der Hauptapplikation (scripts/ATHENE2.js) verwendet werden:

{% highlight javascript %}
define("ATHENE2", ['jquery', 'referrer_history', 'my_module'], function ($, ReferrerHistory, MyModule) {
    "use strict";
    var myInstance = new MyModule();
});
{% endhighlight %}

## Common

Das `common` Modul bietet einige Helfer Funktionen. Dazu schaut man am besten direkt in das Modul.
Die Wichtigste ist wohl das `logging`:

Anstatt direkt mit `console.log` zu arbeiten, gibt es `Common.log`. Dies ist ein Wrapper, der verhindert, dass es zu Fehlern kommt, wenn versehentlich ein `console.log` im Code bleibt.

## System Notifications

Bietet die Möglichkeit für den Benutzer Statusmeldungen zu generieren:

{% highlight javascript %}
// your module
define(['system_notifications'], function (SystemNotifications) {
    SystemNotifications.notify('The force is strong with you');
    // or with specified status-level and html set to true
    SystemNotifications.notify('The force is <strong>strong</strong> with you', 'success', true);
});
{% endhighlight %}

Vorhandene Status Level: 

* info (default)
* success
* warning
* danger

