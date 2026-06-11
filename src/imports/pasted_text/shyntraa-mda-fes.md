# SHYNTRAA V2

# MASTER DESIGN AUTHORITY & FIGMA EXECUTION SPECIFICATION (MDA-FES) v1.0

## Status

Architecture Freeze Candidate

## Purpose

This document serves as the single source of truth for:

* Figma Planning
* Figma Architecture Validation
* Figma UI/UX Design
* Lovable Build Execution
* QA Validation
* Future Expansion

No new structural requirements may be introduced after approval of this document.

---

# 1. PLATFORM VISION

Shyntraa is an AI-native Automotive Service Operations Platform.

The platform is designed to manage:

1. Customer Lifecycle
2. Service Lifecycle
3. Workshop Operations
4. Vendor Ecosystem
5. Financial Operations
6. Reporting & Analytics
7. Administration
8. Multi-Tenant Management
9. Platform Governance

The product must feel like:

* Tesla Service Platform
* Linear
* Notion
* Retool
* Palantir Foundry

combined into a single operational workspace.

---

# 2. DESIGN PRINCIPLES

### Hub First

Users always land on a Hub page before entering detail pages.

### AI Native

Every module includes AI-powered widgets and insights.

### Workflow Driven

Workflows are first-class citizens.

### Role Aware

The experience adapts to user role.

### Mobile Ready

Every screen must be responsive.

### Buildable

Every design must be implementable in Lovable without redesign.

---

# 3. INFORMATION ARCHITECTURE

## Sidebar Navigation (Frozen)

Dashboard

Customer Management

* Customer Master
* Inquiry Management
* Appointments
* Vehicle Inspections
* Job Cards
* Estimates
* Billing
* Customer 360

Operations

* Operations Hub
* Bay Management
* Technician Board
* Workflow Monitor
* Delivery Center

Vendor Management

* Vendor Hub
* Vendor Master
* Procurement
* Purchase Orders
* Goods Receipt
* Vendor Analytics

Financial Management

* Finance Hub
* Payments
* Receipts
* Journals
* Ledger
* Trial Balance
* Profit & Loss
* Balance Sheet
* Cash Flow

Reporting

* Reporting Hub
* Operational Reports
* Financial Reports
* Analytics

Admin

* Admin Hub
* Users
* Roles
* Permissions
* Templates
* Branding
* WhatsApp Setup
* Settings

Super Admin

* Super Admin Hub
* Tenant Management
* Subscription Management
* Feature Flags
* Monitoring
* Error Logs
* API Usage

System

* System Hub
* Integrations
* API Management
* Audit Logs
* Platform Health
* Notifications

No additional top-level modules may be added.

---

# 4. ROLE MATRIX

The platform supports seven role experiences.

### Super Admin

Platform-wide management.

### Tenant Admin

Tenant-wide management.

### Branch Manager

Branch operations.

### Service Advisor

Customer-facing operations.

### Technician

Workshop execution.

### Finance User

Financial operations.

### Vendor User

Vendor-facing operations.

Each role must have:

* Dashboard
* Navigation visibility
* Permission-aware actions
* Permission-aware widgets

---

# 5. DASHBOARD ARCHITECTURE

Seven dashboards must exist.

1. Super Admin Dashboard
2. Tenant Admin Dashboard
3. Branch Manager Dashboard
4. Service Advisor Dashboard
5. Technician Dashboard
6. Finance Dashboard
7. Vendor Dashboard

Each dashboard must include:

* KPI widgets
* AI widgets
* Activity feed
* Alerts
* Workflow summary

---

# 6. HUB ARCHITECTURE

Every module begins with a Hub.

Users never land directly on a table.

## Vendor Hub

Widgets:

* Vendor Master
* Purchase Requests
* Purchase Orders
* Goods Receipt
* Vendor Performance
* Spend Analysis
* Quality Scorecard
* Inventory Forecast AI

## Finance Hub

Widgets:

* Payments
* Receipts
* Journals
* Ledger
* Trial Balance
* Profit & Loss
* Balance Sheet
* Cash Flow
* Revenue Forecast AI

## Reporting Hub

Widgets:

* Revenue Analytics
* Job Card Analytics
* Technician Analytics
* Bay Utilization
* Customer Retention
* Vendor Spend
* GST Summary
* Aging Report
* AI Executive Summary

## Admin Hub

Widgets:

* User Management
* Role Management
* Permissions Matrix
* Audit Logs
* Templates
* Branding
* WhatsApp Configuration
* System Settings

## Super Admin Hub

Widgets:

* Tenants
* Subscriptions
* Platform Monitoring
* Feature Flags
* Error Logs
* API Usage
* Platform Health

## System Hub

Widgets:

* Integrations
* API Management
* Audit Logs
* Notifications
* Platform Health
* Webhooks

---

# 7. CUSTOMER WORKFLOW (LOCKED)

Inquiry
→ Appointment
→ Vehicle Inspection
→ Job Card
→ Bay Allocation
→ Estimate
→ Approval
→ Work Execution
→ Quality Check
→ Ready For Delivery
→ Invoice
→ Payment
→ Delivery

This workflow must be visually represented throughout the platform.

---

# 8. CUSTOMER 360

Customer 360 consists of ten tabs.

1. Overview
2. Vehicles
3. Job Cards
4. Invoices
5. Payments
6. Appointments
7. Communications
8. Documents
9. AI Insights
10. Timeline

