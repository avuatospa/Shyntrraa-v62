import { useState, useCallback } from "react";
import { motion } from "motion/react";
import { toast } from "sonner";
import {
  User,
  Car,
  Sparkles,
  CreditCard,
  Loader2,
  X,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Shield,
  Phone,
  Mail,
  Hash,
  Calendar,
  Gauge,
  ArrowRight,
  Users,
  BarChart3,
  Wrench,
  Check,
  RefreshCw,
  Package,
  ChevronRight,
  BadgeCheck,
  Zap,
  XCircle,
} from "lucide-react";

// ── Types ─────────────────────────────────────────────────────────────
type WorkflowStatus =
  | "PENDING"
  | "IN_PROGRESS"
  | "QC_PENDING"
  | "QC_FAIL"
  | "QC_PASS"
  | "DELIVERED";

type LoadState = "idle" | "pending" | "error";
type ErrorCode = "AUTHZ_ERROR" | "INVALID_STATE" | "IDEMPOTENCY_CONFLICT";

interface WidgetState {
  load: LoadState;
  error?: { code: ErrorCode; message: string };
}

type WidgetKey =
  | "customer"
  | "vehicle"
  | "services"
  | "technician"
  | "workflow"
  | "payment";

// ── Error messages ────────────────────────────────────────────────────
const ERROR_MESSAGES: Record<ErrorCode, string> = {
  AUTHZ_ERROR: "You are not authorized to perform this action on this job card.",
  INVALID_STATE:
    "This action cannot be executed in the current workflow state.",
  IDEMPOTENCY_CONFLICT:
    "A conflicting request is already in-flight. Do not retry automatically.",
};

// ── Projection data (mock) ────────────────────────────────────────────
const CUSTOMER_PROJECTION = {
  id: "CUST-0142",
  name: "Aria Chen",
  phone: "+1 555 0566",
  email: "aria.chen@gmail.com",
  tier: "PLATINUM" as const,
  totalJobs: 7,
  memberSince: "2023-07-01",
};

const VEHICLE_PROJECTION = {
  id: "VEH-0219",
  make: "Porsche",
  model: "Cayenne",
  year: 2024,
  plate: "PCH 0024",
  color: "Jet Black Metallic",
  odometer: 8240,
  vin: "WP1AA2AY4NDA28841",
  lastService: "Factory delivery",
};

const SERVICES_PROJECTION = [
  {
    id: "SVC-001",
    name: "Paint Correction (Stage 3)",
    sku: "PC-S3",
    price: 420,
  },
  {
    id: "SVC-002",
    name: "Ceramic Coating (Pro Grade)",
    sku: "CC-PRO",
    price: 680,
  },
  {
    id: "SVC-003",
    name: "Full Interior Detail",
    sku: "INT-FULL",
    price: 185,
  },
  {
    id: "SVC-004",
    name: "Engine Bay Clean",
    sku: "ENG-CLN",
    price: 95,
  },
];

const ASSIGNMENT_PROJECTION = {
  techId: "TECH-008",
  name: "Sam Ortega",
  role: "Master Detailer",
  initials: "SO",
  currentJobs: 1,
  capacity: 3,
  specializations: ["Ceramic Coating", "Paint Correction", "PPF"],
  assignedAt: "2026-05-22T14:00:00",
};

const WORKLOAD_PROJECTION = {
  todayJobs: 2,
  completedToday: 1,
  hoursLogged: 4.5,
};

const FINANCIAL_PROJECTION = {
  subtotal: 1380.0,
  tax: 124.2,
  discount: 138.0,
  total: 1366.2,
  currency: "USD",
  paymentStatus: "UNPAID" as const,
};

const JOB_META = {
  id: "JOB-240523-035",
  ref: "REF-0035",
  source: "INQ-0035",
  createdAt: "2026-05-22T14:00:00",
  scheduledAt: "2026-05-29T09:00:00",
  priority: "HIGH" as const,
  tenant: "Primus Detailing Studio",
};

// ── Helpers ───────────────────────────────────────────────────────────
function getServiceStatus(
  workflowStatus: WorkflowStatus,
  idx: number
): "QUEUED" | "IN_PROGRESS" | "COMPLETED" {
  if (workflowStatus === "PENDING") return "QUEUED";
  if (workflowStatus === "DELIVERED" || workflowStatus === "QC_PASS") return "COMPLETED";
  if (workflowStatus === "IN_PROGRESS") return idx === 0 ? "IN_PROGRESS" : "QUEUED";
  if (workflowStatus === "QC_PENDING" || workflowStatus === "QC_FAIL")
    return idx <= 1 ? "COMPLETED" : idx === 2 ? "IN_PROGRESS" : "QUEUED";
  return "QUEUED";
}

