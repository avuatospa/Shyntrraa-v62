# SHYNTRAA V2 UI/UX MASTER DESIGN SPECIFICATION

## Figma Build Brief (Final)

### Version: 1.0

### Status: Design Authority Document

### Audience: Figma Design Team

### Downstream Consumer: Lovable Build Engine

---

# 1. OBJECTIVE

Design the complete Shyntraa platform UI.

This is NOT a single inquiry page.

This is a full multi-tenant automotive operations platform.

The output of this design exercise must be complete enough that Lovable can build the entire frontend without requiring architecture interpretation.

---

# 2. PRODUCT OVERVIEW

Shyntraa is a multi-tenant automotive operations platform covering:

* Customer lifecycle
* Workshop operations
* Job card management
* Bay management
* Vendor management
* Procurement
* Finance
* Reporting
* Administration
* Multi-tenant platform management

Primary users:

* Super Admin
* Tenant Admin
* Branch Manager
* Service Advisor
* Technician
* Finance Executive
* Procurement Executive

---

# 3. APPLICATION STRUCTURE

Create a unified application shell.

Global layout:

Left Sidebar
Top Navigation
Content Area
Notification Layer
Global Search Layer

The shell must be reusable across all pages.

---

# 4. SIDEBAR STRUCTURE

Design sidebar exactly as below.

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
* Delivery Management

Vendor Management

* Vendor Master
* Procurement
* Purchase Orders

Financial Management

* Receivables
* Payables
* Ledger
* Cashflow

Reporting

* Operational Reports
* Financial Reports
* Executive Analytics

Admin

* Users
* Roles
* Templates
* Branding

Super Admin

* Tenants
* Subscription Plans
* Platform Monitoring

System

* Integrations
* Audit Logs
* Settings

---

# 5. DESIGN LANGUAGE

Visual style:

Enterprise SaaS

Reference products:

* Salesforce
* HubSpot
* Zoho One
* ServiceTitan
* Odoo Enterprise

Requirements:

* Clean
* Data Dense
* Executive Friendly
* Operationally Efficient

Avoid:

* Consumer App Styling
* Excessive Empty Space
* Heavy Animations

---

# 6. DESIGN TOKENS

Border Radius
12px

Card Radius
16px

Input Radius
10px

Sidebar Width
280px Expanded
72px Collapsed

Grid
12 Column

Spacing Scale
4 / 8 / 12 / 16 / 24 / 32

---

# 7. TOP NAVIGATION

Required Components

Branch Selector

Global Search

Notification Center

Task Center

Profile Menu

Role Badge

Global Search must support:

Customers
Vehicles
Inquiries
Appointments
Job Cards
Invoices
Vendors

---

# 8. DASHBOARD SYSTEM

Create four dashboard variants.

Variant 1:
Super Admin Dashboard

Widgets:

* Total Tenants
* Active Users
* Monthly Revenue
* Platform Health
* Subscription Status
* System Alerts

Variant 2:
Tenant Admin Dashboard

Widgets:

* Branches
* Revenue
* Customers
* Open Job Cards
* Pending Payments

Variant 3:
Branch Dashboard

Widgets:

* Today's Appointments
* Open Job Cards
* Bay Utilization
* Technician Productivity
* Revenue

Variant 4:
Technician Dashboard

Widgets:

* Assigned Jobs
* In Progress
* Pending QC
* Completed Today

---

# 9. MODULE HUB STANDARD

Every module requires a hub page.

Each hub page follows the Masters page pattern.

Layout:

Page Header

Search

Card Grid

Card Structure:

Icon
Title
Description
Metric Badge
Arrow

---

# 10. CUSTOMER MANAGEMENT HUB

Cards:

Customer Master
Inquiry Management
Appointment Management
Inspection Management
Customer 360
Estimates
Billing
Payments

Each card displays live KPI badges.

---

# 11. OPERATIONS HUB

Cards:

Job Cards
Bay Management
Technician Board
Workflow Monitoring
Delivery Management

---

# 12. VENDOR MANAGEMENT HUB

Cards:

Vendor Master
Procurement
Purchase Orders

---

# 13. FINANCIAL MANAGEMENT HUB

Cards:

Receivables
Payables
Ledger
Cashflow

---

# 14. REPORTING HUB

Cards:

Operational Analytics
Financial Analytics
Executive Analytics

---

# 15. ADMIN HUB

Cards:

Users
Roles
Templates
Branding

---

# 16. SUPER ADMIN HUB

Cards:

Tenants
Subscriptions
Platform Monitoring

---

# 17. PAGE INVENTORY

Design all pages.

Customer Module

Customer List
Customer Create
Customer Edit
Customer View
Customer 360

Inquiry Module

Inquiry List
Inquiry Create
Inquiry Detail
Follow Up View

Appointment Module

Appointment Calendar
Appointment List
Appointment Detail

Operations Module

Job Card List
Job Card Detail
Bay Board
Technician Board
Workflow Monitor

Vendor Module

Vendor List
Vendor Detail
Purchase Order List
Purchase Order Detail

Finance Module

Receivable List
Payable List
Ledger
Cashflow

Admin Module

Users
Roles
Templates
Branding

Super Admin Module

Tenants
Subscriptions
Platform Health

---

# 18. CUSTOMER 360 PAGE

Tabs:

Profile
Vehicles
Inquiries
Appointments
Job Cards
Estimates
Invoices
Payments
Notes
Timeline

Design full interaction model.

---

# 19. TABLE STANDARD

Every list page must include:

Search

Filters

Column Selector

Export

Bulk Actions

Saved Views

Pagination

Sticky Header

Responsive Columns

---

# 20. FORM STANDARD

Every create/edit page uses:

Section Cards

Field Groups

Attachments

Audit Information

Timeline

Activity Feed

Validation States

Success States

Error States

---

# 21. REPORTING SYSTEM

Create analytics screens for:

Revenue

Customer Growth

Inquiry Conversion

Appointment Conversion

Job Card Productivity

Bay Utilization

Technician Efficiency

Vendor Spend

Cashflow

Profitability

---

# 22. MOBILE RESPONSIVE RULES

Desktop:
4 Columns

Laptop:
3 Columns

Tablet:
2 Columns

Mobile:
1 Column

Sidebar becomes drawer.

---

# 23. COMPONENT LIBRARY

Create reusable design components.

Buttons

Inputs

Dropdowns

Tables

Cards

Stat Widgets

Charts

Tabs

Timeline

Drawers

Modals

Badges

Alerts

Empty States

Loading States

---

# 24. FIGMA DELIVERABLES

Required Output:

1. Design System File
2. Component Library File
3. Dashboard File
4. Customer Module File
5. Operations Module File
6. Vendor Module File
7. Finance Module File
8. Reporting Module File
9. Admin Module File
10. Super Admin Module File
11. Mobile Responsive File

---

# 25. LOVABLE READINESS CRITERIA

The design is considered complete only when:

All modules designed
All routes designed
All dashboards designed
All forms designed
All tables designed
All responsive states designed
All permissions represented
All reusable components created

Target:

Lovable should be able to build directly from Figma with no additional UI interpretation.
