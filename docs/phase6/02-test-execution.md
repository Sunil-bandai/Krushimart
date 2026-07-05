# Test Execution Report — KrushiMart

## Execution Environment

| Component | Details |
|---|---|
| OS | Windows 10/11 |
| Node.js | v20.x |
| MongoDB | 7.x (localhost:27017) |
| Backend Port | 5000 |
| Frontend Port | 3002 |
| Browser | Chrome / Edge |
| API Testing | curl + `tools/smoke_test.js` |
| Date | July 2026 |

## Execution Summary

### Automated Smoke Test (`tools/smoke_test.js`)

| Step | Description | Status |
|---|---|---|
| 1 | GET `/api/products` | ✅ PRODUCTS_OK |
| 2 | POST `/api/auth/register` (new test user) | ✅ REGISTER |
| 3 | POST `/api/auth/login` (test user) | ✅ LOGIN |
| 4 | POST `/api/cart` (add item) | ✅ ADD_CART |
| 5 | GET `/api/cart` (read cart) | ✅ CART_ITEMS |

**Smoke Test Result:** 5/5 PASSED

---

### Manual API Tests

#### Authentication Module

| Test ID | Description | Method | Endpoint | Expected | Actual | Status |
|---|---|---|---|---|---|---|
| TC-AUTH-001 | Consumer registration | POST | /api/auth/register | 201 + token | 201 + token | ✅ |
| TC-AUTH-002 | Farmer registration | POST | /api/auth/register | 201 + token | 201 + token | ✅ |
| TC-AUTH-003 | Duplicate email | POST | /api/auth/register | 400 | 400 | ✅ |
| TC-AUTH-004 | Short password | POST | /api/auth/register | 400 | 400 | ✅ |
| TC-AUTH-005 | Role escalation | POST | /api/auth/register | role ≠ admin | role ≠ admin | ✅ |
| TC-AUTH-006 | Consumer login | POST | /api/auth/login | 200 + token | 200 + token | ✅ |
| TC-AUTH-007 | Farmer login | POST | /api/auth/login | 200 + token | 200 + token | ✅ |
| TC-AUTH-008 | Wrong password | POST | /api/auth/login | 401 | 401 | ✅ |
| TC-AUTH-009 | Get profile | GET | /api/auth/me | 200, no password | 200, no password | ✅ |
| TC-AUTH-010 | Forgot password | POST | /api/auth/forgot-password | 200 | 200 | ✅ |
| TC-AUTH-011 | Rate limiting | POST | /api/auth/login (x21) | 429 | 429 | ✅ |

#### Products Module

| Test ID | Description | Method | Endpoint | Expected | Actual | Status |
|---|---|---|---|---|---|---|
| TC-PROD-001 | Get all products | GET | /api/products | 200, paginated | 200, paginated | ✅ |
| TC-PROD-002 | Filter by category | GET | /api/products?category=Vegetables | 200, filtered | 200, filtered | ✅ |
| TC-PROD-003 | Search products | GET | /api/products?search=tomato | 200, matched | 200, matched | ✅ |
| TC-PROD-004 | Regex injection | GET | /api/products?search=.* | escaped, literal | escaped, literal | ✅ |
| TC-PROD-005 | Create product | POST | /api/products | 201 | 201 | ✅ |
| TC-PROD-006 | No auth create | POST | /api/products | 401 | 401 | ✅ |
| TC-PROD-007 | Consumer create | POST | /api/products | 403 | 403 | ✅ |
| TC-PROD-008 | WebP upload | POST | /api/products | 201 | 201 | ✅ |
| TC-PROD-009 | Invalid file type | POST | /api/products | 400 | 400 | ✅ |
| TC-PROD-010 | File size limit | POST | /api/products | 400 | 400 | ✅ |
| TC-PROD-011 | Update (owner) | PUT | /api/products/:id | 200 | 200 | ✅ |
| TC-PROD-012 | Delete (owner) | DELETE | /api/products/:id | 200 | 200 | ✅ |

#### Cart Module

| Test ID | Description | Method | Endpoint | Expected | Actual | Status |
|---|---|---|---|---|---|---|
| TC-CART-001 | Add item | POST | /api/cart | 200 | 200 | ✅ |
| TC-CART-002 | Exceed stock | POST | /api/cart | 400 | 400 | ✅ |
| TC-CART-003 | Update quantity | PUT | /api/cart/:productId | 200 | 200 | ✅ |
| TC-CART-004 | Remove item | DELETE | /api/cart/:productId | 200 | 200 | ✅ |
| TC-CART-005 | Clear cart | DELETE | /api/cart | 200 | 200 | ✅ |

#### Orders Module

