import React, { useState } from 'react';
import { FlatList } from 'react-native';
import { Button, Card, List } from 'react-native-paper';
import ISO6391 from 'iso-639-1';
import ConfirmDeleteDialogue from './ConfirmDeleteDialogue';
import GroupNameEditorDialogue from './GroupNameEditorDialogue';
import GroupLanguageEditorDialogue from './GroupLanguageEditorDialogue';
import GroupDictionaryEditorDialogue from './GroupDictionaryEditorDialogue';
import { useAppContext } from '../../../AppContext';
import { localisedStrings } from '../../../translations/l10n';

export default function GroupCard(props) {
	const { name, lang, onLongPress } = props;
	const { dictionaries, groupings } = useAppContext();
	const isDefaultGroup = name === 'Default Group';
	const [confirmDeleteDialogueVisible, setConfirmDeleteDialogueVisible] = useState(false);
	const [groupNameEditorDialogueVisible, setGroupNameEditorDialogueVisible] = useState(false);
	const [groupLanguageEditorDialogueVisible, setGroupLanguageEditorDialogueVisible] = useState(false);
	const [groupDictionaryEditorDialogueVisible, setGroupDictionaryEditorDialogueVisible] = useState(false);

	return (
		<Card onLongPress={onLongPress}>
			<Card.Title
				title={name} />
			{!isDefaultGroup &&
				<Card.Actions
					style={{ alignSelf: 'center' }}
				>
					<Button
						onPress={() => setGroupNameEditorDialogueVisible(true)}
					>
						{localisedStrings['generic-rename']}
					</Button>
					<Button
						onPress={() => setConfirmDeleteDialogueVisible(true)}
					>
						{localisedStrings['generic-delete']}
					</Button>
				</Card.Actions>}
			<Card.Content>
				<List.Accordion
					title={localisedStrings['group-manager-card-title-languages']}
					onLongPress={() => setGroupLanguageEditorDialogueVisible(true)}
				>
					<FlatList
						data={lang}
						renderItem={({ item }) => <List.Item
							title={ISO6391.getNativeName(item)} />}
						keyExtractor={(item) => item} />
				</List.Accordion>
				<List.Accordion
					title={localisedStrings['group-manager-card-title-dictionaries']}
					onLongPress={() => setGroupDictionaryEditorDialogueVisible(true)}
				>
					{groupings[name] && <FlatList
						data={dictionaries.filter((dictionary) => groupings[name].includes(dictionary.name))}
						renderItem={({ item }) => <List.Item title={item.displayName} />}
						keyExtractor={(item) => item.name} />}
				</List.Accordion>
			</Card.Content>
			<ConfirmDeleteDialogue
				visible={confirmDeleteDialogueVisible}
				setVisible={setConfirmDeleteDialogueVisible}
				name={name} />
			<GroupNameEditorDialogue
				visible={groupNameEditorDialogueVisible}
				setVisible={setGroupNameEditorDialogueVisible}
				name={name} />
			<GroupLanguageEditorDialogue
				visible={groupLanguageEditorDialogueVisible}
				setVisible={setGroupLanguageEditorDialogueVisible}
				name={name}
				languagesString={lang.join(', ')} />
			<GroupDictionaryEditorDialogue
				visible={groupDictionaryEditorDialogueVisible}
				setVisible={setGroupDictionaryEditorDialogueVisible}
				groupName={name} />
		</Card>
	);
}
