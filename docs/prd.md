---
stepsCompleted: [1, 2, 3, 4, 7, 8, 9, 10, 11]
inputDocuments:
  - docs/analysis/product-brief-bmad-pokedex-2025-12-12.md
  - https://pokedoku.com/ (competitor reference)
documentCounts:
  briefs: 1
  research: 0
  brainstorming: 0
  projectDocs: 0
workflowType: 'prd'
lastStep: 11
project_name: 'bmad-pokedex'
user_name: 'patta'
date: '2025-12-12'
---

# Product Requirements Document - bmad-pokedex

**Author:** patta
**Date:** 2025-12-12

## Executive Summary

Pokedose is a level-based Pokemon grid puzzle game where players fill a 3x3 grid with Pokemon matching both row and column criteria. Unlike competitors (PokeDoku, PokeGrid) that focus on daily puzzles with rarity scoring across 1000+ Pokemon, Pokedose offers 9 hand-crafted levels with progressive concept introduction, focused exclusively on the original 150 Pokemon.

Players submit their completed grid and see which cells are correct or incorrect, creating a satisfying learning loop. The game teaches as you play - starting with basic type matching and gradually introducing dual-types, evolution stages, and movesets. Each Pokemon can only be used once per grid, adding strategic depth to the puzzle-solving experience.

### What Makes This Special

1. **Progressive onboarding** - The only Pokemon grid game that teaches criteria types gradually through structured levels
2. **Gen 1 focus** - Nostalgic appeal with manageable scope (150 vs 1000+ Pokemon)
3. **Mastery over obscurity** - Rewards learning and improvement, not picking the rarest Pokemon
4. **Clear feedback loop** - Submit → see what's wrong → retry → master
5. **Strategic constraint** - Unique picks per grid forces holistic planning

## Project Classification

**Technical Type:** web_app
**Domain:** general (entertainment)
**Complexity:** low
**Project Context:** Greenfield - new project

This is a browser-based puzzle game with standard web application requirements. No complex regulatory or compliance concerns. Focus areas: responsive design, performance optimization, and engaging user experience.

## Success Criteria

### User Success

- **Level Completion** - Players can complete all 9 levels
- **Learning Progression** - Players experience the "aha!" moment as they master type matching, dual-types, evolution, and movesets
- **Satisfaction** - Players feel "it was worth it" after completing all levels

### Business Success

- **Functional Product** - 9 playable levels with correct answer validation
- **Real Usage** - At least a handful of users play and complete levels
- **Portfolio Quality** - Polished enough to demonstrate skills and share publicly

### Technical Success

- **Fast Load** - Game loads quickly on mobile and desktop
- **Responsive Design** - Works seamlessly on any screen size
- **Bulletproof Validation** - Answer checking logic is accurate with no edge cases

### Measurable Outcomes

| Metric | Target |
|--------|--------|
| Levels playable | 9 |
| Gen 1 Pokemon supported | 150 |
| Load time | < 3 seconds |
| Mobile responsive | Yes |
| Validation accuracy | 100% |

## Product Scope

### MVP - Minimum Viable Product

- 3x3 grid puzzle interface
- 9 hand-crafted levels with progressive difficulty:
  - Early: Basic type matching
  - Mid: Dual-types, evolution stages
  - Later: Movesets, combined criteria
- Full grid submission with incorrect cells highlighted
- Gen 1 Pokemon only (original 150)
- Unique picks enforced (each Pokemon used once per grid)
- Responsive web design (mobile + desktop)

### Growth Features (Post-MVP)

- Integrated Pokedex - Reference tool while playing

### Vision (Future)

