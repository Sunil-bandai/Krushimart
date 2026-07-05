# Test Cases — KrushiMart

## Legend

| Symbol | Meaning |
|---|---|
| ✅ | Pass |
| ❌ | Fail |
| ⏭️ | Skipped / Not Applicable |

---

## Module 1: Authentication

### TC-AUTH-001: Consumer Registration

| Field | Value |
|---|---|
| **Module** | Auth |
| **Priority** | High |
| **Type** | Functional |
| **Precondition** | Server running, consumer not already registered |

**Steps:**
1. POST `/api/auth/register` with `{ name, email, password, role: "consumer", phone, address }`
2. Verify response status is 201
3. Verify response contains `token` and `user` object
4. Verify `user.role` equals `"consumer"`

**Expected Result:** New consumer account created with JWT token returned.
**Actual Result:** ✅ Pass

---

### TC-AUTH-002: Farmer Registration

| Field | Value |
|---|---|
| **Module** | Auth |
| **Priority** | High |
| **Type** | Functional |

**Steps:**
1. POST `/api/auth/register` with `{ name, email, password, role: "farmer", phone, address }`
2. Verify response status is 201
3. Verify `user.role` equals `"farmer"`

**Expected Result:** New farmer account created with JWT token returned.
**Actual Result:** ✅ Pass

---

### TC-AUTH-003: Duplicate Email Registration

| Field | Value |
|---|---|
| **Module** | Auth |
| **Priority** | High |
| **Type** | Negative |

**Steps:**
1. POST `/api/auth/register` with an email already in the database
2. Verify response status is 400
3. Verify error message indicates duplicate email

**Expected Result:** Registration rejected with duplicate email error.
**Actual Result:** ✅ Pass

---

### TC-AUTH-004: Password Too Short

| Field | Value |
|---|---|
| **Module** | Auth |
| **Priority** | Medium |
| **Type** | Validation |

**Steps:**
1. POST `/api/auth/register` with password shorter than 8 characters (e.g., `"abc123"`)
2. Verify response status is 400
3. Verify error message about password length

**Expected Result:** Registration rejected with password validation error.
**Actual Result:** ✅ Pass

---

### TC-AUTH-005: Role Escalation Prevention

| Field | Value |
|---|---|
| **Module** | Auth |
| **Priority** | Critical |
| **Type** | Security |

**Steps:**
1. POST `/api/auth/register` with `{ role: "admin" }`
2. Verify response status is 201
3. Verify `user.role` equals `"consumer"` or `"farmer"` (NOT `"admin"`)

**Expected Result:** Admin role cannot be assigned via registration.
**Actual Result:** ✅ Pass

---

### TC-AUTH-006: Consumer Login

| Field | Value |
|---|---|
| **Module** | Auth |
| **Priority** | High |
| **Type** | Functional |

**Steps:**
1. POST `/api/auth/login` with valid consumer credentials
2. Verify response status is 200
3. Verify response contains JWT token
4. Verify `user.role` equals `"consumer"`

**Expected Result:** Successful login with JWT token.
**Actual Result:** ✅ Pass

---

### TC-AUTH-007: Farmer Login

| Field | Value |
|---|---|
| **Module** | Auth |
| **Priority** | High |
| **Type** | Functional |

**Steps:**
1. POST `/api/auth/login` with valid farmer credentials (`Farmer@123`)
2. Verify response status is 200
3. Verify `user.role` equals `"farmer"`

**Expected Result:** Successful login with JWT token.
**Actual Result:** ✅ Pass

---

### TC-AUTH-008: Wrong Password Login

| Field | Value |
|---|---|
| **Module** | Auth |
| **Priority** | High |
| **Type** | Negative |

**Steps:**
1. POST `/api/auth/login` with valid email but wrong password
2. Verify response status is 401
3. Verify error message about invalid credentials

**Expected Result:** Login rejected with invalid credentials error.
**Actual Result:** ✅ Pass

---

### TC-AUTH-009: Get Current User Profile

| Field | Value |
|---|---|
| **Module** | Auth |
| **Priority** | Medium |
| **Type** | Functional |

