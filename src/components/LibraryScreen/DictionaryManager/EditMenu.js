import React from 'react';
import { Menu } from 'react-native-paper';
import { localisedStrings } from '../../../translations/l10n';

export default function EditMenu(props) {
	const { visible, setVisible, anchor, onEdit, onDelete } = props;

	return (
		<Menu
			visible={visible}
			onDismiss={() => setVisible(false)}
			anchor={anchor}
		>
			<Menu.Item
				onPress={() => { onEdit(); setVisible(false); }}
				title={localisedStrings['generic-rename']} />
			<Menu.Item
				onPress={() => { onDelete(); setVisible(false); }}
				title={localisedStrings['generic-delete']} />
		</Menu>
	);
}
