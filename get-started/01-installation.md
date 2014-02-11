---
layout: section
title: Installation
anchor: installation
group: 'getstarted'
---

## Requirements

* [Vagrant](http://www.vagrantup.com/)
* [VirtualBox](https://www.virtualbox.org/)

## Preinstall WINDOWS

Windows requires a special setup for symbolic links:

1. Shutdown all VirtualMachines with the VirtualBox GUI
2. Close all VirtualBox GUIs
3. Make sure, that no more instances of VirtualBox are running
4. Run `cmd` as an Administrator:
 * Open the start menu
 * Enter "cmd.exe"
 * Right click on cmd.exe
 * Select "start as administrator"
5. Run `fsutil behavior set SymlinkEvaluation L2L:1 R2R:1 L2R:1 R2L:1` in the cmd window
6. Follow the Installation steps below **but** make sure to run `vagrant up` (step 7) from the cmd window you opened in step 4

**Note:** You only need to do this when you do a fresh install (e.g. after `vagrant destroy` or on a new system).
You can run `vagrant up` from a normal command line after the VM has been provisioned successfully.

## Installation

1. `vagrant box add precise32 http://files.vagrantup.com/precise32.box` - only needs to be done once per system
2. `git clone https://github.com/serlo-org/athene2.git` - clones the git repository
3. `cd athene2/` - the athene2 root directory
4. Setup your local settings
 * `cp src/config/autoload/local.php.dist src/config/autoload/local.php` (Linux)
 * `copy src/config/autoload/local.php.dist src/config/autoload/local.php` (Windows)
5. `cd vagrant/`
6. `vagrant up`
7. Open [athene2](http://localhost:4567)