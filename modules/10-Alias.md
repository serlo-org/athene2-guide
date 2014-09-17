---
layout: section
title: Alias
anchor: alias
group: 'modules'
---

The `Alias` module beautifies the URLs. For example, `/page/view/1` becomes `/alias/page/association/finances`.

### Features

* **Decoupled**: The `AliasManager` is decoupled from the rest of the software and can therefore be used more flexibly.
* **Fallbacks**: Fallbacks ensure that no problems arise during the allocation of aliases.
* **AutoAlias**: You can configure automatic aliasing.
* **Listeners**: Listeners make the creation of aliases easy by using automatic aliasing.
* **UrlGenerating**: The URL ViewHelper checks whether an alias already exists for the given URL and returns it.
* **Aliases do not become obsolete**: It is possible to define more than one alias for a given URL. Thus changing titles do not affect the availability of the content.

### Create aliases

Thanks to Listeners, the creation of aliases is easy:

module.config.php

```php
return array(
    'alias_manager' => array(
        'aliases' => array(
            'page' => array(

                // Siehe token guide
                'tokenize' => 'page/{category}/{title}',
                'provider' => 'TokenizerProvider',
                'fallback' => 'page/{category}/{id}-{title}'
            )
        )
    )
);
```



Listener.php

```php

use Alias\Listener\AbstractListener;
use Zend\EventManager\Event;

class BlogControllerListener extends AbstractListener
{

    /**
     * Gets executed on 'onUpdate'
     *
     * @param Event $e
     * @return null
     */
    public function onUpdate(Event $e)
    {
        $page = $e->getParam('page');
        $entity = $page->getEntity();
        $language = $e->getParam('language');

        $url = $e->getTarget()
            ->url()
            ->fromRoute('page/view', array(
            'page' => $page->getId()
        ));

        $this->getAliasManager()->autoAlias('page', $url, $entity, $language);
    }

    public function attachShared(\Zend\EventManager\SharedEventManagerInterface $events)
    {
        $this->listeners[] = $events->attach('SomeController', 'update', array(
            $this,
            'onUpdate'
        ));
    }
}
```


SomeController.php

```php
use Zend\Mvc\Controller\AbstractActionController;

class SomeController extends AbstractActionController
{
    use \Language\Manager\LanguageManagerAwareTrait, \Common\Traits\ObjectManagerAwareTrait;

    public function updateAction()
    {

        $data = $this->params()->fromPost();
        // Siehe user guide
        $language = $this->getLanguageManager()->getLanguageFromRequest();

		$id = $data['id'];
        $title = $data['title'];
        $content = $data['content'];
        $page = $this->updatePage($id, $title, $content);

        $this->getEventManager()->trigger('update', $this, array(
            'page' => $page,
            'language' => $language
        ));

        $this->getObjectManager()->flush();

        return 'saved!';
    }
}
```
