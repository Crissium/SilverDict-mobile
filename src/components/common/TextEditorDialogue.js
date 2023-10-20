import React, { useState } from 'react';
import { Button, Dialog, Text, TextInput, Portal } from 'react-native-paper';
import { localisedStrings } from '../../translations/l10n';

export default function TextEditorDialogue(props) {
	const { visible, setVisible, title, content, originalValue, handleSubmit, inputMode, placeholder, autoCapitalize, autoCorrect } = props;
	const [buffer, setBuffer] = useState(originalValue);

	return (
		<Portal>
			<Dialog
				visible={visible}
				onDismiss={() => setVisible(false)}>
				<Dialog.Title>{title}</Dialog.Title>
				<Dialog.Content>
					{content &&
						<Text>{content}</Text>}
					<TextInput
						inputMode={inputMode}
						style={{ backgroundColor: 'transparent' }}
						placeholder={placeholder}
						value={buffer}
						mode='outlined'
						autoFocus={true}
						autoCapitalize={autoCapitalize}
						autoComplete='off'
						autoCorrect={autoCorrect}
						selectTextOnFocus={true}
						blurOnSubmit={true}
						onChangeText={(text) => setBuffer(text)}
						onSubmitEditing={(e) => {
							handleSubmit(buffer);
						}} />
				</Dialog.Content>
				<Dialog.Actions>
					<Button onPress={() => {
						setVisible(false);
					}}>
						{localisedStrings['generic-cancel']}
					</Button>
					<Button onPress={() => {
						handleSubmit(buffer);
					}}>
						{localisedStrings['generic-ok']}
					</Button>
				</Dialog.Actions>
			</Dialog>
		</Portal>
	);
}