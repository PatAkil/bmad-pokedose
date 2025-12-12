import { RouterProvider } from 'react-router'
import { router } from '@/routes'
import { GameProvider } from '@/features/game'

function App() {
  return (
    <GameProvider>
      <RouterProvider router={router} />
    </GameProvider>
  )
}

export default App
