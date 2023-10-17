import React, { useState } from "react";
import { Button, Dialog, Portal, TextInput } from "react-native-paper";
import { loadDataFromJsonResponse } from "../../utils";
import { localisedStrings } from "../../translations/l10n";

export default function ChangeAddressDialogue(props) {
	const { visible, setVisible, setServerAddress } = props;
	const [addressBuffer, setAddressBuffer] = useState('');

	function handleSubmit() {
		fetch(`${addressBuffer}/api/validator/test_connection`)
			.then(loadDataFromJsonResponse)
			.then((data) => {
				if (data['success']) {
					setServerAddress(addressBuffer);
					setVisible(false);
				}
			})
			.catch((error) => {
				alert(localisedStrings["change-address-dialogue-message-unable-to-connect"]);
			});
	}

	return (
		<Portal>
			<Dialog
				visible={visible}
				onDismiss={() => setVisible(false)}>
				<Dialog.Title>{localisedStrings["change-address-dialogue-title"]}</Dialog.Title>
				<Dialog.Content>
					<TextInput
						inputMode='url'
						style={{ backgroundColor: 'transparent' }}
						placeholder='http://localhost:2628'
						value={addressBuffer}
						mode='outlined'
						autoFocus={true}
						autoCapitalize='none'
						autoComplete='off'
						autoCorrect={false}
						selectTextOnFocus={true}
						blurOnSubmit={true}
						onChangeText={(text) => setAddressBuffer(text)}
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
