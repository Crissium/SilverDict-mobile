import React, { useState } from "react";
import { FlatList, View } from "react-native";
import { Appbar, List } from "react-native-paper";
import ChangeAddressDialogue from "./SettingsScreen/ChangeAddressDialogue";
import ChangeFontDialogue from "./SettingsScreen/ChangeFontDialogue";
import ChangeColourDialogue from "./SettingsScreen/ChangeColourDialogue";
import ChangeSizeSuggestionDialogue from "./SettingsScreen/ChangeSizeSuggestionDialogue";
import ChangeSizeHistoryDialogue from "./SettingsScreen/ChangeSizeHistoryDialogue";
import ConfirmClearHistoryDialogue from "./SettingsScreen/ConfirmClearHistoryDialogue";
import ConfirmRecreateNgramDialogue from "./SettingsScreen/ConfirmRecreateNgramDialogue";
import { useAppContext } from "../AppContext";

export default function SettingsScreen({ navigation }) {
	const { serverAddress, setServerAddress, fontFamily, setFontFamily, darkTextColour, setDarkTextColour, sizeSuggestion, setSizeSuggestion, sizeHistory, setSizeHistory, setHistory } = useAppContext();

	const [addressDialogueVisible, setAddressDialogueVisible] = useState(false);
	const [fontDialogueVisible, setFontDialogueVisible] = useState(false);
	const [colourDialogueVisible, setColourDialogueVisible] = useState(false);
	const [sizeSuggestionDialogueVisible, setSizeSuggestionDialogueVisible] = useState(false);
	const [sizeHistoryDialogueVisible, setSizeHistoryDialogueVisible] = useState(false);
	const [clearHistoryDialogueVisible, setClearHistoryDialogueVisible] = useState(false);
	const [recreateNgramDialogueVisible, setRecreateNgramDialogueVisible] = useState(false);

	return (
		<View style={{flex: 1}}>
			<Appbar.Header>
				<Appbar.Action icon='menu' onPress={() => navigation.openDrawer()} />
				<Appbar.Content title='Settings' />
			</Appbar.Header>
			<FlatList
				data={[
					{
						title: 'Server address',
						description: serverAddress,
						onPress: () => {
							setAddressDialogueVisible(true);
						}
					},
					{
						title: 'Font',
						description: fontFamily,
						onPress: () => {
							setFontDialogueVisible(true);
						}
					},
					{
						title: 'Colour of the text in dark mode',
						description: darkTextColour,
						onPress: () => {
							setColourDialogueVisible(true);
						}
					},
					{
						title: 'Suggestion size',
						description: sizeSuggestion.toString(),
						onPress: () => {
							setSizeSuggestionDialogueVisible(true);
						}
					},
					{
						title: 'History size',
						description: sizeHistory.toString(),
						onPress: () => {
							setSizeHistoryDialogueVisible(true);
						}
					},
					{
						title: 'Clear history',
						description: '',
						onPress: () => {
							setClearHistoryDialogueVisible(true);
						}
					},
					{
						title: 'Recreate ngram table',
						description: 'It could be very slow.',
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
				setFontFamily={setFontFamily} />
			<ChangeColourDialogue
				visible={colourDialogueVisible}
				setVisible={setColourDialogueVisible}
				setDarkTextColour={setDarkTextColour} />
			<ChangeSizeSuggestionDialogue
				visible={sizeSuggestionDialogueVisible}
				setVisible={setSizeSuggestionDialogueVisible}
				apiPrefix={`${serverAddress}/api`}
				setSizeSuggestion={setSizeSuggestion} />
			<ChangeSizeHistoryDialogue
				visible={sizeHistoryDialogueVisible}
				setVisible={setSizeHistoryDialogueVisible}
				apiPrefix={`${serverAddress}/api`}
				setHistory={setHistory}
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