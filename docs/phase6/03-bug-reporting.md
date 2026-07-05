# Bug Reports — KrushiMart

## Bug Report Format

Each bug follows this template:

| Field | Description |
|---|---|
| **ID** | Unique identifier (BUG-XXX) |
| **Title** | Short description |
| **Severity** | Critical / High / Medium / Low |
| **Module** | Affected module |
| **Status** | Open / Fixed / Verified |
| **File(s)** | Affected file(s) with line numbers |
| **Steps to Reproduce** | How to trigger the bug |
| **Expected** | What should happen |
| **Actual** | What actually happens |
| **Fix Applied** | Description of the fix |

---

## BUG-001: Role Escalation via Registration

| Field | Value |
|---|---|
| **ID** | BUG-001 |
| **Title** | User can register as admin via role field |
| **Severity** | Critical |
| **Module** | Authentication |
| **Status** | Fixed |
| **File(s)** | `backend/controllers/authController.js:30` |

**Steps to Reproduce:**
1. POST `/api/auth/register` with `{ role: "admin", ... }`
2. User created with admin privileges

**Expected:** Role sanitized to `consumer` or `farmer` only.
**Actual:** Admin role accepted and stored.

**Fix Applied:** Added role sanitization — `role = ['consumer', 'farmer'].includes(role) ? role : 'consumer'` before user creation.

---

## BUG-002: Password Minimum Length Inconsistency

| Field | Value |
|---|---|
| **ID** | BUG-002 |
| **Title** | Registration accepts 6-char password, reset requires 8-char |
| **Severity** | High |
| **Module** | Authentication |
| **Status** | Fixed |
| **File(s)** | `backend/controllers/authController.js:35`, `frontend/src/pages/ResetPasswordPage.jsx:55` |

**Steps to Reproduce:**
1. Register with 6-character password → succeeds
2. Try to reset password with 6-character password → fails with "8 characters" error

**Expected:** Consistent password length validation across all endpoints.
**Actual:** Registration allows 6 chars; reset enforces 8 chars.

**Fix Applied:** Aligned minimum to 8 characters in both `authController.js` (register) and `ResetPasswordPage.jsx` (frontend validation).

---

## BUG-003: Order Items Missing Farmer Reference

| Field | Value |
|---|---|
| **ID** | BUG-003 |
| **Title** | Order items subdocument has no `farmer` field |
| **Severity** | Critical |
| **Module** | Orders |
| **Status** | Fixed |
| **File(s)** | `backend/models/Order.js:10`, `backend/controllers/orderController.js:60` |

**Steps to Reproduce:**
1. Place an order with items from different farmers
2. Check `order.items` — no `farmer` field on individual items

**Expected:** Each order item stores the `farmer` ID for per-farmer filtering.
**Actual:** Items have no `farmer` reference; farmer filtering was impossible.

**Fix Applied:** Added `farmer: ObjectId (ref: User)` to the items subdocument in `Order.js`. Updated `placeOrder` to set `farmer` on each item.

---

## BUG-004: Farmer Orders Endpoint Returns Wrong Data

| Field | Value |
|---|---|
| **ID** | BUG-004 |
| **Title** | `/api/farmer/orders` hits old controller, not new orderController |
| **Severity** | Critical |
| **Module** | Orders |
| **Status** | Fixed |
| **File(s)** | `backend/controllers/farmerController.js:22-50`, `backend/routes/farmerRoutes.js:10` |

**Steps to Reproduce:**
1. Login as farmer
2. GET `/api/farmer/orders`
3. Response returns all orders instead of filtered orders

**Expected:** Farmer sees only orders containing their products, with `farmerSpecificStatus`.
**Actual:** Farmer sees all orders (old `getFarmerOrders` logic).

**Fix Applied:** Rewrote `farmerController.getFarmerOrders` to use `item.farmer` filtering and return `farmerStatuses` per-farmer status. Eliminated duplicate logic between `farmerController` and `orderController`.

