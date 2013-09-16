---
layout: section
title: Architektur
anchor: architecture
group: 'getstarted'
---

### Manager, Services & Entities

Da es sich bei Athene2 um ein CMS für Lernobjekte handelt, kommunizieren die meisten Module mit der Datenbank. Um die API übersichtlich und einfach zu gestalten, enthält jedes Modul, welches mit der Datenbank kommuniziert, mindestens einen Manager, einen Service und ein Entity.

Nehmen wir als Beispiel ein Blogmodul, welches Blogeinträge aus der Datenbank ausliest und darstellt. Es besteht aus:

* PostManager implements PostManagerInterface
* PostService implements PostServiceInterface
* Post implements PostInterface

Der Postmanager hält alle Posts, er ist grob gesagt eine [Fassade](http://de.wikipedia.org/wiki/Fassade_(Entwurfsmuster)) für den ObjectManager, einen InstanceManager und was auch immer sonst noch benötigt wird. Anstatt nun Doctrine umständlich in Controllern aufzurufen, ruft man einfach den PostManager auf, zum Beispiel: `$postManager->getPost(1)` oder `$postManager->getPostsByUser(1)`.

Der PostService [delegiert](http://en.wikipedia.org/wiki/Delegation_pattern) die meisten Aufrufe an das Entity (Post), ermöglicht es aber, Abhängigkeiten zu injezieren, was bei Entities verboten ist. So kann man beispielsweise komplexe Abfragen per SQL-Query lösen, was im Entity nicht müglich wäre.

Wenn wir nun das Blogmodul erweitern wollen, zum Beispiel unterschiedliche Blogs mit verschiedenen Kategorien, dann brauchen wir auch einen BlogManager, der die unterschiedlichen Blogs hält:

* BlogManager implements BlogManagerInterface
* PostManager implements PostManagerInterface
* PostService implements PostServiceInterface
* Post implements PostInterface

Ein exemplarischer Aufruf wäre `$blogManager->findBlogsByLanguageCode('de')` oder `$blogManager->getBlog(1)`.

Ähnlich wie bei Doctrines ObjectManager holt `getBlog(1)` den Blog via dem primary key $id. Ein primary key kann natürlich auch ein String oder ein Objekt sein, wichtig ist nur, dass es der eindeutige Identifier für die Instanz ist.
Abfragen, die nicht per primary key aufgelöst werden, fangen immer mit einem `find` an:

* `findBlogByLanguage(1)`: Findet einen Blog über die Sprache (und derer eindeutige $id)
* `findBlogByLanguageObject($languageObject)`: Findet einen Blog über die Sprache (jetzt aber über ein Objekt, welches LanguageInterface implementiert)
* `findBlogsByCategoryName('technik')`: Findet mehrere Blogs über ihre Kategorie

Dieses Designmuster zieht sich durch alle Module und sollte bei neuen Implementierungen eingehalten werden, um Konsistenz und Verständlichkeit zu wahren.