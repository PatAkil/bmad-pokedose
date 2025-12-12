// Game feature - state management and providers
export { GameProvider, useGame } from './GameContext';
export {
  setSelectedCell,
  placePokemon,
  clearCell,
  resetGrid,
  setLevel,
} from './GameContext';
export type { GameAction } from './gameReducer';