**Steps:**
1. Login as any user to get JWT token
2. GET `/api/auth/me` with `Authorization: Bearer <token>`
3. Verify response status is 200
4. Verify user data does NOT include `password` field

**Expected Result:** User profile returned without password.
**Actual Result:** ✅ Pass

---

### TC-AUTH-010: Forgot Password

| Field | Value |
|---|---|
| **Module** | Auth |
| **Priority** | Medium |
| **Type** | Functional |

**Steps:**
1. POST `/api/auth/forgot-password` with valid email
2. Verify response status is 200
3. Verify success message is returned (regardless of whether email exists)

**Expected Result:** Generic success message returned to prevent email enumeration.
**Actual Result:** ✅ Pass

---

### TC-AUTH-011: Rate Limiting on Auth Endpoints

| Field | Value |
|---|---|
| **Module** | Auth |
| **Priority** | Medium |
| **Type** | Security |

**Steps:**
1. Send 21 rapid POST requests to `/api/auth/login`
2. Verify the 21st request returns 429 (Too Many Requests)

**Expected Result:** Rate limiter blocks requests after 20 per 15-minute window.
**Actual Result:** ✅ Pass

---

## Module 2: Products

### TC-PROD-001: Get All Products (Public)

| Field | Value |
|---|---|
| **Module** | Products |
| **Priority** | High |
| **Type** | Functional |

**Steps:**
1. GET `/api/products` (no auth required)
2. Verify response status is 200
3. Verify response contains paginated product list
4. Verify each product has `name`, `price`, `category`, `image`, `rating`

**Expected Result:** Public product catalog returned.
**Actual Result:** ✅ Pass

---

### TC-PROD-002: Get Products by Category

| Field | Value |
|---|---|
| **Module** | Products |
| **Priority** | Medium |
| **Type** | Functional |

**Steps:**
1. GET `/api/products?category=Vegetables`
2. Verify response status is 200
3. Verify all returned products have `category: "Vegetables"`

**Expected Result:** Filtered product list by category.
**Actual Result:** ✅ Pass

---

### TC-PROD-003: Search Products

| Field | Value |
|---|---|
| **Module** | Products |
| **Priority** | Medium |
| **Type** | Functional |

**Steps:**
1. GET `/api/products?search=tomato`
2. Verify response status is 200
3. Verify returned products contain "tomato" in name or description

**Expected Result:** Search results match query term.
**Actual Result:** ✅ Pass

---

### TC-PROD-004: Product Search Regex Injection

| Field | Value |
|---|---|
| **Module** | Products |
| **Priority** | High |
| **Type** | Security |

**Steps:**
1. GET `/api/products?search=.*`
2. Verify the regex is escaped (treated as literal `.*`)
3. Verify response does NOT return all products indiscriminately

**Expected Result:** Regex metacharacters are escaped; search is literal.
**Actual Result:** ✅ Pass

---

### TC-PROD-005: Create Product (Farmer)

| Field | Value |
|---|---|
| **Module** | Products |
| **Priority** | High |
| **Type** | Functional |

**Steps:**
1. Login as farmer to get JWT token
2. POST `/api/products` with product data + optional image file
3. Verify response status is 201
4. Verify `product.farmer` equals the logged-in farmer's ID
5. Verify `product.isApproved` is `false`

**Expected Result:** Product created, pending admin approval.
**Actual Result:** ✅ Pass

---

### TC-PROD-006: Create Product Without Auth

| Field | Value |
|---|---|
| **Module** | Products |
| **Priority** | High |
| **Type** | Security |

**Steps:**
1. POST `/api/products` without Authorization header
2. Verify response status is 401

**Expected Result:** Unauthenticated request rejected.
**Actual Result:** ✅ Pass

---

### TC-PROD-007: Create Product as Consumer (Forbidden)

| Field | Value |
|---|---|
| **Module** | Products |
| **Priority** | High |
| **Type** | Security |

**Steps:**
1. Login as consumer
2. POST `/api/products` with product data
3. Verify response status is 403

**Expected Result:** Consumer cannot create products.
**Actual Result:** ✅ Pass

---

### TC-PROD-008: Upload Image — WebP Format

