---
layout: section
title: License
anchor: license
group: 'modules'
---

Some content is published under a specific license.

### Configuration

You can specify a default license for each language:

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
In this example, the manager will search the database for a license with language `en` and title `cc-by-sa-3.0`.


### Usage

<!-- ### Entities LicenseAware machen -->
#### Implement `LicenseAwareInterface`

To use the `LicenseManager` for injection of licenses, the `Entity` or `Model` has to implement the `LicenseAwareInterface`.

Entity.php

```php
class Entity implements LicenseAwareInterface
{
	// ...
}
```


A concrete implementation (using Doctrine) might look as follows:

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

In this case, `LicenseInterface` is not a mistake but will be resolved by Doctrine automatically.


#### Inject licenses


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
