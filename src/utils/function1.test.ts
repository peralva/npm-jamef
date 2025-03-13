import { describe, it } from 'node:test';
import assert from 'node:assert';
import function1 from './function1';

describe(__filename, () => {
	it('Test', () => {
		assert.strictEqual(function1(), 'test');
	});
});
