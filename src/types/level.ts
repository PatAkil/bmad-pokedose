/**
 * Level domain types for bmad-pokedex
 * Defines 3x3 puzzle grid criteria structure
 */

/**
 * Type of criteria used to filter Pokemon
 * - type: Single Pokemon type (e.g., "fire", "water")
 * - dual-type: Pokemon must have both specified types
 * - evolution: Evolution stage (basic, stage1, stage2)
 * - moveset: Pokemon must know the specified move
 */
export type CriteriaType = 'type' | 'dual-type' | 'evolution' | 'moveset';

/**
 * Criteria for a row or column in the puzzle grid
 */
export interface Criteria {
  /** The kind of criteria */
  type: CriteriaType;
  /** The value(s) to match - string for single, string[] for dual-type or moveset list */
  value: string | string[];
}

/**
 * Level definition for a puzzle
 */
export interface Level {
  /** Level number (1-9) */
  id: number;
  /** Display name (e.g., "Type Basics") */
  name: string;
  /** 3 row criteria - Pokemon must match these */
  rows: [Criteria, Criteria, Criteria];
  /** 3 column criteria - Pokemon must also match these */
  columns: [Criteria, Criteria, Criteria];
}
