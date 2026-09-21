import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import react from 'eslint-plugin-react'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import jsdoc from 'eslint-plugin-jsdoc'
import promise from 'eslint-plugin-promise'

/** Files that are exempt from the JSDoc documentation requirements. */
const TEST_FILES = [
  '**/tests/**',
  '**/__tests__/**',
  '**/*.test.{js,jsx,ts,tsx}',
  '**/*.spec.{js,jsx,ts,tsx}'
]

const commonRules = {
  ...js.configs.recommended.rules,
  ...react.configs.recommended.rules,
  ...reactHooks.configs.recommended.rules,
  ...jsxA11y.flatConfigs.recommended.rules,
  'react/react-in-jsx-scope': 'off',
  'react/prop-types': 'off',
  'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
  'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
  'jsx-a11y/no-static-element-interactions': 'off',
  'jsx-a11y/click-events-have-key-events': 'off'
}

const promiseRules = {
  'promise/catch-or-return': 'error',
  'promise/no-return-wrap': 'error',
  'promise/param-names': 'error',
  'promise/always-return': 'warn',
  'promise/no-nesting': 'warn',
  'promise/no-promise-in-callback': 'warn',
  'promise/valid-params': 'warn'
}

/**
 * Every function must carry a JSDoc block with a real description.
 * Shared by JS and TS; only the `@param`/`@returns` expectations differ.
 */
const jsdocDescriptionRules = {
  'jsdoc/require-jsdoc': [
    'error',
    {
      require: {
        FunctionDeclaration: true,
        ClassDeclaration: true,
        ClassExpression: true,
        MethodDefinition: true
      },
      // Only named function/arrow expressions, so inline callbacks stay undocumented.
      contexts: [
        'VariableDeclarator > ArrowFunctionExpression',
        'VariableDeclarator > FunctionExpression'
      ],
      enableFixer: false
    }
  ],
  'jsdoc/require-description': ['error', { checkConstructors: false }],
  'jsdoc/check-alignment': 'warn',
  'jsdoc/check-tag-names': 'warn',
  'jsdoc/no-undefined-types': 'off'
}

/** JS keeps the full `@param` contract, since there are no static types to lean on. */
const jsdocJsRules = {
  ...jsdocDescriptionRules,
  'jsdoc/require-param': 'error',
  'jsdoc/require-param-description': 'error',
  'jsdoc/require-param-type': 'error',
  'jsdoc/check-param-names': 'error'
}

/** TS carries its own types, so `@param`/`@returns` are redundant — description only. */
const jsdocTsRules = {
  ...jsdocDescriptionRules,
  'jsdoc/require-param': 'off',
  'jsdoc/require-param-description': 'off',
  'jsdoc/require-param-type': 'off',
  'jsdoc/require-returns': 'off',
  'jsdoc/require-returns-type': 'off',
  'jsdoc/require-returns-description': 'off',
  // If a param *is* documented the name must still match, but types belong in the signature.
  'jsdoc/check-param-names': ['error', { checkDestructured: false }],
  'jsdoc/no-types': 'warn'
}

const restrictedImports = [
  'error',
  {
    paths: [
      {
        name: 'react',
        importNames: ['default'],
        message: 'Default React import is forbidden.'
      }
    ]
  }
]

const sharedPlugins = {
  jsdoc,
  'jsx-a11y': jsxA11y,
  promise,
  react,
  'react-hooks': reactHooks,
  'react-refresh': reactRefresh
}

const sharedSettings = {
  react: { version: 'detect' }
}

export default tseslint.config(
  { ignores: ['dist/**', 'coverage/**', 'node_modules/**'] },

  // JavaScript / JSX
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module'
      }
    },
    plugins: sharedPlugins,
    settings: sharedSettings,
    rules: {
      ...commonRules,
      ...promiseRules,
      ...jsdocJsRules,
      'no-restricted-imports': restrictedImports
    }
  },

  // TypeScript / TSX
  {
    files: ['**/*.{ts,tsx}'],
    extends: [...tseslint.configs.recommended],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module'
      }
    },
    plugins: sharedPlugins,
    settings: {
      ...sharedSettings,
      jsdoc: { mode: 'typescript' }
    },
    rules: {
      ...commonRules,
      ...promiseRules,
      ...jsdocTsRules,
      'no-restricted-imports': 'off',
      '@typescript-eslint/no-restricted-imports': restrictedImports,
      // TypeScript resolves globals and unused symbols itself.
      'no-undef': 'off',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }]
    }
  },

  // Tests: no documentation requirements, plus Jest globals.
  {
    files: TEST_FILES,
    languageOptions: {
      globals: { ...globals.jest, ...globals.node }
    },
    rules: {
      'jsdoc/require-jsdoc': 'off',
      'jsdoc/require-description': 'off',
      'jsdoc/require-param': 'off',
      'jsdoc/require-param-description': 'off',
      'jsdoc/require-param-type': 'off',
      'jsdoc/check-param-names': 'off',
      'jsdoc/no-types': 'off'
    }
  },

  // Config files run in Node.
  {
    files: ['*.config.{js,ts}'],
    languageOptions: {
      globals: globals.node
    },
    rules: {
      'jsdoc/require-jsdoc': 'off'
    }
  }
)
