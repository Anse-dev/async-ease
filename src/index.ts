class AsyncEase {
	static async delay<T>(duration: number): Promise<void> {
		return new Promise<void>((resolve) => {
			setTimeout(resolve, duration);
		});
	}

	static async compose<T>(
		...asyncFunctions: Array<() => Promise<T>>
	): Promise<T[]> {
		const results: T[] = [];
		for (const asyncFunction of asyncFunctions) {
			const result = await asyncFunction();
			results.push(result);
		}
		return results;
	}

	static async run<T>(asyncFunction: () => Promise<T>): Promise<T> {
		try {
			const result: T = await asyncFunction();
			return result;
		} catch (error) {
			throw error;
		}
	}

	static async filter<T>(
		array: T[],
		filterFunction: (item: T) => Promise<boolean>
	): Promise<T[]> {
		const filteredArray: T[] = [];
		for (const item of array) {
			const keepItem = await filterFunction(item);
			if (keepItem) {
				filteredArray.push(item);
			}
		}
		return filteredArray;
	}

	static async map<T, U>(
		array: T[],
		mapFunction: (item: T) => Promise<U>
	): Promise<U[]> {
		const mappedArray: U[] = [];
		for (const item of array) {
			const mappedItem = await mapFunction(item);
			mappedArray.push(mappedItem);
		}
		return mappedArray;
	}

	static async reduce<T, U>(
		array: T[],
		reducerFunction: (accumulator: U, currentValue: T) => Promise<U>,
		initialValue: U
	): Promise<U> {
		let accumulator = initialValue;
		for (const item of array) {
			accumulator = await reducerFunction(accumulator, item);
		}
		return accumulator;
	}

	static async concurrent<T>(
		asyncFunctions: (() => Promise<T>)[],
		concurrencyLimit: number
	): Promise<T[]> {
		const results: T[] = [];
		const executing: Promise<T>[] = [];

		for (const asyncFunction of asyncFunctions) {
			const promise = asyncFunction();
			executing.push(promise);

			if (executing.length >= concurrencyLimit) {
				await Promise.race(executing);
			}
		}

		return Promise.all(executing);
	}

	static async catchError<T>(
		asyncFunction: () => Promise<T>,
		errorHandler: (error: Error) => Promise<T>
	): Promise<T> {
		try {
			return await asyncFunction();
		} catch (error: any) {
			return errorHandler(error);
		}
	}
}

export default AsyncEase;
