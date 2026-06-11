import { useState, useMemo } from "react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import {
  LayoutDashboard,
  Users,
  Calendar,
  Briefcase,
  Receipt,
  BarChart2,
  Package,
  Settings,
  Link2,
  FileText,
  Search,
  Bell,
  Plus,
  Filter,
  MoreHorizontal,
  TrendingUp,
  TrendingDown,
  Star,
  Shield,
  CheckCircle2,
  Clock,
  AlertCircle,
  Building2,
  Truck,
  Crown,
  ChevronDown,
  ArrowUpRight,
  Phone,
  Mail,
  Edit,
  Trash2,
  Eye,
  Activity,
  Database,
  Server,
  Cpu,
  Wifi,
  DollarSign,
  Zap,
  UserCheck,
  ChevronRight,
  RefreshCw,
  Download,
  Upload,
  Hash,
  MapPin,
  Layers,
  Globe,
  ShieldCheck,
} from "lucide-react";

// ── Types ─────────────────────────────────────────────────────────────
type CRMPage = "super-admin" | "admin" | "customers" | "vendors";

// ── Colour constants (light CRM theme — no CSS variable dependency) ───
const P = "#4361ee";
const PL = "#eef0fd";

// ── Data ─────────────────────────────────────────────────────────────
const BRANCHES = [
  { id: "B1", name: "Apex Auto Service", type: "Service Center", jobs: 89, revenue: 42100, users: 18, status: "active", growth: 12 },
  { id: "B2", name: "Primus Detailing Studio", type: "Detailing", jobs: 47, revenue: 28400, users: 12, status: "active", growth: 8 },
  { id: "B3", name: "Gleam Car Wash", type: "Car Wash", jobs: 156, revenue: 22400, users: 7, status: "active", growth: -3 },
  { id: "B4", name: "Iron Wrench Workshop", type: "Workshop", jobs: 34, revenue: 18900, users: 9, status: "active", growth: 22 },
  { id: "B5", name: "Metro Auto Care", type: "Multi-Service", jobs: 21, revenue: 12700, users: 6, status: "trial", growth: 0 },
];

const CUSTOMERS = [
  { id: "C001", name: "Aria Chen", phone: "+1 555 0566", email: "aria.chen@gmail.com", vehicle: "Porsche Cayenne 2024", plate: "PCH 0024", tier: "PLATINUM", lastVisit: "May 22, 2026", totalSpend: 5042, jobs: 7, status: "active" },
  { id: "C002", name: "Marcus Reid", phone: "+1 555 0142", email: "m.reid@email.com", vehicle: "Toyota Camry 2021", plate: "TXK 4821", tier: "GOLD", lastVisit: "May 23, 2026", totalSpend: 2840, jobs: 14, status: "active" },
  { id: "C003", name: "James Okafor", phone: "+1 555 0277", email: "james.ok@business.net", vehicle: "BMW 3 Series 2020", plate: "BWM 3301", tier: "GOLD", lastVisit: "May 22, 2026", totalSpend: 3210, jobs: 11, status: "active" },
  { id: "C004", name: "Sofia Hernandez", phone: "+1 555 0199", email: "sofia.h@gmail.com", vehicle: "Honda CR-V 2023", plate: "MNX 7734", tier: "SILVER", lastVisit: "May 23, 2026", totalSpend: 1480, jobs: 6, status: "active" },
  { id: "C005", name: "Nina Blackwood", phone: "+1 555 0388", email: "n.blackwood@corp.io", vehicle: "Audi Q5 2022", plate: "AUD 9912", tier: "SILVER", lastVisit: "May 23, 2026", totalSpend: 1920, jobs: 8, status: "active" },
  { id: "C006", name: "Derek Flint", phone: "+1 555 0774", email: "dflint@motorheads.com", vehicle: "Jeep Wrangler 2018", plate: "JWR 0018", tier: "STANDARD", lastVisit: "May 21, 2026", totalSpend: 870, jobs: 3, status: "active" },
  { id: "C007", name: "Tom Walsh", phone: "+1 555 0421", email: "twalsh@email.com", vehicle: "Ford F-150 2019", plate: "FRD 5500", tier: "STANDARD", lastVisit: "May 23, 2026", totalSpend: 540, jobs: 5, status: "active" },
  { id: "C008", name: "Rachel Kim", phone: "+1 555 0612", email: "r.kim@studio.io", vehicle: "Tesla Model 3 2023", plate: "TSL 0023", tier: "GOLD", lastVisit: "May 20, 2026", totalSpend: 2100, jobs: 9, status: "active" },
  { id: "C009", name: "Victor Osei", phone: "+1 555 0833", email: "v.osei@corp.net", vehicle: "Mercedes C-Class 2022", plate: "MBC 2022", tier: "PLATINUM", lastVisit: "May 19, 2026", totalSpend: 7340, jobs: 22, status: "active" },
  { id: "C010", name: "Priya Sharma", phone: "+1 555 0944", email: "p.sharma@med.org", vehicle: "Toyota RAV4 2021", plate: "TRV 4001", tier: "SILVER", lastVisit: "May 15, 2026", totalSpend: 1140, jobs: 4, status: "inactive" },
];

