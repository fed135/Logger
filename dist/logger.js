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

		// Polyfill
		console.groupCollapsed = console.groupCollapsed || console.log;
	}
	
	/** 
	 * Logger level selector
	 * @method select
	 * @memberof Logger
	 * @param {string|array} level The query to select levels
	 * @returns {Selection} The selected levels
	 */
	Logger.prototype.select = function(level) {
		level = level || '*';
		var _levels = level || [];

		if (level === '*') _levels = Object.keys(this._);
		else if (typeof level === 'string') {
			if (this[level]) _levels = [level];
		}

		return new Selection(_levels.map(function(l) {
			return this._[l]; 
		}, this));
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
		this._[name] = new Level(name, config || {});
		this[name] = this._[name]._execute.bind(this._[name]);
		return this._[name];
	};

	/* Level -------------------------------------------------------------------*/

	/**
	 * Log level constructor
	 * @private
	 * @constructor
	 * @param {string} name The name of the Level
	 * @param {object} config The configuration object
	 */ 
	function Level(name, config) {
		this.name = name;

		/* Methods */
		this.pipe = config.pipe || null;
		this.method = config.method || 'log';
		this.style = config.style || '';
		this.muted = config.muted || false;
	}
	
	Level.prototype.mute = function() {
		this.muted = true;
	};
	
	Level.prototype.unmute = function() {
		this.muted = false;
	};
	
	Level.prototype._execute = function() {
		var payload = Array.prototype.slice.call(arguments).pop();
		var _isError = false;

		if (payload) {
			if (payload instanceof Error || (payload.error && payload.stack)) {
				payload = _parseErrorMessage(payload);
				_isError = true;
			}
		}

		if (!this.muted) {
			// By type
			if (typeof payload === 'string') {
				console[this.method]('%c' + payload, this.style);
			}
			else if (_isError) {
				console.groupCollapsed('%c' + payload[0], this.style);
				for (var i = 1; i < payload.length; i++) {
					console[this.method]('%c' + payload[i], this.style);
				}
			}
			else console[this.method].apply(console, payload);
		}

		if (typeof this.pipe === 'function') {
			this.pipe(this.name + ':' + JSON.stringify(payload));
		}
	};
	
	/* Selection ----------------------------------------------------------------*/

	function Selection(levels) {
		this._levels = levels;

		['style', 'pipe', 'method'].forEach(function(p) {
			this[p] = (function(val) {
				this._levels.forEach(function(l) {
					l[p] = val;
				});
			}).bind(this);
		}, this);
	}

	Selection.prototype.mute = function() {
		this._levels.forEach(function(l) {
			l.muted = true;
		});
	};

	Selection.prototype.unmute = function() {
		this._levels.forEach(function(l) {
			l.muted = false;
		});
	};

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
	
	if (typeof module !== 'undefined') {
		module.exports = _instance;
	}
	else if (window.define && window.define.amd) define('logger', [], _instance);
	else window.logger = _instance;
})();
