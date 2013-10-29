---
layout: section
title: Alias
anchor: alias
group: 'modules'
---

Das Alias Modul dient dazu, Urls schöner zu machen. So wird beispielsweise aus `/page/view/1` `/alias/seite/verein/finanzen`.

### Features

* Entkoppelt: Der AliasManager ist enkoppelt von dem Rest der Software und somit flexibel einsetzbar.
* Fallbacks: Fallbacks garantieren, dass es nicht zu Problemen bei der Aliasvergabe kommt.
* AutoAlias: Per Konfiguration kann man bequem Autoaliasing benutzen.
* Listeners: Listener ermöglichen es mittels Autoaliasing, einfach Aliases zu erstellen.
* UrlGenerating: Der Url ViewHelper checkt, ob für die Url ein Alias existiert und gibt diese aus, falls vorhanden.
* Aliases veralten nicht: Es können mehrere Aliases für eine Url angelegt werden, damit schafft man es, dass beispielsweise Änderungen im Titel keine Auswirkung auf die Auffindbarkeit haben.

### Aliases erstellen

Mit Hilfe von Listenern ist es sehr einfach, Aliases erstellen zu lassen.

#### Beispiel

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
    ),
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