function stageIndex(status: WorkflowStatus): number {
  if (status === "PENDING") return 0;
  if (status === "IN_PROGRESS") return 1;
  if (status === "QC_PENDING" || status === "QC_FAIL" || status === "QC_PASS") return 2;
  if (status === "DELIVERED") return 3;
  return 0;
}

const fmt = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

// ── Widget Shell ──────────────────────────────────────────────────────
function WidgetShell({
  widget,
  projection,
  mode,
  actions,
  state,
  onClearError,
  children,
}: {
  widget: string;
  projection: string;
  mode: "READ_ONLY" | "ACTIONABLE";
  actions?: string[];
  state: WidgetState;
  onClearError: () => void;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`bg-card rounded-xl overflow-hidden border transition-all duration-300 ${
        state.load === "error"
          ? "border-red-500/40"
          : state.load === "pending"
          ? "border-amber-400/30"
          : "border-border"
      }`}
    >
      {/* B3d meta header */}
      <div className="px-4 py-2 border-b border-white/[0.05] flex items-center justify-between gap-3 bg-white/[0.018]">
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-[9px] font-mono text-white/20 flex-shrink-0">WIDGET</span>
          <span className="text-[10px] font-bold text-white/55 uppercase tracking-widest truncate">
            {widget}
          </span>
          {state.load === "pending" && (
            <span className="flex items-center gap-1 text-[9px] font-mono text-amber-400/80 animate-pulse flex-shrink-0">
              <Loader2 size={8} className="animate-spin" />
              PENDING ACTION
            </span>
          )}
        </div>
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <span className="text-[9px] font-mono text-white/15 hidden lg:inline truncate max-w-[180px]">
            {projection}
          </span>
          {actions && actions.length > 0 && (
            <span className="text-[9px] font-mono text-white/15 hidden lg:inline">
              · {actions.join(" | ")}
            </span>
          )}
          <span
            className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider flex-shrink-0 ${
              mode === "ACTIONABLE"
                ? "bg-amber-400/15 text-amber-400/80"
                : "bg-white/[0.04] text-white/25"
            }`}
          >
            {mode === "ACTIONABLE" ? "ACTIONABLE" : "READ ONLY"}
          </span>
        </div>
      </div>

      {/* Content with pending dimming */}
      <div
        className={`relative transition-opacity duration-200 ${
          state.load === "pending" ? "opacity-40 pointer-events-none select-none" : ""
        }`}
      >
        {children}
      </div>

      {/* Error panel */}
      {state.load === "error" && state.error && (
        <div className="px-4 py-3 bg-red-500/8 border-t border-red-500/20">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <AlertTriangle size={11} className="text-red-400 flex-shrink-0" />
                <span className="text-[10px] font-mono font-bold text-red-400">
                  {state.error.code}
                </span>
              </div>
              <p className="text-[11px] text-red-400/70 leading-snug">
                {state.error.message}
              </p>
              <p className="text-[10px] font-mono text-red-400/30 mt-1.5">
                PCG_VALIDATION_FAILED · NO_AUTO_RETRY
              </p>
            </div>
            <button
              onClick={onClearError}
              className="text-white/20 hover:text-white/50 transition-colors flex-shrink-0 mt-0.5"
            >
              <X size={12} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Widget: Customer ──────────────────────────────────────────────────
function CustomerWidget({
  state,
  onClear,
}: {
  state: WidgetState;
  onClear: () => void;
}) {
  const c = CUSTOMER_PROJECTION;
  const tierCfg = {
    STANDARD: { label: "Standard", color: "text-slate-400 bg-slate-400/10" },
    SILVER: { label: "Silver", color: "text-slate-300 bg-slate-300/10 border border-slate-300/20" },
    GOLD: { label: "Gold", color: "text-amber-400 bg-amber-400/10" },
    PLATINUM: {
      label: "Platinum",
      color: "text-purple-400 bg-purple-400/10 border border-purple-400/20",
    },
  };
  const tc = tierCfg[c.tier];

  return (
    <WidgetShell
      widget="CUSTOMER"
      projection="customer_projection"
      mode="READ_ONLY"
      state={state}
      onClearError={onClear}
    >
      <div className="p-4">
        <p className="text-[9px] font-mono text-white/15 mb-3">
          DERIVED FROM: customer_projection
        </p>
        <div className="flex items-start gap-3">
          <div className="w-11 h-11 rounded-full bg-purple-400/15 border border-purple-400/20 flex items-center justify-center flex-shrink-0">
            <span className="text-sm font-bold text-purple-400">
              {c.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-0.5">
              <span className="font-semibold text-white text-sm">{c.name}</span>
              <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase ${tc.color}`}>
                {tc.label}
              </span>
            </div>
            <div className="space-y-1 mt-1.5">
              <span className="flex items-center gap-1.5 text-xs text-white/40">
                <Phone size={9} className="text-white/20 flex-shrink-0" />
                {c.phone}
              </span>
              <span className="flex items-center gap-1.5 text-xs text-white/40 truncate">
                <Mail size={9} className="text-white/20 flex-shrink-0" />
                {c.email}
              </span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-white/[0.05]">
          <div className="bg-white/[0.025] rounded-lg p-2.5 text-center">
            <div className="text-xl font-bold text-white font-display">{c.totalJobs}</div>
            <div className="text-[9px] text-white/25 uppercase tracking-wider mt-0.5">
              Total Jobs
            </div>
          </div>
          <div className="bg-white/[0.025] rounded-lg p-2.5 text-center">
            <div className="text-xl font-bold text-white font-display">
              {new Date(c.memberSince).getFullYear()}
            </div>
            <div className="text-[9px] text-white/25 uppercase tracking-wider mt-0.5">
              Member Since
            </div>
          </div>
        </div>
      </div>
    </WidgetShell>
  );
}

