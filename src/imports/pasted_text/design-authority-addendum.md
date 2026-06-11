# SHYNTRAA V2

# DESIGN AUTHORITY ADDENDUM (DAA v1.0)

## Mandatory Extension to MDA-FES v1.0

## Pre-Build Approval Requirement

---

# 1. PURPOSE

This document extends the approved:

SHYNTRAA V2 – Master Design Authority & Figma Execution Specification (MDA-FES v1.0)

and serves as the final authority before Phase B UI production begins.

The objective is to eliminate interpretation gaps and ensure:

* Single-pass Figma production
* Single-pass Lovable implementation
* No redesign cycles
* No layout drift between modules
* No dashboard inconsistency
* No responsive ambiguity
* No workflow visualization variance

This document is authoritative and overrides any conflicting design decisions.

---

# 2. GLOBAL LAYOUT AUTHORITY

## 2.1 Application Shell

All screens must use the same shell structure.

Desktop Layout:

---

## Sidebar (280px)

## Topbar (72px)

## Page Content

No module may define its own shell.

---

## 2.2 Content Width

Maximum Content Width:

1600px

Content Padding:

24px Desktop
20px Laptop
16px Tablet
12px Mobile

---

## 2.3 Grid System

Desktop:
12 Column Grid

Laptop:
12 Column Grid

Tablet:
8 Column Grid

Mobile:
4 Column Grid

All pages must align to this grid.

No custom page grids permitted.

---

# 3. HUB PAGE BLUEPRINT AUTHORITY

Every hub must use the same structure.

Applicable To:

* Customer Hub
* Operations Hub
* Vendor Hub
* Finance Hub
* Reporting Hub
* Admin Hub
* Super Admin Hub
* System Hub

---

Mandatory Layout Order

1 Header

Title
Breadcrumb
Search
Quick Actions

2 AI Summary Strip

3 KPI Row

4 Widget Grid

5 Recent Activity

6 Alerts & Exceptions

No hub may alter this sequence.

---

# 4. DASHBOARD BLUEPRINT AUTHORITY

All dashboards must follow the exact same structure.

Applicable To:

* Super Admin Dashboard
* Tenant Admin Dashboard
* Branch Dashboard
* Service Advisor Dashboard
* Technician Dashboard
* Finance Dashboard
* Vendor Dashboard

---

Section 1

8 KPI Cards

---

Section 2

4 AI Insight Cards

---

Section 3

3 Analytics Charts

---

Section 4

Operational Widgets

---

Section 5

Approvals / Notifications / Alerts

No custom dashboard layouts permitted.

---

# 5. WIDGET SIZE MATRIX

All widgets must conform to the following sizing system.

Small

1 x 1

Examples:
KPI
Status
Metric

---

Medium

2 x 1

Examples:
AI Insights
Alerts
Tasks

---

Large

2 x 2

Examples:
Charts
Analytics
Forecasts

---

XL

4 x 2

Examples:
Workflow Tracker
Kanban
Board Views

---

Tall

2 x 3

Examples:
Activity Timeline
Notifications
Communication Feed

No custom widget dimensions permitted.

---

# 6. CUSTOMER 360 AUTHORITY

Customer 360 is a platform-defining screen.

No redesigns permitted.

---

Layout

Customer Header

Customer Health Card

Vehicle Summary

Customer Metrics

Tab Navigation

Tab Content

Timeline

Activity Feed

---

Tabs

Overview

Vehicles

Job Cards

Invoices

Payments

Appointments

Communications

Documents

AI Insights

Timeline

Locked at 10 tabs.

---

# 7. WORKFLOW VISUALIZATION AUTHORITY

All workflows must use a common visualization language.

Applicable To:

Customer
Operations
Vendor
Finance

---

Desktop

Horizontal Workflow Tracker

---

Tablet

Scrollable Workflow Strip

---

Mobile

Vertical Timeline

---

Workflow State Colors

Pending
Gray

Active
Cyan

Completed
Green

Blocked
Amber

Failed
Red

These colors are frozen.

---

# 8. AI CARD AUTHORITY

Every AI card must contain:

AI Badge

Title

Confidence %

Prediction

Recommendation

Reasoning

Action Button

---

Standard Layout

Badge

Title

Confidence

Prediction

Reason

Action

No alternate AI card formats permitted.

---

# 9. DATA GRID AUTHORITY

All tables must use the same DataGrid component.

Mandatory Features:

Search

Filters

Saved Views

Column Selector

Export

Pagination

Row Actions

---

Optional

Bulk Actions

Inline Editing

Approval Actions

No custom table implementations allowed.

---

# 10. ROLE EXPERIENCE AUTHORITY

Permissions must be represented visually.

Hidden

Module not visible.

Disabled

Visible but unavailable.

Read Only

Visible without actions.

Full Access

Full actions available.

---

Permission states must be represented consistently across the platform.

---

# 11. RESPONSIVE AUTHORITY

Desktop

1920+

4 Column Widget Grid

---

Laptop

1440

4 Column Widget Grid

---

Tablet

1024

2 Column Widget Grid

---

Mobile

390

1 Column Widget Grid

Bottom Navigation

Cards Replace Tables

Workflow Converts To Timeline

No horizontal page scrolling permitted.

---

# 12. VISUAL CONSISTENCY AUTHORITY

Every module must use:

Same Header Pattern

Same KPI Cards

Same AI Cards

Same Widget Grid

Same DataGrid

Same Timeline

Same Empty States

Same Error States

Same Permission States

No module-specific visual systems permitted.

---

# 13. FIGMA DELIVERABLE REQUIREMENTS

Before approval, Figma must deliver:

1. Information Architecture

2. Navigation Map

3. Role Matrix

4. Dashboard Wireframes

5. Hub Wireframes

6. Customer 360 Wireframe

7. Widget Library

8. Component Library

9. Responsive Layouts

10. Design Tokens

11. Prototype Flows

12. Route Inventory

No production UI begins before these artifacts are approved.

---

# 14. LOVABLE IMPLEMENTATION AUTHORITY

The final Figma package must be Lovable-ready.

The design must not require:

Workflow redesign

Database redesign

Backend redesign

State-machine redesign

Route redesign

Kernel changes

Executive contract changes

Permission model changes

The UI layer must sit on top of the approved architecture exactly as defined.

---

# 15. APPROVAL GATE

Phase B UI Production may begin only when all of the following are approved:

✓ Navigation Architecture

✓ Dashboard Architecture

✓ Hub Architecture

✓ Customer 360

✓ Workflow Visualizations

✓ AI Widgets

✓ Component Library

✓ Responsive Design

✓ Role Visibility Model

✓ Design Tokens

✓ Lovable Handoff Constraints

Only after all items are approved may Figma proceed to full UI production.

END OF DOCUMENT
