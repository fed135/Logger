# Logger

[![Build Status](https://travis-ci.org/fed135/Logger.svg?branch=master)](https://travis-ci.org/fed135/Logger)
[![NPM](https://img.shields.io/npm/v/console-logger.js.svg)](https://www.npmjs.com/package/console-logger.js)
[![Bower](https://img.shields.io/bower/v/logger.js.svg)](#)

## What is Logger?

Logger is a logging utility for your browser. 
Ever encountered one or more of these issues:

- Need defined (and perhaps customizable) log levels
- Need ability to mute certain levels logging on certain environements
- Need to pipe your error logs to a tracking service
- Need more color and liveness in your console
- Need prettier error statements

Logger aims to solve ALL of these issues and more!
It's a library that is build **next** to the browser's default console and does **not** override it.
It can be loaded as an AMD module or used globaly.

![logger](http://i231.photobucket.com/albums/ee109/FeD135/logger.jpg)

And it's super light: 1.74Kb (minified)!

## Compatibility

   Browser              | Compatibility
   ---------------------| -----------------------
   *Chrome*             | Yes
   *Firefox*            | Yes
   *IE / Edge*          | Yes
   *Opera*              | Yes
   *Safari*             | Yes


## Releases

[Latest release](https://github.com/fed135/Logger/releases/latest)

[All releases](https://github.com/fed135/Logger/releases)


## Usage

Simply import the minified/unminified script from dist, then start configuring:

**Loading the module**

    // If requireJS or another AMD-compatible loader is detected:
    require('logger', function(logger) {
        logger.log('Hello there!');
    });
    
    // Or else, it should be available through the global namespace:
    window.logger.log('Bloody hell!');
    

**Creating log levels**

    // I want an error level for when stuff explodes
    logger.add('critical', {
    	style: 'color:purple;font-weight:bold;'
    });

**Selecting levels**

    // I want to mute everythin in Production
    logger.select('*').mute();	// Mutes all the channels

**Piping**

    // I want to send errors and criticals to my tracking service
    logger.select(['error', 'critical']).pipe(myTrackingService);

**Changing the style**

    // I want error logs to be sassier
    logger.select('error').style('color:pink;text-shadow:1px 1px 0px rgba(0,0,0,0.4)');
    // I can use CSS styling!

**Actually printing stuff**

    logger.log('This is a log!');
    logger.warn('This is a warning!');
    logger.error('This is an error!');
    // These 3 are created by default


## Compiling

Running `gulp` will compile new minified and minifed versions.


## Testing

Running `gulp test` will launch the test sequence.


## Roadmap

[Milestones](https://github.com/fed135/Logger/milestones)

- make usage docs
- DocBlock internal methods
- Try to bind to console methods - simplifies the stack trace
