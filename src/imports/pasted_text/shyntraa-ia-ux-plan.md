# SHYNTRAA V2

# PHASE A – INFORMATION ARCHITECTURE & UX PLANNING PACKAGE

## PRE-DESIGN APPROVAL DOCUMENT

### Version 1.0

---

# OBJECTIVE

This phase is NOT for visual design.

This phase exists to create a complete, approved blueprint for the Shyntraa ERP platform before any high-fidelity UI work begins.

No screens, colors, animations, or polished mockups should be created until this Phase A package is approved.

The final output of Phase A must be sufficiently detailed that Lovable can later implement the approved Figma design with minimal interpretation.

---

# SHYNTRAA PLATFORM OVERVIEW

Shyntraa is a multi-tenant automotive ERP platform serving:

* Auto Service Centers
* Auto Detailing Centers
* Body Shops
* Workshops
* Multi-Branch Enterprises
* Franchise Networks

The platform supports:

* Customer Management
* Operations Management
* Vendor Management
* Finance Management
* Reporting & Analytics
* Administration
* Super Administration
* Platform Management

The platform must be AI-native and role-aware.

---

# PHASE A DELIVERABLES

Figma must deliver and obtain approval for all of the following:

## Deliverable A1

Information Architecture Diagram

## Deliverable A2

Navigation Architecture

## Deliverable A3

Role Visibility Matrix

## Deliverable A4

Workflow Maps

## Deliverable A5

Route Inventory

## Deliverable A6

Screen Inventory

## Deliverable A7

Widget Inventory

## Deliverable A8

Component Library Definition

## Deliverable A9

Dashboard Blueprint

## Deliverable A10

Responsive Strategy

## Deliverable A11

State Matrix

## Deliverable A12

Lovable Handoff Blueprint

---

# INFORMATION ARCHITECTURE

Root Navigation Structure

Dashboard

Customer Management

Operations

Vendor Management

Financial Management

Reporting

Admin

Super Admin

System

---

# MODULE STRUCTURE

## Dashboard

Role-Based Dashboards

* Super Admin
* Tenant Admin
* Branch Manager
* Service Advisor
* Technician
* Finance User
* Vendor User

---

## Customer Management

Customer Hub

Customer Master

Inquiries

Appointments

Vehicle Inspections

Job Cards

Estimates

Billing

Customer 360

---

## Operations

Operations Hub

Technician Board

Bay Board

Workflow Monitor

Delivery Board

---

## Vendor Management

Vendor Hub

Vendor Master

Purchase Requests

Purchase Orders

Goods Receipt

Vendor Analytics

Vendor Scorecard

---

## Financial Management

Finance Hub

Payments

Receipts

Journal Entries

Ledger

Trial Balance

Profit & Loss

Balance Sheet

Cash Flow

---

## Reporting

Reporting Hub

Report Catalog

Analytics

Forecasting

Executive Reporting

---

## Admin

Admin Hub

Users

Roles

Permissions

Templates

Branding

WhatsApp Configuration

System Settings

---

## Super Admin

Super Admin Hub

Tenants

Subscriptions

Feature Flags

Monitoring

Error Logs

API Usage

Platform Analytics

---

## System

System Hub

Integrations

Audit Logs

API Management

Platform Health

Diagnostics

---

# ROLE MATRIX

Create a complete role-to-screen access matrix.

Required roles:

Super Admin

Tenant Admin

Branch Manager

Service Advisor

Technician

Finance User

Vendor User

For every route define:

* Read
* Create
* Update
* Delete
* Approve
* Export

permissions.

---

# WORKFLOW MAPS

## Customer Lifecycle

Inquiry

→ Appointment

→ Vehicle Inspection

→ Job Card

→ Bay Assignment

→ Estimate

→ Approval

→ Work Execution

→ Quality Control

→ Invoice

→ Payment

→ Vehicle Delivery

→ Customer 360

---

## Vendor Lifecycle

Vendor

→ Purchase Request

→ Approval

→ Purchase Order

→ Goods Receipt

→ Vendor Invoice

→ Payment

→ Vendor Scorecard

---

## Finance Lifecycle

Receivable

→ Invoice

→ Receipt

→ Ledger

Payable

→ Vendor Invoice

→ Payment

→ Ledger

Period Close

→ Trial Balance

→ Profit & Loss

→ Balance Sheet

→ Cash Flow

---

## Administration Lifecycle

User

→ Role

→ Permission

→ Templates

→ Branding

→ Audit

---

# ROUTE INVENTORY

Figma must create a complete route inventory.

For each route define:

Route Name

Module

Parent Module

Role Access

Primary Action

Secondary Action

Navigation Entry Point

No route should be left undefined.

---

# SCREEN INVENTORY

For every route define:

Screen Name

Purpose

Primary User

Actions

Data Inputs

Data Outputs

Dependencies

Related Screens

Expected States

---

# DASHBOARD BLUEPRINT

Every dashboard must contain:

Section 1

KPI Row

8 cards

---

Section 2

AI Insight Row

4 cards

---

Section 3

Charts Row

Revenue

Performance

Utilization

---

Section 4

Operational Widgets

---

Section 5

Alerts

Notifications

Exceptions

Approvals

---

# WIDGET INVENTORY

Every widget must be documented.

Required definition:

Widget Name

Purpose

Inputs

Outputs

Actions

AI Components

Target Roles

Linked Route

---

# AI WIDGET INVENTORY

Required widgets include:

Revenue Forecast

Customer Churn Risk

Follow-up Recommendation

Vendor Risk Score

Inventory Forecast

Collection Risk

Technician Performance Prediction

Bay Bottleneck Prediction

Delivery Delay Prediction

Executive Insights

Each widget must define:

Input Data

Calculation Source

Confidence Indicator

Recommended Actions

Expected Output

---

# COMPONENT LIBRARY

Define reusable components.

Mandatory components:

Sidebar

Top Navigation

Breadcrumb

KPI Card

AI Card

Analytics Card

Insight Panel

Search Bar

Filters

Data Table

Timeline

Status Badge

Widget Container

Tab Navigation

Modal

Drawer

Activity Feed

Notification Panel

Empty State

Error State

Loading Skeleton

Every component must include:

Variants

States

Responsive Behavior

Usage Rules

---

# CUSTOMER 360 SPECIFICATION

Customer 360 must include:

Overview

Vehicles

Inquiries

Appointments

Job Cards

Estimates

Billing

Communication History

Documents

AI Insights

Total Tabs = 10

---

# RESPONSIVE STRATEGY

Desktop

1920+

Laptop

1440+

Tablet

1024+

Mobile

390+

For every screen define:

Layout Behavior

Navigation Behavior

Table Behavior

Widget Behavior

Chart Behavior

---

# STATE MATRIX

Every screen must define:

Loading

Empty

Success

Error

Permission Denied

Offline

No screen may omit state handling.

---

# LOVABLE HANDOFF REQUIREMENTS

Phase A must produce:

Approved IA

Approved Route Map

Approved Workflow Maps

Approved Widget Catalog

Approved Component Library

Approved State Matrix

Approved Responsive Rules

Approved Dashboard Blueprint

Only after these artifacts are approved may Figma proceed to high-fidelity design.

---

# PHASE A EXIT CRITERIA

Phase A is considered complete only if:

100% of routes are defined

100% of screens are defined

100% of widgets are defined

100% of workflows are mapped

100% of roles are mapped

100% of states are documented

100% of responsive rules are documented

No undefined navigation paths exist

No orphan screens exist

No orphan widgets exist

Lovable implementation should require no architectural assumptions.

END OF PHASE A
