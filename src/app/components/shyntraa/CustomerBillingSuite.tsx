import { useState } from "react";
import {
  Search, Plus, Car, Phone, Mail, Star, ChevronRight, X,
  Users, ClipboardList, Calendar, Wrench, DollarSign, CreditCard,
  CheckCircle, AlertCircle, Clock, Target, Zap, ArrowRight,
  TrendingUp, Shield, Brain
} from "lucide-react";
import type { ShyntraRoute } from "../ShyntraaApp";
import { OperationsSuite } from "./OperationsSuite";

// ── Design Tokens (DTF App-D) ─────────────────────────────────────────────────
const T = {
  bg: "#0B1120", surface: "#111827", surfaceHover: "#1a2438",
  card: "#111827", border: "rgba(255,255,255,0.08)",
  text: "#F9FAFB", muted: "#9CA3AF", dim: "#374151", disabled: "#1F2937",
  primary: "#00E5FF", success: "#10B981", warning: "#F59E0B", danger: "#EF4444", ai: "#A3E635",
  amber: "#F59E0B", blue: "#00E5FF", green: "#10B981",
  red: "#EF4444", purple: "#7C3AED", cyan: "#00E5FF",
  orange: "#F97316", pink: "#F472B6", lime: "#A3E635",
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
  pink: "linear-gradient(135deg,#ec4899,#a855f7)",
};

function PageBg({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ background: T.bg, backgroundImage: "linear-gradient(rgba(0,229,255,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(0,229,255,0.02) 1px,transparent 1px)", backgroundSize: "32px 32px", minHeight: "100%", padding: 24, boxSizing: "border-box" as const }}>
      {children}
    </div>
  );
}

function SecHeader({ title, count, accent = T.blue }: { title: string; count?: number | string; accent?: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14, marginTop: 8 }}>
      <div style={{ width: 3, height: 18, borderRadius: 2, background: `linear-gradient(180deg,${accent},transparent)`, flexShrink: 0 }} />
      <span style={{ fontSize: 10, fontWeight: 700, color: T.muted, letterSpacing: 1.4, textTransform: "uppercase" as const }}>{title}</span>
      {count !== undefined && <span style={{ fontSize: 10, color: accent, background: `${accent}18`, padding: "1px 8px", borderRadius: 4, fontFamily: "'JetBrains Mono',monospace" }}>{count}</span>}
      <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg,${accent}25,transparent)` }} />
    </div>
  );
}

interface AiCardProps {
  icon: React.ReactNode; title: string; desc: string;
  stat?: React.ReactNode; statLabel?: string;
  gradient: string; glowColor: string;
  badge?: string; tag?: string; trend?: number;
  onClick?: () => void;
}
function AiCard({ icon, title, desc, stat, statLabel, gradient, glowColor, badge, tag, trend, onClick }: AiCardProps) {
  const [hov, setHov] = useState(false);
  return (
    <div onClick={onClick} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ background: hov ? "rgba(12,20,36,0.96)" : T.card, border: `1px solid ${hov ? glowColor + "55" : "rgba(59,127,255,0.09)"}`, borderRadius: 14, padding: "18px 20px", cursor: onClick ? "pointer" : "default", transition: "all 0.2s ease", boxShadow: hov ? `0 0 32px ${glowColor}18,0 8px 40px rgba(0,0,0,0.5)` : "0 2px 12px rgba(0,0,0,0.3)", backdropFilter: "blur(20px)", position: "relative" as const, overflow: "hidden" }}>
      <div style={{ position: "absolute", top: -24, right: -24, width: 80, height: 80, borderRadius: "50%", background: glowColor, opacity: hov ? 0.08 : 0.03, filter: "blur(20px)", pointerEvents: "none" as const, transition: "opacity 0.2s" }} />
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 14 }}>
        <div style={{ width: 44, height: 44, borderRadius: 12, background: gradient, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 4px 16px ${glowColor}40`, flexShrink: 0 }}>{icon}</div>
        <div style={{ display: "flex", flexDirection: "column" as const, alignItems: "flex-end", gap: 4 }}>
          {badge && <span style={{ padding: "2px 7px", borderRadius: 4, background: "rgba(163,230,53,0.1)", color: "#a3e635", fontSize: 9, fontWeight: 700, letterSpacing: 0.8, textTransform: "uppercase" as const, border: "1px solid rgba(163,230,53,0.2)" }}>{badge}</span>}
          {tag && !badge && <span style={{ padding: "2px 7px", borderRadius: 4, background: `${glowColor}14`, color: glowColor, fontSize: 9, fontWeight: 600 }}>{tag}</span>}
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

function Badge({ label, color }: { label: string; color: string }) {
  return <span style={{ padding: "3px 9px", borderRadius: 5, background: `${color}18`, color, fontSize: 11, fontWeight: 500 }}>{label}</span>;
}

