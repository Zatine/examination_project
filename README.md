# Examination Project
Examination project for Nackademin. A framework built with Angular and SASS to simplify website building for myself and to get a better understanding of how to build components and making them flexible.

##Setup
You will need [**npm**] (https://www.npmjs.com/) and [**bower**](http://bower.io/) installed on your computer, as well as [**SASS**](http://sass-lang.com/). After cloning the repository, run **npm install** and **bower install** to download all the necessary dependencies.

##How to run
This project utilises [**Gulp**](http://gulpjs.com/). The default task syncs the website to your browser and updates it whenever changes occur. It also compiles SASS and automatically injects any new JS or CSS-files.

##How to use the framework for your own website
You can make your own website with the framework simply by cleaning up this project a bit. 

- Remove all the content within the body-tag of *index.html*, except for ```<!--inject:js--><!--endinject-->```. Also change the title and meta tags to your preference.
- Remove all the styling beneath all the ```@import``` in *main.scss*.
- Remove all the controllers from *app.js*.
- Remove all images in the img-folder. If you want your images to be optimized for distribution, put any new images you add into the img-folder.

You now have a clean slate for your own project.

##How to build a distributable version
Run the gulp task **gulp build**. A compiled version of your project will appear in the dist-folder. To get a clean build, run **gulp clean-dist** first.
