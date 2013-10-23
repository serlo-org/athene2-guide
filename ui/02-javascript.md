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
define(['system_notification'], function (SystemNotification) {
    SystemNotification.notify('The force is strong with you');
    // or with specified status-level and html set to true
    SystemNotification.notify('The force is <strong>strong</strong> with you', 'success', true);
});
{% endhighlight %}

Vorhandene Status Level: 

* info (default)
* success
* warning
* danger

**Außerdem** ist es möglich einer Notification eine `uniqueID` zu geben, um "Massen-Notifications" zu verhindern:

{% highlight javascript %}
SystemNotification.notify('You typed the wrong answer <strong>again</strong>!', 'warning', true, 'wrong-answer');
{% endhighlight %}

## String translation

Das Translator (`source/scripts/modules/serlo_translator`) Modul ermöglicht es das interface Übersetzbar zu machen.

{% highlight javascript %}
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
{% endhighlight %}

Singular/Plural Unterstützung gibt es **nicht**.

Die Übersetzungen dazu befinden sich in `source/lang/en_EN.json`. Diese Dateien werden von `grunt` automatisch zum `i18n` Modul konkatiniert.

### Update der Sprach-Dateien

Der Grunt Task `grunt language-update` parst alle Javascript Dateien im Verzeichnis `source/scripts` nach Aufrufen der `t()` Funktion und erweitert automatisch alle `source/lang/language.json` um die fehlenden Strings.
Dieser Task muss allerdings händisch ausgeführt werden.

## Modals

**Confirm**, **Alert** und **Notify** Modals können durch bestimmte HTML Klassen automatisch auf Links und Buttons gesetzt werden:

{% highlight html %}
<button class="dialog" href="/some/action" data-content="Do you really want to delete this item?" data-type="danger">Delete</button>
{% endhighlight %}

## TimeAgo Felder

Um ein Datum im "Vor x"-Format darzustellen, reicht es aus, einem Tag die Klasse `.timeago` und als `title` Attribut ein valides Datum zu geben:

{% highlight html %}
<span class="timeago" title="Mon Oct 20 2013 12:25:20 GMT+0200 (CEST)">21.10.2013</span>
{% endhighlight %}

Wird automatisch zu (etwas ähnlichem wie):

{% highlight html %}
<span class="timeago" title="20.10.2013">Vor zwei Tagen</span>
{% endhighlight %}
