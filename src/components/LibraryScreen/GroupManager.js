import React from 'react';
import DraggableFlatList from 'react-native-draggable-flatlist';
import GroupCard from './GroupManager/GroupCard';
import { useAppContext } from '../../AppContext';
import { JSON_HEADER, loadDataFromJsonResponse } from '../../utils';
import { localisedStrings } from '../../translations/l10n';

export default function GroupManager() {
	const { serverAddress, groups, setGroups } = useAppContext();

	function handleReorder(newGroups) {
		fetch(`${serverAddress}/api/management/groups`, {
			method: 'PUT',
			headers: JSON_HEADER,
			body: JSON.stringify(newGroups)
		})
			.then(loadDataFromJsonResponse)
			.then((data) => {
				setGroups(data);
			})
			.catch((error) => {
				alert(localisedStrings['group-manager-alert-failure-reordering-groups']);
			});
	}

	return (
		<DraggableFlatList
			data={groups}
			onDragEnd={({ data }) => handleReorder(data)}
			renderItem={({ item, drag }) =>
				<GroupCard
					name={item.name}
					lang={item.lang}
					onLongPress={drag}
				/>
			}
			keyExtractor={(item) => item.name}
		/>
	);
}