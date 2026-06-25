# Implementation Plan - Gefoun Marketplace (Database Integration)

Gefoun is a specialized marketplace for the Mambilla Plateau (Gembu, Taraba State), connecting farmers, buyers, and logistics providers. This phase integrates Supabase for real-time data persistence and expands the product catalog.

## Scope Summary
- **Database Backend (Supabase):**
  - Schema for Users (Profiles), Products, Farmer Listings, Orders (Escrow), and Logistics Payloads.
  - Row Level Security (RLS) for data protection.
- **Frontend Integration:**
  - Connect the React frontend to Supabase.
  - Replace mock data with real-time fetching and subscriptions.
  - Implement "List Crop" and "Buy" functionality with database writes.
- **Expanded Content:**
  - Add more Mambilla specialties: Honey, Cabbage, etc.
  - Enhance product metadata (price ranges, seasonal availability).

## Affected Areas
- **Database:** New tables, types, and policies in Supabase.
- **Frontend:**
  - `src/lib/supabase.ts` (Client initialization).
  - `src/hooks/` (Data fetching hooks).
  - `src/components/RoleDashboards.tsx` (Wiring forms to DB).
  - `src/components/SpecialtiesGallery.tsx` (Dynamic product loading).

## Ordered Phases

### Phase 1: Database Schema Design (Supabase)
- Create `profiles` table (id, role, full_name, location).
- Create `products` table (id, name, description, image_url, category).
- Create `listings` table (id, farmer_id, product_id, quantity, price, condition, status).
- Create `orders` table (id, buyer_id, listing_id, amount, status [escrow, released, disputed]).
- Create `payloads` table (id, driver_id, destination, capacity, status).
- Deliverable: SQL migration applied to Supabase.

### Phase 2: Frontend Connection & Expansion
- Install `@supabase/supabase-js`.
- Create Supabase client utility.
- Expand `products` list in the database to include Honey, Cabbage, and others.
- Deliverable: Supabase connection established and expanded product list available.

### Phase 3: Wiring Dashboards
- **Farmer:** Update listing form to insert into `listings` table.
- **Buyer:** Fetch active listings from DB; implement "Buy" button to create `orders`.
- **Logistics:** Update payload board to fetch/insert from `payloads` table.
- Deliverable: Functional CRUD operations for all roles.

### Phase 4: Real-time & Polish
- Use Supabase Realtime for live updates on new listings or order status changes.
- Final UI polish for new product categories.
- Deliverable: A fully reactive marketplace prototype.

---

## Execution Handoff

**Plan status:** ready

**Dispatch order:**
1. supabase_engineer — Create the schema and seed initial data.
2. frontend_engineer — Connect the app to Supabase, update dashboards, and expand product categories.

**Per-agent instructions:**

### 1. supabase_engineer
- **Phases:** 1
- **Scope:** 
    - Design and apply the SQL schema.
    - Tables: `profiles` (role-based), `products` (master catalog), `listings` (farmer posts), `orders` (escrow tracking), `payloads` (logistics).
    - Seed the `products` table with: Tea, Highland Avocados, Irish Potatoes, Coffee, Beef/Cattle, Ginger, Beans, Honey, Cabbage.
    - Set up RLS: Profiles readable by all, writable by owner. Products readable by all. Listings/Orders/Payloads readable by all, writable by owner.
- **Acceptance criteria:**
    - Schema is visible in Supabase.
    - Seed data for products exists.

### 2. frontend_engineer
- **Phases:** 2-4
- **Scope:**
    - Install `@supabase/supabase-js`.
    - Create `src/lib/supabase.ts` using environment variables.
    - Refactor `src/components/RoleDashboards.tsx` and `src/components/SpecialtiesGallery.tsx` to fetch data from Supabase instead of `mockData.ts`.
    - Implement "List Crop" (insert to `listings`) and "Join Pool" (insert to `payloads`).
    - Implement "Buy" (create `orders`).
    - Add UI for "Honey" and "Cabbage" in the specialties gallery.
- **Depends on:** Phase 1 (Supabase Engineer)
- **Acceptance criteria:**
    - The app fetches real data from Supabase.
    - New listings appear in the buyer's view after a farmer submits them.
    - All roles can perform their primary actions against the database.
