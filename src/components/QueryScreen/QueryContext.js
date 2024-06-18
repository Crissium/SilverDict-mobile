import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { DeviceEventEmitter } from 'react-native';
import { useAppContext } from '../../AppContext';
import { DEFAULT_TEXT_ZOOM } from '../../config';
import { loadDataFromJsonResponse, loadPersistentData, storePersistentData } from '../../utils';
import { localisedStrings } from '../../translations/l10n';

const QueryContext = createContext();

export function QueryProvider({ children }) {
	const { serverAddress, dictionaries, groups, groupings, setHistory, sizeSuggestion } = useAppContext();
	const apiPrefix = `${serverAddress}/api`;

	const [query, setQuery] = useState('');
	const textInputRef = useRef(null);

	const [latestSuggestionsTimestamp, setLatestSuggestionsTimestamp] = useState(0);
	const [suggestions, setSuggestions] = useState([]);

	const [nameActiveGroup, setNameActiveGroup] = useState('Default Group');

	const [article, setArticle] = useState('');

	const [namesActiveDictionaries, setNamesActiveDictionaries] = useState([]);

	const findInPageRef = useRef(null);
	const jumpToDictionaryRef = useRef(null);

	const [textZoom, setTextZoom] = useState('');

	async function loadStoredTextZoom() {
		const storedTextZoom = await loadPersistentData('textZoom', DEFAULT_TEXT_ZOOM);
		setTextZoom(parseInt(storedTextZoom));
	}

	async function storeTextZoom() {
		await storePersistentData('textZoom', textZoom.toString());
	}

	useEffect(function () { loadStoredTextZoom(); }, []);

	useEffect(function () { storeTextZoom(); }, [textZoom]);

	useEffect(function () {
		setNameActiveGroup('Default Group');
	}, [groups.length]);

	useEffect(function() {
		DeviceEventEmitter.addListener('onTextSelected', function(e) {
			const selectedText = e.selectedText;
			if (selectedText.length > 0) {
				setQueryAndFocusOnInput(selectedText);
			}
		});

		return function() {
			DeviceEventEmitter.removeAllListeners('onTextSelected');
		}
	}, []);

	useEffect(function () {
		if (query.length === 0) {
			setLatestSuggestionsTimestamp(Date.now());
			setSuggestions(['']);
			resetNamesActiveDictionaries();
		} else {
			fetch(`${apiPrefix}/suggestions/${nameActiveGroup}/${encodeURIComponent(query)}?timestamp=${Date.now()}`)
				.then(loadDataFromJsonResponse)
				.then((data) => {
					if (data['timestamp'] > latestSuggestionsTimestamp) {
						setLatestSuggestionsTimestamp(data['timestamp']);
						// Filter out empty suggestions
						const newSuggestions = data['suggestions'].filter((suggestion) => suggestion.length > 0);
						if (newSuggestions.length > 0) {
							setSuggestions(newSuggestions);
						} else {
							setSuggestions(['']);
						}
					}
				})
				.catch((error) => {
					alert(localisedStrings['query-screen-failure-fetch-suggestions']);
				});
		}
	}, [dictionaries, groupings, nameActiveGroup, query, sizeSuggestion]);

	useEffect(function () {
		search(query);
	}, [nameActiveGroup]);

	function search(newQuery) {
		if (newQuery.length === 0) {
			return;
		}

		try {
			newQuery = decodeURIComponent(newQuery);
			// setQuery(newQuery);
			newQuery = encodeURIComponent(newQuery);
		}
		catch (error) {
			// setQuery(newQuery);
			newQuery = encodeURIComponent(newQuery);
		}

		fetch(`${apiPrefix}/query/${nameActiveGroup}/${newQuery}?dicts=True`)
			.then(loadDataFromJsonResponse)
			.then((data) => {
				setArticle(data['articles']);
				setNamesActiveDictionaries(data['dictionaries']);

				if (localHistoryRef.current.length === 0) {
					localHistoryRef.current.push({
						article: data['articles'],
						dictionaries: data['dictionaries'],
						position: 0
					});
					setPositionInLocalHistory(0);
				} else {
					localHistoryRef.current = [...localHistoryRef.current.slice(0, positionInLocalHistoryRef.current + 1), {
						article: data['articles'],
						dictionaries: data['dictionaries'],
						position: 0
					}];
					setPositionInLocalHistory(localHistoryRef.current.length - 1);
				}

				fetch(`${apiPrefix}/management/history`)
					.then(loadDataFromJsonResponse)
					.then((data) => {
						setHistory(data);
					});
			})
			.catch((error) => {
				resetNamesActiveDictionaries();
				alert(localisedStrings['query-screen-failure-fetch-articles']);
			});
	}

	function setQueryAndFocusOnInput(newQuery) {
		setQuery(newQuery);
		textInputRef.current.focus();
	}

	function resetNamesActiveDictionaries() {
		if (groupings[nameActiveGroup]) {
			const dictionariesInGroup = [];
			for (let dictionary of dictionaries) {
				if (groupings[nameActiveGroup].includes(dictionary.name)) {
					dictionariesInGroup.push(dictionary.name);
				}
			}
			setNamesActiveDictionaries(dictionariesInGroup);
		}
	}

	/**
	 * This is going to be very ugly but I don't see a clean way to do it.
	 * Basically I would like to execute three functions after getPositionInPage is executed,
	 * the problem is, it goes through the web view... So I have to use magic numbers.
	 * 1. clear article
	 * 2. search for a new query
	 * 3. go back/forward in local history
	 * 
	 * So the message sent into the web view is going to be in this format:
	 * 1. !POS!
	 * 2. 1/2/3 (denotes the type of callback)
	 * 3. If the callback is the second or the third, then the separator defined in config.js, followed by the argument, and another separator; if it is the first, then nothing.
	 * 4. The position in page
	 */
	const getPositionInPageRef = useRef(null);
	const positionInLocalHistoryRef = useRef(0);
	const localHistoryRef = useRef([]);

	const [ableToGoBackInHistory, setAbleToGoBackInHistory] = useState(false);
	const [ableToGoForwardInHistory, setAbleToGoForwardInHistory] = useState(false);
	function setPositionInLocalHistory(newPosition) {
		positionInLocalHistoryRef.current = newPosition;
		setAbleToGoBackInHistory(newPosition > 0);
		setAbleToGoForwardInHistory(newPosition < localHistoryRef.current.length - 1);
	}

	function clearArticle() {
		if (article.length > 0) {
			if (getPositionInPageRef.current) {
				getPositionInPageRef.current(1);
			}
			// setArticle('');
		}
	}

	function searchBranching(newQuery) {
		if (getPositionInPageRef.current) {
			getPositionInPageRef.current(2, newQuery);
		}
		// search(newQuery);
	}

	function searchInLocalHistory(direction) {
		if (getPositionInPageRef.current) {
			getPositionInPageRef.current(3, direction);
		}
		// setPositionInLocalHistory(positionInLocalHistoryRef.current + direction);
		// setArticle(localHistoryRef.current[positionInLocalHistoryRef.current].article);
		// setNamesActiveDictionaries(localHistoryRef.current[positionInLocalHistoryRef.current].dictionaries);
	}

	function handleInputSubmit(e) {
		const firstSuggetion = suggestions[0];
		if (firstSuggetion && firstSuggetion.length > 0) {
			search(firstSuggetion);
		} else {
			search(query);
		}
	}

	return (
		<QueryContext.Provider
			value={{
				query,
				setQuery,
				textInputRef,
				suggestions,
				nameActiveGroup,
				setNameActiveGroup,
				article,
				setArticle,
				namesActiveDictionaries,
				setNamesActiveDictionaries,
				search,
				searchBranching,
				searchInLocalHistory,
				handleInputSubmit,
				setQueryAndFocusOnInput,
				textZoom,
				setTextZoom,
				findInPageRef,
				jumpToDictionaryRef,
				localHistoryRef,
				positionInLocalHistoryRef,
				setPositionInLocalHistory,
				getPositionInPageRef,
				ableToGoBackInHistory,
				ableToGoForwardInHistory,
				clearArticle
			}}
		>
			{children}
		</QueryContext.Provider>
	);
}

export function useQueryContext() {
	return useContext(QueryContext);
}
