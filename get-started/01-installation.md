---
layout: section
title: Installation
anchor: installation
group: 'getstarted'
---

### Requirements

* [Vagrant](http://www.vagrantup.com/)
* [VirtualBox](https://www.virtualbox.org/)

### Installation


* `vagrant box add precise32 http://files.vagrantup.com/precise32.box`
* `git pull https://github.com/serlo-org/athene2.git`
* `cd vagrant/`
* `vagrant up`
* `cp config/autoload/local.php.dist config/autoload/local.php` (Linux)
* `copy config/autoload/local.php.dist config/autoload/local.php` (Windows)
* Upload database dump to [phpMyAdmin](http://127.0.0.1:4567/phpmyadmin)
* Open [athene2](http://127.0.0.1:4567)

### Known issues

#### Composer installation fails with timeout

Sometimes, composer installations fail. In this case, you need to execute composer manually:

* `cd /path/to/athene2/vagrant`
* `vagrant ssh`
* `cd /var/www/`
* `php composer.phar install`
* `php composer.phar update`

### Run tests

* `cd /path/to/athene2/`
* `phpunit` (without coverage)
* `phpunit --coverage-html ./coverage` (with coverage)