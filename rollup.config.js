import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import postcss from 'rollup-plugin-postcss'
import typescript from '@rollup/plugin-typescript'
import css from 'rollup-plugin-import-css'
import copy from 'rollup-plugin-copy'
import external from 'rollup-plugin-peer-deps-external'
import dts from 'rollup-plugin-dts'


const packageJson = require('./package.json')

export default [
    {
        input: 'src/index.tsx',
        output: [
            {
                file: packageJson.main,
                format: 'cjs',
                sourcemap: true
            },
            {
                file: packageJson.module,
                format: 'esm',
                sourcemap: true
            }
        ],
        plugins: [
            external(),
            copy({
                targets: [
                    { src: 'src/*.css', dest: 'dist/esm/' },
                    { src: 'src/*.css', dest: 'dist/cjs/' },
                ]
            }),
            postcss({
                config: {
                    path: './postcss.config.js'
                },
            }),
            resolve(),
            commonjs(),
            typescript({ tsconfig: './tsconfig.json' },
            )
        ]
    },
    {
        input: 'dist/esm/index.d.ts',
        output: [{ file: 'dist/index.d.ts', format: 'esm' }],
        plugins: [css(), dts()]
    }
]
