import { describe, it, expect } from 'vitest'
import { render, screen } from '@/test/testUtils'
import { Home } from './Home'

describe('Home', () => {
  it('renders the title', () => {
    render(<Home />)
    expect(screen.getByRole('heading', { name: /bmad pokedex/i })).toBeInTheDocument()
  })

  it('renders the start game button', () => {
    render(<Home />)
    expect(screen.getByRole('link', { name: /start game/i })).toBeInTheDocument()
  })
})
