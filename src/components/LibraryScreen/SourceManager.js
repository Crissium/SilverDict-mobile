import React, { useState } from 'react';
import { FlatList } from 'react-native';
import { IconButton, List } from 'react-native-paper';
import ConfirmDeleteDialogue from './SourceManager/ConfirmDeleteDialogue';
import { useAppContext } from '../../AppContext';

export default function SourceManager() {
	const { sources } = useAppContext();
	const [sourceToDelete, setSourceToDelete] = useState('');
	const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false);

	function handleDelete(source) {
		setSourceToDelete(source);
		setConfirmDeleteVisible(true);
	}

	return (
		<>
			<FlatList
				data={sources}
				renderItem={({ item }) =>
					<List.Item
						title={item}
						right={() => <IconButton icon="delete" onPress={() => handleDelete(item)} />}
					/>
				}
				keyExtractor={(item) => item}
			/>
			<ConfirmDeleteDialogue
				visible={confirmDeleteVisible}
				setVisible={setConfirmDeleteVisible}
				source={sourceToDelete}
			/>
		</>
	);
}