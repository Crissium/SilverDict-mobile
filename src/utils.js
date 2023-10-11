import AsyncStorage from '@react-native-async-storage/async-storage';

export const JSON_CONTENT_TYPE = 'application/json';

export const JSON_HEADER = {
	'Content-Type': JSON_CONTENT_TYPE
};

export function loadDataFromJsonResponse(response) {
	return response.json();
}

export function convertDictionarySnakeCaseToCamelCase(dictionary) {
	return {
		displayName: dictionary.dictionary_display_name,
		name: dictionary.dictionary_name,
		format: dictionary.dictionary_format,
		filename: dictionary.dictionary_filename
	};
}

export function convertDictionaryCamelCaseToSnakeCase(dictionary) {
	return {
		dictionary_display_name: dictionary.displayName,
		dictionary_name: dictionary.name,
		dictionary_format: dictionary.format,
		dictionary_filename: dictionary.filename
	};
}

export async function fetchInitialData(
	apiPrefix,
	setDictionaries,
	setGroups,
	setGroupings,
	setHistory,
	setSizeHistory,
	setSizeSuggestion
) {
	try {
		const [
			dictionariesData,
			groupsData,
			groupingsData,
			historyData,
			sizeHistoryData,
			sizeSuggestionData
		] = await Promise.all([
			fetch(`${apiPrefix}/management/dictionaries`).then(loadDataFromJsonResponse),
			fetch(`${apiPrefix}/management/groups`).then(loadDataFromJsonResponse),
			fetch(`${apiPrefix}/management/dictionary_groupings`).then(loadDataFromJsonResponse),
			fetch(`${apiPrefix}/management/history`).then(loadDataFromJsonResponse),
			fetch(`${apiPrefix}/management/history_size`).then(loadDataFromJsonResponse),
			fetch(`${apiPrefix}/management/num_suggestions`).then(loadDataFromJsonResponse),
		]);

		setDictionaries(dictionariesData.map(convertDictionarySnakeCaseToCamelCase));
		setGroups(groupsData);
		setGroupings(groupingsData);
		setHistory(historyData);
		setSizeHistory(sizeHistoryData['size']);
		setSizeSuggestion(sizeSuggestionData['size']);
	} catch (error) {
		alert('Failed to fetch data from the server. Please check your connection or change the server address and try again.');
	}
}

export async function storePersistentData(key, value) {
	try {
		if (value && value.length > 0) {
			await AsyncStorage.setItem(key, value);
		}
	} catch (error) {
		alert(`Failed to store persistent data ${key}. Error: ${error}`);
	}
}

export async function loadPersistentData(key, defaultValue) {
	try {
		const value = await AsyncStorage.getItem(key);
		if (value !== null) {
			return value;
		} else {
			return defaultValue;
		}
	} catch (error) {
		alert(`Failed to load persistent data ${key}. Error: ${error}`);
	}
}

export function getSetFromLangString(lang) {
	lang = lang.replace(/\s/g, '');
	lang = lang.toLowerCase();
	const set = new Set();
	for (const l of lang.split(',')) {
		set.add(l);
	}
	return set;
}