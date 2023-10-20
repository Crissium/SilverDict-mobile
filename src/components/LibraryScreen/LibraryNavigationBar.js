import React from 'react';
import { View } from 'react-native';
import { Appbar, Button } from 'react-native-paper';
import { localisedStrings } from '../../translations/l10n';

export default function LibraryNavigationBar(props) {
	return (
		<Appbar>
			<View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
				<Button
					onPress={() => props.navigation.navigate('Dictionaries')}
				>
					{localisedStrings['group-manager-card-title-dictionaries']}
				</Button>
				<Button
					onPress={() => props.navigation.navigate('Groups')}
				>
					{localisedStrings['library-screen-groups']}
				</Button>
				<Button
					onPress={() => props.navigation.navigate('Sources')}
				>
					{localisedStrings['library-screen-sources']}
				</Button>
			</View>
		</Appbar>
	);
}