// ─────────────────────────────────────────────────────────────────────────────
// CUSTOMER MANAGEMENT HUB  (like Masters page — the main landing)
// ─────────────────────────────────────────────────────────────────────────────
function CustomerHub({ navigate }: { navigate: (r: ShyntraRoute) => void }) {
  return (
    <PageBg>
      {/* Page Header */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
          <Users size={14} color={T.blue} />
          <span style={{ fontSize: 10, color: T.blue, fontWeight: 700, letterSpacing: 1.2, textTransform: "uppercase" as const }}>Customer Management</span>
        </div>
        <h1 style={{ color: T.text, margin: 0, fontFamily: "'Barlow Condensed',sans-serif", fontSize: 28, letterSpacing: 0.5 }}>Customer 360 Hub</h1>
        <p style={{ color: T.muted, margin: "4px 0 0", fontSize: 12 }}>Manage the complete customer lifecycle — from inquiry to payment</p>
      </div>

      {/* AI Insight Bar */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, background: "rgba(163,230,53,0.05)", border: "1px solid rgba(163,230,53,0.15)", borderRadius: 10, padding: "10px 16px", marginBottom: 24 }}>
        <Brain size={14} color={T.lime} />
        <span style={{ fontSize: 11, color: T.lime, fontWeight: 600 }}>AI Insight:</span>
        <span style={{ fontSize: 12, color: T.text }}>9 follow-ups overdue · 3 high-value customers haven't visited in 30+ days · Conversion rate up 4.1% this week</span>
        <div style={{ flex: 1 }} />
        <span style={{ fontSize: 10, color: T.lime, cursor: "pointer" }}>View All →</span>
      </div>

      {/* KPI strip */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 28 }}>
        <AiCard icon={<Users size={20} color="#fff" />} title="Total Customers" desc="8 new this week" stat="1,247" trend={3.2} gradient={G.blue} glowColor={T.blue} tag="8 New" />
        <AiCard icon={<Target size={20} color="#fff" />} title="Conversion Rate" desc="Inquiries → Paid jobs" stat="30.3%" trend={4.1} gradient={G.purple} glowColor={T.purple} badge="AI" />
        <AiCard icon={<DollarSign size={20} color="#fff" />} title="Avg Revenue / Customer" desc="Based on LTM data" stat="₹8,420" trend={12.6} gradient={G.amber} glowColor={T.amber} />
        <AiCard icon={<Star size={20} color="#fff" />} title="Satisfaction Score" desc="Based on 186 reviews" stat="4.7 / 5" trend={1.2} gradient={G.gold} glowColor={T.amber} />
      </div>

      {/* Customer Journey Modules */}
      <SecHeader title="Customer Journey — Full Lifecycle" accent={T.blue} />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 28 }}>
        <AiCard icon={<Users size={20} color="#fff" />} title="Customer Master" desc="Profiles, vehicles, history, 360 view" stat="1,247" statLabel="customers" gradient={G.blue} glowColor={T.blue} onClick={() => navigate("customers.master")} />
        <AiCard icon={<Zap size={20} color="#fff" />} title="Inquiry Management" desc="Kanban pipeline — New to Converted" stat="55" statLabel="active" gradient={G.indigo} glowColor={T.purple} tag="12 New" onClick={() => navigate("customers.inquiries")} badge="Live" />
        <AiCard icon={<Calendar size={20} color="#fff" />} title="Appointments" desc="Calendar, agenda, capacity view" stat="12" statLabel="today" gradient={G.cyan} glowColor={T.cyan} onClick={() => navigate("customers.appointments")} badge="Live" />
        <AiCard icon={<CheckCircle size={20} color="#fff" />} title="Inspections" desc="Digital checklists, photos, approvals" stat="8" statLabel="open" gradient={G.teal} glowColor={T.cyan} onClick={() => navigate("customers.inspections")} />
        <AiCard icon={<ClipboardList size={20} color="#fff" />} title="Job Cards" desc="Linear + Jira style board — 4 stages" stat="43" statLabel="active" gradient={G.blue} glowColor={T.blue} tag="2 Late" onClick={() => navigate("customers.jobcards")} badge="Live" />
        <AiCard icon={<Wrench size={20} color="#fff" />} title="Bay Management" desc="Live workshop floor view — 8 bays" stat="6 / 8" statLabel="active" gradient={G.teal} glowColor={T.cyan} onClick={() => navigate("customers.bays")} badge="Live" />
        <AiCard icon={<DollarSign size={20} color="#fff" />} title="Billing & Estimates" desc="Estimate builder, invoice, tax, discounts" stat="8" statLabel="pending" gradient={G.amber} glowColor={T.amber} onClick={() => navigate("customers.billing")} />
        <AiCard icon={<CreditCard size={20} color="#fff" />} title="Payment Tracking" desc="Outstanding aging, collections, refunds" stat="₹2.14L" statLabel="due" trend={-8.3} gradient={G.rose} glowColor={T.red} onClick={() => navigate("customers.payments")} tag="38 Inv" />
      </div>

      {/* Intelligence */}
      <SecHeader title="CRM Intelligence" accent={T.purple} />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginBottom: 28 }}>
        <AiCard icon={<Brain size={20} color="#fff" />} title="AI Follow-Up Queue" desc="Smart-ranked follow-ups by urgency and value" stat="9" statLabel="due today" trend={-15.2} gradient={G.indigo} glowColor={T.purple} badge="AI" />
        <AiCard icon={<TrendingUp size={20} color="#fff" />} title="Conversion Analytics" desc="Source-wise funnel breakdown and SA performance" stat="30.3%" trend={4.1} gradient={G.purple} glowColor={T.purple} badge="AI" />
        <AiCard icon={<Shield size={20} color="#fff" />} title="Customer Health Scores" desc="AI-computed loyalty and churn risk for all customers" stat="847" statLabel="healthy" gradient={G.green} glowColor={T.green} badge="AI" />
      </div>

      {/* Quick stats table */}
      <SecHeader title="Top Customers This Month" accent={T.amber} />
      <div style={{ background: T.card, border: "1px solid rgba(59,127,255,0.09)", borderRadius: 14, overflow: "hidden" }}>
        {[
          { name: "Deepak Singh", vehicle: "4 vehicles", spend: "₹3,45,000", tier: "Platinum", health: 99, tierColor: "#e879f9" },
          { name: "Raj Mehta", vehicle: "2 vehicles", spend: "₹1,24,000", tier: "Gold", health: 92, tierColor: T.amber },
          { name: "Arjun Rao", vehicle: "2 vehicles", spend: "₹89,200", tier: "Gold", health: 85, tierColor: T.amber },
          { name: "Vikram Joshi", vehicle: "3 vehicles", spend: "₹2,10,500", tier: "Platinum", health: 97, tierColor: "#e879f9" },
        ].map((c, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 16, padding: "13px 18px", borderBottom: i < 3 ? "1px solid rgba(59,127,255,0.06)" : "none" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(59,127,255,0.03)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "none")}>
            <div style={{ width: 34, height: 34, borderRadius: "50%", background: G.blue, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, color: "#fff", fontWeight: 600, flexShrink: 0 }}>
              {c.name.split(" ").map(w => w[0]).join("")}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, color: T.text, fontWeight: 500 }}>{c.name}</div>
              <div style={{ fontSize: 11, color: T.muted }}>{c.vehicle}</div>
            </div>
            <div style={{ fontSize: 14, color: T.amber, fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700 }}>{c.spend}</div>
            <Badge label={c.tier} color={c.tierColor} />
            <div style={{ width: 60, height: 5, background: "rgba(59,127,255,0.08)", borderRadius: 3, overflow: "hidden" }}>
              <div style={{ width: `${c.health}%`, height: "100%", background: T.green, borderRadius: 3 }} />
            </div>
            <ChevronRight size={14} color={T.dim} />
          </div>
        ))}
      </div>
    </PageBg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CUSTOMER MASTER TABLE (detail view)
