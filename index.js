import 'react-native-gesture-handler';
import { AppRegistry, useColorScheme } from 'react-native';
import { PaperProvider, MD2LightTheme, MD2DarkTheme } from 'react-native-paper';
import { name as appName } from './app.json';
import App from './src/App';

const lightTheme = {
	...MD2LightTheme,
	colors: {
		...MD2LightTheme.colors,
		primary: 'grey',
		accent: '#483d8b',
		background: '#ffffff',
		surface: '#eaeaea',
		error: '#ffb6c1',
		onSurface: '#1d1d1d',
	}
};

const darkTheme = {
	...MD2DarkTheme,
	colors: {
		...MD2DarkTheme.colors,
		primary: 'slategrey',
		accent: '#008080',
		background: '#000000',
		surface: '#111111',
		error: '#ffb6c1',
		onSurface: '#cccccc',
	}
};

function Main() {
	const isDarkMode = useColorScheme() === 'dark';
	const theme = isDarkMode ? darkTheme : lightTheme;

	return (
		<PaperProvider theme={theme}>
			<App />
		</PaperProvider>
	);
}

AppRegistry.registerComponent(appName, () => Main);
