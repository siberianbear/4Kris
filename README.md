bootsmacss
=========

As a short for Bootstrap SMACSS, BootSMACSS is a starterkit library for frontend
developers, that can be called as SMACSS implementation of Bootstrap. Based on
experience with Web Components approach on goverment sites creation, it's
everything you need to create modular frontend for responsive websites.

**Why? Because we needed something more flexible and scalable for rapid development than Bootstrap**

## Technologies included
BootSMACSS is nothing else than fusion of becoming increasingly popular
technologies and approaches that we like very much:

* **[Bootstrap](http://getbootstrap.com/)** - because you need a good base and Swiss Army Knife, all Bootstrap goods are in your hands
* **[SMACSS](https://smacss.com/)** - because you need CSS that is scalable and easy to maintain
* **[SCSS](https://smacss.com/)** - as above
* **KSS** - as you can render styleguide based on your components
* **[Jekyll](http://jekyllrb.com/)** - to render static html prototypes as a result
of graphic project's implementation that can be shown to client, tested and
implemented later to CMS, or deployed to production server

## What's inside?

BootSMACSS code is currenntly separated to two folders:

1. *bootsmacss* - holds everything that is neccessary to create static website
2. *drupal* - since we use Drupal as a backend, here is a port for it! You can
find there a stuff like themes, views, displays, field formatters etc neccessary to provide valid markup. Everything with readme files attached.

## Realisations
Here are the examples of sites we created using BootSMACSS and Drupal:

* [eurekanetwork.org](http://eurekanetwork.org/) - EUREKA Network information website
* [eurostars-eureka.eu](http://eurostars-eureka.eu/) - Eurostars joint programme information website
* European Commission intranet (not deployed yet)


How to work with BootSMACSS
========================

## 1. Install system dependencies

First of all, you need [Node.js](https://nodejs.org/),
[Jekyll](http://jekyllrb.com/) and [Grunt](http://gruntjs.com/) installed on
your machine to watch for changes in SCSS files and html.

## 2. Project initiation
**Variant I - standalone**

Create new directory for your project and download whole content of styleguide
directory to it.

**Variant II - Drupal theme**

Download whole content of drupal directory to */sites/all* folder and check
readme file inside the theme for info.

## 3. Install project's dependencies

Download all nodejs dependencies, since they are neccessary to
watch for changes. You can do it by launching `npm install` command in the root of your
theme:

## 4. Work

Run these two watch commands in the root of your theme (yes, you'll need two terminals
open)

```
grunt
```
```
jekyll serve
```

Grunt script is used here to compile SCSS files and the whole styleguide. In the
same time jekyll command renders the html prototype from your layouts and includes.
SCSS files are located inside the sass folder and HTML files are in the root.
See [this movie](https://www.youtube.com/watch?v=iWowJBRMtpc) to understand how
to work with Jekyll if you're not familiar with.
