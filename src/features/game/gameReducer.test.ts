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
  setSelectedCell,
  placePokemon,
  clearCell,
  resetGrid,
  setLevel,
} from './gameReducer';
import type { Pokemon } from '@/types/pokemon';

const mockPokemon: Pokemon = {
  id: 1,
  name: 'Bulbasaur',
  types: ['grass', 'poison'],
  evolutionStage: 'basic',
  moves: ['tackle', 'growl', 'vineWhip'],
};

const mockPokemon2: Pokemon = {
  id: 4,
  name: 'Charmander',
  types: ['fire'],
  evolutionStage: 'basic',
  moves: ['scratch', 'growl', 'ember'],
};

describe('gameReducer', () => {
  describe('createInitialGrid', () => {
    it('creates a 3x3 grid', () => {
      const grid = createInitialGrid();
      expect(grid).toHaveLength(3);
      expect(grid[0]).toHaveLength(3);
      expect(grid[1]).toHaveLength(3);
      expect(grid[2]).toHaveLength(3);
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

    it('preserves other state properties', () => {
      const state = createInitialState();
      state.currentLevelId = 5;
      const newState = gameReducer(state, {
        type: SET_SELECTED_CELL,
        payload: { row: 1, col: 1 },
      });
      expect(newState.currentLevelId).toBe(5);
      expect(newState.grid).toEqual(state.grid);
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

    it('replaces pokemon in occupied cell', () => {
      let state = createInitialState();
      state = gameReducer(state, {
        type: PLACE_POKEMON,
        payload: { position: { row: 0, col: 0 }, pokemon: mockPokemon },
      });
      const newState = gameReducer(state, {
        type: PLACE_POKEMON,
        payload: { position: { row: 0, col: 0 }, pokemon: mockPokemon2 },
      });
      expect(newState.grid[0][0].pokemon).toEqual(mockPokemon2);
      expect(newState.usedPokemon.has(mockPokemon.id)).toBe(true); // Old pokemon still in set
      expect(newState.usedPokemon.has(mockPokemon2.id)).toBe(true);
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

    it('does not affect other cells', () => {
      let state = createInitialState();
      state = gameReducer(state, {
        type: PLACE_POKEMON,
        payload: { position: { row: 0, col: 0 }, pokemon: mockPokemon },
      });
      state = gameReducer(state, {
        type: PLACE_POKEMON,
        payload: { position: { row: 1, col: 1 }, pokemon: mockPokemon2 },
      });
      const newState = gameReducer(state, {
        type: CLEAR_CELL,
        payload: { row: 0, col: 0 },
      });
      expect(newState.grid[0][0].pokemon).toBeNull();
      expect(newState.grid[1][1].pokemon).toEqual(mockPokemon2);
    });
  });

  describe('RESET_GRID', () => {
    it('clears all cells', () => {
      let state = createInitialState();
      state = gameReducer(state, {
        type: PLACE_POKEMON,
        payload: { position: { row: 0, col: 0 }, pokemon: mockPokemon },
      });
      state = gameReducer(state, {
        type: PLACE_POKEMON,
        payload: { position: { row: 1, col: 1 }, pokemon: mockPokemon2 },
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
      state = gameReducer(state, {
        type: PLACE_POKEMON,
        payload: { position: { row: 0, col: 0 }, pokemon: mockPokemon },
      });
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
    });

    it('clears usedPokemon when changing level', () => {
      let state = createInitialState();
      state = gameReducer(state, {
        type: PLACE_POKEMON,
        payload: { position: { row: 0, col: 0 }, pokemon: mockPokemon },
      });
      const newState = gameReducer(state, {
        type: SET_LEVEL,
        payload: 2,
      });
      expect(newState.usedPokemon.size).toBe(0);
    });

    it('resets selectedCell when changing level', () => {
      let state = createInitialState();
      state = gameReducer(state, {
        type: SET_SELECTED_CELL,
        payload: { row: 1, col: 1 },
      });
      const newState = gameReducer(state, {
        type: SET_LEVEL,
        payload: 2,
      });
      expect(newState.selectedCell).toBeNull();
    });
  });

  describe('unknown action', () => {
    it('returns state unchanged for unknown action', () => {
      const state = createInitialState();
      // @ts-expect-error - testing unknown action type
      const newState = gameReducer(state, { type: 'UNKNOWN' });
      expect(newState).toBe(state);
    });
  });

  describe('action creators', () => {
    it('setSelectedCell creates correct action', () => {
      const action = setSelectedCell({ row: 1, col: 2 });
      expect(action).toEqual({
        type: SET_SELECTED_CELL,
        payload: { row: 1, col: 2 },
      });
    });

    it('setSelectedCell handles null', () => {
      const action = setSelectedCell(null);
      expect(action).toEqual({
        type: SET_SELECTED_CELL,
        payload: null,
      });
    });

    it('placePokemon creates correct action', () => {
      const action = placePokemon({ row: 0, col: 0 }, mockPokemon);
      expect(action).toEqual({
        type: PLACE_POKEMON,
        payload: { position: { row: 0, col: 0 }, pokemon: mockPokemon },
      });
    });

    it('clearCell creates correct action', () => {
      const action = clearCell({ row: 1, col: 2 });
      expect(action).toEqual({
        type: CLEAR_CELL,
        payload: { row: 1, col: 2 },
      });
    });

    it('resetGrid creates correct action', () => {
      const action = resetGrid();
      expect(action).toEqual({ type: RESET_GRID });
    });

    it('setLevel creates correct action', () => {
      const action = setLevel(5);
      expect(action).toEqual({
        type: SET_LEVEL,
        payload: 5,
      });
    });
  });

  describe('edge cases', () => {
    it('handles placing pokemon at grid boundaries', () => {
      const state = createInitialState();
      const positions = [
        { row: 0, col: 0 }, // top-left
        { row: 0, col: 2 }, // top-right
        { row: 2, col: 0 }, // bottom-left
        { row: 2, col: 2 }, // bottom-right
      ];

      positions.forEach((position) => {
        const newState = gameReducer(state, {
          type: PLACE_POKEMON,
          payload: { position, pokemon: mockPokemon },
        });
        expect(newState.grid[position.row][position.col].pokemon).toEqual(mockPokemon);
      });
    });

    it('multiple pokemon placements track all IDs', () => {
      let state = createInitialState();
      const pokemon3: Pokemon = {
        id: 7,
        name: 'Squirtle',
        types: ['water'],
        evolutionStage: 'basic',
        moves: ['tackle', 'bubble'],
      };

      state = gameReducer(state, {
        type: PLACE_POKEMON,
        payload: { position: { row: 0, col: 0 }, pokemon: mockPokemon },
      });
      state = gameReducer(state, {
        type: PLACE_POKEMON,
        payload: { position: { row: 1, col: 1 }, pokemon: mockPokemon2 },
      });
      state = gameReducer(state, {
        type: PLACE_POKEMON,
        payload: { position: { row: 2, col: 2 }, pokemon: pokemon3 },
      });

      expect(state.usedPokemon.size).toBe(3);
      expect(state.usedPokemon.has(1)).toBe(true);
      expect(state.usedPokemon.has(4)).toBe(true);
      expect(state.usedPokemon.has(7)).toBe(true);
    });
  });
});
