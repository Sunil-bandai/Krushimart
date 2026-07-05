# Architecture Diagram — KrushiMart

## Overview
The Architecture Diagram shows the high-level system components and how they communicate.

## System Architecture: 3-Tier Client-Server

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        PRESENTATION TIER                                 │
│                                                                          │
│  ┌──────────────────────────────────────────────────────────────────┐   │
│  │                     React Frontend (Vite)                        │   │
│  │                                                                  │   │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────────────┐   │   │
│  │  │   Auth   │ │   Shop   │ │   Cart   │ │  Farmer/Admin    │   │   │
│  │  │   Page   │ │   Page   │ │   Page   │ │  Dashboards      │   │   │
│  │  └──────────┘ └──────────┘ └──────────┘ └──────────────────┘   │   │
│  │                                                                  │   │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────────────┐   │   │
│  │  │ Zustand  │ │React     │ │  Axios   │ │  Tailwind CSS    │   │   │
│  │  │ (State)  │ │Query     │ │  (API)   │ │  (Styling)       │   │   │
│  │  └──────────┘ └──────────┘ └──────────┘ └──────────────────┘   │   │
│  └──────────────────────────────────────────────────────────────────┘   │
│                              │                                           │
│                    HTTP/HTTPS (port 3002)                                │
│                              │                                           │
├──────────────────────────────┼───────────────────────────────────────────┤
│                        BUSINESS LOGIC TIER                               │
│                              │                                           │
│  ┌──────────────────────────────────────────────────────────────────┐   │
│  │                   Express.js Server (Node.js)                    │   │
│  │                          (port 5000)                             │   │
│  │                                                                  │   │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────────────┐   │   │
│  │  │   Auth   │ │ Product  │ │  Order   │ │   Cart/Review    │   │   │
│  │  │ Routes   │ │ Routes   │ │ Routes   │ │   Routes         │   │   │
│  │  └────┬─────┘ └────┬─────┘ └────┬─────┘ └────────┬─────────┘   │   │
│  │       │             │            │                 │              │   │
│  │  ┌────▼─────┐ ┌─────▼────┐ ┌────▼──────┐ ┌──────▼──────────┐  │   │
│  │  │   Auth   │ │ Product  │ │  Order    │ │  Cart/Review    │  │   │
│  │  │Controller│ │Controller│ │Controller │ │  Controllers    │  │   │
│  │  └────┬─────┘ └─────┬────┘ └────┬──────┘ └──────┬──────────┘  │   │
│  │       │             │            │                 │              │   │
│  │  ┌────▼─────────────▼────────────▼─────────────────▼──────────┐ │   │
│  │  │              Middleware Layer                                │ │   │
│  │  │  ┌─────────┐ ┌──────────┐ ┌──────────┐ ┌──────────────┐  │ │   │
│  │  │  │ JWT     │ │ Rate     │ │  CORS    │ │  Multer      │  │ │   │
│  │  │  │ Auth    │ │ Limiter  │ │          │ │  (Uploads)   │  │ │   │
│  │  │  └─────────┘ └──────────┘ └──────────┘ └──────────────┘  │ │   │
│  │  └───────────────────────────────────────────────────────────┘ │   │
│  └──────────────────────────────────────────────────────────────────┘   │
│                              │                                           │
│                    Mongoose ODM (port 27017)                             │
│                              │                                           │
├──────────────────────────────┼───────────────────────────────────────────┤
│                          DATA TIER                                       │
│                              │                                           │
│  ┌──────────────────────────▼──────────────────────────────────────┐    │
│  │                     MongoDB Database                             │    │
│  │                                                                  │    │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────────────┐  │    │
│  │  │  Users   │ │ Products │ │  Orders  │ │  Carts/Reviews   │  │    │
│  │  │Collection│ │Collection│ │Collection│ │  Collections     │  │    │
│  │  └──────────┘ └──────────┘ └──────────┘ └──────────────────┘  │    │
│  └──────────────────────────────────────────────────────────────────┘    │
│                                                                          │
├──────────────────────────────────────────────────────────────────────────┤
│                      EXTERNAL SERVICES                                   │
│                                                                          │
│  ┌──────────────────────┐          ┌──────────────────────────────┐     │
│  │   OpenAI API          │          │   Gmail SMTP                  │     │
│  │   (Chatbot)           │          │   (Email Service)             │     │
│  │   GPT-3.5-turbo       │          │   Nodemailer                  │     │
│  │   Port: External      │          │   Port: 587                   │     │
│  └──────────────────────┘          └──────────────────────────────┘     │
│                                                                          │
└──────────────────────────────────────────────────────────────────────────┘
```

## Component Descriptions

### Presentation Tier
| Component | Technology | Purpose |
|---|---|---|
| Auth Page | React | Login/Register/Forgot Password forms |
| Shop Page | React + React Query | Product browsing with filters |
| Cart Page | React + Zustand | Shopping cart management |
| Dashboards | React | Farmer and Admin management panels |
| Zustand | State Management | Client state (auth, cart, UI) |
| React Query | Server State | API data caching and mutations |
| Axios | HTTP Client | API calls with interceptors |
| Tailwind CSS | CSS Framework | Utility-first styling |

### Business Logic Tier
| Component | Technology | Purpose |
|---|---|---|
| Express Server | Node.js + Express 5 | HTTP server and routing |
| Auth Middleware | JWT | Token verification and role guards |
| Rate Limiter | express-rate-limit | Prevent brute-force attacks |
| CORS | cors middleware | Cross-origin request handling |
| Multer | File Upload | Image upload for products/avatars |
| Controllers | JavaScript | Business logic for each resource |

### Data Tier
| Component | Technology | Purpose |
|---|---|---|
| MongoDB | Database | Document storage |
| Mongoose | ODM | Schema validation and queries |

### External Services
| Service | Purpose | Required? |
|---|---|---|
| OpenAI API | AI chatbot responses | Optional (fallback to local) |
| Gmail SMTP | Order emails, password reset | Optional (skips if not configured) |

## Deployment Architecture

```
┌─────────────────────────────────────────────────────┐
│                    USER'S BROWSER                     │
│                  (https://krushimart.vercel.app)      │
└──────────────────────┬──────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────┐
│                  VERCEL (Frontend)                    │
│              React SPA (static files)                 │
│              VITE_API_URL → Backend URL               │
└──────────────────────┬──────────────────────────────┘
                       │ API calls
                       ▼
┌─────────────────────────────────────────────────────┐
│             RAILWAY / RENDER (Backend)                │
│          Express.js (Node.js runtime)                 │
│          process.env.PORT (assigned)                  │
└──────────────────────┬──────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────┐
│              MONGODB ATLAS (Cloud DB)                 │
│          MONGO_URI (connection string)                │
│          IP Whitelist: 0.0.0.0/0                     │
└─────────────────────────────────────────────────────┘
```

## How to Draw in draw.io

1. **Search "Architecture" or "Component" in left panel**
2. **Create 3 large rectangles** for each tier (Presentation, Business Logic, Data)
3. **Add smaller boxes** inside each tier for components
4. **Draw arrows** between tiers showing communication protocol
5. **Use different colors** for each tier:
   - Blue: Presentation (frontend)
   - Green: Business Logic (backend)
   - Orange: Data (database)
   - Purple: External Services
6. **Label arrows** with protocol names (HTTP, MongoDB protocol, SMTP)
7. **Add a deployment section** showing Vercel, Railway, MongoDB Atlas
