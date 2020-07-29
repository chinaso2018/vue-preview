const resolve = require('rollup-plugin-node-resolve');
const babel = require('rollup-plugin-babel')
const uglify = require('rollup-plugin-uglify')
const min = process.env.BUILD === 'production-min'

module.exports = {
  input: 'src/main.js',
  output: {
    file: `dist/index${min ? '.min' : ''}.js`,
    format: 'umd',
    name: 'picturesPreview'
  },
  plugins: [
    resolve(),
    babel({
        exclude: 'node_modules/**'
    }),
    min && uglify.uglify()
  ]
};