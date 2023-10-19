import React, { useState } from 'react';
import { FlatList, View } from 'react-native';
import { Appbar, List } from 'react-native-paper';
import ChangeAddressDialogue from './SettingsScreen/ChangeAddressDialogue';
import ChangeFontDialogue from './SettingsScreen/ChangeFontDialogue';
import AdditionalFontsDialogue from './SettingsScreen/AdditionalFontsDialogue';
import ChangeColourDialogue from './SettingsScreen/ChangeColourDialogue';
import ChangeSizeSuggestionDialogue from './SettingsScreen/ChangeSizeSuggestionDialogue';
import ChangeSizeHistoryDialogue from './SettingsScreen/ChangeSizeHistoryDialogue';
import ConfirmClearHistoryDialogue from './SettingsScreen/ConfirmClearHistoryDialogue';
import ConfirmRecreateNgramDialogue from './SettingsScreen/ConfirmRecreateNgramDialogue';
import { useAppContext } from '../AppContext';
import { localisedStrings } from '../translations/l10n';

export default function SettingsScreen({ navigation }) {
	const { serverAddress, setServerAddress, fontFamily, setFontFamily, scriptsWithAdditionalFonts, setScriptsWithAdditionalFonts, darkTextColour, setDarkTextColour, sizeSuggestion, setSizeSuggestion, sizeHistory, setSizeHistory, setHistory } = useAppContext();

	const [addressDialogueVisible, setAddressDialogueVisible] = useState(false);
	const [fontDialogueVisible, setFontDialogueVisible] = useState(false);
	const [additionalFontsDialogueVisible, setAdditionalFontsDialogueVisible] = useState(false);
	const [colourDialogueVisible, setColourDialogueVisible] = useState(false);
	const [sizeSuggestionDialogueVisible, setSizeSuggestionDialogueVisible] = useState(false);
	const [sizeHistoryDialogueVisible, setSizeHistoryDialogueVisible] = useState(false);
	const [clearHistoryDialogueVisible, setClearHistoryDialogueVisible] = useState(false);
	const [recreateNgramDialogueVisible, setRecreateNgramDialogueVisible] = useState(false);

	return (
		<View style={{flex: 1}}>
			<Appbar.Header>
				<Appbar.Action icon='menu' onPress={() => navigation.openDrawer()} />
				<Appbar.Content title={localisedStrings['drawer-settings-label']} />
			</Appbar.Header>
			<FlatList
				data={[
					{
						title: localisedStrings['settings-screen-server-address-title'],
						description: serverAddress,
						onPress: () => {
							setAddressDialogueVisible(true);
						}
					},
					{
						title: localisedStrings['settings-screen-font-family-title'],
						description: localisedStrings[`change-font-dialogue-font-${fontFamily}`],
						onPress: () => {
							setFontDialogueVisible(true);
						}
					},
					{
						title: localisedStrings['additional-fonts-dialogue-title'],
						description: '',
						onPress: () => {
							setAdditionalFontsDialogueVisible(true);
						}
					},
					{
						title: localisedStrings['settings-screen-dark-text-colour-title'],
						description: darkTextColour,
						onPress: () => {
							setColourDialogueVisible(true);
						}
					},
					{
						title: localisedStrings['settings-screen-size-suggestions-title'],
						description: sizeSuggestion.toString(),
						onPress: () => {
							setSizeSuggestionDialogueVisible(true);
						}
					},
					{
						title: localisedStrings['settings-screen-size-history-title'],
						description: sizeHistory.toString(),
						onPress: () => {
							setSizeHistoryDialogueVisible(true);
						}
					},
					{
						title: localisedStrings['clear-history-dialogue-title'],
						description: '',
						onPress: () => {
							setClearHistoryDialogueVisible(true);
						}
					},
					{
						title: localisedStrings['confirm-recreate-ngram-dialogue-title'],
						description: localisedStrings['settings-screen-recreate-ngram-description'],
						onPress: () => {
							setRecreateNgramDialogueVisible(true);
						}
					}
				]}
				renderItem={({ item }) => (
					<List.Item
						title={item.title}
						description={item.description}
						onPress={item.onPress} />
				)}
				keyExtractor={(item, index) => index.toString()} />
			<ChangeAddressDialogue
				visible={addressDialogueVisible}
				setVisible={setAddressDialogueVisible}
				setServerAddress={setServerAddress} />
			<ChangeFontDialogue
				visible={fontDialogueVisible}
				setVisible={setFontDialogueVisible}
				fontFamily={fontFamily}
				setFontFamily={setFontFamily} />
			<AdditionalFontsDialogue
				visible={additionalFontsDialogueVisible}
				setVisible={setAdditionalFontsDialogueVisible}
				scriptsWithAdditionalFonts={scriptsWithAdditionalFonts}
				setScriptsWithAdditionalFonts={setScriptsWithAdditionalFonts} />
			<ChangeColourDialogue
				visible={colourDialogueVisible}
				setVisible={setColourDialogueVisible}
				darkTextColour={darkTextColour}
				setDarkTextColour={setDarkTextColour} />
			<ChangeSizeSuggestionDialogue
				visible={sizeSuggestionDialogueVisible}
				setVisible={setSizeSuggestionDialogueVisible}
				apiPrefix={`${serverAddress}/api`}
				sizeSuggestion={sizeSuggestion}
				setSizeSuggestion={setSizeSuggestion} />
			<ChangeSizeHistoryDialogue
				visible={sizeHistoryDialogueVisible}
				setVisible={setSizeHistoryDialogueVisible}
				apiPrefix={`${serverAddress}/api`}
				setHistory={setHistory}
				sizeHistory={sizeHistory}
				setSizeHistory={setSizeHistory} />
			<ConfirmClearHistoryDialogue
				visible={clearHistoryDialogueVisible}
				setVisible={setClearHistoryDialogueVisible}
				apiPrefix={`${serverAddress}/api`}
				setHistory={setHistory} />
			<ConfirmRecreateNgramDialogue
				visible={recreateNgramDialogueVisible}
				setVisible={setRecreateNgramDialogueVisible}
				apiPrefix={`${serverAddress}/api`} />
		</View>
	);
}