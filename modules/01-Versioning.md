---
layout: section
title: Versioning
anchor: versioning
group: 'modules'
---
The `Versioning` module provides a Repository API.

### Architecture

* `Versioning\RepositoryManager` holds various repositories
* `Versioning\RepositoryService` holds a repository of type `Versioning\Entity\RepositoryInterface` and multiple revisions of type `Versioning\Entity\RevisionInterface`
* `Versioning\Entity\RepositoryInterface` must be implemented by Models/Entities that will be used as a repository
* `Versioning\Entity\RevisionInterface` must be implemented by Models/Entities that will be used as a Revision

Changes are *not* persistent! That means, an ObjectManager needs to take care of it!

### Setup

Repository.php

```php
class Repository implements \Versioning\Entity\RepositoryInterface
{
	// ...
}
```

Revision.php

```php
class Revision implements \Versioning\Entity\RevisionInterface
{
	// ...
}
```

### Usage

#### Declare a repository

```php
$repository = new Repository();
$serviceManager->get('Versioning\RepositoryManager')->addRepository($repository);

// Store changes in the database
$entityManager->persist($repository);
$entityManager->flush();
```

#### Fetch the `RepositoryService`

```php
$repositoryService = $serviceManager->get('Versioning\RepositoryManager')->getRepository($repository);
```

#### Add a revision

```php
$revision = new Revision();
$revision->setId(2);
$revision->setContent('Testinhalt');
$repositoryService->addRevision($revision);

// Store changes in the database
$entityManager->persist($revision);
$entityManager->flush();
```

#### Find a revision

```php
$repositoryService->getRevision(2);
```

#### Check out a revision

```php
$repositoryService->checkoutRevision(2);

// Store changes in the database
$entityManager->persist($repositoryService->getRepository());
$entityManager->flush();
```

#### Get the current revision

```php
$revision = $repositoryService->getCurrentRevision();
```

#### Get the latest revision

```php
$revision = $repositoryService->getHead();
```

#### Remove a revision from the repository

```php
$revision = $repositoryService->getRevision(2);
$repositoryService->removeRevision(2);

// Store changes in the database
$entityManager->remove(revision);
$entityManager->flush();
```
