import React, { useEffect, useRef, useState } from "react";
import { FlatList, View } from "react-native";
import { List } from "react-native-paper";
import { Keyboard } from "react-native";
import ArticleView from "./ArticleView";
import ArticleBottomBar from "./ArticleBottomBar";
import { loadPersistentData, storePersistentData } from "../../utils";
import { DEFAULT_TEXT_ZOOM } from "../../config";

function WordItem(props) {
	const { word, search } = props;

	return (
		<List.Item
			title={word}
			onPress={(e) => { Keyboard.dismiss(); search(word); }} />
	);
}

export default function QueryContent(props) {
	const { serverAddress, queryIsEmpty, history, suggestions, search, article, fontFamily, darkTextColour, nameDictionaryToJumpTo, setQuery, searchInLocalHistory, ableToGoBack, ableToGoForward } = props;
	const wordsToDisplay = queryIsEmpty ? history : suggestions;
	const findInPageRef = useRef(null);
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

	if (article.length === 0)
		return (
			<View style={{ flex: 1 }}>
				<FlatList
					keyboardShouldPersistTaps='handled'
					data={wordsToDisplay}
					renderItem={({ item }) => <WordItem word={item} search={search} />}
					keyExtractor={(item) => item}
				/>
			</View>
		);
	else
		return (
			<View style={{ flex: 1 }}>
				<ArticleView
					serverAddress={serverAddress}
					article={article}
					textZoom={textZoom}
					nameDictionaryToJumpTo={nameDictionaryToJumpTo}
					search={search}
					setQuery={setQuery}
					findInPageRef={findInPageRef}
					fontFamily={fontFamily}
					darkTextColour={darkTextColour} />
				<ArticleBottomBar
					searchInLocalHistory={searchInLocalHistory}
					ableToGoBack={ableToGoBack}
					ableToGoForward={ableToGoForward}
					textZoom={textZoom}
					setTextZoom={setTextZoom}
					findInPageRef={findInPageRef} />
			</View>
		);
}
