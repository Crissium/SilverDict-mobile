import React, { useRef, useEffect, useState } from 'react';
import { View } from 'react-native';
import AutoHeightWebView from 'react-native-autoheight-webview';
import { Button, Dialog, Portal, Text, useTheme } from 'react-native-paper';
import { useAppContext } from '../../AppContext';
import { localisedStrings } from '../../translations/l10n';
import { ADDITIONAL_GOOGLE_FONTS } from '../../config';

function ConfirmSearchDialogue(props) {
	const { visible, wordSelected, setWordSelected, setQuery, search } = props;

	return (
		<Portal>
			<Dialog
				visible={visible}
				onDismiss={() => setWordSelected('')}>
				<Dialog.Content>
					<Text>{localisedStrings.formatString(localisedStrings['article-view-tap-to-search-dialogue-message'], wordSelected)}</Text>
				</Dialog.Content>
				<Dialog.Actions>
					<Button onPress={() => {
						setWordSelected('');
					}}>
						{localisedStrings['generic-no']}
					</Button>
					<Button onPress={() => {
						setQuery(wordSelected);
						setWordSelected('');
					}}>
						{localisedStrings['generic-edit']}
					</Button>
					<Button onPress={() => {
						search(wordSelected);
						setWordSelected('');
					}}>
						{localisedStrings['generic-yes']}
					</Button>
				</Dialog.Actions>
			</Dialog>
		</Portal>
	);
}

const clickListenersScript = `
window.scrollTo(0, 0);
let wordToFind = '';
document.addEventListener('click', function (event) {
	if (event.target.matches('a')) {
		const href = event.target.getAttribute('href');
		event.preventDefault();
		if (href && href.startsWith('/api/query')) {
			const query = href.split('/').pop().split('#')[0];
			window.ReactNativeWebView.postMessage('!!S!!' + query);
		}
	}
});

const articleElement = document.querySelector('.article-container');
articleElement.addEventListener('click', function (event) {
	let targetElement = event.target;
	while (targetElement !== articleElement) {
		if (typeof targetElement.onclick === 'function' || targetElement.tagName === 'A') {
			// The element has an onClick listener, so do not capture it.
			return;
		}
		targetElement = targetElement.parentNode;
	}

	const selection = window.getSelection();
	let range = selection.getRangeAt(0);
	const node = selection.anchorNode;
	const wordPattern = ${/^\p{L}*$/u};

		// Extend the range backward until it matches word beginning
	while ((range.startOffset > 0) && range.toString().match(wordPattern)) {
		range.setStart(node, (range.startOffset - 1));
	}
	// Restore the valid word match after overshooting
	if (!range.toString().match(wordPattern)) {
		range.setStart(node, range.startOffset + 1);
	}

	// Extend the range forward until it matches word ending
	while ((range.endOffset < node.length) && range.toString().match(wordPattern)) {
		range.setEnd(node, range.endOffset + 1);
	}
	// Restore the valid word match after overshooting
	if (!range.toString().match(wordPattern)) {
		range.setEnd(node, range.endOffset - 1);
	}

	const word = range.toString();
	window.ReactNativeWebView.postMessage(word);
});`

