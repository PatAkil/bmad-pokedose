---
stepsCompleted: [1, 2, 3, 4]
status: complete
completedAt: '2025-12-12'
inputDocuments:
  - docs/prd.md
  - docs/architecture.md
---

# bmad-pokedex - Epic Breakdown

## Overview

This document provides the complete epic and story breakdown for bmad-pokedex, decomposing the requirements from the PRD, UX Design if it exists, and Architecture requirements into implementable stories.

## Requirements Inventory

### Functional Requirements

**Grid Puzzle Interface (FR1-FR5):**
- FR1: Player can view a 3x3 grid with 3 row criteria labels and 3 column criteria labels
- FR2: Player can select any empty cell in the grid to place a Pokemon
- FR3: Player can see which cell is currently selected
- FR4: Player can remove a Pokemon from a cell before submitting
- FR5: Player can view the criteria that apply to each cell (intersection of row + column)

**Pokemon Selection (FR6-FR11):**
- FR6: Player can browse all 150 Gen 1 Pokemon when selecting for a cell
- FR7: Player can search/filter Pokemon by name
- FR8: Player can see Pokemon details (name, type(s), evolution stage) when browsing
- FR9: Player can see which Pokemon are already used in the current grid (unavailable)
- FR10: Player can select a Pokemon to place in the currently selected cell
- FR11: System enforces unique picks - each Pokemon can only be used once per grid

**Level System (FR12-FR15):**
- FR12: Player can view a list of all 9 levels
- FR13: Player can see which levels are completed
- FR14: Player can select and play any level (no unlock gating for MVP)
- FR15: System presents different criteria types based on level difficulty:
  - Levels 1-3: Basic single types
  - Levels 4-5: Dual-types, evolution stages
  - Levels 6-9: Movesets, combined criteria

**Validation & Feedback (FR16-FR21):**
- FR16: Player can submit a completed grid (all 9 cells filled) for validation
- FR17: System validates each cell against both row AND column criteria
- FR18: Player can see which cells are correct (green) and incorrect (red) after submission
- FR19: Player can retry the level after an incorrect submission
- FR20: Player can see a success state when all 9 cells are correct
- FR21: System marks level as completed when player succeeds

**Navigation & Game Flow (FR22-FR25):**
- FR22: Player can navigate from level selection to puzzle view
- FR23: Player can return to level selection from puzzle view
- FR24: Player can see their overall progress (X of 9 levels completed)
- FR25: Player can reset current puzzle to start over

**Pokemon Data (FR26-FR27):**
- FR26: System provides accurate Gen 1 Pokemon data (types, evolution stages, movesets)
- FR27: System provides Pokemon images/sprites for visual identification

### NonFunctional Requirements

**Performance:**
- NFR1: First Contentful Paint < 1.5 seconds
- NFR2: Time to Interactive < 3 seconds
- NFR3: User action response < 200ms (cell selection, Pokemon placement)
- NFR4: Grid validation < 500ms
- NFR5: Lighthouse Performance Score > 80
- NFR6: Initial bundle size < 500KB

**Accessibility:**
- NFR7: Keyboard navigation - all interactive elements reachable via Tab/Enter
- NFR8: Visible focus indicators on all interactive elements
- NFR9: Color contrast minimum 4.5:1 ratio for text
- NFR10: Touch targets minimum 44x44px on mobile
- NFR11: Screen reader support - alt text for Pokemon images, ARIA labels for grid cells
- NFR12: Font sizing minimum 16px base, scalable

**Data Integrity:**
- NFR13: Pokemon data accuracy 100% for types, evolutions, movesets (Gen 1)
- NFR14: Validation correctness - zero false positives/negatives in answer checking
- NFR15: Progress persistence - level completion state saved to localStorage

**Browser Compatibility:**
- NFR16: Desktop browsers - Chrome, Firefox, Safari, Edge (last 2 versions)
- NFR17: Mobile browsers - Mobile Safari (iOS 14+), Chrome Mobile (Android 10+)
- NFR18: Responsive breakpoints - Mobile (<768px), Tablet (768-1024px), Desktop (>1024px)

### Additional Requirements

