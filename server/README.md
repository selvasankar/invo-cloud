1) README.md (Backend — Hosted Invoice App)


# Hosted Invoice App — Backend

This README covers local dev setup, migrations, seeds, running the server, and the smoke tests.

## Prerequisites
- Node.js 18+ (LTS recommended)
- npm or yarn
- PostgreSQL 13+
- `psql` CLI (for running reset.sql optionally)
- Optional: Docker for running Postgres locally

## Quick start (dev)
1. Clone the repo
   ```bash
   git clone <your-repo-url> invoiceapp
   cd invoiceapp/server


## Install dependencies

npm install
# or
yarn


## Configure environment
Copy .env.example to .env and edit values:

cp .env.example .env


## Required env vars:
```bash
  DATABASE_URL=postgres://postgres:password@localhost:5432/invoiceapp_dev
  PORT=4000
  JWT_SECRET=your_jwt_secret_here
  NODE_ENV=development
```

## Start Postgres (local)

### Docker:
```bash
docker run --rm -e POSTGRES_PASSWORD=password -e POSTGRES_DB=invoiceapp_dev -p 5432:5432 postgres:13
```

### Or run a local Postgres service and ensure DATABASE_URL points to it.

## Create DB extensions (if needed)
### Using psql:
```sql
CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
```

## Run migrations (TypeScript migrations)
```bash
npx ts-node --transpile-only node_modules/knex/bin/cli.js migrate:latest --knexfile knexfile.js
```

## Run seeds
```bash
npx ts-node --transpile-only node_modules/knex/bin/cli.js seed:run --knexfile knexfile.js
```

## Run the server

npm run dev
# or production build
npm run start

## Reset DB (dev)

Use reset.sql to drop and recreate schema (DESTRUCTIVE — dev only):
```bash
psql -U postgres -d invoiceapp_dev -f reset.sql
```

## Smoke tests

### Install axios and run:
```bash
npm install axios
node smoke_ultra.js

Or:

BASE_URL=http://localhost:4000/api/v1 node smoke_ultra.js
```

## API docs & Postman

Open openapi_ultra.yaml with Swagger UI / Redoc.

Import postman_ultra.json into Postman.

## Common tasks

### Add migration:
```bash
npx knex --knexfile knexfile.js migrate:make add_your_table
```

## Generate seed:
```bash
npx knex --knexfile knexfile.js seed:make my_seed
```

## Troubleshooting
```bash
gen_random_uuid() missing: ensure pgcrypto extension created.
```
password authentication failed: verify DATABASE_URL credentials and Postgres is running.

If migrations fail with duplicate table: inspect migrations folder, ensure only one create per table.

## Contributing workflow (GitHub)

### Create feature branch:
```bash
git checkout -b feat/invoices-crud


Commit small, atomic changes with descriptive messages (examples below).

Push and open PR.
```

##  License

MIT


---

## 2) `.gitignore`
Create file: `/server/.gitignore`

Node

/node_modules
/dist
/build
/.env
.env.local
.env..local
npm-debug.log
yarn-debug.log*
yarn-error.log*
pnpm-lock.yaml

IDE

.vscode/
.idea/
*.suo
.ntvs
*.njsproj
*.sln

OS

.DS_Store
Thumbs.db

Logs

logs
.log
debug.log

knex/DB artifacts

knexfile.js.backup


---

## 3) Git / GitHub commands (exact, copy/paste)

Assume you have repo locally in `invoiceapp` and you're inside `/invoiceapp/server`.

**A. Initialize repo (if not already)**

```bash
# from project root
git init
git add .
git commit -m "chore: initial backend scaffold, migrations and seeds"


B. Create remote repo (GitHub CLI - recommended)

# login already required: gh auth login
gh repo create yourusername/invoiceapp-backend --public --source=. --remote=origin --push
# or private:
# gh repo create yourusername/invoiceapp-backend --private --source=. --remote=origin --push


C. If you prefer manual GitHub UI

Create repo on github.com

Add remote:

git remote add origin git@github.com:yourusername/invoiceapp-backend.git
git branch -M main
git push -u origin main


D. Feature branch + PR (example)

git checkout -b feat/invoices-crud
# make changes
git add .
git commit -m "feat(invoices): add invoices CRUD endpoints, migrations, and tests"
git push -u origin feat/invoices-crud

# Create PR (GitHub CLI)
gh pr create --title "feat: invoices CRUD" --body "Implements invoices CRUD (create/list/get) with migrations & seeds." --base main

4) Example commit messages (atomic)

- chore(migrations): add invoices and invoice_lines migrations

- feat(invoices): create invoice controller and service

- fix(seeds): make tax_rates seed idempotent and transactional

- test(e2e): add smoke test script for basic flow

- docs(readme): add backend README and setup instructions

5) PR template / description (copy-paste)

Title: feat: invoices CRUD + migrations + smoke test

Description:

### Summary
This PR implements invoice CRUD endpoints and related DB migrations + seeds. It also adds a smoke test to validate the end-to-end flow (register, login, create customer, product, invoice).

### Files changed
- migrations/*.ts (invoices, invoice_lines, payments)
- seeds/*.ts (tax_rates + dependents)
- src/controllers/invoice.controller.ts
- src/services/invoice.service.ts
- smoke_ultra.js
- README.md

### How to test
1. Create dev DB and set DATABASE_URL in .env
2. Run migrations: `npx ts-node --transpile-only node_modules/knex/bin/cli.js migrate:latest`
3. Run seeds: `npx ts-node --transpile-only node_modules/knex/bin/cli.js seed:run`
4. Start server: `npm run dev`
5. Run smoke test: `node smoke_ultra.js`

### Checklist
- [ ] Migrations run without errors
- [ ] Seeds are idempotent & transactional
- [ ] End-to-end smoke test passes
- [ ] Documentation updated

6) GitHub Actions (CI) skeleton

Create: .github/workflows/ci.yml

name: CI

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build-and-test:
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:13
        env:
          POSTGRES_USER: postgres
          POSTGRES_PASSWORD: password
          POSTGRES_DB: invoiceapp_test
        ports:
          - 5432:5432
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5

    steps:
      - uses: actions/checkout@v4

      - name: Use Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm ci

      - name: Wait for postgres
        run: sleep 10

      - name: Run migrations
        env:
          DATABASE_URL: postgres://postgres:password@localhost:5432/invoiceapp_test
        run: npx ts-node --transpile-only node_modules/knex/bin/cli.js migrate:latest --knexfile knexfile.js

      - name: Run tests
        env:
          DATABASE_URL: postgres://postgres:password@localhost:5432/invoiceapp_test
        run: npm test