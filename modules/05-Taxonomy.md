---
layout: section
title: Taxonomy
anchor: taxonomy
group: 'modules'
---

// Das Taxonomymodul ist zuständig, um Taxonomien (zb. Kategorie, Land, Lehrplan, ...) zu verwalten.
// Die Datenstruktur ist ein Baum wobei es nur eine Wurzel geben sollte (um die Taxonomien zentral verwalten zu können), jeder Knotenpunkt kann einen konfigurierbaren Typen haben.
The `Taxonomy` module manages taxonomies, like "category", "country", "curriculum"...
The underlying datastructure is a tree. Each node can be of a configurable type.

### Architecture

// * `SharedTaxonomyManager implements SharedTaxonomyManagerInterface` verwaltet die unterschiedlichen Taxonomy Typen (zb. Kategorie, Lehrplan), kann aber auch Terme über die ID finden
// * `TaxonomyManager implements TaxonomyManagerInterface` stellt einen Taxonomy Typen da, welcher mehrere Terme hält.
// * `TaxonomyService implements TaxonomyServiceInterface` ist ein einzelner Term, wobei es sich um einen Delegator bzw eine Fassade hält.
// * `TaxonomyType implements TaxonomyTypeInterface` ist ein Taxonomy Typ (zb "category" oder "curriculum")
// * `Taxonomy implements TaxonomyInterface` ist ein Taxonomy Typ in einer bestimmten Sprache (zb "category" & "de")
// * `TaxonomyTerm implements TaxonomyTermInterface` ist der eigentliche Term, wobei die Inhalte des Terms speratat über das Term Modul gespeichert werden, um doppelte Inhalte zu vermeiden.

* `SharedTaxonomyManager implements SharedTaxonomyManagerInterface` manages various Taxonomy types (e.g. "category" oder "curriculum"), but can also find `Term`s by their id.
* `TaxonomyManager implements TaxonomyManagerInterface` represents a `Taxonomy` type, which manages multiple `Term`s.
* `TaxonomyService implements TaxonomyServiceInterface` a delegator/Ffssade managing a single `Term`
* `TaxonomyType implements TaxonomyTypeInterface` is a `Taxonomy` type (e.g. "category" oder "curriculum")
* `Taxonomy implements TaxonomyInterface` is a `Taxonomy` type in a given language (e.g. "category" & "en")
* `TaxonomyTerm implements TaxonomyTermInterface` is the actual `Term`. The `Term`'s contents are stored seperately via the `Term` module in order to avoid redundancy.

### Configuration

module.config.php

```php
return array(
    'taxonomy' => array(

    	// define your associations here
        'associations' => array(

        	// you can get the associated entities with $termService->getAssociated('foolinks');
            'foolinks' => function  (ServiceLocatorInterface $sm, $collection)
            {
                return $sm->get('FoobarService')->doSomething($collection);
            }

        ),

        // define your types here
        'types' => array(

        	// type 'foo'
            'foo' => array(
                'options' => array(

                	// no associations are allowed. You can not use $termService->getAssociated('foolinks')!
                    'allowed_associations' => array(
                    ),

                    // the only parent type allowed is 'root'. Note that you can't add foo to foo, as it is not an allowed parent type
                    'allowed_parents' => array(
                        'root',
                    ),

                    // use custom templates
                    'templates' => array(

                    	// use a custom template for the update view
                        'update' => 'taxonomy/taxonomy/update'
                    ),

                    // radix disabled, you can't set parent_id to null!
                    'radix_enabled' => false
                )
            ),
            'bar' => array(
                'options' => array(

                	// Associations are allowed. You can use $termService->getAssociated('foolinks')!
                    'allowed_associations' => array(
                    	'foolinks'
                    ),

                	// self-referencing is allowed here
                    'allowed_parents' => array(
                        'foo',
                        'bar'
                    ),
                    'radix_enabled' => false
                )
            ),

            // this is the root, it should always be present
            'root' => array(
                'options' => array(
                    'radix_enabled' => true
                )
            ),
        )
    ),
);
```

### Usage
#### Find a Taxonomy

```php
// by id
$sharedTaxonomyManager->getTaxonomy(1);

// by name (type) and language
$sharedTaxonomyManager->findTaxonomyByName('foo', $languageService);
```

#### Find term via the `SharedTaxonomyManager`

```php
$term = $sharedTaxonomyManager->getTerm(3);
echo $term->getId(); // outputs '3'
```

#### Find a Term via a `TaxonomyManager`

```php
// by id
$term = $taxonomyManager->getTerm(3);
echo $term->getId(); // outputs '3'

// by parent
$ancestors = explode('/', 'path/to/term');
$term = $taxonomyManager->findTermByAncestors($ancestors);
echo $term->getName(); // outputs 'term'
```

#### Find the root(s) of a type.

Find all Terms of a type that do not have a parent or are of a different type then their parents.

```php
$result = $taxonomyManager->getSaplings();
foreach($result as $term){
	echo $term->getId();
}
```

#### Find related Terms

All children

```php
$children = $termService->getChildren();
foreach($children as $term){
	echo $term->getId();
}
```

All children of a specific type

```php
$children = $termService->findChildrenByTaxonomyName('bar');
foreach($children as $term){
	echo $term->getId();
}
```

Find parent

```php
$parent = $termService->getParent();
```

#### Associations

// Damit Assoziationen funktionieren, muss zunächst eine m:n Tabelle von der zu Assoziierenden Tabelle zu `term_taxonomy` in der Datenbank angelegt werden. Außerdem muss Doctrine\ORM wissen, dass es diese Assoziation gibt, womit dem Entity ein neues Attribut verliehen werden muss.
Before a Association can be used, a m:n table must be created between `term_taxonomy` and the table to be associated.
Additionally `Doctrine\ORM` needs to know about the association.

Creating an Association

```php
$termService = $sharedTaxonomyManager()->getTaxonomy('', $languageService)->getTerm(1)
$foolinks = $termService->associate('foolinks', $foolinkEntity);
echo $termService->isAssociated('foolinks', $foolinkEntity); // outputs: true

// make things persistent
$sharedTaxonomyManager()->getObjectManager()->flush();
```

Fetching assiciated elements

```php
$termService = $sharedTaxonomyManager()->getTaxonomy('', $languageService)->getTerm(1)
$foolinks = $termService->getAssociated('foolinks');
```

Removing an association

```php
$termService = $sharedTaxonomyManager()->getTaxonomy('', $languageService)->getTerm(1)
$foolinks = $termService->removeAssociation('foolinks', $foolinkEntity);
echo $termService->isAssociated('foolinks', $foolinkEntity); // outputs: false

// make things persistent
$sharedTaxonomyManager()->getObjectManager()->flush();
```
