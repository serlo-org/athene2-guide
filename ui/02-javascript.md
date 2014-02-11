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

All JS files get linted by grunt via jshint.

### JS Module

All JS code is developed using the AMD module system `requirejs`.

```javascript
/*global define*/
define('myModule', ['jquery'], function ($) {
    "use strict";
    var MyModule = function () {...};

    return MyModule;
});
```

(see [http://requirejs.org/](http://requirejs.org/))

To make your modules globally available, they have to be registered in the main config file `main.js`.

```javascript
require.config({
    paths: {
        "myModule": "modules/my_module"
    }
});
```

Then they are available for other modules:

```javascript
define("ATHENE2", ['jquery', 'referrer_history', 'my_module'], function ($, ReferrerHistory, MyModule) {
    "use strict";
    var myInstance = new MyModule();
});
```
