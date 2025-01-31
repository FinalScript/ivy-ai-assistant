# 🌿 Ivy AI Server

GraphQL server for Ivy AI, providing user authentication and data management.

## 🚀 Tech Stack

- **TypeScript** - Type-safe programming
- **Express** - Web framework
- **Apollo Server** - GraphQL implementation
- **Drizzle ORM** - Database ORM
- **Supabase Auth** - Authentication service
- **PostgreSQL** - Database

## 🛠️ Getting Started

### Prerequisites

- Node.js (v16 or higher)
- PostgreSQL database
- Supabase project

### Installation

1. Clone the repository
```bash
git clone https://github.com/your-org/ivy-ai-server.git
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

4. Generate and run database migrations
```bash
npm run generate
npm run migrate
```

5. Start the development server
```bash
npm run dev
```

## 📁 Project Structure

```
src/
├── controllers/     # Business logic and database operations
├── db/
│   ├── schema/     # Database schema definitions
│   └── index.ts    # Database connection setup
├── graphql/
│   ├── resolvers/  # GraphQL resolvers
│   ├── schemas/    # GraphQL type definitions
│   └── context.ts  # GraphQL context setup
├── services/       # Business logic services
└── types/         # TypeScript type definitions
```

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run generate` - Generate Drizzle migrations
- `npm run migrate` - Run database migrations
- `npm run push` - Push schema changes to database

## 🔒 Authentication

The server uses Supabase for authentication and maintains a separate user profile in PostgreSQL. Authentication flow:

1. User signs up/signs in through Supabase Auth
2. Server creates/verifies user profile in database
3. JWT token is used for subsequent requests

## 📡 API Structure

### GraphQL Endpoints

- `Query.me` - Get current user
- `Query.user` - Get user by ID
- `Mutation.signUp` - Register new user
- `Mutation.signIn` - Authenticate user

### Example Query

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

## 🔐 Environment Variables

```env
# Database connection string
DATABASE_URL=postgresql://postgres:[PASSWORD]@[HOST]/postgres

# Supabase configuration
SUPABASE_URL=your-project-url
SUPABASE_ANON_KEY=your-anon-key
```