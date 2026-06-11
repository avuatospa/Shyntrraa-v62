import { useState, useMemo } from "react";
import { toast, Toaster } from "sonner";
import { motion } from "motion/react";
import { format, parseISO, formatDistanceToNow } from "date-fns";
import {
  Car,
  Wrench,
  Sparkles,
  Droplets,
  MessageSquare,
  Mail,
  Phone,
  ChevronDown,
  Search,
  CheckCircle2,
  AlertCircle,
  Clock,
  XCircle,
  Calendar,
  User,
  Send,
  MapPin,
  Plus,
  MoreVertical,
  Zap,
  Loader2,
  Hash,
  FileText,
  LayoutGrid,
  Building2,
} from "lucide-react";
import JobCard from "./JobCard";
import CRMView from "./components/CRMView";
import { ShyntraaApp } from "./components/ShyntraaApp";

// ── Types ─────────────────────────────────────────────────────────────
type BusinessType = "car_wash" | "detailing" | "service_center" | "workshop";
type InquiryStatus = "pending" | "confirmed" | "in_progress" | "completed" | "cancelled";
type Priority = "low" | "medium" | "high";
type Channel = "sms" | "whatsapp" | "email";

interface Tenant {
  id: string;
  name: string;
  type: BusinessType;
  location: string;
  channels: Channel[];
}

interface Inquiry {
  id: string;
  tenantId: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  vehicleMake: string;
  vehicleModel: string;
  vehicleYear: string;
  vehiclePlate: string;
  service: string;
  preferredDate: string;
  preferredTime: string;
  status: InquiryStatus;
  priority: Priority;
  notes: string;
  channelsSent: Channel[];
  createdAt: string;
  assignedTo?: string;
}

interface FormData {
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  vehicleMake: string;
  vehicleModel: string;
  vehicleYear: string;
  vehiclePlate: string;
  service: string;
  preferredDate: string;
  preferredTime: string;
  priority: Priority;
  notes: string;
  channels: Channel[];
}

// ── Constants ─────────────────────────────────────────────────────────
const TENANTS: Tenant[] = [
  {
    id: "gleam",
    name: "Gleam Car Wash",
    type: "car_wash",
    location: "Downtown Branch",
    channels: ["sms", "whatsapp", "email"],
  },
  {
    id: "primus",
    name: "Primus Detailing Studio",
    type: "detailing",
    location: "Harbour Point",
    channels: ["whatsapp", "email"],
  },
  {
    id: "apex",
    name: "Apex Auto Service",
    type: "service_center",
    location: "Industrial Zone",
    channels: ["sms", "email"],
  },
  {
    id: "ironwrench",
    name: "Iron Wrench Workshop",
    type: "workshop",
    location: "Mechanics Row",
    channels: ["sms", "whatsapp"],
  },
];

const SERVICES: Record<BusinessType, string[]> = {
  car_wash: [
    "Express Wash",
    "Full Exterior Wash",
    "Interior Vacuum",
    "Wax & Polish",
    "Premium Package",
    "Fleet Wash",
  ],
  detailing: [
    "Paint Correction",
    "Ceramic Coating",
    "Full Detail",
    "Interior Detail",
    "Engine Bay Clean",
    "Nano Coating",
  ],
  service_center: [
    "Oil Change",
    "Brake Service",
    "Tyre Rotation",
    "AC Service",
    "Full Service",
    "Diagnostics",
    "Wheel Alignment",
  ],
  workshop: [
    "Engine Repair",
    "Transmission Overhaul",
    "Suspension Work",
    "Electrical Diagnostics",
    "Bodywork",
    "Custom Fabrication",
  ],
};

const STATUS_CFG: Record<
  InquiryStatus,
  { label: string; color: string; dot: string; icon: React.ReactNode }
> = {
  pending: {
    label: "Pending",
    color: "text-yellow-400 bg-yellow-400/10 border-yellow-400/25",
    dot: "bg-yellow-400",
    icon: <Clock size={10} />,
  },
  confirmed: {
    label: "Confirmed",
    color: "text-blue-400 bg-blue-400/10 border-blue-400/25",
    dot: "bg-blue-400",
    icon: <CheckCircle2 size={10} />,
  },
  in_progress: {
    label: "In Progress",
    color: "text-orange-400 bg-orange-400/10 border-orange-400/25",
    dot: "bg-orange-400",
    icon: <AlertCircle size={10} />,
  },
  completed: {
    label: "Completed",
    color: "text-green-400 bg-green-400/10 border-green-400/25",
    dot: "bg-green-400",
    icon: <CheckCircle2 size={10} />,
  },
  cancelled: {
    label: "Cancelled",
    color: "text-red-400/70 bg-red-400/8 border-red-400/20",
    dot: "bg-red-400/60",
    icon: <XCircle size={10} />,
  },
};

const PRIORITY_CFG: Record<Priority, { label: string; color: string }> = {
  high: { label: "HIGH", color: "text-red-400 bg-red-400/10" },
  medium: { label: "MED", color: "text-amber-400 bg-amber-400/10" },
  low: { label: "LOW", color: "text-slate-400 bg-slate-400/10" },
};