const VENDORS = [
  { id: "V001", name: "AutoParts Plus", category: "Parts & Components", contact: "+1 555 1201", email: "orders@autopartsplus.com", rating: 5, status: "active", lastOrder: "May 21, 2026", totalOrders: 142, spend: 48200 },
  { id: "V002", name: "CleanChem Supplies", category: "Chemicals & Consumables", contact: "+1 555 1342", email: "sales@cleanchem.com", rating: 4, status: "active", lastOrder: "May 20, 2026", totalOrders: 89, spend: 12400 },
  { id: "V003", name: "ToolMaster Pro", category: "Tools & Equipment", contact: "+1 555 1488", email: "info@toolmaster.pro", rating: 4, status: "active", lastOrder: "May 18, 2026", totalOrders: 34, spend: 28900 },
  { id: "V004", name: "PrimePaint Co.", category: "Paint & Finishing", contact: "+1 555 1590", email: "orders@primepaint.co", rating: 5, status: "active", lastOrder: "May 22, 2026", totalOrders: 67, spend: 31500 },
  { id: "V005", name: "TechElec Supplies", category: "Electrical Components", contact: "+1 555 1677", email: "supply@techelec.com", rating: 3, status: "active", lastOrder: "May 15, 2026", totalOrders: 23, spend: 9800 },
  { id: "V006", name: "SafetyFirst Gear", category: "Safety Equipment", contact: "+1 555 1744", email: "orders@safetyfirst.com", rating: 4, status: "active", lastOrder: "May 10, 2026", totalOrders: 18, spend: 4200 },
  { id: "V007", name: "DetailKing Supplies", category: "Detailing Products", contact: "+1 555 1899", email: "info@detailking.com", rating: 5, status: "active", lastOrder: "May 23, 2026", totalOrders: 98, spend: 18700 },
  { id: "V008", name: "OilTech Direct", category: "Lubricants & Fluids", contact: "+1 555 1956", email: "sales@oiltech.direct", rating: 4, status: "active", lastOrder: "May 19, 2026", totalOrders: 77, spend: 22100 },
  { id: "V009", name: "TyreWorld Imports", category: "Tyres & Wheels", contact: "+1 555 2011", email: "orders@tyreworld.com", rating: 4, status: "pending", lastOrder: "—", totalOrders: 0, spend: 0 },
  { id: "V010", name: "AutoGlass Pro", category: "Glass & Windshields", contact: "+1 555 2144", email: "quote@autoglass.pro", rating: 0, status: "pending", lastOrder: "—", totalOrders: 0, spend: 0 },
];

const REVENUE_DATA = [
  { day: "Mon", revenue: 2840, jobs: 11 },
  { day: "Tue", revenue: 3200, jobs: 13 },
  { day: "Wed", revenue: 2100, jobs: 8 },
  { day: "Thu", revenue: 3840, jobs: 15 },
  { day: "Fri", revenue: 4200, jobs: 18 },
  { day: "Sat", revenue: 5100, jobs: 22 },
  { day: "Sun", revenue: 3600, jobs: 14 },
];

const TENANT_REVENUE = [
  { branch: "Apex Auto", revenue: 42100 },
  { branch: "Primus Detail", revenue: 28400 },
  { branch: "Gleam Wash", revenue: 22400 },
  { branch: "Iron Wrench", revenue: 18900 },
  { branch: "Metro Auto", revenue: 12700 },
];

const SYSTEM_EVENTS = [
  { time: "09:42", event: "New branch registered: Speed Auto Centre", type: "success" },
  { time: "09:15", event: "Payment gateway timeout — Gleam Car Wash", type: "warning" },
  { time: "08:55", event: "Database backup completed successfully", type: "success" },
  { time: "08:30", event: "5 new user accounts activated", type: "info" },
  { time: "07:14", event: "API rate limit reached — Metro Auto Care", type: "warning" },
  { time: "06:00", event: "Nightly audit log sync completed", type: "success" },
];

const TECHNICIANS = [
  { name: "Dion Harris", role: "Senior Technician", jobs: 2, capacity: 4, status: "available" },
  { name: "Kyle Simmons", role: "Master Detailer", jobs: 3, capacity: 4, status: "busy" },
  { name: "Sam Ortega", role: "Master Detailer", jobs: 1, capacity: 3, status: "available" },
  { name: "Raj Patel", role: "Mechanic", jobs: 2, capacity: 4, status: "available" },
];

const fmt = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

