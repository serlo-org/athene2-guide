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

Windows requires a special setup:

1. Shutdown all VirtualMachines with the VirtualBox GUI
2. Close all VirtualBox GUIs
3. Run `cmd` as an Administrator (start -> right click on cmd -> start as administrator)
4. Run `fsutil behavior set SymlinkEvaluation L2L:1 R2R:1 L2R:1 R2L:1` in cmd
5. Once you cloned the repository, run vagrant up **as the Administrator** via the cmd from step 3.

#### Do I need to run vagrant up always as an administrator?

No, you only need to do this once, when the vm gets provisioned (-> on a fresh install or after `vagrant destroy`)

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