const BTYPE_ICONS: Record<BusinessType, React.ReactNode> = {
  car_wash: <Droplets size={13} />,
  detailing: <Sparkles size={13} />,
  service_center: <Wrench size={13} />,
  workshop: <Car size={13} />,
};

const BTYPE_LABELS: Record<BusinessType, string> = {
  car_wash: "Car Wash",
  detailing: "Detailing",
  service_center: "Service Center",
  workshop: "Workshop",
};

const CH_CFG: Record<Channel, { label: string; short: string; color: string; icon: React.ReactNode }> = {
  sms: {
    label: "SMS",
    short: "SMS",
    color: "text-sky-400 bg-sky-400/10 border-sky-400/30",
    icon: <Phone size={11} />,
  },
  whatsapp: {
    label: "WhatsApp",
    short: "WA",
    color: "text-green-400 bg-green-400/10 border-green-400/30",
    icon: <MessageSquare size={11} />,
  },
  email: {
    label: "Email",
    short: "Email",
    color: "text-purple-400 bg-purple-400/10 border-purple-400/30",
    icon: <Mail size={11} />,
  },
};

const STATUS_FILTERS: Array<{ key: "all" | InquiryStatus; label: string }> = [
  { key: "all", label: "All" },
  { key: "pending", label: "Pending" },
  { key: "confirmed", label: "Confirmed" },
  { key: "in_progress", label: "In Progress" },
  { key: "completed", label: "Completed" },
  { key: "cancelled", label: "Cancelled" },
];

const EMPTY_FORM: FormData = {
  customerName: "",
  customerPhone: "",
  customerEmail: "",
  vehicleMake: "",
  vehicleModel: "",
  vehicleYear: "",
  vehiclePlate: "",
  service: "",
  preferredDate: "",
  preferredTime: "",
  priority: "medium",
  notes: "",
  channels: [],
};

let seqId = 48;

const SEED_INQUIRIES: Inquiry[] = [
  {
    id: "INQ-0041",
    tenantId: "apex",
    customerName: "Marcus Reid",
    customerPhone: "+1 555 0142",
    customerEmail: "m.reid@email.com",
    vehicleMake: "Toyota",
    vehicleModel: "Camry",
    vehicleYear: "2021",
    vehiclePlate: "TXK 4821",
    service: "Full Service",
    preferredDate: "2026-05-25",
    preferredTime: "09:00",
    status: "confirmed",
    priority: "high",
    notes: "Customer requested synthetic oil. Loyal client since 2019.",
    channelsSent: ["sms", "email"],
    createdAt: "2026-05-23T08:14:00",
    assignedTo: "Dion Harris",
  },
  {
    id: "INQ-0040",
    tenantId: "apex",
    customerName: "Sofia Hernandez",
    customerPhone: "+1 555 0199",
    customerEmail: "sofia.h@gmail.com",
    vehicleMake: "Honda",
    vehicleModel: "CR-V",
    vehicleYear: "2023",
    vehiclePlate: "MNX 7734",
    service: "AC Service",
    preferredDate: "2026-05-26",
    preferredTime: "11:30",
    status: "pending",
    priority: "medium",
    notes: "AC blowing warm. Extended warranty applies.",
    channelsSent: ["email"],
    createdAt: "2026-05-23T10:05:00",
  },
  {
    id: "INQ-0039",
    tenantId: "apex",
    customerName: "James Okafor",
    customerPhone: "+1 555 0277",
    customerEmail: "james.ok@business.net",
    vehicleMake: "BMW",
    vehicleModel: "3 Series",
    vehicleYear: "2020",
    vehiclePlate: "BWM 3301",
    service: "Brake Service",
    preferredDate: "2026-05-24",
    preferredTime: "14:00",
    status: "in_progress",
    priority: "high",
    notes: "Front + rear pads and rotors. Squealing at low speed.",
    channelsSent: ["sms", "email"],
    createdAt: "2026-05-22T16:30:00",
    assignedTo: "Kyle Simmons",
  },
  {
    id: "INQ-0038",
    tenantId: "apex",
    customerName: "Nina Blackwood",
    customerPhone: "+1 555 0388",
    customerEmail: "n.blackwood@corp.io",
    vehicleMake: "Audi",
    vehicleModel: "Q5",
    vehicleYear: "2022",
    vehiclePlate: "AUD 9912",
    service: "Diagnostics",
    preferredDate: "2026-05-28",
    preferredTime: "10:00",
    status: "pending",
    priority: "low",
    notes: "Check engine light on. No obvious symptoms.",
    channelsSent: ["sms"],
    createdAt: "2026-05-23T11:45:00",
  },
  {
    id: "INQ-0037",
    tenantId: "apex",
    customerName: "Tom Walsh",
    customerPhone: "+1 555 0421",
    customerEmail: "twalsh@email.com",
    vehicleMake: "Ford",
    vehicleModel: "F-150",
    vehicleYear: "2019",
    vehiclePlate: "FRD 5500",
    service: "Oil Change",
    preferredDate: "2026-05-23",
    preferredTime: "08:30",
    status: "completed",
    priority: "low",
    notes: "",
    channelsSent: ["email"],
    createdAt: "2026-05-23T07:00:00",
    assignedTo: "Dion Harris",
  },
  {
    id: "INQ-0036",
    tenantId: "gleam",
    customerName: "Nina Blackwood",
    customerPhone: "+1 555 0388",
    customerEmail: "n.blackwood@corp.io",
    vehicleMake: "Audi",
    vehicleModel: "Q5",
    vehicleYear: "2022",
    vehiclePlate: "AUD 9912",
    service: "Premium Package",
    preferredDate: "2026-05-27",
    preferredTime: "10:00",
    status: "pending",
    priority: "low",
    notes: "",
    channelsSent: ["sms", "whatsapp", "email"],
    createdAt: "2026-05-23T11:45:00",
  },
  {
    id: "INQ-0035",
    tenantId: "primus",
    customerName: "Aria Chen",
    customerPhone: "+1 555 0566",
    customerEmail: "aria.chen@gmail.com",
    vehicleMake: "Porsche",
    vehicleModel: "Cayenne",
    vehicleYear: "2024",
    vehiclePlate: "PCH 0024",
    service: "Ceramic Coating",
    preferredDate: "2026-05-29",
    preferredTime: "09:00",
    status: "confirmed",
    priority: "high",
    notes: "New car. Full paint protection + ceramic package.",
    channelsSent: ["whatsapp", "email"],
    createdAt: "2026-05-22T14:00:00",
    assignedTo: "Sam Ortega",
  },
  {
    id: "INQ-0034",
    tenantId: "ironwrench",
    customerName: "Derek Flint",
    customerPhone: "+1 555 0774",
    customerEmail: "dflint@motorheads.com",
    vehicleMake: "Jeep",
    vehicleModel: "Wrangler",
    vehicleYear: "2018",
    vehiclePlate: "JWR 0018",
    service: "Suspension Work",
    preferredDate: "2026-05-30",
    preferredTime: "13:00",
    status: "confirmed",
    priority: "medium",
    notes: "Lift kit installation — 3 inch. Customer supplying own parts.",
    channelsSent: ["sms", "whatsapp"],
    createdAt: "2026-05-21T09:15:00",
    assignedTo: "Raj Patel",
  },
];

