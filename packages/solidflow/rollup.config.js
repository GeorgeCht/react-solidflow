import typescript from '@rollup/plugin-typescript'

import { minify } from 'rollup-plugin-esbuild-minify'

const typescriptOptions = {
  outputToFilesystem: false,
  outDir: 'dist',
}

export default [
  {
    external: ['react'],
    input: 'src/index.tsx',
    output: {
      file: './dist/index.js',
      format: 'esm',
    },
    treeshake: {
      annotations: true,
    },
    plugins: [typescript(typescriptOptions)],
  },
  {
    external: ['react'],
    input: 'src/index.tsx',
    output: {
      file: './dist/index.cjs',
      format: 'cjs',
    },
    treeshake: {
      annotations: true,
    },
    plugins: [typescript(typescriptOptions)],
  },
  {
    external: ['react'],
    input: 'src/index.tsx',
    output: {
      name: 'index',
      file: './dist/index.min.js',
      format: 'iife',
      sourcemap: true,
      globals: {
        react: 'React',
      },
    },
    plugins: [
      typescript(typescriptOptions),
      minify({ logLevel: 'debug', logLimit: 100 }),
    ],
  },
]
