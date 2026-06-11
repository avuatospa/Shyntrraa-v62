import React, { useState, useId } from "react";
import {
  DollarSign, Wrench, Users, Clock, TrendingUp, TrendingDown, Star,
  AlertCircle, Activity, Zap, ClipboardList, Car, Target, BarChart3,
  Brain, CheckCircle, ArrowUpRight, Cpu, Building2, Package, CreditCard,
  Receipt, BookOpen, Globe, Shield, Server, Layers, TrendingDown as TrendDown
} from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, LineChart, Line
} from "recharts";

// ── Design Tokens (DTF App-D) ─────────────────────────────────────────────────
const T = {
  bg: "#0B1120",
  surface: "#111827",
  surfaceHover: "#1a2438",
  card: "#111827",
  border: "rgba(255,255,255,0.08)",
  borderActive: "rgba(0,229,255,0.25)",
  text: "#F9FAFB",
  muted: "#9CA3AF",
  dim: "#374151",
  disabled: "#1F2937",
  primary: "#00E5FF",
  success: "#10B981",
  warning: "#F59E0B",
  danger: "#EF4444",
  ai: "#A3E635",
  // aliases for readability
  amber: "#F59E0B", blue: "#00E5FF", green: "#10B981",
  red: "#EF4444", purple: "#7C3AED", cyan: "#00E5FF",
  orange: "#F97316", lime: "#A3E635",
};
const G: Record<string, string> = {
  amber: "linear-gradient(135deg,#f59e0b,#f97316)",
  blue: "linear-gradient(135deg,#3b82f6,#6366f1)",
  green: "linear-gradient(135deg,#22c55e,#10b981)",
  purple: "linear-gradient(135deg,#a855f7,#6366f1)",
  cyan: "linear-gradient(135deg,#06b6d4,#3b82f6)",
  red: "linear-gradient(135deg,#ef4444,#f97316)",
  teal: "linear-gradient(135deg,#14b8a6,#06b6d4)",
  indigo: "linear-gradient(135deg,#6366f1,#a855f7)",
  gold: "linear-gradient(135deg,#f59e0b,#eab308)",
  rose: "linear-gradient(135deg,#f43f5e,#ec4899)",
};

// ── Sparkline (pure SVG, no recharts) ────────────────────────────────────────
function Sparkline({ data, color }: { data: number[]; color: string }) {
  const W = 72, H = 24;
  const max = Math.max(...data), min = Math.min(...data), range = max - min || 1;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * W;
    const y = H - ((v - min) / range) * (H - 4) - 2;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(" ");
  const [lx, ly] = pts.split(" ").slice(-1)[0].split(",");
  return (
    <svg width={W} height={H} style={{ overflow: "visible", display: "block" }}>
      <polyline points={pts} fill="none" stroke={color} strokeWidth={1.5} strokeLinejoin="round" strokeLinecap="round" />
      <circle cx={lx} cy={ly} r={2.5} fill={color} />
    </svg>
  );
}

// ── Live Dot ─────────────────────────────────────────────────────────────────
function LiveDot({ color = "#34d399" }: { color?: string }) {
  return (
    <span style={{ position: "relative", display: "inline-flex", width: 8, height: 8, flexShrink: 0 }}>
      <span style={{ position: "absolute", inset: 0, borderRadius: "50%", background: color, opacity: 0.35, animation: "sdpng 1.6s ease-in-out infinite" }} />
      <span style={{ width: 8, height: 8, borderRadius: "50%", background: color }} />
      <style>{`@keyframes sdpng{0%,100%{transform:scale(1);opacity:.35}50%{transform:scale(2.2);opacity:0}}`}</style>
    </span>
  );
}

// ── Page Background ───────────────────────────────────────────────────────────
function PageBg({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{
      background: T.bg,
      backgroundImage: "linear-gradient(rgba(0,229,255,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(0,229,255,0.02) 1px,transparent 1px)",
      backgroundSize: "32px 32px",
      minHeight: "100%", padding: 24, boxSizing: "border-box" as const,
      ...style,
    }}>
      {children}
    </div>
  );
}

// ── Section Header ────────────────────────────────────────────────────────────
function SecHeader({ title, count, accent = T.blue }: { title: string; count?: number | string; accent?: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14, marginTop: 8 }}>
      <div style={{ width: 3, height: 18, borderRadius: 2, background: `linear-gradient(180deg,${accent},transparent)`, flexShrink: 0 }} />
      <span style={{ fontSize: 10, fontWeight: 700, color: T.muted, letterSpacing: 1.4, textTransform: "uppercase" as const }}>{title}</span>
      {count !== undefined && (
        <span style={{ fontSize: 10, color: accent, background: `${accent}18`, padding: "1px 8px", borderRadius: 4, fontFamily: "'JetBrains Mono',monospace" }}>{count}</span>
      )}
      <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg,${accent}25,transparent)` }} />
    </div>
  );
}

// ── AI Widget Card (core component matching the reference image style) ────────
interface AiCardProps {
  icon: React.ReactNode; title: string; desc: string;
  stat?: React.ReactNode; statLabel?: string;
  gradient: string; glowColor: string;
  badge?: string; tag?: string; trend?: number;
  sparkData?: number[]; onClick?: () => void;
}
function AiCard({ icon, title, desc, stat, statLabel, gradient, glowColor, badge, tag, trend, sparkData, onClick }: AiCardProps) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? T.surfaceHover : T.card,
        border: `1px solid ${hov ? glowColor + "55" : T.border}`,
        borderRadius: 14, padding: "18px 20px",
        cursor: onClick ? "pointer" : "default",
        transition: "all 0.2s ease",
        boxShadow: hov ? `0 0 32px ${glowColor}18,0 8px 40px rgba(0,0,0,0.5)` : "0 2px 12px rgba(0,0,0,0.3)",
        backdropFilter: "blur(20px)", position: "relative" as const, overflow: "hidden",
      }}
    >
      <div style={{ position: "absolute", top: -24, right: -24, width: 80, height: 80, borderRadius: "50%", background: glowColor, opacity: hov ? 0.08 : 0.03, filter: "blur(20px)", pointerEvents: "none" as const, transition: "opacity 0.2s" }} />

      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 14 }}>
        <div style={{ width: 44, height: 44, borderRadius: 12, background: gradient, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 4px 16px ${glowColor}40`, flexShrink: 0 }}>
          {icon}
        </div>
        <div style={{ display: "flex", flexDirection: "column" as const, alignItems: "flex-end", gap: 6 }}>
          {badge && <span style={{ padding: "2px 7px", borderRadius: 4, background: "rgba(163,230,53,0.1)", color: "#a3e635", fontSize: 9, fontWeight: 700, letterSpacing: 0.8, textTransform: "uppercase" as const, border: "1px solid rgba(163,230,53,0.2)" }}>{badge}</span>}
          {tag && !badge && <span style={{ padding: "2px 7px", borderRadius: 4, background: `${glowColor}14`, color: glowColor, fontSize: 9, fontWeight: 600, letterSpacing: 0.4 }}>{tag}</span>}
          {sparkData && <Sparkline data={sparkData} color={glowColor} />}
        </div>
      </div>

      <div style={{ fontSize: 13, fontWeight: 600, color: T.text, marginBottom: 4 }}>{title}</div>
      <div style={{ fontSize: 11, color: T.muted, lineHeight: 1.5 }}>{desc}</div>

      {(stat !== undefined || trend !== undefined) && (
        <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginTop: 12, borderTop: "1px solid rgba(59,127,255,0.06)", paddingTop: 10 }}>
          {stat !== undefined && <span style={{ fontSize: 20, fontWeight: 700, color: glowColor, fontFamily: "'Barlow Condensed',sans-serif", letterSpacing: 0.5 }}>{stat}</span>}
          {statLabel && <span style={{ fontSize: 11, color: T.muted }}>{statLabel}</span>}
          {trend !== undefined && <span style={{ fontSize: 10, color: trend >= 0 ? T.green : T.red, fontWeight: 600, marginLeft: "auto" }}>{trend >= 0 ? "▲" : "▼"} {Math.abs(trend)}%</span>}
        </div>
      )}
    </div>
  );
}

