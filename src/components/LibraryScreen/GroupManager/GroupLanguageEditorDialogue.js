import React from 'react';
import ISO6391 from 'iso-639-1';
import TextEditorDialogue from '../../common/TextEditorDialogue';
import { useAppContext } from '../../../AppContext';
import { getSetFromLangString, JSON_HEADER, loadDataFromJsonResponse } from '../../../utils';
import { localisedStrings } from '../../../translations/l10n';

export default function GroupLanguageEditorDialogue(props) {
	const { visible, setVisible, name, languagesString } = props;
	const { serverAddress, setGroups } = useAppContext();

	function handleSubmit(languagesBufferString) {
		const newLangs = getSetFromLangString(languagesBufferString);
		for (const lang of newLangs) {
			if (!ISO6391.validate(lang)) {
				alert(localisedStrings['group-manager-alert-invalid-language-code']);
				return;
			}
		}

		fetch(`${serverAddress}/api/management/group_lang`, {
			method: 'PUT',
			headers: JSON_HEADER,
			body: JSON.stringify({ name: name, lang: Array.from(newLangs) })
		})
			.then(loadDataFromJsonResponse)
			.then((data) => {
				setGroups(data);
				setVisible(false);
			})
			.catch((error) => {
				alert(localisedStrings['group-manager-alert-failure-changing-languages']);
			});
	}

	return (
		<TextEditorDialogue
			visible={visible}
			setVisible={setVisible}
			title={localisedStrings['group-manager-dialogue-change-languages-title']}
			content={localisedStrings['group-manager-dialogue-change-languages-content']}
			originalValue={languagesString}
			handleSubmit={handleSubmit}
			inputMode='text'
			placeholder='en, fr, zh'
			autoCapitalize='none'
			autoCorrect={false} />
	);
}
