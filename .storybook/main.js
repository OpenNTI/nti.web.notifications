const WebpackConfig = require('@nti/cmp-scripts/config/webpack.config.js');

module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
	"../src/**/*.stories.js(x)",
	"../src/components/*.stories.jsx"
  ],
  "addons": [
    "@storybook/addon-links",
	"@storybook/addon-essentials",
	"@storybook/addon-controls"
  ],

 webpackFinal: (config) => ({
		...config,
		resolve: {
			...config.resolve,
			alias: {
				...config.resolve.alias,
				...WebpackConfig.resolve.alias
			}
		},
		module: {
			...config.module,
			rules: WebpackConfig.module.rules
		}
  })
};
