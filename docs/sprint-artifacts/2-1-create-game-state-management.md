# Story 2.1: Create Game State Management

Status: ready-for-dev

## Story

As a **developer**,
I want **a centralized state management system for the puzzle grid**,
so that **all components can access and update game state consistently**.

## Acceptance Criteria

1. **Given** the project foundation exists (Epic 1), **When** I implement the game state management, **Then** a `GameContext` and `GameProvider` exist in `src/features/game/`
2. **And** `GameState` includes: grid (9 cells), selectedCell (row/col or null), usedPokemon (Set of IDs)
3. **And** a `gameReducer` handles actions: `SET_SELECTED_CELL`, `PLACE_POKEMON`, `CLEAR_CELL`, `RESET_GRID`
4. **And** action type constants use SCREAMING_SNAKE_CASE per architecture patterns
5. **And** a `useGame` hook provides access to state and dispatch
6. **And** unit tests exist for `gameReducer` covering all action types
7. **And** the provider wraps the app in `App.tsx`

## Tasks / Subtasks

- [ ] **Task 1: Create Game Types** (AC: #2)
  - [ ] Create `src/types/game.ts` with `GameState`, `GridCell`, `CellPosition` types
  - [ ] Define `GridCell` interface: { pokemon: Pokemon | null, row: number, col: number }
  - [ ] Define `CellPosition` interface: { row: number, col: number }
  - [ ] Define `GameState` interface: grid, selectedCell, usedPokemon, currentLevelId
  - [ ] Export types from `src/types/index.ts`

- [ ] **Task 2: Create Game Reducer** (AC: #3, #4)
  - [ ] Create `src/features/game/gameReducer.ts`
  - [ ] Define action type constants: `SET_SELECTED_CELL`, `PLACE_POKEMON`, `CLEAR_CELL`, `RESET_GRID`
  - [ ] Implement `gameReducer` function handling all actions
  - [ ] Create action creator functions for type safety
  - [ ] Implement `createInitialGrid()` helper for 3x3 grid initialization

- [ ] **Task 3: Create Game Context and Provider** (AC: #1, #5)
  - [ ] Create `src/features/game/GameContext.tsx`
  - [ ] Create `GameContext` for state access
  - [ ] Create `GameDispatchContext` for dispatch access
  - [ ] Create `GameProvider` component wrapping useReducer
  - [ ] Create `useGame` hook returning { state, dispatch }
  - [ ] Add error handling for hook usage outside provider

- [ ] **Task 4: Write Unit Tests** (AC: #6)
  - [ ] Create `src/features/game/gameReducer.test.ts`
  - [ ] Test `SET_SELECTED_CELL` action (select cell, deselect cell, change selection)
  - [ ] Test `PLACE_POKEMON` action (place in empty cell, verify usedPokemon update)
  - [ ] Test `CLEAR_CELL` action (remove Pokemon, verify usedPokemon update)
  - [ ] Test `RESET_GRID` action (clear all cells, reset selectedCell, clear usedPokemon)
  - [ ] Test initial state creation with `createInitialGrid()`
  - [ ] Test edge cases: invalid row/col, placing in occupied cell

- [ ] **Task 5: Export from Feature Index**
  - [ ] Update `src/features/game/index.ts` to export GameProvider, useGame
  - [ ] Verify exports work correctly

- [ ] **Task 6: Integrate with App** (AC: #7)
  - [ ] Update `src/App.tsx` to wrap app with `GameProvider`
  - [ ] Verify app still renders correctly

- [ ] **Task 7: Final Verification** (AC: All)
  - [ ] Run `npm run test` - all tests pass
  - [ ] Run `npm run lint` - no lint errors
  - [ ] Run `npm run build` - builds successfully

## Dev Notes

### Critical Architecture Compliance

**File Locations (MUST FOLLOW):**
- Types: `src/types/game.ts` (domain types belong in types/)
- Reducer: `src/features/game/gameReducer.ts`
- Context: `src/features/game/GameContext.tsx`
- Tests: `src/features/game/gameReducer.test.ts` (co-located)
- Exports: `src/features/game/index.ts`

**Naming Conventions (MANDATORY):**
- Action types: SCREAMING_SNAKE_CASE (`SET_SELECTED_CELL`, `PLACE_POKEMON`, `CLEAR_CELL`, `RESET_GRID`)
- Functions: camelCase (`createInitialGrid`, `gameReducer`, `useGame`)
- Interfaces: PascalCase (`GameState`, `GridCell`, `CellPosition`)
- Constants: SCREAMING_SNAKE_CASE (`GRID_SIZE`)

**DO NOT:**
- Use Redux or any external state library - React Context + useReducer only
- Use `any` type - TypeScript strict mode is ON
- Create separate action files - keep actions in reducer file
- Skip tests - 100% coverage on reducer required
- Put domain types in feature folder - they go in `src/types/`

### Architecture Reference

From `docs/architecture.md`:

```typescript
// State Management Pattern
// GameContext + gameReducer - grid state, selected cell, validation
// ProgressContext + progressReducer - completed levels, persisted to localStorage

// Context Pattern:
interface GameState { /* ... */ }
type GameAction = { type: string; payload?: unknown };
const GameContext = createContext<GameState | null>(null);
const GameDispatchContext = createContext<Dispatch<GameAction> | null>(null);
```

### Type Definitions Pattern

```typescript
// src/types/game.ts
import type { Pokemon } from './pokemon';

/** Grid size constant */
export const GRID_SIZE = 3;

/** Position in the grid */
export interface CellPosition {
  row: number;  // 0-2
  col: number;  // 0-2
}

/** Individual cell in the puzzle grid */
export interface GridCell {
  row: number;
  col: number;
  pokemon: Pokemon | null;
}

/** 3x3 grid of cells */
export type Grid = GridCell[][];

/** Complete game state */
export interface GameState {
  /** 3x3 grid of cells */
  grid: Grid;
  /** Currently selected cell position, null if none selected */
  selectedCell: CellPosition | null;
  /** Set of Pokemon IDs already placed in the grid */
  usedPokemon: Set<number>;
  /** Current level being played */
  currentLevelId: number | null;
}
```

### Reducer Pattern

```typescript
// src/features/game/gameReducer.ts
import type { GameState, CellPosition, Grid, GridCell } from '@/types/game';
import type { Pokemon } from '@/types/pokemon';

// Action type constants (SCREAMING_SNAKE_CASE)
export const SET_SELECTED_CELL = 'SET_SELECTED_CELL';
export const PLACE_POKEMON = 'PLACE_POKEMON';
export const CLEAR_CELL = 'CLEAR_CELL';
export const RESET_GRID = 'RESET_GRID';
export const SET_LEVEL = 'SET_LEVEL';

// Action types
type SetSelectedCellAction = {
  type: typeof SET_SELECTED_CELL;
  payload: CellPosition | null;
};

type PlacePokemonAction = {
  type: typeof PLACE_POKEMON;
  payload: { position: CellPosition; pokemon: Pokemon };
};

type ClearCellAction = {
  type: typeof CLEAR_CELL;
  payload: CellPosition;
};

type ResetGridAction = {
  type: typeof RESET_GRID;
};

type SetLevelAction = {
  type: typeof SET_LEVEL;
  payload: number;
};

export type GameAction =
  | SetSelectedCellAction
  | PlacePokemonAction
  | ClearCellAction
  | ResetGridAction
  | SetLevelAction;

// Helper to create initial 3x3 grid
export function createInitialGrid(): Grid {
  const grid: Grid = [];
  for (let row = 0; row < 3; row++) {
    const rowCells: GridCell[] = [];
    for (let col = 0; col < 3; col++) {
      rowCells.push({ row, col, pokemon: null });
    }
    grid.push(rowCells);
  }
  return grid;
}

// Initial state factory
export function createInitialState(): GameState {
  return {
    grid: createInitialGrid(),
    selectedCell: null,
    usedPokemon: new Set<number>(),
    currentLevelId: null,
  };
}

// Reducer function
export function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case SET_SELECTED_CELL:
      return {
        ...state,
        selectedCell: action.payload,
      };

    case PLACE_POKEMON: {
      const { position, pokemon } = action.payload;
      const newGrid = state.grid.map((rowCells, rowIdx) =>
        rowCells.map((cell, colIdx) =>
          rowIdx === position.row && colIdx === position.col
            ? { ...cell, pokemon }
            : cell
        )
      );
      const newUsedPokemon = new Set(state.usedPokemon);
      newUsedPokemon.add(pokemon.id);
      return {
        ...state,
        grid: newGrid,
        usedPokemon: newUsedPokemon,
        selectedCell: null, // Deselect after placing
      };
    }

    case CLEAR_CELL: {
      const cell = state.grid[action.payload.row][action.payload.col];
      const newGrid = state.grid.map((rowCells, rowIdx) =>
        rowCells.map((c, colIdx) =>
          rowIdx === action.payload.row && colIdx === action.payload.col
            ? { ...c, pokemon: null }
            : c
        )
      );
      const newUsedPokemon = new Set(state.usedPokemon);
      if (cell.pokemon) {
        newUsedPokemon.delete(cell.pokemon.id);
      }
      return {
        ...state,
        grid: newGrid,
        usedPokemon: newUsedPokemon,
      };
    }

    case RESET_GRID:
      return {
        ...state,
        grid: createInitialGrid(),
        selectedCell: null,
        usedPokemon: new Set<number>(),
      };

    case SET_LEVEL:
      return {
        ...state,
        currentLevelId: action.payload,
        grid: createInitialGrid(),
        selectedCell: null,
        usedPokemon: new Set<number>(),
      };

    default:
      return state;
  }
}

// Action creators for type safety
export const setSelectedCell = (position: CellPosition | null): SetSelectedCellAction => ({
  type: SET_SELECTED_CELL,
  payload: position,
});

export const placePokemon = (position: CellPosition, pokemon: Pokemon): PlacePokemonAction => ({
  type: PLACE_POKEMON,
  payload: { position, pokemon },
});

export const clearCell = (position: CellPosition): ClearCellAction => ({
  type: CLEAR_CELL,
  payload: position,
});

export const resetGrid = (): ResetGridAction => ({
  type: RESET_GRID,
});

export const setLevel = (levelId: number): SetLevelAction => ({
  type: SET_LEVEL,
  payload: levelId,
});
```

### Context Pattern

```typescript
// src/features/game/GameContext.tsx
import { createContext, useContext, useReducer, type ReactNode, type Dispatch } from 'react';
import { gameReducer, createInitialState, type GameAction } from './gameReducer';
import type { GameState } from '@/types/game';

const GameContext = createContext<GameState | null>(null);
const GameDispatchContext = createContext<Dispatch<GameAction> | null>(null);

interface GameProviderProps {
  children: ReactNode;
}

export function GameProvider({ children }: GameProviderProps) {
  const [state, dispatch] = useReducer(gameReducer, null, createInitialState);

  return (
    <GameContext.Provider value={state}>
      <GameDispatchContext.Provider value={dispatch}>
        {children}
      </GameDispatchContext.Provider>
    </GameContext.Provider>
  );
}

/**
 * Hook to access game state and dispatch
 * Must be used within a GameProvider
 */
export function useGame() {
  const state = useContext(GameContext);
  const dispatch = useContext(GameDispatchContext);

  if (state === null || dispatch === null) {
    throw new Error('useGame must be used within a GameProvider');
  }

  return { state, dispatch };
}

// Re-export action creators for convenience
export {
  setSelectedCell,
  placePokemon,
  clearCell,
  resetGrid,
  setLevel,
} from './gameReducer';
```

### Test Pattern

```typescript
// src/features/game/gameReducer.test.ts
import { describe, it, expect } from 'vitest';
import {
  gameReducer,
  createInitialState,
  createInitialGrid,
  SET_SELECTED_CELL,
  PLACE_POKEMON,
  CLEAR_CELL,
  RESET_GRID,
  SET_LEVEL,
} from './gameReducer';
import type { Pokemon } from '@/types/pokemon';

const mockPokemon: Pokemon = {
  id: 1,
  name: 'Bulbasaur',
  types: ['grass', 'poison'],
  evolutionStage: 'basic',
  moves: ['tackle', 'growl', 'vineWhip'],
};

describe('gameReducer', () => {
  describe('createInitialGrid', () => {
    it('creates a 3x3 grid', () => {
      const grid = createInitialGrid();
      expect(grid).toHaveLength(3);
      expect(grid[0]).toHaveLength(3);
    });

    it('all cells start with null pokemon', () => {
      const grid = createInitialGrid();
      grid.forEach((row, rowIdx) => {
        row.forEach((cell, colIdx) => {
          expect(cell.pokemon).toBeNull();
          expect(cell.row).toBe(rowIdx);
          expect(cell.col).toBe(colIdx);
        });
      });
    });
  });

  describe('createInitialState', () => {
    it('creates state with empty grid, no selection, empty usedPokemon', () => {
      const state = createInitialState();
      expect(state.grid).toHaveLength(3);
      expect(state.selectedCell).toBeNull();
      expect(state.usedPokemon.size).toBe(0);
      expect(state.currentLevelId).toBeNull();
    });
  });

  describe('SET_SELECTED_CELL', () => {
    it('sets selectedCell to provided position', () => {
      const state = createInitialState();
      const newState = gameReducer(state, {
        type: SET_SELECTED_CELL,
        payload: { row: 1, col: 2 },
      });
      expect(newState.selectedCell).toEqual({ row: 1, col: 2 });
    });

    it('deselects when payload is null', () => {
      const state = { ...createInitialState(), selectedCell: { row: 0, col: 0 } };
      const newState = gameReducer(state, {
        type: SET_SELECTED_CELL,
        payload: null,
      });
      expect(newState.selectedCell).toBeNull();
    });

    it('changes selection to new cell', () => {
      const state = { ...createInitialState(), selectedCell: { row: 0, col: 0 } };
      const newState = gameReducer(state, {
        type: SET_SELECTED_CELL,
        payload: { row: 2, col: 1 },
      });
      expect(newState.selectedCell).toEqual({ row: 2, col: 1 });
    });
  });

  describe('PLACE_POKEMON', () => {
    it('places pokemon in specified cell', () => {
      const state = createInitialState();
      const newState = gameReducer(state, {
        type: PLACE_POKEMON,
        payload: { position: { row: 0, col: 0 }, pokemon: mockPokemon },
      });
      expect(newState.grid[0][0].pokemon).toEqual(mockPokemon);
    });

    it('adds pokemon ID to usedPokemon set', () => {
      const state = createInitialState();
      const newState = gameReducer(state, {
        type: PLACE_POKEMON,
        payload: { position: { row: 0, col: 0 }, pokemon: mockPokemon },
      });
      expect(newState.usedPokemon.has(mockPokemon.id)).toBe(true);
    });

    it('deselects cell after placing', () => {
      const state = { ...createInitialState(), selectedCell: { row: 0, col: 0 } };
      const newState = gameReducer(state, {
        type: PLACE_POKEMON,
        payload: { position: { row: 0, col: 0 }, pokemon: mockPokemon },
      });
      expect(newState.selectedCell).toBeNull();
    });

    it('does not affect other cells', () => {
      const state = createInitialState();
      const newState = gameReducer(state, {
        type: PLACE_POKEMON,
        payload: { position: { row: 1, col: 1 }, pokemon: mockPokemon },
      });
      expect(newState.grid[0][0].pokemon).toBeNull();
      expect(newState.grid[1][1].pokemon).toEqual(mockPokemon);
      expect(newState.grid[2][2].pokemon).toBeNull();
    });
  });

  describe('CLEAR_CELL', () => {
    it('removes pokemon from specified cell', () => {
      let state = createInitialState();
      state = gameReducer(state, {
        type: PLACE_POKEMON,
        payload: { position: { row: 0, col: 0 }, pokemon: mockPokemon },
      });
      const newState = gameReducer(state, {
        type: CLEAR_CELL,
        payload: { row: 0, col: 0 },
      });
      expect(newState.grid[0][0].pokemon).toBeNull();
    });

    it('removes pokemon ID from usedPokemon set', () => {
      let state = createInitialState();
      state = gameReducer(state, {
        type: PLACE_POKEMON,
        payload: { position: { row: 0, col: 0 }, pokemon: mockPokemon },
      });
      const newState = gameReducer(state, {
        type: CLEAR_CELL,
        payload: { row: 0, col: 0 },
      });
      expect(newState.usedPokemon.has(mockPokemon.id)).toBe(false);
    });

    it('handles clearing empty cell gracefully', () => {
      const state = createInitialState();
      const newState = gameReducer(state, {
        type: CLEAR_CELL,
        payload: { row: 0, col: 0 },
      });
      expect(newState.grid[0][0].pokemon).toBeNull();
      expect(newState.usedPokemon.size).toBe(0);
    });
  });

  describe('RESET_GRID', () => {
    it('clears all cells', () => {
      let state = createInitialState();
      state = gameReducer(state, {
        type: PLACE_POKEMON,
        payload: { position: { row: 0, col: 0 }, pokemon: mockPokemon },
      });
      const newState = gameReducer(state, { type: RESET_GRID });
      newState.grid.forEach((row) => {
        row.forEach((cell) => {
          expect(cell.pokemon).toBeNull();
        });
      });
    });

    it('resets selectedCell to null', () => {
      const state = { ...createInitialState(), selectedCell: { row: 1, col: 1 } };
      const newState = gameReducer(state, { type: RESET_GRID });
      expect(newState.selectedCell).toBeNull();
    });

    it('clears usedPokemon set', () => {
      let state = createInitialState();
      state = gameReducer(state, {
        type: PLACE_POKEMON,
        payload: { position: { row: 0, col: 0 }, pokemon: mockPokemon },
      });
      const newState = gameReducer(state, { type: RESET_GRID });
      expect(newState.usedPokemon.size).toBe(0);
    });

    it('preserves currentLevelId', () => {
      let state = createInitialState();
      state = gameReducer(state, { type: SET_LEVEL, payload: 5 });
      const newState = gameReducer(state, { type: RESET_GRID });
      expect(newState.currentLevelId).toBe(5);
    });
  });

  describe('SET_LEVEL', () => {
    it('sets currentLevelId', () => {
      const state = createInitialState();
      const newState = gameReducer(state, {
        type: SET_LEVEL,
        payload: 3,
      });
      expect(newState.currentLevelId).toBe(3);
    });

    it('resets grid when changing level', () => {
      let state = createInitialState();
      state = gameReducer(state, {
        type: PLACE_POKEMON,
        payload: { position: { row: 0, col: 0 }, pokemon: mockPokemon },
      });
      const newState = gameReducer(state, {
        type: SET_LEVEL,
        payload: 2,
      });
      expect(newState.grid[0][0].pokemon).toBeNull();
      expect(newState.usedPokemon.size).toBe(0);
    });
  });

  describe('unknown action', () => {
    it('returns state unchanged for unknown action', () => {
      const state = createInitialState();
      const newState = gameReducer(state, { type: 'UNKNOWN' as any } as any);
      expect(newState).toBe(state);
    });
  });
});
```

### Previous Story Learnings

From Story 1.4 (Pokemon Sprite Integration):
- **Path alias `@/*`** is configured and working - USE IT
- **Vitest globals** - describe/it/expect available without import
- **Tests co-located** - place `gameReducer.test.ts` next to `gameReducer.ts`
- **JSDoc comments** - add documentation for exported functions
- **TypeScript strict mode** - no `any` types allowed

From Epic 1 patterns:
- **Feature index exports** - update `src/features/game/index.ts`
- **Type exports** - add new types to `src/types/index.ts`
- **Test organization** - use describe blocks for logical grouping

### Git Intelligence

**Recent Commits:**
```
6a18765 docs: complete Epic 1 retrospective and mark epic as done
616d570 feat: implement PokemonSprite component and fix Level data layer
c7b72f1 feat: implement Level data layer with 9 hand-crafted puzzle levels
063c60b feat: implement Pokemon data layer with Gen 1 accurate types
9260c11 fix: code review fixes for story 1-1
2db364f feat: initialize project with Vite, React 19, TypeScript, Tailwind v4, and shadcn/ui
```

**Codebase Patterns:**
- Commit messages use conventional commits format (feat, fix, docs)
- TypeScript strict mode enforced
- Tests co-located with source files
- JSDoc comments on exported functions

### Project Structure After This Story

```
src/
├── features/
│   └── game/
│       ├── index.ts              # UPDATE: export GameProvider, useGame
│       ├── gameReducer.ts        # NEW: reducer with actions
│       ├── gameReducer.test.ts   # NEW: reducer tests
│       └── GameContext.tsx       # NEW: context and provider
├── types/
│   ├── index.ts                  # UPDATE: export game types
│   ├── game.ts                   # NEW: GameState, GridCell, etc.
│   ├── pokemon.ts                # EXISTS
│   └── level.ts                  # EXISTS
└── App.tsx                       # UPDATE: wrap with GameProvider
```

### Integration Points

**How this story connects to other components:**
- `Grid` component (Story 2.2) will consume `useGame` for rendering
- `Cell` component (Story 2.3) will use `setSelectedCell` action
- `PokemonSelector` (Epic 3) will use `placePokemon` action
- `ValidationEngine` (Epic 4) will read grid state for validation

### Accessibility Considerations

- No direct UI in this story (state management only)
- State structure supports keyboard navigation (cell positions)
- Grid state enables ARIA labels for cell selection status

### Performance Considerations

- Use `Set<number>` for O(1) lookup of used Pokemon
- Immutable state updates via spread operator
- Initial state created via factory function (not inline)
- Context split into state/dispatch to prevent unnecessary re-renders

### Validation Checklist Before Marking Complete

- [ ] `src/types/game.ts` created with all interfaces
- [ ] Types exported from `src/types/index.ts`
- [ ] `gameReducer.ts` handles all 5 action types
- [ ] Action type constants use SCREAMING_SNAKE_CASE
- [ ] Action creators provide type safety
- [ ] `GameContext.tsx` provides state and dispatch contexts
- [ ] `useGame` hook throws error if used outside provider
- [ ] All reducer tests pass (15+ tests)
- [ ] GameProvider wraps app in App.tsx
- [ ] `npm run test` passes
- [ ] `npm run lint` passes
- [ ] `npm run build` succeeds

### References

- [Source: docs/architecture.md#State-Management-Patterns] - Context + useReducer pattern
- [Source: docs/architecture.md#Naming-Patterns] - SCREAMING_SNAKE for action types
- [Source: docs/architecture.md#Project-Structure] - File locations for features/game/
- [Source: docs/architecture.md#Type-Organization] - Domain types in src/types/
- [Source: docs/epics.md#Story-2.1] - Acceptance criteria
- [Source: docs/prd.md#Validation-Feedback] - FR16-FR21 validation flow
- [Source: docs/sprint-artifacts/1-4-integrate-pokemon-sprites.md] - Previous story patterns

## Dev Agent Record

### Context Reference

- docs/architecture.md (primary architecture reference)
- docs/epics.md (story acceptance criteria)
- docs/prd.md (functional requirements context)
- src/types/pokemon.ts (Pokemon type for grid cells)
- src/types/level.ts (Level type for level selection)
- src/features/game/index.ts (export target)

### Agent Model Used

{{agent_model_name_version}}

### Debug Log References

### Completion Notes List

### File List
