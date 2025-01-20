import typescript from '@rollup/plugin-typescript'

const typescriptOptions = {
  outputToFilesystem: false,
  outDir: 'dist',
}

export default [
  {
    external: ['react'],
    input: 'src/index.tsx',
    output: {
      file: 'dist/index.js',
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
      file: 'dist/index.cjs',
      format: 'cjs',
    },
    treeshake: {
      annotations: true,
    },
    plugins: [typescript(typescriptOptions)],
  },
]