| Field | Value |
|---|---|
| **Module** | Products |
| **Priority** | Medium |
| **Type** | Functional |

**Steps:**
1. Login as farmer
2. POST `/api/products` with a `.webp` image file
3. Verify response status is 201
4. Verify `product.image` contains the uploaded filename

**Expected Result:** WebP image uploaded successfully.
**Actual Result:** ✅ Pass

---

### TC-PROD-009: Upload Image — Invalid Type Rejected

| Field | Value |
|---|---|
| **Module** | Products |
| **Priority** | Medium |
| **Type** | Negative |

**Steps:**
1. Login as farmer
2. POST `/api/products` with a `.pdf` file
3. Verify response status is 400

**Expected Result:** Non-image file rejected with error.
**Actual Result:** ✅ Pass

---

### TC-PROD-010: Upload Image — File Size Limit (5MB)

| Field | Value |
|---|---|
| **Module** | Products |
| **Priority** | Medium |
| **Type** | Boundary |

**Steps:**
1. Login as farmer
2. POST `/api/products` with an image larger than 5MB
3. Verify response status is 400 with file size error

**Expected Result:** Oversized file rejected.
**Actual Result:** ✅ Pass

---

### TC-PROD-011: Update Product (Owner Only)

| Field | Value |
|---|---|
| **Module** | Products |
| **Priority** | High |
| **Type** | Security |

**Steps:**
1. Login as farmer A
2. Create a product
3. Login as farmer B
4. PUT `/api/products/:id` with modified data
5. Verify response status is 404 or 403

**Expected Result:** Farmer B cannot update Farmer A's product.
**Actual Result:** ✅ Pass

---

### TC-PROD-012: Delete Product (Owner Only)

| Field | Value |
|---|---|
| **Module** | Products |
| **Priority** | High |
| **Type** | Security |

**Steps:**
1. Login as farmer A, create a product
2. Login as farmer B
3. DELETE `/api/products/:id`
4. Verify response status is 404 or 403

**Expected Result:** Farmer B cannot delete Farmer A's product.
**Actual Result:** ✅ Pass

---

## Module 3: Cart

### TC-CART-001: Add Item to Cart

| Field | Value |
|---|---|
| **Module** | Cart |
| **Priority** | High |
| **Type** | Functional |

**Steps:**
1. Login as consumer
2. POST `/api/cart` with `{ productId, quantity: 1 }`
3. Verify response status is 200
4. Verify cart contains the item

**Expected Result:** Item added to cart.
**Actual Result:** ✅ Pass

---

### TC-CART-002: Add Item Exceeding Stock

| Field | Value |
|---|---|
| **Module** | Cart |
| **Priority** | High |
| **Type** | Boundary |

**Steps:**
1. Login as consumer
2. POST `/api/cart` with `{ productId, quantity: 9999 }` (exceeds available stock)
3. Verify response status is 400

**Expected Result:** Quantity validation rejects order exceeding stock.
**Actual Result:** ✅ Pass

---

### TC-CART-003: Update Cart Item Quantity

| Field | Value |
|---|---|
| **Module** | Cart |
| **Priority** | Medium |
| **Type** | Functional |

**Steps:**
1. Login as consumer
2. PUT `/api/cart/:productId` with `{ quantity: 3 }`
3. Verify response status is 200
4. Verify item quantity is updated

**Expected Result:** Cart item quantity updated.
**Actual Result:** ✅ Pass

---

### TC-CART-004: Remove Item from Cart

| Field | Value |
|---|---|
| **Module** | Cart |
| **Priority** | Medium |
| **Type** | Functional |

**Steps:**
1. Login as consumer
2. DELETE `/api/cart/:productId`
3. Verify response status is 200
4. Verify item no longer in cart

**Expected Result:** Item removed from cart.
**Actual Result:** ✅ Pass

---

### TC-CART-005: Clear Entire Cart

| Field | Value |
|---|---|
| **Module** | Cart |
| **Priority** | Low |
| **Type** | Functional |

**Steps:**
1. Login as consumer, add multiple items
2. DELETE `/api/cart`
3. Verify response status is 200
4. Verify cart is empty

**Expected Result:** All items cleared from cart.
**Actual Result:** ✅ Pass

