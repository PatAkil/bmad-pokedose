/**
 * Game context and provider for puzzle grid state management
 * Provides centralized state access via useGame hook
 */

import { createContext, useContext, useReducer, type ReactNode, type Dispatch } from 'react';
import { gameReducer, createInitialState, type GameAction } from './gameReducer';
import type { GameState } from '@/types/game';

const GameContext = createContext<GameState | null>(null);
const GameDispatchContext = createContext<Dispatch<GameAction> | null>(null);

interface GameProviderProps {
  children: ReactNode;
}

/**
 * Provider component that wraps the app to provide game state
 */
export function GameProvider({ children }: GameProviderProps) {
  const [state, dispatch] = useReducer(gameReducer, null, createInitialState);

  return (
    <GameContext.Provider value={state}>
      <GameDispatchContext.Provider value={dispatch}>
        {children}
      </GameDispatchContext.Provider>
    </GameContext.Provider>
  );
}

/**
 * Hook to access game state and dispatch
 * Must be used within a GameProvider
 * @throws Error if used outside of GameProvider
 */
export function useGame() {
  const state = useContext(GameContext);
  const dispatch = useContext(GameDispatchContext);

  if (state === null || dispatch === null) {
    throw new Error('useGame must be used within a GameProvider');
  }

  return { state, dispatch };
}

// Re-export action creators for convenience
export {
  setSelectedCell,
  placePokemon,
  clearCell,
  resetGrid,
  setLevel,
} from './gameReducer';
