export const DEFAULT_SERVER_ADDRESS = 'http://localhost:2628';
export const DEFAULT_FONT_FAMILY = 'serif';
export const DEFAULT_DARK_TEXT_COLOUR = 'grey';
export const DEFAULT_TEXT_ZOOM = 100;
export const TEXT_ZOOM_MAX = 200;
export const TEXT_ZOOM_MIN = 40;
export const RTL_LANGS = ['ar', 'dv', 'fa', 'ha', 'he', 'ks', 'ku', 'ps', 'ug', 'ur', 'yi'];
export const ADDITIONAL_GOOGLE_FONTS = {
	'serif': {
		'Arabic': 'Noto Naskh Arabic',
		'Bengali': 'Noto Serif Bengali',
		'Chinese Simplified': 'Noto Serif SC',
		'Chinese Traditional': 'Noto Serif TC',
		'Cyrillic': 'Noto Serif',
		'Devanagari': 'Noto Serif Devanagari',
		'Greek': 'Noto Serif',
		'Gujarati': 'Noto Serif Gujarati',
		'Gurmukhi': 'Noto Serif Gurmukhi',
		'Hebrew': 'Noto Serif Hebrew',
		'Japanese': 'Noto Serif JP',
		'Kannada': 'Noto Serif Kannada',
		'Khmer': 'Noto Serif Khmer',
		'Korean': 'Noto Serif KR',
		'Latin': 'Noto Serif',
		'Malayalam': 'Noto Serif Malayalam',
		'Myanmar': 'Noto Serif Myanmar',
		'Oriya': 'Noto Serif Oriya',
		'Sinhala': 'Noto Serif Sinhala',
		'Tamil': 'Noto Serif Tamil',
		'Telugu': 'Noto Serif Telugu',
		'Thai': 'Noto Serif Thai',
		'Tibetan': 'Noto Serif Tibetan',
		'Vietnamese': 'Noto Serif'
	},
	'sans-serif': {
		'Arabic': 'Noto Sans Arabic',
		'Bengali': 'Noto Sans Bengali',
		'Chinese Simplified': 'Noto Sans SC',
		'Chinese Traditional': 'Noto Sans TC',
		'Cyrillic': 'Noto Sans',
		'Devanagari': 'Noto Sans',
		'Greek': 'Noto Sans',
		'Gujarati': 'Noto Sans Gujarati',
		'Gurmukhi': 'Noto Sans Gurmukhi',
		'Hebrew': 'Noto Sans Hebrew',
		'Japanese': 'Noto Sans JP',
		'Kannada': 'Noto Sans Kannada',
		'Khmer': 'Noto Sans Khmer',
		'Korean': 'Noto Sans KR',
		'Latin': 'Noto Sans',
		'Malayalam': 'Noto Sans Malayalam',
		'Myanmar': 'Noto Sans Myanmar',
		'Oriya': 'Noto Sans Oriya',
		'Sinhala': 'Noto Sans Sinhala',
		'Tamil': 'Noto Sans Tamil',
		'Telugu': 'Noto Sans Telugu',
		'Thai': 'Noto Sans Thai',
		'Tibetan': 'Noto Serif Tibetan', // Tibetan always uses serif font?
		'Vietnamese': 'Noto Sans'
	}
};
export const DEFAULT_ADDITIONAL_GOOGLE_FONTS_ENABLED_STATUS =
	Object.keys(ADDITIONAL_GOOGLE_FONTS.serif).reduce((status, script) => {
		status[script] = false;
		return status;
	}, {});