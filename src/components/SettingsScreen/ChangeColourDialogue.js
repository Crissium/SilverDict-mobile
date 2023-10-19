import React from 'react';
import TextEditorDialogue from '../common/TextEditorDialogue';
import { localisedStrings } from '../../translations/l10n';

export default function ChangeColourDialogue(props) {
	const { visible, setVisible, darkTextColour, setDarkTextColour } = props;

	function handleSubmit(colourBuffer) {
		if (colourBuffer.length > 0) {
			setDarkTextColour(colourBuffer);
		} else {
			setDarkTextColour('white');
		}
		setVisible(false);
	}

	return (
		<TextEditorDialogue
			visible={visible}
			setVisible={setVisible}
			title={localisedStrings['change-colour-dialogue-title']}
			content={localisedStrings['change-colour-dialogue-content']}
			originalValue={darkTextColour}
			handleSubmit={handleSubmit}
			inputMode='text'
			placeholder='white'
			autoCapitalize='none'
			autoCorrect={false}
		/>
	);
}
