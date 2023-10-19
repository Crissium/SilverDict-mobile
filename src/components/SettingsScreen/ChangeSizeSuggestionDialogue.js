import React from 'react';
import TextEditorDialogue from '../common/TextEditorDialogue';
import { JSON_HEADER, loadDataFromJsonResponse } from '../../utils';
import { localisedStrings } from '../../translations/l10n';

export default function ChangeSizeSuggestionDialogue(props) {
	const { visible, setVisible, apiPrefix, sizeSuggestion, setSizeSuggestion } = props;

	function handleSubmit(sizeBuffer) {
		let newSize;
		try {
			newSize = parseInt(sizeBuffer);
			newSize = Math.max(newSize, 1);
		} catch (error) {
			alert(localisedStrings['generic-alert-invalid-number']);
			return;
		}

		fetch(`${apiPrefix}/management/num_suggestions`, {
			method: 'PUT',
			headers: JSON_HEADER,
			body: JSON.stringify({ size: newSize })
		})
			.then(loadDataFromJsonResponse)
			.then((data) => {
				setSizeSuggestion(data['size']);
				setVisible(false);
			})
			.catch((error) => {
				alert(localisedStrings['change-size-suggestion-dialogue-message-failure']);
			});
	}

	return (
		<TextEditorDialogue
			visible={visible}
			setVisible={setVisible}
			title={localisedStrings['change-size-suggestion-dialogue-title']}
			originalValue={sizeSuggestion.toString()}
			handleSubmit={handleSubmit}
			inputMode='numeric'
			placeholder={localisedStrings['change-size-suggestion-dialogue-placeholder']}
			autoCapitalize='none'
			autoCorrect={false}
		/>
	);
}
