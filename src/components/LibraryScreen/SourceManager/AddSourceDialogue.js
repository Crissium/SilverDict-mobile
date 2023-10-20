import React from 'react';
import TextEditorDialogue from '../../common/TextEditorDialogue';
import { useAppContext } from '../../../AppContext';
import { JSON_HEADER, loadDataFromJsonResponse } from '../../../utils';
import { localisedStrings } from '../../../translations/l10n';

export default function AddSourceDialogue(props) {
	const { serverAddress, sources, setSources } = useAppContext();
	const { visible, setVisible } = props;

	function handleSubmit(newSource) {
		if (newSource.length === 0) {
			alert(localisedStrings['source-manager-alert-empty-source']);
			return;
		}

		if (sources.includes(newSource)) {
			alert(localisedStrings['source-manager-alert-duplicate']);
			return;
		}

		fetch(`${serverAddress}/api/validator/source`, {
			method: 'POST',
			headers: JSON_HEADER,
			body: JSON.stringify({ source: newSource })
		})
			.then(loadDataFromJsonResponse)
			.then((data) => {
				if (data['valid']) {
					fetch(`${serverAddress}/api/management/sources`, {
						method: 'POST',
						headers: JSON_HEADER,
						body: JSON.stringify({ source: newSource })
					})
						.then(loadDataFromJsonResponse)
						.then((data) => {
							setSources(data);
							setVisible(false);
						})
						.catch((error) => {
							alert(localisedStrings['source-manager-alert-failure-adding-source']);
						});
				} else {
					alert(localisedStrings['source-manager-alert-invalid-source']);
				}
			});
	}

	return (
		<TextEditorDialogue
			visible={visible}
			setVisible={setVisible}
			title={localisedStrings['source-manager-dialogue-add-source-title']}
			content=''
			originalValue=''
			handleSubmit={handleSubmit}
			inputMode='url'
			placeholder='/home/alice/new/source'
			autoCapitalize='none'
			autoCorrect={false}
		/>
	);
}