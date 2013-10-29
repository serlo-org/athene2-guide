---
layout: section
title: Tokenizer
anchor: tokenizer
group: 'modules'
---

Dieses Modul ermöglicht es, Strings mit tokens zu versetzen und diese ersetzen zu lassen. So wird beispielsweise aus `hallo {user}` `hallo foobar`.

### How-To

#### Provider aufsetzen

Damit die Tokens ersetzt werden können, muss ein Provider implementiert werden, der diese Daten zur Verfügung stellt:

Provider.php

```php
use Token\Provider\ProviderInterface;
use Token\Provider\AbstractProvider;

class TokenizerProvider extends AbstractProvider implements ProviderInterface
{

    public function getData()
    {
    	/**
    	 *
    	 * Tokens
    	 */
        return array(
            'title' => $this->getObject()->getTitle(),
            'category' => $this->getObject()->getCategory()->getName(),
            'id' => $this->getObject()->getId()
        );
    }

    protected function validObject($object)
    {
    	// Optimalerweise steht hier zum Beispiel: if( ! $object instanceOf FooInterface )    
        if (! is_object($object) )
            throw new \InvalidArgumentException(sprintf('Expected PostInterface but got `%s`', get_class($object)));
    }
}
```


#### Tokenizer benutzen


SomeService.php

```php
class SomeService {
	use \Token\TokenizerAwareTrait;
	
	public function foobar($object)
	{
        $string = $this->getTokenizer()->transliterate('TokenizerProvider', $object, 'token/{id}-{title}');
        echo $string; // output: token/1-test
    }
}
```