---

## Module 4: Orders

### TC-ORD-001: Place Order (Single Farmer)

| Field | Value |
|---|---|
| **Module** | Orders |
| **Priority** | High |
| **Type** | Functional |

**Steps:**
1. Login as consumer
2. POST `/api/orders` with items from a single farmer + `deliveryAddress`
3. Verify response status is 201
4. Verify `order.items[0].farmer` is set
5. Verify `order.farmerStatuses` has one entry with `status: "pending"`
6. Verify `order.status` equals `"pending"`

**Expected Result:** Order placed with farmer status tracking.
**Actual Result:** ✅ Pass

---

### TC-ORD-002: Place Order (Multi-Farmer)

| Field | Value |
|---|---|
| **Module** | Orders |
| **Priority** | Critical |
| **Type** | Functional |

**Steps:**
1. Login as consumer
2. Add items from 2 different farmers to cart
3. POST `/api/orders` with both items + `deliveryAddress`
4. Verify `order.farmerStatuses` has 2 entries
5. Verify each entry has a different `farmer` ID

**Expected Result:** Multi-farmer order creates per-farmer status entries.
**Actual Result:** ✅ Pass

---

### TC-ORD-003: Place Order — Insufficient Stock

| Field | Value |
|---|---|
| **Module** | Orders |
| **Priority** | High |
| **Type** | Boundary |

**Steps:**
1. Login as consumer
2. POST `/api/orders` with quantity exceeding available stock
3. Verify response status is 400
4. Verify error message mentions insufficient stock

**Expected Result:** Order rejected due to insufficient stock.
**Actual Result:** ✅ Pass

---

### TC-ORD-004: Place Order — Missing Delivery Address

| Field | Value |
|---|---|
| **Module** | Orders |
| **Priority** | Medium |
| **Type** | Validation |

**Steps:**
1. Login as consumer
2. POST `/api/orders` with items but no `deliveryAddress`
3. Verify response status is 400

**Expected Result:** Order rejected without delivery address.
**Actual Result:** ✅ Pass

---

### TC-ORD-005: Place Order — Stock Decrement Verification

| Field | Value |
|---|---|
| **Module** | Orders |
| **Priority** | Critical |
| **Type** | Integration |

**Steps:**
1. Note product stock before order
2. Login as consumer, place order
3. GET `/api/products/:id`
4. Verify stock decreased by ordered quantity

**Expected Result:** Stock decremented atomically on order placement.
**Actual Result:** ✅ Pass

---

### TC-ORD-006: Farmer Confirms Order

| Field | Value |
|---|---|
| **Module** | Orders |
| **Priority** | Critical |
| **Type** | Functional |

**Steps:**
1. Login as the farmer who has items in the order
2. PUT `/api/orders/:id/status` with `{ status: "confirmed" }`
3. Verify `order.farmerStatuses[farmer].status` equals `"confirmed"`
4. Verify overall `order.status` is still `"pending"` (other farmers not confirmed)

**Expected Result:** Farmer's per-farmer status updated; overall status unchanged.
**Actual Result:** ✅ Pass

---

### TC-ORD-007: All Farmers Confirm → Overall Status = Confirmed

| Field | Value |
|---|---|
| **Module** | Orders |
| **Priority** | Critical |
| **Type** | Integration |

**Steps:**
1. Login as each farmer in a multi-farmer order
2. Each farmer confirms their portion
3. Verify overall `order.status` changes to `"confirmed"`

**Expected Result:** Overall status automatically updates when all farmers confirm.
**Actual Result:** ✅ Pass

---

### TC-ORD-008: Farmer Dispatches Order

| Field | Value |
|---|---|
| **Module** | Orders |
| **Priority** | High |
| **Type** | Functional |

**Steps:**
1. Farmer confirms order first
2. PUT `/api/orders/:id/status` with `{ status: "dispatched" }`
3. Verify `farmerStatuses[farmer].status` equals `"dispatched"`

**Expected Result:** Status transitions from confirmed → dispatched.
**Actual Result:** ✅ Pass

---

### TC-ORD-009: Farmer Delivers Order

