# Story 1.3: Create Level Data Layer

Status: done

## Story

As a **player**,
I want **the game to have 9 hand-crafted levels with progressive difficulty**,
so that **I can learn Pokemon criteria types gradually as I play**.

## Acceptance Criteria

1. **Given** the Pokemon data layer exists, **When** I access the Level data layer, **Then** 9 levels are defined in `src/data/levels.json`
2. **And** each level has: id (number), name (string), rows (3 Criteria), columns (3 Criteria)
3. **And** each Criteria has: type ('type' | 'dual-type' | 'evolution' | 'moveset'), value (string | string[])
4. **And** Levels 1-3 use only basic single-type criteria (e.g., "Fire", "Water", "Grass")
5. **And** Levels 4-5 introduce dual-types and evolution stages
6. **And** Levels 6-9 include moveset criteria and combined criteria
7. **And** TypeScript types are defined: `Level`, `Criteria`, `CriteriaType`
8. **And** a helper function `getLevelById(id: number): Level` is available
9. **And** unit tests exist for `getLevelById()` helper function
10. **And** tests verify all 9 levels are present with valid structure
11. **And** tests validate criteria type progression (levels 1-3 basic, 4-5 intermediate, 6-9 advanced)

## Tasks / Subtasks

- [x] **Task 1: Define Level TypeScript Types** (AC: #7)
  - [x] Create `src/types/level.ts` with `Level`, `Criteria`, `CriteriaType` types
  - [x] Define `CriteriaType` as `'type' | 'dual-type' | 'evolution' | 'moveset'`
  - [x] Export types from `src/types/index.ts`

- [x] **Task 2: Create Level JSON Data File** (AC: #1, #2, #3, #4, #5, #6)
  - [x] Create `src/data/levels.json` with all 9 levels
  - [x] Ensure each level has: id, name, rows (3 criteria), columns (3 criteria)
  - [x] Levels 1-3: Basic single-type criteria only (Fire, Water, Grass, Electric, etc.)
  - [x] Levels 4-5: Introduce dual-types and evolution stages
  - [x] Levels 6-9: Include moveset criteria and combined criteria
  - [x] Verify each level is solvable with Gen 1 Pokemon

- [x] **Task 3: Create Level Helper Functions** (AC: #8)
  - [x] Create `src/lib/levelHelpers.ts`
  - [x] Implement `getLevelById(id: number): Level | undefined`
  - [x] Implement `getAllLevels(): Level[]` for level selection
  - [x] Implement `getLevelCount(): number` for progress display

- [x] **Task 4: Write Unit Tests** (AC: #9, #10, #11)
  - [x] Create `src/lib/levelHelpers.test.ts`
  - [x] Test `getLevelById()` returns correct level
  - [x] Test `getLevelById()` returns undefined for invalid IDs
  - [x] Test all 9 levels are present
  - [x] Test each level has required structure (id, name, 3 rows, 3 columns)
  - [x] Test levels 1-3 contain only 'type' criteria
  - [x] Test levels 4-5 contain 'dual-type' or 'evolution' criteria
  - [x] Test levels 6-9 contain 'moveset' criteria

- [x] **Task 5: Final Verification** (AC: All)
  - [x] Run `npm run test` - all tests pass
  - [x] Run `npm run lint` - no lint errors
  - [x] Run `npm run build` - builds successfully
  - [x] Verify types are exported correctly from `src/types/index.ts`

## Dev Notes

### Critical Architecture Compliance

**File Locations (MUST FOLLOW):**
- Types: `src/types/level.ts` (NOT in features folder)
- Data: `src/data/levels.json` (bundled at build time)
- Helpers: `src/lib/levelHelpers.ts`
- Tests: `src/lib/levelHelpers.test.ts` (co-located with source)

**DO NOT:**
- Create files in wrong locations
- Put types in component or feature folders - use `src/types/`
- Use `any` types - TypeScript strict mode is ON
- Skip tests - this is critical game data
- Create unsolvable levels

### Level Data Schema

```typescript
// src/types/level.ts
export type CriteriaType = 'type' | 'dual-type' | 'evolution' | 'moveset';

export interface Criteria {
  /** The kind of criteria */
  type: CriteriaType;
  /** The value(s) to match - string for single, string[] for dual-type or moveset list */
  value: string | string[];
}

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
```

### Level Design Requirements

**Levels 1-3 (Basic - Single Type Only):**
- Use only `type: 'type'` criteria
- Example types: Fire, Water, Grass, Electric, Normal, Psychic, Rock, Ground, Flying
- Each level introduces new type combinations
- MUST be solvable with multiple Pokemon options per cell

**Levels 4-5 (Intermediate - Dual-Types & Evolution):**
- Introduce `type: 'dual-type'` (Pokemon must have BOTH types)
- Introduce `type: 'evolution'` with values 'basic', 'stage1', 'stage2'
- Mix with single-type criteria
- Example: Row "Grass/Poison" + Column "Basic" = Bulbasaur, Oddish

**Levels 6-9 (Advanced - Movesets & Combined):**
- Introduce `type: 'moveset'` (Pokemon must know the move)
- Complex combinations of all criteria types
- Example: Row "Fire Type" + Column "Learns Earthquake" = Charizard, Arcanine
- Requires strategic thinking about unique picks

### Sample Level Structures

**Level 1: Type Basics (Starter)**
```json
{
  "id": 1,
  "name": "Type Basics",
  "rows": [
    { "type": "type", "value": "fire" },
    { "type": "type", "value": "water" },
    { "type": "type", "value": "grass" }
  ],
  "columns": [
    { "type": "type", "value": "fire" },
    { "type": "type", "value": "water" },
    { "type": "type", "value": "grass" }
  ]
}
```

**Level 4: Evolution Introduction**
```json
{
  "id": 4,
  "name": "Evolution Challenge",
  "rows": [
    { "type": "type", "value": "fire" },
    { "type": "type", "value": "water" },
    { "type": "type", "value": "electric" }
  ],
  "columns": [
    { "type": "evolution", "value": "basic" },
    { "type": "evolution", "value": "stage1" },
    { "type": "evolution", "value": "stage2" }
  ]
}
```

**Level 7: Moveset Challenge**
```json
{
  "id": 7,
  "name": "Move Master",
  "rows": [
    { "type": "type", "value": "water" },
    { "type": "type", "value": "psychic" },
    { "type": "type", "value": "normal" }
  ],
  "columns": [
    { "type": "moveset", "value": "surf" },
    { "type": "moveset", "value": "psychic" },
    { "type": "moveset", "value": "hyperBeam" }
  ]
}
```

### Solvability Verification

**CRITICAL:** Each level MUST be solvable. Before finalizing levels.json:

1. For each cell (row x column intersection), verify at least 1 Gen 1 Pokemon matches BOTH criteria
2. For the entire grid, verify 9 UNIQUE Pokemon can fill all cells
3. Use the Pokemon data from `src/data/pokemon.json` to validate

**Common Pitfalls:**
- Dual-type cells may have few options (e.g., Ghost/Poison only has Gengar family)
- Moveset criteria need to match moves in the Pokemon JSON (camelCase)
- Evolution stage criteria limit options significantly

### Gen 1 Type Coverage Reference

| Type | Count | Notable Pokemon |
|------|-------|-----------------|
| Normal | 22 | Rattata, Snorlax, Eevee, Tauros |
| Fire | 12 | Charmander, Vulpix, Arcanine, Moltres |
| Water | 32 | Squirtle, Psyduck, Lapras, Gyarados |
| Grass | 14 | Bulbasaur, Oddish, Exeggutor, Tangela |
| Electric | 9 | Pikachu, Magnemite, Jolteon, Zapdos |
| Psychic | 14 | Abra, Drowzee, Mew, Mewtwo |
| Fighting | 8 | Mankey, Machop, Hitmonlee, Hitmonchan |
| Rock | 11 | Geodude, Onix, Aerodactyl |
| Ground | 14 | Sandshrew, Diglett, Cubone, Rhyhorn |
| Flying | 19 | Pidgey, Zubat, Doduo (secondary type mostly) |
| Poison | 33 | Bulbasaur, Weedle, Ekans, Grimer |
| Bug | 12 | Caterpie, Weedle, Scyther, Pinsir |
| Ghost | 3 | Gastly, Haunter, Gengar |
| Ice | 5 | Dewgong, Cloyster, Jynx, Lapras, Articuno |
| Dragon | 3 | Dratini, Dragonair, Dragonite |

### Dual-Type Availability (Gen 1)

| Dual-Type | Pokemon Examples |
|-----------|------------------|
| Grass/Poison | Bulbasaur, Oddish, Bellsprout |
| Fire/Flying | Charizard, Moltres |
| Water/Ice | Dewgong, Cloyster, Lapras |
| Water/Psychic | Slowpoke, Slowbro, Starmie |
| Electric/Steel | Magnemite, Magneton |
| Rock/Ground | Geodude, Rhyhorn, Onix |
| Ghost/Poison | Gastly, Haunter, Gengar |
| Bug/Poison | Weedle, Venonat, Beedrill |
| Dragon/Flying | Dragonite |

### Common Moves by Type (Gen 1 Reference)

**Fire Moves:** ember, flamethrower, fireBlast, fireSpin
**Water Moves:** waterGun, surf, hydropump, bubbleBeam
**Electric Moves:** thunderShock, thunderbolt, thunder
**Psychic Moves:** confusion, psychic, psybeam, dreamEater
**Fighting Moves:** karateChop, lowKick, submission, highJumpKick
**Normal Moves:** tackle, hyperBeam, bodySlam, doubleEdge

### Helper Function Implementation

```typescript
// src/lib/levelHelpers.ts
import levelsData from '@/data/levels.json';
import type { Level } from '@/types';

const levels = levelsData as Level[];

export function getLevelById(id: number): Level | undefined {
  return levels.find((l) => l.id === id);
}

export function getAllLevels(): Level[] {
  return levels;
}

export function getLevelCount(): number {
  return levels.length;
}
```

### Testing Patterns

Follow existing patterns from `pokemonHelpers.test.ts`:

```typescript
// src/lib/levelHelpers.test.ts
import { describe, it, expect } from 'vitest';
import { getLevelById, getAllLevels, getLevelCount } from './levelHelpers';

describe('levelHelpers', () => {
  describe('getLevelById', () => {
    it('returns Level 1 for id 1', () => {
      const level = getLevelById(1);
      expect(level).toBeDefined();
      expect(level?.name).toBe('Type Basics');
    });

    it('returns undefined for invalid id', () => {
      expect(getLevelById(0)).toBeUndefined();
      expect(getLevelById(10)).toBeUndefined();
    });
  });

  describe('getAllLevels', () => {
    it('returns exactly 9 levels', () => {
      expect(getAllLevels()).toHaveLength(9);
    });
  });

  describe('level structure', () => {
    it('each level has required fields', () => {
      getAllLevels().forEach((level) => {
        expect(level).toHaveProperty('id');
        expect(level).toHaveProperty('name');
        expect(level).toHaveProperty('rows');
        expect(level).toHaveProperty('columns');
        expect(level.rows).toHaveLength(3);
        expect(level.columns).toHaveLength(3);
      });
    });

    it('each criteria has type and value', () => {
      getAllLevels().forEach((level) => {
        [...level.rows, ...level.columns].forEach((criteria) => {
          expect(criteria).toHaveProperty('type');
          expect(criteria).toHaveProperty('value');
          expect(['type', 'dual-type', 'evolution', 'moveset']).toContain(criteria.type);
        });
      });
    });
  });

  describe('difficulty progression', () => {
    it('levels 1-3 use only type criteria', () => {
      [1, 2, 3].forEach((id) => {
        const level = getLevelById(id);
        [...level!.rows, ...level!.columns].forEach((criteria) => {
          expect(criteria.type).toBe('type');
        });
      });
    });

    it('levels 4-5 include evolution or dual-type criteria', () => {
      [4, 5].forEach((id) => {
        const level = getLevelById(id);
        const allCriteria = [...level!.rows, ...level!.columns];
        const hasAdvanced = allCriteria.some(
          (c) => c.type === 'evolution' || c.type === 'dual-type'
        );
        expect(hasAdvanced).toBe(true);
      });
    });

    it('levels 6-9 include moveset criteria', () => {
      [6, 7, 8, 9].forEach((id) => {
        const level = getLevelById(id);
        const allCriteria = [...level!.rows, ...level!.columns];
        const hasMoveset = allCriteria.some((c) => c.type === 'moveset');
        expect(hasMoveset).toBe(true);
      });
    });
  });
});
```

### Previous Story Learnings (1-2)

From Story 1-2 implementation (Pokemon data layer):
- **Path alias `@/*`** is configured - use for imports
- **JSON imports work** - use `import data from '@/data/file.json'`
- **Type assertion needed** - cast JSON to typed array: `const levels = data as Level[]`
- **Tests co-located** - place `levelHelpers.test.ts` next to `levelHelpers.ts`
- **Vitest globals** - describe/it/expect available without import
- **Pokemon data exists** - Reference `src/data/pokemon.json` for move/type validation

### Project Structure After This Story

```
src/
├── data/
│   ├── pokemon.json          # EXISTS: 150 Gen 1 Pokemon
│   └── levels.json           # NEW: 9 hand-crafted levels
├── types/
│   ├── index.ts              # UPDATE: re-export Level types
│   ├── pokemon.ts            # EXISTS: Pokemon interface
│   └── level.ts              # NEW: Level, Criteria, CriteriaType
├── lib/
│   ├── utils.ts              # EXISTS: cn() utility
│   ├── pokemonHelpers.ts     # EXISTS: Pokemon helpers
│   ├── pokemonHelpers.test.ts # EXISTS: Pokemon tests
│   ├── levelHelpers.ts       # NEW: Level helpers
│   └── levelHelpers.test.ts  # NEW: Level tests
```

### Validation Checklist Before Marking Complete

- [ ] All 9 levels defined with unique id and name
- [ ] Each level has exactly 3 rows and 3 columns criteria
- [ ] Levels 1-3 use only 'type' criteria
- [ ] Levels 4-5 introduce 'evolution' or 'dual-type'
- [ ] Levels 6-9 include 'moveset' criteria
- [ ] All 9 levels are solvable with unique Gen 1 Pokemon
- [ ] TypeScript types compile without errors
- [ ] All tests pass (`npm run test`)
- [ ] Lint passes (`npm run lint`)
- [ ] Build succeeds (`npm run build`)

### References

- [Source: docs/architecture.md#Data-Architecture] - Level schema definition
- [Source: docs/architecture.md#Implementation-Patterns] - Naming conventions, file organization
- [Source: docs/prd.md#Level-System] - FR12-FR15 requirements, difficulty progression
- [Source: docs/project_context.md] - TypeScript rules, testing patterns
- [Source: docs/epics.md#Story-1.3] - Acceptance criteria
- [Source: docs/sprint-artifacts/1-2-create-pokemon-data-layer.md] - Previous story patterns
- [External: PokeAPI Pokemon Moves](https://pokeapi.co/docs/v2#moves) - Move reference

## Dev Agent Record

### Context Reference

- docs/architecture.md (primary architecture reference)
- docs/prd.md (requirements reference - FR12-FR15)
- docs/project_context.md (implementation rules)
- docs/epics.md (story acceptance criteria)
- docs/sprint-artifacts/1-2-create-pokemon-data-layer.md (previous story patterns and learnings)
- src/data/pokemon.json (reference for valid types, moves, evolution stages)

### Agent Model Used

Claude Opus 4.5 (claude-opus-4-5-20251101)

### Debug Log References

None - implementation proceeded without issues.

### Completion Notes List

- Created Level TypeScript types (CriteriaType, Criteria, Level interfaces) in `src/types/level.ts`
- Designed and implemented 9 hand-crafted levels with progressive difficulty:
  - Levels 1-3: Single-type criteria only (Grass/Poison/Bug, Water/Ice/Psychic, Bug/Flying/Poison)
  - Levels 4-5: Introduces BOTH dual-type AND evolution criteria per AC #5
    - Level 4: Grass/Poison dual-type row + evolution columns
    - Level 5: Rock/Ground dual-type row + evolution columns
  - Levels 6-9: Includes moveset criteria (toxic, rest, earthquake, psychic, dreamEater, hyperBeam, thunderbolt)
- All levels designed to be solvable with Gen 1 Pokemon (verified dual-type combinations exist for cross-type intersections)
- Implemented helper functions following existing pokemonHelpers pattern
- Added comprehensive unit tests covering all ACs (14 tests total)
- All 78 tests pass, lint passes (0 errors), build succeeds

**Code Review Fixes (2025-12-12):**
- Fixed AC #5 violation: Added dual-type criteria to levels 4 and 5
- Updated test to verify BOTH dual-type AND evolution criteria (not just OR)
- Verified all 9 levels remain solvable after changes

### File List

- `src/types/level.ts` (NEW) - Level, Criteria, CriteriaType type definitions
- `src/types/index.ts` (MODIFIED) - Added Level type exports
- `src/data/levels.json` (NEW) - 9 hand-crafted puzzle levels
- `src/lib/levelHelpers.ts` (NEW) - getLevelById, getAllLevels, getLevelCount functions
- `src/lib/levelHelpers.test.ts` (NEW) - 14 unit tests for level helpers

## Change Log

| Date | Change | Author |
|------|--------|--------|
| 2025-12-12 | Story created via create-story workflow - comprehensive context for Level data layer implementation | SM Agent (Claude Opus 4.5) |
| 2025-12-12 | Story implementation complete - 9 levels, types, helpers, tests all passing | Dev Agent (Claude Opus 4.5) |
| 2025-12-12 | Code review fixes: Added dual-type criteria to levels 4-5 (AC #5), updated test to verify both dual-type AND evolution | Code Review (Claude Opus 4.5) |
