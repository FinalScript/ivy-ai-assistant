# 🌿 Ivy AI

A modern AI-powered student assistant that helps organize your academic life.

## 📦 Project Structure

```
/
├── ivy-ai-server/     # GraphQL API server
└── ivy-ai-client/     # React client application
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

### Features

- 🔐 Secure authentication with email/password
- 👤 User onboarding flow
- 🎨 Theme customization with multiple themes
- 📱 Responsive design for all devices
- 🔄 Real-time form validation
- ⚡ Fast and intuitive navigation

### Getting Started

#### Prerequisites

- Node.js (v16 or higher)
- Running instance of ivy-ai-server

#### Installation

1. Navigate to client directory
```bash
cd ivy-ai-client
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env
# Update .env with your configuration
```

4. Start the development server
```bash
npm run dev
```

### Environment Variables

```env
# API configuration
VITE_API_URL=http://localhost:4000/graphql
```

### Project Structure

```
ivy-ai-client/
├── src/
│   ├── components/    # Reusable UI components
│   ├── routes/       # Route components and configuration
│   ├── providers/    # Context providers
│   ├── hooks/        # Custom React hooks
│   ├── graphql/      # GraphQL queries and mutations
│   └── lib/          # Utility functions and configurations
```

## 🚀 Server

The server provides GraphQL API endpoints for user authentication and data management.

### Tech Stack

- **TypeScript** - Type-safe programming
- **Express** - Web framework
- **Apollo Server** - GraphQL implementation
- **Drizzle ORM** - Database ORM
- **Supabase Auth** - Authentication service
- **PostgreSQL** - Database

### Getting Started

#### Prerequisites

- Node.js (v16 or higher)
- PostgreSQL database
- Supabase project

#### Installation

1. Navigate to server directory
```bash
cd ivy-ai-server
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env
# Update .env with your credentials
```

4. Start the development server
```bash
npm run dev
```

### Environment Variables

```env
# Database connection string
DATABASE_URL=postgresql://postgres:[PASSWORD]@[HOST]/postgres

# Supabase configuration
SUPABASE_URL=your-project-url
SUPABASE_ANON_KEY=your-anon-key
``` 

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

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
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