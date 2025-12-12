/**
 * Script to fetch complete Gen 1 Pokemon data from PokeAPI
 * Run with: node scripts/fetch-pokemon-data.mjs
 */

const GEN1_COUNT = 150;

// Evolution stage mapping for Gen 1 Pokemon
const evolutionStages = {
  // Bulbasaur line
  1: 'basic', 2: 'stage1', 3: 'stage2',
  // Charmander line
  4: 'basic', 5: 'stage1', 6: 'stage2',
  // Squirtle line
  7: 'basic', 8: 'stage1', 9: 'stage2',
  // Caterpie line
  10: 'basic', 11: 'stage1', 12: 'stage2',
  // Weedle line
  13: 'basic', 14: 'stage1', 15: 'stage2',
  // Pidgey line
  16: 'basic', 17: 'stage1', 18: 'stage2',
  // Rattata line
  19: 'basic', 20: 'stage1',
  // Spearow line
  21: 'basic', 22: 'stage1',
  // Ekans line
  23: 'basic', 24: 'stage1',
  // Pikachu line
  25: 'basic', 26: 'stage1',
  // Sandshrew line
  27: 'basic', 28: 'stage1',
  // Nidoran F line
  29: 'basic', 30: 'stage1', 31: 'stage2',
  // Nidoran M line
  32: 'basic', 33: 'stage1', 34: 'stage2',
  // Clefairy line
  35: 'basic', 36: 'stage1',
  // Vulpix line
  37: 'basic', 38: 'stage1',
  // Jigglypuff line
  39: 'basic', 40: 'stage1',
  // Zubat line
  41: 'basic', 42: 'stage1',
  // Oddish line
  43: 'basic', 44: 'stage1', 45: 'stage2',
  // Paras line
  46: 'basic', 47: 'stage1',
  // Venonat line
  48: 'basic', 49: 'stage1',
  // Diglett line
  50: 'basic', 51: 'stage1',
  // Meowth line
  52: 'basic', 53: 'stage1',
  // Psyduck line
  54: 'basic', 55: 'stage1',
  // Mankey line
  56: 'basic', 57: 'stage1',
  // Growlithe line
  58: 'basic', 59: 'stage1',
  // Poliwag line
  60: 'basic', 61: 'stage1', 62: 'stage2',
  // Abra line
  63: 'basic', 64: 'stage1', 65: 'stage2',
  // Machop line
  66: 'basic', 67: 'stage1', 68: 'stage2',
  // Bellsprout line
  69: 'basic', 70: 'stage1', 71: 'stage2',
  // Tentacool line
  72: 'basic', 73: 'stage1',
  // Geodude line
  74: 'basic', 75: 'stage1', 76: 'stage2',
  // Ponyta line
  77: 'basic', 78: 'stage1',
  // Slowpoke line
  79: 'basic', 80: 'stage1',
  // Magnemite line
  81: 'basic', 82: 'stage1',
  // Farfetch'd - no evolution
  83: 'basic',
  // Doduo line
  84: 'basic', 85: 'stage1',
  // Seel line
  86: 'basic', 87: 'stage1',
  // Grimer line
  88: 'basic', 89: 'stage1',
  // Shellder line
  90: 'basic', 91: 'stage1',
  // Gastly line
  92: 'basic', 93: 'stage1', 94: 'stage2',
  // Onix - no evolution in Gen 1
  95: 'basic',
  // Drowzee line
  96: 'basic', 97: 'stage1',
  // Krabby line
  98: 'basic', 99: 'stage1',
  // Voltorb line
  100: 'basic', 101: 'stage1',
  // Exeggcute line
  102: 'basic', 103: 'stage1',
  // Cubone line
  104: 'basic', 105: 'stage1',
  // Hitmonlee, Hitmonchan - no evolution
  106: 'basic', 107: 'basic',
  // Lickitung - no evolution in Gen 1
  108: 'basic',
  // Koffing line
  109: 'basic', 110: 'stage1',
  // Rhyhorn line
  111: 'basic', 112: 'stage1',
  // Chansey - no evolution in Gen 1
  113: 'basic',
  // Tangela - no evolution in Gen 1
  114: 'basic',
  // Kangaskhan - no evolution
  115: 'basic',
  // Horsea line
  116: 'basic', 117: 'stage1',
  // Goldeen line
  118: 'basic', 119: 'stage1',
  // Staryu line
  120: 'basic', 121: 'stage1',
  // Mr. Mime - no evolution in Gen 1
  122: 'basic',
  // Scyther - no evolution in Gen 1
  123: 'basic',
  // Jynx - no evolution in Gen 1
  124: 'basic',
  // Electabuzz - no evolution in Gen 1
  125: 'basic',
  // Magmar - no evolution in Gen 1
  126: 'basic',
  // Pinsir - no evolution
  127: 'basic',
  // Tauros - no evolution
  128: 'basic',
  // Magikarp line
  129: 'basic', 130: 'stage1',
  // Lapras - no evolution
  131: 'basic',
  // Ditto - no evolution
  132: 'basic',
  // Eevee and evolutions
  133: 'basic', 134: 'stage1', 135: 'stage1', 136: 'stage1',
  // Porygon - no evolution in Gen 1
  137: 'basic',
  // Omanyte line
  138: 'basic', 139: 'stage1',
  // Kabuto line
  140: 'basic', 141: 'stage1',
  // Aerodactyl - no evolution
  142: 'basic',
  // Snorlax - no evolution in Gen 1
  143: 'basic',
  // Legendary birds
  144: 'basic', 145: 'basic', 146: 'basic',
  // Dratini line
  147: 'basic', 148: 'stage1', 149: 'stage2',
  // Mewtwo, Mew
  150: 'basic',
};

