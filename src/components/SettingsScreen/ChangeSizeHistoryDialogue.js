import React, { useState } from "react";
import { Button, Dialog, Portal, TextInput } from "react-native-paper";
import { JSON_HEADER, loadDataFromJsonResponse } from "../../utils";

export default function ChangeSizeHistoryDialogue(props) {
	const { visible, setVisible, apiPrefix, setHistory, setSizeHistory } = props;
	const [sizeBuffer, setSizeBuffer] = useState('');

	function handleSubmit() {
		let newSize;
		try {
			newSize = parseInt(sizeBuffer);
			newSize = Math.max(newSize, 0);
		} catch (error) {
			alert('Invalid number.');
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
				alert('Failed to update history size.');
			});
	}

	return (
		<Portal>
			<Dialog
				visible={visible}
				onDismiss={() => setVisible(false)}>
				<Dialog.Title>Change the size of history</Dialog.Title>
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
