import React from 'react';
import { Button, Dialog, Portal, RadioButton } from 'react-native-paper';
import { localisedStrings } from '../../translations/l10n';

export default function ChangeFontDialogue(props) {
	const { visible, setVisible, fontFamily, setFontFamily } = props;

	return (
		<Portal>
			<Dialog
				visible={visible}
				onDismiss={() => setVisible(false)}>
				<Dialog.Title>{localisedStrings['change-font-dialogue-title']}</Dialog.Title>
				<Dialog.Content>
					<RadioButton.Group onValueChange={value => setFontFamily(value)} value={fontFamily}>
						<RadioButton.Item label={localisedStrings['change-font-dialogue-font-sans-serif']} value='sans-serif' />
						<RadioButton.Item label={localisedStrings['change-font-dialogue-font-serif']} value='serif' />
					</RadioButton.Group>
				</Dialog.Content>
				<Dialog.Actions>
					<Button onPress={() => {
						setVisible(false);
					}}>
						{localisedStrings['generic-ok']}
					</Button>
				</Dialog.Actions>
			</Dialog>
		</Portal>
	);
}
