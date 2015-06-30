---
layout: section
title: Tools
anchor: tools
group: 'getstarted'
---

### To accelerate the application

For instance by using build class and template maps, the application will run faster.
Run:

* `vagrant ssh`
* `cd bin`
* `sudo sh build.sh`

When developing in build mode, there can be various things that impact the application's performance.
The following will clean up the clean up the build,
Run:

* `vagrant ssh`
* `cd bin`
* `sudo sh clean-build.sh`

### To update the user interface

For issues with **Exceptions caused by Assetic** or to update the frontend dependencies,
Run:

* `vagrant ssh`
* `cd bin`
* `sudo sh clean-ui.sh`

### To update or reset the database

When the database out of date, or to reset the database,
Run:

* `vagrant ssh`
* `cd bin`
* `sudo sh update-mysql.sh`

Or use the following:

 [phpMyAdmin](http://localhost:4567/phpmyadmin).

### To update composer dependencies

* `vagrant ssh`
* `cd /var/www/`
* `php composer.phar update`

### To reset the virtual machine

* `vagrant destroy`
* `vagrant up`
