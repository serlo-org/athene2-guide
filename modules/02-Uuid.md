---
layout: section
title: Uuid
anchor: uuid
group: 'modules'
---

Das Uuid Modul ist zuständig für die "universal unique ids". Es wird benötigt, sobald ein Objekt eine Universal Unique Id braucht.

### Architektur

* UUidManager: Der Manager, welcher es ermöglicht uuids zu finden und zu erstellen.
* Uuid: Das Entity für die uuid Tabelle.
* UuidEntity: Ein Entity, welches eine uuid trägt.

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