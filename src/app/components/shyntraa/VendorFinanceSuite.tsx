import { useState, useId } from "react";
import { Plus, Search, Star, TrendingUp, TrendingDown, ChevronRight, FileText, Package, CheckCircle, Activity, DollarSign, AlertCircle, BarChart3, BookOpen, ArrowUpRight, Brain, Zap, Receipt, Users, Building2, Globe } from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, LineChart, Line
} from "recharts";
import type { ShyntraRoute } from "../ShyntraaApp";

// DTF App-D tokens
const S = {
  bg: "#0B1120", card: "#111827", card2: "#1a2438",
  border: "rgba(255,255,255,0.08)", text: "#F9FAFB", muted: "#9CA3AF", dim: "#374151",
  amber: "#F59E0B", blue: "#00E5FF", green: "#10B981", red: "#EF4444",
  purple: "#7C3AED", cyan: "#00E5FF", orange: "#F97316", lime: "#A3E635",
  primary: "#00E5FF", success: "#10B981", warning: "#F59E0B", danger: "#EF4444",
  surfaceHover: "#1a2438",
};

function Card({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return <div style={{ background: S.card, border: `1px solid ${S.border}`, borderRadius: 10, ...style }}>{children}</div>;
}

function Badge({ label, color }: { label: string; color: string }) {
  return <span style={{ padding: "3px 9px", borderRadius: 5, background: `${color}18`, color, fontSize: 11 }}>{label}</span>;
}

// ─────────────────────────────────────────────────────────────────────────────
// VENDOR MASTER
// ─────────────────────────────────────────────────────────────────────────────

const VENDORS = [
  { id: "V-001", name: "AutoParts India Pvt Ltd", category: "Parts", contact: "+91 98001 11234", city: "Mumbai", rating: 4.8, orders: 142, spend: "₹18.4L", status: "Active", tags: ["OEM", "Trusted"] },
  { id: "V-002", name: "Lubricants Direct", category: "Lubricants", contact: "+91 97002 22345", city: "Pune", rating: 4.5, orders: 89, spend: "₹6.2L", status: "Active", tags: ["Preferred"] },
  { id: "V-003", name: "TyreWorld Distributors", category: "Tyres", contact: "+91 96003 33456", city: "Chennai", rating: 4.2, orders: 56, spend: "₹22.1L", status: "Active", tags: ["High Volume"] },
  { id: "V-004", name: "ElectroParts Solutions", category: "Electrical", contact: "+91 95004 44567", city: "Bangalore", rating: 3.9, orders: 34, spend: "₹4.8L", status: "Review", tags: [] },
  { id: "V-005", name: "BodyShop Materials Co.", category: "Paint & Body", contact: "+91 94005 55678", city: "Delhi", rating: 4.6, orders: 71, spend: "₹9.3L", status: "Active", tags: ["OEM", "Premium"] },
  { id: "V-006", name: "FilterHub India", category: "Filters", contact: "+91 93006 66789", city: "Mumbai", rating: 4.1, orders: 210, spend: "₹3.1L", status: "Active", tags: [] },
];

function StarRating({ val }: { val: number }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} size={11} fill={i <= Math.round(val) ? S.amber : "none"} color={i <= Math.round(val) ? S.amber : S.dim} />
      ))}
      <span style={{ fontSize: 11, color: S.muted, marginLeft: 3 }}>{val}</span>
    </div>
  );
}

