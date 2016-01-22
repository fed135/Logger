# logrunner
Console logging for modern browsers

## Logger ?

This is a logging utility for your browser. 
Ever encountered one or more of these issues:

- Need defined (and perhaps customizable) log levels
- Need ability to mute certain levels logging on certain environements
- Need to pipe your error logs to a tracking service
- Need more color and liveness in your console
- Need prettier error statements

Logger aims to solve ALL of these issues and more!

## What is it ?

Logger is a library that is build next to the browser's default console and does not override it.
It can be loaded as an AMD module or saved globaly.

## How do I use it?

Simply import the script, then start configuring:

**Creating log levels**

    logger.add('critical', {
    	style: 'color:purple;font-weight:bold;'
    });

**Selecting levels**

    logger.select('*').mute();	// Mutes all the channels

**Piping**

		logger.select(['error', 'critical']).pipe(myTrackingService);

**Changing the style**

    logger.select('error').style('color:pink;text-shadow:1px 1px 0px rgba(0,0,0,0.4)');
    // You can use CSS styling!

**Actually printing stuff**

    logger.log('This is a log!');
    logger.warn('This is a warning!');
    logger.error('This is an error!');
    // These 3 are created by default


There ara a TON of other features, feel free to explore!

## TODO

- Find a better name
- List all the cool benefots, features, make usage docs, etc.
- Debug, write tests and plug into travis
- Cleanup code
- Make a dist folder with minified version + release tags