Customer 360 is the final destination of all customer-related workflows.

---

# 9. PAGE TEMPLATE STANDARDS

## Hub Page Template

Header

* Title
* Breadcrumb
* Search
* Quick Actions

AI Summary Strip

Widget Grid

Recent Activity

Alerts

## List Page Template

Header

Filters

Saved Views

Bulk Actions

Table/Grid

Pagination

## Detail Page Template

Header

Summary

Tabs

Timeline

Attachments

Activity Log

## Analytics Page Template

Header

Date Filter

KPI Row

Charts

AI Summary

Export Actions

No custom layouts are allowed outside these patterns.

---

# 10. WORKFLOW VISUALIZATION STANDARD

Reusable workflow component.

States:

* Pending
* Active
* Completed
* Blocked
* Failed

Workflow component must appear in:

* Dashboard
* Customer Journey
* Job Cards
* Operations
* Customer 360

---

# 11. AI WIDGET FRAMEWORK

Every AI card must include:

* AI Badge
* Widget Title
* Confidence %
* Prediction
* Recommendation
* Why This Recommendation
* Action Button

Examples:

Customer AI

* Churn Risk
* Upsell Prediction
* Next Service Prediction

Operations AI

* Bay Bottleneck Detection
* Technician Utilization
* Delay Prediction

Vendor AI

* Vendor Risk
* Procurement Recommendation
* Price Trend Forecast

Finance AI

* Revenue Forecast
* Collections Risk
* Cash Flow Forecast

Reporting AI

* Executive Summary
* Trend Analysis
* Business Insights

---

# 12. DATA GRID STANDARD

Every table must support:

Mandatory:

* Search
* Filters
* Export
* Column Selector
* Pagination
* Row Actions

Optional:

* Bulk Actions
* Saved Views

No custom table implementations.

---

# 13. ROLE SWITCHING UX

### Super Admin

Can switch tenants.

### Tenant Admin

Can switch branches.

### Branch Manager

Can switch departments.

Switchers appear in the top navigation bar.

---

# 14. DESIGN SYSTEM

## Colors

Primary Accent
#00E5FF

AI Accent
#A3E635

Background
#0B1120

Surface
#111827

Border
rgba(255,255,255,0.08)

## Typography

Heading
Inter Bold

Body
Inter Regular

Metrics
JetBrains Mono

---

# 15. COMPONENT LIBRARY

Core Components

* AiCard
* KPI Card
* Chart Card
* Data Grid
* Timeline
* Workflow Tracker

Business Components

* Customer Card
* Vehicle Card
* Job Card
* Vendor Card
* Invoice Card

AI Components

* AI Insight Card
* AI Forecast Card
* AI Recommendation Card

States

* Loading
* Empty
* Error
* Permission Denied
* Offline

---

# 16. RESPONSIVE STRATEGY

Breakpoints:

1920+
1440
1280
1024
768
390

Desktop:
Persistent sidebar

Tablet:
Collapsible sidebar

Mobile:
Bottom navigation

Rules:

No horizontal scrolling.

Tables become card layouts on mobile.

Workflow becomes horizontal swipe component on mobile.

---

# 17. EMPTY / ERROR STATE STANDARD

## Empty State

Illustration

Message

Primary CTA

## Error State

Error Message

Retry Action

Support Action

## Permission State

Access Denied Message

Request Access Action

---

# 18. SCREEN INVENTORY

Target:

65–70 routes

Modules:

Dashboard
Customer
Operations
Vendor
Finance
Reporting
Admin
Super Admin
System

Every route must map to:

* Role visibility
* Navigation path
* Primary action

---

# 19. WIDGET INVENTORY

Standard Widgets

* KPI
* Trend
* Chart
* Table
* Activity
* Timeline
* Workflow
* Alert
* Queue
* Approval
* Utilization
* Forecast
* Health

AI Widgets

* Revenue Forecast
* Churn Risk
* Upsell Prediction
* Vendor Risk
* Procurement AI
* Cash Flow AI
* Bottleneck AI
* Technician AI
* Failure Prediction
* Executive Summary AI

---

# 20. FIGMA EXECUTION PHASES

Phase B1
Design System

Phase B2
Shell Layout

Phase B3
Component Library

Phase B4
Dashboard Templates

Phase B5
Hub Templates

Phase B6
Customer Screens

Phase B7
Operations Screens

Phase B8
Vendor Screens

Phase B9
Finance Screens

Phase B10
Reporting Screens

Phase B11
Admin Screens

Phase B12
Super Admin Screens

Phase B13
System Screens

Phase B14
Responsive Views

Phase B15
Prototype Flows

---

# 21. FIGMA APPROVAL GATES

Before moving to final design production, Figma must return:

Package 1
Architecture Validation

Package 2
Design System

Package 3
Component Library

Package 4
Dashboard Templates

Package 5
Hub Templates

Package 6
Workflow Templates

Package 7
Customer 360 Templates

Package 8
Responsive Templates

Package 9
Prototype Package

Approval required after each package.

---

# 22. LOVABLE READINESS CRITERIA

The design is considered Lovable-ready only when:

* All modules exist
* All hubs exist
* All workflows exist
* All role experiences exist
* All AI widgets exist
* Customer 360 includes 10 tabs
* Dashboard variants total 7
* Responsive layouts exist
* Component library is complete
* Design tokens are applied consistently
* No page requires redesign before implementation

END OF DOCUMENT
