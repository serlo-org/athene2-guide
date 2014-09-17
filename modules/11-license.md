---
layout: section
title: License
anchor: license
group: 'modules'
---

<!-- Einige Inhalte benötigen Lizenzen, unter denen sie Veröffentlicht wurden. -->

Some content is published under another license.

<!-- ## Konfiguration -->
## Configuration

<!-- Man kann sehr einfach festlegen, welche Lizenzen als default für die jeweilige Sprache benutzt werden sollen: -->

You can specify the default license for each language:

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

<!-- Der Manager sucht dann beispielsweise in der Datenbank nach einer Lizenz mit der Sprache `de` und dem Titel `cc-by-sa-3.0` -->
In this example, the manager will search the database for a license with language `en` and title `cc-by-sa-3.0`.

<!-- ## Benutzen -->
## Usage

<!-- ### Entities LicenseAware machen -->
### Implement `LicenseAwareInterface`

<!-- Damit man den `LicenseManager` für die Injektion von Lizenzen benutzen kann, muss das Entity oder das Model `LicenseAwareInterface` implementieren: -->

To use the `LicenseManager` for injection of licenses, the `Entity` or `Model` has to implement the `LicenseAwareInterface`.

Entity.php

```php
class Entity implements LicenseAwareInterface
{
	// ...
}
```

<!-- Eine konkrete Implementierung (mit Doctrine) könnte so aussehen: -->

A concrete implementation (with Doctrine) might look as follows:

```php
use Doctrine\ORM\Mapping as ORM;

// ORM definitions like ORM\Entity or ORM\Table
class Entity implements LicenseAwareInterface
{
    /**
     * @ORM\ManyToOne(targetEntity="License\Entity\LicenseInterface")
     */
    protected $license;

    public function getLicense()
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

<!-- `LicenseInterface` ist in dem Fall kein Fehler, sondern wird von Doctrine automatisch aufgelöst. -->
In this case, `LicenseInterface` is no mistake but will be resolved by Doctrine automatically.


<!-- ### Lizenz injizieren -->

### Inject licenses

<!-- #### Default Lizenz injizieren
 -->

<!-- Möchte man eine default Lizenz injizieren, so müssen keine zusätzlichen Parameter angegeben werden. Der LicenseManager holt sich die aktuelle request language vom LanguageManager. -->

If you pass no additional parameters, the default license will be injected. In this case, the `LicenseManager` fetches the current request language from the `LanguageManager`:

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

<!-- #### Custom Lizenz injizieren
 -->

<!-- Möchte man eine andere Lizenz injizieren, so ist dies auch kein Problem. -->

A custom license has to be passed as an additional parameter:

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
