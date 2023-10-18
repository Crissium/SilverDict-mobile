import React, { createContext, useContext, useEffect, useState } from 'react';
import { loadPersistentData, storePersistentData } from './utils';
import { DEFAULT_SERVER_ADDRESS, DEFAULT_FONT_FAMILY, DEFAULT_DARK_TEXT_COLOUR } from './config';
import { loadDataFromJsonResponse, convertDictionarySnakeCaseToCamelCase } from './utils';
import { localisedStrings } from './translations/l10n';

const AppContext = createContext();

export function AppProvider({ children }) {
	const [serverAddress, setServerAddress] = useState('');

	const [dictionaries, setDictionaries] = useState([]);
	const [groups, setGroups] = useState([]);
	const [groupings, setGroupings] = useState({});

	const [history, setHistory] = useState([]);

	const [fontFamily, setFontFamily] = useState('');
	const [darkTextColour, setDarkTextColour] = useState('');

	const [sizeSuggestion, setSizeSuggestion] = useState(10);
	const [sizeHistory, setSizeHistory] = useState(100);

	async function loadStoredData() {
		const storedServerAddress = await loadPersistentData('serverAddress', DEFAULT_SERVER_ADDRESS);
		setServerAddress(storedServerAddress);
		const storedFontFamily = await loadPersistentData('fontFamily', DEFAULT_FONT_FAMILY);
		setFontFamily(storedFontFamily);
		const storedDarkTextColour = await loadPersistentData('darkTextColour', DEFAULT_DARK_TEXT_COLOUR);
		setDarkTextColour(storedDarkTextColour);
	}

	async function storeServerAddress() {
		await storePersistentData('serverAddress', serverAddress.toString());
	}

	async function storeFontFamily() {
		await storePersistentData('fontFamily', fontFamily.toString());
	}

	async function storeDarkTextColour() {
		await storePersistentData('darkTextColour', darkTextColour.toString());
	}

	useEffect(function () { loadStoredData(); }, []);

	useEffect(function () { storeServerAddress(); }, [serverAddress]);

	useEffect(function () { storeFontFamily(); }, [fontFamily]);

	useEffect(function () { storeDarkTextColour(); }, [darkTextColour]);

	async function fetchInitialData(
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
				dictionariesData, groupsData, groupingsData, historyData, sizeHistoryData, sizeSuggestionData
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
			alert(localisedStrings['app-context-message-failure-fetching-data']);
		}
	}

	useEffect(function () {
		if (serverAddress.length > 0)
			fetchInitialData(
				`${serverAddress}/api`,
				setDictionaries,
				setGroups,
				setGroupings,
				setHistory,
				setSizeHistory,
				setSizeSuggestion
			);
	}, [serverAddress]);

	return (
		<AppContext.Provider
			value={{
				serverAddress,
				setServerAddress,
				dictionaries,
				setDictionaries,
				groups,
				setGroups,
				groupings,
				setGroupings,
				history,
				setHistory,
				fontFamily,
				setFontFamily,
				darkTextColour,
				setDarkTextColour,
				sizeSuggestion,
				setSizeSuggestion,
				sizeHistory,
				setSizeHistory
			}}
		>
			{children}
		</AppContext.Provider>
	);
}

export function useAppContext() {
	return useContext(AppContext);
}
