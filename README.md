# JetBrains YouTrack Scripting API TypeScript Definitions

TypeScript definitions for the JetBrains YouTrack Scripting API.

## Installation

```bash
npm install --save-dev youtrack-workflow-api-types
```

## Usage

Add `types/@jetbrains/youtrack-scripting-api/index.d.ts` to your project with following content:

```typescript
/**
 * Type reference file for YouTrack Workflow API
 */

declare module '@jetbrains/youtrack-scripting-api' {
  export * from 'youtrack-workflow-api-types/src';
}

declare module '@jetbrains/youtrack-scripting-api/entities' {
  export * from 'youtrack-workflow-api-types/src/entities';
}

declare module '@jetbrains/youtrack-scripting-api/workflow' {
  export * from 'youtrack-workflow-api-types/src/workflow';
}

declare module '@jetbrains/youtrack-scripting-api/http' {
  export * from 'youtrack-workflow-api-types/src/http';
}

declare module '@jetbrains/youtrack-scripting-api/search' {
  export * from 'youtrack-workflow-api-types/src/search';
}

declare module '@jetbrains/youtrack-scripting-api/date-time' {
  export * from 'youtrack-workflow-api-types/src/date-time';
}

declare module '@jetbrains/youtrack-scripting-api/notifications' {
  export * from 'youtrack-workflow-api-types/src/notifications';
}

declare module '@jetbrains/youtrack-scripting-api/strings' {
  export * from 'youtrack-workflow-api-types/src/strings';
}

