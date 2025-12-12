import { useState } from 'react';
import { cn } from '@/lib/utils';
import { getSpriteUrl } from '@/lib/constants';
import { getPokemonById } from '@/lib/pokemonHelpers';

interface PokemonSpriteProps {
  /** The Pokedex ID of the Pokemon (1-150) */
  pokemonId: number;
  /** Size variant for the sprite */
  size?: 'sm' | 'md' | 'lg';
  /** Additional CSS classes */
  className?: string;
}

const SIZE_CLASSES = {
  sm: 'w-8 h-8',
  md: 'w-12 h-12',
  lg: 'w-16 h-16',
} as const;

export function PokemonSprite({
  pokemonId,
  size = 'md',
  className,
}: PokemonSpriteProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const pokemon = getPokemonById(pokemonId);
  const spriteUrl = getSpriteUrl(pokemonId);
  const altText = pokemon ? `${pokemon.name} sprite` : `Pokemon #${pokemonId} sprite`;

  const handleLoad = () => setIsLoading(false);
  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  if (hasError) {
    return (
      <div
        className={cn(
          SIZE_CLASSES[size],
          'bg-muted rounded flex items-center justify-center text-muted-foreground text-xs',
          className
        )}
        role="img"
        aria-label={altText}
      >
        ?
      </div>
    );
  }

  return (
    <div className={cn(SIZE_CLASSES[size], 'relative', className)}>
      {isLoading && (
        <div
          className={cn(
            SIZE_CLASSES[size],
            'absolute inset-0 bg-muted rounded animate-pulse'
          )}
        />
      )}
      <img
        src={spriteUrl}
        alt={altText}
        className={cn(
          SIZE_CLASSES[size],
          'object-contain',
          isLoading && 'opacity-0'
        )}
        onLoad={handleLoad}
        onError={handleError}
      />
    </div>
  );
}
