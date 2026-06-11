# SHYNTRAA V2

# UI-5A REMEDIATION PACK v1.0

## RECHARTS KEY COLLISION + ADMINSUITE STABILIZATION AUTHORITY

### Status: MANDATORY EXECUTION BEFORE ANY FURTHER PHASE B OR PHASE C WORK

---

# 1. PURPOSE

This document authorizes and defines the remediation required to eliminate:

1. Recharts duplicate-key warnings
2. React reconciliation instability
3. Dashboard rendering inconsistencies
4. AdminSuite routing defects
5. AdminSuite TypeScript violations
6. DTF token non-compliance

No new functionality may be added during this execution.

This is a stabilization and compliance package only.

---

# 2. EXECUTION ORDER (FROZEN)

Execution must occur in the following order:

STEP 1 — DashboardSuite Recharts Audit
STEP 2 — DashboardSuite Key Collision Remediation
STEP 3 — Console Validation
STEP 4 — AdminSuite TypeScript Remediation
STEP 5 — AdminSuite Route Compliance
STEP 6 — AdminSuite DTF Compliance
STEP 7 — Final Validation Report

No deviation permitted.

---

# 3. DASHBOARDSUITE REMEDIATION

## UI-5A.1 Recharts Audit

Audit DashboardSuite.tsx for:

* BarChart
* LineChart
* AreaChart
* PieChart
* RadarChart
* ComposedChart

Audit all:

* Bar
* Line
* Area
* Pie
* Radar
* Cell

elements.

---

## UI-5A.2 Explicit Key Requirement

Every chart series must have a unique explicit key.

INVALID

<Line dataKey="revenue" />

VALID

<Line
key="executive-revenue"
dataKey="revenue"
/>

---

## UI-5A.3 Unique Series Names

No chart may contain duplicate:

* key
* name
* dataKey combinations

Example:

INVALID

Revenue
Revenue

VALID

Revenue
Forecast Revenue

or

exec-revenue
exec-forecast

---

## UI-5A.4 Cell Components

Every Cell component must contain a unique key.

INVALID

data.map(item => ( <Cell fill={item.color} />
))

VALID

data.map((item,index) => (
<Cell
key={`cell-${index}`}
fill={item.color}
/>
))

---

## UI-5A.5 Dashboard Lists

Audit all:

* KPI cards
* Insight cards
* Alert cards
* Activity feeds
* Notification feeds

Every mapped component must contain a stable key.

Preferred:

key={entity.id}

Not allowed:

key={index}

unless no unique identifier exists.

---

## UI-5A.6 Route Validation

Validate all 7 dashboard variants:

* Executive
* Branch
* Service Advisor
* Technician
* Finance
* Vendor
* Super Admin

All variants must render without:

* React warnings
* Console warnings
* Duplicate key warnings

---

# 4. ADMINSUITE REMEDIATION

## UI-5B.1 Export Signature

Replace:

{ section: AdminSection }

with:

{
section: AdminSection;
navigate: (r: ShyntraRoute) => void;
}

---

## UI-5B.2 Type Import

Add:

import type { ShyntraRoute } from "../ShyntraaApp";

---

## UI-5B.3 AdminSection Authority

AdminSection must contain ONLY:

admin.hub
admin.users
admin.roles
admin.permissions
admin.templates
admin.branding
admin.whatsapp
admin.settings

superadmin.hub
superadmin.tenants
superadmin.subscriptions
superadmin.feature-flags
superadmin.monitoring
superadmin.api-usage
superadmin.errors

---

## UI-5B.4 Remove Dead Routes

Remove:

notifications
feedback
contact
superadmin.platform

These routes are not registered in RCM v1.0.

---

# 5. REQUIRED ADMIN SCREENS

The following screens must exist:

SCR-057 AdminHub
SCR-058 UserManagement
SCR-059 RoleManagement
SCR-060 PermissionMatrix
SCR-061 TemplateManager
SCR-062 BrandingConfig
SCR-063 WhatsAppConfig
SCR-064 SystemSettings
SCR-065 SuperAdminHub
SCR-066 TenantManagement
SCR-067 SubscriptionManagement
SCR-068 FeatureFlags
SCR-069 PlatformMonitoring
SCR-070 APIUsage
SCR-071 ErrorLogs

No screen may share another screen's component.

Examples prohibited:

TemplateManager → BrandingConfig
SubscriptionManagement → TenantManagement

Each screen requires its own implementation.

---

# 6. DTF TOKEN COMPLIANCE

Replace all legacy AdminSuite tokens.

Mandatory values:

Background:
#0B1120

Surface:
#111827

Primary:
#00E5FF

AI:
#A3E635

Success:
#10B981

Warning:
#F59E0B

Danger:
#EF4444

Secondary:
#7C3AED

Primary Text:
#F9FAFB

Secondary Text:
#9CA3AF

Dim Text:
#374151

---

## Required Missing Tokens

Add:

--color-ai
--color-primary-dim
--color-surface-hover
--color-border-hover

All DTF gradients

All DTF page background overlays

---

# 7. PAGE BACKGROUND COMPLIANCE

All hubs and admin pages must include:

DTF PageBg Grid Overlay

Specification:

rgba(0,229,255,0.02)
32px grid

No exceptions.

---

# 8. HUB COMPLIANCE

AdminHub and SuperAdminHub must comply with PLAR J2.

Mandatory order:

1. Header
2. AI Strip
3. KPI Row
4. Widget Grid
5. Activity Feed
6. Alerts

Order is frozen.

---

# 9. VALIDATION REQUIREMENTS

The following must be demonstrated after remediation.

## Dashboard Validation

PASS criteria:

0 duplicate-key warnings

0 React warnings

0 Recharts warnings

All 7 dashboards render

---

## Admin Validation

PASS criteria:

15/15 screens implemented

15/15 routes mapped

0 TypeScript errors

0 route fall-throughs

0 unreachable screens

---

## Token Validation

PASS criteria:

100% DTF compliance

0 legacy token references

---

# 10. REQUIRED FINAL DELIVERABLE

Return a remediation report containing:

SECTION A — Recharts Audit Report

For every chart:

Dashboard
Chart Name
Chart Type
Series Count
Duplicate Keys Found
Resolution
PASS/FAIL

---

SECTION B — AdminSuite Compliance Report

15 screens
15 routes
TypeScript validation

PASS/FAIL

---

SECTION C — DTF Compliance Report

Token count
Legacy tokens removed
Missing tokens added

PASS/FAIL

---

SECTION D — Final Stability Report

React warnings: 0

Duplicate key warnings: 0

TypeScript errors: 0

Route violations: 0

DTF violations: 0

Status:

UI-5A REMEDIATION COMPLETE

Only after all sections PASS may the project proceed to the next implementation packet.
