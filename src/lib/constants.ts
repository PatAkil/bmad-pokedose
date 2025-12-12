/**
 * Application constants for bmad-pokedex
 */

/** Default Pokemon sprite CDN URL (PokeAPI sprites) */
export const DEFAULT_SPRITE_CDN_URL =
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon';

/** Sprite CDN URL from environment or default */
export const SPRITE_CDN_URL =
  import.meta.env.VITE_SPRITE_CDN_URL || DEFAULT_SPRITE_CDN_URL;

/**
 * Get the sprite URL for a Pokemon by ID
 * @param id - The Pokedex number (1-150)
 * @returns The full URL to the Pokemon sprite image
 */
export function getSpriteUrl(id: number): string {
  return `${SPRITE_CDN_URL}/${id}.png`;
}