// ── Status Banner (live system strip) ────────────────────────────────────────
function AiStatusBanner() {
  const items = [
    { label: "Active Jobs", val: "43", color: T.blue },
    { label: "Bays Live", val: "6 / 8", color: T.cyan },
    { label: "Appts Today", val: "12", color: T.purple },
    { label: "Rev Today", val: "₹48.2K", color: T.amber },
    { label: "AI Score", val: "94.2", color: T.lime },
  ];
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 0, background: T.card, border: "1px solid rgba(59,127,255,0.12)", borderRadius: 10, padding: "10px 16px", marginBottom: 24, backdropFilter: "blur(20px)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginRight: 16, paddingRight: 16, borderRight: "1px solid rgba(59,127,255,0.1)", flexShrink: 0 }}>
        <LiveDot />
        <span style={{ fontSize: 10, fontWeight: 700, color: T.green, letterSpacing: 1, textTransform: "uppercase" as const }}>Live</span>
      </div>
      {items.map((item, i) => (
        <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 8, padding: "0 14px", borderRight: i < items.length - 1 ? "1px solid rgba(59,127,255,0.07)" : "none" }}>
          <span style={{ fontSize: 10, color: T.muted }}>{item.label}</span>
          <span style={{ fontSize: 13, fontWeight: 700, color: item.color, fontFamily: "'Barlow Condensed',sans-serif" }}>{item.val}</span>
        </div>
      ))}
      <div style={{ flex: 1 }} />
      <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "4px 10px", borderRadius: 6, background: "rgba(163,230,53,0.08)", border: "1px solid rgba(163,230,53,0.15)", flexShrink: 0 }}>
        <Brain size={11} color="#a3e635" />
        <span style={{ fontSize: 10, color: "#a3e635", fontWeight: 600, letterSpacing: 0.4 }}>AI Insights Active</span>
      </div>
    </div>
  );
}

// ── Executive Dashboard ───────────────────────────────────────────────────────
const revSpark = [120, 145, 132, 168, 155, 182, 171, 195, 188, 210, 198, 241];
const jobSpark = [28, 32, 29, 35, 31, 38, 42, 39, 44, 41, 43, 43];
const revData = [
  { m: "Jan", revenue: 182000, target: 170000 },
  { m: "Feb", revenue: 195000, target: 185000 },
  { m: "Mar", revenue: 210000, target: 190000 },
  { m: "Apr", revenue: 198000, target: 200000 },
  { m: "May", revenue: 225000, target: 210000 },
  { m: "Jun", revenue: 241000, target: 220000 },
];

