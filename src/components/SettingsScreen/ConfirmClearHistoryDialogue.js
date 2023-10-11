import React from "react";
import { Button, Dialog, Portal, Text } from "react-native-paper";
import { loadDataFromJsonResponse } from "../../utils";

export default function ConfirmClearHistoryDialogue(props) {
	const { visible, setVisible, apiPrefix, setHistory } = props;

	function handleConfirm() {
		fetch(`${apiPrefix}/management/history`, {
			method: 'DELETE'
		})
			.then(loadDataFromJsonResponse)
			.then((data) => {
				setHistory(data);
				setVisible(false);
			})
			.catch((error) => {
				alert('Failed to clear history');
			});
	}

	return (
		<Portal>
			<Dialog
				visible={visible}
				onDismiss={() => setVisible(false)}>
				<Dialog.Title>Clear history</Dialog.Title>
				<Dialog.Content>
					<Text>Are you sure you want to clear history?</Text>
				</Dialog.Content>
				<Dialog.Actions>
					<Button onPress={() => {
						setVisible(false);
					}}>
						No
					</Button>
					<Button onPress={() => {
						handleConfirm();
					}}>
						Yes
					</Button>
				</Dialog.Actions>
			</Dialog>
		</Portal>
	);
}