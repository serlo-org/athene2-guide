---
layout: section
title: Javascript modules
anchor: modules
group: 'ui'
---

## Athene2

`source/scripts/ATHENE2.js`

Initializes nearly everything.

**Methods:**

`initialize($context)`: initializes jQuery and DOM manipulation in given `$context` (jQuery object)

## libs/cache

`cache`

Client side key-value storage that uses `localStorage` or `jQuery.cookie`.

````
var myCache = new Cache('my-cache-id');
````

`myCache.memorize(obj)`: saves the given object

`myCache.remember()`: restores saved data or returns null

`myCache.forget()`: clears the cache

## libs/easing

Extends `jQuery`s easing functions

## libs/eventscope

Function that gives any object or Function custom events.

````
var myObject = eventScope({});
````

`myObject.addEventListener('event-name', callback);`: Adds `callback` as a listener to a `event-name` event

`myObject.trigger('event-name', some, values)`: Triggers formerly added `callback` function

`myObject.removeEventListener('event-name', callback);` Removes `callback` as a listener

## libs/polyfills

A place to put browser polyfills. Currently only requestAnimationFrame.

## modules/serlo_ajax_overlay

See [Components](#components)

## modules/serlo_common

`common`

Contains many helper methods and static variables:

`Common.log`: wrapper for `console.log`

`Common.KeyCode`: for simpler key-detection in `onKey` eventScope

`Common.CarbonCopy(element)`: copies arrays and objects

`Common.sortArrayByObjectKey(key, array, ascending)`: sorts an array that contains objects.

`Common.findObjectByKey`: searches an array or object containing objects

`Common.genericError`: Global error handling (logs only if console.log is available)

`Common.memoize`: memoizes a function

`Common.expr`: simple wrapper for `isDefined && isDefined()` calls, to satisfy jshint.

`Common.trim`: trims Strings

`Common.setInterval`: window.setInterval interface that uses `requestAnimationFrame` if available

`Common.clearInterval`: clears intervals set by `Common.setInterval`


## modules/serlo_content

This component is used to initialize DOM parts. `Content.init` is always called, if some content parts change.

`Content.init($context)`: Calls all formerly added callback functions in context of DOM object `$context`

`Content.add(callback)`: Adds a callback that.

#### Example: 

````
// All links should call alert!
Content.add(function ($context) {
    // this callback gets called, whenever there is new HTML
    // added to the main page. $context is the new HTML 
    $('a', $context).click(function () {
        alert('you clicked a link');
    });
})
````

## modules/serlo_i18n

'Grunt' generates this component! It contains all strings that are needed for internationalization.
To add or remove strings, edit a translation file in `/src/assets/lang/`.

## modules/serlo_injections

This component creates a *jQuery Plugin*.  
It parses the DOM for injections, loads them and decides how to treat them (Image/HTML/GeoGebra).

## modules/serlo_layout

This component makes sure the collapsable side navigation and context bar are clickable.

## modules/serlo_modals

This module creates a *jQuery Plugin* **and** provides a small API.  
See [Components](#components).

## modules/serlo_referrer_history

Stores the users last visited pages.  
This runs by its own.

`ReferrerHistory.isInHistory(path)`: Checks if given `path` has been visited

`ReferrerHistory.getRage(n)`: returns the last `n` visited paths

`ReferrerHistory.getOne(i)`: returns the path on index `i`

`ReferrerHistory.getAll()`: returns the complete serlo_referrer_history

## modules/serlo_router

`Router.navigate(url)`: sends the user to given `url`

`Router.post(path, params, method)`: performs a POST request

`Router.reload()`: reloads the browser

## modules/serlo_search

Everything visually related to the Quicksearch.

## modules/serlo_side_navigation

Everything visualy related to the side navigation.

## modules/serlo_sortable_list

This ia a wrapper for jQuery [Nestable](http://dbushell.github.io/Nestable/).  
Performs POST request to save new list order.

## modules/serlo_spoiler

This component creates a *jQuery Plugin* 
and handles `slideToggle`s for content spoilers.

## modules/supporter

Performs simple checks on the browser API.  
Notifies the user if an API is not available.

`Supporter.add('APIName')`: Adds `APIName` to the list of variables that must be available in `window`.

`Supporter.add(callback)`: Adds `callback` to the list of functions that will be checked on `Supporter.check()`.  
If `callback` returns a `String`, that string will cause a notification.

`Supporter.check()`: Checks all formerly added methods and strings.

## modules/serlo_system_notification

This module generates and communicates notifications:

`SystemNotification.notify(message, status, html, uniqueID);`: Creates a notification.

`SystemNotification.error(message)`: Shortcut for error messages.

```javascript
// your module
define(['system_notification'], function (SystemNotification) {
    SystemNotification.notify('The force is strong with you');
    // or with specified status-level and html set to true
    SystemNotification.notify('The force is <strong>strong</strong> with you', 'success', true);
});
```

Available status levels:

* info (default)
* success
* warning
* danger

When a plugin triggers many notifications, it is adviseable to add `uniqueID` to the method call:

```javascript
SystemNotification.notify('You typed the wrong answer <strong>again</strong>!', 'warning', true, 'wrong-answer');
```

## modules/serlo_timeago

This creates a *jQuery Plugin* that automatically updates time fields.

## modules/translator

Enables interface translation:

```javascript
// your module
define(['translator'], function (t) {
    "use strict";
    // normal string
    t('Hello'); // => 'Hallo'
    // placeholders
    t('Hello %s', 'Athene'); // => 'Hallo Athene'
    // numbers
    t('Since %d days', 2); // => 'Seit 2 Tagen'
    // combination
    t('Hello %s, you have %d new messages', 'Athene', 3); // => 'Hallo Athene, du hast 3 neue Nachrichten'
});
```

At present there is no **No** singular/plural support. (contribute!)

### Updating Localization Files

The `grunt` task `language-update` parses all JavaScript files for `t(..)` calls and updates all lang.json files in `src/assets/lang/`.
