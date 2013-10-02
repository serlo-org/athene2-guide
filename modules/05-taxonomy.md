---
layout: section
title: Taxonomy
anchor: taxonomy
group: 'modules'
---

Das Taxonomymodul ist zuständig, um Taxonomien (zb. Kategorie, Land, Lehrplan, ...) zu verwalten.
Die Datenstruktur ist ein Baum wobei es nur eine Wurzel geben sollte (um die Taxonomien zentral verwalten zu können), jeder Knotenpunkt kann einen konfigurierbaren Typen haben.


### Architektur

* `SharedTaxonomyManager implements SharedTaxonomyManagerInterface` verwaltet die unterschiedlichen Taxonomy Typen (zb. Kategorie, Lehrplan), kann aber auch Terme über die ID finden
* `TaxonomyManager implements TaxonomyManagerInterface` stellt einen Taxonomy Typen da, welcher mehrere Terme hält.
* `TaxonomyService implements TaxonomyServiceInterface` ist ein einzelner Term, wobei es sich um einen Delegator bzw eine Fassade hält.
* `TaxonomyType implements TaxonomyTypeInterface` ist ein Taxonomy Typ (zb "category" oder "curriculum")
* `Taxonomy implements TaxonomyInterface` ist ein Taxonomy Typ in einer bestimmten Sprache (zb "category" & "de")
* `TaxonomyTerm implements TaxonomyTermInterface` ist der eigentliche Term, wobei die Inhalte des Terms speratat über das Term Modul gespeichert werden, um doppelte Inhalte zu vermeiden.

### Konfigurieren

module.config.php

```php
return array(
    'taxonomy' => array(
    
    	// Define your associations here
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


### Benutzen

#### Eine Taxonomy finden

Per Id
```php
$sharedTaxonomyManager->getTaxonomy(1);
```

Per Name (Typ) und Sprache
```php
$sharedTaxonomyManager->findTaxonomyByName('foo', $languageService);
```

#### Einen Term über den SharedTaxonomyManager finden

```php
$term = $sharedTaxonomyManager->getTerm(3);
echo $term->getId(); // outputs '3'
```

#### Einen Term über einen TaxonomyManager finden

Per Id

```php
$term = $taxonomyManager->getTerm(3);
echo $term->getId(); // outputs '3'
```

Über die Eltern

```php
$ancestors = explode('/', 'path/to/term');
$term = $taxonomyManager->findTermByAncestors($ancestors);
echo $term->getName(); // outputs 'term'
```

#### Die Wurzel(n) dieses Typen finden

Gibt alle Terme dieses Typs zurück, die keine Eltern haben oder einen anderen Typen als Eltern haben.

```php
$result = $taxonomyManager->getSaplings();
foreach($result as $term){
	echo $term->getId();
}
```

#### Verwandte eines Terms finden

Alle Kinder finden

```php
$children = $termService->getChildren();
foreach($children as $term){
	echo $term->getId();
}
```

Nur Kinder eines bestimmten Typs finden

```php
$children = $termService->findChildrenByTaxonomyName('bar');
foreach($children as $term){
	echo $term->getId();
}
```

Die Eltern finden

```php
$parent = $termService->getParent();
```

#### Assoziationen

Damit Assoziationen funktionieren, muss zunächst eine m:n Tabelle von der zu Assoziierenden Tabelle zu `term_taxonomy` in der Datenbank angelegt werden. Außerdem muss Doctrine\ORM wissen, dass es diese Assoziation gibt, womit dem Entity ein neues Attribut verliehen werden muss.


Eine Assoziation erstellen

```php
$termService = $sharedTaxonomyManager()->getTaxonomy('', $languageService)->getTerm(1)
$foolinks = $termService->associate('foolinks', $foolinkEntity);
echo $termService->isAssociated('foolinks', $foolinkEntity); // outputs: true

// Making things persistent
$sharedTaxonomyManager()->getObjectManager()->flush();
```

Assoziierte Elemente holen

```php
$termService = $sharedTaxonomyManager()->getTaxonomy('', $languageService)->getTerm(1)
$foolinks = $termService->getAssociated('foolinks');
```

Eine Assoziation löschen

```php
$termService = $sharedTaxonomyManager()->getTaxonomy('', $languageService)->getTerm(1)
$foolinks = $termService->removeAssociation('foolinks', $foolinkEntity);
echo $termService->isAssociated('foolinks', $foolinkEntity); // outputs: false

// Making things persistent
$sharedTaxonomyManager()->getObjectManager()->flush();
```