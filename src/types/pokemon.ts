/**
 * Pokemon domain types for bmad-pokedex
 * Gen 1 Pokemon data schema (IDs 1-150)
 */

/**
 * Evolution stage of a Pokemon
 * - basic: First in evolution chain or no evolution (e.g., Charmander, Ditto)
 * - stage1: First evolution (e.g., Charmeleon)
 * - stage2: Final evolution (e.g., Charizard)
 */
export type EvolutionStage = 'basic' | 'stage1' | 'stage2';

/**
 * Pokemon data structure for Gen 1 Pokemon
 */
export interface Pokemon {
  /** Pokedex number (1-150 for Gen 1) */
  id: number;
  /** Pokemon name (e.g., "Bulbasaur") */
  name: string;
  /** Pokemon types array (e.g., ["grass", "poison"]) */
  types: string[];
  /** Evolution stage in the Pokemon's evolution chain */
  evolutionStage: EvolutionStage;
  /** Gen 1 learnable moves array (camelCase) */
  moves: string[];
}
