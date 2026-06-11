# SHYNTRAA V2

# MASTER DESIGN SPECIFICATION (MDS)

## FIGMA EXECUTION BLUEPRINT

### Version 1.0 (Execution Locked)

---

# 1. OBJECTIVE

Design the complete SHYNTRAA platform UI as a modern AI-first automotive operations platform.

The output from Figma must be directly consumable by Lovable without requiring redesign, reinterpretation, additional architecture decisions, or major iteration cycles.

The design must represent the final product vision rather than a collection of disconnected screens.

---

# 2. DESIGN PRINCIPLES

The platform must feel:

* Premium
* AI Native
* Enterprise Grade
* Real-Time
* Data Driven
* Operationally Dense
* Modern SaaS
* Automotive Focused

Reference visual direction:

* Linear
* Vercel
* Retool
* Stripe Dashboard
* Datadog
* Monday.com
* Tesla Fleet UI
* ServiceTitan

Avoid:

* Generic CRM appearance
* Traditional ERP appearance
* Legacy Bootstrap style
* Dense SAP-style screens
* Overuse of modal dialogs

---

# 3. GLOBAL APPLICATION STRUCTURE

SHYNTRAA

Dashboard

Customer Management

* Customer Master
* Inquiries
* Appointments
* Inspections
* Job Cards
* Bays
* Estimates
* Billing
* Payments
* Customer 360

Operations

* Operations Hub
* Technician Board
* Workflow Monitor
* Bay Control Center
* Delivery Desk

Vendor Management

* Vendor Hub
* Vendor Master
* Procurement
* Purchase Orders
* Goods Receipt
* Vendor Performance

Financial Management

* Finance Hub
* Payments
* Receipts
* Journal Entries
* Ledger
* Trial Balance
* Profit & Loss
* Balance Sheet
* Cash Flow

Reporting

* Reporting Hub
* Standard Reports
* Advanced Analytics
* Executive Reports
* KPI Center

Admin

* Admin Hub
* Users
* Roles
* Permissions
* Templates
* Branding
* WhatsApp Configuration
* System Settings

Super Admin

* Super Admin Hub
* Tenant Management
* Subscription Management
* Platform Management
* Monitoring
* Feature Flags

System

* System Hub
* Integrations
* Audit Logs
* API Management
* Platform Health

---

# 4. USER ROLES

Design separate experiences for:

1. Super Admin
2. Tenant Admin
3. Branch Manager
4. Service Advisor
5. Technician
6. Finance User
7. Vendor User

Each role receives:

* Different dashboard
* Different widget priority
* Different navigation visibility
* Different KPI visibility

---

# 5. APPLICATION SHELL

Persistent Layout:

Left Sidebar
Top Navigation Bar
Content Area
AI Assistant Panel (optional collapse)

Desktop Layout:

Sidebar Width:
280px

Topbar Height:
72px

Content:
Responsive Grid

---

# 6. SIDEBAR SPECIFICATION

Sidebar contains:

Logo

Workspace Selector

Navigation

Quick Actions

User Profile

Theme Switcher

Notification Center

Support

Design:

Glassmorphism
Dark Surface
Soft Glow

---

# 7. TOPBAR SPECIFICATION

Contains:

Global Search

AI Command Bar

Notifications

Branch Selector

Role Indicator

User Menu

Command Center

---

# 8. DESIGN TOKENS

Primary:
#00E5FF

Secondary:
#7C3AED

Success:
#10B981

Warning:
#F59E0B

Danger:
#EF4444

Background:
#0B1120

Card:
#111827

Border:
#1F2937

Text Primary:
#F9FAFB

Text Secondary:
#94A3B8

Radius:
16px

Shadow:
Soft Ambient

---

# 9. UNIVERSAL WIDGET FRAMEWORK

Every widget follows:

Header

Title

Status

Actions

Body

Primary Metric

Secondary Metric

Visualization

Footer

AI Insight

Timestamp

Drill Down CTA

---

# 10. DASHBOARD SUITE

Create dashboard variants for:

Super Admin
Tenant Admin
Branch Manager
Service Advisor
Technician
Finance User
Vendor User

Each dashboard contains:

KPI Row

Activity Feed

Performance Charts

AI Insights

Alerts

Recommendations

Tasks

Workflow Health

---

# 11. CUSTOMER MANAGEMENT HUB

Widgets:

Customer Master

Inquiries

Appointments

Inspections

Job Cards

