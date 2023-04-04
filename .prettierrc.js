module.exports = {
	arrowParens: 'avoid',
	bracketSpacing: true,
	endOfLine: 'lf',
	htmlWhitespaceSensitivity: 'css',
	insertPragma: false,
	jsxBracketSameLine: false,
	jsxSingleQuote: true,
	printWidth: 120,
	proseWrap: 'preserve',
	quoteProps: 'as-needed',
	requirePragma: false,
	semi: true,
	singleQuote: true,
	tabWidth: 4,
	trailingComma: 'none',
	useTabs: true,
	vueIndentScriptAndStyle: true,
	trailingCommaPHP: false,
	braceStyle: '1tbs',
	xmlSelfClosingSpace: true,
	overrides: [
		{
			files: ['*.html', '*.xml', '*.hbs', '*.vue'],
			options: {
				printWidth: 1200
			}
		},
		{
			files: ['*.md', '*.mdx', 'markdown'],
			options: {
				printWidth: 120,
				proseWrap: 'never'
			}
		}
	]
};
