# Implementation Plan - Gefoun Marketplace

Gefoun is a specialized marketplace for the Mambilla Plateau (Gembu, Taraba State), connecting farmers, buyers, and logistics providers. The app focuses on accessibility (offline support/SMS mentions), trust (escrow), and local geography (group shipping recommendations).

## Scope Summary
- **Landing Page:** Welcoming interface with role selection (Farmer, Buyer, Driver).
- **Product Discovery:** Visual showcase of Mambilla Plateau specialties (Tea, Coffee, Avocados, etc.).
- **Role-Specific Dashboards:**
  - **Farmers:** Listing crops, price checking, finding transport.
  - **Buyers:** Sourcing bulk goods, secure delivery tracking.
  - **Logistics:** Finding payloads at Gembu motor parks, coordinating pooled transit.
- **Smart Assistant (Gefoun-AI):** A simulated chat interface with multilingual support (English, Pidgin, Hausa) and the 3-step action rule.
- **Informational Components:** Network constraints (SMS/Offline info), Escrow details, and Group Shipping explanations.

## Non-Goals
- Real-time backend database (Local state/Mock data only).
- Real SMS gateway integration.
- Actual payment processing (Simulation of escrow only).

## Assumptions
- The app is a web-based prototype using React/Tailwind.
- Multi-language support for the AI is simulated via predefined logic or simple string mappings.

## Affected Areas
- **Frontend:** All UI components, layouts, and navigation.
- **Data Layer:** Mock data for listings, prices, and users.
- **State Management:** Local storage for session/role simulation.

## Ordered Phases

### Phase 1: Foundation & Layout
- Set up project structure and routing.
- Implement a responsive layout with a Mambilla-inspired theme (Green/Earth tones).
- Deliverable: App shell with navigation and theme.

### Phase 2: Role Selection & Landing
- Create the main landing page with clear CTA buttons for Farmers, Buyers, and Logistics.
- Implement the "Specialties" gallery (Tea, Avocados, Potatoes, etc.).
- Deliverable: Landing page and role-based entry points.

### Phase 3: Farmer & Buyer Workflows
- **Farmer Dashboard:** Form for listing crops, mock price index.
- **Buyer Dashboard:** Product search/filter, "Buy Now" flow with Escrow explanation.
- Deliverable: Functional dashboards for Farmers and Buyers.

### Phase 4: Logistics & Group Shipping
- **Logistics Dashboard:** "Gembu Motor Park" payload board.
- **Group Shipping:** UI component explaining benefits and how to join a pool.
- Deliverable: Logistics view and shipping coordination UI.

### Phase 5: Gefoun-AI Assistant
- Build the persistent chat component.
- Implement the "3 simple action steps" logic.
- Add language toggles or simple recognition for Hausa/Pidgin greetings.
- Deliverable: Interactive AI assistant.

---

## Execution Handoff

**Plan status:** ready

**Dispatch order:**
1. frontend_engineer — Build the core UI, role-based dashboards, and the AI assistant component.

**Per-agent instructions:**

### 1. frontend_engineer
- **Phases:** 1-5
- **Scope:** 
    - Create a multi-role marketplace UI.
    - Implement `src/components/GefounAI.tsx` as a floating chat or dedicated page that follows the "3-step" rule.
    - Create mock data for agricultural products (Tea, Highland Avocados, Irish Potatoes, Coffee, Beef/Cattle, Ginger, Beans).
    - Design dashboards for:
        - Farmers (List crops, "Ask AI about transport").
        - Buyers (Product grid, "Escrow" badge, "Buy" button).
        - Logistics (Payload board for Gembu motor park).
    - Use a color palette reflecting the lush Mambilla Plateau (greens, browns, earthy yellows).
    - Include educational pop-ups/cards for "Group Shipping" and "Escrow Safety".
- **Files:** `src/App.tsx`, `src/components/`, `src/hooks/`
- **Depends on:** none
- **Acceptance criteria:**
    - Users can switch between Farmer, Buyer, and Driver roles.
    - Product listings show Gembu specialties.
    - Gefoun-AI responds with 3 bulleted steps and handles "Sannu" or Pidgin inputs politely.
    - UI mentions offline/SMS support when network issues are simulated or toggled.
