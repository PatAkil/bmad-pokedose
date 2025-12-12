# Story 1.2: Create Pokemon Data Layer

Status: Done

## Story

As a **player**,
I want **the game to have accurate data for all 150 Gen 1 Pokemon**,
so that **I can trust the game's answers are correct when I play**.

## Acceptance Criteria

1. **Given** the project is initialized, **When** I access the Pokemon data layer, **Then** all 150 Gen 1 Pokemon are available (Bulbasaur #1 through Mewtwo #150)
2. **And** each Pokemon has: id (number), name (string), types (string array), evolutionStage ('basic' | 'stage1' | 'stage2'), moves (string array)
3. **And** type data is accurate (e.g., Bulbasaur is ['grass', 'poison'], Charizard is ['fire', 'flying'])
4. **And** evolution stages are accurate (e.g., Charmander is 'basic', Charmeleon is 'stage1', Charizard is 'stage2')
5. **And** move data includes Gen 1 learnable moves for each Pokemon
6. **And** TypeScript types are defined: `Pokemon`, `EvolutionStage`
7. **And** a helper function `getPokemonById(id: number): Pokemon` is available in `src/lib/pokemonHelpers.ts`
8. **And** unit tests exist for `getPokemonById()` helper function
9. **And** tests verify all 150 Pokemon are present with required fields
10. **And** tests validate type accuracy for sample Pokemon (Bulbasaur, Charizard, Pikachu)

## Tasks / Subtasks

- [x] **Task 1: Define Pokemon TypeScript Types** (AC: #6)
  - [x] Create `src/types/pokemon.ts` with `Pokemon` interface
  - [x] Define `EvolutionStage` type as `'basic' | 'stage1' | 'stage2'`
  - [x] Export types from `src/types/index.ts`

- [x] **Task 2: Create Pokemon JSON Data File** (AC: #1, #2, #3, #4, #5)
  - [x] Create `src/data/pokemon.json` with all 150 Gen 1 Pokemon
  - [x] Ensure each Pokemon has: id, name, types[], evolutionStage, moves[]
  - [x] Verify type accuracy for all Pokemon (use PokeAPI as reference)
  - [x] Verify evolution stages are correct for all Pokemon
  - [x] Include Gen 1 learnable moves for each Pokemon

- [x] **Task 3: Create Pokemon Helper Functions** (AC: #7)
  - [x] Create `src/lib/pokemonHelpers.ts`
  - [x] Implement `getPokemonById(id: number): Pokemon | undefined`
  - [x] Implement `getAllPokemon(): Pokemon[]` for browsing
  - [x] Implement `getPokemonByName(name: string): Pokemon | undefined` for search

- [x] **Task 4: Write Unit Tests** (AC: #8, #9, #10)
  - [x] Create `src/lib/pokemonHelpers.test.ts`
  - [x] Test `getPokemonById()` returns correct Pokemon
  - [x] Test `getPokemonById()` returns undefined for invalid IDs
  - [x] Test all 150 Pokemon are present in data
  - [x] Test each Pokemon has required fields (id, name, types, evolutionStage, moves)
  - [x] Test type accuracy: Bulbasaur ['grass', 'poison']
  - [x] Test type accuracy: Charizard ['fire', 'flying']
  - [x] Test type accuracy: Pikachu ['electric']
  - [x] Test evolution stages: Charmander 'basic', Charmeleon 'stage1', Charizard 'stage2'

- [x] **Task 5: Final Verification** (AC: All)
  - [x] Run `npm run test` - all tests pass
  - [x] Run `npm run lint` - no lint errors
  - [x] Run `npm run build` - builds successfully
  - [x] Verify types are exported correctly from `src/types/index.ts`

## Dev Notes

### Critical Architecture Compliance

**File Locations (MUST FOLLOW):**
- Types: `src/types/pokemon.ts` (NOT in features folder)
- Data: `src/data/pokemon.json` (bundled at build time)
- Helpers: `src/lib/pokemonHelpers.ts`
- Tests: `src/lib/pokemonHelpers.test.ts` (co-located with source)

**DO NOT:**
- Create files in wrong locations
- Make API calls to PokeAPI at runtime - all data is bundled
- Use `any` types - TypeScript strict mode is ON
- Skip tests - this is critical game data

### Pokemon Data Schema

```typescript
// src/types/pokemon.ts
export type EvolutionStage = 'basic' | 'stage1' | 'stage2';

export interface Pokemon {
  id: number;
  name: string;
  types: string[];
  evolutionStage: EvolutionStage;
  moves: string[];
}
```

### JSON Data Format

```json
{
  "id": 1,
  "name": "Bulbasaur",
  "types": ["grass", "poison"],
  "evolutionStage": "basic",
  "moves": ["tackle", "growl", "leechSeed", "vineWhip", "poisonPowder", "sleepPowder", "razorLeaf", "growth", "solarBeam"]
}
```

### Data Sourcing Strategy

**Option 1 (Recommended):** Use existing curated datasets:
- [Purukitto/pokemon-data.json](https://github.com/Purukitto/pokemon-data.json) - Updated Pokemon data with images
- [PokeAPI formatted JSON](https://gist.github.com/npentrel/06c2ad3b38cf4e155244cfb67efb3a9b) - MongoDB-ready format

**Option 2:** Manually curate from [PokeAPI](https://pokeapi.co/docs/v2):
- `/api/v2/pokemon/{id}` - Pokemon details, types, moves
- `/api/v2/pokemon-species/{id}` - Evolution chain info
- Filter to Gen 1 only (IDs 1-150)

**Important:** Whatever source you use, VERIFY accuracy of:
- Types (especially dual-types like Bulbasaur's grass/poison)
- Evolution stages (basic → stage1 → stage2)
- Move names should be camelCase for consistency

### Evolution Stage Logic

| Pokemon | Evolution Stage |
|---------|-----------------|
| No evolution OR first in chain | `basic` |
| First evolution (e.g., Charmeleon) | `stage1` |
| Final evolution (e.g., Charizard) | `stage2` |
| Single-stage Pokemon (e.g., Ditto) | `basic` |

**Edge Cases:**
- Eevee is `basic` (has multiple evolution paths)
- Legendaries without evolution (Mewtwo, Mew) are `basic`
- Pokemon that evolve from Gen 1 but evolution is Gen 2+ (e.g., Onix → Steelix) - mark as `basic` for MVP

### Helper Function Implementation

```typescript
// src/lib/pokemonHelpers.ts
import pokemonData from '@/data/pokemon.json';
import type { Pokemon } from '@/types';

const pokemon = pokemonData as Pokemon[];

export function getPokemonById(id: number): Pokemon | undefined {
  return pokemon.find((p) => p.id === id);
}

export function getAllPokemon(): Pokemon[] {
  return pokemon;
}

export function getPokemonByName(name: string): Pokemon | undefined {
  return pokemon.find(
    (p) => p.name.toLowerCase() === name.toLowerCase()
  );
}
```

### Testing Patterns

Follow existing test patterns from Story 1.1:

```typescript
// src/lib/pokemonHelpers.test.ts
import { describe, it, expect } from 'vitest';
import { getPokemonById, getAllPokemon } from './pokemonHelpers';

describe('pokemonHelpers', () => {
  describe('getPokemonById', () => {
    it('returns Bulbasaur for id 1', () => {
      const pokemon = getPokemonById(1);
      expect(pokemon).toBeDefined();
      expect(pokemon?.name).toBe('Bulbasaur');
    });

    it('returns undefined for invalid id', () => {
      expect(getPokemonById(0)).toBeUndefined();
      expect(getPokemonById(151)).toBeUndefined();
    });
  });

  describe('data integrity', () => {
    it('contains exactly 150 Pokemon', () => {
      expect(getAllPokemon()).toHaveLength(150);
    });

    it('each Pokemon has required fields', () => {
      getAllPokemon().forEach((p) => {
        expect(p).toHaveProperty('id');
        expect(p).toHaveProperty('name');
        expect(p).toHaveProperty('types');
        expect(p).toHaveProperty('evolutionStage');
        expect(p).toHaveProperty('moves');
        expect(p.types.length).toBeGreaterThanOrEqual(1);
        expect(p.moves.length).toBeGreaterThanOrEqual(1);
      });
    });
  });

  describe('type accuracy', () => {
    it('Bulbasaur is grass/poison', () => {
      const bulbasaur = getPokemonById(1);
      expect(bulbasaur?.types).toEqual(['grass', 'poison']);
    });

    it('Charizard is fire/flying', () => {
      const charizard = getPokemonById(6);
      expect(charizard?.types).toEqual(['fire', 'flying']);
    });

    it('Pikachu is electric', () => {
      const pikachu = getPokemonById(25);
      expect(pikachu?.types).toEqual(['electric']);
    });
  });

  describe('evolution stages', () => {
    it('Charmander is basic', () => {
      expect(getPokemonById(4)?.evolutionStage).toBe('basic');
    });

    it('Charmeleon is stage1', () => {
      expect(getPokemonById(5)?.evolutionStage).toBe('stage1');
    });

    it('Charizard is stage2', () => {
      expect(getPokemonById(6)?.evolutionStage).toBe('stage2');
    });
  });
});
```

### Previous Story Learnings (1.1)

From Story 1.1 implementation:
- **Path alias `@/*`** is configured - use for imports
- **Tests co-located** with source files
- **Vitest imports required** - import { describe, it, expect } from 'vitest' for TypeScript compilation
- **ESLint flat config** format is used
- **All feature directories exist** but are empty (index.ts only)

### Project Structure After This Story

```
src/
├── data/
│   └── pokemon.json          # NEW: 150 Gen 1 Pokemon
├── types/
│   ├── index.ts              # UPDATE: re-export Pokemon types
│   └── pokemon.ts            # NEW: Pokemon interface, EvolutionStage
├── lib/
│   ├── utils.ts              # EXISTS: cn() utility
│   ├── pokemonHelpers.ts     # NEW: getPokemonById, getAllPokemon
│   └── pokemonHelpers.test.ts # NEW: Unit tests
```

### Key Gen 1 Pokemon Reference (Sample)

| ID | Name | Types | Stage |
|----|------|-------|-------|
| 1 | Bulbasaur | grass, poison | basic |
| 4 | Charmander | fire | basic |
| 5 | Charmeleon | fire | stage1 |
| 6 | Charizard | fire, flying | stage2 |
| 25 | Pikachu | electric | basic |
| 26 | Raichu | electric | stage1 |
| 133 | Eevee | normal | basic |
| 149 | Dragonite | dragon, flying | stage2 |
| 150 | Mewtwo | psychic | basic |

### References

- [Source: docs/architecture.md#Data-Architecture] - Pokemon data schema and sourcing strategy
- [Source: docs/architecture.md#Implementation-Patterns] - Naming conventions, file organization
- [Source: docs/prd.md#Pokemon-Data] - FR26, FR27 requirements
- [Source: docs/project_context.md] - TypeScript rules, testing patterns
- [Source: docs/epics.md#Story-1.2] - Acceptance criteria
- [External: PokeAPI Documentation](https://pokeapi.co/docs/v2) - Pokemon data reference
- [External: pokemon-data.json](https://github.com/Purukitto/pokemon-data.json) - Pre-curated dataset option

## Dev Agent Record

### Context Reference

- docs/architecture.md (primary architecture reference)
- docs/prd.md (requirements reference - FR26, FR27)
- docs/project_context.md (implementation rules)
- docs/epics.md (story acceptance criteria)
- docs/sprint-artifacts/1-1-initialize-project-with-development-environment.md (previous story learnings)

### Agent Model Used

Claude Opus 4.5 (claude-opus-4-5-20251101)

### Debug Log References

- No issues encountered during implementation

### Completion Notes List

- Created `src/types/pokemon.ts` with `Pokemon` interface and `EvolutionStage` type
- Updated `src/types/index.ts` to re-export Pokemon types
- Created `src/data/pokemon.json` with all 150 Gen 1 Pokemon (IDs 1-150, Mewtwo is #150)
- **Complete Gen 1 movesets** fetched from PokeAPI - each Pokemon has 20-40+ learnable moves (level-up + TM/HM)
- Created `src/lib/pokemonHelpers.ts` with `getPokemonById`, `getAllPokemon`, `getPokemonByName` functions
- Created comprehensive test suite with 40 tests covering: helper functions, data integrity, type accuracy, evolution stages, move data
- All 44 tests pass (40 new + 4 existing)
- Lint passes (0 errors, 1 pre-existing warning from shadcn button)
- Build succeeds (307KB bundle - well under 500KB budget)
- Created utility script `scripts/fetch-pokemon-data.mjs` for fetching complete Pokemon data from PokeAPI

### File List

**New files:**
- src/types/pokemon.ts
- src/data/pokemon.json
- src/lib/pokemonHelpers.ts
- src/lib/pokemonHelpers.test.ts
- scripts/fetch-pokemon-data.mjs

**Modified files:**
- src/types/index.ts (added Pokemon type exports)

**Deleted files:**
- src/data/.gitkeep (replaced by pokemon.json)

## Change Log

| Date | Change | Author |
|------|--------|--------|
| 2025-12-12 | Story created via create-story workflow - comprehensive context for Pokemon data layer | SM Agent (Claude Opus 4.5) |
| 2025-12-12 | Implemented Pokemon data layer with complete Gen 1 data from PokeAPI, helper functions, and comprehensive test suite (35 tests) | Dev Agent (Claude Opus 4.5) |
| 2025-12-12 | **Code Review Fixes:** (1) Fixed Gen 1 type data - removed Fairy/Steel types that didn't exist in Gen 1 (Clefairy, Magnemite, Mr. Mime, etc.), (2) Fixed AC #1 typo (Mew→Mewtwo), (3) Added null input validation to getPokemonByName, (4) Made getAllPokemon return immutable copy, (5) Added 5 new tests for Gen 1 type accuracy and edge cases. Total: 44 tests passing. | Code Review Agent (Claude Opus 4.5) |
