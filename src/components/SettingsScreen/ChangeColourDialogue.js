import React, { useState } from "react";
import { Button, Dialog, Portal, Text, TextInput } from "react-native-paper";

export default function ChangeColourDialogue(props) {
	const { visible, setVisible, setDarkTextColour } = props;
	const [colourBuffer, setColourBuffer] = useState('');

	function handleSubmit() {
		if (colourBuffer.length > 0) {
			setDarkTextColour(colourBuffer);
		}
		setVisible(false);
	}

	return (
		<Portal>
			<Dialog
				visible={visible}
				onDismiss={() => setVisible(false)}>
				<Dialog.Title>Change the colour of the text in the dark mode</Dialog.Title>
				<Dialog.Content>
					<Text>A value such as ‘white’ or ‘grey’ is recommended.{'\n'}</Text>
					<TextInput
						style={{ backgroundColor: 'transparent' }}
						placeholder='grey'
						value={colourBuffer}
						mode='outlined'
						autoFocus={true}
						autoCapitalize='none'
						autoCorrect={false}
						selectTextOnFocus={true}
						blurOnSubmit={true}
						onChangeText={(text) => setColourBuffer(text)}
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
