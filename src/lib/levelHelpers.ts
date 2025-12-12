/**
 * Level helper functions for accessing bundled level data
 */
import levelsData from '@/data/levels.json';
import type { Level } from '@/types';

const levels = levelsData as Level[];

/**
 * Get a level by its ID
 * @param id - The level number (1-9)
 * @returns The Level if found, undefined otherwise
 */
export function getLevelById(id: number): Level | undefined {
  return levels.find((l) => l.id === id);
}

/**
 * Get all levels
 * @returns Array of all levels
 */
export function getAllLevels(): Level[] {
  return [...levels];
}

/**
 * Get the total number of levels
 * @returns Count of available levels
 */
export function getLevelCount(): number {
  return levels.length;
}
