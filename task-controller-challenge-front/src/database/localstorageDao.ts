const storage = window.localStorage;


export function saveData(key: string, data: any) {
	storage.setItem(key, JSON.stringify(data));
}

export function getData(key: string) {
	const data = storage.getItem(key);
	if (data !== null) {
		if (data !== 'undefined') {
			if (data.length > 2) {
				return JSON.parse(data);
			}
		}
	}
	return null;
}

export function deleteData(key: string) {
	storage.removeItem(key);
}

export function deleteAll() {
	storage.clear()
}