**Starter Template (Architecture Specified - CRITICAL for Epic 1):**
- Initialize project with: Vite + React 19 + TypeScript 5.x
- Styling: Tailwind CSS v4 + shadcn/ui (Radix primitives)
- Routing: React Router (client-side)
- Testing: Vitest + React Testing Library
- Exact initialization commands documented in architecture.md

**Pokemon Data Requirements:**
- Data source: Bundled JSON file with 150 Gen 1 Pokemon
- Pokemon schema: id, name, types[], evolutionStage ('basic'|'stage1'|'stage2'), moves[]
- Sprites: PokeAPI CDN (https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/{id}.png)
- No API calls during gameplay - all data bundled at build time

**Level Data Requirements:**
- 9 hand-crafted levels in JSON format
- Level schema: id, name, rows[] (3 criteria), columns[] (3 criteria)
- Criteria schema: type ('type'|'dual-type'|'evolution'|'moveset'), value (string|string[])

**State Management (Architecture Specified):**
- React Context + useReducer for state management
- GameState: Current grid, selected cell, validation results
- PokemonState: Used Pokemon tracking per grid
- ProgressState: Completed levels (persisted to localStorage)

**Infrastructure & Deployment:**
- Hosting: GitHub Pages
- CI/CD: GitHub Actions (lint → test → build → deploy on push to main)
- Environment config: Vite env variables (.env for sprite CDN URL)

**Project Structure (Architecture Specified):**
- Feature-based organization: src/features/{grid, pokemon, levels, validation, game}
- UI components: src/components/ui/ (shadcn/ui)
- Shared types: src/types/
- Utilities: src/lib/
- Data files: src/data/pokemon.json, src/data/levels.json
- Tests: Co-located with source files (Component.test.tsx)

### FR Coverage Map

| FR | Epic | Description |
|----|------|-------------|
| FR1 | Epic 2 | View 3x3 grid with criteria labels |
| FR2 | Epic 2 | Select empty cell to place Pokemon |
| FR3 | Epic 2 | See currently selected cell |
| FR4 | Epic 2 | Remove Pokemon from cell |
| FR5 | Epic 2 | View criteria for each cell |
| FR6 | Epic 3 | Browse 150 Gen 1 Pokemon |
| FR7 | Epic 3 | Search/filter Pokemon by name |
| FR8 | Epic 3 | See Pokemon details |
| FR9 | Epic 3 | See used Pokemon as unavailable |
| FR10 | Epic 3 | Select Pokemon to place |
| FR11 | Epic 3 | Unique picks enforced |
| FR12 | Epic 5 | View all 9 levels |
| FR13 | Epic 5 | See completed levels |
| FR14 | Epic 5 | Select and play any level |
| FR15 | Epic 5 | Different criteria by difficulty |
| FR16 | Epic 4 | Submit grid for validation |
| FR17 | Epic 4 | Validate each cell |
| FR18 | Epic 4 | See correct/incorrect cells |
| FR19 | Epic 4 | Retry level |
| FR20 | Epic 4 | See success state |
| FR21 | Epic 4 | Mark level completed |
| FR22 | Epic 5 | Navigate to puzzle view |
| FR23 | Epic 5 | Return to level selection |
| FR24 | Epic 5 | See overall progress |
| FR25 | Epic 5 | Reset puzzle |
| FR26 | Epic 1 | Accurate Pokemon data |
| FR27 | Epic 1 | Pokemon sprites |

## Epic List

| Epic | Title | FRs | User Value |
|------|-------|-----|------------|
| 1 | Project Foundation & Game Data | FR26, FR27 | Dev environment + game data ready |
| 2 | Core Puzzle Grid | FR1-FR5 | Interactive grid with criteria |
| 3 | Pokemon Selection | FR6-FR11 | Browse, search, select Pokemon |
| 4 | Answer Validation & Feedback | FR16-FR21 | Submit answers, see feedback |
| 5 | Level System & Progression | FR12-FR15, FR22-FR25 | Play 9 levels, track progress |

---

## Epic 1: Project Foundation & Game Data

**Goal:** Development environment ready with accessible game data - the foundation for all gameplay features.

**FRs Covered:** FR26, FR27

**User Outcome:** Players have access to accurate Pokemon data and sprites when the game loads.

**Implementation Notes:**
- Initialize Vite + React + TypeScript + shadcn/ui (per Architecture)
- Bundle Pokemon JSON (150 entries) and Level JSON (9 levels)
- Set up project structure, types, routing shell
- Configure sprite CDN integration