// ─────────────────────────────────────────────────────────────────────────────
const CUSTOMERS = [
  { id: "C-001", name: "Raj Mehta", phone: "+91 98201 11234", email: "raj@email.com", vehicles: 2, lastVisit: "2 days ago", totalSpend: "₹1,24,000", tier: "Gold", health: 92 },
  { id: "C-002", name: "Priya Shah", phone: "+91 98765 43210", email: "priya@email.com", vehicles: 1, lastVisit: "1 week ago", totalSpend: "₹48,000", tier: "Silver", health: 78 },
  { id: "C-003", name: "Vikram Joshi", phone: "+91 99001 22334", email: "vikram@email.com", vehicles: 3, lastVisit: "Today", totalSpend: "₹2,10,500", tier: "Platinum", health: 97 },
  { id: "C-004", name: "Neha Kumar", phone: "+91 97890 56781", email: "neha@email.com", vehicles: 1, lastVisit: "3 weeks ago", totalSpend: "₹22,800", tier: "Bronze", health: 55 },
  { id: "C-005", name: "Arjun Rao", phone: "+91 96001 87654", email: "arjun@email.com", vehicles: 2, lastVisit: "5 days ago", totalSpend: "₹89,200", tier: "Gold", health: 85 },
  { id: "C-006", name: "Kavita Menon", phone: "+91 98500 33221", email: "kavita@email.com", vehicles: 1, lastVisit: "1 month ago", totalSpend: "₹15,400", tier: "Bronze", health: 40 },
  { id: "C-007", name: "Deepak Singh", phone: "+91 97100 44556", email: "deepak@email.com", vehicles: 4, lastVisit: "Yesterday", totalSpend: "₹3,45,000", tier: "Platinum", health: 99 },
  { id: "C-008", name: "Aarti Bose", phone: "+91 98312 67890", email: "aarti@email.com", vehicles: 1, lastVisit: "2 weeks ago", totalSpend: "₹34,600", tier: "Silver", health: 70 },
];
const tierColor: Record<string, string> = { Platinum: "#e879f9", Gold: T.amber, Silver: "#94a3b8", Bronze: "#d97706" };

const TIMELINE_DATA = [
  { date: "Jun 9", event: "Job Card Created", detail: "JC-2041 · Full Service + AC Repair", color: T.blue },
  { date: "Jun 8", event: "Appointment Confirmed", detail: "10:30 AM · Bay 2", color: T.amber },
  { date: "Jun 7", event: "Inquiry Received", detail: "BMW 520d · WhatsApp · Full Service", color: T.purple },
  { date: "May 15", event: "Invoice Paid", detail: "INV-1081 · ₹28,400 · Online Transfer", color: T.green },
  { date: "May 10", event: "Service Completed", detail: "JC-2028 · Wheel Alignment + Balancing", color: T.cyan },
];

