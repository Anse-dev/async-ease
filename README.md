# AsyncEase

AsyncEase is a JavaScript library for simplifying asynchronous operations.

## Installation

You can install AsyncEase via npm:

```
npm install async-ease
```

## Usage

```javascript
// Import AsyncEase
const AsyncEase = require('async-ease');

// Delay execution for 1 second
AsyncEase.delay(1000).then(() => {
	console.log('Delayed execution completed');
});

// Filter an array asynchronously
const array = [1, 2, 3, 4, 5];
AsyncEase.filter(array, async (item) => {
	return item % 2 === 0;
})
	.then((filteredArray) => {
		console.log('Filtered array:', filteredArray);
	})
	.catch((error) => {
		console.error('Error:', error);
	});
```

## API

### `delay(duration: number): Promise<void>`

Delay execution for the specified duration (in milliseconds).

### `filter<T>(array: T[], filterFunction: (item: T) => Promise<boolean>): Promise<T[]>`

Filter an array asynchronously based on the result of the filter function.

### `map<T, U>(array: T[], mapFunction: (item: T) => Promise<U>): Promise<U[]>`

Map an array asynchronously using the provided mapping function.

### `reduce<T, U>(array: T[], reducerFunction: (accumulator: U, currentValue: T) => Promise<U>, initialValue: U): Promise<U>`

Reduce an array asynchronously using the provided reducer function and initial value.

### `concurrent<T>(asyncFunctions: (() => Promise<T>)[], concurrencyLimit: number): Promise<T[]>`

Execute asynchronous functions concurrently with a specified concurrency limit.

### `httpGet(url: string): Promise<any>`

Perform an HTTP GET request asynchronously using Axios.

### `catchError<T>(asyncFunction: () => Promise<T>, errorHandler: (error: Error) => Promise<T>): Promise<T>`

Catch errors thrown by an asynchronous function and handle them with the provided error handler function.

## Contributing

Contributions are welcome! If you have any ideas for new features, improvements, or find any issues, feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
