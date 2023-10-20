import React from 'react';
import ConfirmDialogue from '../../common/ConfirmDialogue';
import { useAppContext } from '../../../AppContext';
import { JSON_HEADER, loadDataFromJsonResponse } from '../../../utils';
import { localisedStrings } from '../../../translations/l10n';

export default function ConfirmDeleteDialogue(props) {
	const { visible, setVisible, name } = props;
	const { serverAddress, setGroups, setGroupings } = useAppContext();

	function handleDelete() {
		fetch(`${serverAddress}/api/management/groups`, {
			method: 'DELETE',
			headers: JSON_HEADER,
			body: JSON.stringify({ name: name })
		})
			.then(loadDataFromJsonResponse)
			.then((data) => {
				setGroups(data['groups']);
				setGroupings(data['groupings']);
			})
			.catch((error) => {
				alert(localisedStrings['group-manager-alert-failure-removing-group']);
			})
			.finally(() => {
				setVisible(false);
			});
	}

	return (
		<ConfirmDialogue
			visible={visible}
			setVisible={setVisible}
			title={localisedStrings['group-manager-dialogue-delete-title']}
			content={localisedStrings.formatString(localisedStrings['group-manager-dialogue-delete-content'], name)}
			onConfirm={handleDelete} />
	);
}
