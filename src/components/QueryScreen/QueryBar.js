import React, { useState } from 'react';
import { Keyboard } from 'react-native';
import { Appbar } from 'react-native-paper';
import Input from './Input';
import DictionarySelection from './DictionarySelection';

export default function QueryBar(props) {
	const [dictionarySelectionVisible, setDictionarySelectionVisible] = useState(false);

	return (
		<Appbar.Header
			elevated={true}
		>
			<Appbar.Action
				icon='menu'
				onPress={() => { Keyboard.dismiss(); props.openDrawer(); }} />
			<Input />
			<Appbar.Action
				icon='bookshelf'
				onPress={() => { Keyboard.dismiss(); setDictionarySelectionVisible(true) }} />
			<DictionarySelection
				visible={dictionarySelectionVisible}
				setVisible={setDictionarySelectionVisible}
			/>
		</Appbar.Header>
	);
}