function toCamelCase(str) {
  return str
    .split('-')
    .map((word, index) =>
      index === 0 ? word.toLowerCase() : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    )
    .join('');
}

async function fetchPokemon(id) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const data = await response.json();

  // Get types
  const types = data.types
    .sort((a, b) => a.slot - b.slot)
    .map(t => t.type.name);

  // Get Gen 1 moves (red-blue or yellow)
  const gen1Moves = data.moves
    .filter(m =>
      m.version_group_details.some(v =>
        v.version_group.name === 'red-blue' || v.version_group.name === 'yellow'
      )
    )
    .map(m => toCamelCase(m.move.name));

  // Remove duplicates
  const uniqueMoves = [...new Set(gen1Moves)];

  return {
    id: data.id,
    name: data.name.charAt(0).toUpperCase() + data.name.slice(1),
    types,
    evolutionStage: evolutionStages[data.id] || 'basic',
    moves: uniqueMoves.sort()
  };
}

async function main() {
  console.log('Fetching Gen 1 Pokemon data from PokeAPI...');

  const pokemon = [];

  for (let i = 1; i <= GEN1_COUNT; i++) {
    try {
      const data = await fetchPokemon(i);
      pokemon.push(data);
      console.log(`Fetched ${i}/${GEN1_COUNT}: ${data.name} (${data.moves.length} moves)`);

      // Small delay to be nice to the API
      await new Promise(resolve => setTimeout(resolve, 100));
    } catch (error) {
      console.error(`Error fetching Pokemon ${i}:`, error.message);
    }
  }

  // Fix special names
  pokemon.forEach(p => {
    if (p.name === 'Nidoran-f') p.name = 'Nidoran♀';
    if (p.name === 'Nidoran-m') p.name = 'Nidoran♂';
    if (p.name === 'Mr-mime') p.name = 'MrMime';
    if (p.name === "Farfetch'd") p.name = 'Farfetchd';
  });

  console.log(`\nFetched ${pokemon.length} Pokemon`);
  console.log(JSON.stringify(pokemon, null, 2));
}

main();
