# JetBrains YouTrack Scripting API TypeScript Definitions

TypeScript definitions for the JetBrains YouTrack Scripting API.

## Installation

```bash
npm install --save-dev youtrack-workflow-api-types
```

## Usage

Add `paths` to your project's `tsconfig.json` with following content:

```json
{
  "compilerOptions": {
    "checkJs": true,
    "allowJs": true,
    "resolveJsonModule": true,
    "moduleResolution": "node",
    "target": "es2020",
    "module": "commonjs",
    "baseUrl": ".",
    "paths": {
      "@jetbrains/youtrack-scripting-api": ["node_modules/youtrack-workflow-api-types"],
      "@jetbrains/youtrack-scripting-api/*": ["node_modules/youtrack-workflow-api-types/*"]
    }
  },
  "include": [
    "**/*.js"
  ],
  "exclude": [
    "node_modules"
  ]
}
```