| Field | Value |
|---|---|
| **Module** | Orders |
| **Priority** | High |
| **Type** | Functional |

**Steps:**
1. Farmer dispatches order
2. PUT `/api/orders/:id/status` with `{ status: "delivered" }`
3. Verify `farmerStatuses[farmer].status` equals `"delivered"`

**Expected Result:** Status transitions from dispatched → delivered.
**Actual Result:** ✅ Pass

---

### TC-ORD-010: Invalid Status Transition Rejected

| Field | Value |
|---|---|
| **Module** | Orders |
| **Priority** | High |
| **Type** | Negative |

**Steps:**
1. Login as farmer
2. Order is in `pending` status
3. PUT `/api/orders/:id/status` with `{ status: "delivered" }` (skipping confirmed/dispatched)
4. Verify response status is 400

**Expected Result:** Invalid state transition rejected.
**Actual Result:** ✅ Pass

---

### TC-ORD-011: Farmer Cancels Order

| Field | Value |
|---|---|
| **Module** | Orders |
| **Priority** | High |
| **Type** | Functional |

**Steps:**
1. Login as farmer
2. PUT `/api/orders/:id/status` with `{ status: "cancelled" }`
3. Verify `farmerStatuses[farmer].status` equals `"cancelled"`

**Expected Result:** Farmer can cancel their portion of the order.
**Actual Result:** ✅ Pass

---

### TC-ORD-012: Consumer Views Order History

| Field | Value |
|---|---|
| **Module** | Orders |
| **Priority** | Medium |
| **Type** | Functional |

**Steps:**
1. Login as consumer
2. GET `/api/orders/my`
3. Verify response contains list of orders
4. Verify each order has populated product and farmer details

**Expected Result:** Consumer sees their order history with product/farmer info.
**Actual Result:** ✅ Pass

---

### TC-ORD-013: Farmer Views Their Orders

| Field | Value |
|---|---|
| **Module** | Orders |
| **Priority** | High |
| **Type** | Functional |

**Steps:**
1. Login as farmer
2. GET `/api/farmer/orders`
3. Verify response contains only orders that include this farmer's products
4. Verify each order has `farmerSpecificStatus`

**Expected Result:** Farmer sees only their relevant orders.
**Actual Result:** ✅ Pass

---

### TC-ORD-014: Multi-Farmer Order — Farmer Contact Info

| Field | Value |
|---|---|
| **Module** | Orders |
| **Priority** | Medium |
| **Type** | Functional |

**Steps:**
1. Place a multi-farmer order (2+ farmers)
2. Login as consumer, view order history
3. Verify ALL farmers' contact details are shown (not just the first)

**Expected Result:** All farmers' names, phones, and addresses displayed.
**Actual Result:** ✅ Pass

---

## Module 5: Reviews

### TC-REV-001: Add Review (Valid Purchase)

| Field | Value |
|---|---|
| **Module** | Reviews |
| **Priority** | High |
| **Type** | Functional |

**Steps:**
1. Consumer places order → farmer delivers → order status = `"delivered"`
2. POST `/api/reviews` with `{ productId, rating: 5, comment: "Great!" }`
3. Verify response status is 201
4. Verify product `rating` and `numReviews` updated

**Expected Result:** Review added, product rating recalculated via aggregation.
**Actual Result:** ✅ Pass

---

### TC-REV-002: Review Without Purchase (Rejected)

| Field | Value |
|---|---|
| **Module** | Reviews |
| **Priority** | Critical |
| **Type** | Security |

**Steps:**
1. Login as consumer who has NOT purchased the product
2. POST `/api/reviews` with `{ productId, rating: 5, comment: "Great!" }`
3. Verify response status is 400 or 403

**Expected Result:** Review rejected — purchase verification failed.
**Actual Result:** ✅ Pass

---

### TC-REV-003: Review With Invalid Rating

| Field | Value |
|---|---|
| **Module** | Reviews |
| **Priority** | Medium |
| **Type** | Validation |

**Steps:**
1. POST `/api/reviews` with `{ rating: 6 }` or `{ rating: 0 }`
2. Verify response status is 400

**Expected Result:** Rating outside 1-5 range rejected.
**Actual Result:** ✅ Pass