function ExecutiveDashboard() {
  const uid = useId().replace(/:/g, "");
  const [period, setPeriod] = useState("MTD");
  return (
    <PageBg>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 20 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
            <Cpu size={16} color={T.blue} />
            <span style={{ fontSize: 10, color: T.blue, fontWeight: 700, letterSpacing: 1.2, textTransform: "uppercase" as const }}>Executive Command Center</span>
          </div>
          <h1 style={{ color: T.text, margin: 0, fontFamily: "'Barlow Condensed',sans-serif", fontSize: 28, letterSpacing: 0.5, lineHeight: 1 }}>Dashboard Overview</h1>
          <p style={{ color: T.muted, margin: "4px 0 0", fontSize: 12 }}>Primus Auto Group · All Branches · FY 2025–26</p>
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          {["Today", "7D", "MTD", "YTD"].map((t) => (
            <button key={t} onClick={() => setPeriod(t)} style={{ padding: "5px 12px", borderRadius: 6, border: `1px solid ${period === t ? T.amber + "60" : "rgba(59,127,255,0.15)"}`, background: period === t ? `${T.amber}12` : "none", color: period === t ? T.amber : T.muted, fontSize: 11, cursor: "pointer" }}>{t}</button>
          ))}
        </div>
      </div>

      <AiStatusBanner />

      {/* ── Revenue Intelligence ── */}
      <SecHeader title="Revenue Intelligence" accent={T.amber} />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 24 }}>
        <AiCard icon={<DollarSign size={20} color="#fff" />} title="Revenue Today" desc="Live collections across all active branches" stat="₹48,200" statLabel="today" trend={14.5} gradient={G.amber} glowColor={T.amber} sparkData={[28,32,38,35,44,48]} badge="Live" />
        <AiCard icon={<TrendingUp size={20} color="#fff" />} title="Revenue MTD" desc="Month-to-date against ₹10L target — 98.4%" stat="₹9.84L" statLabel="of ₹10L" trend={12.4} gradient={G.green} glowColor={T.green} sparkData={revSpark} tag="98.4%" />
        <AiCard icon={<Activity size={20} color="#fff" />} title="Revenue YTD" desc="Year-to-date performance vs prior year" stat="₹58.2L" statLabel="YTD" trend={18.2} gradient={G.cyan} glowColor={T.cyan} sparkData={[42,48,51,46,55,58]} />
        <AiCard icon={<AlertCircle size={20} color="#fff" />} title="Outstanding" desc="38 invoices pending across all branches" stat="₹2.14L" statLabel="overdue" trend={-8.3} gradient={G.red} glowColor={T.red} tag="38 Inv" />
      </div>

      {/* ── Revenue Chart ── */}
      <div style={{ background: T.card, border: "1px solid rgba(59,127,255,0.09)", borderRadius: 14, padding: "20px", marginBottom: 24 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: T.text }}>Revenue Trend vs Target</div>
            <div style={{ fontSize: 11, color: T.muted }}>Monthly performance — FY 2025–26</div>
          </div>
          <div style={{ display: "flex", gap: 14 }}>
            {[{ color: T.amber, label: "Revenue" }, { color: T.blue, label: "Target" }].map(l => (
              <div key={l.label} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: T.muted }}>
                <div style={{ width: 20, height: 2, background: l.color, borderRadius: 1 }} />{l.label}
              </div>
            ))}
          </div>
        </div>
        <svg width="0" height="0" aria-hidden="true" style={{ position: "absolute" }}>
          <defs>
            <linearGradient id={`${uid}-rev`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={T.amber} stopOpacity={0.2} />
              <stop offset="95%" stopColor={T.amber} stopOpacity={0} />
            </linearGradient>
            <linearGradient id={`${uid}-tgt`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={T.blue} stopOpacity={0.1} />
              <stop offset="95%" stopColor={T.blue} stopOpacity={0} />
            </linearGradient>
          </defs>
        </svg>
        <ResponsiveContainer width="100%" height={180}>
          <AreaChart data={revData}>
            <CartesianGrid key="exec-grid" strokeDasharray="3 3" stroke="rgba(59,127,255,0.06)" />
            <XAxis key="exec-x" dataKey="m" tick={{ fill: T.muted, fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis key="exec-y" tick={{ fill: T.muted, fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`} />
            <Tooltip key="exec-tooltip" contentStyle={{ background: "#0d1420", border: "1px solid rgba(59,127,255,0.2)", borderRadius: 8, color: T.text, fontSize: 12 }} formatter={(v: number) => [`₹${(v / 1000).toFixed(1)}k`]} />
            <Area key="Revenue" type="monotone" dataKey="revenue" stroke={T.amber} fill={`url(#${uid}-rev)`} strokeWidth={2} isAnimationActive={false} name="Revenue" />
            <Area key="Target" type="monotone" dataKey="target" stroke={T.blue} fill={`url(#${uid}-tgt)`} strokeWidth={1.5} strokeDasharray="4 4" isAnimationActive={false} name="Target" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* ── Operations Command ── */}
      <SecHeader title="Operations Command" accent={T.cyan} />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 24 }}>
        <AiCard icon={<ClipboardList size={20} color="#fff" />} title="Open Job Cards" desc="Active across all bays — 8 due today, 2 overdue" stat="43" statLabel="active" trend={5.2} gradient={G.blue} glowColor={T.blue} sparkData={jobSpark} badge="Live" />
        <AiCard icon={<Wrench size={20} color="#fff" />} title="Bay Utilization" desc="6 of 8 bays occupied — Bay 4 & 8 available" stat="78.3%" trend={3.1} gradient={G.teal} glowColor={T.cyan} tag="6/8 Active" />
        <AiCard icon={<Users size={20} color="#fff" />} title="Technician Efficiency" desc="5 active techs — avg 8.6 jobs/day · QC pass 97%" stat="94.1%" statLabel="eff." trend={2.8} gradient={G.purple} glowColor={T.purple} badge="AI" />
        <AiCard icon={<Star size={20} color="#fff" />} title="Customer Satisfaction" desc="Based on 186 post-service reviews this month" stat="4.7" statLabel="/ 5.0" trend={1.2} gradient={G.gold} glowColor={T.amber} tag="NPS 72" />
      </div>

      {/* ── Pipeline ── */}
      <SecHeader title="Pipeline & CRM Intelligence" accent={T.purple} />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 24 }}>
        <AiCard icon={<Target size={20} color="#fff" />} title="Inquiry Funnel" desc="142 inquiries → 43 paid conversions this month" stat="30.3%" statLabel="conv." trend={4.1} gradient={G.indigo} glowColor={T.purple} badge="AI" />
        <AiCard icon={<Clock size={20} color="#fff" />} title="Appointments Today" desc="12 scheduled — 6 confirmed, 3 in progress" stat="12" statLabel="today" gradient={G.cyan} glowColor={T.cyan} tag="3 Live" badge="Live" />
        <AiCard icon={<BarChart3 size={20} color="#fff" />} title="Avg Ticket Value" desc="Average revenue per completed job card, MTD" stat="₹12,840" trend={8.6} gradient={G.amber} glowColor={T.amber} badge="AI" />
        <AiCard icon={<Zap size={20} color="#fff" />} title="Pending Estimates" desc="Awaiting customer approval — ₹1.4L at risk" stat="8" statLabel="pending" trend={-2.1} gradient={G.rose} glowColor={T.orange} tag="₹1.4L" />
      </div>

      {/* ── Activity Feed ── */}
      <SecHeader title="Live Activity Feed" accent={T.blue} />
      <div style={{ background: T.card, border: "1px solid rgba(59,127,255,0.09)", borderRadius: 14, overflow: "hidden" }}>
        {[
          { color: T.blue, cat: "Job Card", msg: "JC-2041 moved to QC stage · Bay 3 · Suresh Nair", time: "2m ago" },
          { color: T.purple, cat: "Inquiry", msg: "New inquiry: Raj Mehta · BMW 5 Series · Detailing", time: "14m ago" },
          { color: T.green, cat: "Payment", msg: "Invoice INV-1089 paid · ₹18,400 · Priya Shah", time: "1h ago" },
          { color: T.amber, cat: "Appointment", msg: "Confirmed: Arjun K. · 3:00 PM · Full Service", time: "2h ago" },
          { color: T.cyan, cat: "Delivery", msg: "JC-2038 delivered · Honda City · Full Service", time: "3h ago" },
        ].map((a, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 18px", borderBottom: i < 4 ? "1px solid rgba(59,127,255,0.06)" : "none" }}>
            <div style={{ width: 7, height: 7, borderRadius: "50%", background: a.color, flexShrink: 0, boxShadow: `0 0 8px ${a.color}80` }} />
            <span style={{ padding: "2px 7px", borderRadius: 4, background: `${a.color}14`, color: a.color, fontSize: 9, fontWeight: 700, letterSpacing: 0.5, flexShrink: 0 }}>{a.cat}</span>
            <span style={{ flex: 1, fontSize: 12, color: T.text }}>{a.msg}</span>
            <span style={{ fontSize: 10, color: T.muted, flexShrink: 0 }}>{a.time}</span>
          </div>
        ))}
      </div>
    </PageBg>
  );
}

// ── Branch Dashboard ──────────────────────────────────────────────────────────
const BRANCH_APPTS = [
  { time: "09:00", name: "Raj Mehta", vehicle: "BMW 520d", service: "Full Service", status: "In Progress", color: T.blue },
  { time: "10:30", name: "Priya Shah", vehicle: "Toyota Fortuner", service: "AC Repair", status: "Waiting", color: T.amber },
  { time: "11:00", name: "Arjun Kumar", vehicle: "Honda City", service: "Detailing", status: "Confirmed", color: T.green },
  { time: "12:00", name: "Deepa Nair", vehicle: "Hyundai Creta", service: "Brake Pads", status: "Confirmed", color: T.green },
  { time: "14:00", name: "Vikram Shah", vehicle: "Maruti Swift", service: "Oil Change", status: "Pending", color: T.muted },
  { time: "15:30", name: "Neha Joshi", vehicle: "Kia Seltos", service: "Alignment", status: "Pending", color: T.muted },
];

function BranchDashboard() {
  return (
    <PageBg>
      <div style={{ marginBottom: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
          <LiveDot />
          <span style={{ fontSize: 10, color: T.green, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase" as const }}>Branch Live</span>
        </div>
        <h1 style={{ color: T.text, margin: 0, fontFamily: "'Barlow Condensed',sans-serif", fontSize: 28, letterSpacing: 0.5 }}>Branch Dashboard</h1>
        <p style={{ color: T.muted, margin: "4px 0 0", fontSize: 12 }}>Mumbai Central · Monday 9 Jun 2025</p>
      </div>

      <SecHeader title="Today's KPIs" accent={T.amber} />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 12, marginBottom: 24 }}>
        <AiCard icon={<DollarSign size={18} color="#fff" />} title="Daily Revenue" desc="Target: ₹50K" stat="₹48,200" trend={5.2} gradient={G.amber} glowColor={T.amber} badge="Live" />
        <AiCard icon={<ClipboardList size={18} color="#fff" />} title="Active Job Cards" desc="2 overdue today" stat="14" statLabel="active" gradient={G.blue} glowColor={T.blue} tag="2 Late" />
        <AiCard icon={<Wrench size={18} color="#fff" />} title="Active Bays" desc="75% utilization" stat="6 / 8" gradient={G.teal} glowColor={T.cyan} />
        <AiCard icon={<Car size={18} color="#fff" />} title="Pending Deliveries" desc="Due today" stat="5" gradient={G.orange} glowColor={T.orange} />
        <AiCard icon={<Clock size={18} color="#fff" />} title="Appointments" desc="6 remaining today" stat="12" statLabel="total" gradient={G.purple} glowColor={T.purple} />
      </div>

      <SecHeader title="Today's Appointment Schedule" accent={T.cyan} />
      <div style={{ background: T.card, border: "1px solid rgba(59,127,255,0.09)", borderRadius: 14, overflow: "hidden" }}>
        <div style={{ display: "grid", gridTemplateColumns: "80px 1fr 1fr 160px 120px", gap: 0 }}>
          {["Time", "Customer", "Vehicle & Service", "Bay / Tech", "Status"].map((h) => (
            <div key={h} style={{ padding: "10px 16px", fontSize: 10, color: T.muted, fontWeight: 700, letterSpacing: 0.8, textTransform: "uppercase" as const, borderBottom: "1px solid rgba(59,127,255,0.08)" }}>{h}</div>
          ))}
        </div>
        {BRANCH_APPTS.map((a, i) => (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "80px 1fr 1fr 160px 120px", borderBottom: i < BRANCH_APPTS.length - 1 ? "1px solid rgba(59,127,255,0.05)" : "none" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(59,127,255,0.03)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "none")}>
            <div style={{ padding: "12px 16px", color: T.amber, fontFamily: "'JetBrains Mono',monospace", fontSize: 12 }}>{a.time}</div>
            <div style={{ padding: "12px 16px", color: T.text, fontSize: 12, fontWeight: 500 }}>{a.name}</div>
            <div style={{ padding: "12px 16px", color: T.muted, fontSize: 12 }}>{a.vehicle} · {a.service}</div>
            <div style={{ padding: "12px 16px", color: T.dim, fontSize: 11 }}>—</div>
            <div style={{ padding: "10px 16px" }}>
              <span style={{ padding: "3px 9px", borderRadius: 5, background: `${a.color}18`, color: a.color, fontSize: 11 }}>{a.status}</span>
            </div>
          </div>
        ))}
      </div>
    </PageBg>
  );
}

