import { describe, it, expect } from 'vitest';
import { getSpriteUrl, SPRITE_CDN_URL, DEFAULT_SPRITE_CDN_URL } from './constants';

describe('constants', () => {
  describe('SPRITE_CDN_URL', () => {
    it('has a default value pointing to PokeAPI sprites', () => {
      expect(DEFAULT_SPRITE_CDN_URL).toContain('githubusercontent.com');
      expect(DEFAULT_SPRITE_CDN_URL).toContain('sprites/pokemon');
    });

    it('SPRITE_CDN_URL is defined', () => {
      expect(SPRITE_CDN_URL).toBeDefined();
      expect(typeof SPRITE_CDN_URL).toBe('string');
    });
  });

  describe('getSpriteUrl', () => {
    it('generates correct URL for Bulbasaur (#1)', () => {
      const url = getSpriteUrl(1);
      expect(url).toBe(`${SPRITE_CDN_URL}/1.png`);
    });

    it('generates correct URL for Mew (#150)', () => {
      const url = getSpriteUrl(150);
      expect(url).toBe(`${SPRITE_CDN_URL}/150.png`);
    });

    it('generates correct URL for Pikachu (#25)', () => {
      const url = getSpriteUrl(25);
      expect(url).toBe(`${SPRITE_CDN_URL}/25.png`);
    });

    it('URL contains correct CDN base', () => {
      const url = getSpriteUrl(25);
      expect(url).toContain('githubusercontent.com');
      expect(url).toContain('sprites/pokemon');
    });

    it('URL ends with .png extension', () => {
      const url = getSpriteUrl(42);
      expect(url).toMatch(/\.png$/);
    });
  });
});
