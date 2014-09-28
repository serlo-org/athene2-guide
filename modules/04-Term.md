---
layout: section
title: Term
anchor: term
group: 'modules'
---

The `Term` module manages words which may be used by the `Taxonomy˚.

### Architecture

* `TermManager` manages `Term`s
* `TermService` holds a `Term`
* `Term` the entity

### Setup

No setup required.

### Find a Term

```php
// by id
$term = $termManager->getTerm(1);

// by name
$term = $termManager->findTermByName('foobar');

// by slug
$term = $termManager->findTermBySlug('foobar');
```

<!-- #### Einen Term erstellen
s
```php
$term = $termManager->findTermBySlug('foobar'); // WHOOT?
``` -->
