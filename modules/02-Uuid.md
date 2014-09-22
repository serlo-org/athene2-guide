---
layout: section
title: Uuid
anchor: uuid
group: 'modules'
---

The `Uuid` module provides "universal unique ids" for any object.

### Architecture

* `UUid\Manager\UUidManager implements UUid\Manager\UUidManagerInterface`: The Manager used for finding and creating uuids.
* `UUid\Entity\Uuid implements Uuid\Entity\UuidInterface`: The Entity stored in the uuid table.
* `UUid\Entity\UuidEntity implements Uuid\Entity\UuidHolder`: An Entitiy that has a uuid.

// Der ServiceManager kennt `UUid\Manager\UUidManager`.
The ServiceManager knows about `UUid\Manager\UUidManager`.

// #### Achtung
#### Warning

`$uuidManager->create()` flushes the `ObjectManager due to restrictions in [Doctrine](http://stackoverflow.com/questions/9117227/doctrine-2-multi-level-onetoone-cascade)!

### Setup

Consider blog entries that have Uuids.

BlogPost.php

```php
class BlogPost extends UuidEntity {
	// ...
}
```

#### Create a new `BlogPost`

First way

```php
$blogPost = new BlogPost();
$uuidManager->injectUuid($blogPost);
$uuidManager->getObjectManager()->flush();
```

Second way

```php
$blogPost = new BlogPost();
$uuid = $uuidManager->create();
$uuidManager->injectUuid($blogPost, $uuid);
$uuidManager->getObjectManager()->flush();
```

Third way

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

#### Access the uuid

```php
echo $blogPost->getId();
```

#### Access the uuid hash

```php
echo $blogPost->getUuid();
```
