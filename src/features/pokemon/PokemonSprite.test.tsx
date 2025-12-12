import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { PokemonSprite } from './PokemonSprite';

describe('PokemonSprite', () => {
  describe('URL generation', () => {
    it('generates correct sprite URL for Pokemon ID', () => {
      render(<PokemonSprite pokemonId={1} />);
      const img = screen.getByRole('img');
      expect(img).toHaveAttribute('src', expect.stringContaining('/1.png'));
    });

    it('generates correct URL for Mew (#150)', () => {
      render(<PokemonSprite pokemonId={150} />);
      const img = screen.getByRole('img');
      expect(img).toHaveAttribute('src', expect.stringContaining('/150.png'));
    });
  });

  describe('alt text', () => {
    it('includes Pokemon name in alt text', () => {
      render(<PokemonSprite pokemonId={1} />);
      const img = screen.getByRole('img');
      expect(img).toHaveAttribute('alt', 'Bulbasaur sprite');
    });

    it('includes Pokemon name for Pikachu', () => {
      render(<PokemonSprite pokemonId={25} />);
      const img = screen.getByRole('img');
      expect(img).toHaveAttribute('alt', 'Pikachu sprite');
    });

    it('uses fallback alt for invalid Pokemon ID', () => {
      render(<PokemonSprite pokemonId={999} />);
      const img = screen.getByRole('img');
      expect(img).toHaveAttribute('alt', 'Pokemon #999 sprite');
    });
  });

  describe('loading state', () => {
    it('shows loading state initially', () => {
      render(<PokemonSprite pokemonId={1} />);
      const container = screen.getByRole('img').parentElement;
      expect(container?.querySelector('.animate-pulse')).toBeInTheDocument();
    });

    it('hides loading state after image loads', async () => {
      render(<PokemonSprite pokemonId={1} />);
      const img = screen.getByRole('img');

      fireEvent.load(img);

      await waitFor(() => {
        const container = img.parentElement;
        expect(
          container?.querySelector('.animate-pulse')
        ).not.toBeInTheDocument();
      });
    });
  });

  describe('error state', () => {
    it('shows error fallback when image fails to load', async () => {
      render(<PokemonSprite pokemonId={1} />);
      const img = screen.getByRole('img');

      fireEvent.error(img);

      await waitFor(() => {
        expect(screen.getByText('?')).toBeInTheDocument();
      });
    });

    it('error fallback has accessible label', async () => {
      render(<PokemonSprite pokemonId={1} />);
      const img = screen.getByRole('img');

      fireEvent.error(img);

      await waitFor(() => {
        const fallback = screen.getByRole('img');
        expect(fallback).toHaveAttribute('aria-label', 'Bulbasaur sprite');
      });
    });
  });

  describe('size variants', () => {
    it('applies small size classes', () => {
      render(<PokemonSprite pokemonId={1} size="sm" />);
      const img = screen.getByRole('img');
      expect(img).toHaveClass('w-8', 'h-8');
    });

    it('applies medium size classes by default', () => {
      render(<PokemonSprite pokemonId={1} />);
      const img = screen.getByRole('img');
      expect(img).toHaveClass('w-12', 'h-12');
    });

    it('applies large size classes', () => {
      render(<PokemonSprite pokemonId={1} size="lg" />);
      const img = screen.getByRole('img');
      expect(img).toHaveClass('w-16', 'h-16');
    });
  });

  describe('custom className', () => {
    it('applies custom className to container', () => {
      render(<PokemonSprite pokemonId={1} className="my-custom-class" />);
      const container = screen.getByRole('img').parentElement;
      expect(container).toHaveClass('my-custom-class');
    });
  });
});
