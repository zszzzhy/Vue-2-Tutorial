module.exports = {
	root: true,
	globals: {
		Atomics: "readonly",
		SharedArrayBuffer: "readonly"
	},
	parserOptions: {
		parser: "babel-eslint",
		ecmaVersion: 10,
		sourceType: "module"
	},
	env: {
		browser: true,
		es6: true,
		node: true
	},
	plugins: ["prettier"],
	rules: {
		"prettier/prettier": "error",
		"no-console": process.env.NODE_ENV === "production" ? "error" : "off",
		"no-debugger": process.env.NODE_ENV === "production" ? "error" : "off"
	}
};
