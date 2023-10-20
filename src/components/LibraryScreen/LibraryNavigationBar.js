import React from 'react';
import { View } from 'react-native';
import { Appbar, Button, useTheme } from 'react-native-paper';
import { localisedStrings } from '../../translations/l10n';

export default function LibraryNavigationBar(props) {
	const textColour = useTheme().colors.onSurface;
	return (
		<Appbar>
			<View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
				<Button
					textColor={textColour}
					onPress={() => props.navigation.navigate('Dictionaries')}
				>
					{localisedStrings['group-manager-card-title-dictionaries']}
				</Button>
				<Button
					textColor={textColour}
					onPress={() => props.navigation.navigate('Groups')}
				>
					{localisedStrings['library-screen-groups']}
				</Button>
				<Button
					textColor={textColour}
					onPress={() => props.navigation.navigate('Sources')}
				>
					{localisedStrings['library-screen-sources']}
				</Button>
			</View>
		</Appbar>
	);
}