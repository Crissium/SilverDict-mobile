import React from 'react';
import { View } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { Drawer } from 'react-native-paper';
import { localisedStrings } from '../translations/l10n';

export default function DrawerContent(props) {
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
			</View>
		</DrawerContentScrollView>
	);
}