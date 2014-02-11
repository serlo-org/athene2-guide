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

**Attention Windows Users**

Windows has a built-in max path length of 260 chars. It is strongly advised to put the athene2 root not too deep
on your drive. Possible (reported working) directories are:

* `X:\workspace\athene2`
* `X:\athene2\`

Where X is a drive of your choice.


**Install the environment**

* `vagrant box add precise32 http://files.vagrantup.com/precise32.box` - only needs to be done once
* `git clone https://github.com/serlo-org/athene2.git` - clones the git repository
* `cd athene2/` - the athene2 root directory
* Setup your local settings
 * `cp src/config/autoload/local.php.dist src/config/autoload/local.php` (Linux)
 * `copy src/config/autoload/local.php.dist src/config/autoload/local.php` (Windows)
* `cd vagrant/`
* `vagrant up`
* Open [athene2](http://localhost:4567)


## Tools

#### Speed up the application

You can build class- and template-maps. This will speed up the application. Run:

* `cd athene2/vagrant`
* `vagrant ssh`
* `cd bin`
* `sudo sh build.sh`

Developing in build-mode can cause problems, to clean your build, run:

* `cd athene2/vagrant`
* `vagrant ssh`
* `cd bin`
* `sudo sh clean-build.sh`

#### Update user interface

You're having troubles with **Exceptions caused by Assetic** or you want to update the frontend dependencies? Run:

* `cd athene2/vagrant`
* `vagrant ssh`
* `cd bin`
* `sudo sh clean-ui.sh`

#### Update Database

Is the database out of date or do you want to reset it? Run:

* `cd athene2/vagrant`
* `vagrant ssh`
* `cd bin`
* `sudo sh update-mysql.sh`

You can also use [phpMyAdmin](http://localhost:4567/phpmyadmin).

#### Update composer dependencies

* `cd athene2/vagrant`
* `vagrant ssh`
* `cd /var/www/`
* `php composer.phar update`

## Reset the vm

* `cd athene2/vagrant`
* `vagrant destroy`
* `vagrant up`

## Slow startup

* After booting, the vm takes some time until all scripts are initialized.
This may take up to 10 minutes - the env won't be working during this time.

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