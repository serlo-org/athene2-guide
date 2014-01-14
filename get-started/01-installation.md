---
layout: section
title: Installation
anchor: installation
group: 'getstarted'
---

## Requirements

* [Vagrant](http://www.vagrantup.com/)
* [VirtualBox](https://www.virtualbox.org/)

## Installation

* `vagrant box add precise32 http://files.vagrantup.com/precise32.box`
* `git clone https://github.com/serlo-org/athene2.git`
* `cd vagrant/`
* `vagrant up`
* `cp config/autoload/local.php.dist config/autoload/local.php` (Linux)
* `copy config/autoload/local.php.dist config/autoload/local.php` (Windows)
* Open [athene2](http://localhost:4567)

## Update Database

* **phpmyadmin**
 * Dump into [phpMyAdmin](http://localhost:4567/phpmyadmin)
* **via ssh**
 * `cd /vagrant`
 * `vagrant ssh`
 * `sh updatedb.sh`

## Login with ssh

Do you want to update the composer, npm, bower, ... installation? Just connect via ssh!

* `cd /vagrant`
* `vagrant ssh`
* `cd /var/www/`
* Do whatever you like - e.g. `php composer.phar update`

## Update vm with provisioning

*This is the easiest way to update composer, the database, npm, ...*

However it is not really recommended because it *might* cause some trouble. You can still try it of course - if it doesn't work please refer to section `Provisioning fails`

* `cd vagrant/`
* `vagrant provision`

## Known issues
Vagrant is superb. But, sometimes provisioning fails. Here are some guides how you can reset your workstation.

### Provisioning fails

Sometimes vagrant fails provisioning because some package 404s or because of some other issue.
You'll recognize errors simply because either an error is shown in the console or the website doesn't work.
In those cases, follow these steps to freshly install your vagrant copy:

* Remove all **folders** in the root directory beginning with `.` (except your workspace/IDE folders of course)
* Remove all contents of `src/vendor/*` (except `.gitignore`)
* Remove all contents of `src/module/Ui/assets/node_modules` and `src/modules/Ui/assets/source/bower_components`.
* `cd /vagrant`
* `vagrant destroy`
* `vagrant up`

### This doesn't help

If the guide above doesn't help, remove the project directory, start with a fresh copy from git and follow the steps
described in 'Installation'.

### I've got some other problem

You can access vagrant via `cd vagrant/ && vagrant ssh` for manual setup.

### I want to run `grunt dev` for realtime compiling

* `cd /vagrant`
* `vagrant ssh`
* `cd /var/www/src/module/Ui/assets`
* `grunt dev`

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

## Run tests

### From local

* `cd /path/to/athene2/`
* `phpunit` (without coverage)
* `phpunit --coverage-html ./coverage`

#### From vagrant

Not supported yet (you shouldn't do that anyway)