import React, { useEffect } from 'react';
import { TextInput, useTheme } from 'react-native-paper';
import { isRTL } from '../../utils';

export default function Input(props) {
	const { query, setQuery, textInputRef, handleInputSubmit, setArticle } = props;

	function handleQueryChange(newQuery) {
		setQuery(newQuery);
	}

	function handleInputFocus(e) {
		setArticle('');
	}

	useEffect(function () {
		if (isRTL(query))
			textInputRef.current.setNativeProps({ style: { direction: 'rtl', textAlign: 'right' } });
		else
			textInputRef.current.setNativeProps({ style: { direction: 'ltr', textAlign: 'left' } });
	}, [query]);

	return (
		<TextInput
			ref={textInputRef}
			style={{ flex: 1, height: 50, backgroundColor: 'transparent' }}
			disableFullscreenUI={true}
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