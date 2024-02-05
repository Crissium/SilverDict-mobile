import React from 'react';
import { View } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { Drawer } from 'react-native-paper';
import { useAppContext } from '../AppContext';
import { localisedStrings } from '../translations/l10n';

export default function DrawerContent(props) {
	const { fetchInitialData, serverAddress, setDictionaries, setGroups, setGroupings, setHistory, setSizeHistory, setSizeSuggestion } = useAppContext();

	return (
		<DrawerContentScrollView {...props} keyboardShouldPersistTaps='handled'>
			<View>
				<Drawer.Item
					icon='magnify'
					label={localisedStrings['drawer-query-label']}
					onPress={() => props.navigation.navigate('Query')}
				/>
				<Drawer.Item
					icon='book-cog'
					label={localisedStrings['drawer-library-label']}
					onPress={() => props.navigation.navigate('Library')}
				/>
				<Drawer.Item
					icon='cog'
					label={localisedStrings['drawer-settings-label']}
					onPress={() => props.navigation.navigate('Settings')}
				/>
				<Drawer.Item
					icon='refresh'
					label={localisedStrings['drawer-reconnect-label']}
					onPress={() => fetchInitialData(`${serverAddress}/api`, setDictionaries, setGroups, setGroupings, setHistory, setSizeHistory, setSizeSuggestion)}
				/>
			</View>
		</DrawerContentScrollView>
	);
}