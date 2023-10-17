import React, { useState } from "react";
import { Button, Dialog, Portal, Text, TextInput } from "react-native-paper";
import { localisedStrings } from "../../translations/l10n";

export default function ChangeFontDialogue(props) {
	const { visible, setVisible, setFontFamily } = props;
	const [fontFamilyBuffer, setFontFamilyBuffer] = useState('');

	function handleSubmit() {
		if (fontFamilyBuffer.length > 0) { 
			setFontFamily(fontFamilyBuffer); 
		}
		setVisible(false);
	}

	return (
		<Portal>
			<Dialog
				visible={visible}
				onDismiss={() => setVisible(false)}>
				<Dialog.Title>{localisedStrings["change-font-dialogue-title"]}</Dialog.Title>
				<Dialog.Content>
					<Text>{localisedStrings["change-font-dialogue-content"]}</Text>
					<TextInput
						style={{ backgroundColor: 'transparent' }}
						placeholder='serif'
						value={fontFamilyBuffer}
						mode='outlined'
						autoFocus={true}
						autoCapitalize='none'
						autoCorrect={false}
						selectTextOnFocus={true}
						blurOnSubmit={true}
						onChangeText={(text) => setFontFamilyBuffer(text)}
						onSubmitEditing={(e) => {
							handleSubmit();
						}} />
				</Dialog.Content>
				<Dialog.Actions>
					<Button onPress={() => {
						setVisible(false);
					}}>
						{localisedStrings["generic-cancel"]}
					</Button>
					<Button onPress={() => {
						handleSubmit();
					}}>
						{localisedStrings["generic-ok"]}
					</Button>
				</Dialog.Actions>
			</Dialog>
		</Portal>
	);
}
