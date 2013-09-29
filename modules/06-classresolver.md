---
layout: section
title: ClassResolver
anchor: classresolver
group: 'modules'
---

Der ClassResolver findet zu Interfaces die passende Implementierung.

### Konfigurieren

module.config.php

```php
return array(
    'class_resolver' => array(
        'FooInterface' => 'Foo',
        'BarInterface' => 'Bar',
    ),
);
```

### Ein Interface auflösen

```php
$classResolver = $serviceManager->get('ClassResolver\ClassResolver');

echo $classResolver->resolveClassName('FooInterface'); // 'Foo'
```

```php
$classResolver = $serviceManager->get('ClassResolver\ClassResolver');

$bar = $classResolver->resolve('BarInterface'); // äquivalent zu `$bar = new Bar();`
```