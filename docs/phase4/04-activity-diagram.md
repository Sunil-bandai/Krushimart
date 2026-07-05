# Activity Diagrams — KrushiMart

## Overview
Activity Diagrams show the workflow/business process of key operations, including decision points and parallel activities.

---

## Diagram 1: Order Placement Flow

### Description
Shows the complete flow from when a consumer clicks "Place Order" to order confirmation.

### Steps (with decision points)

```
                    ┌─────────┐
                    │  Start  │
                    └────┬────┘
                         │
                    ┌────▼────┐
                    │ Consumer │
                    │ clicks   │
                    │ "Place   │
                    │ Order"   │
                    └────┬────┘
                         │
                    ┌────▼────────┐
                    │ Check: Is   │
                    │ user logged │──── No ───> Redirect to /login
                    │ in?         │
                    └────┬────────┘
                         │ Yes
                    ┌────▼────────┐
                    │ Check: Is   │
                    │ cart empty? │──── Yes ──> Show "Cart is empty"
                    └────┬────────┘
                         │ No
                    ┌────▼────────┐
                    │ Check: Is   │
                    │ delivery    │──── No ───> Show "Enter address"
                    │ address     │
                    │ provided?   │
                    └────┬────────┘
                         │ Yes
                    ┌────▼────────┐
                    │ FOR EACH    │
                    │ cart item:  │◄──────┐
                    │ Get product │       │
                    └────┬────────┘       │
                         │                │
                    ┌────▼────────┐       │
                    │ Check: Is   │       │
                    │ stock >=    │── No ─┤
                    │ quantity?   │  Show  │
                    └────┬────────┘  error │
                         │ Yes            │
                    ┌────▼────────┐       │
                    │ Decrement   │       │
                    │ stock:      │       │
                    │ $inc: -qty  │       │
                    └────┬────────┘       │
                         │                │
                    ┌────▼────────┐       │
                    │ More items? │── Yes ┘
                    └────┬────────┘
                         │ No
                    ┌────▼────────┐
                    │ Compute     │
                    │ totalAmount │
                    └────┬────────┘
                         │
                    ┌────▼────────┐
                    │ Create      │
                    │ farmer      │
                    │ Statuses    │
                    └────┬────────┘
                         │
                    ┌────▼────────┐
                    │ Save Order  │
                    │ to MongoDB  │
                    └────┬────────┘
                         │
                    ┌────▼────────┐
                    │ Clear Cart  │
                    │ (async)     │
                    └────┬────────┘
                         │
                    ┌────▼────────┐
                    │ Send Order  │
                    │ Confirm     │
                    │ Email       │
                    └────┬────────┘
                         │
                    ┌────▼────────┐
                    │ Redirect to │
                    │ /orders     │
                    └────┬────────┘
                         │
                    ┌────▼────┐
                    │   End   │
                    └─────────┘
```

### How to Draw in draw.io

1. **Search "Flowchart" in left panel**
2. **Start/End**: Rounded rectangles (or circles for start)
3. **Process steps**: Rectangles
4. **Decisions**: Diamond shapes with Yes/No branches
5. **Connectors**: Arrows from bottom of one shape to top of next
6. **Merge point**: Arrow from "More items? → Yes" back up to "FOR EACH cart item"
7. **Color coding**: Green for success path, Red for error branches

---

## Diagram 2: Product Approval Flow

### Description
Shows how a product goes from farmer creation to being visible in the shop.

### Steps

```
                    ┌─────────┐
                    │  Start  │
                    └────┬────┘
                         │
                    ┌────▼────────┐
                    │ Farmer logs │
                    │ in          │
                    └────┬────────┘
                         │
                    ┌────▼────────┐
                    │ Clicks      │
                    │ "Add Product"│
                    └────┬────────┘
                         │
                    ┌────▼────────┐
                    │ Fills form: │
                    │ name, desc, │
                    │ price,      │
                    │ category,   │
                    │ stock, image│
                    └────┬────────┘
                         │
                    ┌────▼────────┐
                    │ Frontend    │
                    │ sends       │
                    │ POST        │
                    │ /api/products│
                    └────┬────────┘
                         │
                    ┌────▼────────┐
                    │ Backend     │
                    │ validates   │
                    │ input       │
                    └────┬────────┘
                         │
                    ┌────▼────────┐
                    │ Product     │
                    │ created with│
                    │ isApproved  │
                    │ = false     │
                    └────┬────────┘
                         │
                    ┌────▼────────┐
                    │ Product NOT │
                    │ visible in  │
                    │ public shop │
                    └────┬────────┘
                         │
                    ┌────▼────────┐
                    │ Admin logs  │
                    │ in          │
                    └────┬────────┘
                         │
                    ┌────▼────────┐
                    │ Goes to     │
                    │ Admin >     │
                    │ Products    │
                    └────┬────────┘
                         │
                    ┌────▼────────┐
                    │ Sees pending│
                    │ products    │
                    └────┬────────┘
                         │
                    ┌────▼────────┐
                    │ Clicks      │
                    │ "Approve"   │
                    └────┬────────┘
                         │
                    ┌────▼────────┐
                    │ isApproved  │
                    │ = true      │
                    └────┬────────┘
                         │
                    ┌────▼────────┐
                    │ Product NOW │
                    │ visible in  │
                    │ public shop │
                    └────┬────────┘
                         │
                    ┌────▼────┐
                    │   End   │
                    └─────────┘
```

---

## Diagram 3: Order Status Lifecycle

### Description
Shows all possible status transitions for an order.

### State Transitions

```
    ┌─────────┐
    │ Pending │ ◄─── Initial state when order is placed
    └────┬────┘
         │
         │ Farmer confirms
         ▼
    ┌──────────┐
    │Confirmed │ ◄─── All farmers must confirm before overall = confirmed
    └────┬─────┘
         │
         │ Farmer dispatches
         ▼
    ┌───────────┐
    │ Dispatched│ ◄─── Farmer has shipped the items
    └────┬──────┘
         │
         │ Farmer delivers
         ▼
    ┌───────────┐
    │ Delivered │ ◄─── Final state, consumer can now review
    └───────────┘

    Any status ────> Cancelled (farmer can cancel)
```

### Per-Farmer Status (Multi-Farmer Orders)
- Each farmer has their OWN status track
- Overall order status = lowest active status across all farmers
- Example: If Farmer A confirms but Farmer B is still pending → overall = pending
- Example: Both confirm → overall = confirmed

---

## Diagram Symbols Reference

| Symbol | Meaning |
|---|---|
| ● (filled circle) | Start |
| ◉ (bull's eye) | End |
| ▭ (rectangle) | Process/Action |
| ◇ (diamond) | Decision |
| ▱ (parallelogram) | Input/Output |
| → (arrow) | Flow direction |
