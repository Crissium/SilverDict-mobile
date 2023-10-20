import React, { useState } from 'react';
import ConfirmDialogue from '../common/ConfirmDialogue';
import InProgressDialogue from '../common/InProgressDialogue';
import { loadDataFromJsonResponse } from '../../utils';
import { localisedStrings } from '../../translations/l10n';

export default function ConfirmRecreateNgramDialogue(props) {
	const { visible, setVisible, apiPrefix } = props;
	const [inProgress, setInProgress] = useState(false);

	function handleConfirm() {
		setInProgress(true);
		fetch(`${apiPrefix}/management/create_ngram_table`)
			.then(loadDataFromJsonResponse)
			.then((data) => {
				if (data['success']) {
					alert(localisedStrings['confirm-recreate-ngram-dialogue-message-success']);
				}
			})
			.catch((error) => {
				alert(localisedStrings['confirm-recreate-ngram-dialogue-message-failure']);
			})
			.finally(() => {
				setInProgress(false);
				setVisible(false);
			});
	}

	return (
		<>
			<InProgressDialogue
				visible={inProgress}
				title={localisedStrings['confirm-recreate-ngram-dialogue-message-in-progress']}
			/>
			<ConfirmDialogue
				visible={visible}
				setVisible={setVisible}
				title={localisedStrings['confirm-recreate-ngram-dialogue-title']}
				content={localisedStrings['confirm-recreate-ngram-dialogue-content']}
				onConfirm={handleConfirm}
			/>
		</>
	);
}