# CardanoSkills

CardanoSkills is a comprehensive platform for exploring, learning, and showcasing skills related to the Cardano blockchain ecosystem. The platform is built with cutting-edge technologies to deliver a modern, fast, and user-friendly experience.

## 🛠️ Built With

This project leverages a modern web development stack for optimal performance and scalability:

- **[SvelteKit](https://kit.svelte.dev/):** A framework for building fast, modern web applications.
- **[PocketBase](https://pocketbase.io/):** Backend as a service, handling the database, authentication, and APIs.
- **[ShadCN Svelte](https://www.shadcn-svelte.com/):** A UI component library for building elegant, reusable interfaces.
- **[TypeScript](https://www.typescriptlang.org/):** Strongly typed programming language for scalability and maintainability.
- **[Node.js](https://nodejs.org/):** JavaScript runtime for server-side execution.

## 📦 Installation

Follow these steps to set up the project locally:

## Cloning Repo

```bash
git clone https://github.com/your-username/cardanoskills.git
cd cardanoskills
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.

## Run Pocketbase

You can use a local or remote pocketbase instance. In my case, i'm running pocketbase locally on the `pocketbase-dev` folder

## Database Schema

You can find the database schema on the `pb_schemas` folder

## Pocketbase Typegen

Pocketbase is the chosen backend for this platform, anytime you make changes to the database schema, you need to generate the types in order to have a typesafe backend.

```bash
npx pocketbase-typegen --db ./pocketbase-dev/pb_data/data.db --out pocketbase-types.ts
```

## Run migrations

Before you can run the actual backend, you must run the migrations using `./pocketbase migrate up` in the current directory. It will create appropriate schema tables/collections.
