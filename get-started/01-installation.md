---
layout: section
title: Installation
anchor: installation
group: 'getstarted'
---

## Requirements

* [Vagrant](http://www.vagrantup.com/)
* [VirtualBox](https://www.virtualbox.org/)
* rsync & ssh

## Windows

You need [MinGW](http://www.mingw.org/) (don't use CgyWin, because rsync over ssh is buggy in CgyWin). Also:

 1. Make sure you click on "rsync" and "openssh" in the installation dialogue: ![http://i.imgur.com/ePnGJlS.png](http://i.imgur.com/ePnGJlS.png)
 2. **Please make sure that rsync is in your path. The path on my system is: C:\MinGW\msys\1.0\bin**.
 3. **WARNING:** Having multiple *unix "suites" (Git, MinGW, CgyWin)* in your path may cause rsync not to work because there are *multiple OpenSSH* installations. An error resulting from this looks like: `rsync error: error in rsync protocol data stream (code 12) at ...`. To resolve this, remove all other environments (Git, CgyWin) from your path or propose a different solution.
 4. If vagrant takes a long time at "rsync", use "vagrant rsync --debug" or "vagrant up --debug" to see what fails.
 5. See also: https://docs.vagrantup.com/v2/synced-folders/rsync.html

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
7. **Keeping the files on the VM in Synch:** `vagrant rsync-auto`
8. Click the link: [athene2](http://localhost:4567)
