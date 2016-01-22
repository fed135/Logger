;(function() {
  'use strict';
  
  /* Local variables ---------------------------------------------------------*/
  
  var _instance; /** The exported main Logger instance */
  
  /* Logger ---------------------------------------------------------------*/
  
  /**
   * Logger contructor
   * Called only once - Is a function for easier structuring
   * @constructor
   */
  function Logger() {
    this._ = {}; /** Holds the layers */
  }
  
  /** 
   * Logger level selector
   * @method select
   * @memberof Logger
   * @param {string|array} level The query to select levels
   * @returns {Selection} The selected levels
   */
  Logger.prototype.select = function(level) {
    var _levels = [];

    if (level === '*') _levels = Object.keys(this._);
    else if (typeof level === 'string') {
      if (this[level]) _levels = [this._[level]];
    }
    else if (typeof level === 'object' && level.length) {
      _levels = level.map(function(l) {
        return this._[l]; 
      }, this);
    }

    return new Selection(_levels);
  };
  
  /** 
   * Logger level creator
   * @method add
   * @memberof Logger
   * @param {string} name The level name
   * @param {object|null} config The level config
   * @returns {Level} The generated level
   */
  Logger.prototype.add = function(name, config) {
    this._[name] = new Level(name, config);
    this[name] = this._[name]._execute.bind(this._[name]);
    return this._[name];
  };

  /* Level -------------------------------------------------------------------*/

  function Level(name, config) {
    this.name = name;
    this._config = {
      muted: config.muted || false,
      style: config.style || '',
      method: config.method || 'log',
      pipe: null
    };

    if (config.event) {
      window.addEventListener(config.event, this._execute.bind(this));
    }
  }

  Level.prototype.pipe = function(pipe) {
    this._config.pipe = pipe;
  };

  Level.prototype.method = function(method) {
    this._config.method = method;
  };
  
  Level.prototype.style = function(style) {
    this._config.style = style;
  };
  
  Level.prototype.mute = function() {
    this._config.muted = true;
  };
  
  Level.prototype.unmute = function() {
    this._config.muted = false;
  };
  
  Level.prototype._execute = function() {
    var payload = Array.prototype.slice.call(arguments).pop();
    var _isError = false;

    if (payload instanceof Event && payload.error) {
      payload = _parseErrorMessage(payload.error);
      _isError = true;
    }
    else if (payload instanceof Error) {
      payload = _parseErrorMessage(payload);
      _isError = true;
    }

    if (!this._config.muted) {
      // By type
      if (typeof payload === 'string') {
        console[this._config.method]('%c' + payload, this._config.style);
      }
      else if (_isError) {
        console.groupCollapsed('%c' + payload[0], this._config.style);
        for (var i = 1; i < payload.length; i++) {
          console[this._config.method]('%c' + payload[i], this._config.style);
        }
      }
      else console[this._config.method].apply(console, payload);
    }

    if (typeof this._config.pipe === 'function') {
      this._config.pipe(this.name + ':' + JSON.stringify(payload));
    }

    if (payload instanceof ErrorEvent) {
      payload.preventDefault();
    }
    return false;
  };
  
  /* Selection ----------------------------------------------------------------*/

  function Selection(levels) {
    this._levels = levels;

    Object.keys(Level.prototype).forEach(function(fn) {
      if (typeof Level.prototype[fn] === 'function') this[fn] = function() {
        this._levels.forEach(function(l) {
          Level.prototype[fn].apply(l, arguments);
        }, this);
      }
    }, this);
  }

  /* Pretty error parser ------------------------------------------------------*/

  function _parseErrorMessage(error) {
    return (error.stack.split('\n')).splice(0,4).map(function(e, i){
      if (i > 0) {
        e = e.substring(6);
        for (var dash = 0; dash < i; dash++) { e = '\u2014' + e; }
      }
      return e;
    });
  }

  /* Init ---------------------------------------------------------------------*/

  _instance = new Logger();
  _instance.add('log', { style: 'color:#0066ff;' });
  _instance.add('warn', { style: 'color:#ff9933;' });
  _instance.add('error', { style: 'color:#CC0000;', event: 'error' });

  /* Exports ------------------------------------------------------------------*/
  
  if (window.define && window.define.amd) define('logger', [], _instance);
  window.logger = _instance;
})();
