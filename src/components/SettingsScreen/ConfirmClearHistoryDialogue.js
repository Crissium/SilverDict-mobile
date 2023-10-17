import React from "react";
import { Button, Dialog, Portal, Text } from "react-native-paper";
import { loadDataFromJsonResponse } from "../../utils";
import { localisedStrings } from "../../translations/l10n";

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
				alert(localisedStrings["clear-history-dialogue-message-failure"]);
			});
	}

	return (
		<Portal>
			<Dialog
				visible={visible}
				onDismiss={() => setVisible(false)}>
				<Dialog.Title>{localisedStrings["clear-history-dialogue-title"]}</Dialog.Title>
				<Dialog.Content>
					<Text>{localisedStrings["clear-history-dialogue-content"]}</Text>
				</Dialog.Content>
				<Dialog.Actions>
					<Button onPress={() => {
						setVisible(false);
					}}>
						{localisedStrings["generic-no"]}
					</Button>
					<Button onPress={() => {
						handleConfirm();
					}}>
						{localisedStrings["generic-yes"]}
					</Button>
				</Dialog.Actions>
			</Dialog>
		</Portal>
	);
}