📘 Invo Invoice App — Full Project Wiki
1. Introduction
🧾 What is Invo?

Invo is a full-stack invoice management app built with React + TypeScript, Node.js, Express, Knex, and PostgreSQL, designed for freelancers, small businesses, and teams who want fast, simple, clean invoicing.

⭐ Key Features

Create, update, delete invoices

Customer management

Products/services listing

Tax, discount, total calculation

Invoice PDF generation (upcoming)

Dashboard with charts (upcoming)

Authentication & roles (upcoming)

2. Overall Architecture
🏗️ System Design Diagram
[React Client] → [Express API] → [Service Layer] → [Knex ORM] → [PostgreSQL]

🔌 Tech Stack
Layer	Tools
Frontend	React, TypeScript, React Router, Axios, TailwindCSS, shadcn/ui
Backend	Node.js, Express, TypeScript, Knex
Database	PostgreSQL
Infrastructure	Docker, Nginx (prod), PM2
Testing	Jest, Supertest
Code Quality	ESLint, Prettier
Version Control	Git + GitHub + Conventional Commits
3. Project Setup
🖥️ Requirements

Node.js 20+

PostgreSQL 15+

pnpm or npm

Git

⚙️ Environment Variables

backend/.env

PORT=5000
DATABASE_URL=postgresql://postgres:password@localhost:5432/invo
JWT_SECRET=your-secret


client/.env

VITE_API_URL=http://localhost:5000

4. Backend Documentation
📁 Folder Structure
src/
 ├── controllers/
 ├── services/
 ├── routes/
 ├── db/
 │    ├── migrations/
 │    ├── seeds/
 │    └── knexfile.ts
 ├── utils/
 ├── middleware/
 └── app.ts

⚙️ Backend Boot Process

app.ts loads Express

Registers middleware (CORS, JSON, logger)

Registers routes

Bootstraps database (Knex)

Starts server

4.1 Controllers

Responsibilities:

Validate incoming requests

Call service layer

Send HTTP responses

Example:

InvoiceController.create → InvoiceService.createInvoice(data)

4.2 Services

Responsibilities:

Business logic

Validation

Database orchestration

Error handling

4.3 Routes

Example:

POST /api/invoices
GET  /api/invoices
GET  /api/invoices/:id
PUT  /api/invoices/:id
DELETE /api/invoices/:id

4.4 Database Layer (Knex)
🛠️ Migration Files

Create tables

Define schema

Maintain DB versioning

🌱 Seed Files

Insert sample customers, products, invoices

5. Frontend Documentation
📁 Folder Structure
client/
 ├── src/
 │    ├── components/
 │    ├── pages/
 │    ├── hooks/
 │    ├── context/
 │    ├── services/
 │    └── app.tsx

🔄 Frontend Boot Flow

app.tsx loads

Initializes Router

Loads Dashboard / Invoice pages

Fetches data via Axios API service

📦 Core UI Modules
1️⃣ Dashboard

List invoices

Quick actions

2️⃣ Invoice Form

Create new invoice

Add customer

Add items

Auto-calc totals

3️⃣ Customer Management

Add customer

Update customer

Customer listing

6. API Documentation (OpenAPI 3.0)

Below is a Wiki-friendly human readable version.

6.1 Invoice Endpoints
📌 GET /api/invoices

Returns all invoices.

📌 POST /api/invoices

Creates an invoice.
Body:

{
  "customer_id": 1,
  "items": [
    { "name": "Design Work", "qty": 2, "price": 500 }
  ]
}

📌 GET /api/invoices/:id

Fetch single invoice.

📌 PUT /api/invoices/:id

Update invoice.

📌 DELETE /api/invoices/:id

Delete invoice.

6.2 Customers API
POST /api/customers

Create customer.

GET /api/customers

List all customers.

7. Database Schema
🧩 Tables
customers
Column	Type
id	int PK
name	varchar
email	varchar
phone	varchar
invoices
Column	Type
id	int PK
customer_id	int FK
status	enum("paid", "unpaid")
total	decimal
invoice_items
Column	Type
id	int PK
invoice_id	int FK
name	varchar
qty	int
price	decimal
8. Testing Docs
🧪 Jest + Supertest Skeleton
describe("Invoice API", () => {
  it("should create invoice", async () => {
    const res = await request(app)
      .post("/api/invoices")
      .send({ customer_id: 1, items: [] });
    expect(res.status).toBe(201);
  });
});

9. Deployment Guide
🐳 Docker Commands
docker-compose up --build

🚀 Production Stack

Nginx reverse proxy

Node.js PM2

PostgreSQL

SSL via Certbot

10. Contribution Guide
📏 Commit Guidelines (Conventional Commits)
feat: add invoice creation API
fix: resolve DB connection issue
refactor: improve controller logic
docs: update readme

11. Project Roadmap
🔜 v1.0

 Customers module

 Invoice module

 Invoice PDF export

 Authentication

 Dashboard analytics

12. FAQ
❓ Why Knex instead of Prisma?

Lightweight, SQL-focused, easier migrations.

❓ Can it run on shared hosting?

Yes, if Node + PostgreSQL are supported.

13. Glossary
Term	Meaning
Invoice	Document requesting payment
Customer	Buyer/Client
Items	Line entries inside invoice
Status	Paid / Unpaid