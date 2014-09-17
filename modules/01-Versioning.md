---
layout: section
title: Versioning
anchor: versioning
group: 'modules'
---
// Das Versioning Modul stellt eine Repository API bereit.
The Versioning module provides a Repository API.

//### Architektur
### Architecture

// * `Versioning\RepositoryManager` hält verschiedenste Repositories
* `Versioning\RepositoryManager` holds various Repositories
// * `Versioning\RepositoryService` hält ein Repository vom Typ `Versioning\Entity\RepositoryInterface` und viele Revisions vom Typ `Versioning\Entity\RevisionInterface`
* `Versioning\RepositoryService` holds a Repository of type `Versioning\Entity\RepositoryInterface` and multiple Revisions of type `Versioning\Entity\RevisionInterface`
// * `Versioning\Entity\RepositoryInterface` muss implementiert werden, wenn ein Model/Entity ein Repository darstellen soll
* `Versioning\Entity\RepositoryInterface` must be implemented by Models/Entities that will be used as a Repository
// * `Versioning\Entity\RevisionInterface` muss implementiert werden, wenn ein Model/Entity eine Revision darstellen soll
* `Versioning\Entity\RevisionInterface` must be implemented by Models/Entities that will be used as a Revision

// Alle Änderungen sind nicht persistent! Das bedeutet, dass ein eventueller ObjectManager dies noch tun muss!
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

// ### Benutzen
### Usage

// #### Ein Repository deklarieren
#### Declaring a Repository

```php
$repository = new Repository();
$serviceManager->get('Versioning\RepositoryManager')->addRepository($repository);

// Falls die Änderungen in die Datenbank geschrieben werden sollen
$entityManager->persist($repository);
$entityManager->flush();
```

#### Den RepositoryService holen

```php
$repositoryService = $serviceManager->get('Versioning\RepositoryManager')->getRepository($repository);
```

#### Eine Revision hinzufügen

```php
$revision = new Revision();
$revision->setId(2);
$revision->setContent('Testinhalt');
$repositoryService->addRevision($revision);

// Falls die Änderungen in die Datenbank geschrieben werden sollen
// Store changes in the database
$entityManager->persist($revision);
$entityManager->flush();
```

// #### Eine Revision finden
#### Finding a Revision

```php
$repositoryService->getRevision(2);
```

// #### Eine Revision setzen
#### Replacing a Revision

```php
$repositoryService->checkoutRevision(2);

// Falls die Änderungen in die Datenbank geschrieben werden sollen
// Store changes in the database
$entityManager->persist($repositoryService->getRepository());
$entityManager->flush();
```

// #### Die gesetzte Revision bekommen
#### Getting the set Revision

```php
$revision = $repositoryService->getCurrentRevision();
```

// #### Die neueste Revision bekommen
#### Getting the latest Revision

```php
$revision = $repositoryService->getHead();
```

// #### Eine Revision von dem Repository entfernen
#### Removing a Revision from the Repository

```php
$revision = $repositoryService->getRevision(2);
$repositoryService->removeRevision(2);

// Falls die Änderungen in die Datenbank geschrieben werden sollen
// Store changes in the database
$entityManager->remove(revision);
$entityManager->flush();
```