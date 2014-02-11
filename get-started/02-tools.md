---
layout: section
title: Tools
anchor: tools
group: 'getstarted'
---

### Speed up the application

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

### Update user interface

You're having troubles with **Exceptions caused by Assetic** or you want to update the frontend dependencies? Run:

* `cd athene2/vagrant`
* `vagrant ssh`
* `cd bin`
* `sudo sh clean-ui.sh`

### Update Database

Is the database out of date or do you want to reset it? Run:

* `cd athene2/vagrant`
* `vagrant ssh`
* `cd bin`
* `sudo sh update-mysql.sh`

You can also use [phpMyAdmin](http://localhost:4567/phpmyadmin).

### Update composer dependencies

* `cd athene2/vagrant`
* `vagrant ssh`
* `cd /var/www/`
* `php composer.phar update`

### Reset the vm

* `cd athene2/vagrant`
* `vagrant destroy`
* `vagrant up`