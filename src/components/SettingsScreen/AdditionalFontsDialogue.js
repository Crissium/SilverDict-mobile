import React from "react";
import { FlatList } from "react-native";
import { Button, Checkbox, Dialog, Portal, Text } from 'react-native-paper';
import { localisedStrings } from "../../translations/l10n";

function Item(props) {
	const { scriptName, enabled, setEnabled } = props;

	return (
		<Checkbox.Item
			label={localisedStrings[`script-name-${scriptName.toLowerCase().replaceAll(' ', '-')}`]}
			status={enabled ? 'checked' : 'unchecked'}
			onPress={() => setEnabled(!enabled)}
		/>
	);
}

export default function AdditionalFontsDialogue(props) {
	const { visible, setVisible, scriptsWithAdditionalFonts, setScriptsWithAdditionalFonts } = props;

	return (
		<Portal>
			<Dialog
				visible={visible}
				onDismiss={() => setVisible(false)}>
				<Dialog.Title>{localisedStrings['additional-fonts-dialogue-title']}</Dialog.Title>
				<Dialog.Content>
					<Text>{localisedStrings['additional-fonts-dialogue-content']}</Text>
					<FlatList
						style={{ maxHeight: 300 }}
						data={Object.keys(scriptsWithAdditionalFonts)}
						renderItem={({ item }) => <Item
							scriptName={item}
							enabled={scriptsWithAdditionalFonts[item]}
							setEnabled={(value) => setScriptsWithAdditionalFonts({ ...scriptsWithAdditionalFonts, [item]: value })} />}
						keyExtractor={(item) => item} />
				</Dialog.Content>
				<Dialog.Actions>
					<Button onPress={() => {
						setVisible(false);
					}}>
						{localisedStrings['generic-ok']}
					</Button>
				</Dialog.Actions>
			</Dialog>
		</Portal>
	);
}