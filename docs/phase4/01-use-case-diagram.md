# Use Case Diagram — KrushiMart

## Overview
The Use Case Diagram shows all actors (users) and their interactions with the KrushiMart system.

## Actors

| Actor | Description | Color Suggestion |
|---|---|---|
| **Guest** | Unauthenticated visitor | Gray |
| **Consumer** | Registered buyer who purchases products | Green |
| **Farmer** | Registered seller who lists products | Blue |
| **Admin** | Platform administrator | Red |

## Use Cases by Actor

### Guest (Unauthenticated)
| Use Case | Description |
|---|---|
| Browse Products | View all approved products in the shop |
| Search Products | Search products by name with filters |
| View Product Details | See full product info, price, farmer |
| Register | Create a new account (consumer or farmer) |
| Login | Authenticate with email and password |
| Forgot Password | Request password reset via email |

### Consumer (extends Guest)
| Use Case | Description |
|---|---|
| All Guest use cases | Consumer inherits all Guest capabilities |
| Add to Cart | Add products to shopping cart |
| Place Order | Checkout with delivery address |
| Track Orders | View order status history |
| Write Review | Rate and review purchased products |
| Manage Profile | Update name, phone, address, avatar |
| Change Password | Update password (with history check) |

### Farmer (extends Consumer)
| Use Case | Description |
|---|---|
| All Consumer use cases | Farmer inherits all Consumer capabilities |
| Add Product | Create new product listing with image |
| Edit Own Product | Update name, price, stock, image |
| Delete Own Product | Remove product from listings |
| View Farmer Orders | See orders containing own products |
| Update Order Status | Confirm → Dispatch → Deliver (per-farmer) |
| View Analytics | See total products, stock count |
| Manage Settings | Update farm details and password |

### Admin
| Use Case | Description |
|---|---|
| View Dashboard | See platform-wide analytics |
| Approve Products | Review and approve farmer products |
| Manage Users | Activate/deactivate/delete users |
| Manage Categories | Create/edit/delete product categories |
| View All Orders | See all orders across platform |
| View Analytics | Revenue, user counts, category breakdown |

## Relationships

```
Guest ──<<extend>>──> Consumer
Guest ──<<extend>>──> Farmer
Consumer ──<<extend>>──> Farmer
Admin ──<<include>>──> Login
```

## How to Draw in draw.io

1. **Create 4 Actor shapes** (left panel → Search "Actor"):
   - Place them vertically on the left side: Guest, Consumer, Farmer, Admin
   - Label each with the actor name below the stick figure

2. **Create Use Case ovals** (left panel → Search "Ellipse"):
   - Group ovals by actor in columns
   - Label each oval with the use case name

3. **Draw solid lines** from actors to their use cases

4. **Draw dashed arrows** for `<<include>>` and `<<extend>>`:
   - `<<include>>`: Dashed arrow FROM base TO included (mandatory)
   - `<<extend>>`: Dashed arrow FROM extension TO base (optional)

5. **Draw a system boundary** (large rectangle):
   - Enclose all use cases inside
   - Label it "KrushiMart System" at the top

6. **Add the 3 stereotypes** as text labels on dashed arrows:
   - `<<include>>` between Admin and Login
   - `<<extend>>` between Consumer and Guest
   - `<<extend>>` between Farmer and Consumer

## Visual Layout

```
┌─────────────────────────────────────────────────────┐
│                   KrushiMart System                   │
│                                                       │
│  Guest ──────> [Browse Products]                      │
│     │────────> [Search Products]                      │
│     │────────> [View Product Details]                 │
│     │────────> [Register]                             │
│     │────────> [Login]                                │
│     │────────> [Forgot Password]                      │
│                                                       │
│  Consumer ──> [Add to Cart]                           │
│     │────────> [Place Order]                          │
│     │────────> [Track Orders]                         │
│     │────────> [Write Review]                         │
│     │────────> [Manage Profile]                       │
│                                                       │
│  Farmer ────> [Add Product]                           │
│     │────────> [Edit/Delete Product]                  │
│     │────────> [View Farmer Orders]                   │
│     │────────> [Update Order Status]                  │
│     │────────> [View Analytics]                       │
│                                                       │
│  Admin ─────> [Approve Products]                      │
│     │────────> [Manage Users]                         │
│     │────────> [Manage Categories]                    │
│     │────────> [View All Orders]                      │
│     │────────> [View Analytics]                       │
└─────────────────────────────────────────────────────┘
```
