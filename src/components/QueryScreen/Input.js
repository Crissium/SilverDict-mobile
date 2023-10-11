import React from 'react';
import { TextInput, useTheme } from 'react-native-paper';

export default function Input(props) {
	const { query, setQuery, textInputRef, handleInputSubmit, setArticle } = props;

	function handleQueryChange(newQuery) {
		setQuery(newQuery);
	}

	function handleInputFocus(e) {
		setArticle('');
	}

	return (
		<TextInput
			ref={textInputRef}
			style={{ flex: 1, height: 50, backgroundColor: 'transparent' }}
			cursorColor={useTheme().colors.onSurface}
			selectionColor={useTheme().colors.onSurface}
			underlineColor='transparent'
			activeUnderlineColor='transparent'
			placeholder='Search…'
			value={query}
			onChangeText={handleQueryChange}
			onFocus={handleInputFocus}
			selectTextOnFocus={true}
			autoFocus={true}
			autoCapitalize='none'
			autoComplete='off'
			autoCorrect={false}
			blurOnSubmit={true}
			onSubmitEditing={handleInputSubmit}
		/>
	);
}