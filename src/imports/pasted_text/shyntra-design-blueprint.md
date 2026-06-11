# SHYNTRAA DESIGN AUTHORITY DOCUMENT V1

## Master UI / UX Blueprint For Figma

Status: Design Authority

Audience: Figma AI / Product Designers

Purpose:

Create the complete visual design system, navigation framework, page hierarchy, workflows, dashboards, and user experience for Shyntra.

This document supersedes any previously generated standalone page designs.

Design all screens as part of a single integrated platform.

---

# Product Overview

Shyntra is a multi-tenant automotive workshop operating system.

It combines:

* CRM
* Workshop Operations
* Service Management
* Job Card Management
* Bay Management
* Inventory
* Billing
* Vendor Management
* Accounting
* Reporting
* Multi-Tenant Administration

The system serves:

* Single workshop operators
* Multi-branch workshop operators
* Franchise networks
* Enterprise workshop groups

---

# Design Philosophy

The platform must feel like:

* Modern SaaS
* Enterprise ERP
* Automotive Workshop OS

Combined together.

Reference Inspiration:

* Linear
* Notion
* Salesforce
* Zoho One
* HubSpot
* Monday.com
* Odoo
* ServiceTitan

Avoid:

* Legacy ERP look
* Dense SAP style interfaces
* Excessive modal usage
* Mobile-first compromises

Primary target:

Desktop first

Secondary target:

Tablet

Mobile:

Responsive support only

---

# Core Navigation Architecture

Create a persistent application shell.

Layout:

LEFT SIDEBAR

TOP NAVIGATION BAR

MAIN CONTENT AREA

RIGHT CONTEXT PANEL (optional)

---

# Sidebar Structure

Dashboard

Customer Management

Vendor Management

Financial Management

Reporting

Admin

Super Admin

Feedback

Contact Us

Notifications

Logout

---

# Dashboard Design

Create multiple dashboard variants.

## Executive Dashboard

Widgets:

* Revenue Today
* Revenue MTD
* Revenue YTD
* Inquiry Funnel
* Appointment Funnel
* Conversion Funnel
* Open Job Cards
* Bay Utilization
* Technician Productivity
* Customer Satisfaction
* Outstanding Receivables

---

## Branch Dashboard

Widgets:

* Daily Revenue
* Active Job Cards
* Active Bays
* Pending Deliveries
* Appointment Schedule

---

## Service Advisor Dashboard

Widgets:

* Assigned Inquiries
* Today's Appointments
* Follow-Ups
* Pending Estimates

---

## Technician Dashboard

Widgets:

* Assigned Jobs
* Bay Status
* Work Queue
* QC Rejections

---

# Customer Management Module

This is the primary workflow engine.

Workflow:

Customer
↓
Inquiry
↓
Appointment
↓
Inspection
↓
Job Card
↓
Bay
↓
Estimate
↓
Invoice
↓
Payment

Design this entire lifecycle as a connected experience.

---

# Customer Master

Design:

Customer List

Customer Detail

Customer Creation

Customer Timeline

Customer 360 View

Customer Health Score

Vehicle History

Revenue History

Communication History

---

# Inquiry Management

Design:

Inquiry Dashboard

Inquiry Kanban

Inquiry Table

Inquiry Detail

Follow-Up Center

Escalation Center

Conversion Analytics

Visual Style:

Modern CRM

HubSpot-like

---

# Appointment Management

Design:

Calendar View

Agenda View

Workshop Capacity View

Appointment Detail

Appointment Timeline

Technician Allocation

---

# Inspection Module

Design:

Digital Inspection Sheet

Photo Upload

Video Upload

Checklist Builder

Inspection Report

PDF Export

Customer Approval

---

# Job Card Management

This is the operational heart of the system.

Design:

Job Card Board

Job Card Detail

Workflow Timeline

Technician Assignment

Service Checklist

Parts Consumption

Customer Communication

Vehicle Progress

Visual Style:

Linear + Jira hybrid

---

# Bay Management

Design:

Live Bay Board

Workshop Floor View

Technician Assignment

Capacity Management

Drag-and-Drop Scheduling

Live Status Indicators

---

# Billing Management

Design:

Estimate Builder

Estimate Approval

Invoice Builder

Tax Breakdown

Discount Engine

Payment Tracking

Outstanding Tracking

---

# Payment Management

Design:

Payment Collection

Payment Reconciliation

Outstanding Aging

Refund Tracking

Payment Timeline

---

# Inventory Consumption

Design:

Parts Consumption

Inventory Movement

Stock Reservations

Usage Analytics

---

# Vendor Management

Create complete procurement lifecycle.

Workflow:

Vendor
↓
Quotation
↓
Procurement
↓
Inventory
↓
Vendor Invoice
↓
Vendor Payment

---

# Vendor Master

Design:

Vendor List

Vendor Profile

Vendor History

Vendor Analytics

---

# Procurement

Design:

Purchase Requests

Purchase Orders

Goods Receipt

Procurement Dashboard

Approval Workflow

---

# Financial Management

Design as lightweight ERP.

Modules:

Contra

Payment

Receipt

Journal

Debit Note

Credit Note

Stock Journal

Design:

Ledger Views

Voucher Entry

Trial Balance

Profit & Loss

Balance Sheet

Cash Flow

---

# Reporting

Create modern reporting experience.

Design:

Report Catalog

Saved Reports

Scheduled Reports

Custom Reports

Export Center

Analytics Dashboards

---

# Admin Module

Design:

User Management

Role Management

Permissions

Templates

Branding

WhatsApp Setup

Dashboard Setup

System Setup

---

# Super Admin Module

Design:

Tenant Management

Tenant Provisioning

Subscription Management

Usage Analytics

Platform Monitoring

Communication Templates

Branding Templates

---

# Feedback Module

Design:

Suggestions

Feature Requests

Ratings

Customer Feedback

Workshop Feedback

---

# Contact Us

Design:

Support Tickets

Bug Reports

FAQ

Knowledge Base

Contact Directory

---

# Notification Center

Design a global notification hub.

Categories:

Workflow

Inquiry

Appointment

Job Card

Billing

System

Platform

---

# Multi-Tenant Requirements

All screens must support:

Tenant Context

Branch Context

Role Context

Permission Context

Design visible selectors for:

Tenant

Branch

Financial Year

---

# Design System Requirements

Create complete design system.

Include:

Typography

Color System

Spacing System

Grid System

Cards

Tables

Forms

Buttons

Badges

Tags

Status Indicators

Charts

Calendars

Kanban Components

Timeline Components

Workflow Components

Notification Components

Drawer Components

Modal Components

---

# Deliverables Required From Figma

1. Design System

2. Master Application Shell

3. Sidebar Navigation

4. Dashboard Suite

5. Customer Management Suite

6. Vendor Management Suite

7. Financial Management Suite

8. Reporting Suite

9. Admin Suite

10. Super Admin Suite

11. Responsive Variants

12. Component Library

13. Interaction Prototypes

14. Developer Handoff Assets

15. Route-to-Screen Mapping

16. Page Hierarchy Mapping

17. Workflow Journey Mapping

---

# Design Success Criteria

A new workshop owner should be able to:

Create Customer
→ Create Inquiry
→ Schedule Appointment
→ Perform Inspection
→ Create Job Card
→ Assign Bay
→ Generate Estimate
→ Generate Invoice
→ Receive Payment

without leaving the platform.

All designs should optimize for speed, operational visibility, and multi-branch scalability.

This document is the authoritative design brief for all future Shyntra UI work.
