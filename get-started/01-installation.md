---
layout: section
title: Installation
anchor: installation
group: 'getstarted'
---

### Anforderungen

* PHP 5.4+
* Mysql 5.5+

### Installation

* `git pull https://github.com/serlo-org/athene2.git`
* `cd src/`
* `php composer.phar install`
* `cp config/autoload/local.php.dist config/autoload/local.php` (Linux)
* `copy config/autoload/local.php.dist config/autoload/local.php` (Windows)
* Bearbeite `config/autoload/local.php`

### Tests

* `mysql < db/test.sql
* `cd src/test/AtheneTest`
* `phpunit`