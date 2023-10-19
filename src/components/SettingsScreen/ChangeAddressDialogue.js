import React from 'react';
import TextEditorDialogue from '../common/TextEditorDialogue';
import { loadDataFromJsonResponse } from '../../utils';
import { localisedStrings } from '../../translations/l10n';

export default function ChangeAddressDialogue(props) {
	const { visible, setVisible, setServerAddress } = props;

	function handleSubmit(addressBuffer) {
		fetch(`${addressBuffer}/api/validator/test_connection`)
			.then(loadDataFromJsonResponse)
			.then((data) => {
				if (data['success']) {
					setServerAddress(addressBuffer);
					setVisible(false);
				}
			})
			.catch((error) => {
				alert(localisedStrings['change-address-dialogue-message-unable-to-connect']);
			});
	}

	return (
		<TextEditorDialogue
			visible={visible}
			setVisible={setVisible}
			title={localisedStrings['change-address-dialogue-title']}
			originalValue=''
			handleSubmit={handleSubmit}
			inputMode='url'
			placeholder='http://localhost:2628'
			autoCapitalize='none'
			autoCorrect={false}
		/>
	);
}
