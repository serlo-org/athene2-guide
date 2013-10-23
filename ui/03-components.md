---
layout: section
title: Komponenten
anchor: components
group: 'ui'
---


## Modals

**Confirm**, **Alert** und **Notify** Modals können durch bestimmte HTML Klassen automatisch auf Links und Buttons gesetzt werden:

{% highlight html %}
<button class="dialog" href="/some/action" data-content="Do you really want to delete this item?" data-type="danger">Delete</button>
{% endhighlight %}


## TimeAgo Felder

Um ein Datum im "Vor x"-Format darzustellen, reicht es aus, einem Tag die Klasse `.timeago` und als `title` Attribut ein valides Datum zu geben:

{% highlight html %}
<span class="timeago" title="Mon Oct 20 2013 12:25:20 GMT+0200 (CEST)">21.10.2013</span>
{% endhighlight %}

Wird automatisch zu (etwas ähnlichem wie):

{% highlight html %}
<span class="timeago" title="20.10.2013">Vor zwei Tagen</span>
{% endhighlight %}


## Sortable List

Sortierbare Listen sind durch das jQuery Modul [Nestable](http://dbushell.github.io/Nestable/) ermöglicht und können verschachtelt sein.

Beispiel Markup:

{% highlight html %}
<!-- das Attribut data-action enthält die URL
    über die die neue Sortierung gespeichert werden kann -->
<div class="sortable" data-action="/save/my/sort">
    <ol class="sortable-list">
        <!-- das data-id Attribut enthält die ID des jeweiligen Inhaltes -->
        <li class="sortable-item" data-id="1">
            <div class="sortable-item-inner">
                <!-- das element, das dem Benutzer das Draggen erlaubt -->
                <span class="sortable-handle">
                    <i class="glyphicon glyphicon-resize-vertical"></i>
                </span>
                <!-- Inhalt des jeweiligen Items -->
                Sortable Item No. 1!
            </div>
            <!-- weitere Verschachtelungen -->
            <ol class="sortable-list">
                <li class="sortable-item" data-id="941">
                    ...
                </li>
            </ol>
        </li>
        <li class="sortable-item" data-id="312">
            ...
        </li>
    </ol>
    <div class="sortable-actions">
        <!-- ein Link oder Button, der die aktion "Speichern" auslöst -->
        <!-- wichtig sind die Klassen .sortable-save-action und .is-hidden -->
        <button class="btn btn-success sortable-save-action is-hidden">
            Reihenfolge speichern
        </button>
    </div>
</div>
{% endhighlight %}