// ── Service Advisor Dashboard ─────────────────────────────────────────────────
const SA_INQUIRIES = [
  { id: "INQ-341", name: "Mihir Desai", vehicle: "Audi Q5", service: "Full Detailing", status: "New", priority: "High", priColor: T.red },
  { id: "INQ-342", name: "Sonali Patil", vehicle: "Toyota Camry", service: "Full Service", status: "Contacted", priority: "Med", priColor: T.amber },
  { id: "INQ-343", name: "Karan Mehta", vehicle: "Ford Endeavour", service: "Suspension", status: "Qualified", priority: "High", priColor: T.red },
  { id: "INQ-344", name: "Asha Sharma", vehicle: "Honda WRV", service: "AC Regas", status: "Follow-Up", priority: "Low", priColor: T.muted },
];

function ServiceAdvisorDashboard() {
  return (
    <PageBg>
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ color: T.text, margin: 0, fontFamily: "'Barlow Condensed',sans-serif", fontSize: 28 }}>Service Advisor Hub</h1>
        <p style={{ color: T.muted, margin: "4px 0 0", fontSize: 12 }}>Ravi Advisor · Mumbai Central · Today</p>
      </div>

      <SecHeader title="My KPIs Today" accent={T.blue} />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 24 }}>
        <AiCard icon={<Users size={20} color="#fff" />} title="Assigned Inquiries" desc="4 new since yesterday" stat="18" statLabel="total" gradient={G.blue} glowColor={T.blue} tag="4 New" />
        <AiCard icon={<Clock size={20} color="#fff" />} title="Appointments Today" desc="Next: 11:00 AM — Arjun Kumar" stat="6" statLabel="today" gradient={G.cyan} glowColor={T.cyan} badge="Live" />
        <AiCard icon={<AlertCircle size={20} color="#fff" />} title="Follow-Ups Due" desc="3 overdue — action required" stat="9" statLabel="due" trend={-15.2} gradient={G.orange} glowColor={T.orange} tag="3 Late" />
        <AiCard icon={<DollarSign size={20} color="#fff" />} title="Pending Estimates" desc="Awaiting customer approval" stat="4" statLabel="pending" gradient={G.purple} glowColor={T.purple} />
      </div>

      <SecHeader title="Assigned Inquiries" count={18} accent={T.blue} />
      <div style={{ display: "flex", flexDirection: "column" as const, gap: 8 }}>
        {SA_INQUIRIES.map((inq) => (
          <div key={inq.id} style={{ background: T.card, border: "1px solid rgba(59,127,255,0.09)", borderRadius: 10, padding: "12px 16px", display: "flex", alignItems: "center", gap: 14, cursor: "pointer" }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = `${T.blue}40`)}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(59,127,255,0.09)")}>
            <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: T.amber, flexShrink: 0 }}>{inq.id}</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 12, color: T.text, fontWeight: 500 }}>{inq.name} · <span style={{ color: T.muted }}>{inq.vehicle}</span></div>
              <div style={{ fontSize: 11, color: T.muted }}>{inq.service}</div>
            </div>
            <span style={{ padding: "2px 8px", borderRadius: 4, background: `${inq.priColor}18`, color: inq.priColor, fontSize: 10 }}>{inq.priority}</span>
            <span style={{ padding: "2px 8px", borderRadius: 4, background: `${T.blue}18`, color: T.blue, fontSize: 10 }}>{inq.status}</span>
          </div>
        ))}
      </div>
    </PageBg>
  );
}

// ── Technician Dashboard ──────────────────────────────────────────────────────
const TECH_JOBS = [
  { id: "JC-2039", vehicle: "BMW 520d · MH01AB1234", service: "Full Service + AC", bay: "Bay 2", status: "In Progress", progress: 70, eta: "1h 30m", color: T.blue },
  { id: "JC-2040", vehicle: "Audi Q5 · MH02CD5678", service: "Wheel Alignment", bay: "Bay 4", status: "Pending", progress: 0, eta: "—", color: T.muted },
  { id: "JC-2041", vehicle: "Honda City · MH03EF9012", service: "Brake Pads + Fluid", bay: "Bay 6", status: "QC Pending", progress: 100, eta: "QC", color: T.amber },
];

function TechnicianDashboard() {
  return (
    <PageBg>
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ color: T.text, margin: 0, fontFamily: "'Barlow Condensed',sans-serif", fontSize: 28 }}>Technician Workspace</h1>
        <p style={{ color: T.muted, margin: "4px 0 0", fontSize: 12 }}>Suresh Nair · Senior Tech · Mumbai Central</p>
      </div>

      <SecHeader title="My Status" accent={T.cyan} />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 24 }}>
        <AiCard icon={<ClipboardList size={20} color="#fff" />} title="Assigned Jobs" desc="3 active across bays 2, 4, 6" stat="3" statLabel="today" gradient={G.blue} glowColor={T.blue} badge="Live" />
        <AiCard icon={<Wrench size={20} color="#fff" />} title="My Bays" desc="Bay 2 occupied · Bay 4 pending · Bay 6 QC" stat="Bay 2,4,6" gradient={G.teal} glowColor={T.cyan} />
        <AiCard icon={<CheckCircle size={20} color="#fff" />} title="Completed Today" desc="Out of 5 scheduled" stat="2" statLabel="done" gradient={G.green} glowColor={T.green} tag="3 Left" />
        <AiCard icon={<Star size={20} color="#fff" />} title="QC Rejections" desc="Zero this week — excellent record" stat="0" statLabel="this week" gradient={G.gold} glowColor={T.amber} badge="AI" />
      </div>

      <SecHeader title="Active Job Queue" accent={T.blue} />
      <div style={{ display: "flex", flexDirection: "column" as const, gap: 12 }}>
        {TECH_JOBS.map((job) => (
          <div key={job.id} style={{ background: T.card, border: `1px solid ${job.color}25`, borderRadius: 14, padding: "18px 20px", display: "flex", gap: 20, alignItems: "flex-start" }}>
            <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 28, fontWeight: 700, color: job.color, letterSpacing: 0.5, flexShrink: 0, lineHeight: 1 }}>{job.id}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, color: T.text, fontWeight: 600 }}>{job.vehicle}</div>
              <div style={{ fontSize: 12, color: T.muted, marginTop: 2 }}>{job.service} · {job.bay}</div>
              <div style={{ marginTop: 10, display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ flex: 1, height: 6, background: "rgba(59,127,255,0.08)", borderRadius: 3, overflow: "hidden" }}>
                  <div style={{ width: `${job.progress}%`, height: "100%", background: job.color, borderRadius: 3, boxShadow: `0 0 8px ${job.color}60` }} />
                </div>
                <span style={{ fontSize: 11, color: job.color, fontFamily: "'JetBrains Mono',monospace", flexShrink: 0 }}>{job.progress}%</span>
              </div>
            </div>
            <div style={{ textAlign: "right" as const, flexShrink: 0 }}>
              <span style={{ padding: "4px 10px", borderRadius: 6, background: `${job.color}18`, color: job.color, fontSize: 12 }}>{job.status}</span>
              <div style={{ fontSize: 11, color: T.muted, marginTop: 6 }}>ETA: {job.eta}</div>
            </div>
          </div>
        ))}
      </div>
    </PageBg>
  );
}