// ── Widget: Vehicle ───────────────────────────────────────────────────
function VehicleWidget({
  state,
  onClear,
}: {
  state: WidgetState;
  onClear: () => void;
}) {
  const v = VEHICLE_PROJECTION;
  return (
    <WidgetShell
      widget="VEHICLE"
      projection="vehicle_projection"
      mode="READ_ONLY"
      state={state}
      onClearError={onClear}
    >
      <div className="p-4">
        <p className="text-[9px] font-mono text-white/15 mb-3">
          DERIVED FROM: vehicle_projection
        </p>
        <div className="flex items-start justify-between gap-3 mb-3">
          <div>
            <div className="text-lg font-bold text-white font-display leading-none">
              {v.make} {v.model}
            </div>
            <div className="text-xs text-white/40 mt-0.5">{v.year}</div>
          </div>
          <div className="text-right">
            <div className="font-mono text-sm font-bold text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-lg border border-amber-400/20">
              {v.plate}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {[
            { label: "Color", value: v.color, icon: <span className="w-2 h-2 rounded-full bg-slate-700 border border-white/20 inline-block" /> },
            {
              label: "Odometer",
              value: `${v.odometer.toLocaleString()} km`,
              icon: <Gauge size={9} className="text-white/25" />,
            },
            {
              label: "VIN",
              value: v.vin.slice(0, 10) + "…",
              icon: <Hash size={9} className="text-white/25" />,
            },
            {
              label: "Last Service",
              value: v.lastService,
              icon: <Calendar size={9} className="text-white/25" />,
            },
          ].map((row) => (
            <div key={row.label} className="bg-white/[0.025] rounded-lg px-3 py-2">
              <div className="flex items-center gap-1 mb-0.5">
                {row.icon}
                <span className="text-[9px] text-white/25 uppercase tracking-wider">
                  {row.label}
                </span>
              </div>
              <div className="text-xs text-white/70 font-mono truncate">{row.value}</div>
            </div>
          ))}
        </div>
      </div>
    </WidgetShell>
  );
}

