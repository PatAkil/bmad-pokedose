import { Link } from 'react-router'
import { Button } from '@/components/ui/button'

export function Game() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-foreground mb-4">
          Game Screen
        </h1>
        <p className="text-muted-foreground mb-6">
          Puzzle grid will be implemented here
        </p>
        <Button variant="outline" asChild>
          <Link to="/">Back to Home</Link>
        </Button>
      </div>
    </div>
  )
}