// ── Finance Dashboard (SCR-006) ───────────────────────────────────────────────
const AR_AGING_DATA = [
  { bucket: "0-30d", amount: 580000 }, { bucket: "31-60d", amount: 320000 },
  { bucket: "61-90d", amount: 148000 }, { bucket: "90d+", amount: 64000 },
];
const CASHFLOW_DATA = [
  { m: "Jan", inflow: 820000, outflow: 610000 }, { m: "Feb", inflow: 890000, outflow: 670000 },
  { m: "Mar", inflow: 950000, outflow: 720000 }, { m: "Apr", inflow: 880000, outflow: 690000 },
  { m: "May", inflow: 1020000, outflow: 740000 }, { m: "Jun", inflow: 1090000, outflow: 780000 },
];

function FinanceDashboard() {
  const uid = useId().replace(/:/g, "");
  const [period, setPeriod] = useState("MTD");
  return (
    <PageBg>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 20 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
            <CreditCard size={14} color={T.primary} />
            <span style={{ fontSize: 10, color: T.primary, fontWeight: 700, letterSpacing: 1.2, textTransform: "uppercase" as const }}>Finance Dashboard</span>
          </div>
          <h1 style={{ color: T.text, margin: 0, fontSize: 26, fontWeight: 700, lineHeight: 1 }}>Financial Operations</h1>
          <p style={{ color: T.muted, margin: "4px 0 0", fontSize: 12 }}>Primus Auto Group · All Branches · {period}</p>
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          {["Today", "MTD", "QTD", "YTD"].map(t => (
            <button key={t} onClick={() => setPeriod(t)} style={{ padding: "5px 12px", borderRadius: 6, border: `1px solid ${period === t ? T.primary + "60" : T.border}`, background: period === t ? `${T.primary}12` : "none", color: period === t ? T.primary : T.muted, fontSize: 11, cursor: "pointer" }}>{t}</button>
          ))}
        </div>
      </div>

      {/* AI Strip */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 24 }}>
        <AiCard icon={<Activity size={18} color="#fff" />} title="Cash Flow Forecast" desc="Projected net cash position for next 30 days" stat="₹4.2L" statLabel="+30d" trend={8.4} gradient={G.cyan} glowColor={T.primary} badge="AI" />
        <AiCard icon={<AlertCircle size={18} color="#fff" />} title="Collection Risk" desc="12 invoices flagged as high-risk" stat="82%" statLabel="confidence" trend={-3.2} gradient={G.red} glowColor={T.danger} badge="AI" />
        <AiCard icon={<TrendingUp size={18} color="#fff" />} title="Revenue Forecast" desc="AI-driven revenue projection for month-end" stat="₹12.4L" trend={6.1} gradient={G.green} glowColor={T.success} badge="AI" />
        <AiCard icon={<Clock size={18} color="#fff" />} title="Payment Delay Alert" desc="6 vendor payments approaching due date" stat="6" statLabel="due soon" gradient={G.amber} glowColor={T.warning} badge="AI" />
      </div>

      {/* KPI Row — 8 cards */}
      <SecHeader title="Financial KPIs" accent={T.primary} />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 24 }}>
        <AiCard icon={<Receipt size={18} color="#fff" />} title="Accounts Receivable" desc="Outstanding from customers" stat="₹11.2L" trend={-4.1} gradient={G.cyan} glowColor={T.primary} sparkData={[80,85,92,88,95,100,112]} />
        <AiCard icon={<DollarSign size={18} color="#fff" />} title="Accounts Payable" desc="Due to vendors" stat="₹6.8L" gradient={G.amber} glowColor={T.warning} sparkData={[50,58,62,60,65,68,68]} />
        <AiCard icon={<Activity size={18} color="#fff" />} title="Net Cash Balance" desc="Available operating cash" stat="₹28.4L" trend={12.3} gradient={G.green} glowColor={T.success} badge="Live" />
        <AiCard icon={<AlertCircle size={18} color="#fff" />} title="Overdue Invoices" desc="Past 30+ days payment due" stat="₹2.14L" trend={-8.3} gradient={G.red} glowColor={T.danger} tag="38 Inv" />
        <AiCard icon={<BookOpen size={18} color="#fff" />} title="GST Liability" desc="Current quarter liability" stat="₹1.82L" gradient={G.purple} glowColor={T.purple} tag="Q2" />
        <AiCard icon={<TrendingUp size={18} color="#fff" />} title="Collections MTD" desc="Total receipts this month" stat="₹9.6L" trend={14.2} gradient={G.teal} glowColor={T.success} />
        <AiCard icon={<Wrench size={18} color="#fff" />} title="Expenses MTD" desc="Operational + vendor costs" stat="₹5.4L" trend={2.1} gradient={G.rose} glowColor={T.orange} />
        <AiCard icon={<Star size={18} color="#fff" />} title="Net Profit MTD" desc="After all costs and taxes" stat="₹2.1L" trend={18.4} gradient={G.gold} glowColor={T.warning} badge="AI" />
      </div>

      {/* Charts */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 24 }}>
        <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 14, padding: 20 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: T.text, marginBottom: 4 }}>Cash Flow — Inflow vs Outflow</div>
          <div style={{ fontSize: 11, color: T.muted, marginBottom: 14 }}>Monthly operating cash movement</div>
          <svg width="0" height="0" aria-hidden="true" style={{ position: "absolute" }}>
            <defs>
              <linearGradient id={`${uid}-in`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={T.success} stopOpacity={0.2} /><stop offset="95%" stopColor={T.success} stopOpacity={0} />
              </linearGradient>
              <linearGradient id={`${uid}-out`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={T.danger} stopOpacity={0.15} /><stop offset="95%" stopColor={T.danger} stopOpacity={0} />
              </linearGradient>
            </defs>
          </svg>
          <ResponsiveContainer width="100%" height={160}>
            <AreaChart data={CASHFLOW_DATA}>
              <CartesianGrid key="fin-cf-grid" strokeDasharray="3 3" stroke={`${T.border}`} />
              <XAxis key="fin-cf-x" dataKey="m" tick={{ fill: T.muted, fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis key="fin-cf-y" tick={{ fill: T.muted, fontSize: 9 }} axisLine={false} tickLine={false} tickFormatter={v => `₹${(v/1000).toFixed(0)}k`} />
              <Tooltip key="fin-cf-tooltip" contentStyle={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 8, color: T.text, fontSize: 11 }} formatter={(v: number) => [`₹${(v/1000).toFixed(0)}k`]} />
              <Area key="Inflow" type="monotone" dataKey="inflow" stroke={T.success} fill={`url(#${uid}-in)`} strokeWidth={2} isAnimationActive={false} name="Inflow" />
              <Area key="Outflow" type="monotone" dataKey="outflow" stroke={T.danger} fill={`url(#${uid}-out)`} strokeWidth={1.5} strokeDasharray="4 4" isAnimationActive={false} name="Outflow" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 14, padding: 20 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: T.text, marginBottom: 4 }}>AR Aging Analysis</div>
          <div style={{ fontSize: 11, color: T.muted, marginBottom: 14 }}>Outstanding receivables by age bracket</div>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={AR_AGING_DATA}>
              <CartesianGrid key="fin-ar-grid" strokeDasharray="3 3" stroke={`${T.border}`} />
              <XAxis key="fin-ar-x" dataKey="bucket" tick={{ fill: T.muted, fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis key="fin-ar-y" tick={{ fill: T.muted, fontSize: 9 }} axisLine={false} tickLine={false} tickFormatter={v => `₹${(v/1000).toFixed(0)}k`} />
              <Tooltip key="fin-ar-tooltip" contentStyle={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 8, color: T.text, fontSize: 11 }} formatter={(v: number) => [`₹${(v/1000).toFixed(0)}k`]} />
              <Bar key="finance-aging-bar" dataKey="amount" fill={T.primary} radius={[4,4,0,0]} isAnimationActive={false} name="AR Amount" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <SecHeader title="Recent Finance Activity" accent={T.primary} />
      <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 14, overflow: "hidden" }}>
        {[
          { color: T.success, cat: "Receipt", msg: "INV-1089 collected · ₹18,400 · Priya Shah · NEFT", time: "2h ago" },
          { color: T.warning, cat: "Payable", msg: "PO-441 payment due tomorrow · Sharma Parts · ₹42,000", time: "3h ago" },
          { color: T.primary, cat: "Journal", msg: "J-2041 posted · Depreciation entry · ₹8,200", time: "5h ago" },
          { color: T.danger, cat: "Overdue", msg: "INV-1074 overdue 15d · ₹12,500 · Raj Mehta — follow up", time: "1d ago" },
          { color: T.purple, cat: "GST", msg: "GSTR-1 filing reminder — 7 days remaining", time: "1d ago" },
        ].map((a, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 18px", borderBottom: i < 4 ? `1px solid ${T.border}` : "none" }}>
            <div style={{ width: 7, height: 7, borderRadius: "50%", background: a.color, flexShrink: 0 }} />
            <span style={{ padding: "2px 7px", borderRadius: 4, background: `${a.color}14`, color: a.color, fontSize: 9, fontWeight: 700, letterSpacing: 0.5, flexShrink: 0 }}>{a.cat}</span>
            <span style={{ flex: 1, fontSize: 12, color: T.text }}>{a.msg}</span>
            <span style={{ fontSize: 10, color: T.muted, flexShrink: 0 }}>{a.time}</span>
          </div>
        ))}
      </div>
    </PageBg>
  );
}

