# SHYNTRAA V2

# FIGMA ARCHITECTURE-FIRST DESIGN ENGAGEMENT

## PHASE 0 – MANDATORY PLANNING & APPROVAL

### DO NOT START SCREEN DESIGN UNTIL THIS PHASE IS APPROVED

---

# OBJECTIVE

Create a complete design architecture for the Shyntraa platform before any UI screens are produced.

The goal is to eliminate iterative redesign cycles and ensure that the final Figma output can be handed directly to Lovable for implementation.

Figma must first produce a complete platform plan.

No visual design work should begin until the architecture plan is reviewed and approved.

---

# PROJECT CONTEXT

Shyntraa is a Multi-Tenant Automotive Operations Platform.

It is not a CRM.

It is not a Workshop App.

It is not a simple ERP.

The platform manages the complete lifecycle:

Customer
→ Inquiry
→ Appointment
→ Inspection
→ Job Card
→ Bay Allocation
→ Estimate
→ Billing
→ Payment
→ Delivery
→ Customer 360

Additional platform areas:

Vendor Management
Financial Management
Reporting
Administration
Platform Administration

---

# PHASE 0 DELIVERABLES

Figma must produce architecture documentation only.

No high-fidelity screens.

No color system.

No visual styling.

Only structure.

---

# DELIVERABLE 1

# INFORMATION ARCHITECTURE

Produce a complete application map.

Required format:

SHYNTRAA

Dashboard

Customer Management

* Customer Master
* Inquiry Management
* Appointment Management
* Inspection Management
* Customer 360
* Estimates
* Billing
* Payments

Operations

* Job Cards
* Bay Management
* Technician Board
* Workflow Monitoring
* Delivery

Vendor Management

* Vendor Master
* Procurement
* Purchase Orders
* Goods Receipt
* Vendor Performance

Financial Management

* Receivables
* Payables
* Ledger
* Journal Entries
* Cashflow
* Profit & Loss
* Balance Sheet
* Trial Balance

Reporting

* Operational Analytics
* Financial Analytics
* Executive Analytics

Admin

* Users
* Roles
* Templates
* Branding

Super Admin

* Tenants
* Subscriptions
* Monitoring
* Feature Flags
* Platform Health

System

* Integrations
* Audit Logs
* Settings

---

# DELIVERABLE 2

# ROUTE INVENTORY

Create a complete route map.

Example:

/dashboard

/customers
/customers/new
/customers/:id

/inquiries
/inquiries/new
/inquiries/:id

/appointments
/appointments/:id

/jobcards
/jobcards/:id

/vendors
/vendors/:id

/payments
/payments/:id

/admin/users

/admin/roles

/superadmin/tenants

Every route must be documented.

No route may be omitted.

---

# DELIVERABLE 3

# USER ROLE MATRIX

Create visibility matrix.

Roles:

Super Admin

Tenant Admin

Branch Manager

Service Advisor

Technician

Finance Executive

Procurement Executive

For every page define:

Visible
Hidden
Read Only
Editable

---

# DELIVERABLE 4

# SCREEN INVENTORY

Create full screen list.

For each screen define:

Purpose

Primary User

Actions

Widgets

Data Sources

Navigation Destination

Expected Outcomes

---

# DELIVERABLE 5

# MODULE HUB ARCHITECTURE

Define all landing pages.

Customer Hub

Operations Hub

Vendor Hub

Finance Hub

Reporting Hub

Admin Hub

Super Admin Hub

For each hub define:

Cards

KPIs

Widgets

Navigation

Actions

---

# DELIVERABLE 6

# CUSTOMER WORKFLOW MAP

Document the full workflow.

Inquiry

↓

Appointment

↓

Inspection

↓

Job Card

↓

Bay Assignment

↓

Estimate

↓

Approval

↓

Billing

↓

Payment

↓

Delivery

↓

Customer 360

Document every transition.

Document every screen involved.

Document navigation paths.

---

# DELIVERABLE 7

# VENDOR WORKFLOW MAP

Vendor Creation

↓

Procurement Request

↓

Purchase Order

↓

Goods Receipt

↓

Vendor Billing

↓

Vendor Performance

---

# DELIVERABLE 8

# FINANCE WORKFLOW MAP

Receivable

↓

Invoice

↓

Payment

↓

Ledger

↓

P&L

↓

Balance Sheet

↓

Cashflow

Document complete navigation.

---

# DELIVERABLE 9

# REPORTING ARCHITECTURE

Operational Reports

Financial Reports

Executive Analytics

For every report define:

Charts

KPIs

Filters

Exports

Drilldowns

---

# DELIVERABLE 10

# COMPONENT INVENTORY

Create complete reusable component list.

Examples:

Sidebar

Topbar

Search

KPI Widget

AI Card

Chart Widget

Table Widget

Drawer

Modal

Tabs

Timeline

Activity Feed

Alert Widget

Insight Widget

Empty State

Loading State

Every component must be listed.

---

# DELIVERABLE 11

# PAGE TEMPLATE DEFINITIONS

Define standard layouts.

Hub Page

List Page

Detail Page

Create Form

Edit Form

Analytics Page

Dashboard Page

Approval Page

Customer 360 Page

---

# DELIVERABLE 12

# RESPONSIVE STRATEGY

Desktop

Laptop

Tablet

Mobile

Document behavior for:

Sidebar

Tables

Cards

Forms

Charts

Widgets

---

# DELIVERABLE 13

# DESIGN SYSTEM PLAN

Before creating visuals define:

Typography

Spacing Scale

Color Tokens

Border Radius

Elevation

Shadows

Status Colors

Chart Colors

Dark Mode Strategy

Light Mode Strategy

---

# APPROVAL GATE

Figma must stop after completing all planning deliverables.

No screen design work may begin.

Approval will be provided only after:

Information Architecture approved

Route Map approved

Role Matrix approved

Workflow Maps approved

Screen Inventory approved

Component Inventory approved

Responsive Strategy approved

Design System Plan approved

---

# PHASE 1 (AFTER APPROVAL)

Only after Phase 0 approval may Figma proceed with:

1. Design System
2. Component Library
3. Dashboards
4. Customer Module
5. Operations Module
6. Vendor Module
7. Finance Module
8. Reporting Module
9. Admin Module
10. Super Admin Module

---

# FINAL SUCCESS CRITERIA

The final Figma output must be sufficiently detailed that:

* Lovable can build without UI interpretation.
* No module requires redesign.
* No navigation restructuring is required.
* No new routes are introduced during implementation.
* Component library supports all screens.
* Responsive behavior is fully defined.
* Role visibility is fully defined.

The approved architecture becomes the single source of truth for all future UI implementation.
