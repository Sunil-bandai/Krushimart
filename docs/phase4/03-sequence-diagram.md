# Sequence Diagrams — KrushiMart

## Overview
Sequence Diagrams show the step-by-step flow of messages between objects for key system operations.

---

## Diagram 1: User Registration

### Lifelines
- Actor: **Guest**
- :Browser
- :React Frontend
- :AuthController
- :User Model
- :MongoDB
- :EmailService

### Messages (top to bottom)

```
Guest              Browser          React Frontend      AuthController       User Model          MongoDB           EmailService
  │                   │                  │                   │                   │                   │                  │
  │──Click Register──>│                  │                   │                   │                   │                  │
  │                   │──POST /api/auth/register──>│         │                   │                   │                  │
  │                   │                  │──validate input──>│                   │                   │                  │
  │                   │                  │                   │──check email──>│                   │                  │
  │                   │                  │                   │                   │──findOne({email})──>│                  │
  │                   │                  │                   │                   │<──null (not found)──│                  │
  │                   │                  │                   │──create user──>│                   │                  │
  │                   │                  │                   │                   │──insertOne({name,email,pass,role})──>│
  │                   │                  │                   │                   │<──_id──────────────│                  │
  │                   │                  │                   │──generate JWT──>│                   │                  │
  │                   │                  │                   │──sendWelcomeEmail──────────────────────────────────────>│
  │                   │                  │                   │<──{user, token}──│                   │                  │
  │                   │                  │<──201 + token─────│                   │                   │                  │
  │                   │<──response───────│                   │                   │                   │                  │
  │<──show success────│                  │                   │                   │                   │                  │
  │                   │                  │                   │                   │                   │                  │
```

### Steps
1. Guest fills registration form (name, email, password, role)
2. Frontend sends `POST /api/auth/register`
3. AuthController validates input (password >= 8 chars)
4. Checks if email already exists
5. Creates User document (password auto-hashed by pre-save hook)
6. Generates JWT token (30-day expiry)
7. Sends welcome email (async, non-blocking)
8. Returns `{ user, token }` to frontend
9. Frontend stores token in Zustand persist, redirects to role dashboard

---

## Diagram 2: Place Order

### Lifelines
- Actor: **Consumer**
- :Browser
- :React Frontend
- :OrderController
- :Product Model
- :Order Model
- :User Model
- :MongoDB
- :EmailService

### Messages

```
Consumer          Browser       Frontend       OrderController    Product Model     Order Model      MongoDB       EmailService
  │                  │              │                │                 │                 │                │               │
  │──Click Place Order──>│          │                │                 │                 │                │               │
  │                  │──POST /api/orders──>│         │                │                 │                 │               │
  │                  │              │──validate items & address──>│    │                 │                 │               │
  │                  │              │                │──for each item:│                 │                 │               │
  │                  │              │                │──findById(item.productId)──>│    │                 │               │
  │                  │              │                │<──product─────────────│         │                 │               │
  │                  │              │                │──check stock >= qty    │         │                 │               │
  │                  │              │                │──$inc: stock -= qty──>│         │                 │               │
  │                  │              │                │<──updated─────────────│         │                 │               │
  │                  │              │                │──compute totalAmount   │         │                 │               │
  │                  │              │                │──build farmerStatuses   │         │                 │               │
  │                  │              │                │──Order.create({...})────────────────────────>│                 │
  │                  │              │                │<──order (with _id)──────────────────────────────│                 │
  │                  │              │                │──sendOrderConfirmationEmail────────────────────────────────────>│
  │                  │              │                │<──201 + order     │                 │                 │               │
  │                  │              │<──response─────│                 │                 │                 │               │
  │<──redirect to /orders──│       │                │                 │                 │                 │               │
```

### Steps
1. Consumer clicks "Place Order" on CartPage
2. Frontend sends `POST /api/orders` with items[] and deliveryAddress
3. For each item: validate product exists, check stock >= quantity
4. Atomically decrement stock: `Product.findByIdAndUpdate({$inc: {stock: -qty}})`
5. Compute totalAmount = sum(price * quantity)
6. Build farmerStatuses array (one entry per unique farmer)
7. Create Order document
8. Send order confirmation email (async)
9. Return order to frontend, redirect to /orders

---

## Diagram 3: Farmer Updates Order Status

### Lifelines
- Actor: **Farmer**
- :Browser
- :React Frontend
- :OrderController
- :Order Model
- :User Model
- :MongoDB
- :EmailService