// ── Vendor Dashboard (SCR-007) ────────────────────────────────────────────────
const VENDOR_SPEND_DATA = [
  { m: "Jan", parts: 210000, labour: 80000 }, { m: "Feb", parts: 245000, labour: 92000 },
  { m: "Mar", parts: 228000, labour: 88000 }, { m: "Apr", parts: 260000, labour: 95000 },
  { m: "May", parts: 285000, labour: 102000 }, { m: "Jun", parts: 298000, labour: 108000 },
];
const VENDOR_POS = [
  { id: "PO-441", vendor: "Sharma Parts", items: "Brake pads × 10", amount: "₹42,000", status: "Dispatched", eta: "Today", color: "#00E5FF" },
  { id: "PO-440", vendor: "AutoTech India", items: "Oil filters × 20", amount: "₹18,500", status: "Confirmed", eta: "Tomorrow", color: "#10B981" },
  { id: "PO-439", vendor: "Speed Motors", items: "Tyre set × 4", amount: "₹28,000", status: "Pending GRN", eta: "Arrived", color: "#F59E0B" },
  { id: "PO-438", vendor: "Cool AC Parts", items: "AC compressor × 2", amount: "₹36,000", status: "Invoiced", eta: "2d ago", color: "#7C3AED" },
];

function VendorDashboard() {
  const uid = useId().replace(/:/g, "");
  return (
    <PageBg>
      <div style={{ marginBottom: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
          <Package size={14} color={T.warning} />
          <span style={{ fontSize: 10, color: T.warning, fontWeight: 700, letterSpacing: 1.2, textTransform: "uppercase" as const }}>Vendor Portal</span>
        </div>
        <h1 style={{ color: T.text, margin: 0, fontSize: 26, fontWeight: 700, lineHeight: 1 }}>Vendor Dashboard</h1>
        <p style={{ color: T.muted, margin: "4px 0 0", fontSize: 12 }}>Sharma Parts Pvt. Ltd. · June 2025</p>
      </div>

      {/* AI Strip */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 24 }}>
        <AiCard icon={<AlertCircle size={18} color="#fff" />} title="Vendor Risk Score" desc="Quality failures increasing trend detected" stat="3.2/10" statLabel="risk" trend={1.4} gradient={G.red} glowColor={T.danger} badge="AI" />
        <AiCard icon={<TrendingUp size={18} color="#fff" />} title="Spend Forecast" desc="Projected procurement spend next 30 days" stat="₹3.8L" trend={5.2} gradient={G.amber} glowColor={T.warning} badge="AI" />
        <AiCard icon={<Activity size={18} color="#fff" />} title="Delivery Performance" desc="On-time delivery rate improving" stat="92.4%" trend={3.1} gradient={G.green} glowColor={T.success} badge="AI" />
        <AiCard icon={<Star size={18} color="#fff" />} title="Quality Score" desc="Based on GRN quality checks" stat="88.6%" trend={1.8} gradient={G.gold} glowColor={T.warning} badge="AI" />
      </div>

      {/* KPI Row — 8 cards */}
      <SecHeader title="Vendor KPIs" accent={T.warning} />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 24 }}>
        <AiCard icon={<ClipboardList size={18} color="#fff" />} title="Active POs" desc="Open purchase orders" stat="14" trend={2.1} gradient={G.blue} glowColor={T.primary} sparkData={[8,10,12,11,13,14]} badge="Live" />
        <AiCard icon={<Car size={18} color="#fff" />} title="Deliveries Due" desc="Expected today and tomorrow" stat="3" gradient={G.amber} glowColor={T.warning} tag="Today" />
        <AiCard icon={<DollarSign size={18} color="#fff" />} title="Payment Due" desc="Vendor invoices approaching due" stat="₹78,500" trend={-6.2} gradient={G.red} glowColor={T.danger} tag="7d" />
        <AiCard icon={<Star size={18} color="#fff" />} title="Vendor Scorecard" desc="Avg across all active vendors" stat="4.2/5" trend={0.3} gradient={G.gold} glowColor={T.warning} />
        <AiCard icon={<Activity size={18} color="#fff" />} title="Open GRNs" desc="Pending goods receipt notes" stat="5" gradient={G.teal} glowColor={T.success} />
        <AiCard icon={<AlertCircle size={18} color="#fff" />} title="Pending PRs" desc="Purchase requests awaiting approval" stat="8" gradient={G.purple} glowColor={T.purple} />
        <AiCard icon={<Wrench size={18} color="#fff" />} title="Vendor Rating" desc="Average supplier performance" stat="4.2★" trend={1.2} gradient={G.indigo} glowColor={T.purple} />
        <AiCard icon={<Receipt size={18} color="#fff" />} title="Month Spend" desc="Total procurement spend MTD" stat="₹2.98L" trend={4.6} gradient={G.amber} glowColor={T.warning} sparkData={[210,245,228,260,285,298]} />
      </div>

      {/* Charts */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 24 }}>
        <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 14, padding: 20 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: T.text, marginBottom: 4 }}>Vendor Spend — Parts vs Labour</div>
          <div style={{ fontSize: 11, color: T.muted, marginBottom: 14 }}>Monthly procurement breakdown</div>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={VENDOR_SPEND_DATA}>
              <CartesianGrid key="vend-grid" strokeDasharray="3 3" stroke={T.border} />
              <XAxis key="vend-x" dataKey="m" tick={{ fill: T.muted, fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis key="vend-y" tick={{ fill: T.muted, fontSize: 9 }} axisLine={false} tickLine={false} tickFormatter={v => `₹${(v/1000).toFixed(0)}k`} />
              <Tooltip key="vend-tooltip" contentStyle={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 8, color: T.text, fontSize: 11 }} formatter={(v: number) => [`₹${(v/1000).toFixed(0)}k`]} />
              <Bar key="Parts" dataKey="parts" fill={T.warning} radius={[4,4,0,0]} isAnimationActive={false} name="Parts" />
              <Bar key="Labour" dataKey="labour" fill={T.purple} radius={[4,4,0,0]} isAnimationActive={false} name="Labour" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 14, padding: 20 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: T.text, marginBottom: 4 }}>Active Purchase Orders</div>
          <div style={{ fontSize: 11, color: T.muted, marginBottom: 14 }}>Current PO pipeline status</div>
          <div style={{ display: "flex", flexDirection: "column" as const, gap: 8 }}>
            {VENDOR_POS.map(po => (
              <div key={po.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 12px", background: T.surfaceHover, borderRadius: 8, border: `1px solid ${T.border}` }}>
                <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: T.warning, flexShrink: 0 }}>{po.id}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 11, color: T.text, fontWeight: 500 }}>{po.vendor}</div>
                  <div style={{ fontSize: 10, color: T.muted }}>{po.items}</div>
                </div>
                <span style={{ fontSize: 11, color: T.text, flexShrink: 0 }}>{po.amount}</span>
                <span style={{ padding: "2px 7px", borderRadius: 4, background: `${po.color}18`, color: po.color, fontSize: 9, fontWeight: 700, flexShrink: 0 }}>{po.status}</span>
                <span style={{ fontSize: 10, color: T.muted, flexShrink: 0 }}>{po.eta}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <SecHeader title="Vendor Alerts" accent={T.warning} />
      <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 14, overflow: "hidden" }}>
        {[
          { color: T.danger, cat: "Quality", msg: "GRN-318: 2 defective brake pads received — Sharma Parts — flag raised", time: "1h ago" },
          { color: T.warning, cat: "Delivery", msg: "PO-435 overdue by 2 days — Speed Motors — escalate to manager", time: "3h ago" },
          { color: T.primary, cat: "Payment", msg: "Invoice INV-V-091 received · ₹22,000 · AutoTech India · due in 7d", time: "5h ago" },
          { color: T.success, cat: "GRN", msg: "GRN-317 confirmed · PO-439 fully matched · Cool AC Parts", time: "6h ago" },
        ].map((a, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 18px", borderBottom: i < 3 ? `1px solid ${T.border}` : "none" }}>
            <div style={{ width: 7, height: 7, borderRadius: "50%", background: a.color, flexShrink: 0 }} />
            <span style={{ padding: "2px 7px", borderRadius: 4, background: `${a.color}14`, color: a.color, fontSize: 9, fontWeight: 700, letterSpacing: 0.5, flexShrink: 0 }}>{a.cat}</span>
            <span style={{ flex: 1, fontSize: 12, color: T.text }}>{a.msg}</span>
            <span style={{ fontSize: 10, color: T.muted, flexShrink: 0 }}>{a.time}</span>
          </div>
        ))}
      </div>
    </PageBg>
  );
}