// ── Widget: Services ──────────────────────────────────────────────────
function ServicesWidget({
  workflowStatus,
  state,
  onClear,
}: {
  workflowStatus: WorkflowStatus;
  state: WidgetState;
  onClear: () => void;
}) {
  const statusCfg = {
    QUEUED: {
      label: "Queued",
      color: "text-white/30 bg-white/5",
      dot: "bg-white/20",
    },
    IN_PROGRESS: {
      label: "In Progress",
      color: "text-orange-400 bg-orange-400/10",
      dot: "bg-orange-400",
    },
    COMPLETED: {
      label: "Completed",
      color: "text-green-400 bg-green-400/10",
      dot: "bg-green-400",
    },
  };

  return (
    <WidgetShell
      widget="SERVICES"
      projection="services_projection"
      mode="READ_ONLY"
      state={state}
      onClearError={onClear}
    >
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <p className="text-[9px] font-mono text-white/15">
            DERIVED FROM: services_projection
          </p>
          <span className="text-[9px] font-mono text-white/20 bg-white/[0.04] px-1.5 py-0.5 rounded">
            B3c DISPLAY ONLY
          </span>
        </div>
        <div className="space-y-2">
          {SERVICES_PROJECTION.map((svc, idx) => {
            const s = getServiceStatus(workflowStatus, idx);
            const cfg = statusCfg[s];
            return (
              <div
                key={svc.id}
                className="flex items-center justify-between gap-3 px-3 py-2.5 bg-white/[0.025] rounded-lg border border-white/[0.04]"
              >
                <div className="flex items-center gap-2.5 flex-1 min-w-0">
                  <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${cfg.dot}`} />
                  <div className="min-w-0">
                    <div className="text-xs font-medium text-white/80 truncate">{svc.name}</div>
                    <div className="text-[10px] font-mono text-white/25 mt-0.5">{svc.sku}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className={`text-[9px] px-1.5 py-0.5 rounded font-semibold uppercase ${cfg.color}`}>
                    {cfg.label}
                  </span>
                  <span className="text-xs font-mono text-white/50">{fmt.format(svc.price)}</span>
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/[0.05]">
          <span className="text-[10px] text-white/25">
            {SERVICES_PROJECTION.length} service{SERVICES_PROJECTION.length !== 1 ? "s" : ""}
          </span>
          <span className="text-xs font-mono font-bold text-white/60">
            {fmt.format(SERVICES_PROJECTION.reduce((a, s) => a + s.price, 0))}
          </span>
        </div>
      </div>
    </WidgetShell>
  );
}

// ── Widget: Technician ────────────────────────────────────────────────
function TechnicianWidget({
  workflowStatus,
  state,
  onClear,
  onStartWork,
}: {
  workflowStatus: WorkflowStatus;
  state: WidgetState;
  onClear: () => void;
  onStartWork: () => void;
}) {
  const a = ASSIGNMENT_PROJECTION;
  const w = WORKLOAD_PROJECTION;
  const workloadPct = Math.round((a.currentJobs / a.capacity) * 100);
  const canStart = workflowStatus === "PENDING";

  return (
    <WidgetShell
      widget="TECHNICIAN"
      projection="assignment_projection + workload_projection"
      mode="ACTIONABLE"
      actions={["start-work"]}
      state={state}
      onClearError={onClear}
    >
      <div className="p-4 space-y-4">
        <p className="text-[9px] font-mono text-white/15">
          DERIVED FROM: assignment_projection · workload_projection
        </p>

        {/* Tech profile */}
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-amber-400/15 border border-amber-400/20 flex items-center justify-center flex-shrink-0">
            <span className="text-sm font-bold text-amber-400">{a.initials}</span>
          </div>
          <div>
            <div className="font-semibold text-white text-sm">{a.name}</div>
            <div className="text-[11px] text-white/40">{a.role}</div>
            <div className="text-[10px] font-mono text-white/20 mt-0.5">{a.techId}</div>
          </div>
        </div>

        {/* Workload */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] text-white/30 uppercase tracking-wider">
              Workload
            </span>
            <span className="text-[10px] font-mono text-white/50">
              {a.currentJobs} / {a.capacity} jobs
            </span>
          </div>
          <div className="h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
            <div
              className="h-full bg-amber-400 rounded-full transition-all duration-500"
              style={{ width: `${workloadPct}%` }}
            />
          </div>
          <div className="flex items-center gap-3 mt-2">
            <span className="text-[10px] text-white/25">
              {w.completedToday} completed today
            </span>
            <span className="text-[10px] text-white/25">
              {w.hoursLogged}h logged
            </span>
          </div>
        </div>

        {/* Specializations */}
        <div>
          <span className="text-[9px] text-white/25 uppercase tracking-wider block mb-1.5">
            Specializations
          </span>
          <div className="flex flex-wrap gap-1">
            {a.specializations.map((s) => (
              <span
                key={s}
                className="text-[10px] px-2 py-0.5 bg-white/[0.04] border border-white/[0.07] rounded text-white/50"
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* Action: start-work */}
        {canStart ? (
          <button
            onClick={onStartWork}
            className="w-full flex items-center justify-center gap-2 py-2.5 bg-amber-400 hover:bg-amber-300 active:bg-amber-500 text-black font-bold rounded-lg transition-colors text-sm font-display tracking-wide"
          >
            <Zap size={14} />
            Assign &amp; Start Work
          </button>
        ) : (
          <div className="flex items-center gap-2 py-2 px-3 bg-white/[0.03] border border-white/[0.07] rounded-lg">
            <span
              className={`w-2 h-2 rounded-full flex-shrink-0 ${
                workflowStatus === "DELIVERED"
                  ? "bg-green-400"
                  : "bg-amber-400"
              }`}
            />
            <span className="text-xs text-white/40 font-medium">
              {workflowStatus === "DELIVERED"
                ? "Job delivered"
                : `Tech assigned · ${workflowStatus.replace("_", " ")}`}
            </span>
          </div>
        )}
      </div>
    </WidgetShell>
  );
}

// ── Widget: Workflow ──────────────────────────────────────────────────
const PIPELINE_STAGES = [
  { key: "PENDING", label: "Pending", icon: Clock },
  { key: "IN_PROGRESS", label: "In Progress", icon: Wrench },
  { key: "QC", label: "Quality Check", icon: Shield },
  { key: "DELIVERED", label: "Delivered", icon: BadgeCheck },
];

const STATUS_LABELS: Record<WorkflowStatus, { label: string; color: string }> = {
  PENDING: { label: "PENDING", color: "text-white/40 bg-white/5" },
  IN_PROGRESS: { label: "IN PROGRESS", color: "text-orange-400 bg-orange-400/10" },
  QC_PENDING: { label: "QC PENDING", color: "text-yellow-400 bg-yellow-400/10" },
  QC_FAIL: { label: "QC FAILED", color: "text-red-400 bg-red-400/10" },
  QC_PASS: { label: "QC PASSED", color: "text-green-400 bg-green-400/10" },
  DELIVERED: { label: "DELIVERED", color: "text-green-400 bg-green-400/10" },
};

function WorkflowWidget({
  workflowStatus,
  state,
  onClear,
  onStartWork,
  onMarkQC,
  onCompleteJob,
  onRework,
}: {
  workflowStatus: WorkflowStatus;
  state: WidgetState;
  onClear: () => void;
  onStartWork: () => void;
  onMarkQC: () => void;
  onCompleteJob: () => void;
  onRework: () => void;
}) {
  const currentStage = stageIndex(workflowStatus);
  const sc = STATUS_LABELS[workflowStatus];

  return (
    <WidgetShell
      widget="WORKFLOW"
      projection="workflow_projection"
      mode="ACTIONABLE"
      actions={["start-work", "mark-qc", "complete-job"]}
      state={state}
      onClearError={onClear}
    >
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <p className="text-[9px] font-mono text-white/15">
            DERIVED FROM: workflow_projection
          </p>
          <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded uppercase ${sc.color}`}>
            {sc.label}
          </span>
        </div>

        {/* Pipeline visualization */}
        <div className="flex items-center gap-0 mb-6 overflow-x-auto pb-1">
          {PIPELINE_STAGES.map((stage, idx) => {
            const isComplete = idx < currentStage;
            const isActive = idx === currentStage;
            const isQCFail = stage.key === "QC" && workflowStatus === "QC_FAIL";
            const isQCPass = stage.key === "QC" && workflowStatus === "QC_PASS";
            const Icon = stage.icon;

            return (
              <div key={stage.key} className="flex items-center flex-1 min-w-0">
                <div className="flex flex-col items-center gap-1.5 flex-shrink-0 px-1">
                  <div
                    className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-500 ${
                      isQCFail
                        ? "border-red-500/50 bg-red-500/15"
                        : isQCPass || isComplete
                        ? "border-green-400/60 bg-green-400/15"
                        : isActive
                        ? "border-amber-400 bg-amber-400/15 shadow-amber-400/20 shadow-md"
                        : "border-white/10 bg-white/[0.03]"
                    }`}
                  >
                    {isComplete || isQCPass ? (
                      <Check
                        size={14}
                        className="text-green-400"
                        strokeWidth={2.5}
                      />
                    ) : isQCFail ? (
                      <XCircle size={14} className="text-red-400" />
                    ) : (
                      <Icon
                        size={13}
                        className={
                          isActive
                            ? "text-amber-400"
                            : "text-white/20"
                        }
                      />
                    )}
                  </div>
                  <span
                    className={`text-[9px] font-semibold uppercase tracking-wider whitespace-nowrap ${
                      isQCFail
                        ? "text-red-400"
                        : isQCPass || isComplete
                        ? "text-green-400/70"
                        : isActive
                        ? "text-amber-400"
                        : "text-white/20"
                    }`}
                  >
                    {stage.key === "QC" && workflowStatus === "QC_FAIL"
                      ? "QC FAIL"
                      : stage.key === "QC" && workflowStatus === "QC_PASS"
                      ? "QC PASS"
                      : stage.label}
                  </span>
                </div>
                {idx < PIPELINE_STAGES.length - 1 && (
                  <div className="flex-1 h-px mx-1 min-w-[12px]">
                    <div
                      className={`h-full transition-all duration-500 ${
                        isComplete ? "bg-green-400/40" : "bg-white/[0.06]"
                      }`}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Action buttons */}
        <div className="flex flex-col gap-2">
          {workflowStatus === "PENDING" && (
            <button
              onClick={onStartWork}
              className="w-full flex items-center justify-center gap-2 py-2.5 bg-amber-400 hover:bg-amber-300 text-black font-bold rounded-lg text-sm font-display tracking-wide transition-colors"
            >
              <Zap size={14} />
              <span>Start Work</span>
              <span className="text-[10px] font-mono opacity-50 ml-1">ACTION: start-work</span>
            </button>
          )}

          {workflowStatus === "IN_PROGRESS" && (
            <button
              onClick={onMarkQC}
              className="w-full flex items-center justify-center gap-2 py-2.5 bg-blue-500 hover:bg-blue-400 text-white font-bold rounded-lg text-sm font-display tracking-wide transition-colors"
            >
              <Shield size={14} />
              <span>Send to Quality Check</span>
              <span className="text-[10px] font-mono opacity-50 ml-1">ACTION: mark-qc</span>
            </button>
          )}

          {workflowStatus === "QC_PENDING" && (
            <div className="flex items-center justify-center gap-2 py-2.5 bg-yellow-400/10 border border-yellow-400/20 rounded-lg">
              <Loader2 size={13} className="animate-spin text-yellow-400" />
              <span className="text-sm text-yellow-400 font-semibold">
                PCG Validating QC result…
              </span>
            </div>
          )}

          {workflowStatus === "QC_FAIL" && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 px-3 py-2 bg-red-500/8 border border-red-500/20 rounded-lg">
                <XCircle size={13} className="text-red-400 flex-shrink-0" />
                <span className="text-[11px] text-red-400/80">
                  Quality check failed. Rework required before re-inspection.
                </span>
              </div>
              <button
                onClick={onRework}
                className="w-full flex items-center justify-center gap-2 py-2.5 bg-white/[0.06] hover:bg-white/[0.09] border border-white/10 text-white/70 font-semibold rounded-lg text-sm transition-colors"
              >
                <RefreshCw size={13} />
                Mark for Rework
              </button>
            </div>
          )}

          {workflowStatus === "QC_PASS" && (
            <button
              onClick={onCompleteJob}
              className="w-full flex items-center justify-center gap-2 py-2.5 bg-green-500 hover:bg-green-400 text-white font-bold rounded-lg text-sm font-display tracking-wide transition-colors"
            >
              <CheckCircle2 size={14} />
              <span>Complete Job</span>
              <span className="text-[10px] font-mono opacity-50 ml-1">ACTION: complete-job</span>
            </button>
          )}

          {workflowStatus === "DELIVERED" && (
            <div className="flex items-center justify-center gap-2 py-2.5 bg-green-400/10 border border-green-400/20 rounded-lg">
              <BadgeCheck size={14} className="text-green-400" />
              <span className="text-sm text-green-400 font-semibold font-display tracking-wide">
                Job Delivered — All Actions Complete
              </span>
            </div>
          )}
        </div>

        {/* Kernel chain display */}
        <div className="mt-3 pt-3 border-t border-white/[0.05]">
          <div className="flex items-center gap-1.5 flex-wrap">
            {[
              "Widget",
              "Projection",
              "Action",
              "Kernel Transition",
              "PCG Validation",
              "UI Re-render",
            ].map((step, i, arr) => (
              <div key={step} className="flex items-center gap-1">
                <span className="text-[9px] font-mono text-white/20">{step}</span>
                {i < arr.length - 1 && (
                  <ChevronRight size={8} className="text-white/10" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </WidgetShell>
  );
}

// ── Widget: Payment ───────────────────────────────────────────────────
function PaymentWidget({
  state,
  onClear,
}: {
  state: WidgetState;
  onClear: () => void;
}) {
  const f = FINANCIAL_PROJECTION;
  const statusCfg = {
    UNPAID: { label: "Unpaid", color: "text-red-400 bg-red-400/10 border border-red-400/20" },
    PARTIAL: {
      label: "Partial",
      color: "text-yellow-400 bg-yellow-400/10 border border-yellow-400/20",
    },
    PAID: {
      label: "Paid",
      color: "text-green-400 bg-green-400/10 border border-green-400/20",
    },
  };
  const sc = statusCfg[f.paymentStatus];

  return (
    <WidgetShell
      widget="PAYMENT"
      projection="financial_projection"
      mode="READ_ONLY"
      state={state}
      onClearError={onClear}
    >
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <p className="text-[9px] font-mono text-white/15">
            DERIVED FROM: financial_projection
          </p>
          <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase ${sc.color}`}>
            {sc.label}
          </span>
        </div>

        <div className="space-y-2 mb-3">
          {[
            { label: "Subtotal", value: f.subtotal, muted: true },
            { label: "Tax (9%)", value: f.tax, muted: true },
            {
              label: "Discount (10%)",
              value: -f.discount,
              muted: true,
              accent: f.discount > 0 ? "text-green-400" : undefined,
            },
          ].map((row) => (
            <div key={row.label} className="flex items-center justify-between">
              <span className="text-xs text-white/35">{row.label}</span>
              <span
                className={`text-xs font-mono ${
                  row.accent ? row.accent : "text-white/50"
                }`}
              >
                {row.value < 0
                  ? `−${fmt.format(-row.value)}`
                  : fmt.format(row.value)}
              </span>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-white/[0.07]">
          <span className="text-sm font-bold text-white">Total</span>
          <span className="text-lg font-bold text-white font-display font-mono">
            {fmt.format(f.total)}
          </span>
        </div>

        {/* B3d constraint notice */}
        <div className="mt-3 flex items-center gap-1.5 px-2.5 py-1.5 bg-white/[0.025] rounded-lg border border-white/[0.05]">
          <Shield size={9} className="text-white/20 flex-shrink-0" />
          <span className="text-[9px] font-mono text-white/20">
            B3d · NO mark-payment · DISPLAY ONLY
          </span>
        </div>
      </div>
    </WidgetShell>
  );
}

// ── Job Card Header ───────────────────────────────────────────────────
function JobCardHeader({ workflowStatus }: { workflowStatus: WorkflowStatus }) {
  const sc = STATUS_LABELS[workflowStatus];
  const priorityCfg = {
    HIGH: "text-red-400 bg-red-400/10 border border-red-400/20",
    MEDIUM: "text-amber-400 bg-amber-400/10 border border-amber-400/20",
    LOW: "text-slate-400 bg-slate-400/10 border border-slate-400/20",
  };

  return (
    <div className="bg-card border border-border rounded-xl p-4 mb-5">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono text-white/25">JOB CARD</span>
            <span className="text-[10px] font-mono text-white/20">·</span>
            <span className="text-[10px] font-mono text-white/40">{JOB_META.tenant}</span>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-xl font-bold text-white font-display tracking-wide">
              {JOB_META.id}
            </h1>
            <span
              className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase ${sc.color}`}
            >
              {sc.label}
            </span>
            <span
              className={`text-[10px] px-1.5 py-0.5 rounded font-bold uppercase ${
                priorityCfg[JOB_META.priority]
              }`}
            >
              {JOB_META.priority} PRIORITY
            </span>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-1">
          {[
            { label: "Source", value: JOB_META.source },
            {
              label: "Created",
              value: new Date(JOB_META.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              }),
            },
            {
              label: "Scheduled",
              value: new Date(JOB_META.scheduledAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              }),
            },
          ].map((item) => (
            <div key={item.label}>
              <div className="text-[9px] text-white/25 uppercase tracking-wider">
                {item.label}
              </div>
              <div className="text-xs font-mono text-white/60 mt-0.5">{item.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* B3d contract notice */}
      <div className="mt-3 pt-3 border-t border-white/[0.05] flex items-center gap-2">
        <span className="text-[9px] font-mono text-white/15">B3d CONTRACT:</span>
        <div className="flex items-center gap-1 flex-wrap">
          {["6 WIDGETS", "6 PROJECTIONS", "3 ACTIONS", "PCG VALIDATED"].map((tag) => (
            <span
              key={tag}
              className="text-[9px] font-mono text-white/20 bg-white/[0.03] border border-white/[0.06] px-1.5 py-0.5 rounded"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Main JobCard Component ────────────────────────────────────────────
const IDLE: WidgetState = { load: "idle" };
const ERROR_CODES: ErrorCode[] = [
  "AUTHZ_ERROR",
  "INVALID_STATE",
  "IDEMPOTENCY_CONFLICT",
];

export default function JobCard() {
  const [workflowStatus, setWorkflowStatus] = useState<WorkflowStatus>("PENDING");
  const [widgetStates, setWidgetStates] = useState<Record<WidgetKey, WidgetState>>({
    customer: IDLE,
    vehicle: IDLE,
    services: IDLE,
    technician: IDLE,
    workflow: IDLE,
    payment: IDLE,
  });

  const setWidgets = useCallback(
    (keys: WidgetKey[], state: WidgetState) => {
      setWidgetStates((prev) => {
        const next = { ...prev };
        keys.forEach((k) => {
          next[k] = state;
        });
        return next;
      });
    },
    []
  );

  const clearError = (key: WidgetKey) =>
    setWidgetStates((prev) => ({ ...prev, [key]: IDLE }));

  const executeAction = useCallback(
    async (
      label: string,
      affected: WidgetKey[],
      onSuccess: () => void,
      failRate = 0.15
    ) => {
      setWidgets(affected, { load: "pending" });
      await new Promise((r) => setTimeout(r, 1200 + Math.random() * 600));

      if (Math.random() < failRate) {
        const code = ERROR_CODES[Math.floor(Math.random() * ERROR_CODES.length)];
        setWidgets(affected, {
          load: "error",
          error: { code, message: ERROR_MESSAGES[code] },
        });
        toast.error(`${label} failed`, {
          description: `${code} — PCG validation rejected the kernel transition.`,
        });
        return;
      }

      onSuccess();
      setWidgets(affected, IDLE);
    },
    [setWidgets]
  );

  const handleStartWork = () => {
    executeAction("start-work", ["technician", "workflow"], () => {
      setWorkflowStatus("IN_PROGRESS");
      toast.success("start-work executed", {
        description:
          "workflow_projection.status → IN_PROGRESS. Technician workload invalidated.",
      });
    });
  };

  const handleMarkQC = () => {
    executeAction("mark-qc", ["workflow", "services"], () => {
      setWorkflowStatus("QC_PENDING");
      setTimeout(() => {
        const pass = Math.random() > 0.35;
        setWorkflowStatus(pass ? "QC_PASS" : "QC_FAIL");
        if (pass) {
          toast.success("QC Passed", {
            description: "workflow_projection.status → QC_PASS. Ready to complete.",
          });
        } else {
          toast.warning("QC Failed", {
            description:
              "workflow_projection.status → QC_FAIL. Rework required.",
          });
        }
      }, 1800);
    });
  };

  const handleCompleteJob = () => {
    executeAction("complete-job", ["workflow", "payment"], () => {
      setWorkflowStatus("DELIVERED");
      toast.success("Job delivered", {
        description: "workflow_projection.status → DELIVERED. Job card closed.",
      });
    });
  };

  const handleRework = () => {
    executeAction("rework", ["workflow"], () => {
      setWorkflowStatus("IN_PROGRESS");
      toast.info("Rework initiated", {
        description: "workflow_projection.status → IN_PROGRESS.",
      });
    });
  };

  return (
    <div className="px-4 lg:px-6 py-6 max-w-[1440px] mx-auto">
      <JobCardHeader workflowStatus={workflowStatus} />

      <div
        className="grid gap-4"
        style={{
          gridTemplateColumns: "repeat(3, 1fr)",
          gridTemplateAreas: `
            "customer vehicle technician"
            "services services payment"
            "workflow workflow workflow"
          `,
        }}
      >
        {/* Row 1 */}
        <motion.div
          style={{ gridArea: "customer" }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
        >
          <CustomerWidget
            state={widgetStates.customer}
            onClear={() => clearError("customer")}
          />
        </motion.div>

        <motion.div
          style={{ gridArea: "vehicle" }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <VehicleWidget
            state={widgetStates.vehicle}
            onClear={() => clearError("vehicle")}
          />
        </motion.div>

        <motion.div
          style={{ gridArea: "technician" }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <TechnicianWidget
            workflowStatus={workflowStatus}
            state={widgetStates.technician}
            onClear={() => clearError("technician")}
            onStartWork={handleStartWork}
          />
        </motion.div>

        {/* Row 2 */}
        <motion.div
          style={{ gridArea: "services" }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <ServicesWidget
            workflowStatus={workflowStatus}
            state={widgetStates.services}
            onClear={() => clearError("services")}
          />
        </motion.div>

        <motion.div
          style={{ gridArea: "payment" }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          <PaymentWidget
            state={widgetStates.payment}
            onClear={() => clearError("payment")}
          />
        </motion.div>

        {/* Row 3 */}
        <motion.div
          style={{ gridArea: "workflow" }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <WorkflowWidget
            workflowStatus={workflowStatus}
            state={widgetStates.workflow}
            onClear={() => clearError("workflow")}
            onStartWork={handleStartWork}
            onMarkQC={handleMarkQC}
            onCompleteJob={handleCompleteJob}
            onRework={handleRework}
          />
        </motion.div>
      </div>

      {/* Responsive fallback for narrow screens */}
      <style>{`
        @media (max-width: 900px) {
          .grid[style*="gridTemplateAreas"] {
            grid-template-columns: 1fr !important;
            grid-template-areas:
              "customer"
              "vehicle"
              "technician"
              "services"
              "payment"
              "workflow" !important;
          }
        }
        @media (min-width: 901px) and (max-width: 1199px) {
          .grid[style*="gridTemplateAreas"] {
            grid-template-columns: 1fr 1fr !important;
            grid-template-areas:
              "customer vehicle"
              "technician technician"
              "services services"
              "payment payment"
              "workflow workflow" !important;
          }
        }
      `}</style>
    </div>
  );
}
