import React from 'react';
import TextEditorDialogue from '../common/TextEditorDialogue';
import { JSON_HEADER, loadDataFromJsonResponse } from '../../utils';
import { localisedStrings } from '../../translations/l10n';

export default function ChangeSizeHistoryDialogue(props) {
	const { visible, setVisible, apiPrefix, setHistory, sizeHistory, setSizeHistory } = props;

	function handleSubmit(sizeBuffer) {
		let newSize;
		try {
			newSize = parseInt(sizeBuffer);
			newSize = Math.max(newSize, 0);
		} catch (error) {
			alert(localisedStrings['generic-alert-invalid-number']);
			return;
		}

		fetch(`${apiPrefix}/management/history_size`, {
			method: 'PUT',
			headers: JSON_HEADER,
			body: JSON.stringify({ size: newSize })
		})
			.then(loadDataFromJsonResponse)
			.then((data) => {
				setHistory(data);
				setSizeHistory(newSize);
				setVisible(false);
			})
			.catch((error) => {
				alert(localisedStrings['change-size-history-dialogue-message-failure']);
			});
	}

	return (
		<TextEditorDialogue
			visible={visible}
			setVisible={setVisible}
			title={localisedStrings['change-size-history-dialogue-title']}
			originalValue={sizeHistory.toString()}
			handleSubmit={handleSubmit}
			inputMode='numeric'
			placeholder={localisedStrings['change-size-history-dialogue-placeholder']}
			autoCapitalize='none'
			autoCorrect={false}
		/>
	);
}
