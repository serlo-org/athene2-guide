---
layout: section
title: Notes
anchor: notes
group: 'getstarted'
---

## It works!

Vagrant enables per default:

* Apache2 + PHP-5.5
* MySQL-5.5 (with a recent db-dump)
* node, npm, pm2, bower, grunt, composer, sass, compass
* Grunt build (builds your .css, .js assets)
* Composer install (installs php dependencies)
* Sphinx Search (used for fulltext search - updates every minute)
* [phpMyAdmin](http://localhost:4567/phpmyadmin)
* [athene2](http://localhost:4567)

## Slow startup

* After booting, the VM script initialization process takes too long.
The initialization process may take up to 10 minutes during which time the environment will not be working. (needs some further explanation, why does it take ten minutes)

## Not vagrant-related

#### Permissions

Permissions with global access should ** never ** be assigned to lower level roles. Doing so would imply a severe
security breach independent of any intended action. It also may violate the role assignment for non-sysadmins.

Permissions with global access should ** only ** be provided to **sysadmin** or similar superusers.