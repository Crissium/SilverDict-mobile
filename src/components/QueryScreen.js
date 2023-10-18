import React, { useState, useEffect, useRef } from "react";
import { View } from "react-native";
import { loadDataFromJsonResponse } from "../utils";
import QueryBar from "./QueryScreen/QueryBar";
import QueryContent from "./QueryScreen/QueryContent";
import { useAppContext } from "../AppContext";
import { localisedStrings } from "../translations/l10n";

export default function QueryScreen({ navigation }) {
	const { serverAddress, dictionaries, groups, groupings, history, setHistory, sizeSuggestion } = useAppContext();
	const apiPrefix = `${serverAddress}/api`;
	const [query, setQuery] = useState('');
	const textInputRef = useRef(null);

	const [localHistory, setLocalHistory] = useState([]);
	const [locationInLocalHistory, setLocationInLocalHistory] = useState(0);

	const [latestSuggestionsTimestamp, setLatestSuggestionsTimestamp] = useState(0);
	const [suggestions, setSuggestions] = useState([]);

	const [nameActiveGroup, setNameActiveGroup] = useState('Default Group');

	const [article, setArticle] = useState('');
	const [namesActiveDictionaries, setNamesActiveDictionaries] = useState([]);
	const [nameDictionaryToJumpTo, setNameDictionaryToJumpTo] = useState('');

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

	useEffect(function() {
		search(query);
	}, [nameActiveGroup]);

	function search(newQuery) {
		if (newQuery.length === 0) {
			return;
		}

		newQuery = decodeURIComponent(newQuery);
		setQuery(newQuery);
		newQuery = encodeURIComponent(newQuery);

		fetch(`${apiPrefix}/query/${nameActiveGroup}/${newQuery}?dicts=True`)
			.then(loadDataFromJsonResponse)
			.then((data) => {
				setArticle(data['articles']);
				setNamesActiveDictionaries(data['dictionaries']);

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

	function searchBranching(newQuery) {
		search(newQuery);
		// If the current location is not the end of the local history, pop to the current location
		setLocationInLocalHistory(localHistory.length);
		setLocalHistory([...localHistory.slice(0, locationInLocalHistory + 1), newQuery]);
	}

	function searchInLocalHistory(direction) {
		search(localHistory[locationInLocalHistory + direction]);
		setLocationInLocalHistory(locationInLocalHistory + direction);
	}

	function handleInputSubmit(e) {
		const firstSuggetion = suggestions[0];
		if (firstSuggetion && firstSuggetion.length > 0) {
			searchBranching(firstSuggetion);
		} else {
			searchBranching(query);
		}
	}

	return (
		<View style={{ flex: 1 }}>
			<QueryBar
				openDrawer={navigation.openDrawer}
				query={query}
				setQuery={setQuery}
				textInputRef={textInputRef}
				handleInputSubmit={handleInputSubmit}
				setArticle={setArticle}
				dictionaries={dictionaries}
				groups={groups}
				groupings={groupings}
				nameActiveGroup={nameActiveGroup}
				setNameActiveGroup={setNameActiveGroup}
				namesActiveDictionaries={namesActiveDictionaries}
				setNameDictionaryToJumpTo={setNameDictionaryToJumpTo}
			/>
			<QueryContent
				serverAddress={serverAddress}
				queryIsEmpty={query.length === 0}
				history={history}
				suggestions={suggestions}
				search={searchBranching}
				article={article}
				nameDictionaryToJumpTo={nameDictionaryToJumpTo}
				setQuery={setQueryAndFocusOnInput}
				searchInLocalHistory={searchInLocalHistory}
				ableToGoBack={locationInLocalHistory > 0}
				ableToGoForward={locationInLocalHistory < localHistory.length - 1}
			/>
		</View>
	);
}