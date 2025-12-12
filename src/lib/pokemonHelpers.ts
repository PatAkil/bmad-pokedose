/**
 * Pokemon helper functions for accessing bundled Gen 1 Pokemon data
 */
import pokemonData from '@/data/pokemon.json';
import type { Pokemon } from '@/types';

const pokemon = pokemonData as Pokemon[];

/**
 * Get a Pokemon by its Pokedex ID
 * @param id - The Pokedex number (1-150 for Gen 1)
 * @returns The Pokemon if found, undefined otherwise
 */
export function getPokemonById(id: number): Pokemon | undefined {
  return pokemon.find((p) => p.id === id);
}

/**
 * Get all Gen 1 Pokemon
 * @returns Array of all 150 Gen 1 Pokemon (shallow copy to prevent mutation)
 */
export function getAllPokemon(): Pokemon[] {
  return [...pokemon];
}

/**
 * Get a Pokemon by its name (case-insensitive)
 * @param name - The Pokemon name to search for
 * @returns The Pokemon if found, undefined otherwise
 */
export function getPokemonByName(name: string): Pokemon | undefined {
  if (!name) return undefined;
  return pokemon.find(
    (p) => p.name.toLowerCase() === name.toLowerCase()
  );
}
