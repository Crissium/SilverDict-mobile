import React, { useState } from "react";
import { Button, Dialog, Portal, Text, TextInput } from "react-native-paper";

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
				<Dialog.Title>Change font</Dialog.Title>
				<Dialog.Content>
					<Text>Please ‘serif’ or ‘sans-serif’ for maximum compatibility.{'\n'}</Text>
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
						Cancel
					</Button>
					<Button onPress={() => {
						handleSubmit();
					}}>
						OK
					</Button>
				</Dialog.Actions>
			</Dialog>
		</Portal>
	);
}
