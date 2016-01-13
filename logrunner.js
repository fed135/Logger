;(function() {
  'use strict';
  
  /* Local variables ---------------------------------------------------------*/
  
  var _instance; /** The exported main LogRunner instance */
  
  /* LogRunner ---------------------------------------------------------------*/
  
  /**
   * Log Runner contructor
   * Called only once - Is a function for easier structuring
   * @constructor
   */
  function LogRunner() {}
  
  /** 
   * Log Runner level selector
   * @param {string|array} level The query to select levels
   * @returns {Selection} The selected levels
  LogRunner.prototype.level = function(level) {};
  
  /** 
   * Log Runner level creator
   * @param {string} name The level name
   * @param {object|null} config The level config
   * @returns {Level} The generated level
  LogRunner.prototype.addLevel = function(name, config) {};

  /* Level -------------------------------------------------------------------*/

  function Level() {}
  
  Level.prototype.config = function(config) {};
  
  Level.prototype.mute = function() {};
  
  Level.prototype.unmute = function() {};
  
  Level.prototype._execute = function(method, payload) {};
  
  /* Selection ----------------------------------------------------------------*/

  function Selection() {}

  /* Init ---------------------------------------------------------------------*/

  _instance = new LogRunner();
  _instance.addLevel('log').config({ color: 'blue' });
  _instance.addLevel('warn').config({ color: 'yellow' });
  _instance.addLevel('error').config({ color: 'red', prettyStack: true });

  /* Exports ------------------------------------------------------------------*/
  
  if (define && define.amd) define('logrunner', [], _instance);
  else window.logrunner = _instance;
})();
