---
layout: section
title: Introduction
anchor: introduction
group: 'editor'
---

### Introduction

The Athene2 Editor uses a Node JS server that converts the MD format into HTML. The NPM Registry loads the Athene2 Editor  

````
cd src/modules/ui/assets
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

### Up and Running

Mit **pm2** (recommended):

Initialise the server:

````
pm2 start src/modules/Ui/assets/node_modules/athene2-editor/server/server.js
````

Shut down server:

````
pm2 dump && pm2 kill
````

Without pm2:

Start:

````
node src/modules/Ui/assets/node_modules/athene2-editor/server/server.js
````

Stop:

````
ctrl+c
````

