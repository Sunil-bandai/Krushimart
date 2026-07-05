# Phase 6 — Testing

## Overview

This directory contains the complete testing documentation for KrushiMart, an e-commerce platform connecting local farmers directly with consumers.

## Documents

| File | Description |
|---|---|
| `01-test-cases.md` | 50+ test cases organized by module with preconditions, steps, and expected results |
| `02-test-execution.md` | Test execution tracking with actual results, status, and evidence references |
| `03-bug-reporting.md` | Bug reports discovered during testing with severity and resolution details |
| `04-validation-report.md` | Final validation summary, coverage analysis, and sign-off |

## Testing Approach

Since no formal test framework (Jest, Mocha, Cypress) was installed, testing was performed using:

- **Manual API testing** via curl/Postman with `tools/smoke_test.js`
- **Frontend manual testing** via browser with `frontend/test.html`
- **Integration testing** through the multi-farmer order workflow
- **End-to-end testing** of the complete purchase flow

## Test Environment

| Component | Version |
|---|---|
| Node.js | 20.x |
| MongoDB | 7.x (local) |
| Express | 5.x |
| React | 18.x |
| Vite | 5.x |

## Seed Data

| Role | Count | Credentials |
|---|---|---|
| Farmers | 25 | `Farmer@123` |
| Consumers | 25 | `Consumer@123` |
| Admin | 1 | `admin@krushimart.com` / `admin123` |
| Products | 60 | Across 6 categories |

## Navigation

```
KrushiMart/
├── docs/
│   ├── phase4/          ← System Modeling (diagrams)
│   └── phase6/          ← Testing (this directory)
│       ├── README.md    ← You are here
│       ├── 01-test-cases.md
│       ├── 02-test-execution.md
│       ├── 03-bug-reporting.md
│       └── 04-validation-report.md
├── backend/
├── frontend/
└── README.md
```
