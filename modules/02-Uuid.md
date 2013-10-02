---
layout: section
title: Uuid
anchor: uuid
group: 'modules'
---

Das Uuid Modul ist zuständig für die "universal unique ids". Es wird benötigt, sobald ein Objekt eine Universal Unique Id braucht.

### Architektur

* `UUid\Manager\UUidManager implements UUid\Manager\UUidManagerInterface`: Der Manager, welcher es ermöglicht uuids zu finden und zu erstellen.
* `UUid\Entity\Uuid implements Uuid\Entity\UuidInterface`: Das Entity für die uuid Tabelle.
* `UUid\Entity\UuidEntity implements Uuid\Entity\UuidHolder`: Ein Entity, welches eine uuid trägt.

Der ServiceManager kennt `UUid\Manager\UUidManager`.

#### Achtung

`$uuidManager->create()` flushed den ObjectManager, dies ist aufgrund einer Restriktion von [Doctrine](http://stackoverflow.com/questions/9117227/doctrine-2-multi-level-onetoone-cascade)!

### Setup

Wir haben Blogeinträge, die eine Uuid besitzen.


BlogPost.php

```php
class BlogPost extends UuidEntity{
	// ...
}
```

### Einen neuen BlogPost erstellen

Möglichkeit 1

```php
$blogPost = new BlogPost();
$uuidManager->injectUuid($blogPost);
$uuidManager->getObjectManager()->flush();
```

Möglichkeit 2

```php
$blogPost = new BlogPost();
$uuid = $uuidManager->create();
$uuidManager->injectUuid($blogPost, $uuid);
$uuidManager->getObjectManager()->flush();
```

Möglichkeit 3

```php
class BlogPost extends UuidEntity{
	public function __construct(){
		$this->setUuid(new Uuid());
	}
}

$blogPost = new BlogPost();

$this->getObjectManager()->persist($blogPost->getUuid());
$this->getObjectManager()->persist($blogPost);
$this->getObjectManager()->flush();

```

### Die uuid anzeigen

```php
echo $blogPost->getId();
```

### Den uuid hash anzeigen

```php
echo $blogPost->getUuid();
```