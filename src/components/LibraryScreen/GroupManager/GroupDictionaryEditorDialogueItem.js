import React from 'react';
import { Checkbox } from 'react-native-paper';

export default function GroupDictionaryEditorDialogueItem(props) {
	const { name, displayName, included, handleToggle } = props;

	return (
		<Checkbox.Item
			label={displayName}
			status={included ? 'checked' : 'unchecked'}
			onPress={() => handleToggle(name)} />
	);
}
