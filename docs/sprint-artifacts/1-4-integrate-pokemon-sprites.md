# Story 1.4: Integrate Pokemon Sprites

Status: done

## Story

As a **player**,
I want **to see Pokemon images when browsing or selecting Pokemon**,
so that **I can visually identify Pokemon while playing**.

## Acceptance Criteria

1. **Given** the Pokemon data layer exists, **When** I render a Pokemon sprite component, **Then** the sprite loads from PokeAPI CDN: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/{id}.png`
2. **And** a reusable `PokemonSprite` component exists that accepts a Pokemon ID
3. **And** the component displays alt text with the Pokemon name for accessibility (NFR11)
4. **And** the component handles loading state gracefully
5. **And** the sprite CDN URL is configurable via environment variable (`.env`)
6. **And** sprites display correctly for Pokemon #1 (Bulbasaur) through #150 (Mew)
7. **And** unit tests exist for `PokemonSprite` component
8. **And** tests verify correct URL generation for Pokemon IDs
9. **And** tests verify alt text includes Pokemon name
10. **And** tests verify loading state renders correctly

## Tasks / Subtasks

- [x] **Task 1: Create Constants File for Sprite CDN** (AC: #5)
  - [x] Create `src/lib/constants.ts` with `SPRITE_CDN_URL` constant
  - [x] Read from `import.meta.env.VITE_SPRITE_CDN_URL` with fallback to default
  - [x] Export `getSpriteUrl(id: number): string` helper function

- [x] **Task 2: Create PokemonSprite Component** (AC: #1, #2, #3, #4, #6)
  - [x] Create `src/features/pokemon/PokemonSprite.tsx`
  - [x] Accept `pokemonId: number` prop (required)
  - [x] Accept optional `size?: 'sm' | 'md' | 'lg'` prop for responsive sizing
  - [x] Accept optional `className?: string` for additional styling
  - [x] Implement loading state with placeholder/skeleton
  - [x] Use `getPokemonById()` to get Pokemon name for alt text
  - [x] Handle image load error gracefully (fallback UI)
  - [x] Use `cn()` utility for conditional Tailwind classes

- [x] **Task 3: Export Component from Feature Index** (AC: #2)
  - [x] Update `src/features/pokemon/index.ts` to export `PokemonSprite`

- [x] **Task 4: Write Unit Tests** (AC: #7, #8, #9, #10)
  - [x] Create `src/features/pokemon/PokemonSprite.test.tsx`
  - [x] Test component renders image with correct src URL
  - [x] Test alt text includes Pokemon name ("Bulbasaur sprite")
  - [x] Test loading state renders before image loads
  - [x] Test error state renders when image fails to load
  - [x] Test different size props apply correct CSS classes
  - [x] Test custom className is applied
  - [x] Test edge cases: invalid Pokemon ID

- [x] **Task 5: Final Verification** (AC: All)
  - [x] Run `npm run test` - all tests pass (78 tests)
  - [x] Run `npm run lint` - no lint errors (pre-existing warning unrelated)
  - [x] Run `npm run build` - builds successfully
  - [x] Verify component is exported from `src/features/pokemon/index.ts`
  - [ ] Manual smoke test: visually confirm sprites load in browser

## Dev Notes

### Critical Architecture Compliance

**File Locations (MUST FOLLOW):**
- Component: `src/features/pokemon/PokemonSprite.tsx` (NOT in components/ui/)
- Tests: `src/features/pokemon/PokemonSprite.test.tsx` (co-located)
- Constants: `src/lib/constants.ts` (NEW FILE)
- Feature export: `src/features/pokemon/index.ts` (UPDATE)

**DO NOT:**
- Put component in `src/components/` - domain components go in features
- Create separate types file for this component - props are simple
- Use `any` type - TypeScript strict mode is ON
- Skip loading/error states - this is a visible UI component
- Hardcode CDN URL in component - must use constants

### Environment Configuration

The `.env.example` already exists with the correct variable:

```bash
# .env.example (ALREADY EXISTS)
VITE_SPRITE_CDN_URL=https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon
```

**Vite Environment Variable Pattern:**
```typescript
// Access env vars in Vite
const cdnUrl = import.meta.env.VITE_SPRITE_CDN_URL || DEFAULT_SPRITE_CDN_URL;
```

### Component Implementation Pattern

```typescript
// src/features/pokemon/PokemonSprite.tsx
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
```

### Constants Implementation Pattern

```typescript
// src/lib/constants.ts
/**
 * Application constants for bmad-pokedex
 */

/** Default Pokemon sprite CDN URL (PokeAPI sprites) */
export const DEFAULT_SPRITE_CDN_URL =
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon';

