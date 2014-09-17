---
layout: section
title: ClassResolver
anchor: classresolver
group: 'modules'
---

The `ClassResolver` module finds concrete implementation of interfaces.

### Configuration

module.config.php

```php
return array(
    'class_resolver' => array(
        'FooInterface' => 'Foo',
        'BarInterface' => 'Bar',
    ),
);
```

### Resolve an interface

```php
$classResolver = $serviceManager->get('ClassResolver\ClassResolver');

echo $classResolver->resolveClassName('FooInterface'); // 'Foo'
```

```php
$classResolver = $serviceManager->get('ClassResolver\ClassResolver');

$bar = $classResolver->resolve('BarInterface'); // equivalent to `$bar = $serviceLocator->get('Bar');`
```
