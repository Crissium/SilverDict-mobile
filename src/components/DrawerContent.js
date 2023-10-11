import React from "react";
import { View } from "react-native";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { Drawer } from "react-native-paper";

export default function DrawerContent(props) {
	return (
		<DrawerContentScrollView {...props} keyboardShouldPersistTaps='handled'>
			<View>
				<Drawer.Item
					icon='magnify'
					label='Query'
					onPress={() => props.navigation.navigate('Query')}
				/>
				<Drawer.Item
					icon='cog'
					label='Settings'
					onPress={() => props.navigation.navigate('Settings')}
				/>
			</View>
		</DrawerContentScrollView>
	);
}