---

## BUG-005: `isPending` Does Not Exist in React Query v5

| Field | Value |
|---|---|
| **ID** | BUG-005 |
| **Title** | `mutation.isLoading` renamed to `mutation.isPending` in React Query v5 |
| **Severity** | High |
| **Module** | Frontend |
| **Status** | Fixed |
| **File(s)** | Multiple `frontend/src/pages/*.jsx` files |

**Steps to Reproduce:**
1. Build frontend with `npm run build`
2. Console warnings: `isLoading` is not a valid property of `MutationResult`

**Expected:** No console warnings; correct React Query v5 API usage.
**Actual:** Warnings on every mutation hook.

**Fix Applied:** Replaced all `mutation.isLoading` with `mutation.isPending` across all pages.

---

## BUG-006: Landing Page Featured Products Response Parsing

| Field | Value |
|---|---|
| **ID** | BUG-006 |
| **Title** | Featured products response not parsed correctly |
| **Severity** | Medium |
| **Module** | Frontend |
| **Status** | Fixed |
| **File(s)** | `frontend/src/pages/LandingPage.jsx:35` |

**Steps to Reproduce:**
1. Navigate to landing page
2. Featured products section shows empty/loading

**Expected:** Featured products load and display correctly.
**Actual:** Response data not parsed; section appears empty.

**Fix Applied:** Updated response parsing to `response.data.data?.content` to match paginated API response structure.

---

## BUG-007: Cart Allows Delivery Address Bypass

| Field | Value |
|---|---|
| **ID** | BUG-007 |
| **Title** | Order can be placed without delivery address |
| **Severity** | High |
| **Module** | Orders / Frontend |
| **Status** | Fixed |
| **File(s)** | `frontend/src/pages/CartPage.jsx:120` |

**Steps to Reproduce:**
1. Add items to cart
2. Click "Place Order" without entering delivery address
3. Order proceeds to API (backend rejects, but no frontend feedback)

**Expected:** Frontend validates delivery address before submitting.
**Actual:** No client-side validation; user gets no feedback.

**Fix Applied:** Added delivery address validation with user-friendly error message (`"Please enter a delivery address"`) in `CartPage.jsx`.

---

## BUG-008: Review System Missing Purchase Verification

| Field | Value |
|---|---|
| **ID** | BUG-008 |
| **Title** | Any user can write reviews without purchasing the product |
| **Severity** | High |
| **Module** | Reviews |
| **Status** | Fixed |
| **File(s)** | `backend/controllers/reviewController.js:15-30` |

**Steps to Reproduce:**
1. Login as consumer who has NOT purchased a product
2. POST `/api/reviews` with `{ productId, rating, comment }`
3. Review is accepted

**Expected:** Only consumers with delivered orders can review products.
**Actual:** No purchase verification; any authenticated user can review.

**Fix Applied:** Added purchase verification query — checks for an order containing the product with `status: "delivered"` before allowing review creation.

---

## BUG-009: Review Rating Calculation Uses JavaScript Instead of MongoDB

| Field | Value |
|---|---|
| **ID** | BUG-009 |
| **Title** | Product rating calculated by fetching all reviews into memory |
| **Severity** | Medium |
| **Module** | Reviews |
| **Status** | Fixed |
| **File(s)** | `backend/controllers/reviewController.js:40-55` |

**Steps to Reproduce:**
1. Product has 1000+ reviews
2. Create a new review
3. Rating calculation loads all reviews into Node.js memory

**Expected:** Rating calculated via efficient MongoDB aggregation.
**Actual:** All reviews fetched; average computed in JavaScript.

**Fix Applied:** Replaced JS array averaging with MongoDB `aggregate()` pipeline using `$group` for `avg` and `count`.

---

## BUG-010: Multer Rejects WebP and GIF Images

| Field | Value |
|---|---|
| **ID** | BUG-010 |
| **Title** | File upload rejects .webp and .gif image formats |
| **Severity** | Medium |
| **Module** | Products / Upload |
| **Status** | Fixed |
| **File(s)** | `backend/middleware/uploadMiddleware.js:20-25` |

