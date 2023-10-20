import React from 'react';
import { Dialog, Portal, ProgressBar } from 'react-native-paper';

export default function InProgressDialogue(props) {
	const { visible, title } = props;

	return (
		<Portal>
			<Dialog
				visible={visible}
				dismissable={false}
			>
				<Dialog.Title>{title}</Dialog.Title>
				<Dialog.Content>
					<ProgressBar indeterminate={true} />
				</Dialog.Content>
			</Dialog>
		</Portal>
	);
}