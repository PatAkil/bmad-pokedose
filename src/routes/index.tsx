import { createBrowserRouter } from 'react-router'
import { Home } from './Home'
import { Game } from './Game'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/game',
    element: <Game />,
  },
])
