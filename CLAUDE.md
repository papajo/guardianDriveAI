# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Run tests
npm test
```

### Build
```bash
# Build for production
npm run build
```

### Linting
```bash
# Lint code
npm run lint
```

### Deployment
```bash
# Deploy to production
npm run deploy
```

## Architecture

The project follows a modular architecture with these main components:

1. **Frontend**: React-based UI with Redux for state management
2. **Backend**: Node.js/Express API with TypeScript
3. **Database**: PostgreSQL with Sequelize ORM
4. **Services**: Microservices for authentication, payments, and notifications

## Key Files

- `src/` - Source code directory
- `public/` - Static assets
- `tests/` - Test suite
- `config/` - Configuration files

## Setup Instructions

1. Clone the repository
2. Install dependencies
3. Create `.env` file with required variables
4. Run migrations
5. Start the development server

## Notes
- Use `npm run dev` for local development
- All commands should be run from the project root
- Dependencies are managed via `package.json`

---

Generated