import AsyncEase from '../src/index';

describe('AsyncEase', () => {
	describe('delay()', () => {
		test('should delay execution', async () => {
			const startTime = Date.now();
			await AsyncEase.delay(1000);
			const endTime = Date.now();
			expect(endTime - startTime).toBeGreaterThanOrEqual(1000);
		});
	});

	describe('compose()', () => {
		test('should compose async functions', async () => {
			async function asyncFunction1() {
				return 'result 1';
			}

			async function asyncFunction2() {
				return '42';
			}

			const results = await AsyncEase.compose(
				asyncFunction1,
				asyncFunction2
			);
			expect(results).toEqual(['result 1', '42']);
		});
	});

	describe('run()', () => {
		test('should resolve with correct value', async () => {
			const result = await AsyncEase.run(async () => {
				return 'test';
			});
			expect(result).toBe('test');
		});

		test('should reject with error', async () => {
			const error = new Error('test error');
			try {
				await AsyncEase.run(async () => {
					throw error;
				});
			} catch (e) {
				expect(e).toBe(error);
			}
		});
	});

	describe('filter()', () => {
		test('should filter array asynchronously', async () => {
			const array = [1, 2, 3, 4, 5];
			const filteredArray = await AsyncEase.filter(array, async (item) => {
				return item % 2 === 0;
			});
			expect(filteredArray).toEqual([2, 4]);
		});
	});

	describe('map()', () => {
		test('should map array asynchronously', async () => {
			const array = [1, 2, 3, 4, 5];
			const mappedArray = await AsyncEase.map(array, async (item) => {
				return item * 2;
			});
			expect(mappedArray).toEqual([2, 4, 6, 8, 10]);
		});
	});

	describe('reduce()', () => {
		test('should reduce array asynchronously', async () => {
			const array = [1, 2, 3, 4, 5];
			const sum = await AsyncEase.reduce(
				array,
				async (accumulator, currentValue) => {
					return accumulator + currentValue;
				},
				0
			);
			expect(sum).toEqual(15);
		});
	});

	describe('concurrent()', () => {
		test('should execute async functions concurrently with limit', async () => {
			const asyncFunctions = [
				() => new Promise((resolve) => setTimeout(resolve, 100, 1)),
				() => new Promise((resolve) => setTimeout(resolve, 200, 2)),
				() => new Promise((resolve) => setTimeout(resolve, 300, 3)),
				() => new Promise((resolve) => setTimeout(resolve, 400, 4)),
			];
			const results = await AsyncEase.concurrent(asyncFunctions, 2);
			expect(results).toEqual([1, 2, 3, 4]);
		});
	});

	describe('catchError()', () => {
		test('should catch error and handle it asynchronously', async () => {
			const asyncFunction = async () => {
				throw new Error('Test error');
			};
			const errorHandler = async (error: Error) => {
				return 'Error handled';
			};
			const result = await AsyncEase.catchError(asyncFunction, errorHandler);
			expect(result).toEqual('Error handled');
		});
	});
});
