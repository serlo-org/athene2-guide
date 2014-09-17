---
layout: section
title: ClassResolver
anchor: classresolver
group: 'modules'
---
<!-- Der ClassResolver findet zu Interfaces die passende Implementierung. -->

The `ClassResolver` module finds concrete implementation of interfaces.

<!-- ### Konfigurieren -->

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

$bar = $classResolver->resolve('BarInterface'); // äquivalent zu `$bar = $serviceLocator->get('Bar');`
```
