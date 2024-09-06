# Google Books Search App

This is a simple nextjs application that allows users to search for books using the Google Books API and view book details.

## Watch Demo

[![VIDEO DEMO](https://img.youtube.com/vi/0Pn2xqPG9o0/0.jpg)](https://www.youtube.com/watch?v=0Pn2xqPG9o0)

## Try it online

Visit https://books-app-kappa-bay.vercel.app/

## Setup to run locally

1. Clone the repository:

```bash
git clone <repository-url>
```

2. CD into local directory and install dependencies.

```bash
cd books-app
```

Using npm:

```bash
npm install
```

Using Yarn:

```bash
yarn install
```

Using pnpm:

```bash
pnpm install
```

Using Bun:

```bash
bun install
```

3. Run the development server:

```bash
npm run dev
```

Or, depending on your package manager:

Using Yarn:

```bash
yarn dev
```

Using pnpm:

```bash
pnpm dev
```

Using Bun:

```bash
bun run dev
```

This will start the application at http://localhost:3000.

## Features

1. Search for Books: Users can search for books using the Google Books API.
2. View Book Details: Users can click on a book to view more details.
3. Pagination: Load more books as you click 'load more'.

## Technologies Used

1. Next.js: React framework with server-side rendering (SSR) capabilities.
2. Tailwind CSS: Utility-first CSS framework for styling.
3. Google Books API: External API to fetch book data.
