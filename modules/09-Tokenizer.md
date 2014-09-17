---
layout: section
title: Tokenizer
anchor: tokenizer
group: 'modules'
---

The `Tokenizer` module manages the replacement of tokens in strings. For exmaple, `hello {user}` becomes `hello foobar`.

### Usage

#### Set up the provider

To enable the replacement of tokens, you have to implement a provider for the data:

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


#### Use the tokenizer


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
