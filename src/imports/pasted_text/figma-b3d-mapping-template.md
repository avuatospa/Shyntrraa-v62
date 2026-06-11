Below is a **Figma → B3d Mapping Template** designed specifically for your stack (Workspace Shell → Widgets → Projections → Actions → PCG).

---

# Figma → B3d Mapping Template (SHYNTRAA)

## 0. Core Principle

Every Figma frame must compile into this exact runtime contract:

```text id="compile-model"
Figma Frame
  → Widget
    → Projection(s)
      → Action(s) [optional]
        → Kernel Transition
          → PCG Validation
            → UI Re-render
```

If a frame cannot map cleanly to this chain → it is invalid for B3d.

---

# 1. File Structure in Figma

Create **1 page per workspace system**:

```text id="figma-structure"
Shyntraa Workspace (Job Card)
```

Inside it, create **6 frames only** (must match B3d widgets exactly):

---

## Required Frames (STRICT 1:1 mapping)

### 1. Customer Widget Frame

### 2. Vehicle Widget Frame

### 3. Services Widget Frame

### 4. Technician Widget Frame

### 5. Workflow Widget Frame

### 6. Payment Widget Frame

---

# 2. Frame Annotation Standard (CRITICAL)

Every frame MUST include this metadata block:

## HEADER BLOCK (top-left corner of frame)

```text id="frame-meta"
WIDGET: <widget-name>
PROJECTION: <projection-name>
MODE: READ_ONLY | ACTIONABLE
ACTIONS: <list or NONE>
```

---

# 3. Widget Mapping Rules (B3d aligned)

## 3.1 Customer Widget Frame

```text id="customer-map"
WIDGET: customer
PROJECTION: customer_projection
MODE: READ_ONLY
ACTIONS: NONE
```

---

## 3.2 Vehicle Widget Frame

```text id="vehicle-map"
WIDGET: vehicle
PROJECTION: vehicle_projection
MODE: READ_ONLY
ACTIONS: NONE
```

---

## 3.3 Services Widget Frame

```text id="services-map"
WIDGET: services
PROJECTION: services_projection
MODE: READ_ONLY (B3d)
ACTIONS: NONE (B3c semantics only)
```

⚠ Important:

* DO NOT show completion toggles as “active logic”
* Only display state derived from projection

---

## 3.4 Technician Widget Frame

```text id="tech-map"
WIDGET: technician
PROJECTION: assignment_projection + workload_projection
MODE: ACTIONABLE
ACTIONS:
  - start-work
```

---

## 3.5 Workflow Widget Frame

```text id="workflow-map"
WIDGET: workflow
PROJECTION: workflow_projection
MODE: ACTIONABLE
ACTIONS:
  - start-work
  - mark-qc
  - complete-job
```

---

## 3.6 Payment Widget Frame

```text id="payment-map"
WIDGET: payment
PROJECTION: financial_projection
MODE: READ_ONLY (B3d ONLY)
ACTIONS: NONE
```

⚠ Critical:

* NO mark-payment in B3d
* must remain display-only

---

# 4. Interaction Annotation System (VERY IMPORTANT)

Every clickable element must have this annotation:

```text id="interaction-spec"
UI ELEMENT → ACTION → RESULT STATE
```

---

## Example 1: Start Work Button

```text id="start-work-ui"
Button: "Start Work"
ACTION: start-work
INPUT: job_card_id
OUTPUT:
  - workflow_projection.status = IN_PROGRESS
  - invalidates: workflow + technician workload
```

---

## Example 2: QC Button

```text id="qc-ui"
Button: "Send to QC"
ACTION: mark-qc
INPUT: job_card_id
OUTPUT:
  - workflow_projection.status = QC_PENDING | QC_FAIL | QC_PASS
```

---

## Example 3: Complete Job

```text id="complete-ui"
Button: "Complete Job"
ACTION: complete-job
INPUT: job_card_id
OUTPUT:
  - workflow_projection.status = DELIVERED
```

---

# 5. State Design Rules (matches your PCG model)

Each widget MUST include 3 states:

## Required UI states

### 1. Idle

* projection loaded
* no mutation in progress

### 2. Pending Action

* idempotencyKey in-flight
* UI locked only for that widget (not global lock)

### 3. Error State

Must map explicitly to:

* AUTHZ_ERROR
* INVALID_STATE
* IDEMPOTENCY_CONFLICT

NO silent retries.

---

# 6. Projection Binding Rule (STRICT)

Every UI region must declare:

```text id="projection-bind"
THIS UI IS DERIVED FROM: <projection_name>
```

No derived UI logic outside projection.

---

# 7. Anti-Pattern Guardrails (DO NOT DO THIS IN FIGMA)

## ❌ Forbidden

* No workflow logic diagrams
* No database schema visuals
* No “state machine design inside UI”
* No payment flows with conditional logic
* No assignment auto-rules
* No cross-widget communication diagrams

---

# 8. B3d Compatibility Check (must pass before build)

Each frame must answer:

### A. Can I map this to exactly ONE widget?

* YES → valid
* NO → invalid

---

### B. Can every action map to one of B3b actions?

* YES → valid
* NO → move to B3c/B3e

---

### C. Does it avoid introducing new domain logic?

* YES → valid
* NO → reject

---

# 9. Final Compilation Rule

A Figma file is “B3d-ready” ONLY if:

```text id="compile-check"
Frames = 6 (exact)
Widgets = 6 (exact)
Actions = subset of B3b
Projections = canonical only
No hidden state logic
No business rules in UI
```

---

# 10. Recommended Workflow (IMPORTANT)

Use this flow:

```text id="workflow"
Figma design
   ↓
Annotate using template
   ↓
Validate against B3d rules
   ↓
Only then implement in Lovable
```

---

# Final Note (important for your architecture)

At your current stage, Figma is not “design”.

It is:

```text id="truth-contract-ui"
a pre-runtime contract validator for B3d
```

If you treat it that way, it will *prevent architectural drift instead of introducing it*.

---

If you want next, I can also give you a **“Figma → widget code skeleton generator mapping”** so Lovable implementation becomes almost mechanical (no interpretation ambiguity at all).