import React, { useState } from 'react';
import { Button, Dialog, Portal, ProgressBar, Text } from 'react-native-paper';
import { loadDataFromJsonResponse } from '../../utils';
import { localisedStrings } from '../../translations/l10n';

function InProgressDialogue(props) {
	const { visible } = props;

	return (
		<Portal>
			<Dialog
				visible={visible}
				dismissable={false}
			>
				<Dialog.Title>{localisedStrings['confirm-recreate-ngram-dialogue-message-in-progress']}</Dialog.Title>
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
					alert(localisedStrings['confirm-recreate-ngram-dialogue-message-success']);
				}
			})
			.catch((error) => {
				alert(localisedStrings['confirm-recreate-ngram-dialogue-message-failure']);
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
					<Dialog.Title>{localisedStrings['confirm-recreate-ngram-dialogue-title']}</Dialog.Title>
					<Dialog.Content>
						<Text>{localisedStrings['confirm-recreate-ngram-dialogue-content']}</Text>
					</Dialog.Content>
					<Dialog.Actions>
						<Button onPress={() => {
							setVisible(false);
						}}>
							{localisedStrings['generic-no']}
						</Button>
						<Button onPress={() => {
							handleConfirm();
						}}>
							{localisedStrings['generic-yes']}
						</Button>
					</Dialog.Actions>
				</Dialog>
			</Portal>
		</>
	);
}