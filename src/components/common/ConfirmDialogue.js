import React from 'react';
import { Button, Dialog, Portal, Text } from 'react-native-paper';
import { localisedStrings } from '../../translations/l10n';

export default function ConfirmDialogue(props) {
	const { visible, setVisible, title, content, onConfirm } = props;

	return (
		<Portal>
			<Dialog
				visible={visible}
				onDismiss={() => setVisible(false)}>
				<Dialog.Title>{title}</Dialog.Title>
				<Dialog.Content>
					<Text>{content}</Text>
				</Dialog.Content>
				<Dialog.Actions>
					<Button onPress={() => {
						setVisible(false);
					}}>
						{localisedStrings['generic-no']}
					</Button>
					<Button onPress={onConfirm}>
						{localisedStrings['generic-yes']}
					</Button>
				</Dialog.Actions>
			</Dialog>
		</Portal>
	);
}
