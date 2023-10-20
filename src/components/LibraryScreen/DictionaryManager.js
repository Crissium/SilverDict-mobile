import React, { useState } from 'react';
import DraggableFlatList from 'react-native-draggable-flatlist';
import { List } from 'react-native-paper';
import EditMenu from './DictionaryManager/EditMenu';
import DictionaryNameEditorDialogue from './DictionaryManager/DictionaryNameEditorDialogue';
import ConfirmDeleteDialogue from './DictionaryManager/ConfirmDeleteDialogue';
import { useAppContext } from '../../AppContext';
import { convertDictionaryCamelCaseToSnakeCase, convertDictionarySnakeCaseToCamelCase, JSON_HEADER, loadDataFromJsonResponse } from '../../utils';
import { localisedStrings } from '../../translations/l10n';

export default function DictionaryManager() {
	const { serverAddress, dictionaries, setDictionaries } = useAppContext();
	const [editedDictionaryIndex, setEditedDictionaryIndex] = useState(-1);
	const [menuVisible, setMenuVisible] = useState(false);
	const [menuAnchor, setMenuAnchor] = useState({ x: 0, y: 0 });
	const [nameEditorVisible, setNameEditorVisible] = useState(false);
	const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false);

	function handleEdit(index) {
		setEditedDictionaryIndex(index);
		setNameEditorVisible(true);
	}

	function handleDelete(index) {
		setEditedDictionaryIndex(index);
		setConfirmDeleteVisible(true);
	}

	function handlePress(event, dictionaryName) {
		setMenuAnchor({ x: event.nativeEvent.pageX, y: event.nativeEvent.pageY });
		setMenuVisible(true);
		setEditedDictionaryIndex(dictionaries.findIndex((dictionary) => dictionary.name === dictionaryName));
	}

	function handleReorder(newDictionaries) {
		fetch(`${serverAddress}/api/management/dictionaries`, {
			method: 'PUT',
			headers: JSON_HEADER,
			body: JSON.stringify(newDictionaries.map(convertDictionaryCamelCaseToSnakeCase))
		})
			.then(loadDataFromJsonResponse)
			.then((data) => {
				setDictionaries(data.map(convertDictionarySnakeCaseToCamelCase));
			})
			.catch((error) => {
				alert(localisedStrings['dictionary-manager-alert-failure-reordering']);
			});
	}

	return (
		<>
			<DraggableFlatList
				data={dictionaries}
				onDragEnd={({ data }) => handleReorder(data)}
				renderItem={({ item, drag }) =>
					<List.Item
						title={item.displayName}
						onPress={(event) => handlePress(event, item.name)}
						onLongPress={drag}
					/>
				}
				keyExtractor={(item) => item.name}
			/>
			<EditMenu
				visible={menuVisible}
				setVisible={setMenuVisible}
				anchor={menuAnchor}
				onEdit={() => handleEdit(editedDictionaryIndex)}
				onDelete={() => handleDelete(editedDictionaryIndex)}
			/>
			{editedDictionaryIndex >= 0 && <DictionaryNameEditorDialogue
				visible={nameEditorVisible}
				setVisible={setNameEditorVisible}
				editedDictionaryIndex={editedDictionaryIndex}
				setEditedDictionaryIndex={setEditedDictionaryIndex}
			/>}
			{editedDictionaryIndex >= 0 && <ConfirmDeleteDialogue
				visible={confirmDeleteVisible}
				setVisible={setConfirmDeleteVisible}
				editedDictionaryIndex={editedDictionaryIndex}
				setEditedDictionaryIndex={setEditedDictionaryIndex}
			/>}
		</>
	);
}
