import vue from 'rollup-plugin-vue'
import commonjs from 'rollup-plugin-commonjs'
import minify from 'rollup-plugin-babel-minify'

export default {
  input: 'src/index.js',
  output: [
    {
      format: 'iife',
      name: 'reactor',
      file: 'dist/vue-reactor.min.js'
    },
    {
      format: 'umd',
      name: 'reactor',
      file: 'dist/vue-reactor.umd.js'
    },
    {
      format: 'esm',
      name: 'reactor',
      file: 'dist/vue-reactor.esm.js'
    }
  ],
  plugins: [
    commonjs(),
    vue(),
    minify()
  ]
}