/** Sprite CDN URL from environment or default */
export const SPRITE_CDN_URL =
  import.meta.env.VITE_SPRITE_CDN_URL || DEFAULT_SPRITE_CDN_URL;

/**
 * Get the sprite URL for a Pokemon by ID
 * @param id - The Pokedex number (1-150)
 * @returns The full URL to the Pokemon sprite image
 */
export function getSpriteUrl(id: number): string {
  return `${SPRITE_CDN_URL}/${id}.png`;
}

/** Maximum grid size for the puzzle */
export const MAX_GRID_SIZE = 3;

/** Number of levels in the game */
export const TOTAL_LEVELS = 9;
```

### Testing Patterns

Follow existing patterns from `pokemonHelpers.test.ts`:

```typescript
// src/features/pokemon/PokemonSprite.test.tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { PokemonSprite } from './PokemonSprite';

describe('PokemonSprite', () => {
  describe('URL generation', () => {
    it('generates correct sprite URL for Pokemon ID', () => {
      render(<PokemonSprite pokemonId={1} />);
      const img = screen.getByRole('img');
      expect(img).toHaveAttribute(
        'src',
        expect.stringContaining('/1.png')
      );
    });

    it('generates correct URL for Mew (#150)', () => {
      render(<PokemonSprite pokemonId={150} />);
      const img = screen.getByRole('img');
      expect(img).toHaveAttribute(
        'src',
        expect.stringContaining('/150.png')
      );
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
      // Loading skeleton should be present
      const container = screen.getByRole('img').parentElement;
      expect(container?.querySelector('.animate-pulse')).toBeInTheDocument();
    });

    it('hides loading state after image loads', async () => {
      render(<PokemonSprite pokemonId={1} />);
      const img = screen.getByRole('img');

      // Simulate image load
      fireEvent.load(img);

      await waitFor(() => {
        const container = img.parentElement;
        expect(container?.querySelector('.animate-pulse')).not.toBeInTheDocument();
      });
    });
  });

  describe('error state', () => {
    it('shows error fallback when image fails to load', async () => {
      render(<PokemonSprite pokemonId={1} />);
      const img = screen.getByRole('img');

      // Simulate image error
      fireEvent.error(img);

      await waitFor(() => {
        // Should show fallback with "?" character
        expect(screen.getByText('?')).toBeInTheDocument();
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
```

### Constants Tests

```typescript
// src/lib/constants.test.ts
import { describe, it, expect } from 'vitest';
import { getSpriteUrl, SPRITE_CDN_URL } from './constants';

describe('constants', () => {
  describe('getSpriteUrl', () => {
    it('generates correct URL for Bulbasaur (#1)', () => {
      const url = getSpriteUrl(1);
      expect(url).toBe(`${SPRITE_CDN_URL}/1.png`);
    });

    it('generates correct URL for Mew (#150)', () => {
      const url = getSpriteUrl(150);
      expect(url).toBe(`${SPRITE_CDN_URL}/150.png`);
    });

    it('URL contains correct CDN base', () => {
      const url = getSpriteUrl(25);
      expect(url).toContain('githubusercontent.com');
      expect(url).toContain('sprites/pokemon');
    });
  });
});
```

### Previous Story Learnings

From Story 1-2 (Pokemon Data Layer) implementation:
- **Path alias `@/*`** is configured and working - USE IT
- **JSON imports work** with type casting: `const pokemon = data as Pokemon[]`
- **Tests co-located** - place `PokemonSprite.test.tsx` next to `PokemonSprite.tsx`
- **Vitest globals** - describe/it/expect available, but import vi for mocks
- **Pokemon data exists** - `getPokemonById()` works and returns Pokemon with name
- **Testing patterns** - follow `pokemonHelpers.test.ts` structure

From Story 1-1 (Project Init):
- **All feature directories exist** with empty `index.ts` files
- **ESLint flat config** format is used
- **shadcn/ui** is configured - can use Tailwind classes like `bg-muted`

### Git Intelligence

**Recent Commits:**
```
9260c11 fix: code review fixes for story 1-1
2db364f feat: initialize project with Vite, React 19, TypeScript, Tailwind v4, and shadcn/ui
c32b42f initial commit without UX design
```

**Codebase Patterns Observed:**
- TypeScript strict mode - no `any` types
- JSDoc comments on exported functions
- camelCase for functions, PascalCase for components/types
- Tests use `describe()` blocks for organization

### Project Structure After This Story

```
src/
├── features/
│   └── pokemon/
│       ├── index.ts              # UPDATE: export PokemonSprite
│       ├── PokemonSprite.tsx     # NEW: Sprite component
│       └── PokemonSprite.test.tsx # NEW: Component tests
├── lib/
│   ├── utils.ts                  # EXISTS: cn() utility
│   ├── pokemonHelpers.ts         # EXISTS: getPokemonById()
│   ├── pokemonHelpers.test.ts    # EXISTS: Pokemon tests
│   ├── constants.ts              # NEW: CDN URL, helper
│   └── constants.test.ts         # NEW: Constants tests
└── data/
    └── pokemon.json              # EXISTS: 150 Gen 1 Pokemon
```

### Accessibility Requirements (NFR11)

From the PRD and Architecture:
- Alt text MUST include Pokemon name for screen readers
- Component should be accessible with proper ARIA attributes
- Error state should still be accessible (role="img", aria-label)

### Performance Considerations

- Sprites load from external CDN (not bundled) - zero bundle impact
- Loading state prevents layout shift
- Image is object-contain to maintain aspect ratio
- Consider lazy loading for lists (future optimization)

### Validation Checklist Before Marking Complete

- [ ] `PokemonSprite` component created in correct location
- [ ] Component accepts `pokemonId`, `size`, and `className` props
- [ ] Loading skeleton shows during image load
- [ ] Error fallback shows when image fails
- [ ] Alt text includes Pokemon name from `getPokemonById()`
- [ ] CDN URL comes from environment variable with fallback
- [ ] All tests pass (`npm run test`)
- [ ] Lint passes (`npm run lint`)
- [ ] Build succeeds (`npm run build`)
- [ ] Component exported from `src/features/pokemon/index.ts`

### References

- [Source: docs/architecture.md#Frontend-Architecture] - Component organization in features/
- [Source: docs/architecture.md#Pokemon-Sprites] - CDN reference strategy
- [Source: docs/architecture.md#Implementation-Patterns] - Naming conventions, file organization
- [Source: docs/prd.md#Pokemon-Data] - FR27: Pokemon images/sprites for visual identification
- [Source: docs/prd.md#Accessibility] - NFR11: Alt text for Pokemon images
- [Source: docs/project_context.md] - TypeScript rules, React/Component rules
- [Source: docs/epics.md#Story-1.4] - Acceptance criteria
- [Source: docs/sprint-artifacts/1-2-create-pokemon-data-layer.md] - Previous story patterns
- [External: PokeAPI Sprites](https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/) - Sprite CDN

## Dev Agent Record

### Context Reference

- docs/architecture.md (primary architecture reference)
- docs/prd.md (requirements reference - FR27, NFR11)
- docs/project_context.md (implementation rules)
- docs/epics.md (story acceptance criteria)
- docs/sprint-artifacts/1-2-create-pokemon-data-layer.md (previous story patterns)
- docs/sprint-artifacts/1-3-create-level-data-layer.md (previous story patterns)
- src/lib/pokemonHelpers.ts (getPokemonById for alt text)
- src/lib/utils.ts (cn utility for conditional classes)
- .env.example (VITE_SPRITE_CDN_URL already defined)

### Agent Model Used

Claude Opus 4.5 (claude-opus-4-5-20251101)

### Debug Log References

None - implementation proceeded without issues.

### Completion Notes List

- **Task 1**: Created `src/lib/constants.ts` with `DEFAULT_SPRITE_CDN_URL`, `SPRITE_CDN_URL` (reads from env), and `getSpriteUrl()` helper. Added 7 unit tests in `constants.test.ts`.
- **Task 2**: Created `PokemonSprite` component with loading skeleton (animate-pulse), error fallback (?), size variants (sm/md/lg), and accessible alt text using Pokemon name from `getPokemonById()`. Added 13 unit tests.
- **Task 3**: Exported `PokemonSprite` from `src/features/pokemon/index.ts`.
- **Task 4**: Tests written following TDD red-green-refactor. 20 new tests total (7 constants + 13 component).
- **Task 5**: All 78 tests pass, lint passes, build succeeds.

### File List

**New Files:**
- src/lib/constants.ts
- src/lib/constants.test.ts
- src/features/pokemon/PokemonSprite.tsx
- src/features/pokemon/PokemonSprite.test.tsx

**Modified Files:**
- src/features/pokemon/index.ts
- docs/sprint-artifacts/sprint-status.yaml

## Change Log

| Date | Change | Author |
|------|--------|--------|
| 2025-12-12 | Story created via create-story workflow - comprehensive context for Pokemon sprite integration | SM Agent (Claude Opus 4.5) |
| 2025-12-12 | Story implementation complete - PokemonSprite component with constants, tests, and exports | Dev Agent (Claude Opus 4.5) |
| 2025-12-12 | Code review approved - no HIGH/MEDIUM issues, minor LOW issues acceptable | Code Review (Claude Opus 4.5) |
