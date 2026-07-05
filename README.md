# KrushiMart

Farm-to-consumer agricultural marketplace connecting farmers directly with consumers. Built with the MERN stack.

## Tech Stack

- **Frontend**: React 18, Vite 5, Tailwind CSS, Zustand, React Query v5
- **Backend**: Node.js 20, Express 5, Mongoose 9, JWT, bcryptjs, Multer
- **Database**: MongoDB Atlas
- **AI**: OpenAI GPT-3.5-turbo (chatbot)
- **Email**: Nodemailer (Gmail SMTP)

## Prerequisites

- Node.js >= 20.0.0
- MongoDB (local or Atlas)
- npm or yarn

## Installation

```bash
# Clone the repository
git clone https://github.com/your-org/krushimart.git
cd krushimart

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install

# Install root dependencies (concurrently)
cd ..
npm install
```

## Environment Setup

### Backend

```bash
cd backend
cp .env.example .env
```

Edit `.env` with your values:

| Variable | Description | Example |
|---|---|---|
| PORT | Server port | `5000` |
| NODE_ENV | Environment | `development` |
| MONGO_URI | MongoDB connection string | `mongodb://localhost:27017/krushimart` |
| JWT_SECRET | JWT signing secret (min 64 chars) | `<random string>` |
| OPENAI_API_KEY | OpenAI API key (optional) | `sk-...` |
| FRONTEND_URL | Frontend URL for CORS | `http://localhost:3002` |
| SMTP_HOST | SMTP host | `smtp.gmail.com` |
| SMTP_PORT | SMTP port | `587` |
| SMTP_USER | SMTP email | `you@gmail.com` |
| SMTP_PASS | SMTP app password | `xxxx xxxx xxxx xxxx` |

### Frontend

```bash
cd frontend
cp .env.example .env
```

| Variable | Description | Dev Value |
|---|---|---|
| VITE_API_URL | Backend URL | `http://localhost:5000` |

## Running Locally

```bash
# From project root — starts both backend and frontend
npm run dev

# Or start individually:
cd backend && npm run dev    # Backend on port 5000
cd frontend && npm run dev   # Frontend on port 3002
```

## Roles

| Role | Capabilities |
|---|---|
| **Consumer** | Browse shop, add to cart, place orders, track orders, write reviews |
| **Farmer** | List products, manage inventory, update order status, view analytics |
| **Admin** | Approve products, manage users, view platform analytics |

## API Endpoints

### Auth
- `POST /api/auth/register` — Register (consumer/farmer)
- `POST /api/auth/login` — Login
- `GET /api/auth/me` — Get current user (auth required)
- `POST /api/auth/forgot-password` — Request password reset
- `POST /api/auth/reset-password` — Reset password with token

### Products
- `GET /api/products` — List products (search, category, price filters, pagination)
- `GET /api/products/:id` — Get single product
- `POST /api/products` — Create product (farmer only)
- `PUT /api/products/:id` — Update product (owner only)
- `DELETE /api/products/:id` — Delete product (owner only)

### Orders
- `POST /api/orders` — Place order (consumer)
- `GET /api/orders/myorders` — Consumer's orders
- `GET /api/orders/farmer` — Farmer's orders
- `PUT /api/orders/:id/status` — Update status (farmer)
- `GET /api/orders` — All orders (admin)

### Cart
- `GET /api/cart` — Get cart
- `POST /api/cart` — Add to cart
- `PUT /api/cart/:productId` — Update quantity
- `DELETE /api/cart/:productId` — Remove item
- `DELETE /api/cart` — Clear cart

### Reviews
- `POST /api/reviews` — Add review (auth required, delivered orders only)
- `GET /api/reviews/:productId` — Get product reviews

### Admin
- `GET /api/admin/users` — List users
- `PUT /api/admin/users/:id/toggle` — Toggle user active
- `DELETE /api/admin/users/:id` — Delete user
- `GET /api/admin/products` — List all products
- `PUT /api/admin/products/:id/approve` — Approve product
- `DELETE /api/admin/products/:id` — Delete product
- `GET /api/admin/analytics` — Platform analytics

## Deployment

### Frontend (Vercel)
1. Push to GitHub
2. Import repository in Vercel
3. Set environment variable: `VITE_API_URL = https://your-backend-url.com`
4. Deploy — `vercel.json` handles SPA routing

### Backend (Railway / Render)
1. Set all environment variables in the host dashboard
2. `FRONTEND_URL` must match your Vercel deployment URL
3. Start command: `node server.js`

### Important Notes
- MongoDB Atlas IP whitelist must include `0.0.0.0/0` for cloud deployment
- File uploads (Multer) use local storage — switch to Cloudinary for production
- OpenAI API key is optional — chatbot falls back to local responses

## Team

| Name | Role |
|---|---|
| Sunil Bandai | Admin / Full Stack |
| Pramod Nandagavi | Backend Lead |
| Ashish Chougule | Frontend Lead |
| Vijay Bedage| Database |

Guide: Manjunath mathad
