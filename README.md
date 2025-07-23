# Recipe Management App

A modern recipe management web application built with Next.js, allowing users to create, browse, and manage their favorite recipes.

## Features

- **Create Recipes**: Add new recipes with ingredients, instructions, and images
- **Browse Recipes**: View all recipes in an organized layout
- **Favorite Recipes**: Mark recipes as favorites for quick access
- **Recipe Details**: View detailed recipe pages with full instructions
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Modern UI**: Beautiful interface built with TailwindCSS and Headless UI

## Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) with TypeScript
- **Styling**: [TailwindCSS](https://tailwindcss.com/) with Tailwind Merge
- **State Management**: [TanStack Query](https://tanstack.com/query) for server state
- **Forms**: [React Hook Form](https://react-hook-form.com/) with [Zod](https://zod.dev/) validation
- **UI Components**: [Headless UI](https://headlessui.com/) and [Lucide React](https://lucide.dev/)
- **File Handling**: [Formidable](https://github.com/node-formidable/formidable) for image uploads

## Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
src/
├── pages/           # Next.js pages and API routes
├── components/      # Reusable React components
├── hooks/          # Custom React hooks
├── utils/          # Utility functions
├── types/          # TypeScript type definitions
├── schema/         # Zod validation schemas
├── api/            # API utility functions
└── styles/         # Global styles
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## API Routes

- `GET /api/recipes` - Fetch all recipes
- `POST /api/recipes` - Create a new recipe
- `GET /api/recipes/[slug]` - Get recipe by slug
- `PUT /api/recipes/[slug]` - Update recipe
- `DELETE /api/recipes/[slug]` - Delete recipe

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT
