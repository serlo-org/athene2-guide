---
layout: section
title: Versioning
anchor: versioning
group: 'modules'
---
Das Versioning Modul stellt eine Repository API bereit.

### Architektur

* `Versioning\RepositoryManager` hält verschiedenste Repositories
* `Versioning\RepositoryService` hält ein Repository vom Typ `Versioning\Entity\RepositoryInterface` und viele Revisions vom Typ `Versioning\Entity\RevisionInterface`
* `Versioning\Entity\RepositoryInterface` muss implementiert werden, wenn ein Model/Entity ein Repository darstellen soll
* `Versioning\Entity\RevisionInterface` muss implementiert werden, wenn ein Model/Entity eine Revision darstellen soll

Alle Änderungen sind nicht persistent! Das bedeutet, dass ein eventueller ObjectManager dies noch tun muss!

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

### Benutzen

#### Ein Repository deklarieren

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
$entityManager->persist($revision);
$entityManager->flush();
```

#### Eine Revision finden

```php
$repositoryService->getRevision(2);
```

#### Eine Revision setzen

```php
$repositoryService->checkoutRevision(2);

// Falls die Änderungen in die Datenbank geschrieben werden sollen
$entityManager->flush();
```

#### Die gesetzte Revision bekommen

```php
$revision = $repositoryService->getCurrentRevision();
```

#### Die neueste Revision bekommen

```php
$revision = $repositoryService->getHead();
```

#### Eine Revision von dem Repository entfernen

```php
$revision = $repositoryService->getRevision(2);
$repositoryService->removeRevision(2);

// Falls die Änderungen in die Datenbank geschrieben werden sollen
$entityManager->remove(revision);
$entityManager->flush();
```