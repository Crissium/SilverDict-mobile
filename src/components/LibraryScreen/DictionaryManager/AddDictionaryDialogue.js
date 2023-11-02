import React, { useState } from 'react';
import { Button, Dialog, Text, TextInput, Portal, useTheme } from 'react-native-paper';
import RNPickerSelect from 'react-native-picker-select';
import { useAppContext } from '../../../AppContext';
import { JSON_HEADER, loadDataFromJsonResponse, convertDictionarySnakeCaseToCamelCase } from '../../../utils';
import { localisedStrings } from '../../../translations/l10n';

export default function AddDictionaryDialogue(props) {
	const theme = useTheme();
	const { visible, setVisible } = props;
	const { serverAddress, formats, dictionaries, setDictionaries, groups, setGroupings } = useAppContext();
	const [newDictionaryDisplayName, setNewDictionaryDisplayName] = useState('');
	const [newDictionaryFilename, setNewDictionaryFilename] = useState('');
	const [newDictionaryFormat, setNewDictionaryFormat] = useState(formats[0]);
	const [newDictionaryGroup, setNewDictionaryGroup] = useState('Default Group');

	function handleSubmit() {
		if (newDictionaryDisplayName.length === 0) {
			alert(localisedStrings['add-dictionary-dialogue-alert-empty-name']);
			return;
		}

		if (newDictionaryFilename.length === 0) {
			alert(localisedStrings['add-dictionary-dialogue-alert-empty-filename']);
			return;
		}

		const pathSep = newDictionaryFilename.includes('/') ? '/' : '\\';
		const newDictionaryName = newDictionaryFilename.split(pathSep).pop().split('.')[0];
		if (dictionaries.map((dictionary) => dictionary.name).includes(newDictionaryName)) {
			alert(localisedStrings['add-dictionary-dialogue-alert-duplicate']);
			return;
		}

		const newDictionaryInfo = {
			dictionary_display_name: newDictionaryDisplayName,
			dictionary_name: newDictionaryName,
			dictionary_format: newDictionaryFormat,
			dictionary_filename: newDictionaryFilename
		};

		fetch(`${serverAddress}/api/validator/dictionary_info`, {
			method: 'POST',
			headers: JSON_HEADER,
			body: JSON.stringify(newDictionaryInfo)
		})
			.then(loadDataFromJsonResponse)
			.then((data) => {
				if (data['valid']) {
					newDictionaryInfo['group_name'] = newDictionaryGroup;
					fetch(`${serverAddress}/api/management/dictionaries`, {
						method: 'POST',
						headers: JSON_HEADER,
						body: JSON.stringify(newDictionaryInfo)
					})
						.then(loadDataFromJsonResponse)
						.then((data) => {
							setDictionaries(data['dictionaries'].map(convertDictionarySnakeCaseToCamelCase));
							setGroupings(data['groupings']);
							setVisible(false);
						})
						.catch((error) => {
							alert(localisedStrings['add-dictionary-dialogue-alert-failure-adding']);
						});
				} else {
					alert(localisedStrings['add-dictionary-dialogue-alert-invalid']);
				}
			})
			.catch((error) => {
				alert(localisedStrings['add-dictionary-dialogue-alert-failure-validating']);
			});
	}

	return (
		<Portal>
			<Dialog
				visible={visible}
				onDismiss={() => setVisible(false)}
			>
				<Dialog.Title>{localisedStrings['add-dictionary-dialogue-title']}</Dialog.Title>
				<Dialog.Content>
					<Text>{localisedStrings['add-dictionary-dialogue-content-name']}</Text>
					<TextInput
						style={{ backgroundColor: 'transparent', height: 50 }}
						value={newDictionaryDisplayName}
						mode='outlined'
						onChangeText={(text) => setNewDictionaryDisplayName(text)}
					/>
					<Text>{localisedStrings['add-dictionary-dialogue-content-filename']}</Text>
					<TextInput
						style={{ backgroundColor: 'transparent', height: 50 }}
						value={newDictionaryFilename}
						mode='outlined'
						onChangeText={(text) => setNewDictionaryFilename(text)}
					/>
					<Text>{localisedStrings['add-dictionary-dialogue-content-format']}</Text>
					<RNPickerSelect
						darkTheme={theme.dark}
						useNativeAndroidPickerStyle={false}
						style={{
							inputIOS: {
								padding: 0,
								borderWidth: 0,
								color: theme.colors.text,
							},
							inputAndroid: {
								padding: 0,
								borderWidth: 0,
								color: theme.colors.text,
							},
						}}
						items={formats.map((format) => {
							return {
								label: format,
								value: format
							}
						})}
						onValueChange={(value) => setNewDictionaryFormat(value)}
						value={newDictionaryFormat}
					/>
					<Text>{localisedStrings['add-dictionary-dialogue-content-group']}</Text>
					<RNPickerSelect
						darkTheme={theme.dark}
						useNativeAndroidPickerStyle={false}
						style={{
							inputIOS: {
								padding: 0,
								borderWidth: 0,
								color: theme.colors.text,
							},
							inputAndroid: {
								padding: 0,
								borderWidth: 0,
								color: theme.colors.text,
							},
						}}
						items={groups.map((group) => {
							return {
								label: group.name,
								value: group.name
							}
						})}
						onValueChange={(value) => setNewDictionaryGroup(value)}
						value={newDictionaryGroup}
					/>
				</Dialog.Content>
				<Dialog.Actions>
					<Button onPress={() => {
						setVisible(false);
					}}>
						{localisedStrings['generic-cancel']}
					</Button>
					<Button onPress={() => {
						handleSubmit();
					}}>
						{localisedStrings['generic-ok']}
					</Button>
				</Dialog.Actions>
			</Dialog>
		</Portal>
	);
}