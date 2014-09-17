---
layout: section
title: Uuid
anchor: uuid
group: 'modules'
---

// Das Uuid Modul ist zuständig für die "universal unique ids". Es wird benötigt, sobald ein Objekt eine Universal Unique Id braucht.
The Uuid module provides "universal unique ids" for any Object.

// ### Architektur
### Architecture

// * `UUid\Manager\UUidManager implements UUid\Manager\UUidManagerInterface`: Der Manager, welcher es ermöglicht uuids zu finden und zu erstellen.
* `UUid\Manager\UUidManager implements UUid\Manager\UUidManagerInterface`: The Manager used for finding and creating uuids.
// * `UUid\Entity\Uuid implements Uuid\Entity\UuidInterface`: Das Entity für die uuid Tabelle.
* `UUid\Entity\Uuid implements Uuid\Entity\UuidInterface`: The Entity stored in the uuid table.
// * `UUid\Entity\UuidEntity implements Uuid\Entity\UuidHolder`: Ein Entity, welches eine uuid trägt.
* `UUid\Entity\UuidEntity implements Uuid\Entity\UuidHolder`: An Entitiy that has a uuid.

// Der ServiceManager kennt `UUid\Manager\UUidManager`.
The ServiceManager knows about `UUid\Manager\UUidManager`.

// #### Achtung
#### Warning

// `$uuidManager->create()` flushed den ObjectManager, dies ist aufgrund einer Restriktion von [Doctrine](http://stackoverflow.com/questions/9117227/doctrine-2-multi-level-onetoone-cascade)!
`$uuidManager->create()` flushes the ObjectManager due to restrictions in [Doctrine](http://stackoverflow.com/questions/9117227/doctrine-2-multi-level-onetoone-cascade)!

### Setup

// Wir haben Blogeinträge, die eine Uuid besitzen.
Consider blog entries that have Uuids.

BlogPost.php

```php
class BlogPost extends UuidEntity {
	// ...
}
```

// ### Einen neuen BlogPost erstellen
#### Creating a new BlogPost

// Möglichkeit 1
1st way

```php
$blogPost = new BlogPost();
$uuidManager->injectUuid($blogPost);
$uuidManager->getObjectManager()->flush();
```

// Möglichkeit 2
2nd way

```php
$blogPost = new BlogPost();
$uuid = $uuidManager->create();
$uuidManager->injectUuid($blogPost, $uuid);
$uuidManager->getObjectManager()->flush();
```

// Möglichkeit 3
3rd way

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

// ### Die uuid anzeigen
#### Accessing the uuid

```php
echo $blogPost->getId();
```

// ### Den uuid hash anzeigen
#### Accessing the uuid hash

```php
echo $blogPost->getUuid();
```