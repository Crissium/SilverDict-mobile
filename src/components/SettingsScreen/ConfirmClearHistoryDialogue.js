import React from 'react';
import ConfirmDialogue from '../common/ConfirmDialogue';
import { loadDataFromJsonResponse } from '../../utils';
import { localisedStrings } from '../../translations/l10n';

export default function ConfirmClearHistoryDialogue(props) {
	const { visible, setVisible, apiPrefix, setHistory } = props;

	function handleConfirm() {
		fetch(`${apiPrefix}/management/history`, {
			method: 'DELETE'
		})
			.then(loadDataFromJsonResponse)
			.then((data) => {
				setHistory(data);
				setVisible(false);
			})
			.catch((error) => {
				alert(localisedStrings['clear-history-dialogue-message-failure']);
			});
	}

	return (
		<ConfirmDialogue
			visible={visible}
			setVisible={setVisible}
			title={localisedStrings['clear-history-dialogue-title']}
			content={localisedStrings['clear-history-dialogue-content']}
			onConfirm={handleConfirm}
		/>
	);
}