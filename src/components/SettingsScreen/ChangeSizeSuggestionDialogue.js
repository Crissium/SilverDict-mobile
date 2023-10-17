import React, { useState } from "react";
import { Button, Dialog, Portal, TextInput } from "react-native-paper";
import { JSON_HEADER, loadDataFromJsonResponse } from "../../utils";
import { localisedStrings } from "../../translations/l10n";

export default function ChangeSizeSuggestionDialogue(props) {
	const { visible, setVisible, apiPrefix, setSizeSuggestion } = props;
	const [sizeBuffer, setSizeBuffer] = useState('');

	function handleSubmit() {
		let newSize;
		try {
			newSize = parseInt(sizeBuffer);
			newSize = Math.max(newSize, 1);
		} catch (error) {
			alert(localisedStrings['generic-alert-invalid-number']);
			return;
		}

		fetch(`${apiPrefix}/management/num_suggestions`, {
			method: 'PUT',
			headers: JSON_HEADER,
			body: JSON.stringify({ size: newSize })
		})
			.then(loadDataFromJsonResponse)
			.then((data) => {
				setSizeSuggestion(data['size']);
				setVisible(false);
			})
			.catch((error) => {
				alert(localisedStrings['change-size-suggestion-dialogue-message-failure']);
			});
	}

	return (
		<Portal>
			<Dialog
				visible={visible}
				onDismiss={() => setVisible(false)}>
				<Dialog.Title>{localisedStrings['change-size-suggestion-dialogue-title']}</Dialog.Title>
				<Dialog.Content>
					<TextInput
						style={{ backgroundColor: 'transparent' }}
						inputMode='numeric'
						value={sizeBuffer}
						mode='outlined'
						autoFocus={true}
						autoCapitalize='none'
						autoComplete='off'
						autoCorrect={false}
						selectTextOnFocus={true}
						blurOnSubmit={true}
						onChangeText={(text) => setSizeBuffer(text)}
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
