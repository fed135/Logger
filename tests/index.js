/**
 * Test suite for Logger
 */

/* Requires ------------------------------------------------------------------*/

var assert = require('chai').assert;

/* Library -------------------------------------------------------------------*/

var _logger = require('../dist/logger');

/* Tests ---------------------------------------------------------------------*/

describe('Logger', function() {

	it('should have the basic levels initialized', function() {
		assert.isFunction(_logger.log, Function);
		assert.isFunction(_logger.warn, Function);
		assert.isFunction(_logger.error, Function);
	});

	it('#add()', function() {
		_logger.add('test');
		assert.isFunction(_logger.test, Function);

		var pipeMethod = function() {};

		_logger.add('test2', { 
			style: 'color:purple;',
			muted:true, 
			pipe: pipeMethod, 
			method: 'error' 
		});
		assert.strictEqual(_logger._.test2.style, 'color:purple;');
		assert.strictEqual(_logger._.test2.muted, true);
		assert.strictEqual(_logger._.test2.pipe, pipeMethod);
		assert.strictEqual(_logger._.test2.method, 'error');
	});

	it('#select()', function() {
		var res1 = _logger.select();
		var res2 = _logger.select('*');

		assert.strictEqual(res1._levels.length, res2._levels.length);
		assert.strictEqual(res1._levels.length, 5);

		var res3 = _logger.select(['error', 'test2']);

		res1.mute();

		assert.strictEqual(res3._levels.length, 2);

		res3.unmute();

		var res4 = _logger.select('log');

		assert.strictEqual(res4._levels.length, 1);

		res4.style('color:cyan;');


		var _log = _logger.select('log');
		assert.strictEqual(_logger._.log.muted, true);
		assert.strictEqual(_logger._.log.style, 'color:cyan;');
		
		var _warn = _logger.select('warn');
		assert.strictEqual(_logger._.warn.muted, true);

		var _error = _logger.select('error');
		assert.strictEqual(_logger._.error.muted, false);

		var _test = _logger.select('test');
		assert.strictEqual(_logger._.test.muted, true);

		var _test2 = _logger.select('test2');
		assert.strictEqual(_logger._.test2.muted, false);

		res1.unmute();
	});

	it('#_call()', function(done) {
		_logger.log('test');
		_logger.log(null);
		_logger.log({foo:'bar'})
		_logger.log(undefined);
		_logger.log(new Error('test'));

		_logger.warn('test');
		_logger.warn(null);
		_logger.warn({foo:'bar'})
		_logger.warn(undefined);
		_logger.warn(new Error('test'));

		_logger.error('test');
		_logger.error(null);
		_logger.error({foo:'bar'})
		_logger.error(undefined);
		_logger.error(new Error('test'));

		_logger.test('test');
		_logger.test(null);
		_logger.test({foo:'bar'})
		_logger.test(undefined);
		_logger.test(new Error('test'));

		_logger.test2('test');
		_logger.test2(null);
		_logger.test2({foo:'bar'})
		_logger.test2(undefined);
		_logger.test2(new Error('test'));

		done();
	});
});