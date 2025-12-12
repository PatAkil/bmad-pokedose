# Story 1.1: Initialize Project with Development Environment

Status: done

## Story

As a **developer**,
I want **a fully configured project with Vite, React, TypeScript, Tailwind CSS, and shadcn/ui**,
so that **I have a consistent, modern development environment ready for building the game**.

## Acceptance Criteria

1. **Given** I have Node.js 20+ installed, **When** I run the project initialization commands from architecture.md, **Then** a new project is created with Vite + React 19 + TypeScript 5.x
2. **And** Tailwind CSS v4 is configured and working
3. **And** shadcn/ui is initialized with at least one component (Button)
4. **And** React Router is installed for client-side routing
5. **And** Vitest and React Testing Library are configured for testing
6. **And** the dev server starts without errors (`npm run dev`)
7. **And** the project structure matches the architecture specification:
   - `src/features/` - domain logic by feature
   - `src/components/ui/` - shadcn/ui components
   - `src/types/` - shared domain types
   - `src/lib/` - utilities
   - `src/data/` - bundled JSON data files
   - `src/test/` - test utilities
   - `src/routes/` - route definitions

## Tasks / Subtasks

- [x] **Task 1: Create Vite Project** (AC: #1)
  - [x] Run `npm create vite@latest bmad-pokedex -- --template react-ts`
  - [x] Navigate to project directory
  - [x] Run `npm install` to install base dependencies
  - [x] Verify project runs with `npm run dev`

- [x] **Task 2: Install and Configure Tailwind CSS v4** (AC: #2)
  - [x] Run `npm install tailwindcss @tailwindcss/vite`
  - [x] Update `vite.config.ts` to include Tailwind plugin
  - [x] Create/update `src/index.css` with Tailwind imports
  - [x] Verify Tailwind classes work in App.tsx

- [x] **Task 3: Initialize shadcn/ui** (AC: #3)
  - [x] Run `npx shadcn@latest init`
  - [x] Select default options or customize per project needs
  - [x] Run `npx shadcn@latest add button` to add Button component
  - [x] Verify Button component renders correctly

- [x] **Task 4: Install React Router** (AC: #4)
  - [x] Run `npm install react-router`
  - [x] Create `src/routes/index.tsx` with basic route setup
  - [x] Configure BrowserRouter in `App.tsx`
  - [x] Create placeholder `Home.tsx` and `Game.tsx` route components

- [x] **Task 5: Configure Testing** (AC: #5)
  - [x] Run `npm install -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom`
  - [x] Create `vitest.config.ts` or add to `vite.config.ts`
  - [x] Create `src/test/setup.ts` with RTL/jest-dom setup
  - [x] Create `src/test/testUtils.tsx` with custom render function
  - [x] Add test scripts to `package.json`
  - [x] Write and run a simple smoke test to verify setup

- [x] **Task 6: Create Project Structure** (AC: #7)
  - [x] Create `src/features/grid/` directory with `index.ts`
  - [x] Create `src/features/pokemon/` directory with `index.ts`
  - [x] Create `src/features/levels/` directory with `index.ts`
  - [x] Create `src/features/validation/` directory with `index.ts`
  - [x] Create `src/features/game/` directory with `index.ts`
  - [x] Create `src/types/` directory with `index.ts`
  - [x] Create `src/lib/` directory with `utils.ts` (cn function)
  - [x] Create `src/data/` directory (empty, for future JSON files)
  - [x] Create `src/routes/` directory with route files

- [x] **Task 7: Create Configuration Files** (AC: #1, #6)
  - [x] Create `.env.example` with VITE_SPRITE_CDN_URL placeholder
  - [x] Update `tsconfig.json` with path aliases if needed
  - [x] Create/verify `eslint.config.js` configuration (flat config format)
  - [x] Create `.prettierrc` for consistent formatting

- [x] **Task 8: Final Verification** (AC: #6)
  - [x] Run `npm run dev` - server starts without errors
  - [x] Run `npm run build` - builds successfully
  - [x] Run `npm run test` - tests pass
  - [x] Run `npm run lint` - no lint errors
  - [x] Verify all directories exist per architecture spec

## Dev Notes

### Architecture Compliance

This story implements the **exact** initialization sequence from `docs/architecture.md`:

```bash
# 1. Create Vite project
npm create vite@latest bmad-pokedex -- --template react-ts
cd bmad-pokedex
npm install

# 2. Install Tailwind CSS v4 (required for shadcn/ui)
npm install tailwindcss @tailwindcss/vite

# 3. Initialize shadcn/ui
npx shadcn@latest init

# 4. Add routing
npm install react-router

# 5. Add testing
npm install -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom
```

### Technology Versions (CRITICAL)

| Technology | Required Version | Notes |
|------------|------------------|-------|
| Node.js | 20+ | LTS required, verify with `node -v` |
| Vite | 6.x | Official react-ts template |
| React | 19 | Comes with Vite template |
| TypeScript | 5.x | Strict mode enabled |
| Tailwind CSS | v4 | Using @tailwindcss/vite plugin |
| shadcn/ui | latest | Uses Radix primitives |
| React Router | latest | Client-side routing only |
| Vitest | latest | With jsdom environment |

### Project Structure Reference

```
bmad-pokedex/
├── README.md
├── package.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
├── components.json              # shadcn/ui config
├── .env.example
├── .gitignore
├── eslint.config.js              # ESLint flat config
├── .prettierrc
│
├── public/
│   └── favicon.ico
│
├── src/
│   ├── main.tsx                 # App entry point
│   ├── App.tsx                  # Root component with providers
│   ├── index.css                # Tailwind imports
│   │
│   ├── routes/
│   │   ├── index.tsx            # Route definitions
│   │   ├── Home.tsx             # Landing/level select (placeholder)
│   │   └── Game.tsx             # Game screen (placeholder)
│   │
│   ├── components/
│   │   └── ui/                  # shadcn/ui components
│   │       └── button.tsx       # First shadcn component
│   │
│   ├── features/
│   │   ├── grid/
│   │   │   └── index.ts
│   │   ├── pokemon/
│   │   │   └── index.ts
│   │   ├── levels/
│   │   │   └── index.ts
│   │   ├── validation/
│   │   │   └── index.ts
│   │   └── game/
│   │       └── index.ts
│   │
│   ├── data/                    # (empty, for future JSON)
│   │
│   ├── types/
│   │   └── index.ts
│   │
│   ├── lib/
│   │   └── utils.ts             # cn() utility
│   │
│   └── test/
│       ├── setup.ts             # Vitest setup
│       └── testUtils.tsx        # Custom render
```

### Implementation Patterns

**cn() Utility** (src/lib/utils.ts):
```typescript
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

**Test Setup** (src/test/setup.ts):
```typescript
import '@testing-library/jest-dom'
```

**Vitest Config** (vitest.config.ts or in vite.config.ts):
```typescript
/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
  },
})
```

### Critical Don'ts

- DON'T use Create React App - use Vite
- DON'T install Tailwind CSS v3 - must be v4 with @tailwindcss/vite
- DON'T skip shadcn/ui initialization - required for UI components
- DON'T create tests folder at root - use `src/test/`
- DON'T modify generated shadcn components - extend instead
- DON'T use `any` types - TypeScript strict mode is ON

### References

- [Source: docs/architecture.md#Starter-Template-Evaluation] - Exact init commands
- [Source: docs/architecture.md#Implementation-Patterns] - Naming conventions
- [Source: docs/architecture.md#Project-Structure] - Complete directory structure
- [Source: docs/project_context.md] - Technology versions and rules

## Dev Agent Record

### Context Reference

<!-- Story context created by create-story workflow -->
- docs/architecture.md (primary architecture reference)
- docs/prd.md (requirements reference)
- docs/project_context.md (implementation rules)
- docs/epics.md (story acceptance criteria)

### Agent Model Used

Claude Opus 4.5 (claude-opus-4-5-20251101)

### Debug Log References

- No debug issues encountered during implementation

### Completion Notes List

- Created Vite project with React 19 + TypeScript 5.x template (Vite v7.2.7)
- Installed and configured Tailwind CSS v4 using @tailwindcss/vite plugin
- Initialized shadcn/ui with default Neutral theme and added Button component
- Configured React Router with createBrowserRouter and placeholder routes (Home, Game)
- Set up Vitest with jsdom environment, React Testing Library, and jest-dom matchers
- Created all feature directories (grid, pokemon, levels, validation, game) with index.ts files
- Created types/, lib/, data/, test/, and routes/ directories per architecture spec
- Added path alias (@/*) in tsconfig.json and vite.config.ts for clean imports
- Created .env.example with VITE_SPRITE_CDN_URL placeholder
- Created .prettierrc for consistent formatting
- Updated ESLint config to handle test files and shadcn component warnings
- All acceptance criteria verified: dev server, build, tests (4 passing), lint all successful

### File List

**New files created:**
- package.json
- package-lock.json
- vite.config.ts
- tsconfig.json
- tsconfig.app.json
- tsconfig.node.json
- eslint.config.js
- components.json
- index.html
- .gitignore
- .env.example
- .prettierrc
- README.md
- src/main.tsx
- src/App.tsx
- src/index.css
- src/routes/index.tsx
- src/routes/Home.tsx
- src/routes/Home.test.tsx
- src/routes/Game.tsx
- src/routes/Game.test.tsx
- src/components/ui/button.tsx
- src/lib/utils.ts
- src/test/setup.ts
- src/test/testUtils.tsx
- src/features/grid/index.ts
- src/features/pokemon/index.ts
- src/features/levels/index.ts
- src/features/validation/index.ts
- src/features/game/index.ts
- src/types/index.ts
- src/data/.gitkeep
- public/vite.svg
- src/assets/react.svg

## Change Log

| Date | Change | Author |
|------|--------|--------|
| 2025-12-12 | Initial story implementation - Project initialized with all required tooling | Dev Agent (Claude Opus 4.5) |
| 2025-12-12 | Code Review: Added src/data/.gitkeep, Game.test.tsx, updated File List, fixed eslint config reference | Code Review (Claude Opus 4.5) |
