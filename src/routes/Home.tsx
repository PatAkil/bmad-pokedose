import { Link } from 'react-router'
import { Button } from '@/components/ui/button'

export function Home() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-foreground mb-4">
          BMAD Pokedex
        </h1>
        <p className="text-lg text-muted-foreground mb-6">
          A Pokemon puzzle game
        </p>
        <Button asChild>
          <Link to="/game">Start Game</Link>
        </Button>
      </div>
    </div>
  )
}
