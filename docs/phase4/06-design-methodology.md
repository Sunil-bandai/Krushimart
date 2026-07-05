# Design Methodology Justification — KrushiMart

## Overview
This document justifies the design patterns, architectural decisions, and methodologies used in building KrushiMart.

---

## 1. Model-View-Controller (MVC) Pattern — Backend (4 marks worth)

### What We Used
The backend follows the **MVC architectural pattern** adapted for REST APIs:

| MVC Layer | KrushiMart Implementation |
|---|---|
| **Model** | Mongoose schemas (`User.js`, `Product.js`, `Order.js`, etc.) define data structure, validation, and relationships |
| **View** | JSON responses sent to the client (`res.json({ success: true, data: ... })`) |
| **Controller** | Route handlers (`authController.js`, `productController.js`, etc.) contain business logic |

### Why MVC?

**Separation of Concerns**: Each layer has a single responsibility:
- Models handle **data integrity** (schema validation, field types, required fields)
- Controllers handle **business logic** (authentication checks, stock validation, status transitions)
- Routes handle **URL mapping** (which URL triggers which controller)

**Maintainability**: When we needed to fix the order placement bug, we only modified `orderController.js` — no changes to the Order model or routes.

**Testability**: Controllers can be tested independently by mocking the Model layer.

**Scalability**: New features (like the chatbot) were added as a new controller + route pair without touching existing code.

### Example
```
POST /api/orders
  → orderRoutes.js (maps URL to controller)
  → orderController.placeOrder (validates stock, creates order)
  → Product.findByIdAndUpdate (decrements stock)
  → Order.create (saves to database)
  → Returns JSON response
```

---

## 2. Component-Based UI Architecture — Frontend

### What We Used
The frontend uses **React's component-based architecture** where the UI is built from small, reusable, self-contained components.

### Component Hierarchy
```
App.jsx
├── ErrorBoundary (catches render errors)
├── QueryClientProvider (server state)
├── BrowserRouter (routing)
├── Navbar (shared navigation)
├── Routes
│   ├── LandingPage
│   ├── ShopPage
│   │   └── ProductCard (reusable product display)
│   ├── ProductDetailPage
│   ├── CartPage
│   ├── AuthPage
│   ├── FarmerDashboard
│   │   └── DashboardSidebar (shared sidebar)
│   ├── AdminDashboard
│   │   └── DashboardSidebar (reused)
│   └── NotFoundPage
├── ChatBotWidget (global floating widget)
├── ConfirmModal (global confirmation dialog)
└── Footer
```

### Why Component-Based?

**Reusability**: `ProductCard` is used in both ShopPage and LandingPage. `DashboardSidebar` is shared between Farmer and Admin dashboards.

**Isolation**: A bug in FarmerOrders doesn't affect AdminProducts. Each page is a self-contained unit.

**Props-based Communication**: Components receive data through props, making the data flow predictable and easy to debug.

**State Co-location**: Each component manages its own local state (form inputs, UI toggles) while sharing global state through Zustand stores.

---

## 3. RESTful API Design

### What We Used
The backend follows **REST (Representational State Transfer)** principles:

| REST Principle | Implementation |
|---|---|
| **Resource-based URLs** | `/api/products`, `/api/orders`, `/api/users` — nouns, not verbs |
| **HTTP Methods** | GET (read), POST (create), PUT (update), DELETE (remove) |
| **Status Codes** | 200 (OK), 201 (Created), 400 (Bad Request), 401 (Unauthorized), 403 (Forbidden), 404 (Not Found), 500 (Server Error) |
| **Stateless** | Each request contains all needed info (JWT token in header) |

### Why REST?

**Simplicity**: Standard HTTP semantics that any frontend can consume.

**Scalability**: Stateless servers can be horizontally scaled.

**Interoperability**: Any HTTP client (browser, mobile app, Postman) can interact with the API.

**Discoverability**: Consistent URL patterns make the API intuitive.

---

## 4. Dual State Management — Frontend

### What We Used
Two complementary state management solutions:

| Solution | Purpose | Data |
|---|---|---|
| **Zustand** | Client-side state | Auth (user, token), Cart (items), UI (loading, notifications) |
| **React Query** | Server-side state | Products, Orders, Reviews, Analytics |

### Why Two Solutions?

**Zustand** is ideal for:
- Authentication state (persisted to localStorage)
- Shopping cart (persisted to localStorage)
- UI state (loading spinners, modals)
- Data that doesn't come from the API

**React Query** is ideal for:
- API data (products, orders, reviews)
- Automatic caching (avoids refetching on page switch)
- Background refetching (keeps data fresh)
- Mutation handling (optimistic updates, cache invalidation)

**They don't conflict**: Zustand owns client state, React Query owns server state. This clean separation prevents the common problem of "which store owns this data?"

---

## 5. Security-First Design

### What We Used

| Security Measure | Implementation |
|---|---|
| **Password Hashing** | bcryptjs with salt rounds = 10 |
| **JWT Authentication** | 30-day expiry, HMAC-SHA256 signing |
| **Role-Based Access Control** | protect → farmerOnly → adminOnly middleware chain |
| **Rate Limiting** | 20 requests per 15 minutes on auth endpoints |
| **Input Validation** | Mongoose schema validation + controller-level checks |
| **CORS Restriction** | Only allows requests from frontend origin |
| **Password History** | Last 5 passwords checked, reuse prevented |
| **Error Sanitization** | Production mode hides error details |

### Why Security-First?

**Defense in Depth**: Multiple layers (middleware, controller, model) each validate independently.

**Principle of Least Privilege**: Consumers can't access farmer routes. Farmers can't access admin routes. Each role can only do what it needs.

**Production Readiness**: Error messages don't leak stack traces or database details in production mode.

---

## 6. Design Justification Summary

| Decision | Choice Made | Alternatives Considered | Why This Choice |
|---|---|---|---|
| Backend Architecture | MVC (Express) | GraphQL, gRPC | REST + MVC is simpler, sufficient for this scale |
| Frontend Framework | React + Vite | Next.js, Vue | React has largest ecosystem, Vite is fastest bundler |
| State Management | Zustand + React Query | Redux, Context API | Less boilerplate, better performance |
| Database | MongoDB (Mongoose) | PostgreSQL, MySQL | Flexible schema fits varying product attributes |
| Authentication | JWT | Session-based, OAuth | Stateless, works across domains, simple to implement |
| Styling | Tailwind CSS | CSS Modules, Styled Components | Rapid prototyping, consistent design system |
| File Upload | Multer (local) | Cloudinary, S3 | Simple for development, can migrate to cloud later |

---

## How to Write This for Your Report

1. **Opening paragraph**: Briefly describe KrushiMart as a MERN stack application
2. **For each design pattern**: Explain what it is → why we chose it → how it benefits the project
3. **Include a small diagram** of the MVC pattern (draw a simple 3-box diagram)
4. **Conclude**: Summarize how these decisions resulted in a maintainable, scalable, and secure application
