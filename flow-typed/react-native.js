import { TouchableHighlight } from 'react-native';
declare module 'react-native' {
	declare export var StyleSheet: any
	declare export var Text: any
	declare export var TextInput: any
	declare export var View: any
	declare export var Button: any
	declare export var TouchableHighlight: any
	declare export var ActivityIndicator: any
	declare export var ScrollView: any
	declare export var ProgressViewIOS: any
	declare export var Animated: any

	declare export var AsyncStorage: {|
		/**
		 * Fetches an item for a `key` and invokes a callback upon completion.
		 * Returns a `Promise` object.
		 * @param key Key of the item to fetch.
		 * @param callback Function that will be called with a result if found or
		 *    any error.
		 * @returns A `Promise` object.
		 */
		getItem(key: string, callback?: ?(error: ?Error, result: ?string) => void): Promise<string>,

		/**
		 * Sets the value for a `key` and invokes a callback upon completion.
		 * Returns a `Promise` object.
		 * @param key Key of the item to set.
		 * @param value Value to set for the `key`.
		 * @param callback Function that will be called with any error.
		 * @returns A `Promise` object.
		 */
		setItem(
			key: string,
			value: string,
			callback?: ?(error: ?Error) => void,
		): Promise<typeof undefined>,

		/**
		 * Removes an item for a `key` and invokes a callback upon completion.
		 * Returns a `Promise` object.
		 * @param key Key of the item to remove.
		 * @param callback Function that will be called with any error.
		 * @returns A `Promise` object.
		 */
		removeItem(key: string, callback?: ?(error: ?Error) => void): Promise<typeof undefined>,

		/**
		 * Merges an existing `key` value with an input value, assuming both values
		 * are stringified JSON. Returns a `Promise` object.
		 *
		 * **NOTE:** This is not supported by all native implementations.
		 *
		 * @param key Key of the item to modify.
		 * @param value New value to merge for the `key`.
		 * @param callback Function that will be called with any error.
		 * @returns A `Promise` object.
		 *
		 * @example <caption>Example</caption>
		 * let UID123_object = {
		 *  name: 'Chris',
		 *  age: 30,
		 *  traits: {hair: 'brown', eyes: 'brown'},
		 * };
		 * // You only need to define what will be added or updated
		 * let UID123_delta = {
		 *  age: 31,
		 *  traits: {eyes: 'blue', shoe_size: 10}
		 * };
		 *
		 * AsyncStorage.setItem('UID123', JSON.stringify(UID123_object), () => {
		 *   AsyncStorage.mergeItem('UID123', JSON.stringify(UID123_delta), () => {
		 *     AsyncStorage.getItem('UID123', (err, result) => {
		 *       console.log(result);
		 *     });
		 *   });
		 * });
		 *
		 * // Console log result:
		 * // => {'name':'Chris','age':31,'traits':
		 * //    {'shoe_size':10,'hair':'brown','eyes':'blue'}}
		 */
		mergeItem(
			key: string,
			value: string,
			callback?: ?(error: ?Error) => void,
		): Promise<typeof undefined>,

		/**
		 * Erases *all* `AsyncStorage` for all clients, libraries, etc.  You probably
		 * don't want to call this; use `removeItem` or `multiRemove` to clear only
		 * your app's keys. Returns a `Promise` object.
		 * @param callback Function that will be called with any error.
		 * @returns A `Promise` object.
		 */
		clear(callback ?: ? (error: ?Error) => void): Promise<typeof undefined>,

		/**
		 * Gets *all* keys known to your app; for all callers, libraries, etc.
		 * Returns a `Promise` object.
		 * @param callback Function that will be called the keys found and any error.
		 * @returns A `Promise` object.
		 *
		 * Example: see the `multiGet` example.
		 */
		getAllKeys(callback?: ?(error: ?Error, keys: ?Array<string>) => void): Promise<Array<string>>,

		/**
		 * The following batched functions are useful for executing a lot of
		 * operations at once, allowing for native optimizations and provide the
		 * convenience of a single callback after all operations are complete.
		 *
		 * These functions return arrays of errors, potentially one for every key.
		 * For key-specific errors, the Error object will have a key property to
		 * indicate which key caused the error.
		 */

		/** Flushes any pending requests using a single batch call to get the data. */
		flushGetRequests(): void,

		/**
		 * This allows you to batch the fetching of items given an array of `key`
		 * inputs. Your callback will be invoked with an array of corresponding
		 * key-value pairs found:
		 *
		 * ```
		 * multiGet(['k1', 'k2'], cb) -> cb([['k1', 'val1'], ['k2', 'val2']])
		 * ```
		 *
		 * The method returns a `Promise` object.
		 *
		 * @param keys Array of key for the items to get.
		 * @param callback Function that will be called with a key-value array of
		 *     the results, plus an array of any key-specific errors found.
		 * @returns A `Promise` object.
		 *
		 * @example <caption>Example</caption>
				*
		 * AsyncStorage.getAllKeys((err, keys) => {
		 * AsyncStorage.multiGet(keys, (err, stores) => {
		 * stores.map((result, i, store) => {
		 *      // get at each store's key/value so you can work with it
		 * let key = store[i][0];
		 * let value = store[i][1];
		 *     });
		 *   });
				* });
		 */
		multiGet(
		  keys: Array<string>,
		  callback?: ?(errors: ?Array<Error>, result: ?Array<Array<string>>) => void,
		): Promise<Array<string>>,

		/**
		 * Use this as a batch operation for storing multiple key-value pairs. When
		 * the operation completes you'll get a single callback with any errors:
		 *
		 * ```
		 * multiSet([['k1', 'val1'], ['k2', 'val2']], cb);
		 * ```
		 *
		 * The method returns a `Promise` object.
		 *
		 * @param keyValuePairs Array of key-value array for the items to set.
		 * @param callback Function that will be called with an array of any
		 *    key-specific errors found.
		 * @returns A `Promise` object.
		 * Example: see the `multiMerge` example.
		 */
		multiSet(
		  keyValuePairs: Array<Array<string>>,
		  callback?: ?(errors: ?Array<Error>) => void,
		): Promise<typeof undefined>,

		/**
		 * Call this to batch the deletion of all keys in the `keys` array. Returns
		 * a `Promise` object.
		 *
		 * @param keys Array of key for the items to delete.
		 * @param callback Function that will be called an array of any key-specific
		 *    errors found.
		 * @returns A `Promise` object.
		 *
		 * @example <caption>Example</caption>
								* let keys = ['k1', 'k2'];
		 * AsyncStorage.multiRemove(keys, (err) => {
		 *   // keys k1 & k2 removed, if they existed
		 *   // do most stuff after removal (if you want)
		 * });
		 */
		multiRemove(
		  keys: Array<string>,
		  callback?: ?(errors: ?Array<Error>) => void,
		): Promise<typeof undefined>,

		/**
		 * Batch operation to merge in existing and new values for a given set of
		 * keys. This assumes that the values are stringified JSON. Returns a
		 * `Promise` object.
		 *
		 * **NOTE**: This is not supported by all native implementations.
		 *
		 * @param keyValuePairs Array of key-value array for the items to merge.
		 * @param callback Function that will be called with an array of any
		 *    key-specific errors found.
		 * @returns A `Promise` object.
		 *
		 * @example <caption>Example</caption>
											* // first user, initial values
		 * let UID234_object = {
		 * name: 'Chris',
		 *  age: 30,
		 *  traits: {hair: 'brown', eyes: 'brown'},
		 * };
		 *
		 * // first user, delta values
		 * let UID234_delta = {
		 * age: 31,
		 *  traits: {eyes: 'blue', shoe_size: 10},
		 * };
		 *
		 * // second user, initial values
		 * let UID345_object = {
		 * name: 'Marge',
		 *  age: 25,
		 *  traits: {hair: 'blonde', eyes: 'blue'},
		 * };
		 *
		 * // second user, delta values
		 * let UID345_delta = {
		 * age: 26,
		 *  traits: {eyes: 'green', shoe_size: 6},
		 * };
		 *
		 * let multi_set_pairs   = [['UID234', JSON.stringify(UID234_object)], ['UID345', JSON.stringify(UID345_object)]]
		 * let multi_merge_pairs = [['UID234', JSON.stringify(UID234_delta)], ['UID345', JSON.stringify(UID345_delta)]]
		 *
		 * AsyncStorage.multiSet(multi_set_pairs, (err) => {
		 * AsyncStorage.multiMerge(multi_merge_pairs, (err) => {
		 * AsyncStorage.multiGet(['UID234', 'UID345'], (err, stores) => {
		 * stores.map((result, i, store) => {
		 * let key = store[i][0];
		 * let val = store[i][1];
		 * console.log(key, val);
		 *       });
		 *     });
		 *   });
											* });
		 *
		 * // Console log results:
		 * // => UID234 {"name": "Chris","age":31,"traits":{"shoe_size": 10,"hair":"brown","eyes":"blue"}}
		 * // => UID345 {"name": "Marge","age":26,"traits":{"shoe_size": 6,"hair":"blonde","eyes":"green"}}
		 */
		multiMerge(
		  keyValuePairs: Array<Array<string>>,
		  callback?: ?(errors: ?Array<Error>) => void,
		): Promise<typeof undefined>,
	  |};
}