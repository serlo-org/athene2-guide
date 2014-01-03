---
layout: section
title: Introduction
anchor: introduction
group: 'editor'
---

### Introduction

Der Editor kommt mit einem kleinen Node Js Server, der Markdown in HTML konvertiert.  
Über die npm registry läd man den athene2-editor:

````
cd src/modules/Ui/assets
npm install
````

### Dependencies  

* [node.js](http://nodejs.org) (>= 0.10.16) mit npm

### Nice to have

* [pm2](http://devo.ps/blog/2013/06/26/goodbye-node-forever-hello-pm2.html) um den node server am Laufen zu halten

pm2 installation:

````
[sudo] npm -g install pm2
````

### Get it running

Mit **pm2** (empfohlen):

Server starten:

````
pm2 start src/modules/Ui/assets/node_modules/athene2-editor/server/server.js
````

Server beenden:

````
pm2 dump && pm2 kill
````

Ohne pm2:

Starten:

````
node src/modules/Ui/assets/node_modules/athene2-editor/server/server.js
````

Beenden:

````
ctrl+c
````

