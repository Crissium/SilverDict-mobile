import AsyncStorage from '@react-native-async-storage/async-storage';
import { interfaceLangIsRTL } from './translations/l10n';

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

export async function storePersistentData(key, value) {
	try {
		if (value && value.length > 0 && value !== '{}') { // empty string and empty object
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

export function isRTL(s) {
	if (interfaceLangIsRTL) {
		return false; // RTL + RTL = weird RTL
	}

	var ltrChars =
		'A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02B8\u0300-\u0590\u0800-\u1FFF' +
		'\u2C00-\uFB1C\uFDFE-\uFE6F\uFEFD-\uFFFF';
	var rtlChars = '\u0591-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC';
	var rtlDirCheck = new RegExp('^[^' + ltrChars + ']*[' + rtlChars + ']');

	return rtlDirCheck.test(s);
}