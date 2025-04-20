# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build Commands
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run format` - Format with Prettier
- `npm run format:check` - Check formatting

## Code Style Guidelines
- **TypeScript**: Follow strict type-checking (see tsconfig.json)
- **Imports**: Use absolute imports with `@/*` alias for src directory
- **Formatting**: 
  - 2 space indentation
  - 80 characters line limit
  - Double quotes for strings
  - ES5 trailing commas
- **Naming**: Use camelCase for variables/functions, PascalCase for components/classes
- **Error Handling**: No console.log (ESLint error) - handle errors appropriately
- **Components**: Astro components should follow the project's component structure
- **Commits**: Follow conventional commits format (commitizen friendly)