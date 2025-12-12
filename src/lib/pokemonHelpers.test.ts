import { describe, it, expect } from 'vitest';
import { getPokemonById, getAllPokemon, getPokemonByName } from './pokemonHelpers';

describe('pokemonHelpers', () => {
  describe('getPokemonById', () => {
    it('returns Bulbasaur for id 1', () => {
      const pokemon = getPokemonById(1);
      expect(pokemon).toBeDefined();
      expect(pokemon?.name).toBe('Bulbasaur');
      expect(pokemon?.id).toBe(1);
    });

    it('returns Mewtwo for id 150', () => {
      const pokemon = getPokemonById(150);
      expect(pokemon).toBeDefined();
      expect(pokemon?.name).toBe('Mewtwo');
    });

    it('returns undefined for id 0', () => {
      expect(getPokemonById(0)).toBeUndefined();
    });

    it('returns undefined for id 151', () => {
      expect(getPokemonById(151)).toBeUndefined();
    });

    it('returns undefined for negative id', () => {
      expect(getPokemonById(-1)).toBeUndefined();
    });
  });

  describe('getAllPokemon', () => {
    it('contains exactly 150 Pokemon', () => {
      expect(getAllPokemon()).toHaveLength(150);
    });

    it('returns Pokemon in Pokedex order', () => {
      const pokemon = getAllPokemon();
      expect(pokemon[0].id).toBe(1);
      expect(pokemon[0].name).toBe('Bulbasaur');
      expect(pokemon[149].id).toBe(150);
      expect(pokemon[149].name).toBe('Mewtwo');
    });

    it('returns a new array each time (immutable)', () => {
      const first = getAllPokemon();
      const second = getAllPokemon();
      expect(first).not.toBe(second);
      expect(first).toEqual(second);
      // Mutating one should not affect the other
      first.pop();
      expect(first).toHaveLength(149);
      expect(second).toHaveLength(150);
    });
  });

  describe('getPokemonByName', () => {
    it('returns Pokemon by exact name', () => {
      const pokemon = getPokemonByName('Pikachu');
      expect(pokemon).toBeDefined();
      expect(pokemon?.id).toBe(25);
    });

    it('is case-insensitive', () => {
      expect(getPokemonByName('pikachu')?.id).toBe(25);
      expect(getPokemonByName('PIKACHU')?.id).toBe(25);
      expect(getPokemonByName('PiKaChU')?.id).toBe(25);
    });

    it('returns undefined for unknown name', () => {
      expect(getPokemonByName('NotAPokemon')).toBeUndefined();
    });

    it('returns undefined for null or empty input', () => {
      expect(getPokemonByName(null as unknown as string)).toBeUndefined();
      expect(getPokemonByName(undefined as unknown as string)).toBeUndefined();
      expect(getPokemonByName('')).toBeUndefined();
    });
  });

  describe('data integrity', () => {
    it('each Pokemon has all required fields', () => {
      getAllPokemon().forEach((pokemon) => {
        expect(pokemon).toHaveProperty('id');
        expect(pokemon).toHaveProperty('name');
        expect(pokemon).toHaveProperty('types');
        expect(pokemon).toHaveProperty('evolutionStage');
        expect(pokemon).toHaveProperty('moves');

        // Type checks
        expect(typeof pokemon.id).toBe('number');
        expect(typeof pokemon.name).toBe('string');
        expect(Array.isArray(pokemon.types)).toBe(true);
        expect(typeof pokemon.evolutionStage).toBe('string');
        expect(Array.isArray(pokemon.moves)).toBe(true);
      });
    });

    it('each Pokemon has at least one type', () => {
      getAllPokemon().forEach((pokemon) => {
        expect(pokemon.types.length).toBeGreaterThanOrEqual(1);
      });
    });

    it('each Pokemon has at least one move', () => {
      getAllPokemon().forEach((pokemon) => {
        expect(pokemon.moves.length).toBeGreaterThanOrEqual(1);
      });
    });

    it('evolution stages are valid values', () => {
      const validStages = ['basic', 'stage1', 'stage2'];
      getAllPokemon().forEach((pokemon) => {
        expect(validStages).toContain(pokemon.evolutionStage);
      });
    });

    it('all Pokemon IDs are unique', () => {
      const ids = getAllPokemon().map((p) => p.id);
      const uniqueIds = [...new Set(ids)];
      expect(uniqueIds.length).toBe(ids.length);
    });

    it('all Pokemon IDs are in range 1-150', () => {
      getAllPokemon().forEach((pokemon) => {
        expect(pokemon.id).toBeGreaterThanOrEqual(1);
        expect(pokemon.id).toBeLessThanOrEqual(150);
      });
    });
  });

  describe('type accuracy', () => {
    it('Bulbasaur is grass/poison', () => {
      const pokemon = getPokemonById(1);
      expect(pokemon?.types).toEqual(['grass', 'poison']);
    });

    it('Charizard is fire/flying', () => {
      const pokemon = getPokemonById(6);
      expect(pokemon?.types).toEqual(['fire', 'flying']);
    });

    it('Pikachu is electric (single type)', () => {
      const pokemon = getPokemonById(25);
      expect(pokemon?.types).toEqual(['electric']);
    });

    it('Gyarados is water/flying', () => {
      const pokemon = getPokemonById(130);
      expect(pokemon?.types).toEqual(['water', 'flying']);
    });

    it('Dragonite is dragon/flying', () => {
      const pokemon = getPokemonById(149);
      expect(pokemon?.types).toEqual(['dragon', 'flying']);
    });

    it('Mewtwo is psychic (single type)', () => {
      const pokemon = getPokemonById(150);
      expect(pokemon?.types).toEqual(['psychic']);
    });

    // Gen 1 type accuracy tests - these Pokemon had different types in later gens
    it('Clefairy is normal in Gen 1 (not fairy)', () => {
      const pokemon = getPokemonById(35);
      expect(pokemon?.types).toEqual(['normal']);
    });

    it('Magnemite is electric in Gen 1 (not electric/steel)', () => {
      const pokemon = getPokemonById(81);
      expect(pokemon?.types).toEqual(['electric']);
    });

    it('Mr. Mime is psychic in Gen 1 (not psychic/fairy)', () => {
      const pokemon = getPokemonById(122);
      expect(pokemon?.types).toEqual(['psychic']);
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

    it('Pikachu is basic (pre-evolution exists but is Gen 2)', () => {
      expect(getPokemonById(25)?.evolutionStage).toBe('basic');
    });

    it('Raichu is stage1', () => {
      expect(getPokemonById(26)?.evolutionStage).toBe('stage1');
    });

    it('Eevee is basic', () => {
      expect(getPokemonById(133)?.evolutionStage).toBe('basic');
    });

    it('Eevee evolutions are stage1', () => {
      expect(getPokemonById(134)?.evolutionStage).toBe('stage1'); // Vaporeon
      expect(getPokemonById(135)?.evolutionStage).toBe('stage1'); // Jolteon
      expect(getPokemonById(136)?.evolutionStage).toBe('stage1'); // Flareon
    });

    it('legendary Pokemon without evolution are basic', () => {
      expect(getPokemonById(144)?.evolutionStage).toBe('basic'); // Articuno
      expect(getPokemonById(145)?.evolutionStage).toBe('basic'); // Zapdos
      expect(getPokemonById(146)?.evolutionStage).toBe('basic'); // Moltres
      expect(getPokemonById(150)?.evolutionStage).toBe('basic'); // Mewtwo
    });

    it('single-stage Pokemon are basic', () => {
      expect(getPokemonById(83)?.evolutionStage).toBe('basic'); // Farfetch'd
      expect(getPokemonById(115)?.evolutionStage).toBe('basic'); // Kangaskhan
      expect(getPokemonById(128)?.evolutionStage).toBe('basic'); // Tauros
      expect(getPokemonById(131)?.evolutionStage).toBe('basic'); // Lapras
      expect(getPokemonById(132)?.evolutionStage).toBe('basic'); // Ditto
    });
  });

  describe('move data', () => {
    it('Bulbasaur can learn grass moves', () => {
      const pokemon = getPokemonById(1);
      expect(pokemon?.moves).toContain('vineWhip');
      expect(pokemon?.moves).toContain('razorLeaf');
      expect(pokemon?.moves).toContain('solarBeam');
    });

    it('Charizard can learn fire moves', () => {
      const pokemon = getPokemonById(6);
      expect(pokemon?.moves).toContain('ember');
      expect(pokemon?.moves).toContain('flamethrower');
      expect(pokemon?.moves).toContain('fireBlast');
    });

    it('Pikachu can learn electric moves', () => {
      const pokemon = getPokemonById(25);
      expect(pokemon?.moves).toContain('thunderShock');
      expect(pokemon?.moves).toContain('thunder');
      expect(pokemon?.moves).toContain('thunderbolt');
    });

    it('all move names are camelCase strings', () => {
      getAllPokemon().forEach((pokemon) => {
        pokemon.moves.forEach((move) => {
          expect(typeof move).toBe('string');
          expect(move.length).toBeGreaterThan(0);
          // Check no hyphens (should be camelCase)
          expect(move).not.toContain('-');
        });
      });
    });
  });
});