Bay Allocation

Estimates

Payments

Customer Retention

Customer 360

AI Widgets:

Conversion Prediction

Customer Churn Risk

Upsell Opportunities

Repeat Service Forecast

---

# 12. OPERATIONS HUB

Widgets:

Open Job Cards

Technician Utilization

Bay Utilization

Pending Deliveries

QC Queue

Workflow Health

AI Widgets:

Workload Forecast

Technician Productivity

Delivery Risk

Workflow Bottlenecks

---

# 13. VENDOR HUB

Widgets:

Vendor Master

Purchase Requests

Purchase Orders

Goods Receipt

Vendor Performance

Spend Analysis

Quality Scorecard

AI Widgets:

Vendor Risk Score

Price Trend Analysis

Procurement Suggestions

Inventory Forecast

---

# 14. FINANCE HUB

Widgets:

Payments

Receipts

Journal Entries

Ledger

P&L

Balance Sheet

Cash Flow

Trial Balance

AI Widgets:

Revenue Forecast

Cash Flow Prediction

Expense Anomalies

Collection Risk

---

# 15. REPORTING HUB

Widgets:

Revenue Analytics

Job Card Analytics

Technician Analytics

Bay Analytics

Customer Analytics

GST Reports

Aging Reports

AI Widgets:

Trend Analysis

Anomaly Detection

Forecast Engine

Operational Recommendations

---

# 16. ADMIN HUB

Widgets:

Users

Roles

Permissions

Templates

Branding

WhatsApp

Settings

AI Widgets:

Permission Risk

User Activity Analysis

Configuration Audit

---

# 17. SUPER ADMIN HUB

Widgets:

Tenants

Subscriptions

Provisioning

Feature Flags

Monitoring

Error Logs

API Usage

AI Widgets:

Tenant Health

Revenue Forecast

Usage Insights

Infrastructure Risk

---

# 18. SYSTEM HUB

Widgets:

Integrations

Audit Logs

API Keys

Platform Health

Background Jobs

Webhooks

AI Widgets:

System Anomalies

Integration Health

Failure Prediction

---

# 19. CUSTOMER 360

10 Tabs

Overview

Vehicles

Appointments

Job Cards

Invoices

Payments

Communication

Documents

Timeline

Insights

Single-page experience.

No modal navigation.

---

# 20. RESPONSIVE STRATEGY

Desktop:
1440+

Laptop:
1280

Tablet:
768

Mobile:
390

All hubs must have:

Desktop Layout

Tablet Layout

Mobile Layout

Separate Figma frames required.

---

# 21. COMPONENT LIBRARY

Mandatory reusable components:

AiCard

MetricCard

WidgetContainer

InsightPanel

Sidebar

Topbar

SearchBar

FilterBar

DataTable

KanbanBoard

Timeline

ChartContainer

NotificationPanel

RoleSwitcher

StatusChip

ProgressRing

---

# 22. ROUTE OWNERSHIP MATRIX

For every route define:

Route

Component

Role Access

Data Source

Widget Owner

Drilldown Target

No undefined routes allowed.

---

# 23. DATA OWNERSHIP MATRIX

Every widget must define:

Source

Read Only / Editable

Refresh Method

Permission

Drilldown

AI Model Dependency

---

# 24. LOVABLE BUILD CONSTRAINTS

UI ONLY

No database changes

No schema changes

No workflow kernel changes

No workflow contract changes

No event processor changes

No projection changes

No auth changes

No executive contract changes

No backend mutations

No server-side architectural modifications

---

# 25. FIGMA DELIVERABLES

Phase 1

Design System

Component Library

Navigation Architecture

Role Matrix

Approval Required

Phase 2

Dashboard

Customer Hub

Operations Hub

Approval Required

Phase 3

Vendor

Finance

Reporting

Approval Required

Phase 4

Admin

Super Admin

System

Approval Required

Phase 5

Customer 360

Detail Pages

Forms

Tables

Approval Required

Phase 6

Prototype

Interactions

Responsive Validation

Final Approval

---

# 26. ACCEPTANCE CRITERIA

Design is accepted only when:

100% navigation mapped

100% routes defined

100% widgets specified

100% responsive layouts designed

Role matrix implemented

Component library complete

No placeholder screens

No undefined data states

All modules represented

All AI widgets represented

Figma prototype navigable end-to-end

Lovable implementation can proceed without requiring additional design decisions.

END OF DOCUMENT