function Customer360({ customer, onBack, navigate }: { customer: typeof CUSTOMERS[0]; onBack: () => void; navigate: (r: ShyntraRoute) => void }) {
  const [activeTab, setActiveTab] = useState("overview");
  return (
    <PageBg>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
        <button onClick={onBack} style={{ padding: "5px 12px", borderRadius: 6, border: "1px solid rgba(59,127,255,0.2)", background: "none", color: T.muted, fontSize: 12, cursor: "pointer" }}>← Back</button>
        <div style={{ flex: 1 }}>
          <h2 style={{ color: T.text, margin: 0, fontFamily: "'Barlow Condensed',sans-serif", fontSize: 24 }}>{customer.name}</h2>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 2 }}>
            <span style={{ fontSize: 11, color: T.muted, fontFamily: "'JetBrains Mono',monospace" }}>{customer.id}</span>
            <Badge label={customer.tier} color={tierColor[customer.tier]} />
          </div>
        </div>
        <button onClick={() => navigate("customers.appointments")} style={{ padding: "7px 14px", borderRadius: 7, background: T.blue, border: "none", color: "#fff", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>Book Appointment</button>
      </div>
      <div style={{ display: "flex", gap: 2, borderBottom: "1px solid rgba(59,127,255,0.1)", marginBottom: 20 }}>
        {["overview", "timeline", "vehicles", "invoices"].map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} style={{ padding: "8px 16px", background: "none", border: "none", borderBottom: activeTab === tab ? `2px solid ${T.amber}` : "2px solid transparent", color: activeTab === tab ? T.amber : T.muted, fontSize: 12, cursor: "pointer", textTransform: "capitalize" as const, marginBottom: -1 }}>{tab}</button>
        ))}
      </div>
      {activeTab === "overview" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14 }}>
          <AiCard icon={<DollarSign size={20} color="#fff" />} title="Total Spend" desc="Lifetime value" stat={customer.totalSpend} gradient={G.amber} glowColor={T.amber} />
          <AiCard icon={<Car size={20} color="#fff" />} title="Vehicles" desc="Registered vehicles" stat={String(customer.vehicles)} gradient={G.blue} glowColor={T.blue} />
          <AiCard icon={<Star size={20} color="#fff" />} title="Health Score" desc="AI-computed loyalty score" stat={`${customer.health}/100`} gradient={customer.health > 80 ? G.green : G.amber} glowColor={customer.health > 80 ? T.green : T.amber} badge="AI" />
          <div style={{ background: T.card, border: "1px solid rgba(59,127,255,0.09)", borderRadius: 12, padding: 16, gridColumn: "1/2" }}>
            <div style={{ fontSize: 11, color: T.muted, fontWeight: 600, marginBottom: 10 }}>Contact Details</div>
            {[{ icon: <Phone size={12} />, val: customer.phone }, { icon: <Mail size={12} />, val: customer.email }].map((c, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: T.text, marginBottom: 6 }}>
                <span style={{ color: T.muted }}>{c.icon}</span>{c.val}
              </div>
            ))}
          </div>
          <div style={{ background: T.card, border: "1px solid rgba(59,127,255,0.09)", borderRadius: 12, padding: 16, gridColumn: "2/4" }}>
            <div style={{ fontSize: 11, color: T.muted, fontWeight: 600, marginBottom: 10 }}>Recent Activity</div>
            {TIMELINE_DATA.slice(0, 4).map((t, i) => (
              <div key={i} style={{ display: "flex", gap: 10, padding: "6px 0", borderBottom: i < 3 ? "1px solid rgba(59,127,255,0.06)" : "none" }}>
                <div style={{ width: 7, height: 7, borderRadius: "50%", background: t.color, marginTop: 4, flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, color: T.text }}>{t.event}</div>
                  <div style={{ fontSize: 11, color: T.muted }}>{t.detail}</div>
                </div>
                <span style={{ fontSize: 10, color: T.dim }}>{t.date}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      {activeTab === "timeline" && (
        <div style={{ background: T.card, border: "1px solid rgba(59,127,255,0.09)", borderRadius: 12, padding: 20 }}>
          <div style={{ position: "relative", paddingLeft: 24 }}>
            <div style={{ position: "absolute", left: 7, top: 0, bottom: 0, width: 1, background: "rgba(59,127,255,0.15)" }} />
            {TIMELINE_DATA.map((t, i) => (
              <div key={i} style={{ position: "relative", marginBottom: 20 }}>
                <div style={{ position: "absolute", left: -20, width: 10, height: 10, borderRadius: "50%", background: t.color, border: `2px solid ${T.bg}`, top: 2, boxShadow: `0 0 8px ${t.color}60` }} />
                <div style={{ display: "flex", gap: 12 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, color: T.text, fontWeight: 500 }}>{t.event}</div>
                    <div style={{ fontSize: 12, color: T.muted, marginTop: 2 }}>{t.detail}</div>
                  </div>
                  <span style={{ fontSize: 11, color: T.dim, flexShrink: 0 }}>{t.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {(activeTab === "vehicles" || activeTab === "invoices") && (
        <div style={{ background: T.card, border: "1px solid rgba(59,127,255,0.09)", borderRadius: 12, padding: 32, display: "flex", alignItems: "center", justifyContent: "center", minHeight: 160 }}>
          <span style={{ fontSize: 13, color: T.muted }}>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} — {customer.name}</span>
        </div>
      )}
    </PageBg>
  );
}

function CustomerMaster({ navigate }: { navigate: (r: ShyntraRoute) => void }) {
  const [search, setSearch] = useState("");
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const [selected, setSelected] = useState<typeof CUSTOMERS[0] | null>(null);
  if (selected) return <Customer360 customer={selected} onBack={() => setSelected(null)} navigate={navigate} />;
  const filtered = CUSTOMERS.filter(c => (!search || c.name.toLowerCase().includes(search.toLowerCase())) && (!selectedTier || c.tier === selectedTier));
  return (
    <PageBg>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
        <div><h2 style={{ color: T.text, margin: 0, fontFamily: "'Barlow Condensed',sans-serif", fontSize: 24 }}>Customer Master</h2><p style={{ color: T.muted, fontSize: 12, margin: "2px 0 0" }}>{CUSTOMERS.length} customers registered</p></div>
        <div style={{ flex: 1 }} />
        <div style={{ display: "flex", alignItems: "center", gap: 8, background: "rgba(59,127,255,0.06)", borderRadius: 7, padding: "6px 12px", border: "1px solid rgba(59,127,255,0.15)" }}>
          <Search size={13} color={T.muted} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search customers..." style={{ background: "none", border: "none", outline: "none", color: T.text, fontSize: 12, width: 180 }} />
        </div>
        <button style={{ display: "flex", alignItems: "center", gap: 6, padding: "7px 14px", borderRadius: 7, background: T.amber, border: "none", color: "#000", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
          <Plus size={14} /> New Customer
        </button>
      </div>
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        {[null, "Platinum", "Gold", "Silver", "Bronze"].map(tier => (
          <button key={tier ?? "all"} onClick={() => setSelectedTier(tier)} style={{ padding: "5px 14px", borderRadius: 6, border: `1px solid ${selectedTier === tier ? (tier ? tierColor[tier] : T.amber) : "rgba(59,127,255,0.15)"}`, background: selectedTier === tier ? `${tier ? tierColor[tier] : T.amber}14` : "none", color: selectedTier === tier ? (tier ? tierColor[tier] : T.amber) : T.muted, fontSize: 12, cursor: "pointer" }}>
            {tier ?? "All Tiers"}
          </button>
        ))}
      </div>
      <div style={{ background: T.card, border: "1px solid rgba(59,127,255,0.09)", borderRadius: 14, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" as const, fontSize: 12 }}>
          <thead><tr style={{ borderBottom: "1px solid rgba(59,127,255,0.08)" }}>{["Customer", "Contact", "Vehicles", "Last Visit", "Total Spend", "Tier", "Health", ""].map(h => <th key={h} style={{ padding: "10px 14px", textAlign: "left" as const, color: T.muted, fontWeight: 600, fontSize: 10, letterSpacing: 0.8, textTransform: "uppercase" as const }}>{h}</th>)}</tr></thead>
          <tbody>
            {filtered.map(c => (
              <tr key={c.id} style={{ borderBottom: "1px solid rgba(59,127,255,0.05)", cursor: "pointer" }} onMouseEnter={e => (e.currentTarget.style.background = "rgba(59,127,255,0.03)")} onMouseLeave={e => (e.currentTarget.style.background = "none")} onClick={() => setSelected(c)}>
                <td style={{ padding: "12px 14px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 32, height: 32, borderRadius: "50%", background: G.blue, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: "#fff", fontWeight: 600 }}>{c.name.split(" ").map(w => w[0]).join("")}</div>
                    <div><div style={{ color: T.text, fontWeight: 500 }}>{c.name}</div><div style={{ color: T.dim, fontSize: 10, fontFamily: "'JetBrains Mono',monospace" }}>{c.id}</div></div>
                  </div>
                </td>
                <td style={{ padding: "12px 14px", color: T.muted }}><div>{c.phone}</div><div style={{ fontSize: 10, color: T.dim }}>{c.email}</div></td>
                <td style={{ padding: "12px 14px", color: T.text, textAlign: "center" as const }}>{c.vehicles}</td>
                <td style={{ padding: "12px 14px", color: T.muted }}>{c.lastVisit}</td>
                <td style={{ padding: "12px 14px", color: T.amber, fontWeight: 700, fontFamily: "'Barlow Condensed',sans-serif", fontSize: 14 }}>{c.totalSpend}</td>
                <td style={{ padding: "12px 14px" }}><Badge label={c.tier} color={tierColor[c.tier]} /></td>
                <td style={{ padding: "12px 14px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ flex: 1, height: 5, background: "rgba(59,127,255,0.08)", borderRadius: 3, overflow: "hidden" }}><div style={{ width: `${c.health}%`, height: "100%", background: c.health > 80 ? T.green : c.health > 50 ? T.amber : T.red, borderRadius: 3 }} /></div>
                    <span style={{ fontSize: 11, color: T.muted, width: 24 }}>{c.health}</span>
                  </div>
                </td>
                <td style={{ padding: "12px 14px" }}><ChevronRight size={14} color={T.dim} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PageBg>
  );
}

// ── Appointments ──────────────────────────────────────────────────────────────
const APPTS = [
  { time: "09:00", name: "Raj Mehta", vehicle: "BMW 520d", service: "Full Service", tech: "Suresh N.", status: "In Progress", color: T.blue },
  { time: "10:30", name: "Priya Shah", vehicle: "Toyota Fortuner", service: "AC Repair", tech: "Anand P.", status: "Waiting", color: T.amber },
  { time: "11:00", name: "Arjun Kumar", vehicle: "Honda City", service: "Detailing", tech: "Ravi K.", status: "Confirmed", color: T.green },
  { time: "12:00", name: "Deepa Nair", vehicle: "Hyundai Creta", service: "Brake Pads", tech: "Deepak S.", status: "Confirmed", color: T.green },
  { time: "14:00", name: "Vikram Shah", vehicle: "Maruti Swift", service: "Oil Change", tech: "Vikram J.", status: "Pending", color: T.muted },
  { time: "15:30", name: "Neha Joshi", vehicle: "Kia Seltos", service: "Alignment", tech: "Suresh N.", status: "Pending", color: T.muted },
  { time: "17:00", name: "Manish Gupta", vehicle: "Audi Q3", service: "Full Service", tech: "Anand P.", status: "Confirmed", color: T.green },
];

function AppointmentCalendar() {
  const days = ["Mon 9", "Tue 10", "Wed 11", "Thu 12", "Fri 13", "Sat 14", "Sun 15"];
  const [activeDay, setActiveDay] = useState("Mon 9");
  return (
    <PageBg>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
        <div><h2 style={{ color: T.text, margin: 0, fontFamily: "'Barlow Condensed',sans-serif", fontSize: 24 }}>Appointments</h2><p style={{ color: T.muted, fontSize: 12, margin: "2px 0 0" }}>Week of Jun 9 · 7 appointments today</p></div>
        <div style={{ flex: 1 }} />
        <button style={{ display: "flex", alignItems: "center", gap: 6, padding: "7px 14px", borderRadius: 7, background: T.amber, border: "none", color: "#000", fontSize: 12, fontWeight: 600, cursor: "pointer" }}><Plus size={14} /> New Appointment</button>
      </div>
      <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
        {days.map(d => <button key={d} onClick={() => setActiveDay(d)} style={{ flex: 1, padding: "10px 0", borderRadius: 8, border: `1px solid ${d === activeDay ? T.amber : "rgba(59,127,255,0.15)"}`, background: d === activeDay ? `${T.amber}12` : "none", color: d === activeDay ? T.amber : T.muted, fontSize: 12, cursor: "pointer" }}>{d}</button>)}
      </div>
      <div style={{ background: T.card, border: "1px solid rgba(59,127,255,0.09)", borderRadius: 14, overflow: "hidden" }}>
        {APPTS.map((a, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 16, padding: "14px 20px", borderBottom: i < APPTS.length - 1 ? "1px solid rgba(59,127,255,0.06)" : "none" }}
            onMouseEnter={e => (e.currentTarget.style.background = "rgba(59,127,255,0.03)")} onMouseLeave={e => (e.currentTarget.style.background = "none")}>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 13, color: T.amber, width: 50, flexShrink: 0 }}>{a.time}</div>
            <div style={{ flex: 1 }}><div style={{ fontSize: 13, color: T.text, fontWeight: 500 }}>{a.name}</div><div style={{ fontSize: 12, color: T.muted }}>{a.vehicle} · {a.service}</div></div>
            <div style={{ fontSize: 12, color: T.dim }}>{a.tech}</div>
            <Badge label={a.status} color={a.color} />
            <ChevronRight size={14} color={T.dim} />
          </div>
        ))}
      </div>
    </PageBg>
  );
}

// ── Estimate Builder ──────────────────────────────────────────────────────────
type LineItem = { id: number; type: "labour" | "parts"; description: string; qty: number; rate: number };
const DEFAULT_ITEMS: LineItem[] = [
  { id: 1, type: "labour", description: "Engine Oil Change (5W-40 Synthetic)", qty: 1, rate: 2800 },
  { id: 2, type: "parts", description: "Oil Filter — OEM", qty: 1, rate: 650 },
  { id: 3, type: "labour", description: "AC Service — Gas Top-up + Cleaning", qty: 1, rate: 3500 },
  { id: 4, type: "parts", description: "AC Refrigerant R134a (200g)", qty: 2, rate: 480 },
  { id: 5, type: "labour", description: "Wheel Alignment + Balancing", qty: 1, rate: 1800 },
];

function EstimateBuilder() {
  const [items, setItems] = useState<LineItem[]>(DEFAULT_ITEMS);
  const [discount, setDiscount] = useState(500);
  const [approved, setApproved] = useState(false);
  const subtotal = items.reduce((s, i) => s + i.qty * i.rate, 0);
  const gst = Math.round((subtotal - discount) * 0.18);
  const total = subtotal - discount + gst;
  function updateItem(id: number, field: keyof LineItem, val: string | number) {
    setItems(prev => prev.map(i => i.id === id ? { ...i, [field]: val } : i));
  }
  return (
    <PageBg>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
        <div><h2 style={{ color: T.text, margin: 0, fontFamily: "'Barlow Condensed',sans-serif", fontSize: 24 }}>Estimate Builder</h2><p style={{ color: T.muted, fontSize: 12, margin: "2px 0 0" }}>EST-0289 · JC-2041 · Raj Mehta · BMW 520d</p></div>
        <div style={{ flex: 1 }} />
        <button style={{ padding: "7px 14px", borderRadius: 7, border: "1px solid rgba(59,127,255,0.2)", background: "none", color: T.muted, fontSize: 12, cursor: "pointer" }}>Preview PDF</button>
        <button style={{ padding: "7px 14px", borderRadius: 7, border: `1px solid ${T.amber}50`, background: `${T.amber}12`, color: T.amber, fontSize: 12, cursor: "pointer" }}>Send to Customer</button>
        {approved && <Badge label="Approved" color={T.green} />}
      </div>
      <div style={{ background: T.card, border: "1px solid rgba(59,127,255,0.09)", borderRadius: 14, overflow: "hidden", marginBottom: 20 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 80px 70px 100px 110px 36px", padding: "10px 16px", borderBottom: "1px solid rgba(59,127,255,0.08)" }}>
          {["Description", "Type", "Qty", "Rate (₹)", "Amount", ""].map(h => <div key={h} style={{ fontSize: 10, color: T.muted, fontWeight: 700, letterSpacing: 0.6 }}>{h}</div>)}
        </div>
        {items.map(item => (
          <div key={item.id} style={{ display: "grid", gridTemplateColumns: "1fr 80px 70px 100px 110px 36px", alignItems: "center", padding: "10px 16px", borderBottom: "1px solid rgba(59,127,255,0.05)" }}>
            <input value={item.description} onChange={e => updateItem(item.id, "description", e.target.value)} style={{ background: "rgba(59,127,255,0.04)", border: "1px solid transparent", borderRadius: 5, color: T.text, fontSize: 12, padding: "5px 8px", outline: "none" }} onFocus={e => (e.target.style.borderColor = "rgba(59,127,255,0.3)")} onBlur={e => (e.target.style.borderColor = "transparent")} />
            <Badge label={item.type === "labour" ? "Labour" : "Parts"} color={item.type === "labour" ? T.blue : T.cyan} />
            <input type="number" value={item.qty} onChange={e => updateItem(item.id, "qty", parseInt(e.target.value) || 1)} style={{ width: 56, background: "rgba(59,127,255,0.04)", border: "1px solid rgba(59,127,255,0.15)", borderRadius: 5, color: T.text, fontSize: 12, padding: "5px 8px", outline: "none", textAlign: "center" as const }} />
            <input type="number" value={item.rate} onChange={e => updateItem(item.id, "rate", parseInt(e.target.value) || 0)} style={{ width: 90, background: "rgba(59,127,255,0.04)", border: "1px solid rgba(59,127,255,0.15)", borderRadius: 5, color: T.text, fontSize: 12, padding: "5px 8px", outline: "none", textAlign: "right" as const }} />
            <div style={{ fontSize: 12, color: T.amber, fontFamily: "'JetBrains Mono',monospace", textAlign: "right" as const }}>₹{(item.qty * item.rate).toLocaleString("en-IN")}</div>
            <button onClick={() => setItems(p => p.filter(i => i.id !== item.id))} style={{ background: "none", border: "none", color: T.dim, cursor: "pointer" }}><X size={13} /></button>
          </div>
        ))}
        <div style={{ padding: "10px 16px" }}>
          <button onClick={() => setItems(p => [...p, { id: Date.now(), type: "labour", description: "New line item", qty: 1, rate: 0 }])} style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 12px", borderRadius: 6, border: "1px dashed rgba(59,127,255,0.2)", background: "none", color: T.muted, fontSize: 12, cursor: "pointer" }}>
            <Plus size={12} /> Add Line Item
          </button>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <div style={{ background: T.card, border: "1px solid rgba(59,127,255,0.09)", borderRadius: 14, padding: 20, width: 320 }}>
          {[{ label: "Subtotal", val: `₹${subtotal.toLocaleString("en-IN")}`, c: T.text }, { label: "Discount", val: `-₹${discount.toLocaleString("en-IN")}`, c: T.green }, { label: "GST (18%)", val: `₹${gst.toLocaleString("en-IN")}`, c: T.muted }].map(r => (
            <div key={r.label} style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 8 }}>
              <span style={{ color: T.muted }}>{r.label}</span>
              <span style={{ color: r.c, fontFamily: "'JetBrains Mono',monospace" }}>{r.val}</span>
            </div>
          ))}
          <div style={{ borderTop: "1px solid rgba(59,127,255,0.1)", paddingTop: 12, display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
            <span style={{ color: T.text, fontWeight: 600 }}>Total</span>
            <span style={{ color: T.amber, fontFamily: "'Barlow Condensed',sans-serif", fontSize: 24, fontWeight: 700 }}>₹{total.toLocaleString("en-IN")}</span>
          </div>
          <button onClick={() => setApproved(true)} style={{ width: "100%", marginTop: 14, padding: 9, borderRadius: 7, background: approved ? `${T.green}14` : T.amber, border: approved ? `1px solid ${T.green}40` : "none", color: approved ? T.green : "#000", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
            {approved ? "✓ Estimate Approved" : "Mark as Approved"}
          </button>
        </div>
      </div>
    </PageBg>
  );
}

// ── Payment Tracking ──────────────────────────────────────────────────────────
const PAYMENTS = [
  { id: "INV-1089", customer: "Raj Mehta", amount: 18400, due: "Jun 9", status: "Pending", color: T.amber },
  { id: "INV-1088", customer: "Priya Shah", amount: 9800, due: "Jun 7", status: "Overdue", color: T.red },
  { id: "INV-1087", customer: "Vikram Joshi", amount: 34200, due: "Jun 5", status: "Overdue", color: T.red },
  { id: "INV-1086", customer: "Arjun Kumar", amount: 6500, due: "Jun 9", status: "Pending", color: T.amber },
  { id: "INV-1085", customer: "Neha Singh", amount: 12800, due: "Jun 10", status: "Due Soon", color: T.orange },
  { id: "INV-1084", customer: "Kavita Menon", amount: 4200, due: "May 30", status: "Paid", color: T.green },
];

function PaymentTracking() {
  return (
    <PageBg>
      <div style={{ marginBottom: 20 }}><h2 style={{ color: T.text, margin: 0, fontFamily: "'Barlow Condensed',sans-serif", fontSize: 24 }}>Payment Tracking</h2><p style={{ color: T.muted, fontSize: 12, margin: "2px 0 0" }}>Outstanding: ₹2,14,200 across 38 invoices</p></div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 24 }}>
        <AiCard icon={<AlertCircle size={20} color="#fff" />} title="Total Outstanding" desc="38 invoices across all customers" stat="₹2,14,200" gradient={G.red} glowColor={T.red} />
        <AiCard icon={<Clock size={20} color="#fff" />} title="Due Today" desc="Must collect today" stat="₹24,900" gradient={G.amber} glowColor={T.amber} badge="Live" />
        <AiCard icon={<TrendingUp size={20} color="#fff" />} title="Overdue" desc="Past due date — escalation needed" stat="₹44,000" trend={-12.1} gradient={G.rose} glowColor={T.red} />
        <AiCard icon={<CheckCircle size={20} color="#fff" />} title="Collected Today" desc="Cash + digital payments" stat="₹38,600" trend={8.4} gradient={G.green} glowColor={T.green} />
      </div>
      <div style={{ background: T.card, border: "1px solid rgba(59,127,255,0.09)", borderRadius: 14, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" as const, fontSize: 12 }}>
          <thead><tr style={{ borderBottom: "1px solid rgba(59,127,255,0.08)" }}>{["Invoice", "Customer", "Amount", "Due Date", "Status", "Action"].map(h => <th key={h} style={{ padding: "10px 14px", textAlign: "left" as const, color: T.muted, fontWeight: 600, fontSize: 10, letterSpacing: 0.8, textTransform: "uppercase" as const }}>{h}</th>)}</tr></thead>
          <tbody>
            {PAYMENTS.map(p => (
              <tr key={p.id} style={{ borderBottom: "1px solid rgba(59,127,255,0.05)" }} onMouseEnter={e => (e.currentTarget.style.background = "rgba(59,127,255,0.03)")} onMouseLeave={e => (e.currentTarget.style.background = "none")}>
                <td style={{ padding: "12px 14px", color: T.amber, fontFamily: "'JetBrains Mono',monospace" }}>{p.id}</td>
                <td style={{ padding: "12px 14px", color: T.text }}>{p.customer}</td>
                <td style={{ padding: "12px 14px", color: T.amber, fontFamily: "'Barlow Condensed',sans-serif", fontSize: 14, fontWeight: 700 }}>₹{p.amount.toLocaleString("en-IN")}</td>
                <td style={{ padding: "12px 14px", color: T.muted }}>{p.due}</td>
                <td style={{ padding: "12px 14px" }}><Badge label={p.status} color={p.color} /></td>
                <td style={{ padding: "12px 14px" }}>{p.status !== "Paid" && <button style={{ padding: "4px 12px", borderRadius: 5, border: `1px solid ${T.green}40`, background: `${T.green}10`, color: T.green, fontSize: 11, cursor: "pointer" }}>Collect</button>}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PageBg>
  );
}

// ── Estimate List (SCR-022) ───────────────────────────────────────────────────
const ESTIMATES = [
  { id: "EST-0291", customer: "Priya Shah", vehicle: "Toyota Fortuner", amount: "₹42,500", status: "Pending Approval", statusColor: "#F59E0B", date: "09 Jun 2025" },
  { id: "EST-0290", customer: "Arjun Kumar", vehicle: "Honda City", amount: "₹18,200", status: "Approved", statusColor: "#10B981", date: "08 Jun 2025" },
  { id: "EST-0289", customer: "Raj Mehta", vehicle: "BMW 520d", amount: "₹64,800", status: "In Progress", statusColor: "#00E5FF", date: "07 Jun 2025" },
  { id: "EST-0288", customer: "Deepa Nair", vehicle: "Hyundai Creta", amount: "₹12,400", status: "Rejected", statusColor: "#EF4444", date: "06 Jun 2025" },
  { id: "EST-0287", customer: "Vikram Shah", vehicle: "Maruti Swift", amount: "₹8,900", status: "Approved", statusColor: "#10B981", date: "05 Jun 2025" },
];

function EstimateList() {
  const [search, setSearch] = useState("");
  const filtered = ESTIMATES.filter(e => e.customer.toLowerCase().includes(search.toLowerCase()) || e.id.toLowerCase().includes(search.toLowerCase()));
  return (
    <PageBg>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
            <DollarSign size={14} color={T.amber} />
            <span style={{ fontSize: 10, color: T.amber, fontWeight: 700, letterSpacing: 1.2, textTransform: "uppercase" as const }}>Estimates</span>
          </div>
          <h1 style={{ color: T.text, margin: 0, fontSize: 24, fontWeight: 700 }}>Estimate Management</h1>
          <p style={{ color: T.muted, margin: "4px 0 0", fontSize: 12 }}>Customer Management › Estimates</p>
        </div>
        <button style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 8, background: T.amber, border: "none", color: "#000", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>
          <Plus size={14} /> New Estimate
        </button>
      </div>
      <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
        <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 8, background: T.card, border: `1px solid ${T.border}`, borderRadius: 8, padding: "8px 12px" }}>
          <Search size={13} color={T.muted} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search estimates..." style={{ background: "none", border: "none", outline: "none", color: T.text, fontSize: 12, flex: 1 }} />
        </div>
        {["All", "Pending", "Approved", "Rejected"].map(f => (
          <button key={f} style={{ padding: "8px 14px", borderRadius: 8, border: `1px solid ${T.border}`, background: "none", color: T.muted, fontSize: 11, cursor: "pointer" }}>{f}</button>
        ))}
      </div>
      <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 14, overflow: "hidden" }}>
        <div style={{ display: "grid", gridTemplateColumns: "120px 1fr 1fr 120px 160px 100px", padding: "10px 18px", borderBottom: `1px solid ${T.border}` }}>
          {["Estimate ID", "Customer", "Vehicle", "Amount", "Status", "Date"].map(h => (
            <div key={h} style={{ fontSize: 10, color: T.muted, fontWeight: 700, letterSpacing: 0.8, textTransform: "uppercase" as const }}>{h}</div>
          ))}
        </div>
        {filtered.map((e, i) => (
          <div key={e.id} style={{ display: "grid", gridTemplateColumns: "120px 1fr 1fr 120px 160px 100px", padding: "12px 18px", borderBottom: i < filtered.length - 1 ? `1px solid ${T.border}` : "none", cursor: "pointer" }}
            onMouseEnter={ev => (ev.currentTarget.style.background = T.surfaceHover)}
            onMouseLeave={ev => (ev.currentTarget.style.background = "none")}>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: T.amber }}>{e.id}</div>
            <div style={{ fontSize: 12, color: T.text, fontWeight: 500 }}>{e.customer}</div>
            <div style={{ fontSize: 12, color: T.muted }}>{e.vehicle}</div>
            <div style={{ fontSize: 12, color: T.text, fontFamily: "'JetBrains Mono',monospace" }}>{e.amount}</div>
            <div><span style={{ padding: "3px 9px", borderRadius: 5, background: `${e.statusColor}18`, color: e.statusColor, fontSize: 11 }}>{e.status}</span></div>
            <div style={{ fontSize: 11, color: T.muted }}>{e.date}</div>
          </div>
        ))}
      </div>
    </PageBg>
  );
}

// ── Payment Tracking stub uses existing — extend section type ─────────────────

// ── Export ────────────────────────────────────────────────────────────────────
type CustSection = "hub" | "master" | "inquiries" | "appointments" | "inspections" | "jobcards" | "estimates" | "billing" | "payments" | "360";
export function CustomerBillingSuite({ section, navigate }: { section: CustSection; navigate: (r: ShyntraRoute) => void }) {
  if (section === "hub") return <CustomerHub navigate={navigate} />;
  if (section === "appointments") return <AppointmentCalendar />;
  if (section === "estimates") return <EstimateList />;
  if (section === "billing") return <EstimateBuilder />;
  if (section === "payments") return <PaymentTracking />;
  if (section === "inquiries" || section === "jobcards" || section === "bays" || section === "inspections") {
    return <OperationsSuite section={section as any} />;
  }
  if (section === "360") return <CustomerMaster navigate={navigate} />;
  if (section === "master") return <CustomerMaster navigate={navigate} />;
  return <CustomerHub navigate={navigate} />;
}