// ── Shared helpers ────────────────────────────────────────────────────
function StatCard({
  label, value, sub, icon, iconBg, iconColor, trend, trendVal,
}: {
  label: string; value: string; sub?: string;
  icon: React.ReactNode; iconBg: string; iconColor: string;
  trend?: "up" | "down" | "neutral"; trendVal?: string;
}) {
  return (
    <div className="bg-white rounded-xl border border-slate-100 p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-[11px] text-slate-400 font-semibold uppercase tracking-widest">{label}</p>
          <p className="text-2xl font-bold text-slate-900 mt-1.5" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>{value}</p>
          {sub && <p className="text-xs text-slate-400 mt-0.5">{sub}</p>}
          {trend && trendVal && (
            <div className={`flex items-center gap-1 mt-1.5 text-xs font-semibold ${
              trend === "up" ? "text-emerald-600" : trend === "down" ? "text-red-500" : "text-slate-400"
            }`}>
              {trend === "up" ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
              {trendVal}
            </div>
          )}
        </div>
        <div className="p-3 rounded-xl flex-shrink-0" style={{ backgroundColor: iconBg }}>
          <span style={{ color: iconColor }}>{icon}</span>
        </div>
      </div>
    </div>
  );
}

function SectionHeading({ title, action }: { title: string; action?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-sm font-bold text-slate-900 uppercase tracking-widest">{title}</h2>
      {action}
    </div>
  );
}

function Badge({ label, color }: { label: string; color: "green" | "amber" | "red" | "blue" | "slate" | "purple" }) {
  const cfg = {
    green: "bg-emerald-100 text-emerald-700",
    amber: "bg-amber-100 text-amber-700",
    red: "bg-red-100 text-red-600",
    blue: "bg-blue-100 text-blue-700",
    slate: "bg-slate-100 text-slate-500",
    purple: "bg-purple-100 text-purple-700",
  };
  return (
    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide ${cfg[color]}`}>
      {label}
    </span>
  );
}

function TierBadge({ tier }: { tier: string }) {
  const cfg: Record<string, { bg: string; text: string }> = {
    PLATINUM: { bg: "bg-purple-100", text: "text-purple-700" },
    GOLD: { bg: "bg-amber-100", text: "text-amber-700" },
    SILVER: { bg: "bg-slate-100", text: "text-slate-600" },
    STANDARD: { bg: "bg-gray-100", text: "text-gray-500" },
  };
  const c = cfg[tier] ?? cfg.STANDARD;
  return (
    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide ${c.bg} ${c.text}`}>
      {tier.charAt(0) + tier.slice(1).toLowerCase()}
    </span>
  );
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={11}
          className={i <= rating ? "text-amber-400 fill-amber-400" : "text-slate-200 fill-slate-200"}
        />
      ))}
    </div>
  );
}

