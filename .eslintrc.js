module.exports = {
  env: {
    browser: true,
    es6: true
  },
  root: true,
  extends: [
    'airbnb',
    'react-app',
    'prettier',
    'prettier/react',
    'plugin:jsx-a11y/recommended',
    'plugin:react-redux/recommended'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  plugins: ['react', 'prettier', 'jsx-a11y', 'react-redux'],
  rules: {
    'prettier/prettier': ['error', { singleQuote: true, trailingComma: 'all' }],
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/state-in-constructor': [0, 'always'],
    'react/jsx-props-no-spreading': 'off',
    'react/destructuring-assignment': [
      1,
      'always',
      { ignoreClassFields: true }
    ],
    'react/prop-types': [0]
  },
  settings: {
    'import/resolver': {
      node: {
        moduleDirectory: ['node_modules', 'src/']
      }
    }
  }
};
// 'react/prop-types': [0]
