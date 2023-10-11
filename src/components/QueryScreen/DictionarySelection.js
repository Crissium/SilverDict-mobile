import React from "react";
import { FlatList } from "react-native";
import { List, Modal, Portal, useTheme } from "react-native-paper";
import RNPickerSelect from 'react-native-picker-select';

function DictionaryItem(props) {
	const { name, displayName, setNameDictionaryToJumpTo, setVisible } = props;

	return (
		<List.Item
			title={displayName}
			onPress={(e) => {
				setNameDictionaryToJumpTo(name);
				setVisible(false);
			}}
		/>
	);
}

export default function DictionarySelection(props) {
	const theme = useTheme();
	const { visible, setVisible, dictionaries, groups, groupings, nameActiveGroup, setNameActiveGroup, namesActiveDictionaries, setNameDictionaryToJumpTo } = props;

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
									setNameDictionaryToJumpTo={setNameDictionaryToJumpTo}
									setVisible={setVisible} />}
							keyExtractor={(item) => item.name}
						/>
					</>
				)}
			</Modal>
		</Portal>
	)
}