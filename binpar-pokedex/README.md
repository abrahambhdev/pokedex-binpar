# Pokédex Binpar – Prueba Técnica

**ES | [EN](#pokedex-binpar-technical-test)**

Aplicación construida con **Next.js (App Router)**, **TypeScript**, **tRPC**, **Zustand** y una arquitectura con **Inversión de Dependencias (DI)** para consumir la **PokéAPI** de forma desacoplada, testeable y tipada end-to-end.

---

## 🎯 Objetivo

Implementar una Pokédex que cumpla:

1. Listado de todos los Pokémon ordenados por **ID**.
2. Filtros por **Tipo** y **Generación**.
3. Buscador en **tiempo real**, incluyendo evoluciones:
   - Si buscas `pikachu`, aparecen Pichu, Pikachu y Raichu.
4. Página de detalle con:
   - Nombre
   - Imagen
   - Generación
   - Tipos
   - Stats
   - Cadena evolutiva (clicable, marcando el Pokémon actual)
5. Mantener:
   - filtros,
   - búsqueda,
   - y scroll del listado al volver desde el detalle (sin persistencia tras reload).

Todo ello usando **TypeScript**, **Next.js**, **tRPC**, estilo T3 Stack y **Docker**.

---

## ✅ Funcionalidad implementada

### Listado principal `/`

- Pokémon ordenados por **ID**.
- Cada card muestra:
  - Nombre
  - Imagen (official artwork)
  - Generación
  - Tipos
  - Información evolutiva:
    - **Evoluciones** (siguientes formas en la cadena)
    - **Pre-evoluciones** (formas anteriores)
    - **Cadena evolutiva completa** (resumen final)

### Filtros

- Filtro por **Tipo**
- Filtro por **Generación**
- Combinables.
- Datos obtenidos dinámicamente de PokéAPI (`/type`, `/generation`).

### Buscador en tiempo real

- Input controlado con filtrado reactivo.
- Coincidencias por:
  - nombre del Pokémon,
  - nombres dentro de su cadena evolutiva.

### Página de detalle `/pokemon/[name]`

Incluye:

- Nombre, ID, imagen
- Tipos
- Generación
- Stats base con barra visual
- Cadena evolutiva:
  - Lista con imágenes
  - El Pokémon actual marcado como **“Actual”**
  - Click en otra fase → navegación a su detalle

### Estado del listado

Al navegar:

- De listado → detalle → volver:
  - Se mantienen filtros
  - Se mantiene el término de búsqueda
  - Se mantiene la posición de scroll
- No se persiste tras recargar (como pedía el enunciado).

---

## 🧱 Arquitectura técnica

- **Next.js (App Router)** + **TypeScript**
- **tRPC**:
  - `appRouter` con router de Pokémon.
  - Cliente React (`@/trpc/react`) + helper para Server Components (`@/trpc/server`).
- **Inversión de Dependencias**:
  - `URLBuilder`: construcción segura de URLs.
  - `PokemonHelper` (clase): mapea PokéAPI → modelo de dominio.
  - `createPokeApi`: factory que recibe `baseUrl`, `pokemonLimit`, `fetchFn`, `PokemonHelper`.
  - `pokeApi`: instancia real creada en `server/di/pokeapi.ts`.
  - `PokemonRouter` (clase tRPC) recibe `pokeApi` por DI.
- **Zustand**:
  - `pokemonListStore` para filtros, búsqueda y scroll.
- **Separación UI / dominio**:
  - Componentes de presentación en `src/components/pokemon`.
  - Lógica de dominio en `src/models` + `src/types`.
  - Integración externa en `src/lib`.

---

## 📁 Estructura principal

```txt
src
├─ app
│  ├─ page.tsx                         # Home (listado)
│  ├─ pokemon
│  │  └─ [name]
│  │     └─ page.tsx                   # Detalle
│  └─ api
│     └─ trpc
│        └─ [trpc]
│           └─ route.ts                # Handler HTTP tRPC
├─ components
│  └─ pokemon
│     ├─ PokemonList.tsx
│     ├─ PokemonFilters.tsx
│     ├─ PokemonGrid.tsx
│     ├─ PokemonCard.tsx
│     ├─ PokemonHeader.tsx
│     ├─ PokemonStats.tsx
│     └─ PokemonEvolutionChain.tsx
├─ lib
│  ├─ urlBuilder.ts                    # URLBuilder
│  ├─ pokeapiFactory.ts                # createPokeApi (DI)
│  └─ store
│     └─ pokemonListStore.ts           # Zustand
├─ models
│  └─ pokemon.ts                       # PokemonHelper (clase)
├─ server
│  ├─ api
│  │  ├─ trpc.ts                       # initTRPC + contexto
│  │  ├─ root.ts                       # appRouter
│  │  └─ routers
│  │     └─ pokemon.ts                 # PokemonRouter (usa pokeApi)
│  └─ di
│     └─ pokeapi.ts                    # Instancia pokeApi
├─ trpc
│  ├─ react.tsx                        # Cliente React tRPC
│  ├─ provider.tsx                     # TRPCReactProvider
│  └─ server.ts                        # Helper para RSC
├─ types
│  ├─ pokemon.ts                       # Tipos de dominio
│  └─ pokeapi.ts                       # Tipos PokéAPI
└─ env.mjs                             # Validación de entorno
