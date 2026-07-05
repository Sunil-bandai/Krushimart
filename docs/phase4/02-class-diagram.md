# Class Diagram — KrushiMart

## Overview
The Class Diagram shows all database models, their fields, data types, and relationships between them.

## Models and Fields

### 1. User
| Field | Type | Constraints |
|---|---|---|
| _id | ObjectId | Primary Key |
| name | String | required |
| email | String | required, unique |
| password | String | required, hashed (bcrypt) |
| role | String | enum: consumer, farmer, admin; default: consumer |
| avatar | String | default: '' |
| isActive | Boolean | default: true |
| phone | String | default: '' |
| address | String | default: '' |
| passwordHistory | Array[{password, changedAt}] | select: false |
| resetPasswordToken | String | select: false |
| resetPasswordExpire | Date | select: false |
| createdAt | Date | auto |
| updatedAt | Date | auto |

### 2. Product
| Field | Type | Constraints |
|---|---|---|
| _id | ObjectId | Primary Key |
| name | String | required |
| description | String | required |
| price | Number | required |
| unit | String | default: 'kg' |
| category | String | required |
| image | String | required |
| stock | Number | required, default: 0 |
| farmer | ObjectId | ref: User, required |
| rating | Number | default: 0 |
| numReviews | Number | default: 0 |
| isApproved | Boolean | default: false |
| createdAt | Date | auto |
| updatedAt | Date | auto |

### 3. Category
| Field | Type | Constraints |
|---|---|---|
| _id | ObjectId | Primary Key |
| name | String | required, unique |
| description | String | default: '' |
| image | String | default: '' |
| createdAt | Date | auto |
| updatedAt | Date | auto |

### 4. Cart
| Field | Type | Constraints |
|---|---|---|
| _id | ObjectId | Primary Key |
| user | ObjectId | ref: User, required, unique |
| items | Array[CartItem] | embedded |
| └─ product | ObjectId | ref: Product, required |
| └─ quantity | Number | required, min: 1, default: 1 |
| └─ price | Number | required |
| createdAt | Date | auto |
| updatedAt | Date | auto |

### 5. Order
| Field | Type | Constraints |
|---|---|---|
| _id | ObjectId | Primary Key |
| consumerId | ObjectId | ref: User, required |
| items | Array[OrderItem] | embedded |
| └─ productId | ObjectId | ref: Product |
| └─ farmer | ObjectId | ref: User |
| └─ quantity | Number | |
| └─ price | Number | |
| totalAmount | Number | required |
| deliveryAddress | String | required |
| status | String | enum: pending, confirmed, dispatched, delivered; default: pending |
| farmerStatuses | Array[FarmerStatus] | embedded |
| └─ farmer | ObjectId | ref: User, required |
| └─ status | String | enum: pending, confirmed, dispatched, delivered, cancelled |
| createdAt | Date | auto |
| updatedAt | Date | auto |

### 6. Review
| Field | Type | Constraints |
|---|---|---|
| _id | ObjectId | Primary Key |
| productId | ObjectId | ref: Product, required |
| consumerId | ObjectId | ref: User, required |
| rating | Number | min: 1, max: 5, required |
| comment | String | |
| images | Array[String] | |
| createdAt | Date | auto |
| updatedAt | Date | auto |

## Relationships

| From | To | Type | Description |
|---|---|---|---|
| User | Product | 1:N | A farmer owns many products |
| User | Order | 1:N | A consumer places many orders |
| User | Cart | 1:1 | Each user has one cart |
| User | Review | 1:N | A consumer writes many reviews |
| Product | Review | 1:N | A product has many reviews |
| Product | Category | N:1 | Product belongs to a category (by name string) |
| Order | User (farmer) | N:M | Order tracks per-farmer status |

## How to Draw in draw.io

1. **Search "Class" in left panel** to find UML class shapes
2. **Drag 6 class boxes** onto the canvas
3. **For each class**, use the 3-compartment format:
   - Top: Class name (bold, centered)
   - Middle: Attributes (field: type)
   - Bottom: Methods (not shown for Mongoose models)
4. **Draw association lines** between classes:
   - Solid line with diamond = composition (Cart contains CartItems)
   - Solid line with arrow = association (User → Product)
   - Dashed line with arrow = dependency
5. **Add multiplicity labels**: `1`, `*`, `1..*` on the ends of lines

## Visual Layout

```
┌──────────┐     1     ┌──────────┐     *     ┌──────────┐
│   User   │──────────>│ Product  │──────────>│  Review  │
│──────────│           │──────────│           │──────────│
│ name     │           │ name     │           │ rating   │
│ email    │           │ price    │           │ comment  │
│ role     │           │ stock    │           │ images   │
│ phone    │           │ category │           └──────────┘
│ address  │           │ isApproved│
└──────────┘           └──────────┘
     │ 1                    │
     │                      │ N
     ▼ *                    ▼
┌──────────┐           ┌──────────┐
│   Cart   │           │ Category │
│──────────│           │──────────│
│ user     │           │ name     │
│ items[]  │           │ desc     │
└──────────┘           └──────────┘

┌──────────┐     1     ┌──────────┐
│  Order   │──────────>│   User   │
│──────────│           │(consumer)│
│ items[]  │           └──────────┘
│ status   │
│ farmer   │
│ Statuses │──────> User (farmer)
└──────────┘
```