export default function ArticleView(props) {
	const { serverAddress, article, textZoom, nameDictionaryToJumpTo, search, setQuery, findInPageRef } = props;
	const { fontFamily, darkTextColour, scriptsWithAdditionalFonts } = useAppContext();
	const webref = useRef(null);
	const [wordSelected, setWordSelected] = useState('');

	const namesScripts = Object.entries(scriptsWithAdditionalFonts)
		.filter(([key, value]) => value)
		.map((ar) => ar[0]);
	let namesAdditionalFonts = Object.entries(ADDITIONAL_GOOGLE_FONTS[fontFamily])
		.filter(([script, fontName]) => namesScripts.includes(script))
		.map((ar) => ar[1]);
	namesAdditionalFonts = [...new Set(namesAdditionalFonts)];
	const articleHtml = `
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	${namesAdditionalFonts.length > 0 ? `
	<link
		rel="stylesheet"
		href="https://fonts.googleapis.com/css?family=${namesAdditionalFonts.map((name) => name.replaceAll(' ', '+')).join('|')}">` : ''}
</head>
<body>
	<div class="article-container">
		${article}
	</div>
</body>
</html>
`

	const darkTextColourStylesheet = `
/* lighten dark colors */
[style*="color: blue;"]           { color: #8882FF !important; }
[style*="color: mediumblue;"]     { color: #8882FF !important; }
[style*="color: darkblue;"]       { color: #8882FF !important; }
[style*="color: darkslateblue;"]  { color: #8882FF !important; }
[style*="color: midnightblue;"]   { color: #8882FF !important; }
[style*="color: navy;"]           { color: #8882FF !important; }
[style*="color: darkmagenta;"]    { color: #FF22FF !important; }
[style*="color: purple;"]         { color: #FF22FF !important; }
[style*="color: indigo;"]         { color: #B959FF !important; }
[style*="color: darkred;"]        { color: #D20000 !important; }
[style*="color: maroon;"]         { color: #D20000 !important; }
[style*="color: darkslategray;"]  { color: #768390 !important; }
[style*="color: dimgray;"]        { color: #A7A7A7 !important; }
[style*="color: green;"]          { color: #32CD32 !important; }
[style*="color: darkgreen;"]      { color: #32CD32 !important; }
[style*="color: forestgreen;"]    { color: #32CD32 !important; }
[style*="color: seagreen;"]       { color: #00FF7F !important; }
[style*="color: mediumseagreen;"] { color: #00FF7F !important; }
[style*="color: olive;"]          { color: #F0E68C !important; }
[style*="color: darkolivegreen;"] { color: #ADFF2F !important; }
[style*="color: olivedrab;"]      { color: #ADFF2F !important; }
[style*="color: grey;"]           { color: #887C66 !important; }

body {
	color: ${darkTextColour} !important;
}

a {
	color: #379bff;
}

::selection {
	background: #0080ff;
	color: #ffffff;
}
`

	useEffect(function () {
		if (nameDictionaryToJumpTo.length > 0) {
			webref.current.injectJavaScript(`
				document.getElementById('${nameDictionaryToJumpTo}').scrollIntoView();
			`);
		}
	}, [nameDictionaryToJumpTo]);

	return (
		<View style={{ flex: 1 }}>
			<AutoHeightWebView
				textZoom={textZoom}
				style={{ flex: 1 }}
				containerStyle={{ flex: 1 }}
				viewportContent={'width=device-width, user-scalable=no'}
				customStyle={`
* {
	font-family: ${namesAdditionalFonts.map((name) => `'${name}'`).join(', ')}${namesAdditionalFonts.length > 0 ? ', ' : ''} ${fontFamily};
}

.article-block {
	border-top: 1px solid #ccc;
	border-bottom: 1px solid #ccc;
	margin-top: 10px;
	margin-bottom: 10px;
}

img {
	max-width: 100%;
}

hr {
	border: none;
	border-top: 0.5px solid #ccc;
	width: 98%;
}

.dictionary-headings {
	padding-top: 5px;
	padding-bottom: 5px;
	color: darkgreen;
	font-weight: bolder;
}

audio {
	all: unset;
	width: 100px;
	height: 0.8rem;
}

audio::-webkit-media-controls-timeline {
	display: none;
}

${useTheme().dark ? darkTextColourStylesheet : ''}
    		`}
				source={{ html: articleHtml, baseUrl: serverAddress }}
				ref={webref}
				onLoadEnd={() => {
					webref.current.injectJavaScript(clickListenersScript);
					webref.current.requestFocus();
					findInPageRef.current = function (wordToFind, isBackwards) {
						webref.current.injectJavaScript(`
							wordToFind = '${wordToFind}';
							window.find(wordToFind, false, ${isBackwards}, true, false, false);
						`);
					}
				}}
				onMessage={(event) => {
					const message = event.nativeEvent.data;
					if (message.startsWith('!!S!!')) {
						const query = message.substring(5);
						search(query);
					} else {
						setWordSelected(message);
					}
				}}
			/>
			<ConfirmSearchDialogue
				visible={wordSelected.length > 0}
				wordSelected={wordSelected}
				setWordSelected={setWordSelected}
				setQuery={setQuery}
				search={search}
			/>
		</View>
	);
}