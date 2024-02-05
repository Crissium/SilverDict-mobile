import React, { useEffect } from 'react';
import { TextInput, useTheme } from 'react-native-paper';
import { isRTL } from '../../utils';
import { useQueryContext } from './QueryContext';
import { localisedStrings } from '../../translations/l10n';

export default function Input() {
	const { query, setQuery, textInputRef, handleInputSubmit, clearArticle } = useQueryContext();

	function handleInputFocus(e) {
		clearArticle();
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
			placeholder={localisedStrings['placeholder-search']}
			value={query}
			onChangeText={setQuery}
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
