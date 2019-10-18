import vue from "rollup-plugin-vue"
import commonjs from "rollup-plugin-commonjs"
import minify from "rollup-plugin-babel-minify"

export default {
  input: "src/index.js",
  output: [
    {
      format: "iife",
      name: "manifest",
      file: "dist/vue-manifest.min.js"
    },
    {
      format: "umd",
      name: "manifest",
      file: "dist/vue-manifest.umd.js"
    },
    {
      format: "esm",
      name: "manifest",
      file: "dist/vue-manifest.esm.js"
    }
  ],
  plugins: [commonjs(), vue(), minify()]
}