---

### TC-REV-004: Duplicate Review Rejected

| Field | Value |
|---|---|
| **Module** | Reviews |
| **Priority** | High |
| **Type** | Negative |

**Steps:**
1. Consumer writes a review for a product
2. Consumer tries to write another review for the same product
3. Verify response status is 400

**Expected Result:** One review per user per product enforced.
**Actual Result:** ✅ Pass

---

### TC-REV-005: Get Product Reviews

| Field | Value |
|---|---|
| **Module** | Reviews |
| **Priority** | Medium |
| **Type** | Functional |

**Steps:**
1. GET `/api/reviews/:productId`
2. Verify response status is 200
3. Verify reviews are sorted newest first
4. Verify each review has consumer name and avatar

**Expected Result:** Reviews returned with consumer info, sorted by date.
**Actual Result:** ✅ Pass

---

### TC-REV-006: Review Rating Aggregation

| Field | Value |
|---|---|
| **Module** | Reviews |
| **Priority** | High |
| **Type** | Integration |

**Steps:**
1. Product has multiple reviews with different ratings
2. GET `/api/products/:id`
3. Verify `product.rating` equals the computed average
4. Verify `product.numReviews` equals the count of reviews

**Expected Result:** Product rating and count are correctly aggregated.
**Actual Result:** ✅ Pass

---

## Module 6: Admin

### TC-ADM-001: Admin Approves Product

| Field | Value |
|---|---|
| **Module** | Admin |
| **Priority** | High |
| **Type** | Functional |

**Steps:**
1. Login as admin
2. PUT `/api/admin/products/:id/approve`
3. Verify `product.isApproved` becomes `true`

**Expected Result:** Product approved by admin.
**Actual Result:** ✅ Pass

---

### TC-ADM-002: Non-Admin Cannot Access Admin Routes

| Field | Value |
|---|---|
| **Module** | Admin |
| **Priority** | Critical |
| **Type** | Security |

**Steps:**
1. Login as farmer
2. GET `/api/admin/users`
3. Verify response status is 403

**Expected Result:** Farmer blocked from admin endpoints.
**Actual Result:** ✅ Pass

---

### TC-ADM-003: Consumer Cannot Access Admin Routes

| Field | Value |
|---|---|
| **Module** | Admin |
| **Priority** | Critical |
| **Type** | Security |

**Steps:**
1. Login as consumer
2. GET `/api/admin/analytics`
3. Verify response status is 403

**Expected Result:** Consumer blocked from admin endpoints.
**Actual Result:** ✅ Pass

---

### TC-ADM-004: Admin Toggle User Active Status

| Field | Value |
|---|---|
| **Module** | Admin |
| **Priority** | High |
| **Type** | Functional |

**Steps:**
1. Login as admin
2. PUT `/api/admin/users/:id/toggle`
3. Verify `user.isActive` toggles

**Expected Result:** User active status toggled.
**Actual Result:** ✅ Pass

---

### TC-ADM-005: Admin Cannot Deactivate Self

| Field | Value |
|---|---|
| **Module** | Admin |
| **Priority** | Medium |
| **Type** | Safety |

**Steps:**
1. Login as admin
2. PUT `/api/admin/users/:adminId/toggle`
3. Verify response status is 400

**Expected Result:** Admin cannot accidentally deactivate themselves.
**Actual Result:** ✅ Pass

---

### TC-ADM-006: Admin Cannot Delete Admin Users

| Field | Value |
|---|---|
| **Module** | Admin |
| **Priority** | Medium |
| **Type** | Safety |

**Steps:**
1. Login as admin
2. DELETE `/api/admin/users/:adminId`
3. Verify response status is 400

**Expected Result:** Admin accounts cannot be deleted.
**Actual Result:** ✅ Pass

---

### TC-ADM-007: Admin Analytics Dashboard

| Field | Value |
|---|---|
| **Module** | Admin |
| **Priority** | Medium |
| **Type** | Functional |

**Steps:**
1. Login as admin
2. GET `/api/admin/analytics`
3. Verify response contains `totalUsers`, `totalFarmers`, `totalProducts`, `totalOrders`, `totalRevenue`, `categoryData`

