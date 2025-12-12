/**
 * Game reducer for puzzle grid state management
 * Handles actions: SET_SELECTED_CELL, PLACE_POKEMON, CLEAR_CELL, RESET_GRID, SET_LEVEL
 */

import type { GameState, CellPosition, Grid, GridCell } from '@/types/game';
import type { Pokemon } from '@/types/pokemon';

// Action type constants (SCREAMING_SNAKE_CASE per architecture patterns)
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

/**
 * Creates an initial 3x3 grid with all empty cells
 */
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

/**
 * Creates initial game state with empty grid and no selection
 */
export function createInitialState(): GameState {
  return {
    grid: createInitialGrid(),
    selectedCell: null,
    usedPokemon: new Set<number>(),
    currentLevelId: null,
  };
}

/**
 * Game reducer function handling all game actions
 */
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
