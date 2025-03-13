import typescript from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts';

export default [
	{
		input: 'src/index.ts',
		output: [
			{
				file: 'lib/index.js',
				format: 'cjs',
			},
			{
				file: 'lib/index.mjs',
				format: 'es',
			},
		],
		plugins: [
			typescript({
				outDir: './lib/',
			}),
		],
	},
	{
		input: 'lib/index.d.ts',
		output: [
			{
				file: 'lib/index.d.ts',
				format: 'es',
			},
		],
		plugins: [dts()],
	},
];
