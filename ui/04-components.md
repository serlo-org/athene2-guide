---
layout: section
title: Komponenten
anchor: components
group: 'ui'
---

> Ready to use functionalities

## Overlay

Alle Links mit der Klasse `.ajax-content` öffnen sich in einem Overlay. Wenn sich im geladenen Inhalt wieder `.ajax-content` Links befinden öffnen sich diese bei Klick im selben Overlay als neues Tab.
All links with the class '.ajax.content' open in an overlay. If the link contains '.ajax-content' nested links, they open with a click in the same overlay as a new tab.

All available options can be passed to the module ATHENE2 during the AjaxOverlay initiation / instantiation .
Alle verfügbaren Optionen können im Modul `ATHENE2` während der Instanzierung des AjaxOverlays übergeben werden:

```javascript
{
    // die Klasse auf die das Overlay angewandt werden soll
	// The class that is used by the overlay
    linkClass: 'ajax-content',
    // Elemente die das Overlay schließen
	// Elements that close the overlay
    closeClass: 'close-overlay',
    // Standard Context für das initialisieren der .linkClass
	// Standard context for the '.linkclass' initialisation
    context: 'body',
    // active body class
    overlayActiveClass: 'ajax-content-active',
    // der Inhalt Selector, nach dem in per ajax geladenen Inhalt gesucht wird
	// The inhalt selector in which ajax loaded content searches 
    ajaxContentSelector: '#content-container',
    // der Selector der dem Tab den Titel gibt
	// Selector that give titles tabs
    titleSelector: '#pagetitle',
    // Klasse für das aktive Tab
	// Class for the active tab
    activeTabClass: 'active',
    // Wie viele Tabs maximal dargestellt werden sollen
	// Defines the maximum number of tabs to be displayed
    tabLimit: 5,
    // Callbacks
    on: {
        // Wenn neuer Inhalt geladen wurde
		// After new content loads
        contentLoaded: function (AjaxOverlayInstance) {
            // 'this' is the AjaxPage instance
        },
        // Wenn eine AjaxPage (tab) geöffnet wurde
		// After an AjaxPage opens
        contentOpened: function (AjaxOverlayInstance) {
            // 'this' is the AjaxPage instance
        },
        // Wenn ein Ajax Fehler auftritt
		// After an Ajax error occurs
        error: function () {
            // 'this' is the AjaxOverlay instance,
            // arguments are all the arguments from jQuery.ajax.error
        },
        // Bevor das Overlay geschlossen wird
		// Before the Overlay closes
        beforeClose: function () {
            // 'this' is the AjaxOverlay instance
        },
        // Nachdem das Overlay geschlossen wurde
		// After the Overlay closed
        afterClose: function () {
            // 'this' is the AjaxOverlay instance
        },
        // Bevor das Overlay geöffnet wird
		// Before the Overlay opens
        beforeOpen: function () {
            // 'this' is the AjaxOverlay instance
        },
        // Nachdem das Overlay geöffnet wurde
		// After the Overlay opens
        afterOpen: function () {
            // gets called right after the AjaxOverlay has been opened
            // 'this' is the AjaxOverlay instance
        }
    }
}
```


## Modals

**Confirm**, **Alert** und **Notify** Modals können durch bestimmte HTML Klassen automatisch auf Links und Buttons gesetzt werden:
**Confirm**, **Alert** und **Notify** Modals use certain HTML classes to automatically set links and buttons

Optionen: 

* `data-type` Attribut: `primary` (default), `success`, `warning`, `info`, `danger`
* `data-title` Attribut (optional): Titel des Modals
* `data-label` Attribut (optional): Titel des Okay Buttons
* `data-cancel` Attribut (optional): "false", wenn kein Close Button dargestellt werden soll


```html
<button class="dialog" href="/some/action" data-content="Do you really want to delete this item?" data-title="Heads up!" data-type="danger">Delete</button>
```

Ein Modal kann auch per Javascript erstellt werden:

```javascript
// Modal.show(options[, uid]);
Modal.show({
    type: 'primary' || 'success' || 'warning' || 'info'
    title: 'Title', // Titel des Modals
    content: '', // Inhalt des Modals
    href: '' // target url for okay button (optional),
    cancel: true, // (optional)
    label: 'Okay' // (optional)
});
```

## Datepicker

Ein Datepicker lässt sich durch folgendes Markup initialisieren:

```html
<input type="text" class="datepicker form-control" />
```

Eine Daterange wie folgt:

```html
<div class="input-daterange input-group">
    <input type="text" class="form-control" name="start" />
    <span class="input-group-addon">to</span>
    <input type="text" class="form-control" name="end" />
</div>
```

(siehe auch [https://github.com/eternicode/bootstrap-datepicker](https://github.com/eternicode/bootstrap-datepicker))

## TimeAgo Felder

Um ein Datum im "Vor x"-Format darzustellen, reicht es aus, einem Tag die Klasse `.timeago` und als `title` Attribut ein valides Datum zu geben:

```html
<span class="timeago" title="Mon Oct 20 2013 12:25:20 GMT+0200 (CEST)">21.10.2013</span>
```

Wird automatisch zu (etwas ähnlichem wie):

```html
<span class="timeago" title="20.10.2013">Vor zwei Tagen</span>
```


## Sortable List

Sortierbare Listen sind durch das jQuery Modul [Nestable](http://dbushell.github.io/Nestable/) ermöglicht.

List Optionen

* `data-action` Attribut (required): die URL für das Speichern der Sortierung
* `data-depth` Attribut: Die maximale tiefe einer Verschachtelten Liste (default: 0)
* `data-active`: Wenn auf `false` gesetzt, muss der Benutzer das Sortieren erst aktivieren (default: `true`)

Item Option

* `data-id` Attribut (required): die ID des jeweiligen Inhaltes


Beispiel Markup:

```html
<!-- das Attribut data-action enthält die URL
    über die die neue Sortierung gespeichert werden kann -->
<div class="sortable" data-action="/save/my/sort" data-depth="5" data-active="false">
    <div class="sortable-actions">
        <!-- (Optional) Button um das Sortieren zu aktivieren -->
        <!-- Nur wichtig wenn data-active="false" -->
        <button class="btn btn-success sortable-activate-action">
            Sortieren
        </button>
        <!-- ein Link oder Button, der die aktion "Speichern" auslöst -->
        <!-- wichtig sind die Klassen .sortable-save-action und .is-hidden -->
        <button class="btn btn-success sortable-save-action is-hidden">
            Reihenfolge speichern
        </button>
        <!-- Ein Button um alle Änderungen rückgängig zu machen -->
        <button class="btn btn-success sortable-abort-action is-hidden">
            Abbrechen
        </button>
    </div>
    <ol class="sortable-list">
        <!-- das data-id Attribut enthält die ID des jeweiligen Inhaltes -->
        <li class="sortable-item" data-id="1">
            <!-- das element, das dem Benutzer das Draggen erlaubt -->
            <span class="sortable-handle"></span>
            <div class="sortable-item-inner">
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
</div>
```

**Das Handle** kann entweder ein eigenes `span` Element sein (siehe oben), oder mit dem gesamten Listen Inhalt verknüpft sein:

```html
...
<li class="sortable-item" data-id="1">
    <div class="sortable-item-inner sortable-handle">
        ...
    </div>
</li>
...
```
In beiden Fällen muss der `.sortable-handle` allerdings ein direktes Child des `.sortable-item`s sein.