// ── Super Admin Dashboard (SCR-001) ──────────────────────────────────────────
const TENANT_GROWTH_DATA = [
  { m: "Jan", tenants: 24 }, { m: "Feb", tenants: 28 }, { m: "Mar", tenants: 31 },
  { m: "Apr", tenants: 34 }, { m: "May", tenants: 38 }, { m: "Jun", tenants: 42 },
];
const API_VOLUME_DATA = [
  { m: "Jan", calls: 1.2 }, { m: "Feb", calls: 1.8 }, { m: "Mar", calls: 2.1 },
  { m: "Apr", calls: 1.9 }, { m: "May", calls: 2.6 }, { m: "Jun", calls: 3.1 },
];

function SuperAdminDashboard() {
  const uid = useId().replace(/:/g, "");
  const [period, setPeriod] = useState("MTD");
  return (
    <PageBg>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 20 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
            <Globe size={14} color={T.ai} />
            <span style={{ fontSize: 10, color: T.ai, fontWeight: 700, letterSpacing: 1.2, textTransform: "uppercase" as const }}>Super Admin · Platform Command</span>
          </div>
          <h1 style={{ color: T.text, margin: 0, fontSize: 26, fontWeight: 700, lineHeight: 1 }}>Platform Overview</h1>
          <p style={{ color: T.muted, margin: "4px 0 0", fontSize: 12 }}>SHYNTRAA v2 · All Tenants · {period}</p>
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <div style={{ display: "flex", gap: 6 }}>
            {["Today", "MTD", "QTD", "YTD"].map(t => (
              <button key={t} onClick={() => setPeriod(t)} style={{ padding: "5px 12px", borderRadius: 6, border: `1px solid ${period === t ? T.ai + "60" : T.border}`, background: period === t ? `${T.ai}12` : "none", color: period === t ? T.ai : T.muted, fontSize: 11, cursor: "pointer" }}>{t}</button>
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 12px", borderRadius: 8, background: `${T.ai}10`, border: `1px solid ${T.ai}30` }}>
            <LiveDot color={T.success} />
            <span style={{ fontSize: 10, color: T.ai, fontWeight: 700 }}>All Systems Operational</span>
          </div>
        </div>
      </div>

      {/* AI Strip */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 24 }}>
        <AiCard icon={<AlertCircle size={18} color="#fff" />} title="Tenant Risk" desc="3 tenants flagged for payment delay" stat="3" statLabel="at risk" trend={-1.2} gradient={G.red} glowColor={T.danger} badge="AI" />
        <AiCard icon={<Activity size={18} color="#fff" />} title="Platform Usage" desc="API calls trending up 22% this month" stat="3.1M" statLabel="calls" trend={22.4} gradient={G.cyan} glowColor={T.primary} badge="AI" />
        <AiCard icon={<TrendingUp size={18} color="#fff" />} title="Growth Signals" desc="8 tenants expanding — upsell opportunity" stat="8" statLabel="expanding" trend={14.2} gradient={G.green} glowColor={T.success} badge="AI" />
        <AiCard icon={<DollarSign size={18} color="#fff" />} title="Revenue Forecast" desc="MRR growth forecast for next quarter" stat="₹24.8L" trend={18.1} gradient={G.gold} glowColor={T.warning} badge="AI" />
      </div>

      {/* KPI Row — 8 cards */}
      <SecHeader title="Platform KPIs" accent={T.ai} />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 24 }}>
        <AiCard icon={<Building2 size={18} color="#fff" />} title="Total Tenants" desc="Active subscription tenants" stat="42" trend={10.5} gradient={G.cyan} glowColor={T.primary} sparkData={[24,28,31,34,38,42]} />
        <AiCard icon={<DollarSign size={18} color="#fff" />} title="Monthly Recurring Revenue" desc="Platform MRR — all plans" stat="₹21.4L" trend={8.2} gradient={G.green} glowColor={T.success} sparkData={[150,162,175,168,190,214]} />
        <AiCard icon={<Activity size={18} color="#fff" />} title="Platform Uptime" desc="30-day rolling SLA" stat="99.97%" gradient={G.teal} glowColor={T.success} badge="SLA" />
        <AiCard icon={<AlertCircle size={18} color="#fff" />} title="Error Rate" desc="Last 24 hours across all endpoints" stat="0.012%" trend={-18.2} gradient={G.red} glowColor={T.danger} />
        <AiCard icon={<Zap size={18} color="#fff" />} title="API Volume" desc="Total API calls this month" stat="3.1M" trend={22.4} gradient={G.blue} glowColor={T.primary} sparkData={[1.2,1.8,2.1,1.9,2.6,3.1]} />
        <AiCard icon={<Users size={18} color="#fff" />} title="New Tenants MTD" desc="Signed up this month" stat="4" trend={33.3} gradient={G.purple} glowColor={T.purple} />
        <AiCard icon={<Star size={18} color="#fff" />} title="Annual Recurring Revenue" desc="Projected annual subscription value" stat="₹2.56Cr" trend={12.8} gradient={G.gold} glowColor={T.warning} />
        <AiCard icon={<TrendDown size={18} color="#fff" />} title="Churn Rate" desc="Monthly tenant churn (last 90d avg)" stat="1.2%" trend={-0.3} gradient={G.rose} glowColor={T.danger} badge="AI" />
      </div>

      {/* Charts */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginBottom: 24 }}>
        <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 14, padding: 20 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: T.text, marginBottom: 4 }}>Tenant Growth</div>
          <div style={{ fontSize: 11, color: T.muted, marginBottom: 12 }}>Active tenants over 6 months</div>
          <ResponsiveContainer width="100%" height={140}>
            <LineChart data={TENANT_GROWTH_DATA}>
              <CartesianGrid key="sa-tg-grid" strokeDasharray="3 3" stroke={T.border} />
              <XAxis key="sa-tg-x" dataKey="m" tick={{ fill: T.muted, fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis key="sa-tg-y" tick={{ fill: T.muted, fontSize: 9 }} axisLine={false} tickLine={false} />
              <Tooltip key="sa-tg-tooltip" contentStyle={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 8, color: T.text, fontSize: 11 }} />
              <Line key="tenant-growth-line" type="monotone" dataKey="tenants" stroke={T.primary} strokeWidth={2} dot={{ fill: T.primary, r: 3 }} isAnimationActive={false} name="Tenants" />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 14, padding: 20 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: T.text, marginBottom: 4 }}>API Volume (M calls)</div>
          <div style={{ fontSize: 11, color: T.muted, marginBottom: 12 }}>Monthly API call volume</div>
          <ResponsiveContainer width="100%" height={140}>
            <BarChart data={API_VOLUME_DATA}>
              <CartesianGrid key="sa-api-grid" strokeDasharray="3 3" stroke={T.border} />
              <XAxis key="sa-api-x" dataKey="m" tick={{ fill: T.muted, fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis key="sa-api-y" tick={{ fill: T.muted, fontSize: 9 }} axisLine={false} tickLine={false} />
              <Tooltip key="sa-api-tooltip" contentStyle={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 8, color: T.text, fontSize: 11 }} />
              <Bar key="api-volume-bar" dataKey="calls" fill={T.ai} radius={[4,4,0,0]} isAnimationActive={false} name="Calls (M)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 14, padding: 20 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: T.text, marginBottom: 4 }}>Tenant Health Summary</div>
          <div style={{ fontSize: 11, color: T.muted, marginBottom: 14 }}>Subscription status distribution</div>
          {[
            { label: "Active (Pro)", count: 28, pct: 67, color: T.success },
            { label: "Active (Starter)", count: 11, pct: 26, color: T.primary },
            { label: "Trial", count: 3, pct: 7, color: T.warning },
            { label: "At Risk", count: 3, pct: 7, color: T.danger },
          ].map(r => (
            <div key={r.label} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
              <div style={{ width: 60, fontSize: 10, color: T.muted, flexShrink: 0 }}>{r.label}</div>
              <div style={{ flex: 1, height: 6, background: T.dim, borderRadius: 3 }}>
                <div style={{ width: `${r.pct}%`, height: "100%", background: r.color, borderRadius: 3 }} />
              </div>
              <span style={{ fontSize: 10, color: r.color, fontFamily: "'JetBrains Mono',monospace", flexShrink: 0, width: 20, textAlign: "right" as const }}>{r.count}</span>
            </div>
          ))}
        </div>
      </div>

      <SecHeader title="Platform Activity" accent={T.primary} />
      <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 14, overflow: "hidden" }}>
        {[
          { color: T.success, cat: "Tenant", msg: "New tenant onboarded: Speedway Motors · Pro plan · 3 branches", time: "2h ago" },
          { color: T.primary, cat: "API", msg: "API throughput spike detected on tenant T-024 · auto-scaled", time: "3h ago" },
          { color: T.warning, cat: "Payment", msg: "Subscription renewal overdue: T-018 · ₹24,000 · 5d late", time: "6h ago" },
          { color: T.ai, cat: "AI", msg: "Model retrained on 42 tenant datasets · accuracy improved 2.1%", time: "8h ago" },
          { color: T.danger, cat: "Error", msg: "Error spike: T-031 · 14 5xx errors in 10min · auto-resolved", time: "12h ago" },
        ].map((a, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 18px", borderBottom: i < 4 ? `1px solid ${T.border}` : "none" }}>
            <div style={{ width: 7, height: 7, borderRadius: "50%", background: a.color, flexShrink: 0 }} />
            <span style={{ padding: "2px 7px", borderRadius: 4, background: `${a.color}14`, color: a.color, fontSize: 9, fontWeight: 700, letterSpacing: 0.5, flexShrink: 0 }}>{a.cat}</span>
            <span style={{ flex: 1, fontSize: 12, color: T.text }}>{a.msg}</span>
            <span style={{ fontSize: 10, color: T.muted, flexShrink: 0 }}>{a.time}</span>
          </div>
        ))}
      </div>
    </PageBg>
  );
}

// ── Export ────────────────────────────────────────────────────────────────────


type DashVariant = "executive" | "branch" | "sa" | "technician" | "finance" | "vendor" | "superadmin";
export function DashboardSuite({ variant }: { variant: DashVariant }) {
  if (variant === "branch") return <BranchDashboard />;
  if (variant === "sa") return <ServiceAdvisorDashboard />;
  if (variant === "technician") return <TechnicianDashboard />;
  if (variant === "finance") return <FinanceDashboard />;
  if (variant === "vendor") return <VendorDashboard />;
  if (variant === "superadmin") return <SuperAdminDashboard />;
  return <ExecutiveDashboard />;
}
