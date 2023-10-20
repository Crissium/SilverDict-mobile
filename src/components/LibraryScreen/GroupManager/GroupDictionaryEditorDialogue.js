import React from 'react';
import { FlatList } from 'react-native';
import { Button, Dialog, Portal } from 'react-native-paper';
import GroupDictionaryEditorDialogueItem from './GroupDictionaryEditorDialogueItem';
import { useAppContext } from '../../../AppContext';
import { JSON_HEADER, loadDataFromJsonResponse } from '../../../utils';
import { localisedStrings } from '../../../translations/l10n';

export default function GroupDictionaryEditorDialogue(props) {
	const { visible, setVisible, groupName } = props;
	const { serverAddress, dictionaries, groupings, setGroupings } = useAppContext();

	function dictionaryIncluded(dictionaryName) {
		return groupings[groupName].includes(dictionaryName);
	}

	function handleToggle(dictionaryName) {
		const included = dictionaryIncluded(dictionaryName);
		const requestMethod = included ? 'DELETE' : 'POST';

		fetch(`${serverAddress}/api/management/dictionary_groupings`, {
			method: requestMethod,
			headers: JSON_HEADER,
			body: JSON.stringify({ dictionary_name: dictionaryName, group_name: groupName })
		})
			.then(loadDataFromJsonResponse)
			.then((data) => {
				setGroupings(data);
			})
			.catch((error) => {
				if (included) {
					alert(localisedStrings['group-manager-alert-failure-removing-dictionary']);
				} else {
					alert(localisedStrings['group-manager-alert-failure-adding-dictionary']);
				}
			});
	}

	return (
		<Portal>
			<Dialog
				visible={visible}
				onDismiss={() => setVisible(false)}
			>
				<Dialog.Title>{localisedStrings['group-manager-card-title-dictionaries']}</Dialog.Title>
				<Dialog.Content>
					<FlatList
						style={{ maxHeight: 300 }}
						data={dictionaries}
						renderItem={({ item }) => <GroupDictionaryEditorDialogueItem
							name={item.name}
							displayName={item.displayName}
							included={dictionaryIncluded(item.name)}
							handleToggle={handleToggle} />}
						keyExtractor={(item) => item.name} />
				</Dialog.Content>
				<Dialog.Actions>
					<Button onPress={() => {
						setVisible(false);
					}}>
						{localisedStrings['generic-ok']}
					</Button>
				</Dialog.Actions>
			</Dialog>
		</Portal>
	);
}
