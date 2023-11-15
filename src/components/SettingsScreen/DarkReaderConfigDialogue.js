import React from 'react';
import { View } from 'react-native';
import { Button, Dialog, Portal, Switch, Text } from 'react-native-paper';
import Slider from '@react-native-community/slider';
import { useAppContext } from '../../AppContext';
import { localisedStrings } from '../../translations/l10n';

export default function DarkReaderConfigDialogue(props) {
	const { visible, setVisible } = props;
	const { darkReaderEnabled, setDarkReaderEnabled, darkReaderBrightness, setDarkReaderBrightness, darkReaderContrast, setDarkReaderContrast, darkReaderSepia, setDarkReaderSepia } = useAppContext();

	return (
		<Portal>
			<Dialog
				visible={visible}
				onDismiss={() => setVisible(false)}>
				<Dialog.Title>{localisedStrings['dark-reader-config-title']}</Dialog.Title>
				<Dialog.Content>
					<Text>{localisedStrings['dark-reader-config-performance-warning']}</Text>
					<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
						<Text style={{flex: 1}}>{localisedStrings['dark-reader-config-enabled']}</Text>
						<Switch
							style={{flex: 1}}
							value={darkReaderEnabled}
							onValueChange={() => setDarkReaderEnabled(!darkReaderEnabled)}
						/>
					</View>
					<Text>{localisedStrings['dark-reader-config-brightness']}</Text>
					<Slider
						value={darkReaderBrightness}
						onValueChange={setDarkReaderBrightness}
						minimumValue={0}
						maximumValue={100}
						step={1}
					/>
					<Text>{localisedStrings['dark-reader-config-contrast']}</Text>
					<Slider
						value={darkReaderContrast}
						onValueChange={setDarkReaderContrast}
						minimumValue={0}
						maximumValue={100}
						step={1}
					/>
					<Text>{localisedStrings['dark-reader-config-sepia']}</Text>
					<Slider
						value={darkReaderSepia}
						onValueChange={setDarkReaderSepia}
						minimumValue={0}
						maximumValue={100}
						step={1}
					/>
				</Dialog.Content>
				<Dialog.Actions>
					<Button onPress={() => {
						setVisible(false);
					}}>
						{localisedStrings['generic-ok']}
					</Button>
				</Dialog.Actions>
			</Dialog>
		</Portal>
	);
}