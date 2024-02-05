import React from 'react';
import { FlatList, Keyboard, View } from 'react-native';
import { List } from 'react-native-paper';
import ArticleView from './ArticleView';
import ArticleBottomBar from './ArticleBottomBar';
import { useAppContext } from '../../AppContext';
import { useQueryContext } from './QueryContext';
import { isRTL } from '../../utils';

function WordItem(props) {
	const { word } = props;
	const wordIsRTL = isRTL(word);
	const { search } = useQueryContext();

	return (
		<List.Item
			title={word}
			titleStyle={{ direction: wordIsRTL ? 'rtl' : 'ltr', textAlign: wordIsRTL ? 'right' : 'left' }}
			onPress={(e) => { Keyboard.dismiss(); search(word); }} />
	);
}

export default function QueryContent() {
	const { history } = useAppContext();
	const { query, article, suggestions } = useQueryContext();
	const wordsToDisplay = query.length === 0 ? history : suggestions;

	if (article.length === 0)
		return (
			<View style={{ flex: 1 }}>
				<FlatList
					keyboardShouldPersistTaps='handled'
					data={wordsToDisplay}
					renderItem={({ item }) => <WordItem word={item} />}
					keyExtractor={(item) => item}
				/>
			</View>
		);
	else
		return (
			<View
				style={{ flex: 1 }}
			>
				<ArticleView />
				<ArticleBottomBar />
			</View>
		);
}
