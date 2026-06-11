# DASHBOARDSUITE RECHARTS DUPLICATE KEY REMEDIATION

## EXECUTION LOCKED PROTOCOL V1

### Purpose

Resolve the React warning:

```
Warning: Encountered two children with the same key 'null'
```

without introducing any new functionality, refactors, instrumentation, architectural changes, dependency upgrades, styling changes, or unrelated code modifications.

---

# EXECUTION CONSTRAINTS

## Allowed Scope

Only modify Recharts child elements inside DashboardSuite.tsx.

Allowed targets:

* AreaChart
* BarChart
* LineChart

within:

* ExecutiveDashboard
* FinanceDashboard
* VendorDashboard
* SuperAdminDashboard

---

## Forbidden Actions

Do NOT:

* add instrumentation
* add console logging
* add forensic overlays
* add runtime interceptors
* add React patches
* add monkey patches
* add wrappers
* add providers
* add hooks
* add memoization
* add state
* add effects
* change chart data
* change chart layout
* change styling
* change imports
* change exports
* upgrade libraries
* modify any file other than DashboardSuite.tsx
* perform cleanup not required by this protocol
* make assumptions beyond evidence

Any action not explicitly authorized below is prohibited.

---

# EVIDENCE BASELINE

Static audit found:

Charts present:

1. ExecutiveDashboard AreaChart
2. FinanceDashboard AreaChart
3. FinanceDashboard BarChart
4. VendorDashboard BarChart
5. SuperAdminDashboard LineChart
6. SuperAdminDashboard BarChart

All charts contain multiple child components without explicit keys.

Examples:

```
<CartesianGrid />
<XAxis />
<YAxis />
<Tooltip />
```

These are the highest probability source of duplicate key "null".

Data sources have been audited and are NOT the source.

Series with explicit keys are NOT the source.

No other root cause has been proven.

---

# PHASE 1

## Objective

Assign explicit stable keys to every Recharts child element.

No other changes.

---

## Required Changes

Every chart child must receive a unique literal string key.

Example pattern:

```
<CartesianGrid key="exec-grid" />
<XAxis key="exec-x-axis" />
<YAxis key="exec-y-axis" />
<Tooltip key="exec-tooltip" />
```

Series must also have explicit keys.

Examples:

```
<Bar key="finance-aging-bar" />
<Line key="tenant-growth-line" />
<Bar key="api-volume-bar" />
```

Keys must be:

* literal strings
* unique within chart
* non-generated
* non-computed

No expressions.

No variables.

No template strings.

---

## Entry Criteria

Must be true before Phase 1 begins:

* DashboardSuite.tsx compiles
* Existing warning reproduced
* No instrumentation active
* No temporary forensic code active

---

## Exit Criteria

Must ALL be true:

* Every Recharts child has explicit key
* No compilation errors
* No TypeScript errors introduced
* No lint errors introduced
* No visual chart regressions
* No new warnings introduced

Stop.

Run preview.

Do not proceed to any additional changes.

---

# PHASE 1 DECISION GATE

If warning disappears:

STATUS = ROOT CAUSE CONFIRMED

Protocol complete.

Stop all work.

No further modifications allowed.

---

If warning remains:

Proceed to Phase 2.

---

# PHASE 2

## Objective

Identify offending chart.

No fixes.

No refactors.

Isolation only.

---

## Authorized Action

Render only ExecutiveDashboard.

Disable rendering of:

* FinanceDashboard
* VendorDashboard
* SuperAdminDashboard

Do not delete code.

Do not alter chart contents.

Only isolate rendering.

---

## Entry Criteria

Phase 1 completed.

Warning still exists.

---

## Exit Criteria

One of the following outcomes must be observed:

Outcome A:

Warning disappears.

Meaning:

Problem exists in one of the disabled dashboards.

Proceed to Phase 3.

Outcome B:

Warning remains.

Meaning:

Problem exists in ExecutiveDashboard.

Proceed to Phase 4.

No other conclusions permitted.

---

# PHASE 3

## Objective

Identify which dashboard contains offending chart.

---

## Authorized Action

Re-enable dashboards one at a time.

Order:

1. FinanceDashboard
2. VendorDashboard
3. SuperAdminDashboard

After each enable:

* compile
* render
* observe warning

No other changes.

---

## Exit Criteria

Dashboard identified.

Stop immediately.

Proceed to Phase 5.

---

# PHASE 4

## Objective

Identify offending chart inside ExecutiveDashboard.

---

## Authorized Action

Disable ExecutiveDashboard charts one at a time.

Observe warning after each change.

No fixes.

No modifications to chart internals.

---

## Exit Criteria

Single chart identified.

Proceed to Phase 5.

---

# PHASE 5

## Objective

Identify offending child component.

---

## Authorized Action

Reduce identified chart to minimum structure.

Example:

```
<AreaChart>
   <Area />
</AreaChart>
```

Then reintroduce components one at a time:

1. Tooltip
2. XAxis
3. YAxis
4. CartesianGrid

Observe warning after each step.

---

## Exit Criteria

Single child component identified as trigger.

Document evidence.

Stop.

Do not apply speculative fixes.

Do not continue.

---

# REQUIRED REPORTING FORMAT

At completion provide:

1. Phase executed
2. Entry criteria verification
3. Exact modifications performed
4. Exit criteria verification
5. Warning status:

   * Present
   * Not Present
6. Evidence supporting conclusion

No opinions.

No assumptions.

No speculative root causes.

Only observed evidence.

---

# TERMINATION CONDITIONS

Immediately stop execution if:

* TypeScript errors appear
* New React warnings appear
* Build fails
* Any change outside authorized scope becomes necessary

Report blocker.

Do not self-correct.

Do not invent additional phases.

Do not continue beyond protocol.