| Test ID | Description | Method | Endpoint | Expected | Actual | Status |
|---|---|---|---|---|---|---|
| TC-ORD-001 | Single farmer order | POST | /api/orders | 201 | 201 | ✅ |
| TC-ORD-002 | Multi-farmer order | POST | /api/orders | 201, 2 farmerStatuses | 201, 2 farmerStatuses | ✅ |
| TC-ORD-003 | Insufficient stock | POST | /api/orders | 400 | 400 | ✅ |
| TC-ORD-004 | Missing address | POST | /api/orders | 400 | 400 | ✅ |
| TC-ORD-005 | Stock decrement | POST→GET | /api/orders→/api/products/:id | stock decreased | stock decreased | ✅ |
| TC-ORD-006 | Farmer confirms | PUT | /api/orders/:id/status | 200, status updated | 200, status updated | ✅ |
| TC-ORD-007 | All confirm | PUT (x2) | /api/orders/:id/status | overall = confirmed | overall = confirmed | ✅ |
| TC-ORD-008 | Farmer dispatches | PUT | /api/orders/:id/status | 200 | 200 | ✅ |
| TC-ORD-009 | Farmer delivers | PUT | /api/orders/:id/status | 200 | 200 | ✅ |
| TC-ORD-010 | Invalid transition | PUT | /api/orders/:id/status | 400 | 400 | ✅ |
| TC-ORD-011 | Cancel order | PUT | /api/orders/:id/status | 200 | 200 | ✅ |
| TC-ORD-012 | Consumer orders | GET | /api/orders/my | 200 | 200 | ✅ |
| TC-ORD-013 | Farmer orders | GET | /api/farmer/orders | 200 | 200 | ✅ |
| TC-ORD-014 | Farmer contacts | GET | /api/orders/my | all farmers shown | all farmers shown | ✅ |

#### Reviews Module

| Test ID | Description | Method | Endpoint | Expected | Actual | Status |
|---|---|---|---|---|---|---|
| TC-REV-001 | Valid review | POST | /api/reviews | 201 | 201 | ✅ |
| TC-REV-002 | No purchase | POST | /api/reviews | 400 | 400 | ✅ |
| TC-REV-003 | Invalid rating | POST | /api/reviews | 400 | 400 | ✅ |
| TC-REV-004 | Duplicate review | POST | /api/reviews | 400 | 400 | ✅ |
| TC-REV-005 | Get reviews | GET | /api/reviews/:productId | 200 | 200 | ✅ |
| TC-REV-006 | Rating aggregation | GET | /api/products/:id | rating computed | rating computed | ✅ |

#### Admin Module

| Test ID | Description | Method | Endpoint | Expected | Actual | Status |
|---|---|---|---|---|---|---|
| TC-ADM-001 | Approve product | PUT | /api/admin/products/:id/approve | 200 | 200 | ✅ |
| TC-ADM-002 | Farmer → admin | GET | /api/admin/users | 403 | 403 | ✅ |
| TC-ADM-003 | Consumer → admin | GET | /api/admin/analytics | 403 | 403 | ✅ |
| TC-ADM-004 | Toggle user | PUT | /api/admin/users/:id/toggle | 200 | 200 | ✅ |
| TC-ADM-005 | Self-deactivate | PUT | /api/admin/users/:id/toggle | 400 | 400 | ✅ |
| TC-ADM-006 | Delete admin | DELETE | /api/admin/users/:id | 400 | 400 | ✅ |
| TC-ADM-007 | Analytics | GET | /api/admin/analytics | 200, full data | 200, full data | ✅ |

#### Frontend Tests

| Test ID | Description | Expected | Actual | Status |
|---|---|---|---|---|
| TC-FE-001 | Landing page loads | Products visible | Products visible | ✅ |
| TC-FE-002 | Responsive nav | Hamburger on mobile | Hamburger on mobile | ✅ |
| TC-FE-003 | 404 page | NotFoundPage renders | NotFoundPage renders | ✅ |
| TC-FE-004 | ChatBot toggle | Open/close works | Open/close works | ✅ |

#### API Health & Security Tests

| Test ID | Description | Method | Endpoint | Expected | Actual | Status |
|---|---|---|---|---|---|---|
| TC-API-001 | Health check | GET | /health | 200, {status:"ok"} | 200, {status:"ok"} | ✅ |
| TC-API-002 | CORS headers | OPTIONS | /api/products | CORS set | CORS set | ✅ |
| TC-API-003 | 404 unknown | GET | /api/nonexistent | 404 | 404 | ✅ |
| TC-API-004 | File size error | POST | /api/products (>5MB) | 400 | 400 | ✅ |

---

## Build Verification

| Step | Command | Result |
|---|---|---|
| Frontend build | `npm run build` (in frontend/) | ✅ 0 errors |
| Backend startup | `npm run dev` (in backend/) | ✅ Server running on port 5000 |

---

## Overall Execution Summary

| Metric | Value |
|---|---|
| Total Test Cases | 63 |
| Passed | 63 |
| Failed | 0 |
| Skipped | 0 |
| Pass Rate | **100%** |
| Build Status | ✅ Clean |
| Server Startup | ✅ Clean |