- Daily puzzle mode
- Procedurally generated puzzles
- Leaderboards and time trials
- Replay mode with answer tracking (can't reuse previously picked Pokemon)

## User Journeys

### Journey 1: Alex - Rediscovering Pokemon Mastery

**Persona:** Alex, late 20s, grew up with Pokemon Red/Blue and the original anime. Casually follows Pokemon but hasn't kept up with newer generations. Feels nostalgic but excluded from modern Pokemon communities.

**Situation:** Tried PokeDoku after seeing it trending, got overwhelmed by 1000+ Pokemon across 8 generations. Felt like they weren't a "real fan" anymore.

**The Journey:**

Alex is scrolling Twitter when they see PokeDoku trending. "A Pokemon puzzle game? I grew up with this!" They try it, but the grid asks for a "Steel/Fairy type from Gen 8" - they have no idea. After three frustrating attempts where their "rarity score" is embarrassingly low, they give up. "I guess I'm not a real Pokemon fan anymore."

A week later, a friend shares Pokedose. "It's only Gen 1 Pokemon - the OGs." Alex clicks, skeptical but curious.

**Level 1** presents a 3x3 grid. Three row labels on the left: "Fire", "Water", "Grass". Three column labels on top: "Stage 1", "Stage 1", "Stage 1". Alex needs to fill each cell with a Pokemon that matches BOTH its row AND column criteria. Top-left needs a Fire-type Stage 1 Pokemon - Charmander. Easy. They fill all 9 cells and hit submit. Green checkmarks everywhere. That felt good.

**Levels 2-4** introduce dual-types. The grid shows "Grass/Poison" as a row criterion. Alex pauses - is Bulbasaur Grass/Poison? They place it in a cell that also needs "Stage 1" from the column... correct! The game is teaching them things they never consciously knew.

**Level 5** throws a curveball: the column criteria now include "Final evolution". Alex sees a cell needing "Fire type" (row) + "Final evolution" (column) - they almost pick Charmander before catching themselves. Charizard. The near-miss makes them more careful.

**By Level 7**, Alex is juggling complex criteria across the whole grid. A cell needs "Water type" (row) + "Learns Ice Beam" (column) - they think through Lapras, Dewgong, Starmie... but wait, each Pokemon can only be used once across all 9 cells. They need to plan strategically.

**Level 9** is the boss fight. Row criteria mix types and evolution stages. Column criteria combine movesets and abilities. Alex fails twice - the submit button reveals 3 red cells. But now they understand *why* those cells failed. Third attempt - all 9 cells green.

Alex screenshots the completion screen and texts their friend: "I still got it."

### Journey Requirements Summary

This journey reveals the following capability areas:

| Capability | Requirements |
|------------|--------------|
| **Grid Interface** | 3x3 grid with row/column criteria labels, cell selection for Pokemon placement |
| **Pokemon Selection** | Browse/search 150 Gen 1 Pokemon, see Pokemon details (type, evolution, moves) |
| **Validation** | Submit button, correct/incorrect cell highlighting, unique pick enforcement |
| **Level Progression** | 9 levels with increasing complexity, level selection/navigation |
| **Feedback System** | Clear visual feedback on success/failure per cell |
| **Criteria Types** | Types, dual-types, evolution stages, movesets |

## Web App Specific Requirements

### Project-Type Overview

Pokedose is a Single Page Application (SPA) delivering a browser-based puzzle game. The architecture prioritizes smooth user experience with no page reloads between levels, fast load times, and responsive design across devices.

### Technical Architecture Considerations

| Aspect | Decision |
|--------|----------|
| **Architecture** | Single Page Application (SPA) |
| **Browser Support** | Modern browsers only (Chrome, Firefox, Safari, Edge - last 2 versions) |
| **SEO** | Not required for MVP |
| **Real-time** | Not required - static puzzle content |
| **Accessibility** | Basic level (keyboard navigation, readable fonts, decent contrast) |

### Browser Compatibility Matrix

| Browser | Minimum Version | Priority |
|---------|-----------------|----------|
| Chrome | Last 2 versions | High |
| Firefox | Last 2 versions | High |
| Safari | Last 2 versions | High |
| Edge | Last 2 versions | Medium |
| Mobile Safari | iOS 14+ | High |
| Chrome Mobile | Android 10+ | High |

### Responsive Design Requirements

- **Mobile-first** approach
- Breakpoints: Mobile (< 768px), Tablet (768-1024px), Desktop (> 1024px)
- 3x3 grid must be touch-friendly on mobile (minimum 44px touch targets)
- Pokemon selection UI adapts to screen size

### Performance Targets

| Metric | Target |
|--------|--------|
| First Contentful Paint | < 1.5s |
| Time to Interactive | < 3s |
| Lighthouse Performance | > 80 |
| Bundle size | < 500KB initial load |

### Accessibility (Basic Level)

- Keyboard navigation for grid cells and Pokemon selection
- Visible focus indicators
- Readable font sizes (minimum 16px base)
- Sufficient color contrast for text
- Alt text for Pokemon images

## Project Scoping & Phased Development

### MVP Strategy & Philosophy

**MVP Approach:** Experience MVP - deliver the core puzzle experience with clean, polished execution
**Team Size:** Solo developer / small team
**Complexity:** Low - no backend, no auth, static content

### MVP Feature Set (Phase 1)

**Core User Journey Supported:** Alex's path from Level 1 to Level 9 completion

**Must-Have Capabilities:**
- 3x3 grid interface with row/column criteria
- 9 hand-crafted levels with progressive difficulty
- Pokemon selection from 150 Gen 1 Pokemon
- Answer validation with cell-by-cell feedback
- Unique pick enforcement per grid
- Responsive design (mobile + desktop)
- Level progression and navigation

**Explicitly Out of Scope for MVP:**
- User accounts / authentication
- Backend / database
- Leaderboards
- Daily puzzles
- Procedural puzzle generation
- Pokedex reference tool

### Post-MVP Features

**Phase 2 - Growth:**
- Integrated Pokedex for in-game reference

**Phase 3 - Expansion:**
- Daily puzzle mode
- Procedurally generated puzzles
- Leaderboards and time trials
- Replay mode with answer tracking

### Risk Mitigation Strategy

| Risk Type | Risk | Mitigation |
|-----------|------|------------|
| **Technical** | Pokemon data accuracy | Use reliable API (PokeAPI) or verified dataset |
| **Technical** | Level design too hard/easy | Playtest all 9 levels before launch |
| **Market** | Players don't find it | Share in Pokemon communities, rely on word-of-mouth |
| **Resource** | Time constraints | MVP is intentionally minimal - can ship in focused sprint |

## Functional Requirements

### Grid Puzzle Interface

- FR1: Player can view a 3x3 grid with 3 row criteria labels and 3 column criteria labels
- FR2: Player can select any empty cell in the grid to place a Pokemon
- FR3: Player can see which cell is currently selected
- FR4: Player can remove a Pokemon from a cell before submitting
- FR5: Player can view the criteria that apply to each cell (intersection of row + column)

### Pokemon Selection

- FR6: Player can browse all 150 Gen 1 Pokemon when selecting for a cell
- FR7: Player can search/filter Pokemon by name
- FR8: Player can see Pokemon details (name, type(s), evolution stage) when browsing
- FR9: Player can see which Pokemon are already used in the current grid (unavailable)
- FR10: Player can select a Pokemon to place in the currently selected cell
- FR11: System enforces unique picks - each Pokemon can only be used once per grid

### Level System

- FR12: Player can view a list of all 9 levels
- FR13: Player can see which levels are completed
- FR14: Player can select and play any level (no unlock gating for MVP)
- FR15: System presents different criteria types based on level difficulty:
  - Levels 1-3: Basic single types
  - Levels 4-5: Dual-types, evolution stages
  - Levels 6-9: Movesets, combined criteria

### Validation & Feedback

- FR16: Player can submit a completed grid (all 9 cells filled) for validation
- FR17: System validates each cell against both row AND column criteria
- FR18: Player can see which cells are correct (green) and incorrect (red) after submission
- FR19: Player can retry the level after an incorrect submission
- FR20: Player can see a success state when all 9 cells are correct
- FR21: System marks level as completed when player succeeds

### Navigation & Game Flow

- FR22: Player can navigate from level selection to puzzle view
- FR23: Player can return to level selection from puzzle view
- FR24: Player can see their overall progress (X of 9 levels completed)
- FR25: Player can reset current puzzle to start over

### Pokemon Data

- FR26: System provides accurate Gen 1 Pokemon data (types, evolution stages, movesets)
- FR27: System provides Pokemon images/sprites for visual identification

## Non-Functional Requirements

### Performance

| Metric | Requirement |
|--------|-------------|
| First Contentful Paint | < 1.5 seconds |
| Time to Interactive | < 3 seconds |
| User action response | < 200ms (cell selection, Pokemon placement) |
| Grid validation | < 500ms |
| Lighthouse Performance Score | > 80 |
| Initial bundle size | < 500KB |

### Accessibility

| Requirement | Specification |
|-------------|---------------|
| Keyboard navigation | All interactive elements reachable via Tab/Enter |
| Focus indicators | Visible focus state on all interactive elements |
| Color contrast | Minimum 4.5:1 ratio for text |
| Touch targets | Minimum 44x44px on mobile |
| Screen reader support | Alt text for Pokemon images, ARIA labels for grid cells |
| Font sizing | Minimum 16px base, scalable |

### Data Integrity

| Requirement | Specification |
|-------------|---------------|
| Pokemon data accuracy | 100% accurate types, evolutions, movesets for Gen 1 |
| Validation correctness | Zero false positives/negatives in answer checking |
| Progress persistence | Level completion state saved to localStorage |

### Browser Compatibility

| Requirement | Specification |
|-------------|---------------|
| Desktop browsers | Chrome, Firefox, Safari, Edge (last 2 versions) |
| Mobile browsers | Mobile Safari (iOS 14+), Chrome Mobile (Android 10+) |
| Responsive breakpoints | Mobile (<768px), Tablet (768-1024px), Desktop (>1024px) |
