import React, { useState } from "react";
import { Button, Dialog, Portal, ProgressBar, Text } from "react-native-paper";
import { loadDataFromJsonResponse } from "../../utils";

function InProgressDialogue(props) {
	const { visible } = props;

	return (
		<Portal>
			<Dialog
				visible={visible}
				dismissable={false}
			>
				<Dialog.Title>Recreating ngram table…</Dialog.Title>
				<Dialog.Content>
					<ProgressBar indeterminate={true} />
				</Dialog.Content>
			</Dialog>
		</Portal>
	)
}

export default function ConfirmRecreateNgramDialogue(props) {
	const { visible, setVisible, apiPrefix } = props;
	const [inProgress, setInProgress] = useState(false);

	function handleConfirm() {
		setInProgress(true);
		fetch(`${apiPrefix}/management/create_ngram_table`)
			.then(loadDataFromJsonResponse)
			.then((data) => {
				if (data['success']) {
					alert('Recreated ngram table.');
				}
			})
			.catch((error) => {
				alert('Failed to recreate ngram table');
			})
			.finally(() => {
				setInProgress(false);
				setVisible(false);
			});
	}

	return (
		<>
			<InProgressDialogue visible={inProgress} />
			<Portal>
				<Dialog
					visible={visible}
					onDismiss={() => setVisible(false)}>
					<Dialog.Title>Recreate ngram table</Dialog.Title>
					<Dialog.Content>
						<Text>Are you sure you want to recreate the ngram table?</Text>
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
		</>
	);
}