**Standalone:** ✅ Complete foundation - enables all future epics

### Story 1.1: Initialize Project with Development Environment

**As a** developer,
**I want** a fully configured project with Vite, React, TypeScript, Tailwind CSS, and shadcn/ui,
**So that** I have a consistent, modern development environment ready for building the game.

**Acceptance Criteria:**

**Given** I have Node.js 20+ installed
**When** I run the project initialization commands from architecture.md
**Then** a new project is created with Vite + React 19 + TypeScript 5.x
**And** Tailwind CSS v4 is configured and working
**And** shadcn/ui is initialized with at least one component (Button)
**And** React Router is installed for client-side routing
**And** Vitest and React Testing Library are configured for testing
**And** the dev server starts without errors (`npm run dev`)
**And** the project structure matches the architecture specification (src/features/, src/components/ui/, src/types/, src/lib/, src/data/)

### Story 1.2: Create Pokemon Data Layer

**As a** player,
**I want** the game to have accurate data for all 150 Gen 1 Pokemon,
**So that** I can trust the game's answers are correct when I play.

**Acceptance Criteria:**

**Given** the project is initialized
**When** I access the Pokemon data layer
**Then** all 150 Gen 1 Pokemon are available (Bulbasaur #1 through Mew #150)
**And** each Pokemon has: id (number), name (string), types (string array), evolutionStage ('basic' | 'stage1' | 'stage2'), moves (string array)
**And** type data is accurate (e.g., Bulbasaur is ['grass', 'poison'], Charizard is ['fire', 'flying'])
**And** evolution stages are accurate (e.g., Charmander is 'basic', Charmeleon is 'stage1', Charizard is 'stage2')
**And** move data includes Gen 1 learnable moves for each Pokemon
**And** TypeScript types are defined: `Pokemon`, `EvolutionStage`
**And** a helper function `getPokemonById(id: number): Pokemon` is available in `src/lib/pokemonHelpers.ts`
**And** unit tests exist for `getPokemonById()` helper function
**And** tests verify all 150 Pokemon are present with required fields
**And** tests validate type accuracy for sample Pokemon (Bulbasaur, Charizard, Pikachu)

### Story 1.3: Create Level Data Layer

**As a** player,
**I want** the game to have 9 hand-crafted levels with progressive difficulty,
**So that** I can learn Pokemon criteria types gradually as I play.

**Acceptance Criteria:**

**Given** the Pokemon data layer exists
**When** I access the Level data layer
**Then** 9 levels are defined in `src/data/levels.json`
**And** each level has: id (number), name (string), rows (3 Criteria), columns (3 Criteria)
**And** each Criteria has: type ('type' | 'dual-type' | 'evolution' | 'moveset'), value (string | string[])
**And** Levels 1-3 use only basic single-type criteria (e.g., "Fire", "Water", "Grass")
**And** Levels 4-5 introduce dual-types and evolution stages
**And** Levels 6-9 include moveset criteria and combined criteria
**And** TypeScript types are defined: `Level`, `Criteria`, `CriteriaType`
**And** a helper function `getLevelById(id: number): Level` is available
**And** unit tests exist for `getLevelById()` helper function
**And** tests verify all 9 levels are present with valid structure
**And** tests validate criteria type progression (levels 1-3 basic, 4-5 intermediate, 6-9 advanced)

### Story 1.4: Integrate Pokemon Sprites

**As a** player,
**I want** to see Pokemon images when browsing or selecting Pokemon,
**So that** I can visually identify Pokemon while playing.

**Acceptance Criteria:**

**Given** the Pokemon data layer exists
**When** I render a Pokemon sprite component
**Then** the sprite loads from PokeAPI CDN: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/{id}.png`
**And** a reusable `PokemonSprite` component exists that accepts a Pokemon ID
**And** the component displays alt text with the Pokemon name for accessibility
**And** the component handles loading state gracefully
**And** the sprite CDN URL is configurable via environment variable (`.env`)
**And** sprites display correctly for Pokemon #1 (Bulbasaur) through #150 (Mew)
**And** unit tests exist for `PokemonSprite` component
**And** tests verify correct URL generation for Pokemon IDs
**And** tests verify alt text includes Pokemon name
**And** tests verify loading state renders correctly

---

## Epic 2: Core Puzzle Grid

**Goal:** Players can view a puzzle grid with row/column criteria and interact with cells.

**FRs Covered:** FR1, FR2, FR3, FR4, FR5

**User Outcome:** Players can see a 3x3 grid with criteria labels and select/deselect cells to prepare for Pokemon placement.

**Implementation Notes:**
- Grid component with responsive design
- Cell selection state management
- Criteria display system
- Touch-friendly interactions (44px targets)

**Standalone:** ✅ Grid works with placeholder Pokemon slots - enables Pokemon selection

### Story 2.1: Create Game State Management

**As a** developer,
**I want** a centralized state management system for the puzzle grid,
**So that** all components can access and update game state consistently.

**Acceptance Criteria:**

**Given** the project foundation exists (Epic 1)
**When** I implement the game state management
**Then** a `GameContext` and `GameProvider` exist in `src/features/game/`
**And** `GameState` includes: grid (9 cells), selectedCell (row/col or null), usedPokemon (Set of IDs)
**And** a `gameReducer` handles actions: `SET_SELECTED_CELL`, `PLACE_POKEMON`, `CLEAR_CELL`, `RESET_GRID`
**And** action type constants use SCREAMING_SNAKE_CASE per architecture patterns
**And** a `useGame` hook provides access to state and dispatch
**And** unit tests exist for `gameReducer` covering all action types
**And** the provider wraps the app in `App.tsx`

### Story 2.2: Build Grid Layout with Criteria Labels

**As a** player,
**I want** to see a 3x3 puzzle grid with row and column criteria clearly labeled,
**So that** I understand what Pokemon attributes each cell requires.

**Acceptance Criteria:**

**Given** game state management exists
**When** I view the puzzle grid
**Then** a 3x3 grid of cells is displayed
**And** 3 row criteria labels appear on the left side of the grid
**And** 3 column criteria labels appear above the grid
**And** criteria labels show the criteria type and value (e.g., "Fire Type", "Stage 1 Evolution")
**And** the grid is responsive: fills available width on mobile, centered on desktop
**And** grid cells are minimum 44x44px for touch targets (NFR10)
**And** the `Grid` component loads level data and renders `CriteriaLabel` components
**And** components are located in `src/features/grid/`
**And** unit tests exist for `Grid` and `CriteriaLabel` components
**And** tests verify 9 cells are rendered
**And** tests verify 3 row and 3 column criteria labels are displayed
**And** tests verify criteria text matches level data

### Story 2.3: Implement Cell Selection

**As a** player,
**I want** to select a cell in the grid by clicking or tapping it,
**So that** I can indicate where I want to place a Pokemon.

**Acceptance Criteria:**

**Given** the grid is displayed with criteria labels
**When** I click/tap an empty cell
**Then** that cell becomes visually highlighted as selected (FR3)
**And** the `selectedCell` state updates to that cell's row/col
**When** I click/tap the same cell again
**Then** the cell is deselected and `selectedCell` becomes null
**When** I click/tap a different cell
**Then** the new cell becomes selected and the previous is deselected
**And** keyboard navigation works: Tab moves between cells, Enter/Space selects (NFR7)
**And** visible focus indicators appear on focused cells (NFR8)
**And** the `Cell` component handles click events and selection styling
**And** unit tests exist for `Cell` component click handling
**And** tests verify clicking empty cell triggers selection
**And** tests verify clicking selected cell deselects it
**And** tests verify keyboard navigation (Tab, Enter, Space)

### Story 2.4: Display Cell Criteria Intersection

**As a** player,
**I want** to see which criteria apply to my selected cell,
**So that** I know exactly what Pokemon attributes are required for that position.

**Acceptance Criteria:**

**Given** a cell is selected
**When** I view the selected cell information
**Then** both the row criteria AND column criteria for that cell are displayed (FR5)
**And** the display shows the intersection clearly (e.g., "Row: Fire Type + Column: Basic Evolution")
**And** the criteria intersection updates immediately when selection changes
**And** if no cell is selected, no criteria intersection is shown
**And** the display is accessible with appropriate ARIA labels (NFR11)
**And** unit tests exist for criteria intersection display logic
**And** tests verify both row and column criteria shown when cell selected
**And** tests verify no criteria shown when no cell selected

### Story 2.5: Implement Pokemon Placement in Cells

**As a** player,
**I want** to place a Pokemon in a selected cell and remove it if I change my mind,
**So that** I can fill out the puzzle grid before submitting.

**Acceptance Criteria:**

**Given** a cell is selected
**When** a Pokemon is placed (via Pokemon selection - Epic 3)
**Then** the Pokemon sprite and name appear in that cell (FR2)
**And** the cell is no longer empty and shows the placed Pokemon
**And** the `usedPokemon` state updates to include this Pokemon's ID
**When** I click/tap a cell with a Pokemon placed
**Then** I can remove the Pokemon from that cell (FR4)
**And** the cell returns to empty state
**And** the Pokemon is removed from `usedPokemon` set
**And** I can place a different Pokemon in that cell
**And** the `PLACE_POKEMON` and `CLEAR_CELL` reducer actions handle these operations
**And** unit tests exist for `PLACE_POKEMON` and `CLEAR_CELL` reducer actions
**And** tests verify Pokemon appears in cell after placement
**And** tests verify Pokemon removed from cell after clearing
**And** tests verify `usedPokemon` set updates correctly

---

## Epic 3: Pokemon Selection

**Goal:** Players can browse, search, and select Pokemon to place in grid cells.

**FRs Covered:** FR6, FR7, FR8, FR9, FR10, FR11

**User Outcome:** Players can find any Gen 1 Pokemon, see its details, and place it in a selected cell with unique pick enforcement.

**Implementation Notes:**
- Pokemon selector UI with sprites
- Search functionality
- Used Pokemon tracking
- Integration with grid cell selection

**Standalone:** ✅ Selection works without validation - enables answer checking

### Story 3.1: Build Pokemon Selector UI

**As a** player,
**I want** to browse all 150 Gen 1 Pokemon in a visual list,
**So that** I can find and choose Pokemon to place in my grid.

**Acceptance Criteria:**

**Given** a cell is selected in the grid
**When** the Pokemon selector opens
**Then** all 150 Gen 1 Pokemon are displayed in a scrollable list/grid (FR6)
**And** each Pokemon shows its sprite image and name
**And** Pokemon are displayed in Pokedex order (#1-150)
**And** the selector is responsive: grid layout on desktop, list on mobile
**And** each Pokemon card is minimum 44x44px for touch targets (NFR10)
**And** the selector appears as a modal/panel that doesn't obscure the grid completely
**And** components are located in `src/features/pokemon/` (PokemonSelector, PokemonCard)
**And** unit tests exist for `PokemonSelector` and `PokemonCard` components
**And** tests verify all 150 Pokemon are rendered
**And** tests verify Pokemon display in Pokedex order
**And** tests verify each card shows sprite and name

### Story 3.2: Implement Pokemon Search and Filter

**As a** player,
**I want** to search for Pokemon by name,
**So that** I can quickly find specific Pokemon without scrolling through all 150.

**Acceptance Criteria:**

**Given** the Pokemon selector is open
**When** I type in the search input
**Then** the Pokemon list filters to show only Pokemon whose names contain the search text (FR7)
**And** the search is case-insensitive (e.g., "char" matches "Charmander", "Charizard", "Charmeleon")
**And** the filtering happens instantly as I type (< 200ms response, NFR3)
**And** if no Pokemon match, a "No results" message is shown
**And** clearing the search input shows all 150 Pokemon again
**And** the search input has a clear button to reset
**And** a `PokemonSearch` component handles the search input and filtering logic
**And** unit tests exist for `PokemonSearch` component and filtering logic
**And** tests verify case-insensitive search works ("char" matches "Charmander")
**And** tests verify empty results show "No results" message
**And** tests verify clearing search shows all Pokemon

### Story 3.3: Display Pokemon Details

**As a** player,
**I want** to see Pokemon details like type and evolution stage when browsing,
**So that** I can make informed decisions about which Pokemon match my cell criteria.

**Acceptance Criteria:**

**Given** the Pokemon selector is displaying Pokemon
**When** I view a Pokemon card
**Then** the Pokemon's type(s) are displayed (e.g., "Fire", "Grass/Poison") (FR8)
**And** the Pokemon's evolution stage is displayed (e.g., "Basic", "Stage 1", "Stage 2")
**And** type colors/badges help visually distinguish types
**And** the details are readable without hovering or extra interaction on mobile
**And** the `PokemonCard` component displays sprite, name, types, and evolution stage
**And** unit tests exist for `PokemonCard` detail display
**And** tests verify types are displayed correctly (single and dual-type)
**And** tests verify evolution stage is displayed
**And** tests verify type badges/colors render correctly

### Story 3.4: Track and Display Used Pokemon

**As a** player,
**I want** to see which Pokemon I've already placed in my grid,
**So that** I don't accidentally try to use the same Pokemon twice.

**Acceptance Criteria:**

**Given** Pokemon have been placed in the grid
**When** I view the Pokemon selector
**Then** used Pokemon are visually marked as unavailable (FR9)
**And** unavailable Pokemon are grayed out or have an overlay indicator
**And** unavailable Pokemon cannot be selected (click/tap does nothing)
**And** the unavailable state updates immediately when Pokemon are placed or removed
**And** a count or indicator shows "X of 150 available" or similar
**And** the `usedPokemon` state from GameContext drives the unavailable display
**And** unit tests exist for unavailable Pokemon logic
**And** tests verify used Pokemon are visually marked unavailable
**And** tests verify clicking unavailable Pokemon does nothing
**And** tests verify availability updates when Pokemon placed/removed

### Story 3.5: Implement Pokemon Selection and Placement

**As a** player,
**I want** to select a Pokemon and have it placed in my selected cell,
**So that** I can fill out my puzzle grid with my chosen answers.

**Acceptance Criteria:**

**Given** a cell is selected and the Pokemon selector is open
**When** I click/tap an available Pokemon
**Then** that Pokemon is placed in the selected cell (FR10)
**And** the Pokemon selector closes after selection
**And** the cell now displays the Pokemon sprite and name
**And** that Pokemon is added to the `usedPokemon` set
**And** the system enforces unique picks - the Pokemon cannot be placed again (FR11)
**When** I try to select an unavailable (already used) Pokemon
**Then** nothing happens and the selector remains open
**And** keyboard navigation works: arrow keys to browse, Enter to select (NFR7)
**And** the selection action dispatches `PLACE_POKEMON` to the game reducer
**And** unit tests exist for selection-to-placement flow
**And** tests verify selecting Pokemon dispatches `PLACE_POKEMON` action
**And** tests verify selector closes after selection
**And** tests verify unavailable Pokemon cannot be selected

---

## Epic 4: Answer Validation & Feedback

**Goal:** Players can submit their grid and see which answers are correct or incorrect.

**FRs Covered:** FR16, FR17, FR18, FR19, FR20, FR21

**User Outcome:** Players can submit their completed grid, see visual feedback on each cell, and retry or celebrate success.

**Implementation Notes:**
- Validation engine (pure function, 100% test coverage)
- Visual feedback system (green/red highlights)
- Success celebration state
- Progress persistence to localStorage

**Standalone:** ✅ Validation works with single level - enables level progression

### Story 4.1: Build Validation Engine

**As a** developer,
**I want** a robust validation engine that checks if Pokemon match criteria,
**So that** the game can accurately determine correct and incorrect answers.

**Acceptance Criteria:**

**Given** a Pokemon and a Criteria object
**When** I call the validation function `matchesCriteria(pokemon, criteria)`
**Then** it returns true/false based on whether the Pokemon matches
**And** type criteria: Pokemon must have the specified type in its types array
**And** dual-type criteria: Pokemon must have BOTH specified types
**And** evolution criteria: Pokemon's evolutionStage must match the specified stage
**And** moveset criteria: Pokemon must have the specified move in its moves array
**And** the function is a pure function with no side effects
**And** the ValidationEngine is located in `src/features/validation/ValidationEngine.ts`
**And** unit tests achieve 100% coverage for all criteria types (NFR14)
**And** tests include edge cases (single vs dual type Pokemon, case sensitivity)

### Story 4.2: Implement Submit Button and Grid Validation

**As a** player,
**I want** to submit my completed grid for validation,
**So that** I can find out if my Pokemon choices are correct.

**Acceptance Criteria:**

**Given** I have placed Pokemon in all 9 cells
**When** I click the Submit button
**Then** the system validates each cell against both its row AND column criteria (FR16, FR17)
**And** validation completes in < 500ms (NFR4)
**And** a `ValidationResult` object is returned with `isValid` and `cells[]` array
**And** each cell result contains: row, col, isCorrect (boolean)
**When** fewer than 9 cells are filled
**Then** the Submit button is disabled or shows a message "Fill all cells to submit"
**And** the submit action dispatches `SUBMIT_GRID` to the game reducer
**And** validation results are stored in GameState
**And** unit tests exist for submit button state logic
**And** tests verify button disabled when fewer than 9 cells filled
**And** tests verify `SUBMIT_GRID` action dispatched on click
**And** tests verify validation results stored in state

### Story 4.3: Display Validation Feedback

**As a** player,
**I want** to see which cells are correct and which are incorrect after submission,
**So that** I can understand my mistakes and learn.

**Acceptance Criteria:**

**Given** the grid has been submitted and validated
**When** validation results are displayed
**Then** correct cells show a green highlight/border (FR18)
**And** incorrect cells show a red highlight/border (FR18)
**And** the feedback is clearly visible and doesn't obscure the Pokemon in the cell
**And** color choices meet accessibility contrast requirements (NFR9)
**And** a summary shows "X of 9 correct"
**And** the feedback persists until the player takes action (retry or continue)
**And** a `FeedbackOverlay` component handles the visual feedback display
**And** unit tests exist for `FeedbackOverlay` component
**And** tests verify correct cells show green styling
**And** tests verify incorrect cells show red styling
**And** tests verify summary count displays correctly ("X of 9 correct")

### Story 4.4: Implement Retry Functionality

**As a** player,
**I want** to retry the level after an incorrect submission,
**So that** I can learn from my mistakes and try again.

**Acceptance Criteria:**

**Given** I submitted the grid and some cells are incorrect
**When** I click the Retry button
**Then** the validation feedback is cleared (FR19)
**And** I can modify my incorrect cells while keeping correct ones
**And** the grid returns to editable state
**And** the Submit button becomes active again
**When** I click a "Start Over" or "Reset" button
**Then** all 9 cells are cleared
**And** the `usedPokemon` set is emptied
**And** the `RESET_GRID` reducer action handles full reset
**And** unit tests exist for retry and reset logic
**And** tests verify retry clears validation feedback but keeps Pokemon
**And** tests verify reset clears all cells and empties `usedPokemon`
**And** tests verify `RESET_GRID` action works correctly

### Story 4.5: Implement Success State and Level Completion

**As a** player,
**I want** to see a success celebration when I complete a level correctly,
**So that** I feel accomplished and motivated to continue.

**Acceptance Criteria:**

**Given** I submitted the grid and all 9 cells are correct
**When** validation completes successfully
**Then** a success state is displayed (FR20)
**And** all cells show green (correct) feedback
**And** a congratulations message or animation appears
**And** the level is marked as completed in ProgressState (FR21)
**And** the completion is persisted to localStorage (NFR15)
**And** a `ProgressContext` and `ProgressProvider` exist in `src/features/game/`
**And** a `useProgress` hook provides access to completed levels
**And** options are shown: "Next Level" or "Back to Level Select"
**And** unit tests verify localStorage persistence works correctly

---

## Epic 5: Level System & Progression

**Goal:** Players can choose from 9 levels with progressive difficulty and track their journey through the game.

**FRs Covered:** FR12, FR13, FR14, FR15, FR22, FR23, FR24, FR25

**User Outcome:** Players can select any of 9 levels, see their completion status, and navigate between level selection and gameplay.

**Implementation Notes:**
- Level selection screen with progress display
- 9 hand-crafted levels (types → dual-types → evolution → movesets)
- Navigation between views
- Progress persistence

**Standalone:** ✅ Completes the full game experience

### Story 5.1: Build Level Selection Screen

**As a** player,
**I want** to see all 9 levels displayed on a selection screen,
**So that** I can choose which puzzle to play.

**Acceptance Criteria:**

**Given** I am on the home/level selection screen
**When** the screen loads
**Then** all 9 levels are displayed in a grid or list (FR12)
**And** each level shows its number and name (e.g., "Level 1: Type Basics")
**And** completed levels show a visual indicator (checkmark, different color) (FR13)
**And** incomplete levels are clearly distinguishable from completed ones
**And** all levels are selectable regardless of completion status (FR14 - no unlock gating)
**And** the layout is responsive: grid on desktop, stacked cards on mobile (NFR18)
**And** components are located in `src/features/levels/` (LevelSelect, LevelCard)
**And** unit tests exist for `LevelSelect` and `LevelCard` components
**And** tests verify all 9 levels are rendered
**And** tests verify completed levels show checkmark indicator
**And** tests verify incomplete levels are visually distinct

### Story 5.2: Implement Level Navigation

**As a** player,
**I want** to navigate between the level selection screen and the game screen,
**So that** I can choose a level and play it, then return to choose another.

**Acceptance Criteria:**

**Given** I am on the level selection screen
**When** I click/tap a level card
**Then** I navigate to the game screen with that level loaded (FR22)
**And** the URL updates to reflect the current level (e.g., `/play/1`)
**Given** I am on the game screen playing a level
**When** I click/tap a "Back" or "Level Select" button
**Then** I navigate back to the level selection screen (FR23)
**And** my progress on that level is NOT automatically saved (only on successful completion)
**And** React Router handles navigation between `/` (level select) and `/play/:levelId` (game)
**And** routes are defined in `src/routes/index.tsx`
**And** unit tests exist for route navigation
**And** tests verify clicking level card navigates to `/play/:levelId`
**And** tests verify back button navigates to level selection
**And** tests verify correct level data loads based on route param

### Story 5.3: Display Overall Progress

**As a** player,
**I want** to see my overall progress through the game,
**So that** I know how many levels I've completed and how many remain.

**Acceptance Criteria:**

**Given** I am on the level selection screen
**When** I view the progress indicator
**Then** I see "X of 9 levels completed" or similar text (FR24)
**And** X updates immediately when a level is completed
**And** a progress bar or visual indicator shows completion percentage
**And** progress data is loaded from localStorage on app startup (NFR15)
**And** the `LevelProgress` component displays the overall progress
**And** the `useProgress` hook provides the completed levels count
**And** unit tests exist for `LevelProgress` component
**And** tests verify "X of 9 levels completed" displays correctly
**And** tests verify progress updates when level completed
**And** tests verify progress loads from localStorage on mount

### Story 5.4: Implement Level Loading with Difficulty Progression

**As a** player,
**I want** each level to have appropriate difficulty based on its number,
**So that** I can learn gradually as I progress through the game.

**Acceptance Criteria:**

**Given** I select a level to play
**When** the game screen loads
**Then** the correct level data is loaded from `levels.json`
**And** Levels 1-3 use only basic single-type criteria (FR15)
**And** Levels 4-5 introduce dual-types and evolution stage criteria (FR15)
**And** Levels 6-9 include moveset criteria and combined criteria types (FR15)
**And** the grid displays the level's specific row and column criteria
**And** the level name/number is displayed on the game screen
**And** each level has a unique, solvable puzzle configuration
**And** a `getLevelById(id)` helper retrieves the correct level data
**And** unit tests exist for level loading logic
**And** tests verify correct level data returned by `getLevelById()`
**And** tests verify levels 1-3 contain only single-type criteria
**And** tests verify levels 6-9 contain moveset criteria

### Story 5.5: Add Reset Puzzle Functionality

**As a** player,
**I want** to reset my current puzzle and start fresh,
**So that** I can try a completely different approach without going back to level select.

**Acceptance Criteria:**

**Given** I am playing a level with Pokemon placed in cells
**When** I click/tap a "Reset" or "Start Over" button
**Then** all 9 cells are cleared of Pokemon (FR25)
**And** the `usedPokemon` set is emptied
**And** the `selectedCell` is reset to null
**And** any validation feedback is cleared
**And** I remain on the same level (not navigated away)
**And** a confirmation dialog appears before resetting (to prevent accidental resets)
**And** the reset action dispatches `RESET_GRID` to the game reducer
**And** the button is clearly visible but not in a position where it's easily misclicked
**And** unit tests exist for reset functionality
**And** tests verify confirmation dialog appears before reset
**And** tests verify reset clears all cells, `usedPokemon`, and `selectedCell`
**And** tests verify user remains on same level after reset
