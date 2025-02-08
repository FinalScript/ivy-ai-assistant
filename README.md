# 🌿 Ivy AI

A modern AI-powered student assistant that helps organize your academic life.

## 📦 Project Structure

```
/
├── ivy-ai-server/     # GraphQL API server
└── ivy-ai-client/     # React client application
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- PostgreSQL database
- Supabase project
- Redis server

### Environment Setup

First, set up your environment variables for both the server and client.

#### Server Environment
Create a `.env` file in the `ivy-ai-server` directory:
```env
# Database
DATABASE_URL=your-postgresql-connection-string

# Supabase
SUPABASE_URL=your-supabase-url
SUPABASE_ANON_KEY=your-supabase-anon-key

# Google API
GOOGLE_API_KEY=your-google-api-key

# Redis Configuration
REDIS_HOST=your-redis-host
REDIS_PORT=6379
REDIS_PASSWORD=your-redis-password
```

#### Client Environment
Create a `.env` file in the `ivy-ai-client` directory:
```env
# GraphQL API URLs
VITE_GRAPHQL_URL=http://localhost:4000/graphql
VITE_GRAPHQL_WS_URL=ws://localhost:4000/subscriptions

# Supabase Configuration
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key

# Optional
VITE_NODE_ENV=development
```

### Server Setup

1. Navigate to server directory:
```bash
cd ivy-ai-server
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The GraphQL server will be available at `http://localhost:4000/graphql`

### Client Setup

1. Navigate to the client directory:
```bash
cd ivy-ai-client
```

2. Install dependencies:
```bash
npm install
```

3. Generate GraphQL types:
```bash
npm run codegen
```

4. Start the development server:
```bash
npm run dev
```

The client will be available at `http://localhost:5173`

To watch for GraphQL schema changes during development:
```bash
npm run codegen:watch
```

## 🎨 Client

The client is a modern React application that provides a beautiful and intuitive interface for students to manage their academic life.

### Tech Stack

- **React** - UI framework
- **TypeScript** - Type-safe programming
- **TanStack Router** - Type-safe routing
- **Apollo Client** - GraphQL client
- **TailwindCSS** - Utility-first CSS
- **DaisyUI** - UI component library
- **React Hook Form** - Form management
- **Zod** - Schema validation



## 🚀 Server

The server provides GraphQL API endpoints for user authentication and data management.

### Tech Stack

- **TypeScript** - Type-safe programming
- **Express** - Web framework
- **Apollo Server** - GraphQL implementation
- **Drizzle ORM** - Database ORM
- **Supabase Auth** - Authentication service
- **PostgreSQL** - Database

### Project Structure

```
ivy-ai-server/
├── src/
│   ├── controllers/     # Business logic and database operations
│   ├── db/
│   │   ├── schema/     # Database schema definitions
│   │   └── index.ts    # Database connection setup
│   ├── graphql/
│   │   ├── resolvers/  # GraphQL resolvers
│   │   ├── schemas/    # GraphQL type definitions
│   │   └── context.ts  # GraphQL context setup
│   ├── services/       # Business logic services
│   └── types/         # TypeScript type definitions
```

### Available Scripts

#### Client
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run codegen` - Generate GraphQL types
- `npm run codegen:watch` - Watch and generate GraphQL types
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

#### Server
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run generate` - Generate Drizzle migrations
- `npm run migrate` - Run database migrations
- `npm run push` - Push schema changes to database

### Authentication

The server uses Supabase for authentication and maintains a separate user profile in PostgreSQL. Authentication flow:

1. User signs up/signs in through Supabase Auth
2. Server creates/verifies user profile in database
3. JWT token is used for subsequent requests

### API Structure

#### GraphQL Endpoints

- `Query.me` - Get current user
- `Query.user` - Get user by ID
- `Mutation.signUp` - Register new user
- `Mutation.signIn` - Authenticate user

#### Example Query

```graphql
query Me {
  me {
    id
    email
    fullName
    createdAt
    updatedAt
  }
}
```