import React, { useState } from 'react';
import { Button, Dialog, Portal, Text, TextInput } from 'react-native-paper';
import { localisedStrings } from '../../translations/l10n';

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
				<Dialog.Title>{localisedStrings['change-colour-dialogue-title']}</Dialog.Title>
				<Dialog.Content>
					<Text>{localisedStrings['change-colour-dialogue-content']}</Text>
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
						{localisedStrings['generic-cancel']}
					</Button>
					<Button onPress={() => {
						handleSubmit();
					}}>
						{localisedStrings['generic-ok']}
					</Button>
				</Dialog.Actions>
			</Dialog>
		</Portal>
	);
}
