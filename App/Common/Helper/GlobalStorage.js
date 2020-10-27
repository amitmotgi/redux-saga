import { AsyncStorage } from 'react-native';

export default {
	getAllKeys() {
		return AsyncStorage.getAllKeys()
		.catch(error => {
			throw error;
		});
	},

	get(key) {
		return AsyncStorage.getItem(key).then(value => {
			if (value === undefined) {
        return null;
			}
      return JSON.parse(value);
		})
    .catch(error => {
			throw error;
		});
	},

	save(key, value) {
		return AsyncStorage.setItem(key, JSON.stringify(value))
		.catch(() => {
			throw new Error('Unable to setItem');
		});
	},

	multiSave(keyValPairs) {
		return AsyncStorage.multiSet(keyValPairs)
		.catch(() => {
			throw new Error('Unable to multiSave');
		});
	},

	delete(key) {
		return AsyncStorage.removeItem(key)
		.catch(() => {
			throw new Error('Unable to delete');
		});
	},

	multiRemove(keys) {
		return AsyncStorage.multiRemove(keys, () => {
    })
		.catch(() => {
			throw new Error('Unable to multiRemove');
		});
	}
};
