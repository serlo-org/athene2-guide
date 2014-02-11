---
layout: section
title: Notes
anchor: notes
group: 'getstarted'
---

## It works!

Great! Vagrant enables per default:

* Apache2 + PHP-5.5
* MySQL-5.5 (with a recent db-dump)
* node, npm, pm2, bower, grunt, composer, sass, compass
* Grunt build (builds your .css, .js assets)
* Composer install (installs php dependencies)
* Sphinx Search (used for fulltext search - updates every minute)
* [phpMyAdmin](http://localhost:4567/phpmyadmin)
* [athene2](http://localhost:4567)

## Slow startup

* After booting, the vm takes some time until all scripts are initialized.
This may take up to 10 minutes - the env won't be working during this time.

## Not vagrant-related

#### Permissions

Permissions with global access should **never** be assigned to lower level roles. Doing so implies severe
security breaches regardless what the intent was. It also may break role assignment for non-sysadmins.

Permissions with global access should **only** be provided to **sysadmin** or similar superusers.