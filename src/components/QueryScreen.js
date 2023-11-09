import React from 'react';
import { View } from 'react-native';
import { QueryProvider } from './QueryScreen/QueryContext';
import QueryBar from './QueryScreen/QueryBar';
import QueryContent from './QueryScreen/QueryContent';

export default function QueryScreen({ navigation }) {

	return (
		<QueryProvider>
			<View style={{ flex: 1 }}>
				<QueryBar
					openDrawer={navigation.openDrawer}
				/>
				<QueryContent />
			</View>
		</QueryProvider>
	);
}
