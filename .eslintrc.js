module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    /* 使用双引号 */
    "quotes": 0,
    /* 尾部加分号 */
    'semi': 0,
    /* 函数前面无需空格 */
    "space-before-function-paren": 0,
    /* 缩进0 */
    'indent': 0

  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
