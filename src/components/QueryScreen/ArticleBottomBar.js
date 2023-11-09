import React, { useState } from 'react';
import { View } from 'react-native';
import { Appbar, TextInput, useTheme } from 'react-native-paper';
import { TEXT_ZOOM_MAX, TEXT_ZOOM_MIN } from '../../config';
import { useQueryContext } from './QueryContext';
import { localisedStrings } from '../../translations/l10n';

const TEXT_ZOOM_STEP = 10;

export default function ArticleBottomBar() {
	const onSurfaceColour = useTheme().colors.onSurface;
	const { ableToGoBackInHistory, ableToGoForwardInHistory, searchInLocalHistory, textZoom, setTextZoom, findInPageRef } = useQueryContext();

	const [findBarActive, setFindBarActive] = useState(false);
	const [wordToFind, setWordToFind] = useState('');

	function handleTextZoomDecrease() {
		setTextZoom(Math.max(textZoom - TEXT_ZOOM_STEP, TEXT_ZOOM_MIN));
	}

	function handleTextZoomIncrease() {
		setTextZoom(Math.min(textZoom + TEXT_ZOOM_STEP, TEXT_ZOOM_MAX));
	}

	if (findBarActive)
		return (
			<Appbar>
				<View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
					<TextInput
						style={{ flex: 1, backgroundColor: 'transparent', height: 50 }}
						underlineColor='transparent'
						activeUnderlineColor='transparent'
						cursorColor={onSurfaceColour}
						selectionColor={onSurfaceColour}
						placeholder={localisedStrings['placeholder-search']}
						value={wordToFind}
						autoCapitalize='none'
						autoComplete='off'
						autoCorrect={false}
						selectTextOnFocus={true}
						blurOnSubmit={true}
						onChangeText={(text) => setWordToFind(text)}
						onSubmitEditing={(e) => {
							findInPageRef.current(wordToFind, false);
						}}
					/>
					<Appbar.Action
						icon='chevron-up'
						color={onSurfaceColour}
						onPress={() => {
							findInPageRef.current(wordToFind, true);
						}} />
					<Appbar.Action
						icon='chevron-down'
						color={onSurfaceColour}
						onPress={() => {
							findInPageRef.current(wordToFind, false);
						}} />
					<Appbar.Action
						icon='close'
						color={onSurfaceColour}
						onPress={() => {
							setFindBarActive(false);
							setWordToFind('');
						}} />
				</View>
			</Appbar>
		);
	else
		return (
			<Appbar>
				<View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
					{
						ableToGoBackInHistory ?
							<Appbar.Action
								icon='arrow-left'
								color={onSurfaceColour}
								onPress={() => searchInLocalHistory(-1)} /> :
							<Appbar.Action
								icon='format-horizontal-align-left'
								color={onSurfaceColour} />
					}
					{
						ableToGoForwardInHistory ?
							<Appbar.Action
								icon='arrow-right'
								color={onSurfaceColour}
								onPress={() => searchInLocalHistory(+1)} /> :
							<Appbar.Action
								icon='format-horizontal-align-right'
								color={onSurfaceColour} />
					}
					<Appbar.Action
						icon='magnify-minus'
						color={onSurfaceColour}
						onPress={() => handleTextZoomDecrease()} />
					<Appbar.Action
						icon='magnify-plus'
						color={onSurfaceColour}
						onPress={() => handleTextZoomIncrease()} />
					<Appbar.Action
						icon='magnify'
						color={onSurfaceColour}
						onPress={() => setFindBarActive(true)} />
				</View>
			</Appbar>
		);
}
