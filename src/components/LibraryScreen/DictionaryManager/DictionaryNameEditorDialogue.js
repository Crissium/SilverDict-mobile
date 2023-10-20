import React from 'react';
import { useAppContext } from '../../../AppContext';
import { JSON_HEADER, loadDataFromJsonResponse } from '../../../utils';
import TextEditorDialogue from '../../common/TextEditorDialogue';
import { localisedStrings } from '../../../translations/l10n';

export default function DictionaryNameEditorDialogue(props) {
	const { visible, setVisible, editedDictionaryIndex, setEditedDictionaryIndex } = props;
	const { serverAddress, dictionaries, setDictionaries } = useAppContext();

	function handleSubmit(nameBuffer) {
		const newDisplayName = nameBuffer.length > 0 ? nameBuffer : dictionaries[editedDictionaryIndex].displayName;
		fetch(`${serverAddress}/api/management/dictionary_name`, {
			method: 'PUT',
			headers: JSON_HEADER,
			body: JSON.stringify({ name: dictionaries[editedDictionaryIndex].name, display: newDisplayName })
		})
			.then(loadDataFromJsonResponse)
			.then((data) => {
				if (data['success']) {
					let newDictionaries = [...dictionaries];
					newDictionaries[editedDictionaryIndex].displayName = newDisplayName;
					setDictionaries(newDictionaries);
				} else {
					alert(localisedStrings['dictionary-manager-alert-edit-name-failure']);
				}
				setEditedDictionaryIndex(-1);
				setVisible(false);
			});
	}

	return (
		<TextEditorDialogue
			visible={visible}
			setVisible={setVisible}
			title={localisedStrings['dictionary-manager-dialogue-edit-name-title']}
			originalValue={dictionaries[editedDictionaryIndex].displayName}
			handleSubmit={handleSubmit}
			inputMode='text'
			placeholder={localisedStrings['dictionary-manager-dialogue-name-placeholder']}
			autoCapitalize='sentences'
			autoCorrect={true} />
	);
}
