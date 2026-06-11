import { useState } from "react";
import { Plus, Search, Filter, MoreHorizontal, User, Car, Wrench, Clock, ChevronDown, AlertCircle, CheckCircle, Circle, ArrowRight, Activity, Truck, Users, Target, Brain, Zap } from "lucide-react";
import type { ShyntraRoute } from "../ShyntraaApp";

// DTF App-D tokens
const S = {
  bg: "#0B1120", card: "#111827", card2: "#1a2438",
  border: "rgba(255,255,255,0.08)", text: "#F9FAFB", muted: "#9CA3AF", dim: "#374151",
  amber: "#F59E0B", blue: "#00E5FF", green: "#10B981", red: "#EF4444",
  purple: "#7C3AED", cyan: "#00E5FF", orange: "#F97316", lime: "#A3E635",
  surfaceHover: "#1a2438", primary: "#00E5FF",
};

function Card({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return <div style={{ background: S.card, border: `1px solid ${S.border}`, borderRadius: 10, ...style }}>{children}</div>;
}

// ─────────────────────────────────────────────────────────────────────────────
// INQUIRY KANBAN
// ─────────────────────────────────────────────────────────────────────────────

const KANBAN_COLS = [
  { id: "new", label: "New", color: S.blue, count: 12 },
  { id: "contacted", label: "Contacted", color: S.cyan, count: 9 },
  { id: "qualified", label: "Qualified", color: S.purple, count: 7 },
  { id: "appointed", label: "Appt. Set", color: S.amber, count: 5 },
  { id: "converted", label: "Converted", color: S.green, count: 18 },
  { id: "lost", label: "Lost", color: S.red, count: 4 },
];

const INQUIRY_CARDS: Record<string, Array<{
  id: string; name: string; vehicle: string; service: string;
  source: string; time: string; priority: "High" | "Medium" | "Low";
}>> = {
  new: [
    { id: "INQ-341", name: "Raj Mehta", vehicle: "BMW 520d", service: "Full Service", source: "WhatsApp", time: "2m ago", priority: "High" },
    { id: "INQ-342", name: "Anita Sharma", vehicle: "Honda City", service: "Detailing", source: "Walk-in", time: "18m ago", priority: "Medium" },
    { id: "INQ-343", name: "Sanjay Patil", vehicle: "Fortuner", service: "AC Repair", source: "Instagram", time: "35m ago", priority: "High" },
    { id: "INQ-344", name: "Priya Nair", vehicle: "Kia Seltos", service: "Tyres", source: "Referral", time: "1h ago", priority: "Low" },
  ],
  contacted: [
    { id: "INQ-338", name: "Vikram Joshi", vehicle: "Audi Q5", service: "Ceramic Coat", source: "Website", time: "2h ago", priority: "High" },
    { id: "INQ-339", name: "Deepa Singh", vehicle: "Swift", service: "Oil Change", source: "Google", time: "3h ago", priority: "Low" },
    { id: "INQ-340", name: "Rohit Desai", vehicle: "Creta", service: "Alignment", source: "WhatsApp", time: "4h ago", priority: "Medium" },
  ],
  qualified: [
    { id: "INQ-335", name: "Neha Kumar", vehicle: "Nexon EV", service: "Annual Service", source: "Website", time: "1d ago", priority: "Medium" },
    { id: "INQ-336", name: "Arjun Rao", vehicle: "Thar", service: "Suspension", source: "Referral", time: "1d ago", priority: "High" },
  ],
  appointed: [
    { id: "INQ-331", name: "Kavita Menon", vehicle: "Innova", service: "Full Service", source: "Walk-in", time: "2d ago", priority: "High" },
    { id: "INQ-332", name: "Suresh Reddy", vehicle: "XUV700", service: "Body Work", source: "Instagram", time: "2d ago", priority: "Medium" },
  ],
  converted: [
    { id: "INQ-328", name: "Aarti Bose", vehicle: "Polo", service: "Full Detailing", source: "Google", time: "3d ago", priority: "Medium" },
    { id: "INQ-329", name: "Manish Gupta", vehicle: "Baleno", service: "Clutch Repair", source: "WhatsApp", time: "3d ago", priority: "High" },
  ],
  lost: [
    { id: "INQ-320", name: "Rahul Sinha", vehicle: "WagonR", service: "Oil Change", source: "Walk-in", time: "4d ago", priority: "Low" },
    { id: "INQ-321", name: "Meena Iyer", vehicle: "Jazz", service: "AC Service", source: "Website", time: "5d ago", priority: "Low" },
  ],
};

const priorityColor = { High: S.red, Medium: S.amber, Low: S.muted };

function InquiryKanban() {
  const [search, setSearch] = useState("");

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Header */}
      <div style={{ padding: "20px 24px 16px", borderBottom: `1px solid ${S.border}`, display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
        <div>
          <h2 style={{ color: S.text, margin: 0 }}>Inquiry Management</h2>
          <p style={{ color: S.muted, fontSize: 12, margin: "2px 0 0" }}>55 total · 30 active this week</p>
        </div>
        <div style={{ flex: 1 }} />
        <div style={{ display: "flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.04)", borderRadius: 7, padding: "6px 12px", border: `1px solid ${S.border}` }}>
          <Search size={13} color={S.muted} />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search inquiries..." style={{ background: "none", border: "none", outline: "none", color: S.text, fontSize: 12, width: 160 }} />
        </div>
        <button style={{ display: "flex", alignItems: "center", gap: 6, padding: "7px 14px", borderRadius: 7, background: S.amber, border: "none", color: "#000", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
          <Plus size={14} /> New Inquiry
        </button>
      </div>

      {/* Kanban Board */}
      <div style={{ flex: 1, overflowX: "auto", padding: "16px 24px", display: "flex", gap: 14 }}>
        {KANBAN_COLS.map((col) => {
          const cards = (INQUIRY_CARDS[col.id] || []).filter(c =>
            !search || c.name.toLowerCase().includes(search.toLowerCase()) || c.vehicle.toLowerCase().includes(search.toLowerCase())
          );
          return (
            <div key={col.id} style={{ minWidth: 240, width: 240, display: "flex", flexDirection: "column", gap: 10, flexShrink: 0 }}>
              {/* Column Header */}
              <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 10px", background: S.card2, borderRadius: 8, border: `1px solid ${S.border}` }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: col.color }} />
                <span style={{ fontSize: 12, color: S.muted, flex: 1 }}>{col.label}</span>
                <span style={{ fontSize: 11, color: col.color, fontWeight: 600 }}>{col.count}</span>
              </div>
              {/* Cards */}
              <div style={{ display: "flex", flexDirection: "column", gap: 8, flex: 1, overflowY: "auto" }}>
                {cards.map((c) => (
                  <div key={c.id} style={{ background: S.card, border: `1px solid ${S.border}`, borderRadius: 8, padding: "12px", cursor: "pointer", transition: "border-color 0.15s" }}
                    onMouseEnter={(e) => (e.currentTarget.style.borderColor = col.color + "60")}
                    onMouseLeave={(e) => (e.currentTarget.style.borderColor = S.border)}>
                    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 8 }}>
                      <span style={{ fontSize: 10, color: S.amber, fontFamily: "'JetBrains Mono', monospace" }}>{c.id}</span>
                      <span style={{ padding: "2px 6px", borderRadius: 4, fontSize: 10, background: `${priorityColor[c.priority]}18`, color: priorityColor[c.priority] }}>{c.priority}</span>
                    </div>
                    <div style={{ fontSize: 13, color: S.text, fontWeight: 500, marginBottom: 4 }}>{c.name}</div>
                    <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: S.muted, marginBottom: 4 }}>
                      <Car size={11} /> {c.vehicle}
                    </div>
                    <div style={{ fontSize: 11, color: S.dim, marginBottom: 8 }}>{c.service}</div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <span style={{ padding: "2px 7px", borderRadius: 4, background: "rgba(255,255,255,0.05)", fontSize: 10, color: S.muted }}>{c.source}</span>
                      <span style={{ fontSize: 10, color: S.dim }}>{c.time}</span>
                    </div>
                  </div>
                ))}
                {/* Add card placeholder */}
                <button style={{ padding: "8px", borderRadius: 7, border: `1px dashed ${S.border}`, background: "none", color: S.dim, fontSize: 12, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = col.color + "40")}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = S.border)}>
                  <Plus size={12} /> Add
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// JOB CARD BOARD
// ─────────────────────────────────────────────────────────────────────────────

const JC_COLS = [
  { id: "pending", label: "Pending", color: S.muted },
  { id: "in_progress", label: "In Progress", color: S.blue },
  { id: "qc", label: "QC Check", color: S.amber },
  { id: "delivered", label: "Delivered", color: S.green },
];

const JC_DATA: Record<string, Array<{
  id: string; customer: string; vehicle: string; reg: string;
  services: string[]; tech: string; bay: string; eta: string; priority: "High" | "Medium" | "Low";
}>> = {
  pending: [
    { id: "JC-2044", customer: "Priya Shah", vehicle: "Toyota Fortuner", reg: "MH02GH3344", services: ["Full Service", "Tyre Rotation"], tech: "Unassigned", bay: "—", eta: "Today 3PM", priority: "High" },
    { id: "JC-2045", customer: "Rohit Verma", vehicle: "Maruti Baleno", reg: "MH01IJ5566", services: ["AC Service"], tech: "Anand P.", bay: "—", eta: "Today 5PM", priority: "Medium" },
  ],
  in_progress: [
    { id: "JC-2041", customer: "Raj Mehta", vehicle: "BMW 520d", reg: "MH01AB1234", services: ["Full Service", "AC Repair", "Wheel Align"], tech: "Suresh N.", bay: "Bay 2", eta: "1h 30m", priority: "High" },
    { id: "JC-2042", customer: "Neha Kumar", vehicle: "Hyundai Creta", reg: "MH03EF7788", services: ["Brake Pads", "Brake Fluid"], tech: "Ravi K.", bay: "Bay 5", eta: "45m", priority: "Medium" },
    { id: "JC-2043", customer: "Arjun Rao", vehicle: "Mahindra Thar", reg: "MH04KL9900", services: ["Suspension Check", "Shock Absorber"], tech: "Deepak S.", bay: "Bay 7", eta: "2h", priority: "High" },
  ],
  qc: [
    { id: "JC-2039", customer: "Vikram Joshi", vehicle: "Honda City", reg: "MH05MN1122", services: ["Full Detailing"], tech: "Vikram J.", bay: "Bay 4", eta: "QC", priority: "Medium" },
    { id: "JC-2040", customer: "Kavita Menon", vehicle: "Innova Crysta", reg: "MH06OP3344", services: ["Full Service", "Oil Change"], tech: "Ravi K.", bay: "Bay 6", eta: "QC", priority: "Low" },
  ],
  delivered: [
    { id: "JC-2037", customer: "Aarti Bose", vehicle: "Hyundai i20", reg: "MH01QR5566", services: ["PPF", "Ceramic Coat"], tech: "Suresh N.", bay: "Bay 1", eta: "Delivered", priority: "Low" },
    { id: "JC-2038", customer: "Manish Gupta", vehicle: "Maruti Swift", reg: "MH02ST7788", services: ["Clutch Repair"], tech: "Anand P.", bay: "Bay 3", eta: "Delivered", priority: "Medium" },
  ],
};

function JobCardBoard() {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div style={{ padding: "20px 24px 16px", borderBottom: `1px solid ${S.border}`, display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
        <div>
          <h2 style={{ color: S.text, margin: 0 }}>Job Card Board</h2>
          <p style={{ color: S.muted, fontSize: 12, margin: "2px 0 0" }}>9 active · 2 overdue</p>
        </div>
        <div style={{ flex: 1 }} />
        <button style={{ display: "flex", alignItems: "center", gap: 6, padding: "7px 14px", borderRadius: 7, background: S.amber, border: "none", color: "#000", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
          <Plus size={14} /> New Job Card
        </button>
      </div>

      <div style={{ flex: 1, overflowX: "auto", padding: "16px 24px", display: "flex", gap: 14 }}>
        {JC_COLS.map((col) => {
          const cards = JC_DATA[col.id] || [];
          return (
            <div key={col.id} style={{ minWidth: 280, width: 280, display: "flex", flexDirection: "column", gap: 10, flexShrink: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 10px", background: S.card2, borderRadius: 8, border: `1px solid ${S.border}` }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: col.color }} />
                <span style={{ fontSize: 12, color: S.muted, flex: 1 }}>{col.label}</span>
                <span style={{ fontSize: 11, color: col.color, fontWeight: 600 }}>{cards.length}</span>
              </div>
              {cards.map((jc) => (
                <div key={jc.id} style={{ background: S.card, border: `1px solid ${S.border}`, borderRadius: 8, padding: "14px", cursor: "pointer", transition: "border-color 0.15s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = col.color + "60")}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = S.border)}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                    <span style={{ fontSize: 11, color: S.amber, fontFamily: "'JetBrains Mono', monospace", fontWeight: 600 }}>{jc.id}</span>
                    <span style={{ padding: "2px 6px", borderRadius: 4, fontSize: 10, background: `${priorityColor[jc.priority]}18`, color: priorityColor[jc.priority] }}>{jc.priority}</span>
                  </div>
                  <div style={{ fontSize: 13, color: S.text, fontWeight: 500 }}>{jc.customer}</div>
                  <div style={{ fontSize: 11, color: S.muted, marginTop: 2 }}>{jc.vehicle}</div>
                  <div style={{ fontSize: 10, color: S.dim, marginBottom: 10, fontFamily: "'JetBrains Mono', monospace" }}>{jc.reg}</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 10 }}>
                    {jc.services.map((svc) => (
                      <span key={svc} style={{ padding: "2px 7px", borderRadius: 4, background: "rgba(255,255,255,0.05)", fontSize: 10, color: S.muted }}>{svc}</span>
                    ))}
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 11, color: S.dim }}>
                    <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                      <User size={10} /> {jc.tech}
                    </span>
                    <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                      <Wrench size={10} /> {jc.bay}
                    </span>
                    <span style={{ color: col.id === "delivered" ? S.green : jc.eta.includes("m") ? S.amber : S.muted }}>
                      {jc.eta}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// BAY MANAGEMENT FLOOR VIEW
// ─────────────────────────────────────────────────────────────────────────────

const BAYS = [
  { id: "Bay 1", status: "Occupied", jc: "JC-2041", vehicle: "BMW 520d", tech: "Suresh N.", service: "Full Service + AC", progress: 70, eta: "1h 30m", color: S.blue },
  { id: "Bay 2", status: "Occupied", jc: "JC-2042", vehicle: "Hyundai Creta", tech: "Ravi K.", service: "Brake Pads", progress: 45, eta: "45m", color: S.blue },
  { id: "Bay 3", status: "QC", jc: "JC-2039", vehicle: "Honda City", tech: "Vikram J.", service: "Full Detailing", progress: 100, eta: "QC", color: S.amber },
  { id: "Bay 4", status: "Available", jc: null, vehicle: null, tech: null, service: null, progress: 0, eta: null, color: S.green },
  { id: "Bay 5", status: "Occupied", jc: "JC-2043", vehicle: "Mahindra Thar", tech: "Deepak S.", service: "Suspension", progress: 30, eta: "2h", color: S.blue },
  { id: "Bay 6", status: "QC", jc: "JC-2040", vehicle: "Innova Crysta", tech: "Ravi K.", service: "Full Service", progress: 100, eta: "QC", color: S.amber },
  { id: "Bay 7", status: "Available", jc: null, vehicle: null, tech: null, service: null, progress: 0, eta: null, color: S.green },
  { id: "Bay 8", status: "Maintenance", jc: null, vehicle: null, tech: null, service: null, progress: 0, eta: null, color: S.red },
];

const bayStatusIcon: Record<string, React.ReactNode> = {
  Occupied: <Wrench size={14} />,
  Available: <CheckCircle size={14} />,
  QC: <AlertCircle size={14} />,
  Maintenance: <Circle size={14} />,
};

function BayManagement() {
  return (
    <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 24 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <h2 style={{ color: S.text, margin: 0 }}>Bay Management</h2>
          <p style={{ color: S.muted, fontSize: 12, margin: "2px 0 0" }}>Workshop Floor · Mumbai Central · Live View</p>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {[
            { label: "Occupied", color: S.blue },
            { label: "QC", color: S.amber },
            { label: "Available", color: S.green },
            { label: "Maintenance", color: S.red },
          ].map((l) => (
            <div key={l.label} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: S.muted }}>
              <div style={{ width: 8, height: 8, borderRadius: 2, background: l.color }} />
              {l.label}
            </div>
          ))}
        </div>
      </div>

      {/* Summary Row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}>
        {[
          { label: "Occupied", val: 4, total: 8, color: S.blue },
          { label: "QC", val: 2, total: 8, color: S.amber },
          { label: "Available", val: 2, total: 8, color: S.green },
          { label: "Maintenance", val: 1, total: 8, color: S.red },
        ].map((b) => (
          <div key={b.label} style={{ background: S.card, border: `1px solid ${S.border}`, borderRadius: 10, padding: "16px 20px" }}>
            <div style={{ fontSize: 22, fontWeight: 700, color: b.color, fontFamily: "'Barlow Condensed', sans-serif" }}>{b.val}</div>
            <div style={{ fontSize: 12, color: S.muted }}>{b.label} Bays</div>
          </div>
        ))}
      </div>

      {/* Bay Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}>
        {BAYS.map((bay) => (
          <div key={bay.id} style={{ background: S.card, border: `2px solid ${bay.color}30`, borderRadius: 12, padding: "16px", cursor: bay.status !== "Maintenance" ? "pointer" : "default", transition: "border-color 0.15s" }}
            onMouseEnter={(e) => { if (bay.status !== "Maintenance") e.currentTarget.style.borderColor = bay.color + "80"; }}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = bay.color + "30")}>
            {/* Bay header */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
              <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 18, fontWeight: 700, color: bay.color, letterSpacing: 0.5 }}>{bay.id}</div>
              <div style={{ display: "flex", alignItems: "center", gap: 5, padding: "3px 8px", borderRadius: 5, background: `${bay.color}18`, color: bay.color, fontSize: 11 }}>
                {bayStatusIcon[bay.status]} {bay.status}
              </div>
            </div>

            {bay.status === "Available" && (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "20px 0", gap: 8 }}>
                <CheckCircle size={28} color={S.green} strokeWidth={1.5} />
                <div style={{ fontSize: 12, color: S.muted }}>Ready for assignment</div>
                <button style={{ padding: "5px 14px", borderRadius: 6, background: `${S.green}18`, border: `1px solid ${S.green}40`, color: S.green, fontSize: 11, cursor: "pointer" }}>
                  Assign Job
                </button>
              </div>
            )}

            {bay.status === "Maintenance" && (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "20px 0", gap: 8 }}>
                <AlertCircle size={28} color={S.red} strokeWidth={1.5} />
                <div style={{ fontSize: 12, color: S.muted }}>Under maintenance</div>
              </div>
            )}

            {(bay.status === "Occupied" || bay.status === "QC") && bay.jc && (
              <div>
                <div style={{ fontSize: 11, color: S.amber, fontFamily: "'JetBrains Mono', monospace", marginBottom: 4 }}>{bay.jc}</div>
                <div style={{ fontSize: 13, color: S.text, marginBottom: 2 }}>{bay.vehicle}</div>
                <div style={{ fontSize: 11, color: S.muted, marginBottom: 8 }}>{bay.service}</div>
                <div style={{ height: 6, background: "rgba(255,255,255,0.05)", borderRadius: 3, overflow: "hidden", marginBottom: 8 }}>
                  <div style={{ width: `${bay.progress}%`, height: "100%", background: bay.color, borderRadius: 3 }} />
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: S.dim }}>
                  <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    <User size={10} /> {bay.tech}
                  </span>
                  <span style={{ display: "flex", alignItems: "center", gap: 4, color: bay.color }}>
                    <Clock size={10} /> {bay.eta}
                  </span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// INSPECTION MODULE
// ─────────────────────────────────────────────────────────────────────────────

const INSPECTION_CHECKLIST = [
  { category: "Exterior", items: [
    { name: "Body Panels", status: "ok" },
    { name: "Paint Condition", status: "warn" },
    { name: "Windscreen", status: "ok" },
    { name: "Lights — Front", status: "ok" },
    { name: "Lights — Rear", status: "fail" },
    { name: "Tyres (all 4)", status: "warn" },
  ]},
  { category: "Engine Bay", items: [
    { name: "Engine Oil Level", status: "warn" },
    { name: "Coolant Level", status: "ok" },
    { name: "Air Filter", status: "fail" },
    { name: "Belt Condition", status: "ok" },
    { name: "Battery Terminals", status: "ok" },
  ]},
  { category: "Interior", items: [
    { name: "Dashboard Warning Lights", status: "ok" },
    { name: "AC Functionality", status: "ok" },
    { name: "Seat Belts", status: "ok" },
    { name: "Windscreen Wipers", status: "warn" },
  ]},
  { category: "Underbody", items: [
    { name: "Brake Pads (F)", status: "fail" },
    { name: "Brake Pads (R)", status: "warn" },
    { name: "Shock Absorbers", status: "ok" },
    { name: "Exhaust System", status: "ok" },
    { name: "CV Joints", status: "ok" },
  ]},
];

const iColor: Record<string, string> = { ok: S.green, warn: S.amber, fail: S.red };
const iLabel: Record<string, string> = { ok: "OK", warn: "Needs Attention", fail: "Critical" };

function InspectionModule() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
        <div>
          <h2 style={{ color: S.text, margin: 0 }}>Digital Inspection</h2>
          <p style={{ color: S.muted, fontSize: 12, margin: "2px 0 0" }}>JC-2041 · BMW 520d · Raj Mehta</p>
        </div>
        <div style={{ flex: 1 }} />
        <button style={{ padding: "7px 14px", borderRadius: 7, border: `1px solid ${S.border}`, background: "none", color: S.muted, fontSize: 12, cursor: "pointer" }}>Export PDF</button>
        <button style={{ padding: "7px 14px", borderRadius: 7, background: S.amber, border: "none", color: "#000", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>Send to Customer</button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        {INSPECTION_CHECKLIST.map((section) => (
          <div key={section.category} style={{ background: S.card, border: `1px solid ${S.border}`, borderRadius: 10, padding: "16px" }}>
            <div style={{ fontSize: 12, color: S.muted, fontWeight: 600, marginBottom: 12, textTransform: "uppercase", letterSpacing: 0.5 }}>{section.category}</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {section.items.map((item) => (
                <div key={item.name} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: iColor[item.status], flexShrink: 0 }} />
                  <span style={{ flex: 1, fontSize: 12, color: S.text }}>{item.name}</span>
                  <span style={{ fontSize: 10, color: iColor[item.status], padding: "2px 7px", borderRadius: 4, background: `${iColor[item.status]}18` }}>{iLabel[item.status]}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div style={{ background: S.card, border: `1px solid ${S.border}`, borderRadius: 10, padding: 16 }}>
        <div style={{ fontSize: 12, color: S.muted, marginBottom: 8 }}>Inspector Notes</div>
        <textarea placeholder="Add inspection notes..." style={{ width: "100%", minHeight: 80, background: "rgba(255,255,255,0.04)", border: `1px solid ${S.border}`, borderRadius: 7, color: S.text, fontSize: 13, padding: "10px 12px", outline: "none", resize: "vertical", boxSizing: "border-box" }} />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// OPERATIONS HUB (SCR-028) — LAY-002 / PLAR J2
// ─────────────────────────────────────────────────────────────────────────────

function OpsPageBg({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ background: S.bg, backgroundImage: "linear-gradient(rgba(0,229,255,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(0,229,255,0.02) 1px,transparent 1px)", backgroundSize: "32px 32px", minHeight: "100%", padding: 24, boxSizing: "border-box" as const }}>
      {children}
    </div>
  );
}

function OpsAiCard({ icon, title, desc, stat, gradient, glowColor, badge, onClick }: { icon: React.ReactNode; title: string; desc: string; stat?: string; gradient: string; glowColor: string; badge?: string; onClick?: () => void }) {
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
      {stat && <div style={{ fontSize: 20, fontWeight: 700, color: glowColor, marginTop: 12, paddingTop: 10, borderTop: `1px solid ${S.border}` }}>{stat}</div>}
    </div>
  );
}

function OperationsHub({ navigate }: { navigate: (r: ShyntraRoute) => void }) {
  return (
    <OpsPageBg>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 20 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
            <Wrench size={14} color={S.primary} />
            <span style={{ fontSize: 10, color: S.primary, fontWeight: 700, letterSpacing: 1.2, textTransform: "uppercase" as const }}>Operations</span>
          </div>
          <h1 style={{ color: S.text, margin: 0, fontSize: 26, fontWeight: 700 }}>Operations Hub</h1>
          <p style={{ color: S.muted, margin: "4px 0 0", fontSize: 12 }}>Workshop operations — bays, technicians, workflow, delivery</p>
        </div>
        <button style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 8, background: S.primary, border: "none", color: "#000", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>
          <Plus size={14} /> New Job Card
        </button>
      </div>

      {/* AI Strip */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 24 }}>
        <OpsAiCard icon={<AlertCircle size={18} color="#fff" />} title="Bottleneck Alert" desc="Bay 3 backlogged — 3 jobs queued past 2h TAT threshold" stat="Bay 3" gradient="linear-gradient(135deg,#ef4444,#f97316)" glowColor={S.red} badge="AI" />
        <OpsAiCard icon={<Activity size={18} color="#fff" />} title="Bay Utilization" desc="Predicted peak at 2:00 PM — 8/8 bays occupied" stat="78.3%" gradient="linear-gradient(135deg,#06b6d4,#3b82f6)" glowColor={S.primary} badge="AI" />
        <OpsAiCard icon={<Users size={18} color="#fff" />} title="Technician Efficiency" desc="Suresh performing 18% above avg — assign high-priority jobs" stat="94.1%" gradient="linear-gradient(135deg,#a855f7,#6366f1)" glowColor={S.purple} badge="AI" />
        <OpsAiCard icon={<Brain size={18} color="#fff" />} title="Trend Detection" desc="Average TAT trending up 12% this week — investigate root cause" stat="+12%" gradient="linear-gradient(135deg,#f59e0b,#eab308)" glowColor={S.amber} badge="AI" />
      </div>

      {/* KPI Row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 24 }}>
        {[
          { label: "Open Jobs", val: "43", sub: "8 due today · 2 overdue", color: S.primary },
          { label: "Bays Occupied", val: "6 / 8", sub: "75% utilization", color: S.green },
          { label: "Active Techs", val: "5", sub: "of 7 clocked in", color: S.purple },
          { label: "Deliveries Due", val: "5", sub: "PDI queue today", color: S.amber },
        ].map(k => (
          <div key={k.label} style={{ background: S.card, border: `1px solid ${S.border}`, borderRadius: 14, padding: "18px 20px" }}>
            <div style={{ fontSize: 11, color: S.muted, marginBottom: 8 }}>{k.label}</div>
            <div style={{ fontSize: 28, fontWeight: 700, color: k.color, marginBottom: 4 }}>{k.val}</div>
            <div style={{ fontSize: 11, color: S.dim }}>{k.sub}</div>
          </div>
        ))}
      </div>

      {/* Nav Widget Grid */}
      <div style={{ fontSize: 10, color: S.muted, fontWeight: 700, letterSpacing: 1.4, textTransform: "uppercase" as const, marginBottom: 12 }}>Module Navigation</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 24 }}>
        <OpsAiCard icon={<Car size={20} color="#fff" />} title="Bay Management" desc="Visual drag-drop bay board — assign, free, maintain" stat="6/8 Active" gradient="linear-gradient(135deg,#06b6d4,#3b82f6)" glowColor={S.primary} onClick={() => navigate("operations.bays")} />
        <OpsAiCard icon={<Users size={20} color="#fff" />} title="Technicians" desc="Skill-based assignment — utilization and efficiency" stat="5 Active" gradient="linear-gradient(135deg,#a855f7,#6366f1)" glowColor={S.purple} onClick={() => navigate("operations.technicians")} />
        <OpsAiCard icon={<Activity size={20} color="#fff" />} title="Workflow Monitor" desc="13-step pipeline health — identify and resolve blocks" stat="43 Open" gradient="linear-gradient(135deg,#22c55e,#10b981)" glowColor={S.green} onClick={() => navigate("operations.workflow")} />
        <OpsAiCard icon={<Truck size={20} color="#fff" />} title="Delivery Board" desc="PDI queue, vehicle handover, delivery notes" stat="5 Due" gradient="linear-gradient(135deg,#f59e0b,#f97316)" glowColor={S.amber} onClick={() => navigate("operations.delivery")} />
      </div>

      {/* Activity Feed */}
      <div style={{ fontSize: 10, color: S.muted, fontWeight: 700, letterSpacing: 1.4, textTransform: "uppercase" as const, marginBottom: 12 }}>Live Activity</div>
      <div style={{ background: S.card, border: `1px solid ${S.border}`, borderRadius: 14, overflow: "hidden" }}>
        {[
          { color: S.primary, cat: "Job Card", msg: "JC-2041 moved to QC stage · Bay 3 · Suresh Nair", time: "2m ago" },
          { color: S.green, cat: "Delivery", msg: "JC-2038 delivered · Honda City · Full Service complete", time: "18m ago" },
          { color: S.amber, cat: "Bay", msg: "Bay 4 flagged for maintenance · estimated 2h downtime", time: "1h ago" },
          { color: S.red, cat: "Alert", msg: "JC-2036 blocked — parts unavailable · Sharma Parts contacted", time: "2h ago" },
          { color: S.purple, cat: "Tech", msg: "Suresh Nair completed JC-2040 · 22% under estimated time", time: "3h ago" },
        ].map((a, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 18px", borderBottom: i < 4 ? `1px solid ${S.border}` : "none" }}>
            <div style={{ width: 7, height: 7, borderRadius: "50%", background: a.color, flexShrink: 0 }} />
            <span style={{ padding: "2px 7px", borderRadius: 4, background: `${a.color}14`, color: a.color, fontSize: 9, fontWeight: 700, flexShrink: 0 }}>{a.cat}</span>
            <span style={{ flex: 1, fontSize: 12, color: S.text }}>{a.msg}</span>
            <span style={{ fontSize: 10, color: S.muted, flexShrink: 0 }}>{a.time}</span>
          </div>
        ))}
      </div>
    </OpsPageBg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TECHNICIAN BOARD (SCR-030)
// ─────────────────────────────────────────────────────────────────────────────
const TECHS = [
  { name: "Suresh Nair", role: "Senior Tech", skills: ["Engine", "AC", "Detailing"], jobs: 3, util: 94, status: "Busy", statusColor: S.amber },
  { name: "Pradeep Kumar", role: "Tech II", skills: ["Brakes", "Alignment", "Tyres"], jobs: 2, util: 72, status: "Available", statusColor: S.green },
  { name: "Vinod Sharma", role: "Tech I", skills: ["Oil Change", "Basic Service"], jobs: 1, util: 45, status: "Available", statusColor: S.green },
  { name: "Ramesh Pillai", role: "Senior Tech", skills: ["Engine", "Electrical", "Diagnostics"], jobs: 3, util: 88, status: "Busy", statusColor: S.amber },
  { name: "Ajay Nair", role: "Tech II", skills: ["AC", "Brakes", "Detailing"], jobs: 0, util: 0, status: "Offline", statusColor: S.muted },
  { name: "Kavitha Menon", role: "Tech I", skills: ["Oil Change", "Tyres"], jobs: 2, util: 60, status: "Available", statusColor: S.green },
];

function TechnicianBoard() {
  return (
    <OpsPageBg>
      <div style={{ marginBottom: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
          <Users size={14} color={S.primary} />
          <span style={{ fontSize: 10, color: S.primary, fontWeight: 700, letterSpacing: 1.2, textTransform: "uppercase" as const }}>Operations › Technicians</span>
        </div>
        <h1 style={{ color: S.text, margin: 0, fontSize: 24, fontWeight: 700 }}>Technician Board</h1>
        <p style={{ color: S.muted, margin: "4px 0 0", fontSize: 12 }}>Skill-based job assignment — utilization and efficiency</p>
      </div>
      <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
        {["All", "Available", "Busy", "Offline"].map(f => (
          <button key={f} style={{ padding: "6px 14px", borderRadius: 8, border: `1px solid ${S.border}`, background: f === "All" ? `${S.primary}18` : "none", color: f === "All" ? S.primary : S.muted, fontSize: 11, cursor: "pointer" }}>{f}</button>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14 }}>
        {TECHS.map(tech => (
          <div key={tech.name} style={{ background: S.card, border: `1px solid ${S.border}`, borderRadius: 14, padding: "18px 20px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
              <div style={{ width: 44, height: 44, borderRadius: "50%", background: "linear-gradient(135deg,#00E5FF,#7C3AED)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 700, color: "#fff", flexShrink: 0 }}>{tech.name[0]}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: S.text }}>{tech.name}</div>
                <div style={{ fontSize: 11, color: S.muted }}>{tech.role}</div>
              </div>
              <span style={{ padding: "3px 8px", borderRadius: 5, background: `${tech.statusColor}18`, color: tech.statusColor, fontSize: 10, fontWeight: 600 }}>{tech.status}</span>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap" as const, gap: 5, marginBottom: 14 }}>
              {tech.skills.map(sk => (
                <span key={sk} style={{ padding: "2px 8px", borderRadius: 4, background: `${S.primary}14`, color: S.primary, fontSize: 10 }}>{sk}</span>
              ))}
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
              <span style={{ fontSize: 11, color: S.muted }}>Utilization</span>
              <span style={{ fontSize: 11, color: tech.statusColor, fontFamily: "'JetBrains Mono',monospace" }}>{tech.util}%</span>
            </div>
            <div style={{ height: 6, background: S.dim, borderRadius: 3 }}>
              <div style={{ width: `${tech.util}%`, height: "100%", background: tech.statusColor, borderRadius: 3 }} />
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 12 }}>
              <span style={{ fontSize: 11, color: S.muted }}>{tech.jobs} active job{tech.jobs !== 1 ? "s" : ""}</span>
              <button style={{ fontSize: 11, color: S.primary, background: "none", border: `1px solid ${S.primary}40`, borderRadius: 6, padding: "4px 10px", cursor: "pointer" }}>Assign Job</button>
            </div>
          </div>
        ))}
      </div>
    </OpsPageBg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// WORKFLOW MONITOR (SCR-031)
// ─────────────────────────────────────────────────────────────────────────────
const WF_STEPS = [
  { label: "Inquiry", count: 55, blocked: 0, color: S.primary },
  { label: "Appointment", count: 12, blocked: 0, color: S.green },
  { label: "Inspection", count: 8, blocked: 1, color: S.primary },
  { label: "Job Card", count: 43, blocked: 2, color: S.amber },
  { label: "Bay", count: 6, blocked: 0, color: S.green },
  { label: "Estimate", count: 8, blocked: 0, color: S.primary },
  { label: "Approval", count: 5, blocked: 1, color: S.amber },
  { label: "Work", count: 6, blocked: 0, color: S.green },
  { label: "QC", count: 4, blocked: 0, color: S.primary },
  { label: "Invoice", count: 3, blocked: 0, color: S.green },
  { label: "Payment", count: 2, blocked: 0, color: S.primary },
  { label: "Delivery", count: 5, blocked: 0, color: S.amber },
  { label: "C360", count: 0, blocked: 0, color: S.green },
];

function WorkflowMonitor() {
  const [selected, setSelected] = useState<number | null>(null);
  return (
    <OpsPageBg>
      <div style={{ marginBottom: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
          <Activity size={14} color={S.primary} />
          <span style={{ fontSize: 10, color: S.primary, fontWeight: 700, letterSpacing: 1.2, textTransform: "uppercase" as const }}>Operations › Workflow Monitor</span>
        </div>
        <h1 style={{ color: S.text, margin: 0, fontSize: 24, fontWeight: 700 }}>Workflow Monitor</h1>
        <p style={{ color: S.muted, margin: "4px 0 0", fontSize: 12 }}>13-step customer pipeline — identify and resolve blockages</p>
      </div>
      {/* AI bottleneck strip */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: 10, padding: "10px 16px", marginBottom: 24 }}>
        <AlertCircle size={13} color={S.red} />
        <span style={{ fontSize: 11, color: S.red, fontWeight: 600 }}>AI Bottleneck Alert:</span>
        <span style={{ fontSize: 12, color: S.text }}>3 jobs blocked at Approval stage · Avg TAT 18% above target this week · Bay 3 contributing 40% of delays</span>
      </div>
      {/* Workflow Tracker — horizontal strip */}
      <div style={{ background: S.card, border: `1px solid ${S.border}`, borderRadius: 14, padding: "20px 24px", marginBottom: 24, overflowX: "auto" as const }}>
        <div style={{ display: "flex", alignItems: "center", gap: 0, minWidth: 900 }}>
          {WF_STEPS.map((step, i) => (
            <div key={step.label} style={{ display: "flex", alignItems: "center", flex: 1 }}>
              <div onClick={() => setSelected(selected === i ? null : i)} style={{ flex: 1, display: "flex", flexDirection: "column" as const, alignItems: "center", gap: 8, cursor: "pointer" }}>
                <div style={{ position: "relative" as const }}>
                  <div style={{ width: 40, height: 40, borderRadius: "50%", background: selected === i ? step.color : `${step.color}22`, border: `2px solid ${step.count > 0 ? step.color : S.dim}`, display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s" }}>
                    {step.count > 0 ? <span style={{ fontSize: 12, fontWeight: 700, color: selected === i ? "#fff" : step.color }}>{step.count}</span> : <CheckCircle size={16} color={S.green} />}
                  </div>
                  {step.blocked > 0 && <span style={{ position: "absolute" as const, top: -4, right: -4, width: 16, height: 16, borderRadius: "50%", background: S.amber, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 700, color: "#000" }}>{step.blocked}</span>}
                </div>
                <span style={{ fontSize: 9, color: step.count > 0 ? S.muted : S.dim, fontWeight: 600, textAlign: "center" as const, letterSpacing: 0.3 }}>{step.label}</span>
              </div>
              {i < WF_STEPS.length - 1 && <div style={{ width: 16, height: 2, background: S.dim, flexShrink: 0 }} />}
            </div>
          ))}
        </div>
      </div>
      {/* Stage detail */}
      {selected !== null && (
        <div style={{ background: S.card, border: `1px solid ${WF_STEPS[selected].color}40`, borderRadius: 14, padding: "20px 24px", marginBottom: 24 }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: S.text, marginBottom: 8 }}>{WF_STEPS[selected].label} Stage Detail</div>
          <div style={{ display: "flex", gap: 20 }}>
            <div><span style={{ fontSize: 11, color: S.muted }}>In Stage: </span><span style={{ fontSize: 13, color: WF_STEPS[selected].color, fontWeight: 700 }}>{WF_STEPS[selected].count}</span></div>
            <div><span style={{ fontSize: 11, color: S.muted }}>Blocked: </span><span style={{ fontSize: 13, color: WF_STEPS[selected].blocked > 0 ? S.amber : S.green, fontWeight: 700 }}>{WF_STEPS[selected].blocked}</span></div>
            <div style={{ marginLeft: "auto" }}><button style={{ fontSize: 11, color: S.primary, background: `${S.primary}14`, border: `1px solid ${S.primary}40`, borderRadius: 6, padding: "6px 14px", cursor: "pointer" }}>View Jobs in Stage →</button></div>
          </div>
        </div>
      )}
      {/* State legend */}
      <div style={{ display: "flex", gap: 20, padding: "12px 0" }}>
        {[{ c: S.primary, l: "Active" }, { c: S.green, l: "Completed" }, { c: S.amber, l: "Blocked" }, { c: S.red, l: "Failed" }, { c: S.dim, l: "Pending" }].map(ls => (
          <div key={ls.l} style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: ls.c }} />
            <span style={{ fontSize: 11, color: S.muted }}>{ls.l}</span>
          </div>
        ))}
      </div>
    </OpsPageBg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DELIVERY BOARD (SCR-032)
// ─────────────────────────────────────────────────────────────────────────────
const DELIVERIES = [
  { id: "JC-2038", customer: "Priya Shah", vehicle: "Toyota Fortuner · MH02CD5678", service: "AC Repair", pdi: "Done", handover: "Ready", time: "10:30 AM", color: S.green },
  { id: "JC-2037", customer: "Arjun Kumar", vehicle: "Honda City · MH03EF9012", service: "Full Service", pdi: "In Progress", handover: "Pending", time: "11:00 AM", color: S.amber },
  { id: "JC-2036", customer: "Deepa Nair", vehicle: "Hyundai Creta · MH04GH3456", service: "Brake Pads", pdi: "Pending", handover: "Pending", time: "2:00 PM", color: S.dim },
  { id: "JC-2035", customer: "Vikram Shah", vehicle: "Maruti Swift · MH05IJ7890", service: "Oil Change", pdi: "Done", handover: "Done", time: "3:00 PM", color: S.green },
  { id: "JC-2034", customer: "Neha Joshi", vehicle: "Kia Seltos · MH06KL1234", service: "Alignment", pdi: "Done", handover: "Ready", time: "4:00 PM", color: S.primary },
];

function DeliveryBoard() {
  return (
    <OpsPageBg>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 20 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
            <Truck size={14} color={S.amber} />
            <span style={{ fontSize: 10, color: S.amber, fontWeight: 700, letterSpacing: 1.2, textTransform: "uppercase" as const }}>Operations › Delivery</span>
          </div>
          <h1 style={{ color: S.text, margin: 0, fontSize: 24, fontWeight: 700 }}>Delivery Board</h1>
          <p style={{ color: S.muted, margin: "4px 0 0", fontSize: 12 }}>PDI queue · vehicle handover · delivery documentation</p>
        </div>
      </div>
      {/* Workflow tracker — PDI stages */}
      <div style={{ display: "flex", gap: 0, background: S.card, border: `1px solid ${S.border}`, borderRadius: 14, padding: "16px 24px", marginBottom: 24, overflowX: "auto" as const }}>
        {["PDI Check", "Final Inspection", "Vehicle Ready", "Handover", "Delivered"].map((step, i) => (
          <div key={step} style={{ display: "flex", alignItems: "center", flex: 1 }}>
            <div style={{ flex: 1, display: "flex", flexDirection: "column" as const, alignItems: "center", gap: 6 }}>
              <div style={{ width: 36, height: 36, borderRadius: "50%", background: i < 2 ? S.green : i === 2 ? S.primary : S.dim, display: "flex", alignItems: "center", justifyContent: "center" }}>
                {i < 2 ? <CheckCircle size={16} color="#fff" /> : <span style={{ fontSize: 12, fontWeight: 700, color: "#fff" }}>{i < 3 ? "●" : "○"}</span>}
              </div>
              <span style={{ fontSize: 9, color: S.muted, textAlign: "center" as const, fontWeight: 600 }}>{step}</span>
            </div>
            {i < 4 && <div style={{ width: 20, height: 2, background: i < 2 ? S.green : S.dim, flexShrink: 0 }} />}
          </div>
        ))}
      </div>
      <div style={{ background: S.card, border: `1px solid ${S.border}`, borderRadius: 14, overflow: "hidden" }}>
        <div style={{ display: "grid", gridTemplateColumns: "90px 1fr 1fr 100px 100px 100px 100px", padding: "10px 18px", borderBottom: `1px solid ${S.border}` }}>
          {["Job Card", "Customer", "Vehicle & Service", "PDI", "Handover", "Time", "Action"].map(h => (
            <div key={h} style={{ fontSize: 10, color: S.muted, fontWeight: 700, letterSpacing: 0.8, textTransform: "uppercase" as const }}>{h}</div>
          ))}
        </div>
        {DELIVERIES.map((d, i) => (
          <div key={d.id} style={{ display: "grid", gridTemplateColumns: "90px 1fr 1fr 100px 100px 100px 100px", padding: "12px 18px", borderBottom: i < DELIVERIES.length - 1 ? `1px solid ${S.border}` : "none", alignItems: "center" }}>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: S.amber }}>{d.id}</div>
            <div style={{ fontSize: 12, color: S.text, fontWeight: 500 }}>{d.customer}</div>
            <div><div style={{ fontSize: 11, color: S.text }}>{d.vehicle}</div><div style={{ fontSize: 10, color: S.muted }}>{d.service}</div></div>
            <div><span style={{ padding: "2px 7px", borderRadius: 4, background: `${d.pdi === "Done" ? S.green : d.pdi === "In Progress" ? S.amber : S.dim}18`, color: d.pdi === "Done" ? S.green : d.pdi === "In Progress" ? S.amber : S.muted, fontSize: 10 }}>{d.pdi}</span></div>
            <div><span style={{ padding: "2px 7px", borderRadius: 4, background: `${d.handover === "Done" ? S.green : d.handover === "Ready" ? S.primary : S.dim}18`, color: d.handover === "Done" ? S.green : d.handover === "Ready" ? S.primary : S.muted, fontSize: 10 }}>{d.handover}</span></div>
            <div style={{ fontSize: 11, color: S.muted, fontFamily: "'JetBrains Mono',monospace" }}>{d.time}</div>
            <button style={{ fontSize: 10, color: d.handover === "Ready" ? S.primary : S.muted, background: d.handover === "Ready" ? `${S.primary}14` : "none", border: `1px solid ${d.handover === "Ready" ? S.primary + "40" : S.dim}`, borderRadius: 6, padding: "4px 10px", cursor: "pointer" }}>
              {d.handover === "Done" ? "Delivered ✓" : d.handover === "Ready" ? "Handover →" : "PDI First"}
            </button>
          </div>
        ))}
      </div>
    </OpsPageBg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// EXPORT
// ─────────────────────────────────────────────────────────────────────────────

type OpsSection = "hub" | "inquiries" | "jobcards" | "bays" | "inspections" | "technicians" | "workflow" | "delivery";

export function OperationsSuite({ section, navigate }: { section: OpsSection; navigate?: (r: ShyntraRoute) => void }) {
  if (section === "hub") return <OperationsHub navigate={navigate!} />;
  if (section === "technicians") return <TechnicianBoard />;
  if (section === "workflow") return <WorkflowMonitor />;
  if (section === "delivery") return <DeliveryBoard />;
  if (section === "jobcards") return <JobCardBoard />;
  if (section === "bays") return <BayManagement />;
  if (section === "inspections") return <InspectionModule />;
  return <InquiryKanban />;
}
