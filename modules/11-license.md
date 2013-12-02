---
layout: section
title: License
anchor: license
group: 'modules'
---

Einige Inhalte benötigen Lizenzen, unter denen sie Veröffentlicht wurden. Standardmäßig sollte die (cc-by-sa)[http://creativecommons.org/licenses/by-sa/3.0/de/]

## Konfiguration

Man kann sehr einfach festlegen, welche Lizenzen als default für die jeweilige Sprache benutzt werden sollen:


module.config.php

```php
return [
    'license_manager' => [
        'defaults' => 
        [
        	'de' => 'cc-by-sa-3.0',
        	'en' => 'cc-by-sa-3.0'
        ]
    ],
]
```

Der Manager sucht dann beispielsweise in der Datenbank nach einer Lizenz mit der Sprache `de` und dem Titel `cc-by-sa-3.0`


## Benutzen

### Entities LicenseAware machen

Damit man den `LicenseManager` für die Injektion von Lizenzen benutzen kann, muss das Entity oder das Model `LicenseAwareInterface` implementieren:

Entity.php

```php
class Entity implements LicenseAwareInterface 
{
	// ...
}
```

Eine konkrete Implementierung (mit Doctrine) könnte so aussehen:

```php
use Doctrine\ORM\Mapping as ORM;

// ORM definitions like ORM\Entity or ORM\Table
class Entity implements LicenseAwareInterface 
{
    /**
     * @ORM\ManyToOne(targetEntity="License\Entity\LicenseInterface")
     */
    protected $license;
    
    public function getLicense ()
    {
        return $this->license;
    }
    
    public function setLicense (LicenseInterface $license)
    {
        $this->license = $license;
        return $this;
    }
}
```

`LicenseInterface` ist in dem Fall kein Fehler, sondern wird von Doctrine automatisch aufgelöst.

### Lizenz injizieren

#### Default Lizenz injizieren

Möchte man eine default Lizenz injizieren, so müssen keine zusätzlichen Parameter angegeben werden. Der LicenseManager holt sich die aktuelle request language vom LanguageManager.

```php
class SomeService
{
	use \License\Manager\LicenseManagerAwareTrait;
	
	public function createEntity()
	{
		$entity = new Entity();
		$this->getLicenseManager()->injectLicense($entity);
	}
}
```


#### Custom Lizenz injizieren

Möchte man eine andere Lizenz injizieren, so ist dies auch kein Problem.

```php
class SomeService
{
	use \License\Manager\LicenseManagerAwareTrait;
	
	public function createEntity()
	{
		$entity = new Entity();
		$license = $this->getLicenseManager()->getLicense(3); // Finds a license with the id 3
		$this->getLicenseManager()->injectLicense($entity, $license);
	}
}
```