### Messages

```
Farmer            Browser         Frontend        OrderController      Order Model         MongoDB          EmailService
  │                  │                │                │                    │                   │                │
  │──Click Confirm──>│                │                │                    │                   │                │
  │                  │──PUT /api/orders/:id/status──>│  │                    │                   │                │
  │                  │                │──{status:"confirmed"}──>│            │                   │                │
  │                  │                │                │──Order.findById(id)──>│                   │                │
  │                  │                │                │<──order─────────────│                   │                │
  │                  │                │                │──find farmer in farmerStatuses            │                │
  │                  │                │                │──validate transition (pending→confirmed)  │                │
  │                  │                │                │──update farmerStatuses[idx].status        │                │
  │                  │                │                │──computeOverallStatus()                   │                │
  │                  │                │                │──order.save()──────>│                   │                │
  │                  │                │                │<──saved─────────────│                   │                │
  │                  │                │                │──sendOrderStatusEmail──────────────────────────────────>│
  │                  │                │                │<──200 + updatedOrder│                   │                │
  │                  │                │<──response─────│                    │                   │                │
  │<──show updated status──│          │                │                    │                   │                │
```

### Steps
1. Farmer clicks "Confirm" on FarmerOrders page
2. Frontend sends `PUT /api/orders/:id/status` with `{status: "confirmed"}`
3. OrderController finds order by ID
4. Validates the farmer is in farmerStatuses (authorization check)
5. Validates status transition is allowed: pending→confirmed, confirmed→dispatched, dispatched→delivered
6. Updates farmerStatuses[farmerIdx].status
7. Recomputes overall status (lowest active status across all farmers)
8. Saves order, sends status email to consumer
9. Returns updated order to frontend

---

## Diagram 4: Write Review

### Lifelines
- Actor: **Consumer**
- :Browser
- :React Frontend
- :ReviewController
- :Order Model
- :Review Model
- :Product Model
- :MongoDB

### Messages

```
Consumer          Browser        Frontend        ReviewController     Order Model       Review Model     Product Model      MongoDB
  │                  │               │                │                    │                  │                 │                 │
  │──Submit Review──>│               │                │                    │                  │                 │                 │
  │                  │──POST /api/reviews (FormData)──>│                   │                  │                 │                 │
  │                  │               │──validate rating, comment, productId──>│               │                 │                 │
  │                  │               │                │──check duplicate review──>│             │                 │                 │
  │                  │               │                │<──null (no duplicate)───│             │                 │                 │
  │                  │               │                │──verify purchase (delivered order)──>│  │                 │                 │
  │                  │               │                │<──order found──────────│              │                 │                 │
  │                  │               │                │──Review.create({rating,comment,...})──>│ │                 │                 │
  │                  │               │                │<──review───────────────│              │                 │                 │
  │                  │               │                │──Review.aggregate([{$match},{$group}])──>│                 │                 │
  │                  │               │                │<──{avgRating, count}───────────────────────│                │                 │
  │                  │               │                │──Product.findByIdAndUpdate({rating,numReviews})──>│       │                 │
  │                  │               │                │<──updated──────────────────────────────────────────────│                 │
  │                  │               │                │<──201 + review       │                  │                 │                 │
  │                  │               │<──response─────│                    │                  │                 │                 │
  │<──show success───│               │                │                    │                  │                 │                 │
```

### Steps
1. Consumer fills review form (rating 1-5, comment, optional images)
2. Frontend sends `POST /api/reviews` as FormData
3. ReviewController validates required fields and rating range (1-5)
4. Checks for duplicate review (one per consumer per product)
5. Verifies consumer has a delivered order containing this product
6. Creates Review document
7. Uses MongoDB aggregation to compute new average rating
8. Updates Product.rating and Product.numReviews
9. Returns created review to frontend

---

## How to Draw in draw.io

1. **Search "Sequence" in left panel** for lifeline shapes
2. **Draw vertical dashed lines** (lifelines) for each participant
3. **Draw horizontal arrows** for messages:
   - Solid arrow with filled head = synchronous call
   - Open arrow = asynchronous call (email)
   - Dashed arrow = return message
4. **Add activation boxes** (thin rectangles on lifelines) when an object is processing
5. **Number each message** on the left side for clarity
6. **Use notes** (dotted rectangle) to explain complex logic
