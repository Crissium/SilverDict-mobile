import React, { useState } from 'react';
import { Appbar, useTheme } from 'react-native-paper';
import AddDictionaryDialogue from './DictionaryManager/AddDictionaryDialogue';
import AddGroupDialogue from './GroupManager/AddGroupDialogue';
import AddSourceDialogue from './SourceManager/AddSourceDialogue';
import InProgressDialogue from '../common/InProgressDialogue';
import { useAppContext } from '../../AppContext';
import { convertDictionarySnakeCaseToCamelCase, loadDataFromJsonResponse } from '../../utils';
import { localisedStrings } from '../../translations/l10n';

export default function LibraryAppbar(props) {
	const { openDrawer, nameActiveTab } = props;
	const [addDictionaryDialogueVisible, setAddDictionaryDialogueVisible] = useState(false);
	const [addGroupDialogueVisible, setAddGroupDialogueVisible] = useState(false);
	const [addSourceDialogueVisible, setAddSourceDialogueVisible] = useState(false);
	const [rescaningSources, setRescaningSources] = useState(false);

	const { serverAddress, setDictionaries, setGroupings } = useAppContext();
	function handleRescan() {
		setRescaningSources(true);
		fetch(`${serverAddress}/api/management/scan`)
			.then(loadDataFromJsonResponse)
			.then((data) => {
				setDictionaries(data['dictionaries'].map(convertDictionarySnakeCaseToCamelCase));
				setGroupings(data['groupings']);
			})
			.catch((error) => {
				alert(localisedStrings['source-manager-alert-failure-rescaning-sources']);
			})
			.finally(() => {
				setRescaningSources(false);
			});
	}

	const iconColour = useTheme().colors.onSurface;
	const actions = {
		'Dictionaries': <Appbar.Action
			icon='plus'
			onPress={() => setAddDictionaryDialogueVisible(true)}
		/>,
		'Groups': <Appbar.Action
			icon='plus'
			onPress={() => setAddGroupDialogueVisible(true)}
		/>,
		'Sources': <>
			<Appbar.Action
				icon='plus'
				color={iconColour}
				onPress={() => setAddSourceDialogueVisible(true)}
			/>
			<Appbar.Action
				icon='refresh'
				color={iconColour}
				onPress={() => handleRescan()}
			/>
		</>
	}
	return (
		<Appbar.Header>
			<Appbar.Action
				icon='menu'
				onPress={() => openDrawer()}
			/>
			<Appbar.Content
				title={localisedStrings['drawer-library-label']}
			/>
			{actions[nameActiveTab]}
			<AddDictionaryDialogue
				visible={addDictionaryDialogueVisible}
				setVisible={setAddDictionaryDialogueVisible}
			/>
			<AddGroupDialogue
				visible={addGroupDialogueVisible}
				setVisible={setAddGroupDialogueVisible}
			/>
			<AddSourceDialogue
				visible={addSourceDialogueVisible}
				setVisible={setAddSourceDialogueVisible}
			/>
			<InProgressDialogue
				visible={rescaningSources}
				title={localisedStrings['source-manager-dialogue-rescanning-sources-title']}
			/>
		</Appbar.Header>
	);
}