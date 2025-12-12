/**
 * Game domain types for bmad-pokedex
 * State management types for the puzzle grid game
 */

import type { Pokemon } from './pokemon';

/** Grid size constant - 3x3 puzzle grid */
export const GRID_SIZE = 3;

/**
 * Position in the grid
 * Row and column are 0-indexed (0-2)
 */
export interface CellPosition {
  /** Row index (0-2) */
  row: number;
  /** Column index (0-2) */
  col: number;
}

/**
 * Individual cell in the puzzle grid
 */
export interface GridCell {
  /** Row index of this cell */
  row: number;
  /** Column index of this cell */
  col: number;
  /** Pokemon placed in this cell, null if empty */
  pokemon: Pokemon | null;
}

/** 3x3 grid of cells */
export type Grid = GridCell[][];

/**
 * Complete game state
 */
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
