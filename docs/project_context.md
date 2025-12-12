---
project_name: 'bmad-pokedex'
user_name: 'patta'
date: '2025-12-12'
sections_completed: ['technology_stack', 'implementation_rules']
status: 'complete'
---

# Project Context for AI Agents

_Critical rules and patterns for implementing bmad-pokedex. Read before writing any code._

---

## Technology Stack & Versions

| Technology | Version | Notes |
|------------|---------|-------|
| Node.js | 20+ | LTS required |
| Vite | 6.x | Build tool |
| React | 19 | With strict mode |
| TypeScript | 5.x | Strict mode enabled |
| Tailwind CSS | v4 | With @tailwindcss/vite |
| shadcn/ui | latest | Uses Radix primitives |
| React Router | latest | Client-side only |
| Vitest | latest | With jsdom |
| React Testing Library | latest | With jest-dom |

---

## Critical Implementation Rules

### TypeScript Rules
- Strict mode is ON - no `any` types without explicit justification
- Use `interface` for object shapes, `type` for unions/intersections
- All function parameters and return types must be typed
- Import types with `import type { }` when only importing types

### React/Component Rules
- Use function components only (no class components)
- Custom hooks must start with `use` prefix
- Context providers go in `src/features/game/`
- Co-locate component props with the component file OR in feature's `types.ts`
- Use `cn()` utility from `lib/utils.ts` for conditional Tailwind classes

### State Management Rules
- Use `useReducer` for complex state, `useState` for simple state
- Action types: SCREAMING_SNAKE_CASE constants (e.g., `SET_SELECTED_CELL`)
- Never mutate state directly - always return new objects
- Persist to localStorage via `lib/storage.ts` abstraction only

### Testing Rules
- Tests co-located: `Component.test.tsx` next to `Component.tsx`
- Use React Testing Library - query by role/label, not test IDs
- ValidationEngine requires 100% test coverage
- Use `src/test/testUtils.tsx` for custom render with providers

### Naming Conventions
- Files: PascalCase for components (`Grid.tsx`), camelCase for utils (`validation.ts`)
- Functions: camelCase (`getPokemonById`)
- Constants: SCREAMING_SNAKE (`MAX_GRID_SIZE`)
- Types/Interfaces: PascalCase (`Pokemon`, `GridProps`)
- JSON fields: camelCase (`evolutionStage`, not `evolution_stage`)

### shadcn/ui Rules
- Add components via `npx shadcn@latest add <component>`
- Components live in `src/components/ui/`
- Never modify generated shadcn components directly - extend instead
- Use Tailwind classes, not inline styles

### Critical Don'ts
- DON'T use `any` type - use `unknown` and narrow
- DON'T put domain types in component folders - use `src/types/`
- DON'T skip error boundaries for feature components
- DON'T use index.ts for anything except re-exports
- DON'T make network calls for Pokemon data - it's bundled JSON
- DON'T bundle sprites - use CDN URL from constants

---

## Project Structure Reference

```
src/
├── components/ui/      # shadcn/ui only
├── features/           # Domain logic by feature
│   ├── grid/
│   ├── pokemon/
│   ├── levels/
│   ├── validation/
│   └── game/           # State providers
├── data/               # Bundled JSON
├── types/              # Shared domain types
├── lib/                # Utilities
└── test/               # Test utilities
```

---

**Architecture Document:** `docs/architecture.md`