**Steps to Reproduce:**
1. Login as farmer
2. Upload a `.webp` image
3. Error: "Only image files are allowed"

**Expected:** WebP and GIF images accepted (common formats from phones/browsers).
**Actual:** Only JPG/PNG accepted; webp/gif rejected.

**Fix Applied:** Added `webp|gif` to both the extension whitelist and MIME type list in the multer file filter.

---

## BUG-011: Global Error Handler Catches Multer Errors Incorrectly

| Field | Value |
|---|---|
| **ID** | BUG-011 |
| **Title** | Multer errors (file size, type) not caught by global error handler |
| **Severity** | Medium |
| **Module** | API |
| **Status** | Fixed |
| **File(s)** | `backend/server.js:100-120` |

**Steps to Reproduce:**
1. Upload a file > 5MB
2. Server crashes or returns unformatted error

**Expected:** Global error handler catches multer errors and returns clean JSON response.
**Actual:** Error not caught; server may crash or return raw error.

**Fix Applied:** Added multer error detection in global error handler: checks `err.code === 'LIMIT_FILE_SIZE'` and `err.message` for file type errors; returns proper 400 JSON response.

---

## BUG-012: Server Crashes on Unhandled Promise Rejection

| Field | Value |
|---|---|
| **ID** | BUG-012 |
| **Title** | Unhandled promise rejection crashes server process |
| **Severity** | High |
| **Module** | API |
| **Status** | Fixed |
| **File(s)** | `backend/server.js:15-20` |

**Steps to Reproduce:**
1. Trigger an unhandled promise rejection (e.g., MongoDB disconnect during operation)
2. Server process exits with `UnhandledPromiseRejection`

**Expected:** Server logs error and continues running.
**Actual:** Server process crashes immediately.

**Fix Applied:** Added `process.on('unhandledRejection')` and `process.on('uncaughtException')` handlers that log errors without exiting. Also added MongoDB reconnect logic in `config/db.js`.

---

## BUG-013: OrderHistoryPage Shows Only First Farmer's Contact

| Field | Value |
|---|---|
| **ID** | BUG-013 |
| **Title** | Multi-farmer orders show only one farmer's contact info |
| **Severity** | Medium |
| **Module** | Frontend / Orders |
| **Status** | Fixed |
| **File(s)** | `frontend/src/pages/OrderHistoryPage.jsx:95-110` |

**Steps to Reproduce:**
1. Place an order with items from 2+ farmers
2. View order history
3. Only the first farmer's name/phone/address is displayed

**Expected:** All farmers' contact details shown for multi-farmer orders.
**Actual:** Only the first farmer in the items array is displayed.

**Fix Applied:** Updated component to iterate over all unique farmers in the order items and display each farmer's contact information.

---

## BUG-014: Frontend API BaseURL Hardcoded to `/api`

| Field | Value |
|---|---|
| **ID** | BUG-014 |
| **Title** | API calls fail when frontend and backend are on different domains |
| **Severity** | High |
| **Module** | Frontend |
| **Status** | Fixed |
| **File(s)** | `frontend/src/services/api.js:8` |

**Steps to Reproduce:**
1. Deploy frontend to Vercel, backend to Render
2. All API calls fail with CORS/network errors

**Expected:** API calls use configurable base URL via environment variable.
**Actual:** Hardcoded `/api` only works with same-origin or Vite proxy.

**Fix Applied:** Updated `baseURL` to `import.meta.env.VITE_API_URL || '/api'`. Added `VITE_API_URL` to `.env` and `.env.production`.

---

## Bug Summary

| Severity | Count | All Fixed |
|---|---|---|
| Critical | 3 | ✅ |
| High | 5 | ✅ |
| Medium | 6 | ✅ |
| Low | 0 | — |
| **Total** | **14** | **14/14 ✅** |