// ── Small components ──────────────────────────────────────────────────
function StatusBadge({ status }: { status: InquiryStatus }) {
  const cfg = STATUS_CFG[status];
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md border text-[10px] font-semibold uppercase tracking-wider ${cfg.color}`}
    >
      {cfg.icon}
      {cfg.label}
    </span>
  );
}

function PriorityPill({ priority }: { priority: Priority }) {
  const cfg = PRIORITY_CFG[priority];
  return (
    <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-bold ${cfg.color}`}>
      {cfg.label}
    </span>
  );
}

function ChannelTag({ channel, size = "sm" }: { channel: Channel; size?: "sm" | "xs" }) {
  const cfg = CH_CFG[channel];
  return (
    <span
      className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded border text-[10px] font-medium ${cfg.color}`}
    >
      {size === "sm" ? cfg.icon : null}
      {size === "sm" ? cfg.short : cfg.label.slice(0, 2)}
    </span>
  );
}

// ── Tenant Selector ───────────────────────────────────────────────────
function TenantSelector({
  tenant,
  onChange,
}: {
  tenant: Tenant;
  onChange: (t: Tenant) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 px-3 py-1.5 bg-white/5 hover:bg-white/8 border border-white/10 rounded-lg transition-colors"
      >
        <span className="text-amber-400">{BTYPE_ICONS[tenant.type]}</span>
        <span className="text-sm font-medium text-white">{tenant.name}</span>
        <span className="hidden sm:inline text-xs text-white/30">/ {tenant.location}</span>
        <ChevronDown
          size={13}
          className={`text-white/35 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute top-full mt-2 left-0 w-72 bg-[#14161f] border border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden">
            <div className="px-3 py-2 border-b border-white/5">
              <p className="text-[10px] text-white/30 uppercase tracking-widest font-semibold">
                Branches &amp; Tenants
              </p>
            </div>
            {TENANTS.map((t) => (
              <button
                key={t.id}
                onClick={() => {
                  onChange(t);
                  setOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 hover:bg-white/5 transition-colors text-left ${
                  t.id === tenant.id ? "bg-amber-400/5" : ""
                }`}
              >
                <span
                  className={`p-1.5 rounded-md ${
                    t.id === tenant.id ? "bg-amber-400/15 text-amber-400" : "bg-white/5 text-white/30"
                  }`}
                >
                  {BTYPE_ICONS[t.type]}
                </span>
                <div className="flex-1 min-w-0">
                  <div
                    className={`text-sm font-medium truncate ${
                      t.id === tenant.id ? "text-white" : "text-white/65"
                    }`}
                  >
                    {t.name}
                  </div>
                  <div className="text-[11px] text-white/30">
                    {t.location} · {BTYPE_LABELS[t.type]}
                  </div>
                </div>
                <div className="flex gap-1 flex-shrink-0">
                  {t.channels.map((ch) => (
                    <span key={ch} className={`w-1.5 h-1.5 rounded-full ${CH_CFG[ch].color.split(" ")[2].replace("border-", "bg-").replace("/30", "/60")}`} />
                  ))}
                </div>
                {t.id === tenant.id && (
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0 ml-1" />
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// ── Stats Bar ─────────────────────────────────────────────────────────
function StatsBar({ inquiries, tenantId }: { inquiries: Inquiry[]; tenantId: string }) {
  const ti = inquiries.filter((i) => i.tenantId === tenantId);
  const stats = [
    {
      label: "Total",
      value: ti.length,
      sub: "inquiries",
      color: "text-white",
    },
    {
      label: "Pending",
      value: ti.filter((i) => i.status === "pending").length,
      sub: "awaiting action",
      color: "text-yellow-400",
    },
    {
      label: "In Progress",
      value: ti.filter((i) => i.status === "in_progress").length,
      sub: "active jobs",
      color: "text-orange-400",
    },
    {
      label: "Completed",
      value: ti.filter((i) => i.status === "completed").length,
      sub: "this period",
      color: "text-green-400",
    },
  ];
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {stats.map((s) => (
        <div
          key={s.label}
          className="bg-card border border-border rounded-xl px-4 py-3.5 flex items-center justify-between"
        >
          <div>
            <div className="text-[11px] text-white/35 uppercase tracking-widest font-semibold mb-1">
              {s.label}
            </div>
            <div className={`text-2xl font-bold font-display ${s.color}`}>{s.value}</div>
            <div className="text-[10px] text-white/20 mt-0.5">{s.sub}</div>
          </div>
          <div
            className={`w-8 h-8 rounded-full border-2 flex items-center justify-center opacity-20 ${s.color.replace("text-", "border-")}`}
          >
            <div className={`w-2.5 h-2.5 rounded-full ${s.color.replace("text-", "bg-")}`} />
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Inquiry Form ──────────────────────────────────────────────────────
function InquiryForm({
  tenant,
  onSubmit,
}: {
  tenant: Tenant;
  onSubmit: (data: FormData) => void;
}) {
  const [form, setForm] = useState<FormData>({
    ...EMPTY_FORM,
    channels: [...tenant.channels],
  });
  const [saving, setSaving] = useState(false);

  const set = (field: keyof FormData, value: string | Channel[] | Priority) =>
    setForm((f) => ({ ...f, [field]: value }));

  const toggleChannel = (ch: Channel) => {
    if (!tenant.channels.includes(ch)) return;
    setForm((f) => ({
      ...f,
      channels: f.channels.includes(ch)
        ? f.channels.filter((c) => c !== ch)
        : [...f.channels, ch],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.customerName.trim() || !form.service || !form.preferredDate) {
      toast.error("Required fields missing", {
        description: "Customer name, service type, and preferred date are required.",
      });
      return;
    }
    setSaving(true);
    await new Promise((r) => setTimeout(r, 900));
    onSubmit(form);
    setForm({ ...EMPTY_FORM, channels: [...tenant.channels] });
    setSaving(false);
  };

  const inp =
    "w-full bg-white/[0.04] border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-white/20 focus:outline-none focus:border-amber-400/40 focus:bg-white/[0.06] transition-all";
  const lbl = "block text-[10px] text-white/35 uppercase tracking-widest mb-1.5 font-semibold";
  const sel =
    "w-full bg-white/[0.04] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-400/40 transition-all appearance-none";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {/* Customer */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <User size={12} className="text-amber-400" />
          <span className="text-[10px] text-amber-400/70 uppercase tracking-widest font-semibold">
            Customer Info
          </span>
        </div>
        <div className="flex flex-col gap-3">
          <div>
            <label className={lbl}>
              Full Name <span className="text-red-400 normal-case">*</span>
            </label>
            <input
              className={inp}
              placeholder="e.g. Marcus Reid"
              value={form.customerName}
              onChange={(e) => set("customerName", e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={lbl}>Phone</label>
              <input
                className={inp}
                placeholder="+1 555 0100"
                value={form.customerPhone}
                onChange={(e) => set("customerPhone", e.target.value)}
              />
            </div>
            <div>
              <label className={lbl}>Email</label>
              <input
                type="email"
                className={inp}
                placeholder="name@email.com"
                value={form.customerEmail}
                onChange={(e) => set("customerEmail", e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="h-px bg-white/5" />

      {/* Vehicle */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Car size={12} className="text-amber-400" />
          <span className="text-[10px] text-amber-400/70 uppercase tracking-widest font-semibold">
            Vehicle Details
          </span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={lbl}>Make</label>
            <input
              className={inp}
              placeholder="Toyota"
              value={form.vehicleMake}
              onChange={(e) => set("vehicleMake", e.target.value)}
            />
          </div>
          <div>
            <label className={lbl}>Model</label>
            <input
              className={inp}
              placeholder="Camry"
              value={form.vehicleModel}
              onChange={(e) => set("vehicleModel", e.target.value)}
            />
          </div>
          <div>
            <label className={lbl}>Year</label>
            <input
              className={inp}
              placeholder="2022"
              maxLength={4}
              value={form.vehicleYear}
              onChange={(e) => set("vehicleYear", e.target.value)}
            />
          </div>
          <div>
            <label className={lbl}>Plate No.</label>
            <input
              className={`${inp} font-mono`}
              placeholder="ABC 1234"
              value={form.vehiclePlate}
              onChange={(e) => set("vehiclePlate", e.target.value.toUpperCase())}
            />
          </div>
        </div>
      </div>

      <div className="h-px bg-white/5" />

      {/* Service */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Wrench size={12} className="text-amber-400" />
          <span className="text-[10px] text-amber-400/70 uppercase tracking-widest font-semibold">
            Service &amp; Schedule
          </span>
        </div>
        <div className="flex flex-col gap-3">
          <div>
            <label className={lbl}>
              Service Type <span className="text-red-400 normal-case">*</span>
            </label>
            <div className="relative">
              <select
                className={sel}
                value={form.service}
                onChange={(e) => set("service", e.target.value)}
              >
                <option value="">Select a service...</option>
                {SERVICES[tenant.type].map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={13}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={lbl}>
                Date <span className="text-red-400 normal-case">*</span>
              </label>
              <input
                type="date"
                className={inp}
                value={form.preferredDate}
                onChange={(e) => set("preferredDate", e.target.value)}
              />
            </div>
            <div>
              <label className={lbl}>Time</label>
              <input
                type="time"
                className={inp}
                value={form.preferredTime}
                onChange={(e) => set("preferredTime", e.target.value)}
              />
            </div>
          </div>
          <div>
            <label className={lbl}>Priority</label>
            <div className="flex gap-2">
              {(["low", "medium", "high"] as Priority[]).map((p) => (
                <button
                  type="button"
                  key={p}
                  onClick={() => set("priority", p)}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-semibold capitalize border transition-all ${
                    form.priority === p
                      ? p === "high"
                        ? "bg-red-400/15 border-red-400/40 text-red-400"
                        : p === "medium"
                        ? "bg-amber-400/15 border-amber-400/40 text-amber-400"
                        : "bg-slate-400/10 border-slate-400/25 text-slate-300"
                      : "border-white/8 text-white/25 hover:border-white/15 hover:text-white/40"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Notes */}
      <div>
        <label className={lbl}>Notes</label>
        <textarea
          className={`${inp} h-20 resize-none`}
          placeholder="Special requirements, observations, or customer context..."
          value={form.notes}
          onChange={(e) => set("notes", e.target.value)}
        />
      </div>

      {/* Notification dispatch */}
      <div className="rounded-xl border border-amber-400/15 bg-amber-400/[0.04] p-4">
        <div className="flex items-center gap-2 mb-3">
          <Send size={12} className="text-amber-400" />
          <span className="text-[10px] text-amber-400 uppercase tracking-widest font-semibold">
            Notification Dispatch
          </span>
        </div>
        <p className="text-[11px] text-white/30 mb-3">
          Send inquiry confirmation to customer via:
        </p>
        <div className="flex gap-2">
          {(["sms", "whatsapp", "email"] as Channel[]).map((ch) => {
            const available = tenant.channels.includes(ch);
            const selected = form.channels.includes(ch);
            const cfg = CH_CFG[ch];
            return (
              <button
                type="button"
                key={ch}
                onClick={() => toggleChannel(ch)}
                disabled={!available}
                title={!available ? `${cfg.label} not configured for this branch` : undefined}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg border text-xs font-semibold transition-all ${
                  !available
                    ? "border-white/5 text-white/12 cursor-not-allowed"
                    : selected
                    ? cfg.color
                    : "border-white/10 text-white/30 hover:border-white/20 hover:text-white/50"
                }`}
              >
                {cfg.icon}
                <span>{cfg.label}</span>
                {!available && (
                  <span className="text-[9px] opacity-40">(off)</span>
                )}
              </button>
            );
          })}
        </div>
        {form.channels.length > 0 && (
          <p className="text-[11px] text-amber-400/50 mt-2.5">
            Will dispatch via: {form.channels.map((c) => CH_CFG[c].label).join(", ")}
          </p>
        )}
        {form.channels.length === 0 && (
          <p className="text-[11px] text-white/20 mt-2.5">
            No channels selected — inquiry will be saved silently.
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={saving}
        className="flex items-center justify-center gap-2 py-3 bg-amber-400 hover:bg-amber-300 active:bg-amber-500 text-black font-bold rounded-xl transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed font-display tracking-wide"
      >
        {saving ? (
          <>
            <Loader2 size={15} className="animate-spin" />
            Saving inquiry...
          </>
        ) : (
          <>
            <Plus size={15} />
            Save Inquiry
          </>
        )}
      </button>
    </form>
  );
}

// ── Inquiry Card ──────────────────────────────────────────────────────
function InquiryCard({
  inquiry,
  onStatusChange,
}: {
  inquiry: Inquiry;
  onStatusChange: (id: string, status: InquiryStatus) => void;
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  const dateStr = inquiry.preferredDate
    ? format(parseISO(inquiry.preferredDate), "MMM d, yyyy")
    : "—";
  const timeStr = inquiry.preferredTime
    ? format(new Date(`2000-01-01T${inquiry.preferredTime}`), "h:mm a")
    : "";
  const ago = formatDistanceToNow(parseISO(inquiry.createdAt), { addSuffix: true });

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="bg-card border border-border rounded-xl p-4 hover:border-white/12 transition-colors group"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1.5">
            <span className="text-[10px] font-mono text-white/20">{inquiry.id}</span>
            <StatusBadge status={inquiry.status} />
            <PriorityPill priority={inquiry.priority} />
          </div>
          <div className="font-semibold text-white leading-tight">{inquiry.customerName}</div>
          <div className="text-xs text-white/40 mt-0.5 font-mono">
            {inquiry.vehicleMake} {inquiry.vehicleModel} {inquiry.vehicleYear}
            {inquiry.vehiclePlate && (
              <span className="text-white/25"> · {inquiry.vehiclePlate}</span>
            )}
          </div>
        </div>

        <div className="relative flex-shrink-0">
          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="p-1.5 rounded-lg text-white/20 hover:text-white/60 hover:bg-white/5 transition-colors opacity-0 group-hover:opacity-100"
          >
            <MoreVertical size={14} />
          </button>
          {menuOpen && (
            <>
              <div className="fixed inset-0 z-30" onClick={() => setMenuOpen(false)} />
              <div className="absolute right-0 top-full mt-1 w-48 bg-[#14161f] border border-white/10 rounded-xl shadow-2xl z-40 overflow-hidden py-1">
                <div className="px-3 py-1.5 border-b border-white/5 mb-1">
                  <span className="text-[10px] text-white/25 uppercase tracking-widest">
                    Set Status
                  </span>
                </div>
                {(
                  [
                    "pending",
                    "confirmed",
                    "in_progress",
                    "completed",
                    "cancelled",
                  ] as InquiryStatus[]
                ).map((s) => (
                  <button
                    key={s}
                    onClick={() => {
                      onStatusChange(inquiry.id, s);
                      setMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-2.5 text-left px-3 py-1.5 text-xs hover:bg-white/5 transition-colors ${
                      inquiry.status === s ? "text-amber-400" : "text-white/50"
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${STATUS_CFG[s].dot}`} />
                    {STATUS_CFG[s].label}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      <div className="mt-3 flex items-center gap-4 flex-wrap">
        <span className="flex items-center gap-1.5 text-xs text-white/35">
          <Wrench size={10} className="text-white/20" />
          {inquiry.service}
        </span>
        <span className="flex items-center gap-1.5 text-xs text-white/35">
          <Calendar size={10} className="text-white/20" />
          {dateStr}
          {timeStr && <span className="text-white/20">{timeStr}</span>}
        </span>
        {inquiry.assignedTo && (
          <span className="flex items-center gap-1.5 text-xs text-white/35">
            <User size={10} className="text-white/20" />
            {inquiry.assignedTo}
          </span>
        )}
      </div>

      {inquiry.notes && (
        <div className="mt-2.5 text-[11px] text-white/30 bg-white/[0.03] rounded-lg px-2.5 py-1.5 border border-white/5 line-clamp-2 leading-relaxed">
          {inquiry.notes}
        </div>
      )}

      <div className="mt-3 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          {inquiry.channelsSent.length > 0 ? (
            <>
              <span className="text-[10px] text-white/20 mr-0.5">Notified</span>
              {inquiry.channelsSent.map((ch) => (
                <ChannelTag key={ch} channel={ch} size="sm" />
              ))}
            </>
          ) : (
            <span className="text-[10px] text-white/15">No notifications sent</span>
          )}
        </div>
        <span className="text-[10px] text-white/15">{ago}</span>
      </div>
    </motion.div>
  );
}

// ── App ───────────────────────────────────────────────────────────────
export default function App() {
  const [view, setView] = useState<"inquiries" | "jobcard" | "crm" | "shyntraa">("shyntraa");
  const [tenant, setTenant] = useState<Tenant>(TENANTS[2]);
  const [inquiries, setInquiries] = useState<Inquiry[]>(SEED_INQUIRIES);
  const [statusFilter, setStatusFilter] = useState<"all" | InquiryStatus>("all");
  const [search, setSearch] = useState("");

  const handleTenantChange = (t: Tenant) => {
    setTenant(t);
    setStatusFilter("all");
    setSearch("");
  };

  const handleSubmit = (data: FormData) => {
    const id = `INQ-${String(seqId++).padStart(4, "0")}`;
    const inquiry: Inquiry = {
      id,
      tenantId: tenant.id,
      customerName: data.customerName,
      customerPhone: data.customerPhone,
      customerEmail: data.customerEmail,
      vehicleMake: data.vehicleMake,
      vehicleModel: data.vehicleModel,
      vehicleYear: data.vehicleYear,
      vehiclePlate: data.vehiclePlate,
      service: data.service,
      preferredDate: data.preferredDate,
      preferredTime: data.preferredTime,
      status: "pending",
      priority: data.priority,
      notes: data.notes,
      channelsSent: data.channels,
      createdAt: new Date().toISOString(),
    };
    setInquiries((prev) => [inquiry, ...prev]);

    if (data.channels.length > 0) {
      const sent = data.channels.map((c) => CH_CFG[c].label).join(", ");
      toast.success(`${id} saved`, {
        description: `Confirmation dispatched via ${sent} to ${data.customerName}`,
      });
      data.channels.forEach((ch) => {
        const dest =
          ch === "email" && data.customerEmail
            ? data.customerEmail
            : data.customerPhone || "customer";
        toast(`${CH_CFG[ch].label} dispatched`, {
          description: `Sent to ${dest}`,
          icon: CH_CFG[ch].icon,
        });
      });
    } else {
      toast.success(`${id} saved`, {
        description: "Inquiry recorded with no notifications.",
      });
    }
  };

  const handleStatusChange = (id: string, status: InquiryStatus) => {
    setInquiries((prev) => prev.map((i) => (i.id === id ? { ...i, status } : i)));
    toast.success(`Status → ${STATUS_CFG[status].label}`);
  };

  const filtered = useMemo(() => {
    return inquiries
      .filter((i) => i.tenantId === tenant.id)
      .filter((i) => statusFilter === "all" || i.status === statusFilter)
      .filter((i) => {
        if (!search.trim()) return true;
        const q = search.toLowerCase();
        return (
          i.customerName.toLowerCase().includes(q) ||
          i.vehicleMake.toLowerCase().includes(q) ||
          i.vehicleModel.toLowerCase().includes(q) ||
          i.vehiclePlate.toLowerCase().includes(q) ||
          i.service.toLowerCase().includes(q) ||
          i.id.toLowerCase().includes(q) ||
          (i.assignedTo || "").toLowerCase().includes(q)
        );
      });
  }, [inquiries, tenant.id, statusFilter, search]);

  const statusCounts = useMemo(() => {
    const ti = inquiries.filter((i) => i.tenantId === tenant.id);
    const counts: Record<string, number> = { all: ti.length };
    STATUS_FILTERS.slice(1).forEach(({ key }) => {
      counts[key] = ti.filter((i) => i.status === key).length;
    });
    return counts;
  }, [inquiries, tenant.id]);

  if (view === "shyntraa") {
    return (
      <div style={{ position: "fixed", inset: 0 }}>
        <Toaster position="top-right" theme="dark" richColors />
        <ShyntraaApp />
        {/* Escape hatch back to legacy views */}
        <button
          onClick={() => setView("inquiries")}
          style={{ position: "absolute", bottom: 16, right: 16, padding: "6px 12px", borderRadius: 6, background: "rgba(0,0,0,0.6)", border: "1px solid rgba(255,255,255,0.1)", color: "#64748b", fontSize: 11, cursor: "pointer", zIndex: 9999 }}
        >
          Legacy Views
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Toaster position="top-right" theme="dark" richColors />

      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/90 backdrop-blur-md border-b border-border h-14 flex items-center gap-3 px-4 lg:px-6">
        <div className="flex items-center gap-2.5 flex-shrink-0">
          <div className="w-7 h-7 bg-amber-400 rounded-lg flex items-center justify-center shadow-lg shadow-amber-400/25">
            <Zap size={14} className="text-black" />
          </div>
          <span className="font-display font-bold text-white tracking-tight text-lg leading-none hidden sm:inline">
            AutoDesk
          </span>
        </div>

        {/* View tabs */}
        <div className="flex gap-0.5 bg-white/[0.04] border border-white/8 rounded-lg p-1 flex-shrink-0">
          <button
            onClick={() => setView("shyntraa")}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold transition-all ${
              view === "shyntraa"
                ? "bg-amber-400 text-black"
                : "text-white/40 hover:text-white/70"
            }`}
          >
            <Building2 size={11} />
            <span>Shyntraa Platform</span>
          </button>
          <button
            onClick={() => setView("inquiries")}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold transition-all ${
              view === "inquiries"
                ? "bg-amber-400 text-black"
                : "text-white/40 hover:text-white/70"
            }`}
          >
            <FileText size={11} />
            <span className="hidden sm:inline">Inquiry Manager</span>
            <span className="sm:hidden">Inquiries</span>
          </button>
          <button
            onClick={() => setView("jobcard")}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold transition-all ${
              view === "jobcard"
                ? "bg-amber-400 text-black"
                : "text-white/40 hover:text-white/70"
            }`}
          >
            <LayoutGrid size={11} />
            <span className="hidden sm:inline">Job Card B3d</span>
            <span className="sm:hidden">Job Card</span>
          </button>
          <button
            onClick={() => setView("crm")}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold transition-all ${
              view === "crm"
                ? "bg-amber-400 text-black"
                : "text-white/40 hover:text-white/70"
            }`}
          >
            <Building2 size={11} />
            <span className="hidden sm:inline">CRM</span>
            <span className="sm:hidden">CRM</span>
          </button>
        </div>

        {(view === "inquiries") && (
          <div className="flex-1 flex justify-center">
            <TenantSelector tenant={tenant} onChange={handleTenantChange} />
          </div>
        )}

        {view === "crm" && <div className="flex-1" />}

        {view === "inquiries" && (
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="hidden sm:flex items-center gap-1.5 bg-white/[0.04] px-2.5 py-1.5 rounded-lg border border-white/8">
              <span className="text-amber-400">{BTYPE_ICONS[tenant.type]}</span>
              <span className="text-[11px] text-white/40 font-medium">
                {BTYPE_LABELS[tenant.type]}
              </span>
            </div>
            <div className="hidden md:flex items-center gap-1.5">
              <MapPin size={11} className="text-white/20" />
              <span className="text-xs text-white/25">{tenant.location}</span>
            </div>
          </div>
        )}

        {view === "jobcard" && (
          <div className="flex items-center gap-2 ml-auto flex-shrink-0">
            <span className="text-[10px] font-mono text-white/25 hidden md:inline">
              SHYNTRAA · Workspace Shell
            </span>
          </div>
        )}
      </header>

      {/* CRM view */}
      {view === "crm" && <CRMView />}

      {/* Job Card view */}
      {view === "jobcard" && <JobCard />}

      {/* Inquiry Manager view */}
      {view === "inquiries" && <main className="px-4 lg:px-6 py-6 max-w-[1440px] mx-auto">
        <div className="mb-5">
          <StatsBar inquiries={inquiries} tenantId={tenant.id} />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-[400px_1fr] gap-6">
          {/* Form panel */}
          <div className="xl:sticky xl:top-[4.5rem] xl:max-h-[calc(100vh-5.5rem)] xl:overflow-y-auto [&::-webkit-scrollbar]:hidden">
            <div className="bg-card border border-border rounded-2xl p-5">
              <div className="flex items-start justify-between mb-5">
                <div>
                  <h2 className="text-base font-bold text-white font-display tracking-wide">
                    New Inquiry
                  </h2>
                  <p className="text-[11px] text-white/30 mt-0.5">{tenant.name}</p>
                </div>
                <div className="p-2 bg-amber-400/10 rounded-lg text-amber-400">
                  {BTYPE_ICONS[tenant.type]}
                </div>
              </div>
              <InquiryForm key={tenant.id} tenant={tenant} onSubmit={handleSubmit} />
            </div>
          </div>

          {/* List panel */}
          <div>
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-4">
              <div className="relative flex-1">
                <Search
                  size={13}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-white/25 pointer-events-none"
                />
                <input
                  className="w-full bg-card border border-border rounded-xl pl-8 pr-3 py-2 text-sm text-white placeholder-white/20 focus:outline-none focus:border-amber-400/40 transition-colors"
                  placeholder="Search by name, vehicle, plate, service..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <div className="flex gap-1 bg-card border border-border rounded-xl p-1 overflow-x-auto flex-shrink-0">
                {STATUS_FILTERS.map((f) => (
                  <button
                    key={f.key}
                    onClick={() => setStatusFilter(f.key)}
                    className={`relative px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                      statusFilter === f.key
                        ? "bg-amber-400 text-black"
                        : "text-white/35 hover:text-white/60"
                    }`}
                  >
                    {f.label}
                    {statusCounts[f.key] > 0 && f.key !== "all" && (
                      <span
                        className={`ml-1 text-[10px] ${
                          statusFilter === f.key ? "text-black/50" : "text-white/20"
                        }`}
                      >
                        {statusCounts[f.key]}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Result count */}
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] text-white/20 font-mono">
                {filtered.length} result{filtered.length !== 1 ? "s" : ""}
                {search && <span className="text-white/15"> for &ldquo;{search}&rdquo;</span>}
              </span>
            </div>

            {/* Empty state */}
            {filtered.length === 0 ? (
              <div className="bg-card border border-border rounded-2xl p-16 text-center">
                <div className="text-4xl text-white/5 font-display mb-3">
                  <Hash size={32} className="mx-auto opacity-20" />
                </div>
                <div className="text-sm text-white/30 font-medium">No inquiries found</div>
                <div className="text-xs text-white/15 mt-1.5">
                  {search
                    ? "Try a different search term"
                    : statusFilter !== "all"
                    ? "No inquiries with this status"
                    : "Add a new inquiry using the form"}
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {filtered.map((inq) => (
                  <InquiryCard
                    key={inq.id}
                    inquiry={inq}
                    onStatusChange={handleStatusChange}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>}
    </div>
  );
}
