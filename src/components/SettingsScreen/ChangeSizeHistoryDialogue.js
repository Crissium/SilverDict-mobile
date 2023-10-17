import React, { useState } from "react";
import { Button, Dialog, Portal, TextInput } from "react-native-paper";
import { JSON_HEADER, loadDataFromJsonResponse } from "../../utils";
import { localisedStrings } from "../../translations/l10n";

export default function ChangeSizeHistoryDialogue(props) {
	const { visible, setVisible, apiPrefix, setHistory, setSizeHistory } = props;
	const [sizeBuffer, setSizeBuffer] = useState('');

	function handleSubmit() {
		let newSize;
		try {
			newSize = parseInt(sizeBuffer);
			newSize = Math.max(newSize, 0);
		} catch (error) {
			alert(localisedStrings['generic-alert-invalid-number']);
			return;
		}

		fetch(`${apiPrefix}/management/history_size`, {
			method: 'PUT',
			headers: JSON_HEADER,
			body: JSON.stringify({ size: newSize })
		})
			.then(loadDataFromJsonResponse)
			.then((data) => {
				setHistory(data);
				setSizeHistory(newSize);
				setVisible(false);
			})
			.catch((error) => {
				alert(localisedStrings['change-size-history-dialogue-message-failure']);
			});
	}

	return (
		<Portal>
			<Dialog
				visible={visible}
				onDismiss={() => setVisible(false)}>
				<Dialog.Title>{localisedStrings['change-size-history-dialogue-title']}</Dialog.Title>
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
