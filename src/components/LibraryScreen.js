import React from 'react';
import { View } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import LibraryAppbar from './LibraryScreen/LibraryAppbar';
import LibraryNavigationBar from './LibraryScreen/LibraryNavigationBar';
import DictionaryManager from './LibraryScreen/DictionaryManager';
import GroupManager from './LibraryScreen/GroupManager';
import SourceManager from './LibraryScreen/SourceManager';

const Tab = createMaterialTopTabNavigator();

export default function LibraryScreen({ navigation, route }) {
	const nameActiveTab = getFocusedRouteNameFromRoute(route) ?? 'Dictionaries';
	return (
		<View style={{ flex: 1 }}>
			<LibraryAppbar openDrawer={() => navigation.openDrawer()} nameActiveTab={nameActiveTab} />
			<Tab.Navigator tabBar={(props) => <LibraryNavigationBar {...props} />}>
				<Tab.Screen name='Dictionaries' component={DictionaryManager} />
				<Tab.Screen name='Groups' component={GroupManager} />
				<Tab.Screen name='Sources' component={SourceManager} />
			</Tab.Navigator>
		</View>
	);
}