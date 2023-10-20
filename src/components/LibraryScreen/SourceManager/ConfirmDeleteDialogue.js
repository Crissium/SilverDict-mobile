import React from 'react';
import ConfirmDialogue from '../../common/ConfirmDialogue';
import { useAppContext } from '../../../AppContext';
import { JSON_HEADER, loadDataFromJsonResponse } from '../../../utils';
import { localisedStrings } from '../../../translations/l10n';

export default function ConfirmDeleteDialogue(props) {
	const { visible, setVisible, source } = props;
	const { serverAddress, setSources } = useAppContext();

	function handleDelete() {
		fetch(`${serverAddress}/api/management/sources`, {
			method: 'DELETE',
			headers: JSON_HEADER,
			body: JSON.stringify({ source: source })
		})
			.then(loadDataFromJsonResponse)
			.then((data) => {
				setSources(data);
			})
			.catch((error) => {
				alert(localisedStrings['source-manager-alert-failure-deleting-source']);
			})
			.finally(() => {
				setVisible(false);
			});
	}

	return (
		<ConfirmDialogue
			visible={visible}
			setVisible={setVisible}
			title={localisedStrings['source-manager-confirm-delete-title']}
			content={localisedStrings.formatString(localisedStrings['source-manager-confirm-delete-content'], source)}
			onConfirm={handleDelete}
		/>
	);
}