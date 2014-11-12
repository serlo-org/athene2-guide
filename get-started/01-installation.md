---
layout: section
title: Installation
anchor: installation
group: 'getstarted'
---

## Requirements

* [Vagrant](http://www.vagrantup.com/)
* [VirtualBox](https://www.virtualbox.org/)
* On Windows: [Cygwin](https://www.cygwin.com/)

## Installation

1. `vagrant box add precise64 http://files.vagrantup.com/precise64.box` - only needs to be done once per system
2. `git clone https://github.com/serlo-org/athene2.git` - clones the git repository
3. `cd athene2/` - the athene2 root directory
4. Setup your local settings
 * `cp src/config/autoload/local.php.dist src/config/autoload/local.php` (Linux)
 * `copy src/config/autoload/local.php.dist src/config/autoload/local.php` (Windows)
 * `cp src/config/autoload/develop.local.php.dist src/config/autoload/develop.local.php` (Linux)
 * `copy src/config/autoload/develop.local.php.dist src/config/autoload/develop.local.php` (Windows)
5. `cd vagrant/`
6. `vagrant up`
7. Click the link: [athene2](http://localhost:4567)
