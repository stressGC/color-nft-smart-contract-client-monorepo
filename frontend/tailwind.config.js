const plugin = require("tailwindcss/plugin")

module.exports = {
	content: ["**/*.{html,ts,tsx}"],
	plugins: [
		require("@tailwindcss/forms"),
		plugin(function ({ addVariant, e }) {
			/**
			 * This custom plugin adds an utility class which lets us apply a class on each child of an element.
			 * For instance, this allows us to use the class "children:stroke-red-500" which will apply the "stroke-red-500" class on each child element.
			 */
			addVariant("children", ({ modifySelectors, separator }) => {
				modifySelectors(({ className }) => {
					const newClass = e(`children${separator}${className}`)
					return `.${newClass} *`
				})
			})
		}),
	],
}
