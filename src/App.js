import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { I18nManager } from 'react-native';
import { useTheme } from 'react-native-paper';
import { AppProvider } from './AppContext';
import { interfaceLangIsRTL } from './translations/l10n';
import QueryScreen from './components/QueryScreen';
import SettingsScreen from './components/SettingsScreen';
import DrawerContent from './components/DrawerContent';

I18nManager.forceRTL(interfaceLangIsRTL);

const Drawer = createDrawerNavigator();

export default function App() {
	const drawerTheme = useTheme().dark ? DarkTheme : DefaultTheme;
	return (
		<AppProvider>
			<NavigationContainer
				documentTitle={{
					enabled: false
				}}
				theme={drawerTheme}
			>
				<Drawer.Navigator
					initialRouteName='Query'
					drawerContent={(props) => <DrawerContent {...props} />}
				>
					<Drawer.Screen
						name='Query'
						component={QueryScreen}
						options={{ headerShown: false }} />
					<Drawer.Screen
						name='Settings'
						component={SettingsScreen}
						options={{ headerShown: false }} />
					
				</Drawer.Navigator>
			</NavigationContainer>
		</AppProvider>
	)
}