**Expected Result:** Analytics dashboard data returned.
**Actual Result:** ✅ Pass

---

## Module 7: Frontend

### TC-FE-001: Landing Page Loads Products

| Field | Value |
|---|---|
| **Module** | Frontend |
| **Priority** | High |
| **Type** | UI |

**Steps:**
1. Navigate to `http://localhost:3002`
2. Verify landing page renders
3. Verify featured products section loads with product cards
4. Verify navigation bar displays

**Expected Result:** Landing page renders with product data from API.
**Actual Result:** ✅ Pass

---

### TC-FE-002: Responsive Navigation

| Field | Value |
|---|---|
| **Module** | Frontend |
| **Priority** | Medium |
| **Type** | UI |

**Steps:**
1. Open landing page on desktop viewport (1200px+)
2. Verify desktop navigation is visible
3. Resize to mobile viewport (375px)
4. Verify hamburger menu appears

**Expected Result:** Navigation adapts to viewport size.
**Actual Result:** ✅ Pass

---

### TC-FE-003: 404 Page for Invalid Routes

| Field | Value |
|---|---|
| **Module** | Frontend |
| **Priority** | Low |
| **Type** | UI |

**Steps:**
1. Navigate to `http://localhost:3002/nonexistent-page`
2. Verify NotFoundPage component renders
3. Verify "Go Home" link is present

**Expected Result:** Custom 404 page displayed.
**Actual Result:** ✅ Pass

---

### TC-FE-004: ChatBot Open/Close

| Field | Value |
|---|---|
| **Module** | Frontend |
| **Priority** | Low |
| **Type** | UI |

**Steps:**
1. Navigate to landing page
2. Click chatbot toggle button
3. Verify chat window opens
4. Click toggle again
5. Verify chat window closes

**Expected Result:** ChatBot widget toggles correctly.
**Actual Result:** ✅ Pass

---

## Module 8: API Health & Security

### TC-API-001: Health Check Endpoint

| Field | Value |
|---|---|
| **Module** | API |
| **Priority** | Medium |
| **Type** | Functional |

**Steps:**
1. GET `/health`
2. Verify response status is 200
3. Verify response body is `{ "status": "ok" }`

**Expected Result:** Health endpoint returns ok.
**Actual Result:** ✅ Pass

---

### TC-API-002: CORS Headers

| Field | Value |
|---|---|
| **Module** | API |
| **Priority** | High |
| **Type** | Security |

**Steps:**
1. Send OPTIONS request to `/api/products` with Origin `http://localhost:3002`
2. Verify `Access-Control-Allow-Origin` header is set
3. Verify `Access-Control-Allow-Credentials` is `true`

**Expected Result:** CORS configured for frontend origin.
**Actual Result:** ✅ Pass

---

### TC-API-003: 404 for Unknown Routes

| Field | Value |
|---|---|
| **Module** | API |
| **Priority** | Low |
| **Type** | Functional |

**Steps:**
1. GET `/api/nonexistent`
2. Verify response status is 404

**Expected Result:** Unknown routes return 404.
**Actual Result:** ✅ Pass

---

### TC-API-004: Global Error Handler — Multer File Size

| Field | Value |
|---|---|
| **Module** | API |
| **Priority** | Medium |
| **Type** | Error Handling |

**Steps:**
1. Upload a file > 5MB to any upload endpoint
2. Verify response status is 400
3. Verify error message mentions file size limit

**Expected Result:** File size error handled by global error handler.
**Actual Result:** ✅ Pass

---

## Summary

| Module | Total Cases | Passed | Failed | Skipped |
|---|---|---|---|---|
| Authentication | 11 | 11 | 0 | 0 |
| Products | 12 | 12 | 0 | 0 |
| Cart | 5 | 5 | 0 | 0 |
| Orders | 14 | 14 | 0 | 0 |
| Reviews | 6 | 6 | 0 | 0 |
| Admin | 7 | 7 | 0 | 0 |
| Frontend | 4 | 4 | 0 | 0 |
| API Health & Security | 4 | 4 | 0 | 0 |
| **Total** | **63** | **63** | **0** | **0** |
