Readme
📘 Invo - Invoice App — Full-Stack Smart Invoice & Inventory System
A modern full-stack Invoice Management System built with React + TypeScript on the frontend and Node.js + Express + Knex + TypeScript on the backend.
Supports invoice creation, customers, products, stock management, taxes, payments, analytics, PDF generation, and authentication.
Designed to be modular, scalable, and production-ready.

## 🚀 Tech Stack
Frontend
React + TypeScript
Vite
TailwindCSS
Axios
React Router v6
Zustand (optional) for global state
Backend
Node.js & Express
TypeScript
Knex.js ORM
SQLite / PostgreSQL
JSON Web Tokens (JWT)
HTML → PDF Generator
Jest + Supertest for automated tests

## 🎯 Core Features (MVP Completed)
🔐 Authentication
User registration
Login
JWT-based session
Forgot/reset password
Protected routes

👥 Customer Management
Add, edit, delete customers
Customer list with search
Customer selection in invoice

📦 Products & Inventory
Product CRUD
Stock management
Add/update stock
Low stock alerts on dashboard

🧾 Invoice System
Create invoice with multiple items
Auto invoice number generation
Tax selection
Notes
Draft, Paid, Overdue status
Invoice list
Download PDF (HTML → PDF)

💰 Payments
Add payments to invoices
Partial payment support
Outstanding calculation

📊 Dashboard & Analytics
Monthly sales
Outstanding invoices
Cash in hand
Top customers
Low stock products

🏗 Database Architecture
9 migrations created:
users
customers
products
inventory
invoices
invoice_items
invoice_payments
tax_rates
password_resets
Large fake seed data:
50 customers
200 products

## 📂 Project Structure
Frontend (client/)
client/
 ├── src/
 │   ├── components/
 │   ├── pages/
 │   ├── api/
 │   ├── hooks/
 │   ├── styles/
 │   └── app.tsx
 ├── public/
 └── vite.config.ts


​
Backend (server/)
server/
 ├── src/
 │   ├── controllers/
 │   ├── services/
 │   ├── repositories/
 │   ├── routes/
 │   ├── engines/
 │   ├── db/
 │   ├── middleware/
 │   ├── utils/
 │   ├── app.ts
 │   └── server.ts
 ├── migrations/
 ├── seeds/
 ├── knexfile.js
 ├── jest.config.js
 └── tests/


​
## 🔧 Installation & Setup
1. Clone the repository
git clone https://github.com/<your-name>/invo-invoice-app.git
cd invo-invoice-app


​
### 🖥 Backend Setup
cd server
npm install


​
Environment Variables
Create .env:
PORT=5000
JWT_SECRET=your-secret
DB_CLIENT=sqlite3
DB_FILENAME=./dev.db
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASS=


​
Run migrations
npx knex migrate:latest
npx knex seed:run


​
Start backend
npm run dev


​
### 🎨 Frontend Setup
cd ../client
npm install
npm run dev


​
Frontend typically runs on:
http://localhost:5173


​
Backend:
http://localhost:5000


​
## 🔌 API Overview (Quick Guide)
Auth
Method
Endpoint
Description
POST
/api/v1/auth/register
Register new user
POST
/api/v1/auth/login
Login
POST
/api/v1/auth/forgot
Forgot password
POST
/api/v1/auth/reset
Reset password
Customers
Method
Endpoint
GET
/api/v1/customers
POST
/api/v1/customers
GET
/api/v1/customers/:id
PUT
/api/v1/customers/:id
DELETE
/api/v1/customers/:id
Products
Method
Endpoint
GET
/api/v1/products
POST
/api/v1/products
PUT
/api/v1/products/:id
DELETE
/api/v1/products/:id
Inventory
Method
Endpoint
GET
/api/v1/inventory
POST
/api/v1/inventory
PATCH
/api/v1/inventory/:id
Invoices
Method
Endpoint
GET
/api/v1/invoices
POST
/api/v1/invoices
GET
/api/v1/invoices/:id
PATCH
/api/v1/invoices/:id/status
DELETE
/api/v1/invoices/:id
GET
/api/v1/invoices/:id/pdf

## 🧪 Automated Testing (Backend)
Using Jest + Supertest.
Run tests:
npm run test


​
Includes tests for:
Authentication
Customers CRUD
Additional tests can be added easily.

## 📸 Screenshots (Add yours here)
Dashboard
Invoice Create
(Add image)
(Add image)

## 📌 Roadmap
Multi-user tenants
Recurring invoices
Email invoice directly to customers
Webhooks for payments
Advanced analytics (graphs + trends)
Light/Dark Mode
Mobile App (React Native)

## 🤝 Contributing
Pull requests are welcome.
Steps:
Fork the repo
Create a feature branch
Commit your changes
Open a Pull Request

## 📄 License
MIT License © 2025 — Open for personal and commercial use.

## ⭐ Support the Project
If this project helped you, give it a ⭐ on GitHub!