function ActionBtn({ onClick, icon, label, variant = "secondary" }: {
  onClick?: () => void; icon: React.ReactNode; label: string;
  variant?: "primary" | "secondary";
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
        variant === "primary"
          ? "text-white"
          : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
      }`}
      style={variant === "primary" ? { backgroundColor: P } : {}}
    >
      {icon}
      {label}
    </button>
  );
}

// ── Page 1: Super Admin ───────────────────────────────────────────────
function SuperAdminPage() {
  const [expandedBranch, setExpandedBranch] = useState<string | null>(null);

  const totalRevenue = BRANCHES.reduce((a, b) => a + b.revenue, 0);
  const totalJobs = BRANCHES.reduce((a, b) => a + b.jobs, 0);
  const totalUsers = BRANCHES.reduce((a, b) => a + b.users, 0);

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        <StatCard label="Total Branches" value={String(BRANCHES.length)} sub="+1 this month" icon={<Building2 size={18} />} iconBg="#EEF2FF" iconColor="#6366F1" trend="up" trendVal="+1 branch" />
        <StatCard label="Total Users" value={String(totalUsers)} sub="across all branches" icon={<Users size={18} />} iconBg="#F0FDF4" iconColor="#22C55E" trend="up" trendVal="+12 this month" />
        <StatCard label="Monthly Revenue" value={fmt.format(totalRevenue)} sub="May 2026" icon={<DollarSign size={18} />} iconBg="#FFF7ED" iconColor="#F97316" trend="up" trendVal="+18.4% vs Apr" />
        <StatCard label="Active Job Cards" value={String(totalJobs)} sub="all branches combined" icon={<Briefcase size={18} />} iconBg="#EFF6FF" iconColor="#3B82F6" trend="up" trendVal="+47 this week" />
        <StatCard label="System Uptime" value="99.9%" sub="last 30 days" icon={<Activity size={18} />} iconBg="#F0FDFA" iconColor="#14B8A6" trend="neutral" trendVal="SLA met" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-5">
        {/* Branch table */}
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-50">
            <div>
              <h2 className="text-sm font-bold text-slate-900">Branch Overview</h2>
              <p className="text-xs text-slate-400 mt-0.5">All registered branches and their performance</p>
            </div>
            <div className="flex gap-2">
              <ActionBtn icon={<Download size={12} />} label="Export" />
              <ActionBtn icon={<Plus size={12} />} label="Add Branch" variant="primary" />
            </div>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-50">
                {["Branch", "Type", "Jobs", "Revenue", "Users", "Growth", "Status", ""].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[10px] font-bold text-slate-400 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {BRANCHES.map((b, i) => (
                <tr
                  key={b.id}
                  className={`border-b border-slate-50 hover:bg-slate-50/60 transition-colors cursor-pointer ${expandedBranch === b.id ? "bg-blue-50/40" : ""}`}
                  onClick={() => setExpandedBranch(expandedBranch === b.id ? null : b.id)}
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-white" style={{ backgroundColor: P }}>
                        {b.name.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <div className="font-semibold text-slate-800 text-xs">{b.name}</div>
                        <div className="text-[10px] text-slate-400 font-mono">{b.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs text-slate-500">{b.type}</td>
                  <td className="px-4 py-3 text-xs font-semibold text-slate-700">{b.jobs}</td>
                  <td className="px-4 py-3 text-xs font-bold text-slate-800">{fmt.format(b.revenue)}</td>
                  <td className="px-4 py-3 text-xs text-slate-500">{b.users}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-semibold flex items-center gap-1 ${b.growth > 0 ? "text-emerald-600" : b.growth < 0 ? "text-red-500" : "text-slate-400"}`}>
                      {b.growth > 0 ? <TrendingUp size={11} /> : b.growth < 0 ? <TrendingDown size={11} /> : null}
                      {b.growth !== 0 ? `${b.growth > 0 ? "+" : ""}${b.growth}%` : "—"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <Badge label={b.status} color={b.status === "active" ? "green" : "amber"} />
                  </td>
                  <td className="px-4 py-3">
                    <button className="p-1 rounded-md hover:bg-slate-100 text-slate-400 transition-colors">
                      <MoreHorizontal size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-5">
          {/* System health */}
          <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-5">
            <SectionHeading title="System Health" action={<RefreshCw size={13} className="text-slate-400 cursor-pointer hover:text-slate-600" />} />
            <div className="space-y-3">
              {[
                { label: "API Uptime", value: "99.9%", icon: <Globe size={13} />, pct: 99, color: "#22c55e" },
                { label: "DB Response", value: "42 ms", icon: <Database size={13} />, pct: 90, color: "#3b82f6" },
                { label: "Active Sessions", value: "234", icon: <Wifi size={13} />, pct: 58, color: P },
                { label: "Storage Used", value: "67%", icon: <Server size={13} />, pct: 67, color: "#f59e0b" },
                { label: "Cache Hit Rate", value: "94%", icon: <Cpu size={13} />, pct: 94, color: "#14b8a6" },
              ].map((row) => (
                <div key={row.label}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="flex items-center gap-1.5 text-xs text-slate-600" style={{ color: row.color }}>{row.icon}<span className="text-slate-600">{row.label}</span></span>
                    <span className="text-xs font-bold text-slate-700">{row.value}</span>
                  </div>
                  <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all" style={{ width: `${row.pct}%`, backgroundColor: row.color }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Activity log */}
          <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-5 flex-1">
            <SectionHeading title="System Events" />
            <div className="space-y-2.5">
              {SYSTEM_EVENTS.map((e, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <div className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${
                    e.type === "success" ? "bg-emerald-400" : e.type === "warning" ? "bg-amber-400" : "bg-blue-400"
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-slate-600 leading-snug">{e.event}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5 font-mono">{e.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Revenue by branch chart */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-5">
        <SectionHeading title="Revenue by Branch — May 2026" />
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={TENANT_REVENUE} margin={{ top: 4, right: 8, left: 0, bottom: 4 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis dataKey="branch" tick={{ fontSize: 11, fill: "#64748b" }} axisLine={false} tickLine={false} />
            <YAxis tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
            <Tooltip formatter={(v: number) => [fmt.format(v), "Revenue"]} contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #e2e8f0" }} />
            <Bar dataKey="revenue" fill={P} radius={[4, 4, 0, 0]} isAnimationActive={false} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// ── Page 2: Admin Dashboard ───────────────────────────────────────────
function AdminPage() {
  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Jobs Today" value="15" sub="+3 vs yesterday" icon={<Briefcase size={18} />} iconBg="#EFF6FF" iconColor="#3B82F6" trend="up" trendVal="+3 jobs" />
        <StatCard label="In Progress" value="5" sub="active right now" icon={<Clock size={18} />} iconBg="#FFF7ED" iconColor="#F97316" />
        <StatCard label="Revenue Today" value="$3,840" sub="May 31, 2026" icon={<DollarSign size={18} />} iconBg="#F0FDF4" iconColor="#22C55E" trend="up" trendVal="+12% vs yesterday" />
        <StatCard label="Pending Queue" value="7" sub="awaiting assignment" icon={<AlertCircle size={18} />} iconBg="#FEF2F2" iconColor="#EF4444" trend="down" trendVal="2 urgent" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-5">
        {/* Revenue chart */}
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-5">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-sm font-bold text-slate-900">Weekly Revenue</h2>
              <p className="text-xs text-slate-400 mt-0.5">Apex Auto Service · This week</p>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold" style={{ color: P }}>
              <TrendingUp size={13} />
              <span>+11.4% vs last week</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={REVENUE_DATA} margin={{ top: 4, right: 8, left: 0, bottom: 4 }}>
              <defs>
                <linearGradient id="crm-rev-grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={P} stopOpacity={0.15} />
                  <stop offset="95%" stopColor={P} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <YAxis tickFormatter={(v) => `$${(v / 1000).toFixed(1)}k`} tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <Tooltip formatter={(v: number) => [fmt.format(v), "Revenue"]} contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #e2e8f0" }} />
              <Area type="monotone" dataKey="revenue" stroke={P} strokeWidth={2} fill="url(#crm-rev-grad)" dot={{ r: 3, fill: P }} activeDot={{ r: 5 }} isAnimationActive={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Technician status */}
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-5">
          <SectionHeading title="Technician Status" />
          <div className="space-y-3">
            {TECHNICIANS.map((tech) => (
              <div key={tech.name} className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0" style={{ backgroundColor: P }}>
                    {tech.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-slate-800">{tech.name}</div>
                    <div className="text-[10px] text-slate-400">{tech.role}</div>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <Badge label={tech.status} color={tech.status === "available" ? "green" : "amber"} />
                  <div className="text-[10px] text-slate-400">{tech.jobs}/{tech.capacity} jobs</div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-3 border-t border-slate-50 flex items-center justify-between">
            <span className="text-xs text-slate-400">3 available · 1 busy</span>
            <button className="text-xs font-semibold" style={{ color: P }}>Manage staff →</button>
          </div>
        </div>
      </div>

      {/* Job pipeline */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-50">
          <div>
            <h2 className="text-sm font-bold text-slate-900">Job Card Pipeline</h2>
            <p className="text-xs text-slate-400 mt-0.5">Today's active and pending jobs</p>
          </div>
          <ActionBtn icon={<Plus size={12} />} label="New Job Card" variant="primary" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-4 divide-x divide-slate-50">
          {[
            { status: "Pending", count: 7, color: "#f59e0b", jobs: ["Marcus Reid – Full Service", "Sofia H. – AC Service", "Nina B. – Diagnostics", "…4 more"] },
            { status: "In Progress", count: 5, color: P, jobs: ["James O. – Brake Service", "Tom W. – Oil Change", "Aria C. – Ceramic Coat", "…2 more"] },
            { status: "QC / Review", count: 2, color: "#8b5cf6", jobs: ["Derek F. – Suspension", "Rachel K. – Detail Pack"] },
            { status: "Completed", count: 8, color: "#22c55e", jobs: ["Victor O. – Full Detail", "Priya S. – AC Check", "…6 more"] },
          ].map((col) => (
            <div key={col.status} className="p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">{col.status}</span>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full text-white" style={{ backgroundColor: col.color }}>
                  {col.count}
                </span>
              </div>
              <div className="space-y-2">
                {col.jobs.map((j, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-slate-600 py-1.5 px-2 rounded-lg bg-slate-50/70">
                    <div className="w-1 h-1 rounded-full flex-shrink-0" style={{ backgroundColor: col.color }} />
                    {j}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Page 3: Customer Management ───────────────────────────────────────
function CustomerManagementPage() {
  const [search, setSearch] = useState("");
  const [tierFilter, setTierFilter] = useState<string>("ALL");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");

  const filtered = useMemo(() =>
    CUSTOMERS.filter((c) => {
      const q = search.toLowerCase();
      const matchSearch = !q || c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q) || c.vehicle.toLowerCase().includes(q) || c.plate.toLowerCase().includes(q);
      const matchTier = tierFilter === "ALL" || c.tier === tierFilter;
      const matchStatus = statusFilter === "ALL" || c.status === statusFilter;
      return matchSearch && matchTier && matchStatus;
    }),
    [search, tierFilter, statusFilter]
  );

  const totalSpend = CUSTOMERS.reduce((a, c) => a + c.totalSpend, 0);
  const vip = CUSTOMERS.filter((c) => c.tier === "GOLD" || c.tier === "PLATINUM").length;
  const newThisMonth = 48;

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Customers" value="1,247" sub="+48 this month" icon={<Users size={18} />} iconBg="#EFF6FF" iconColor="#3B82F6" trend="up" trendVal="+48 new" />
        <StatCard label="Active This Month" value="342" sub="visited in May" icon={<UserCheck size={18} />} iconBg="#F0FDF4" iconColor="#22C55E" />
        <StatCard label="VIP Customers" value={String(vip)} sub="Gold + Platinum tier" icon={<Crown size={18} />} iconBg="#FAF5FF" iconColor="#A855F7" />
        <StatCard label="Avg. Lifetime Value" value={fmt.format(Math.round(totalSpend / CUSTOMERS.length))} sub="per customer" icon={<DollarSign size={18} />} iconBg="#FFF7ED" iconColor="#F97316" trend="up" trendVal="+8% vs last month" />
      </div>

      {/* Toolbar */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative flex-1">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <input
              className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:border-blue-300 transition-colors"
              placeholder="Search by name, email, vehicle or plate…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {["ALL", "PLATINUM", "GOLD", "SILVER", "STANDARD"].map((t) => (
              <button
                key={t}
                onClick={() => setTierFilter(t)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                  tierFilter === t ? "text-white border-transparent" : "bg-white border-slate-200 text-slate-500 hover:bg-slate-50"
                }`}
                style={tierFilter === t ? { backgroundColor: P, borderColor: P } : {}}
              >
                {t === "ALL" ? "All Tiers" : t.charAt(0) + t.slice(1).toLowerCase()}
              </button>
            ))}
          </div>
          <ActionBtn icon={<Plus size={12} />} label="Add Customer" variant="primary" />
        </div>
        <div className="mt-2 text-[11px] text-slate-400">
          Showing {filtered.length} of {CUSTOMERS.length} customers
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/60">
              {["Customer", "Contact", "Vehicle", "Tier", "Total Spend", "Jobs", "Last Visit", "Status", ""].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-[10px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((c) => (
              <tr key={c.id} className="border-b border-slate-50 hover:bg-slate-50/40 transition-colors">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0" style={{ backgroundColor: P }}>
                      {c.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <div>
                      <div className="font-semibold text-slate-800 text-xs whitespace-nowrap">{c.name}</div>
                      <div className="text-[10px] text-slate-400 font-mono">{c.id}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="text-xs text-slate-600 whitespace-nowrap">{c.phone}</div>
                  <div className="text-[10px] text-slate-400 truncate max-w-[140px]">{c.email}</div>
                </td>
                <td className="px-4 py-3">
                  <div className="text-xs text-slate-700 whitespace-nowrap">{c.vehicle}</div>
                  <div className="text-[10px] font-mono text-slate-400">{c.plate}</div>
                </td>
                <td className="px-4 py-3">
                  <TierBadge tier={c.tier} />
                </td>
                <td className="px-4 py-3 text-xs font-bold text-slate-800 whitespace-nowrap">{fmt.format(c.totalSpend)}</td>
                <td className="px-4 py-3 text-xs text-slate-600 text-center">{c.jobs}</td>
                <td className="px-4 py-3 text-xs text-slate-500 whitespace-nowrap">{c.lastVisit}</td>
                <td className="px-4 py-3">
                  <Badge label={c.status} color={c.status === "active" ? "green" : "slate"} />
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1">
                    <button className="p-1 rounded-md hover:bg-slate-100 text-slate-400 transition-colors"><Eye size={12} /></button>
                    <button className="p-1 rounded-md hover:bg-slate-100 text-slate-400 transition-colors"><Edit size={12} /></button>
                    <button className="p-1 rounded-md hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors"><Trash2 size={12} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex items-center justify-between px-5 py-3 border-t border-slate-50">
          <span className="text-xs text-slate-400">{filtered.length} records</span>
          <div className="flex gap-1">
            {[1, 2, 3, "…", 125].map((p, i) => (
              <button key={i} className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${p === 1 ? "text-white" : "text-slate-500 hover:bg-slate-100"}`} style={p === 1 ? { backgroundColor: P } : {}}>
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Page 4: Vendor Management ─────────────────────────────────────────
function VendorManagementPage() {
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("All");

  const categories = ["All", ...Array.from(new Set(VENDORS.map((v) => v.category)))];

  const filtered = useMemo(() =>
    VENDORS.filter((v) => {
      const q = search.toLowerCase();
      const matchSearch = !q || v.name.toLowerCase().includes(q) || v.category.toLowerCase().includes(q);
      const matchCat = catFilter === "All" || v.category === catFilter;
      return matchSearch && matchCat;
    }),
    [search, catFilter]
  );

  const totalSpend = VENDORS.reduce((a, v) => a + v.spend, 0);
  const active = VENDORS.filter((v) => v.status === "active").length;
  const pending = VENDORS.filter((v) => v.status === "pending").length;

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Vendors" value={String(VENDORS.length)} sub="registered vendors" icon={<Truck size={18} />} iconBg="#FFF7ED" iconColor="#F97316" trend="up" trendVal="+3 this month" />
        <StatCard label="Active Vendors" value={String(active)} sub="currently active" icon={<CheckCircle2 size={18} />} iconBg="#F0FDF4" iconColor="#22C55E" />
        <StatCard label="Pending Approval" value={String(pending)} sub="awaiting review" icon={<Clock size={18} />} iconBg="#FEF2F2" iconColor="#EF4444" />
        <StatCard label="Total Procurement" value={fmt.format(totalSpend)} sub="all-time spend" icon={<DollarSign size={18} />} iconBg="#EFF6FF" iconColor="#3B82F6" trend="up" trendVal="+21% this month" />
      </div>

      {/* Toolbar */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-3">
          <div className="relative flex-1">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <input
              className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:border-blue-300 transition-colors"
              placeholder="Search vendors by name or category…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <ActionBtn icon={<Download size={12} />} label="Export" />
            <ActionBtn icon={<Upload size={12} />} label="Import" />
            <ActionBtn icon={<Plus size={12} />} label="Add Vendor" variant="primary" />
          </div>
        </div>
        <div className="flex gap-2 flex-wrap">
          {categories.slice(0, 8).map((cat) => (
            <button
              key={cat}
              onClick={() => setCatFilter(cat)}
              className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all ${
                catFilter === cat ? "text-white border-transparent" : "bg-white border-slate-200 text-slate-500 hover:bg-slate-50"
              }`}
              style={catFilter === cat ? { backgroundColor: P, borderColor: P } : {}}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Vendor table */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/60">
              {["Vendor", "Category", "Contact", "Rating", "Orders", "Total Spend", "Last Order", "Status", ""].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-[10px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((v) => (
              <tr key={v.id} className="border-b border-slate-50 hover:bg-slate-50/40 transition-colors">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0" style={{ backgroundColor: "#FFF7ED", color: "#F97316" }}>
                      {v.name.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <div className="font-semibold text-slate-800 text-xs whitespace-nowrap">{v.name}</div>
                      <div className="text-[10px] text-slate-400 font-mono">{v.id}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full whitespace-nowrap">{v.category}</span>
                </td>
                <td className="px-4 py-3">
                  <div className="text-xs text-slate-600 whitespace-nowrap">{v.contact}</div>
                  <div className="text-[10px] text-slate-400 truncate max-w-[140px]">{v.email}</div>
                </td>
                <td className="px-4 py-3">
                  {v.rating > 0 ? <StarRating rating={v.rating} /> : <span className="text-[10px] text-slate-300">Not rated</span>}
                </td>
                <td className="px-4 py-3 text-xs text-slate-600 text-center">{v.totalOrders}</td>
                <td className="px-4 py-3 text-xs font-bold text-slate-800 whitespace-nowrap">
                  {v.spend > 0 ? fmt.format(v.spend) : "—"}
                </td>
                <td className="px-4 py-3 text-xs text-slate-500 whitespace-nowrap">{v.lastOrder}</td>
                <td className="px-4 py-3">
                  <Badge label={v.status} color={v.status === "active" ? "green" : "amber"} />
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1">
                    <button className="p-1 rounded-md hover:bg-slate-100 text-slate-400 transition-colors"><Eye size={12} /></button>
                    <button className="p-1 rounded-md hover:bg-slate-100 text-slate-400 transition-colors"><Edit size={12} /></button>
                    <button className="p-1 rounded-md hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors"><Trash2 size={12} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex items-center justify-between px-5 py-3 border-t border-slate-50">
          <span className="text-xs text-slate-400">{filtered.length} of {VENDORS.length} vendors</span>
          <div className="flex gap-1">
            {[1, 2, 3].map((p) => (
              <button key={p} className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${p === 1 ? "text-white" : "text-slate-500 hover:bg-slate-100"}`} style={p === 1 ? { backgroundColor: P } : {}}>
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Sidebar nav config ────────────────────────────────────────────────
const NAV_GROUPS = [
  {
    label: null,
    items: [
      { id: "super-admin" as CRMPage, label: "Super Admin", icon: Crown, badge: null },
      { id: "admin" as CRMPage, label: "Admin Dashboard", icon: LayoutDashboard, badge: null },
    ],
  },
  {
    label: "Operations",
    items: [
      { id: "customers" as CRMPage, label: "Customers", icon: Users, badge: "1,247" },
      { id: null, label: "Appointments", icon: Calendar, badge: null },
      { id: null, label: "Job Cards", icon: Briefcase, badge: "23" },
      { id: null, label: "Billing", icon: Receipt, badge: null },
      { id: "vendors" as CRMPage, label: "Vendors", icon: Truck, badge: "84" },
    ],
  },
  {
    label: "Analytics",
    items: [
      { id: null, label: "Reports", icon: BarChart2, badge: null },
      { id: null, label: "Audit Logs", icon: FileText, badge: null },
    ],
  },
  {
    label: "System",
    items: [
      { id: null, label: "Inventory", icon: Package, badge: null },
      { id: null, label: "Integrations", icon: Link2, badge: null },
      { id: null, label: "Settings", icon: Settings, badge: null },
    ],
  },
];

const PAGE_META: Record<CRMPage, { title: string; subtitle: string; role: string; roleIcon: React.ReactNode }> = {
  "super-admin": { title: "System Overview", subtitle: "Global platform management · All branches", role: "Super Admin", roleIcon: <Crown size={12} /> },
  admin: { title: "Admin Dashboard", subtitle: "Apex Auto Service · May 31, 2026", role: "Branch Admin", roleIcon: <ShieldCheck size={12} /> },
  customers: { title: "Customer Management", subtitle: "Manage and track all customers", role: "Branch Admin", roleIcon: <ShieldCheck size={12} /> },
  vendors: { title: "Vendor Management", subtitle: "Manage suppliers and procurement", role: "Branch Admin", roleIcon: <ShieldCheck size={12} /> },
};

// ── Main CRMView export ───────────────────────────────────────────────
export default function CRMView() {
  const [activePage, setActivePage] = useState<CRMPage>("super-admin");
  const [notifOpen, setNotifOpen] = useState(false);
  const meta = PAGE_META[activePage];

  const handleNav = (id: CRMPage | null) => {
    if (id) setActivePage(id);
  };

  return (
    <div className="flex h-[calc(100vh-3.5rem)] overflow-hidden" style={{ backgroundColor: "#f0f2ff", fontFamily: "'DM Sans', system-ui, sans-serif" }}>

      {/* ── Sidebar ──────────────────────────────────────────────── */}
      <aside className="w-56 bg-white border-r border-slate-100 flex flex-col flex-shrink-0 overflow-y-auto [&::-webkit-scrollbar]:hidden">
        {/* Logo */}
        <div className="flex items-center gap-2.5 px-4 py-4 border-b border-slate-50">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ backgroundColor: P }}>
            <Zap size={15} className="text-white" />
          </div>
          <div>
            <div className="text-sm font-bold text-slate-900" style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.05em" }}>SHYNTRAA</div>
            <div className="text-[9px] text-slate-400 uppercase tracking-widest">Automotive CRM</div>
          </div>
        </div>

        {/* Branch selector */}
        <div className="px-3 py-2.5 border-b border-slate-50">
          <button className="w-full flex items-center justify-between gap-2 px-3 py-2 rounded-lg bg-slate-50 border border-slate-100 hover:bg-slate-100 transition-colors">
            <div className="flex items-center gap-2 min-w-0">
              <Building2 size={12} className="text-slate-400 flex-shrink-0" />
              <span className="text-xs font-semibold text-slate-700 truncate">Apex Auto Service</span>
            </div>
            <ChevronDown size={12} className="text-slate-400 flex-shrink-0" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-3 space-y-4">
          {NAV_GROUPS.map((group, gi) => (
            <div key={gi}>
              {group.label && (
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest px-2 mb-1.5">{group.label}</p>
              )}
              <div className="space-y-0.5">
                {group.items.map((item, ii) => {
                  const Icon = item.icon;
                  const isActive = activePage === item.id;
                  const isClickable = item.id !== null;
                  return (
                    <button
                      key={ii}
                      onClick={() => handleNav(item.id)}
                      disabled={!isClickable}
                      className={`w-full flex items-center justify-between gap-2 px-3 py-2 rounded-lg text-left transition-all ${
                        isActive
                          ? "text-white"
                          : isClickable
                          ? "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                          : "text-slate-400 cursor-default opacity-60"
                      }`}
                      style={isActive ? { backgroundColor: P } : {}}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <Icon size={14} className={isActive ? "text-white" : "text-slate-400"} />
                        <span className="text-xs font-medium truncate">{item.label}</span>
                      </div>
                      {item.badge && (
                        <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold flex-shrink-0 ${
                          isActive ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"
                        }`}>
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* User */}
        <div className="px-3 py-3 border-t border-slate-50">
          <div className="flex items-center gap-2.5 px-2 py-2 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer">
            <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0" style={{ backgroundColor: P }}>
              SA
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-semibold text-slate-700 truncate">System Admin</div>
              <div className="text-[10px] text-slate-400 truncate">admin@shyntraa.com</div>
            </div>
            <Settings size={12} className="text-slate-400 flex-shrink-0" />
          </div>
        </div>
      </aside>

      {/* ── Main area ────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-14 bg-white border-b border-slate-100 flex items-center px-5 gap-4 flex-shrink-0">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h1 className="text-sm font-bold text-slate-900">{meta.title}</h1>
              <span className="hidden md:flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ backgroundColor: PL, color: P }}>
                {meta.roleIcon}
                {meta.role}
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5 hidden sm:block">{meta.subtitle}</p>
          </div>

          {/* Search */}
          <div className="relative hidden md:block w-56">
            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <input
              className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700 placeholder-slate-400 focus:outline-none focus:border-blue-300 transition-colors"
              placeholder="Search anything…"
            />
          </div>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setNotifOpen((o) => !o)}
              className="relative p-2 rounded-lg hover:bg-slate-50 text-slate-500 transition-colors"
            >
              <Bell size={16} />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500" />
            </button>
            {notifOpen && (
              <>
                <div className="fixed inset-0 z-30" onClick={() => setNotifOpen(false)} />
                <div className="absolute right-0 top-full mt-2 w-72 bg-white border border-slate-100 rounded-xl shadow-xl z-40 overflow-hidden">
                  <div className="px-4 py-3 border-b border-slate-50 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800">Notifications</span>
                    <span className="text-[10px] font-semibold" style={{ color: P }}>Mark all read</span>
                  </div>
                  {SYSTEM_EVENTS.slice(0, 4).map((e, i) => (
                    <div key={i} className="flex items-start gap-3 px-4 py-3 border-b border-slate-50 hover:bg-slate-50 transition-colors">
                      <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${e.type === "success" ? "bg-emerald-400" : e.type === "warning" ? "bg-amber-400" : "bg-blue-400"}`} />
                      <div>
                        <p className="text-xs text-slate-700">{e.event}</p>
                        <p className="text-[10px] text-slate-400 mt-0.5">{e.time} today</p>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* User */}
          <div className="flex items-center gap-2 pl-2 border-l border-slate-100">
            <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0" style={{ backgroundColor: P }}>
              SA
            </div>
            <div className="hidden sm:block">
              <div className="text-xs font-semibold text-slate-700">Admin</div>
              <div className="text-[9px] text-slate-400">{meta.role}</div>
            </div>
            <ChevronDown size={13} className="text-slate-400" />
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-5 [&::-webkit-scrollbar]:hidden">
          {activePage === "super-admin" && <SuperAdminPage />}
          {activePage === "admin" && <AdminPage />}
          {activePage === "customers" && <CustomerManagementPage />}
          {activePage === "vendors" && <VendorManagementPage />}
        </main>
      </div>
    </div>
  );
}
