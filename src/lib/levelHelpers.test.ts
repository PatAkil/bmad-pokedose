import { describe, it, expect } from 'vitest';
import { getLevelById, getAllLevels, getLevelCount } from './levelHelpers';

describe('levelHelpers', () => {
  describe('getLevelById', () => {
    it('returns Level 1 for id 1', () => {
      const level = getLevelById(1);
      expect(level).toBeDefined();
      expect(level?.name).toBe('Type Basics');
    });

    it('returns Level 9 for id 9', () => {
      const level = getLevelById(9);
      expect(level).toBeDefined();
      expect(level?.name).toBe("Dragon's Peak");
    });

    it('returns undefined for id 0', () => {
      expect(getLevelById(0)).toBeUndefined();
    });

    it('returns undefined for id 10', () => {
      expect(getLevelById(10)).toBeUndefined();
    });

    it('returns undefined for negative id', () => {
      expect(getLevelById(-1)).toBeUndefined();
    });
  });

  describe('getAllLevels', () => {
    it('returns exactly 9 levels', () => {
      expect(getAllLevels()).toHaveLength(9);
    });

    it('returns a copy, not the original array', () => {
      const levels1 = getAllLevels();
      const levels2 = getAllLevels();
      expect(levels1).not.toBe(levels2);
      expect(levels1).toEqual(levels2);
    });
  });

  describe('getLevelCount', () => {
    it('returns 9', () => {
      expect(getLevelCount()).toBe(9);
    });
  });

  describe('level structure validation', () => {
    it('each level has required fields', () => {
      getAllLevels().forEach((level) => {
        expect(level).toHaveProperty('id');
        expect(level).toHaveProperty('name');
        expect(level).toHaveProperty('rows');
        expect(level).toHaveProperty('columns');
        expect(typeof level.id).toBe('number');
        expect(typeof level.name).toBe('string');
        expect(level.rows).toHaveLength(3);
        expect(level.columns).toHaveLength(3);
      });
    });

    it('each criteria has type and value', () => {
      getAllLevels().forEach((level) => {
        [...level.rows, ...level.columns].forEach((criteria) => {
          expect(criteria).toHaveProperty('type');
          expect(criteria).toHaveProperty('value');
          expect(['type', 'dual-type', 'evolution', 'moveset']).toContain(
            criteria.type
          );
        });
      });
    });

    it('level ids are sequential from 1 to 9', () => {
      const levels = getAllLevels();
      levels.forEach((level, index) => {
        expect(level.id).toBe(index + 1);
      });
    });
  });

  describe('difficulty progression', () => {
    it('levels 1-3 use only type criteria', () => {
      [1, 2, 3].forEach((id) => {
        const level = getLevelById(id);
        expect(level).toBeDefined();
        [...level!.rows, ...level!.columns].forEach((criteria) => {
          expect(criteria.type).toBe('type');
        });
      });
    });

    it('levels 4-5 include both dual-type AND evolution criteria', () => {
      [4, 5].forEach((id) => {
        const level = getLevelById(id);
        expect(level).toBeDefined();
        const allCriteria = [...level!.rows, ...level!.columns];
        const hasDualType = allCriteria.some((c) => c.type === 'dual-type');
        const hasEvolution = allCriteria.some((c) => c.type === 'evolution');
        expect(hasDualType).toBe(true);
        expect(hasEvolution).toBe(true);
      });
    });

    it('levels 6-9 include moveset criteria', () => {
      [6, 7, 8, 9].forEach((id) => {
        const level = getLevelById(id);
        expect(level).toBeDefined();
        const allCriteria = [...level!.rows, ...level!.columns];
        const hasMoveset = allCriteria.some((c) => c.type === 'moveset');
        expect(hasMoveset).toBe(true);
      });
    });
  });
});
