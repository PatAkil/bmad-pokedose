import { describe, it, expect } from 'vitest'
import { render, screen } from '@/test/testUtils'
import { Game } from './Game'

describe('Game', () => {
  it('renders the game screen title', () => {
    render(<Game />)
    expect(screen.getByRole('heading', { name: /game screen/i })).toBeInTheDocument()
  })

  it('renders the back to home link', () => {
    render(<Game />)
    expect(screen.getByRole('link', { name: /back to home/i })).toBeInTheDocument()
  })
})
