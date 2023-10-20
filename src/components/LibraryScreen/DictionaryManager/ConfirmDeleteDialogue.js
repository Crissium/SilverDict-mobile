import React from 'react';
import { useAppContext } from '../../../AppContext';
import { JSON_HEADER, convertDictionarySnakeCaseToCamelCase, loadDataFromJsonResponse } from '../../../utils';
import ConfirmDialogue from '../../common/ConfirmDialogue';
import { localisedStrings } from '../../../translations/l10n';

export default function ConfirmDeleteDialogue(props) {
	const { visible, setVisible, editedDictionaryIndex, setEditedDictionaryIndex } = props;
	const { serverAddress, dictionaries, setDictionaries, setGroupings } = useAppContext();

	function onConfirm() {
		fetch(`${serverAddress}/api/management/dictionaries`, {
			method: 'DELETE',
			headers: JSON_HEADER,
			body: JSON.stringify({ name: dictionaries[editedDictionaryIndex].name })
		})
			.then(loadDataFromJsonResponse)
			.then((data) => {
				setEditedDictionaryIndex(-1); // This has to happen here, otherwise the edited dictionary would be deleted before the dialogue is closed.
				setVisible(false);
				setDictionaries(data['dictionaries'].map(convertDictionarySnakeCaseToCamelCase));
				setGroupings(data['groupings']);
			})
			.catch((error) => {
				setEditedDictionaryIndex(-1);
				setVisible(false);
				alert(localisedStrings['dictionary-manager-alert-delete-dictionary-failure']);
			});
	}

	return (
		<ConfirmDialogue
			visible={visible}
			setVisible={setVisible}
			title={localisedStrings['dictionary-manager-dialogue-delete-dictionary-title']}
			content={localisedStrings.formatString(localisedStrings['dictionary-manager-dialogue-delete-dictionary-content'], dictionaries[editedDictionaryIndex].displayName)}
			onConfirm={onConfirm} />
	);
}