function VendorMaster() {
  const [search, setSearch] = useState("");
  const [cat, setCat] = useState<string | null>(null);

  const cats = Array.from(new Set(VENDORS.map((v) => v.category)));
  const filtered = VENDORS.filter((v) => {
    const ms = !search || v.name.toLowerCase().includes(search.toLowerCase());
    const mc = !cat || v.category === cat;
    return ms && mc;
  });

  return (
    <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div>
          <h2 style={{ color: S.text, margin: 0 }}>Vendor Master</h2>
          <p style={{ color: S.muted, fontSize: 12, margin: "2px 0 0" }}>{VENDORS.length} vendors · ₹63.9L total spend</p>
        </div>
        <div style={{ flex: 1 }} />
        <div style={{ display: "flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.04)", borderRadius: 7, padding: "6px 12px", border: `1px solid ${S.border}` }}>
          <Search size={13} color={S.muted} />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search vendors..." style={{ background: "none", border: "none", outline: "none", color: S.text, fontSize: 12, width: 160 }} />
        </div>
        <button style={{ display: "flex", alignItems: "center", gap: 6, padding: "7px 14px", borderRadius: 7, background: S.amber, border: "none", color: "#000", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
          <Plus size={14} /> Add Vendor
        </button>
      </div>

      <div style={{ display: "flex", gap: 8 }}>
        {[null, ...cats].map((c) => (
          <button key={c ?? "all"} onClick={() => setCat(c)} style={{ padding: "5px 14px", borderRadius: 6, border: `1px solid ${cat === c ? S.amber : S.border}`, background: cat === c ? `${S.amber}18` : "none", color: cat === c ? S.amber : S.muted, fontSize: 12, cursor: "pointer" }}>
            {c ?? "All"}
          </button>
        ))}
      </div>

      <Card>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${S.border}` }}>
              {["Vendor", "Category", "City", "Rating", "Orders", "Total Spend", "Status", ""].map((h) => (
                <th key={h} style={{ padding: "10px 14px", textAlign: "left", color: S.muted, fontWeight: 500 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((v) => (
              <tr key={v.id} style={{ borderBottom: `1px solid ${S.border}`, cursor: "pointer" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.02)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "none")}>
                <td style={{ padding: "12px 14px" }}>
                  <div style={{ color: S.text, fontWeight: 500 }}>{v.name}</div>
                  <div style={{ color: S.dim, fontSize: 11, fontFamily: "'JetBrains Mono', monospace" }}>{v.id} · {v.contact}</div>
                  <div style={{ display: "flex", gap: 4, marginTop: 4 }}>
                    {v.tags.map((t) => <span key={t} style={{ padding: "1px 6px", borderRadius: 3, background: `${S.blue}18`, color: S.blue, fontSize: 10 }}>{t}</span>)}
                  </div>
                </td>
                <td style={{ padding: "12px 14px", color: S.muted }}>{v.category}</td>
                <td style={{ padding: "12px 14px", color: S.muted }}>{v.city}</td>
                <td style={{ padding: "12px 14px" }}><StarRating val={v.rating} /></td>
                <td style={{ padding: "12px 14px", color: S.text, textAlign: "center" }}>{v.orders}</td>
                <td style={{ padding: "12px 14px", color: S.amber, fontFamily: "'Barlow Condensed', sans-serif", fontSize: 14 }}>{v.spend}</td>
                <td style={{ padding: "12px 14px" }}>
                  <Badge label={v.status} color={v.status === "Active" ? S.green : S.amber} />
                </td>
                <td style={{ padding: "12px 14px" }}><ChevronRight size={14} color={S.dim} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PROCUREMENT / PURCHASE ORDERS
// ─────────────────────────────────────────────────────────────────────────────

const PURCHASE_ORDERS = [
  { id: "PO-0481", vendor: "AutoParts India Pvt Ltd", items: 12, amount: "₹42,800", date: "Jun 8", status: "Approved", delivery: "Jun 12" },
  { id: "PO-0480", vendor: "Lubricants Direct", items: 4, amount: "₹18,200", date: "Jun 6", status: "Pending Approval", delivery: "Jun 14" },
  { id: "PO-0479", vendor: "TyreWorld Distributors", items: 8, amount: "₹1,24,000", date: "Jun 4", status: "In Transit", delivery: "Jun 10" },
  { id: "PO-0478", vendor: "FilterHub India", items: 20, amount: "₹8,400", date: "Jun 2", status: "Delivered", delivery: "Jun 5" },
  { id: "PO-0477", vendor: "BodyShop Materials Co.", items: 6, amount: "₹31,600", date: "May 30", status: "Delivered", delivery: "Jun 3" },
];

const poStatusColor: Record<string, string> = {
  "Approved": S.blue, "Pending Approval": S.amber, "In Transit": S.purple, "Delivered": S.green,
};

function Procurement() {
  return (
    <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div>
          <h2 style={{ color: S.text, margin: 0 }}>Procurement</h2>
          <p style={{ color: S.muted, fontSize: 12, margin: "2px 0 0" }}>Purchase Requests · Orders · Goods Receipt</p>
        </div>
        <div style={{ flex: 1 }} />
        <button style={{ display: "flex", alignItems: "center", gap: 6, padding: "7px 14px", borderRadius: 7, background: S.amber, border: "none", color: "#000", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
          <Plus size={14} /> New Purchase Request
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}>
        {[
          { label: "Open POs", value: "12", color: S.blue },
          { label: "Pending Approval", value: "4", color: S.amber },
          { label: "In Transit", value: "3", color: S.purple },
          { label: "This Month Spend", value: "₹4.8L", color: S.green },
        ].map((k) => (
          <Card key={k.label} style={{ padding: "16px 20px" }}>
            <div style={{ fontSize: 22, fontWeight: 700, color: k.color, fontFamily: "'Barlow Condensed', sans-serif" }}>{k.value}</div>
            <div style={{ fontSize: 12, color: S.muted }}>{k.label}</div>
          </Card>
        ))}
      </div>

      <Card>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${S.border}` }}>
              {["PO Number", "Vendor", "Items", "Amount", "Order Date", "Expected Delivery", "Status", ""].map((h) => (
                <th key={h} style={{ padding: "10px 14px", textAlign: "left", color: S.muted, fontWeight: 500 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {PURCHASE_ORDERS.map((po) => (
              <tr key={po.id} style={{ borderBottom: `1px solid ${S.border}`, cursor: "pointer" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.02)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "none")}>
                <td style={{ padding: "12px 14px", color: S.amber, fontFamily: "'JetBrains Mono', monospace" }}>{po.id}</td>
                <td style={{ padding: "12px 14px", color: S.text }}>{po.vendor}</td>
                <td style={{ padding: "12px 14px", color: S.muted, textAlign: "center" }}>{po.items}</td>
                <td style={{ padding: "12px 14px", color: S.amber, fontFamily: "'Barlow Condensed', sans-serif", fontSize: 14 }}>{po.amount}</td>
                <td style={{ padding: "12px 14px", color: S.muted }}>{po.date}</td>
                <td style={{ padding: "12px 14px", color: S.muted }}>{po.delivery}</td>
                <td style={{ padding: "12px 14px" }}><Badge label={po.status} color={poStatusColor[po.status]} /></td>
                <td style={{ padding: "12px 14px" }}><ChevronRight size={14} color={S.dim} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// FINANCIAL MANAGEMENT — P&L
// ─────────────────────────────────────────────────────────────────────────────

const plRevenue = [
  { label: "Workshop Services", value: 3820000, prev: 3210000 },
  { label: "Detailing Services", value: 980000, prev: 820000 },
  { label: "Parts Sales", value: 1240000, prev: 1100000 },
  { label: "AMC / Contracts", value: 420000, prev: 380000 },
];

const plExpenses = [
  { label: "Cost of Parts", value: 860000, prev: 780000 },
  { label: "Technician Labour", value: 1240000, prev: 1100000 },
  { label: "Rent & Utilities", value: 380000, prev: 360000 },
  { label: "Marketing", value: 120000, prev: 95000 },
  { label: "Admin & Overheads", value: 210000, prev: 195000 },
  { label: "Depreciation", value: 95000, prev: 95000 },
];

const plMonthly = [
  { m: "Jan", revenue: 510000, expense: 380000 },
  { m: "Feb", revenue: 545000, expense: 395000 },
  { m: "Mar", revenue: 610000, expense: 420000 },
  { m: "Apr", revenue: 580000, expense: 410000 },
  { m: "May", revenue: 640000, expense: 435000 },
  { m: "Jun", revenue: 575000, expense: 365000 },
];

function fmt(n: number) { return `₹${(n / 100000).toFixed(2)}L`; }
function diff(cur: number, prev: number) {
  const pct = ((cur - prev) / prev * 100).toFixed(1);
  const up = cur >= prev;
  return <span style={{ fontSize: 11, color: up ? S.green : S.red, marginLeft: 8 }}>{up ? "▲" : "▼"} {Math.abs(Number(pct))}%</span>;
}

function ProfitLoss() {
  const totalRevenue = plRevenue.reduce((s, r) => s + r.value, 0);
  const totalExpenses = plExpenses.reduce((s, r) => s + r.value, 0);
  const netProfit = totalRevenue - totalExpenses;
  const margin = ((netProfit / totalRevenue) * 100).toFixed(1);

  return (
    <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div>
          <h2 style={{ color: S.text, margin: 0 }}>Profit & Loss</h2>
          <p style={{ color: S.muted, fontSize: 12, margin: "2px 0 0" }}>FY 2025–26 · Apr 2025 – Jun 2025 (Q1)</p>
        </div>
        <div style={{ flex: 1 }} />
        <button style={{ padding: "7px 14px", borderRadius: 7, border: `1px solid ${S.border}`, background: "none", color: S.muted, fontSize: 12, cursor: "pointer" }}>Export PDF</button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
        {[
          { label: "Total Revenue", value: fmt(totalRevenue), color: S.green, trend: "+18.2%" },
          { label: "Total Expenses", value: fmt(totalExpenses), color: S.red, trend: "+12.4%" },
          { label: "Net Profit", value: fmt(netProfit), color: S.amber, trend: `${margin}% margin` },
        ].map((k) => (
          <Card key={k.label} style={{ padding: "16px 20px" }}>
            <div style={{ fontSize: 24, fontWeight: 700, color: k.color, fontFamily: "'Barlow Condensed', sans-serif" }}>{k.value}</div>
            <div style={{ fontSize: 12, color: S.muted }}>{k.label}</div>
            <div style={{ fontSize: 11, color: k.color, marginTop: 2 }}>{k.trend}</div>
          </Card>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 14 }}>
        <Card style={{ padding: 20 }}>
          <div style={{ fontSize: 12, color: S.muted, marginBottom: 12, fontWeight: 600 }}>Revenue vs Expenses — Monthly</div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={plMonthly} barSize={14} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke={S.border} vertical={false} />
              <XAxis dataKey="m" tick={{ fill: S.muted, fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: S.muted, fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${(v / 100000).toFixed(0)}L`} />
              <Tooltip contentStyle={{ background: S.card2, border: `1px solid ${S.border}`, borderRadius: 8, color: S.text, fontSize: 12 }} formatter={(v: number) => [fmt(v)]} />
              <Bar key="pl-revenue" dataKey="revenue" fill={S.green} radius={[4, 4, 0, 0]} isAnimationActive={false} name="Revenue" />
              <Bar key="pl-expense" dataKey="expense" fill={S.red} radius={[4, 4, 0, 0]} isAnimationActive={false} name="Expenses" opacity={0.7} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {/* Revenue Breakdown */}
          <Card style={{ padding: 16 }}>
            <div style={{ fontSize: 12, color: S.muted, marginBottom: 10, fontWeight: 600 }}>Revenue Breakdown</div>
            {plRevenue.map((r) => (
              <div key={r.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 12, marginBottom: 6 }}>
                <span style={{ color: S.text }}>{r.label}</span>
                <span style={{ color: S.green, fontFamily: "'JetBrains Mono', monospace" }}>
                  {fmt(r.value)} {diff(r.value, r.prev)}
                </span>
              </div>
            ))}
          </Card>
        </div>
      </div>

      {/* Expense Breakdown */}
      <Card style={{ padding: 20 }}>
        <div style={{ fontSize: 12, color: S.muted, marginBottom: 10, fontWeight: 600 }}>Expense Breakdown</div>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${S.border}` }}>
              {["Expense Head", "Current Period", "Previous Period", "Variance", "% of Revenue"].map((h) => (
                <th key={h} style={{ padding: "8px 12px", textAlign: "left", color: S.dim, fontWeight: 500 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {plExpenses.map((e) => {
              const variance = e.value - e.prev;
              const pct = ((e.value / totalRevenue) * 100).toFixed(1);
              return (
                <tr key={e.label} style={{ borderBottom: `1px solid ${S.border}` }}>
                  <td style={{ padding: "9px 12px", color: S.text }}>{e.label}</td>
                  <td style={{ padding: "9px 12px", color: S.red, fontFamily: "'JetBrains Mono', monospace" }}>{fmt(e.value)}</td>
                  <td style={{ padding: "9px 12px", color: S.muted, fontFamily: "'JetBrains Mono', monospace" }}>{fmt(e.prev)}</td>
                  <td style={{ padding: "9px 12px", color: variance > 0 ? S.red : S.green, fontFamily: "'JetBrains Mono', monospace" }}>
                    {variance > 0 ? "+" : ""}{fmt(variance)}
                  </td>
                  <td style={{ padding: "9px 12px", color: S.muted }}>{pct}%</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// LEDGER VIEW
// ─────────────────────────────────────────────────────────────────────────────

const LEDGER_ENTRIES = [
  { date: "Jun 9", ref: "INV-1089", narration: "Service Invoice — Raj Mehta", debit: 18400, credit: 0, balance: 214200 },
  { date: "Jun 9", ref: "RCP-0412", narration: "Payment Received — Vikram Joshi", debit: 0, credit: 34200, balance: 195800 },
  { date: "Jun 8", ref: "PO-0481", narration: "Parts Purchase — AutoParts India", debit: 42800, credit: 0, balance: 230000 },
  { date: "Jun 8", ref: "INV-1088", narration: "Service Invoice — Priya Shah", debit: 9800, credit: 0, balance: 187200 },
  { date: "Jun 7", ref: "RCP-0411", narration: "Cash Collection — Neha Kumar", debit: 0, credit: 12800, balance: 177400 },
  { date: "Jun 7", ref: "EXP-0210", narration: "Utilities — Electricity Bill", debit: 18200, credit: 0, balance: 190200 },
  { date: "Jun 6", ref: "INV-1087", narration: "Service Invoice — Vikram Joshi", debit: 34200, credit: 0, balance: 172000 },
  { date: "Jun 5", ref: "RCP-0410", narration: "Payment Received — Arjun Kumar", debit: 0, credit: 6500, balance: 137800 },
];

function LedgerView() {
  return (
    <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div>
          <h2 style={{ color: S.text, margin: 0 }}>Ledger</h2>
          <p style={{ color: S.muted, fontSize: 12, margin: "2px 0 0" }}>Debtors Ledger · FY 2025–26</p>
        </div>
        <div style={{ flex: 1 }} />
        <select style={{ padding: "6px 12px", borderRadius: 6, border: `1px solid ${S.border}`, background: S.card2, color: S.muted, fontSize: 12, outline: "none" }}>
          {["Debtors", "Creditors", "Bank", "Cash", "Sales", "Purchase"].map((l) => <option key={l}>{l}</option>)}
        </select>
      </div>

      <Card>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${S.border}` }}>
              {["Date", "Reference", "Narration", "Debit (₹)", "Credit (₹)", "Balance (₹)"].map((h) => (
                <th key={h} style={{ padding: "10px 14px", textAlign: "left", color: S.muted, fontWeight: 500 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {LEDGER_ENTRIES.map((e, i) => (
              <tr key={i} style={{ borderBottom: `1px solid ${S.border}` }}
                onMouseEnter={(el) => (el.currentTarget.style.background = "rgba(255,255,255,0.02)")}
                onMouseLeave={(el) => (el.currentTarget.style.background = "none")}>
                <td style={{ padding: "10px 14px", color: S.muted }}>{e.date}</td>
                <td style={{ padding: "10px 14px", color: S.amber, fontFamily: "'JetBrains Mono', monospace" }}>{e.ref}</td>
                <td style={{ padding: "10px 14px", color: S.text }}>{e.narration}</td>
                <td style={{ padding: "10px 14px", color: e.debit ? S.red : S.dim, fontFamily: "'JetBrains Mono', monospace", textAlign: "right" }}>
                  {e.debit ? e.debit.toLocaleString("en-IN") : "—"}
                </td>
                <td style={{ padding: "10px 14px", color: e.credit ? S.green : S.dim, fontFamily: "'JetBrains Mono', monospace", textAlign: "right" }}>
                  {e.credit ? e.credit.toLocaleString("en-IN") : "—"}
                </td>
                <td style={{ padding: "10px 14px", color: S.amber, fontFamily: "'JetBrains Mono', monospace", textAlign: "right" }}>
                  {e.balance.toLocaleString("en-IN")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// REPORTING CATALOG
// ─────────────────────────────────────────────────────────────────────────────

const REPORTS = [
  { name: "Revenue Summary Report", cat: "Financial", desc: "Daily/Weekly/Monthly/YTD revenue with branch comparison", freq: "Daily", icon: "📊" },
  { name: "Job Card Lifecycle Report", cat: "Operations", desc: "Average TAT, stage breakdown, technician efficiency", freq: "Weekly", icon: "🔧" },
  { name: "Technician Productivity", cat: "HR", desc: "Jobs per tech, hours logged, QC pass rate", freq: "Weekly", icon: "👷" },
  { name: "Bay Utilization Report", cat: "Operations", desc: "Hourly/daily bay utilization with peak analysis", freq: "Daily", icon: "🏗" },
  { name: "Customer Retention Report", cat: "CRM", desc: "Repeat visit rate, health score trends, churn analysis", freq: "Monthly", icon: "👥" },
  { name: "Inquiry Conversion Report", cat: "CRM", desc: "Stage-wise funnel, source analysis, SA performance", freq: "Weekly", icon: "📈" },
  { name: "Vendor Performance Report", cat: "Procurement", desc: "Delivery timelines, quality scores, spend analysis", freq: "Monthly", icon: "🚚" },
  { name: "Outstanding Aging Report", cat: "Financial", desc: "0–30 / 31–60 / 61–90 / 90+ days aging buckets", freq: "Daily", icon: "💰" },
  { name: "GST Summary Report", cat: "Compliance", desc: "GSTR-1, GSTR-3B ready data with HSN summary", freq: "Monthly", icon: "📋" },
];

function ReportCatalog() {
  const [cat, setCat] = useState<string | null>(null);
  const cats = Array.from(new Set(REPORTS.map((r) => r.cat)));
  const filtered = !cat ? REPORTS : REPORTS.filter((r) => r.cat === cat);

  return (
    <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 20 }}>
      <div>
        <h2 style={{ color: S.text, margin: 0 }}>Report Catalog</h2>
        <p style={{ color: S.muted, fontSize: 12, margin: "2px 0 0" }}>Pre-built reports · Scheduled exports · Analytics</p>
      </div>

      <div style={{ display: "flex", gap: 8 }}>
        {[null, ...cats].map((c) => (
          <button key={c ?? "all"} onClick={() => setCat(c)} style={{ padding: "5px 14px", borderRadius: 6, border: `1px solid ${cat === c ? S.amber : S.border}`, background: cat === c ? `${S.amber}18` : "none", color: cat === c ? S.amber : S.muted, fontSize: 12, cursor: "pointer" }}>
            {c ?? "All"}
          </button>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
        {filtered.map((r) => (
          <Card key={r.name} style={{ padding: 18, cursor: "pointer", transition: "border-color 0.15s" }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = `${S.amber}50`)}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = S.border)}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
              <div style={{ fontSize: 24, lineHeight: 1 }}>{r.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, color: S.text, fontWeight: 500, marginBottom: 4 }}>{r.name}</div>
                <div style={{ fontSize: 11, color: S.muted, marginBottom: 10 }}>{r.desc}</div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ padding: "2px 7px", borderRadius: 4, background: `${S.blue}18`, color: S.blue, fontSize: 10 }}>{r.cat}</span>
                  <span style={{ fontSize: 10, color: S.dim }}>{r.freq}</span>
                </div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
              <button style={{ flex: 1, padding: "6px", borderRadius: 6, border: `1px solid ${S.border}`, background: "none", color: S.muted, fontSize: 11, cursor: "pointer" }}>Run</button>
              <button style={{ flex: 1, padding: "6px", borderRadius: 6, border: `1px solid ${S.amber}40`, background: `${S.amber}10`, color: S.amber, fontSize: 11, cursor: "pointer" }}>Schedule</button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// BALANCE SHEET & CASH FLOW (simplified)
// ─────────────────────────────────────────────────────────────────────────────

function BalanceSheet() {
  const assets = [
    { label: "Cash & Bank", value: 8420000 },
    { label: "Accounts Receivable", value: 2140000 },
    { label: "Inventory / Stock", value: 3850000 },
    { label: "Fixed Assets (Net)", value: 12400000 },
    { label: "Prepaid Expenses", value: 240000 },
  ];
  const liabilities = [
    { label: "Accounts Payable", value: 1820000 },
    { label: "Short-term Loans", value: 2500000 },
    { label: "GST Payable", value: 380000 },
    { label: "Long-term Loans", value: 4200000 },
  ];
  const totalAssets = assets.reduce((s, a) => s + a.value, 0);
  const totalLiab = liabilities.reduce((s, l) => s + l.value, 0);
  const equity = totalAssets - totalLiab;

  return (
    <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 20 }}>
      <h2 style={{ color: S.text, margin: 0 }}>Balance Sheet</h2>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        <Card style={{ padding: 20 }}>
          <div style={{ fontSize: 13, color: S.green, fontWeight: 600, marginBottom: 14 }}>ASSETS</div>
          {assets.map((a) => (
            <div key={a.label} style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 10 }}>
              <span style={{ color: S.muted }}>{a.label}</span>
              <span style={{ color: S.text, fontFamily: "'JetBrains Mono', monospace" }}>{fmt(a.value)}</span>
            </div>
          ))}
          <div style={{ borderTop: `1px solid ${S.border}`, paddingTop: 10, display: "flex", justifyContent: "space-between", fontSize: 13, fontWeight: 600 }}>
            <span style={{ color: S.green }}>Total Assets</span>
            <span style={{ color: S.green, fontFamily: "'Barlow Condensed', sans-serif", fontSize: 18 }}>{fmt(totalAssets)}</span>
          </div>
        </Card>
        <Card style={{ padding: 20 }}>
          <div style={{ fontSize: 13, color: S.red, fontWeight: 600, marginBottom: 14 }}>LIABILITIES & EQUITY</div>
          {liabilities.map((l) => (
            <div key={l.label} style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 10 }}>
              <span style={{ color: S.muted }}>{l.label}</span>
              <span style={{ color: S.text, fontFamily: "'JetBrains Mono', monospace" }}>{fmt(l.value)}</span>
            </div>
          ))}
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 10, marginTop: 12, paddingTop: 10, borderTop: `1px solid ${S.border}` }}>
            <span style={{ color: S.amber }}>Owner's Equity</span>
            <span style={{ color: S.amber, fontFamily: "'JetBrains Mono', monospace" }}>{fmt(equity)}</span>
          </div>
          <div style={{ borderTop: `1px solid ${S.border}`, paddingTop: 10, display: "flex", justifyContent: "space-between", fontSize: 13, fontWeight: 600 }}>
            <span style={{ color: S.red }}>Total Liab + Equity</span>
            <span style={{ color: S.red, fontFamily: "'Barlow Condensed', sans-serif", fontSize: 18 }}>{fmt(totalAssets)}</span>
          </div>
        </Card>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SHARED LAYOUT HELPERS
// ─────────────────────────────────────────────────────────────────────────────
function VFPageBg({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ background: S.bg, backgroundImage: "linear-gradient(rgba(0,229,255,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(0,229,255,0.02) 1px,transparent 1px)", backgroundSize: "32px 32px", minHeight: "100%", padding: 24, boxSizing: "border-box" as const }}>
      {children}
    </div>
  );
}
function VFSecHeader({ title, accent = S.primary }: { title: string; accent?: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14, marginTop: 8 }}>
      <div style={{ width: 3, height: 18, borderRadius: 2, background: `linear-gradient(180deg,${accent},transparent)`, flexShrink: 0 }} />
      <span style={{ fontSize: 10, fontWeight: 700, color: S.muted, letterSpacing: 1.4, textTransform: "uppercase" as const }}>{title}</span>
      <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg,${accent}25,transparent)` }} />
    </div>
  );
}
function VFKpiCard({ label, val, sub, color }: { label: string; val: string; sub: string; color: string }) {
  return (
    <div style={{ background: S.card, border: `1px solid ${S.border}`, borderRadius: 14, padding: "18px 20px" }}>
      <div style={{ fontSize: 11, color: S.muted, marginBottom: 8 }}>{label}</div>
      <div style={{ fontSize: 26, fontWeight: 700, color, marginBottom: 4 }}>{val}</div>
      <div style={{ fontSize: 11, color: S.dim }}>{sub}</div>
    </div>
  );
}
function VFNavCard({ icon, title, desc, stat, gradient, glowColor, badge, onClick }: { icon: React.ReactNode; title: string; desc: string; stat?: string; gradient: string; glowColor: string; badge?: string; onClick?: () => void }) {
  const [hov, setHov] = useState(false);
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} onClick={onClick}
      style={{ background: hov ? S.card2 : S.card, border: `1px solid ${hov ? glowColor + "55" : S.border}`, borderRadius: 14, padding: "18px 20px", cursor: onClick ? "pointer" : "default", transition: "all 0.2s", boxShadow: hov ? `0 0 32px ${glowColor}18,0 8px 40px rgba(0,0,0,0.5)` : "0 2px 12px rgba(0,0,0,0.3)", position: "relative" as const, overflow: "hidden" }}>
      <div style={{ position: "absolute", top: -24, right: -24, width: 80, height: 80, borderRadius: "50%", background: glowColor, opacity: hov ? 0.08 : 0.03, filter: "blur(20px)", pointerEvents: "none" as const }} />
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 14 }}>
        <div style={{ width: 44, height: 44, borderRadius: 12, background: gradient, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 4px 16px ${glowColor}40`, flexShrink: 0 }}>{icon}</div>
        {badge && <span style={{ padding: "2px 7px", borderRadius: 4, background: "rgba(163,230,53,0.1)", color: "#A3E635", fontSize: 9, fontWeight: 700, border: "1px solid rgba(163,230,53,0.2)" }}>{badge}</span>}
      </div>
      <div style={{ fontSize: 13, fontWeight: 600, color: S.text, marginBottom: 4 }}>{title}</div>
      <div style={{ fontSize: 11, color: S.muted, lineHeight: 1.5 }}>{desc}</div>
      {stat && <div style={{ fontSize: 18, fontWeight: 700, color: glowColor, marginTop: 10, paddingTop: 10, borderTop: `1px solid ${S.border}` }}>{stat}</div>}
    </div>
  );
}
function VFActivityFeed({ items }: { items: Array<{ color: string; cat: string; msg: string; time: string }> }) {
  return (
    <div style={{ background: S.card, border: `1px solid ${S.border}`, borderRadius: 14, overflow: "hidden" }}>
      {items.map((a, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 18px", borderBottom: i < items.length - 1 ? `1px solid ${S.border}` : "none" }}>
          <div style={{ width: 7, height: 7, borderRadius: "50%", background: a.color, flexShrink: 0 }} />
          <span style={{ padding: "2px 7px", borderRadius: 4, background: `${a.color}14`, color: a.color, fontSize: 9, fontWeight: 700, flexShrink: 0 }}>{a.cat}</span>
          <span style={{ flex: 1, fontSize: 12, color: S.text }}>{a.msg}</span>
          <span style={{ fontSize: 10, color: S.muted, flexShrink: 0 }}>{a.time}</span>
        </div>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// VENDOR HUB (SCR-035)
// ─────────────────────────────────────────────────────────────────────────────
function VendorHub({ navigate }: { navigate: (r: ShyntraRoute) => void }) {
  return (
    <VFPageBg>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 20 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
            <Package size={14} color={S.warning} />
            <span style={{ fontSize: 10, color: S.warning, fontWeight: 700, letterSpacing: 1.2, textTransform: "uppercase" as const }}>Vendor Management</span>
          </div>
          <h1 style={{ color: S.text, margin: 0, fontSize: 26, fontWeight: 700 }}>Vendor Hub</h1>
          <p style={{ color: S.muted, margin: "4px 0 0", fontSize: 12 }}>Suppliers, procurement, purchase orders, goods receipt</p>
        </div>
        <button style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 8, background: S.warning, border: "none", color: "#000", fontSize: 12, fontWeight: 700, cursor: "pointer" }}><Plus size={14} /> New Vendor</button>
      </div>
      {/* AI Strip */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 24 }}>
        <VFNavCard icon={<AlertCircle size={18} color="#fff" />} title="Vendor Risk" desc="3 vendors flagged — delivery delays + quality issues" stat="3 at risk" gradient="linear-gradient(135deg,#ef4444,#f97316)" glowColor={S.danger} badge="AI" />
        <VFNavCard icon={<TrendingUp size={18} color="#fff" />} title="Spend Forecast" desc="Projected procurement spend for next 30 days" stat="₹3.8L" gradient="linear-gradient(135deg,#f59e0b,#f97316)" glowColor={S.warning} badge="AI" />
        <VFNavCard icon={<Activity size={18} color="#fff" />} title="Quality Score" desc="Avg quality score across active vendors this month" stat="88.6%" gradient="linear-gradient(135deg,#22c55e,#10b981)" glowColor={S.success} badge="AI" />
        <VFNavCard icon={<Brain size={18} color="#fff" />} title="Collection Risk" desc="2 vendor invoices flagged for payment delay risk" stat="2 flagged" gradient="linear-gradient(135deg,#a855f7,#6366f1)" glowColor={S.purple} badge="AI" />
      </div>
      {/* KPI Row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 24 }}>
        <VFKpiCard label="Active Vendors" val="42" sub="8 added this month" color={S.primary} />
        <VFKpiCard label="Open POs" val="14" sub="₹4.2L total value" color={S.warning} />
        <VFKpiCard label="Month Spend" val="₹2.98L" sub="+4.6% vs last month" color={S.success} />
        <VFKpiCard label="Pending GRNs" val="5" sub="2 overdue matching" color={S.danger} />
      </div>
      {/* Widget Grid */}
      <VFSecHeader title="Vendor Module Navigation" accent={S.warning} />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 24 }}>
        <VFNavCard icon={<Building2 size={20} color="#fff" />} title="Vendor Master" desc="Vendor profiles, ratings, history" stat="42 vendors" gradient="linear-gradient(135deg,#f59e0b,#f97316)" glowColor={S.warning} onClick={() => navigate("vendors.master")} />
        <VFNavCard icon={<FileText size={20} color="#fff" />} title="Purchase Requests" desc="PR approval queue — raise and approve" stat="8 pending" gradient="linear-gradient(135deg,#a855f7,#6366f1)" glowColor={S.purple} onClick={() => navigate("vendors.requests")} />
        <VFNavCard icon={<Package size={20} color="#fff" />} title="Purchase Orders" desc="Full PO lifecycle management" stat="14 open" gradient="linear-gradient(135deg,#06b6d4,#3b82f6)" glowColor={S.primary} onClick={() => navigate("vendors.orders")} />
        <VFNavCard icon={<CheckCircle size={20} color="#fff" />} title="Goods Receipt" desc="GRN matching, quantity checks, quality flags" stat="5 pending" gradient="linear-gradient(135deg,#22c55e,#10b981)" glowColor={S.success} onClick={() => navigate("vendors.goods-receipt")} />
      </div>
      <VFSecHeader title="Recent Activity" accent={S.warning} />
      <VFActivityFeed items={[
        { color: S.danger, cat: "Quality", msg: "GRN-318: 2 defective brake pads — Sharma Parts — flagged", time: "1h ago" },
        { color: S.warning, cat: "Delivery", msg: "PO-435 overdue 2 days — Speed Motors — escalate", time: "3h ago" },
        { color: S.success, cat: "GRN", msg: "GRN-317 confirmed · PO-439 fully matched · Cool AC Parts", time: "6h ago" },
        { color: S.primary, cat: "PO", msg: "PO-441 sent to Sharma Parts · ₹42,000 · confirmed 2h", time: "8h ago" },
      ]} />
    </VFPageBg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PURCHASE REQUESTS (SCR-039)
// ─────────────────────────────────────────────────────────────────────────────
const PRS = [
  { id: "PR-218", requestedBy: "Suresh Nair", items: "Brake pads × 10 · Oil filters × 5", vendor: "Sharma Parts", amount: "₹28,400", status: "Pending Approval", statusColor: "#F59E0B", date: "09 Jun 2025" },
  { id: "PR-217", requestedBy: "Pradeep Kumar", items: "Tyre set × 4 · Alignment kit", vendor: "TyreWorld", amount: "₹32,000", status: "Approved", statusColor: "#10B981", date: "08 Jun 2025" },
  { id: "PR-216", requestedBy: "Vinod Sharma", items: "AC refrigerant × 8 units", vendor: "Cool AC Parts", amount: "₹18,500", status: "Rejected", statusColor: "#EF4444", date: "07 Jun 2025" },
  { id: "PR-215", requestedBy: "Ramesh Pillai", items: "Spark plugs × 20 · Wiring harness × 2", vendor: "ElectroParts", amount: "₹14,200", status: "Converted to PO", statusColor: "#00E5FF", date: "06 Jun 2025" },
];

function PurchaseRequests() {
  return (
    <VFPageBg>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
            <FileText size={14} color={S.purple} />
            <span style={{ fontSize: 10, color: S.purple, fontWeight: 700, letterSpacing: 1.2, textTransform: "uppercase" as const }}>Vendor Management › Purchase Requests</span>
          </div>
          <h1 style={{ color: S.text, margin: 0, fontSize: 24, fontWeight: 700 }}>Purchase Requests</h1>
        </div>
        <button style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 8, background: S.purple, border: "none", color: "#fff", fontSize: 12, fontWeight: 700, cursor: "pointer" }}><Plus size={14} /> New PR</button>
      </div>
      <div style={{ background: S.card, border: `1px solid ${S.border}`, borderRadius: 14, overflow: "hidden" }}>
        <div style={{ display: "grid", gridTemplateColumns: "90px 1fr 1fr 1fr 120px 150px 100px", padding: "10px 18px", borderBottom: `1px solid ${S.border}` }}>
          {["PR-ID", "Requested By", "Items", "Vendor", "Amount", "Status", "Date"].map(h => (
            <div key={h} style={{ fontSize: 10, color: S.muted, fontWeight: 700, letterSpacing: 0.8, textTransform: "uppercase" as const }}>{h}</div>
          ))}
        </div>
        {PRS.map((pr, i) => (
          <div key={pr.id} style={{ display: "grid", gridTemplateColumns: "90px 1fr 1fr 1fr 120px 150px 100px", padding: "12px 18px", borderBottom: i < PRS.length - 1 ? `1px solid ${S.border}` : "none", alignItems: "center" }}
            onMouseEnter={e => (e.currentTarget.style.background = S.surfaceHover)}
            onMouseLeave={e => (e.currentTarget.style.background = "none")}>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: S.warning }}>{pr.id}</div>
            <div style={{ fontSize: 12, color: S.text }}>{pr.requestedBy}</div>
            <div style={{ fontSize: 11, color: S.muted }}>{pr.items}</div>
            <div style={{ fontSize: 11, color: S.muted }}>{pr.vendor}</div>
            <div style={{ fontSize: 12, color: S.text, fontFamily: "'JetBrains Mono',monospace" }}>{pr.amount}</div>
            <div><span style={{ padding: "3px 9px", borderRadius: 5, background: `${pr.statusColor}18`, color: pr.statusColor, fontSize: 11 }}>{pr.status}</span></div>
            <div style={{ fontSize: 11, color: S.muted }}>{pr.date}</div>
          </div>
        ))}
      </div>
    </VFPageBg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// GOODS RECEIPT (SCR-043)
// ─────────────────────────────────────────────────────────────────────────────
const GRNS = [
  { id: "GRN-318", po: "PO-441", vendor: "Sharma Parts", items: "Brake pads × 10", qty: "8/10", variance: "2 short", status: "Variance", statusColor: "#F59E0B" },
  { id: "GRN-317", po: "PO-439", vendor: "Cool AC Parts", items: "AC compressor × 2", qty: "2/2", variance: "None", status: "Confirmed", statusColor: "#10B981" },
  { id: "GRN-316", po: "PO-438", vendor: "AutoTech India", items: "Oil filters × 20", qty: "20/20", variance: "None", status: "Confirmed", statusColor: "#10B981" },
  { id: "GRN-315", po: "PO-436", vendor: "TyreWorld", items: "Tyre set × 4", qty: "0/4", variance: "Not arrived", status: "Pending", statusColor: "#374151" },
];

function GoodsReceipt() {
  return (
    <VFPageBg>
      <div style={{ marginBottom: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
          <CheckCircle size={14} color={S.success} />
          <span style={{ fontSize: 10, color: S.success, fontWeight: 700, letterSpacing: 1.2, textTransform: "uppercase" as const }}>Vendor Management › Goods Receipt</span>
        </div>
        <h1 style={{ color: S.text, margin: 0, fontSize: 24, fontWeight: 700 }}>Goods Receipt Notes</h1>
      </div>
      <div style={{ background: S.card, border: `1px solid ${S.border}`, borderRadius: 14, overflow: "hidden" }}>
        <div style={{ display: "grid", gridTemplateColumns: "90px 90px 1fr 1fr 100px 120px 130px", padding: "10px 18px", borderBottom: `1px solid ${S.border}` }}>
          {["GRN-ID", "PO Ref", "Vendor", "Items", "Qty", "Variance", "Status"].map(h => (
            <div key={h} style={{ fontSize: 10, color: S.muted, fontWeight: 700, letterSpacing: 0.8, textTransform: "uppercase" as const }}>{h}</div>
          ))}
        </div>
        {GRNS.map((g, i) => (
          <div key={g.id} style={{ display: "grid", gridTemplateColumns: "90px 90px 1fr 1fr 100px 120px 130px", padding: "12px 18px", borderBottom: i < GRNS.length - 1 ? `1px solid ${S.border}` : "none", alignItems: "center" }}
            onMouseEnter={e => (e.currentTarget.style.background = S.surfaceHover)}
            onMouseLeave={e => (e.currentTarget.style.background = "none")}>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: S.warning }}>{g.id}</div>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: S.muted }}>{g.po}</div>
            <div style={{ fontSize: 12, color: S.text }}>{g.vendor}</div>
            <div style={{ fontSize: 11, color: S.muted }}>{g.items}</div>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, color: S.text }}>{g.qty}</div>
            <div style={{ fontSize: 11, color: g.variance === "None" ? S.success : S.warning }}>{g.variance}</div>
            <div><span style={{ padding: "3px 9px", borderRadius: 5, background: `${g.statusColor}18`, color: g.statusColor, fontSize: 11 }}>{g.status}</span></div>
          </div>
        ))}
      </div>
    </VFPageBg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// FINANCE HUB (SCR-045)
// ─────────────────────────────────────────────────────────────────────────────
function FinanceHub({ navigate }: { navigate: (r: ShyntraRoute) => void }) {
  return (
    <VFPageBg>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 20 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
            <DollarSign size={14} color={S.success} />
            <span style={{ fontSize: 10, color: S.success, fontWeight: 700, letterSpacing: 1.2, textTransform: "uppercase" as const }}>Financial Management</span>
          </div>
          <h1 style={{ color: S.text, margin: 0, fontSize: 26, fontWeight: 700 }}>Finance Hub</h1>
          <p style={{ color: S.muted, margin: "4px 0 0", fontSize: 12 }}>Payments, receipts, journals, ledger, reporting</p>
        </div>
        <button style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 8, background: S.success, border: "none", color: "#000", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>Export Period</button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 24 }}>
        <VFNavCard icon={<TrendingUp size={18} color="#fff" />} title="Cash Flow Forecast" desc="30-day cash projection — net +₹4.2L predicted" stat="₹4.2L" gradient="linear-gradient(135deg,#22c55e,#10b981)" glowColor={S.success} badge="AI" />
        <VFNavCard icon={<AlertCircle size={18} color="#fff" />} title="Collection Risk" desc="12 invoices flagged as high-risk for collection" stat="12 flagged" gradient="linear-gradient(135deg,#ef4444,#f97316)" glowColor={S.danger} badge="AI" />
        <VFNavCard icon={<Activity size={18} color="#fff" />} title="Revenue Forecast" desc="AI-driven revenue projection for month-end" stat="₹12.4L" gradient="linear-gradient(135deg,#06b6d4,#3b82f6)" glowColor={S.primary} badge="AI" />
        <VFNavCard icon={<Brain size={18} color="#fff" />} title="Payment Delay Alert" desc="6 vendor payments approaching due date" stat="6 due soon" gradient="linear-gradient(135deg,#f59e0b,#eab308)" glowColor={S.warning} badge="AI" />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 24 }}>
        <VFKpiCard label="Receivables" val="₹11.2L" sub="38 invoices outstanding" color={S.primary} />
        <VFKpiCard label="Payables" val="₹6.8L" sub="14 vendor bills due" color={S.warning} />
        <VFKpiCard label="Net Cash" val="₹28.4L" sub="Available + scheduled" color={S.success} />
        <VFKpiCard label="Overdue" val="₹2.14L" sub="38 invoices 30d+" color={S.danger} />
      </div>
      <VFSecHeader title="Finance Module Navigation" accent={S.success} />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 24 }}>
        <VFNavCard icon={<DollarSign size={20} color="#fff" />} title="Payments" desc="Vendor payables aging + record payment" gradient="linear-gradient(135deg,#f59e0b,#f97316)" glowColor={S.warning} onClick={() => navigate("finance.payments")} />
        <VFNavCard icon={<Receipt size={20} color="#fff" />} title="Receipts" desc="Customer receivables + collection" gradient="linear-gradient(135deg,#22c55e,#10b981)" glowColor={S.success} onClick={() => navigate("finance.receipts")} />
        <VFNavCard icon={<BookOpen size={20} color="#fff" />} title="Journal Entries" desc="Manual journal entry creation + approval" gradient="linear-gradient(135deg,#06b6d4,#3b82f6)" glowColor={S.primary} onClick={() => navigate("finance.journal")} />
        <VFNavCard icon={<FileText size={20} color="#fff" />} title="Ledger" desc="Account-wise ledger with date filter" gradient="linear-gradient(135deg,#a855f7,#6366f1)" glowColor={S.purple} onClick={() => navigate("finance.ledger")} />
        <VFNavCard icon={<BarChart3 size={20} color="#fff" />} title="Trial Balance" desc="Period debit/credit summary" gradient="linear-gradient(135deg,#14b8a6,#06b6d4)" glowColor={S.success} onClick={() => navigate("finance.trial-balance")} />
        <VFNavCard icon={<TrendingUp size={20} color="#fff" />} title="P&L" desc="Profit & loss by period + branch" gradient="linear-gradient(135deg,#22c55e,#10b981)" glowColor={S.success} onClick={() => navigate("finance.pl")} />
        <VFNavCard icon={<Building2 size={20} color="#fff" />} title="Balance Sheet" desc="Assets, liabilities, equity" gradient="linear-gradient(135deg,#3b82f6,#6366f1)" glowColor={S.primary} onClick={() => navigate("finance.balance")} />
        <VFNavCard icon={<Activity size={20} color="#fff" />} title="Cash Flow" desc="Inflow/outflow net cash statement" gradient="linear-gradient(135deg,#f59e0b,#f97316)" glowColor={S.warning} onClick={() => navigate("finance.cashflow")} />
      </div>
      <VFSecHeader title="Recent Transactions" accent={S.success} />
      <VFActivityFeed items={[
        { color: S.success, cat: "Receipt", msg: "INV-1089 collected · ₹18,400 · Priya Shah · NEFT", time: "2h ago" },
        { color: S.warning, cat: "Payable", msg: "PO-441 payment due tomorrow · Sharma Parts · ₹42,000", time: "3h ago" },
        { color: S.primary, cat: "Journal", msg: "J-2041 posted · Depreciation entry · ₹8,200", time: "5h ago" },
        { color: S.danger, cat: "Overdue", msg: "INV-1074 overdue 15d · ₹12,500 · Raj Mehta — follow up", time: "1d ago" },
      ]} />
    </VFPageBg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PAYABLES (SCR-046)
// ─────────────────────────────────────────────────────────────────────────────
const PAYABLES_DATA = [
  { id: "INV-V-091", vendor: "Sharma Parts", amount: "₹42,000", due: "10 Jun 2025", aging: "1d", status: "Due Soon", statusColor: "#F59E0B" },
  { id: "INV-V-090", vendor: "TyreWorld", amount: "₹28,000", due: "12 Jun 2025", aging: "3d", status: "Upcoming", statusColor: "#00E5FF" },
  { id: "INV-V-089", vendor: "AutoTech", amount: "₹18,500", due: "8 Jun 2025", aging: "Overdue 2d", status: "Overdue", statusColor: "#EF4444" },
  { id: "INV-V-088", vendor: "Cool AC", amount: "₹36,000", due: "15 Jun 2025", aging: "6d", status: "Upcoming", statusColor: "#00E5FF" },
];
function Payables() {
  return (
    <VFPageBg>
      <div style={{ marginBottom: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
          <DollarSign size={14} color={S.warning} />
          <span style={{ fontSize: 10, color: S.warning, fontWeight: 700, letterSpacing: 1.2, textTransform: "uppercase" as const }}>Financial Management › Payments</span>
        </div>
        <h1 style={{ color: S.text, margin: 0, fontSize: 24, fontWeight: 700 }}>Accounts Payable</h1>
      </div>
      <div style={{ background: S.card, border: `1px solid ${S.border}`, borderRadius: 14, overflow: "hidden" }}>
        <div style={{ display: "grid", gridTemplateColumns: "120px 1fr 120px 130px 120px 140px 100px", padding: "10px 18px", borderBottom: `1px solid ${S.border}` }}>
          {["Invoice", "Vendor", "Amount", "Due Date", "Aging", "Status", "Action"].map(h => (
            <div key={h} style={{ fontSize: 10, color: S.muted, fontWeight: 700, letterSpacing: 0.8, textTransform: "uppercase" as const }}>{h}</div>
          ))}
        </div>
        {PAYABLES_DATA.map((p, i) => (
          <div key={p.id} style={{ display: "grid", gridTemplateColumns: "120px 1fr 120px 130px 120px 140px 100px", padding: "12px 18px", borderBottom: i < PAYABLES_DATA.length - 1 ? `1px solid ${S.border}` : "none", alignItems: "center" }}>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: S.warning }}>{p.id}</div>
            <div style={{ fontSize: 12, color: S.text }}>{p.vendor}</div>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, color: S.text }}>{p.amount}</div>
            <div style={{ fontSize: 11, color: S.muted }}>{p.due}</div>
            <div style={{ fontSize: 11, color: p.status === "Overdue" ? S.danger : S.muted }}>{p.aging}</div>
            <div><span style={{ padding: "3px 9px", borderRadius: 5, background: `${p.statusColor}18`, color: p.statusColor, fontSize: 11 }}>{p.status}</span></div>
            <button style={{ fontSize: 10, color: S.primary, background: `${S.primary}14`, border: `1px solid ${S.primary}40`, borderRadius: 6, padding: "4px 10px", cursor: "pointer" }}>Pay →</button>
          </div>
        ))}
      </div>
    </VFPageBg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// RECEIVABLES (SCR-047)
// ─────────────────────────────────────────────────────────────────────────────
const RECEIVABLES_DATA = [
  { id: "INV-1092", customer: "Priya Shah", amount: "₹42,500", due: "12 Jun 2025", aging: "3d", status: "Upcoming", statusColor: "#00E5FF" },
  { id: "INV-1091", customer: "Raj Mehta", amount: "₹18,200", due: "8 Jun 2025", aging: "Overdue 2d", status: "Overdue", statusColor: "#EF4444" },
  { id: "INV-1090", customer: "Arjun Kumar", amount: "₹64,800", due: "15 Jun 2025", aging: "6d", status: "Upcoming", statusColor: "#00E5FF" },
  { id: "INV-1089", customer: "Deepa Nair", amount: "₹18,400", due: "Paid", aging: "—", status: "Paid", statusColor: "#10B981" },
];
function Receivables() {
  return (
    <VFPageBg>
      <div style={{ marginBottom: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
          <Receipt size={14} color={S.success} />
          <span style={{ fontSize: 10, color: S.success, fontWeight: 700, letterSpacing: 1.2, textTransform: "uppercase" as const }}>Financial Management › Receipts</span>
        </div>
        <h1 style={{ color: S.text, margin: 0, fontSize: 24, fontWeight: 700 }}>Accounts Receivable</h1>
      </div>
      <div style={{ background: S.card, border: `1px solid ${S.border}`, borderRadius: 14, overflow: "hidden" }}>
        <div style={{ display: "grid", gridTemplateColumns: "120px 1fr 120px 130px 120px 140px 120px", padding: "10px 18px", borderBottom: `1px solid ${S.border}` }}>
          {["Invoice", "Customer", "Amount", "Due Date", "Aging", "Status", "Action"].map(h => (
            <div key={h} style={{ fontSize: 10, color: S.muted, fontWeight: 700, letterSpacing: 0.8, textTransform: "uppercase" as const }}>{h}</div>
          ))}
        </div>
        {RECEIVABLES_DATA.map((r, i) => (
          <div key={r.id} style={{ display: "grid", gridTemplateColumns: "120px 1fr 120px 130px 120px 140px 120px", padding: "12px 18px", borderBottom: i < RECEIVABLES_DATA.length - 1 ? `1px solid ${S.border}` : "none", alignItems: "center" }}>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: S.primary }}>{r.id}</div>
            <div style={{ fontSize: 12, color: S.text }}>{r.customer}</div>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, color: S.text }}>{r.amount}</div>
            <div style={{ fontSize: 11, color: S.muted }}>{r.due}</div>
            <div style={{ fontSize: 11, color: r.status === "Overdue" ? S.danger : S.muted }}>{r.aging}</div>
            <div><span style={{ padding: "3px 9px", borderRadius: 5, background: `${r.statusColor}18`, color: r.statusColor, fontSize: 11 }}>{r.status}</span></div>
            <button style={{ fontSize: 10, color: r.status === "Paid" ? S.success : S.primary, background: `${r.status === "Paid" ? S.success : S.primary}14`, border: `1px solid ${r.status === "Paid" ? S.success : S.primary}40`, borderRadius: 6, padding: "4px 10px", cursor: "pointer" }}>
              {r.status === "Paid" ? "Receipt ✓" : "Record →"}
            </button>
          </div>
        ))}
      </div>
    </VFPageBg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// JOURNAL ENTRIES (SCR-048)
// ─────────────────────────────────────────────────────────────────────────────
const JOURNALS = [
  { id: "J-2043", date: "09 Jun", narration: "Depreciation — Equipment Q2", debit: "₹8,200", credit: "—", account: "Depreciation A/C", status: "Posted", statusColor: "#10B981" },
  { id: "J-2042", date: "08 Jun", narration: "Salary advance — Suresh Nair", debit: "₹15,000", credit: "—", account: "Advance A/C", status: "Posted", statusColor: "#10B981" },
  { id: "J-2041", date: "07 Jun", narration: "Bank charges — HDFC June", debit: "₹320", credit: "—", account: "Bank Charges A/C", status: "Pending", statusColor: "#F59E0B" },
];
function JournalEntries() {
  return (
    <VFPageBg>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
            <BookOpen size={14} color={S.primary} />
            <span style={{ fontSize: 10, color: S.primary, fontWeight: 700, letterSpacing: 1.2, textTransform: "uppercase" as const }}>Financial Management › Journals</span>
          </div>
          <h1 style={{ color: S.text, margin: 0, fontSize: 24, fontWeight: 700 }}>Journal Entries</h1>
        </div>
        <button style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 8, background: S.primary, border: "none", color: "#000", fontSize: 12, fontWeight: 700, cursor: "pointer" }}><Plus size={14} /> New Entry</button>
      </div>
      <div style={{ background: S.card, border: `1px solid ${S.border}`, borderRadius: 14, overflow: "hidden" }}>
        <div style={{ display: "grid", gridTemplateColumns: "90px 70px 1fr 100px 100px 1fr 120px", padding: "10px 18px", borderBottom: `1px solid ${S.border}` }}>
          {["Journal", "Date", "Narration", "Debit", "Credit", "Account", "Status"].map(h => (
            <div key={h} style={{ fontSize: 10, color: S.muted, fontWeight: 700, letterSpacing: 0.8, textTransform: "uppercase" as const }}>{h}</div>
          ))}
        </div>
        {JOURNALS.map((j, i) => (
          <div key={j.id} style={{ display: "grid", gridTemplateColumns: "90px 70px 1fr 100px 100px 1fr 120px", padding: "12px 18px", borderBottom: i < JOURNALS.length - 1 ? `1px solid ${S.border}` : "none", alignItems: "center" }}>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: S.primary }}>{j.id}</div>
            <div style={{ fontSize: 11, color: S.muted }}>{j.date}</div>
            <div style={{ fontSize: 12, color: S.text }}>{j.narration}</div>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, color: S.success }}>{j.debit}</div>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, color: S.muted }}>{j.credit}</div>
            <div style={{ fontSize: 11, color: S.muted }}>{j.account}</div>
            <div><span style={{ padding: "3px 9px", borderRadius: 5, background: `${j.statusColor}18`, color: j.statusColor, fontSize: 11 }}>{j.status}</span></div>
          </div>
        ))}
      </div>
    </VFPageBg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TRIAL BALANCE (SCR-050)
// ─────────────────────────────────────────────────────────────────────────────
const TB_ROWS = [
  { account: "Sales Revenue", code: "4001", debit: "—", credit: "₹24,10,000" },
  { account: "Service Revenue", code: "4002", debit: "—", credit: "₹8,20,000" },
  { account: "Parts Revenue", code: "4003", debit: "—", credit: "₹6,80,000" },
  { account: "Cost of Parts", code: "5001", debit: "₹4,20,000", credit: "—" },
  { account: "Labour Cost", code: "5002", debit: "₹2,80,000", credit: "—" },
  { account: "Operating Expenses", code: "6001", debit: "₹3,40,000", credit: "—" },
  { account: "Depreciation", code: "6002", debit: "₹48,000", credit: "—" },
  { account: "Bank Balance", code: "1001", debit: "₹28,40,000", credit: "—" },
  { account: "Accounts Receivable", code: "1101", debit: "₹11,20,000", credit: "—" },
  { account: "Accounts Payable", code: "2001", debit: "—", credit: "₹6,80,000" },
];
function TrialBalance() {
  return (
    <VFPageBg>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
            <BarChart3 size={14} color={S.success} />
            <span style={{ fontSize: 10, color: S.success, fontWeight: 700, letterSpacing: 1.2, textTransform: "uppercase" as const }}>Financial Management › Trial Balance</span>
          </div>
          <h1 style={{ color: S.text, margin: 0, fontSize: 24, fontWeight: 700 }}>Trial Balance</h1>
          <p style={{ color: S.muted, margin: "4px 0 0", fontSize: 12 }}>Period: June 2025 · All branches</p>
        </div>
        <button style={{ padding: "8px 16px", borderRadius: 8, background: "none", border: `1px solid ${S.border}`, color: S.muted, fontSize: 12, cursor: "pointer" }}>Export</button>
      </div>
      <div style={{ background: S.card, border: `1px solid ${S.border}`, borderRadius: 14, overflow: "hidden" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 100px 1fr 1fr", padding: "10px 18px", borderBottom: `1px solid ${S.border}` }}>
          {["Account Name", "Code", "Debit", "Credit"].map(h => (
            <div key={h} style={{ fontSize: 10, color: S.muted, fontWeight: 700, letterSpacing: 0.8, textTransform: "uppercase" as const }}>{h}</div>
          ))}
        </div>
        {TB_ROWS.map((r, i) => (
          <div key={r.account} style={{ display: "grid", gridTemplateColumns: "1fr 100px 1fr 1fr", padding: "10px 18px", borderBottom: i < TB_ROWS.length - 1 ? `1px solid ${S.border}` : "none" }}>
            <div style={{ fontSize: 12, color: S.text }}>{r.account}</div>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: S.muted }}>{r.code}</div>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, color: r.debit !== "—" ? S.primary : S.dim }}>{r.debit}</div>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, color: r.credit !== "—" ? S.success : S.dim }}>{r.credit}</div>
          </div>
        ))}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 100px 1fr 1fr", padding: "12px 18px", borderTop: `1px solid ${S.border}`, background: S.card2 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: S.text }}>Total</div>
          <div />
          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 13, fontWeight: 700, color: S.primary }}>₹50,48,000</div>
          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 13, fontWeight: 700, color: S.success }}>₹50,48,000</div>
        </div>
      </div>
    </VFPageBg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// REPORTING HUB (SCR-054)
// ─────────────────────────────────────────────────────────────────────────────
function ReportingHub({ navigate }: { navigate: (r: ShyntraRoute) => void }) {
  return (
    <VFPageBg>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 20 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
            <BarChart3 size={14} color={S.purple} />
            <span style={{ fontSize: 10, color: S.purple, fontWeight: 700, letterSpacing: 1.2, textTransform: "uppercase" as const }}>Reporting</span>
          </div>
          <h1 style={{ color: S.text, margin: 0, fontSize: 26, fontWeight: 700 }}>Reporting Hub</h1>
          <p style={{ color: S.muted, margin: "4px 0 0", fontSize: 12 }}>Standard reports, analytics, AI-driven insights</p>
        </div>
        <button style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 8, background: S.purple, border: "none", color: "#fff", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>Schedule Report</button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 24 }}>
        <VFNavCard icon={<Activity size={18} color="#fff" />} title="Trend Detection" desc="Emerging patterns detected in revenue + ops data" stat="3 trends" gradient="linear-gradient(135deg,#a855f7,#6366f1)" glowColor={S.purple} badge="AI" />
        <VFNavCard icon={<AlertCircle size={18} color="#fff" />} title="Anomaly Detection" desc="2 anomalies detected in payment patterns" stat="2 alerts" gradient="linear-gradient(135deg,#ef4444,#f97316)" glowColor={S.danger} badge="AI" />
        <VFNavCard icon={<TrendingUp size={18} color="#fff" />} title="Forecast Insights" desc="30-day revenue and ops projections" stat="₹12.4L" gradient="linear-gradient(135deg,#22c55e,#10b981)" glowColor={S.success} badge="AI" />
        <VFNavCard icon={<Zap size={18} color="#fff" />} title="Executive Summary" desc="Board-level AI summary across all modules" stat="Updated" gradient="linear-gradient(135deg,#f59e0b,#eab308)" glowColor={S.warning} badge="AI" />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 24 }}>
        <VFKpiCard label="Reports Run" val="284" sub="This month" color={S.primary} />
        <VFKpiCard label="Scheduled" val="12" sub="Auto-run reports" color={S.purple} />
        <VFKpiCard label="Anomalies" val="2" sub="Flagged this week" color={S.danger} />
        <VFKpiCard label="AI Insights" val="18" sub="Actionable insights" color={S.lime} />
      </div>
      <VFSecHeader title="Report Modules" accent={S.purple} />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 12, marginBottom: 24 }}>
        <VFNavCard icon={<FileText size={20} color="#fff" />} title="Standard Reports" desc="Pre-built report catalog — run, schedule, export" stat="42 reports" gradient="linear-gradient(135deg,#6366f1,#a855f7)" glowColor={S.purple} onClick={() => navigate("reporting.catalog")} />
        <VFNavCard icon={<BarChart3 size={20} color="#fff" />} title="Analytics" desc="Operational + financial deep-dive analytics" stat="Live data" gradient="linear-gradient(135deg,#a855f7,#ec4899)" glowColor={S.purple} badge="AI" onClick={() => navigate("reporting.analytics")} />
      </div>
      <VFSecHeader title="Recent Reports" accent={S.purple} />
      <VFActivityFeed items={[
        { color: S.success, cat: "Revenue", msg: "Monthly Revenue Report · June 2025 · Auto-generated · 08 Jun", time: "1d ago" },
        { color: S.primary, cat: "Ops", msg: "Bay Utilization Report · Exported to Excel · Ramesh", time: "2d ago" },
        { color: S.purple, cat: "AI", msg: "AI detected revenue anomaly — Tuesday spike 22% above trend", time: "3d ago" },
        { color: S.warning, cat: "Vendor", msg: "Vendor Spend Analysis · Q1 vs Q2 comparison · CFO request", time: "4d ago" },
      ]} />
    </VFPageBg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// EXPORT
// ─────────────────────────────────────────────────────────────────────────────

type VFSection =
  | "vendors.hub" | "vendors.master" | "vendors.requests" | "vendors.procurement" | "vendors.orders" | "vendors.goods-receipt"
  | "finance.hub" | "finance.payments" | "finance.receipts" | "finance.journal" | "finance.ledger" | "finance.trial-balance" | "finance.pl" | "finance.balance" | "finance.cashflow"
  | "reporting.hub" | "reporting.catalog" | "reporting.analytics";

export function VendorFinanceSuite({ section, navigate }: { section: VFSection; navigate: (r: ShyntraRoute) => void }) {
  // Vendor Management
  if (section === "vendors.hub") return <VendorHub navigate={navigate} />;
  if (section === "vendors.requests") return <PurchaseRequests />;
  if (section === "vendors.procurement" || section === "vendors.orders") return <Procurement />;
  if (section === "vendors.goods-receipt") return <GoodsReceipt />;
  if (section === "vendors.master") return <VendorMaster />;
  // Finance
  if (section === "finance.hub") return <FinanceHub navigate={navigate} />;
  if (section === "finance.payments") return <Payables />;
  if (section === "finance.receipts") return <Receivables />;
  if (section === "finance.journal") return <JournalEntries />;
  if (section === "finance.ledger") return <LedgerView />;
  if (section === "finance.trial-balance") return <TrialBalance />;
  if (section === "finance.pl") return <ProfitLoss />;
  if (section === "finance.balance") return <BalanceSheet />;
  if (section === "finance.cashflow") return <BalanceSheet />; // reuse with cashflow label
  // Reporting
  if (section === "reporting.hub") return <ReportingHub navigate={navigate} />;
  if (section === "reporting.catalog" || section === "reporting.analytics") return <ReportCatalog />;
  // Default fallback
  return <VendorHub navigate={navigate} />;
}
