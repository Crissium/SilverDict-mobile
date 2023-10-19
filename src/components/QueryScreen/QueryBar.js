import React, { useState } from 'react';
import { Keyboard } from 'react-native';
import { Appbar } from 'react-native-paper';
import Input from './Input';
import DictionarySelection from './DictionarySelection';

export default function QueryBar(props) {
	const { openDrawer, query, setQuery, textInputRef, handleInputSubmit, setArticle, dictionaries, groups, groupings, nameActiveGroup, setNameActiveGroup, namesActiveDictionaries, setNameDictionaryToJumpTo } = props;
	const [dictionarySelectionVisible, setDictionarySelectionVisible] = useState(false);

	return (
		<Appbar.Header
			elevated={true}
		>
			<Appbar.Action
				icon='menu'
				onPress={() => { Keyboard.dismiss(); openDrawer(); }} />
			<Input
				query={query}
				setQuery={setQuery}
				textInputRef={textInputRef}
				handleInputSubmit={handleInputSubmit}
				setArticle={setArticle}
			/>
			<Appbar.Action
				icon='bookshelf'
				onPress={() => { Keyboard.dismiss(); setDictionarySelectionVisible(true) }} />
			<DictionarySelection
				visible={dictionarySelectionVisible}
				setVisible={setDictionarySelectionVisible}
				dictionaries={dictionaries}
				groups={groups}
				groupings={groupings}
				nameActiveGroup={nameActiveGroup}
				setNameActiveGroup={setNameActiveGroup}
				namesActiveDictionaries={namesActiveDictionaries}
				setNameDictionaryToJumpTo={setNameDictionaryToJumpTo}
			/>
		</Appbar.Header>
	);
}