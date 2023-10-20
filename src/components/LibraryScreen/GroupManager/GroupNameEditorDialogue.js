import React from 'react';
import TextEditorDialogue from '../../common/TextEditorDialogue';
import { useAppContext } from '../../../AppContext';
import { JSON_HEADER, loadDataFromJsonResponse } from '../../../utils';
import { localisedStrings } from '../../../translations/l10n';

export default function GroupNameEditorDialogue(props) {
	const { visible, setVisible, name } = props;
	const { serverAddress, setGroups, groupings, setGroupings } = useAppContext();

	function handleSubmit(nameBuffer) {
		if (nameBuffer.length === 0) {
			alert(localisedStrings['group-manager-alert-empty-name']);
			return;
		}

		if (nameBuffer === name) {
			setVisible(false);
			return;
		}

		if (groupings[nameBuffer]) {
			alert(localisedStrings['group-manager-alert-name-exists']);
			return;
		}

		fetch(`${serverAddress}/api/management/group_name`, {
			method: 'PUT',
			headers: JSON_HEADER,
			body: JSON.stringify({ old: name, new: nameBuffer })
		})
			.then(loadDataFromJsonResponse)
			.then((data) => {
				setGroups(data['groups']);
				setGroupings(data['groupings']);
				setVisible(false);
			})
			.catch((error) => {
				alert(localisedStrings['group-manager-alert-failure-renaming-group']);
			});
	}

	return (
		<TextEditorDialogue
			visible={visible}
			setVisible={setVisible}
			title={localisedStrings['group-manager-dialogue-rename-title']}
			originalValue={name}
			handleSubmit={handleSubmit}
			inputMode='text'
			placeholder=''
			autoCapitalize='words'
			autoCorrect={true} />
	);
}
