---
layout: section
title: Markup
anchor: markup
---

### Artikel

Ein Artikel hat 3 Haupt Bereiche: Titel, Inhalt und die Kommentaransicht

{% highlight html linenos %}
<article class="learning-resource article">
   <header class="plugin-repository field-title">
       <h1>Title</h1> <!-- h1 wichtig fürs SEO -->
   </header>
   <section class="plugin-repository field-content">
       content
   </section>
   <section class="plugin-discussion article-discussion">
       ... Kommentaransicht
   </section>
</article>
{% endhighlight %}

### Text-Aufgabe:

{% highlight html linenos %}
<article class="learning-resource exercise text-exercise">
   <section class="plugin-repository field-content">
       content
   </section>
   <section class="plugin-link linking-solution">
       <article class="learning-resource solution text-solution">
           <section class="plugin-repository field-content">
               content
           </section>
       </article>
   </section>
   <section class="plugin-discussion article-discussion">
       ... Kommentaransicht
   </section>
</article>
{% endhighlight %}