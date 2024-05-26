
const babel = require('@rollup/plugin-babel').default;
const nodeResolve = require('@rollup/plugin-node-resolve').default;
const commonjs = require('@rollup/plugin-commonjs').default;
const css = require("rollup-plugin-import-css");
const replace = require('rollup-plugin-replace');
const terser = require('@rollup/plugin-terser');
const image = require('@rollup/plugin-image');

const builds = {
	input: [ 
			 'src/index.js', 
			 'src/web_player.js'		
	 ],
	output: [{
		dir: 'dist',
		format: 'cjs'
	},
	{
	    dir: 'dist/es',
		format: 'es'
	}
	],
	plugins: [
		babel({ babelHelpers: 'bundled' }), 
		nodeResolve(),
		commonjs(),
		css(),
		image({
			dom:true
		}),
		replace({
			ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
		  }),
		process.env.NODE_ENV === 'production' && terser(),
		/*terser({
			compress: {
				unused: true
			}
		})
		*/
	]

};

module.exports = builds