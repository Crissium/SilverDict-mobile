import React from 'react';
import { FlatList } from 'react-native';
import { List, Modal, Portal, useTheme } from 'react-native-paper';
import RNPickerSelect from 'react-native-picker-select';
import { useAppContext } from '../../AppContext';
import { useQueryContext } from './QueryContext';

function DictionaryItem(props) {
	const { name, displayName, setVisible, jumpToDictionaryRef } = props;

	return (
		<List.Item
			title={displayName}
			onPress={(e) => {
				if (jumpToDictionaryRef.current) {
					jumpToDictionaryRef.current(name);
					setVisible(false);
				}
			}}
		/>
	);
}

export default function DictionarySelection(props) {
	const theme = useTheme();
	const { dictionaries, groups, groupings } = useAppContext();
	const { nameActiveGroup, setNameActiveGroup, namesActiveDictionaries, jumpToDictionaryRef } = useQueryContext();
	const { visible, setVisible } = props;

	return (
		<Portal>
			<Modal
				visible={visible}
				onDismiss={() => setVisible(false)}
				style={{ backgroundColor: theme.colors.background }}
			>
				{groupings && groupings[nameActiveGroup] && namesActiveDictionaries && (
					<>
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
							onValueChange={(value) => {
								setNameActiveGroup(value);
								setVisible(false);
							}}
							value={nameActiveGroup}
						/>
						<FlatList
							data={dictionaries.filter((dictionary) => groupings[nameActiveGroup].includes(dictionary.name) && namesActiveDictionaries.includes(dictionary.name))}
							renderItem={({ item }) =>
								<DictionaryItem
									name={item.name}
									displayName={item.displayName}
									setVisible={setVisible}
									jumpToDictionaryRef={jumpToDictionaryRef} />}
							keyExtractor={(item) => item.name}
						/>
					</>
				)}
			</Modal>
		</Portal>
	)
}
