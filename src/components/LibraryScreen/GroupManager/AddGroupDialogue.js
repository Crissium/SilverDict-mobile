import React, { useState } from 'react';
import { Button, Dialog, Text, TextInput, Portal } from 'react-native-paper';
import ISO6391 from 'iso-639-1';
import { useAppContext } from '../../../AppContext';
import { getSetFromLangString, JSON_HEADER, loadDataFromJsonResponse } from '../../../utils';
import { localisedStrings } from '../../../translations/l10n';

export default function AddGroupDialogue(props) {
	const { visible, setVisible } = props;
	const { serverAddress, setGroups, groupings, setGroupings } = useAppContext();

	const [newGroupName, setNewGroupName] = useState('');
	const [newGroupLangsString, setNewGroupLangsString] = useState('');

	function handleSubmit() {
		if (newGroupName.length === 0) {
			alert(localisedStrings['group-manager-alert-empty-name']);
			return;
		}

		if (groupings[newGroupName]) {
			alert(localisedStrings['group-manager-alert-name-exists']);
			return;
		}

		const langs = getSetFromLangString(newGroupLangsString);
		for (const lang of langs) {
			if (!ISO6391.validate(lang)) {
				alert(localisedStrings['group-manager-alert-invalid-language-code']);
				return;
			}
		}

		fetch(`${serverAddress}/api/management/groups`, {
			method: 'POST',
			headers: JSON_HEADER,
			body: JSON.stringify({
				name: newGroupName,
				lang: Array.from(langs)
			})
		})
			.then(loadDataFromJsonResponse)
			.then((data) => {
				setGroups(data['groups']);
				setGroupings(data['groupings']);
				setVisible(false);
			})
			.catch((error) => {
				alert(localisedStrings['group-manager-alert-failure-adding-group']);
			});
	}

	return (
		<Portal>
			<Dialog
				visible={visible}
				onDismiss={() => setVisible(false)}
			>
				<Dialog.Title>{localisedStrings['group-manager-dialogue-add-title']}</Dialog.Title>
				<Dialog.Content>
					<Text>{localisedStrings['group-manager-dialogue-add-content']}</Text>
					<TextInput
						style={{ backgroundColor: 'transparent', height: 50 }}
						value={newGroupName}
						onChangeText={(text) => setNewGroupName(text)}
						mode='outlined'
					/>
					<Text>{localisedStrings['group-manager-dialogue-change-languages-content']}</Text>
					<TextInput
						style={{ backgroundColor: 'transparent', height: 50 }}
						value={newGroupLangsString}
						onChangeText={(text) => setNewGroupLangsString(text)}
						mode='outlined'
						autoCapitalize='none'
						autoCorrect={false}
					/>
				</Dialog.Content>
				<Dialog.Actions>
					<Button onPress={() => {
						setVisible(false);
					}}>
						{localisedStrings['generic-cancel']}
					</Button>
					<Button onPress={() => {
						handleSubmit();
					}}>
						{localisedStrings['generic-ok']}
					</Button>
				</Dialog.Actions>
			</Dialog>
		</Portal>
	);
}