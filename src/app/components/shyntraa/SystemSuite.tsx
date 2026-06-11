import { useState } from "react";
import { Activity, AlertTriangle, CheckCircle, ChevronRight, Clock, Code, Database, Globe, Key, Link, Play, Plus, RefreshCw, Search, Server, Settings, Shield, Wifi, XCircle, Zap } from "lucide-react";
import { AreaChart, Area, BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import type { ShyntraRoute } from "../ShyntraaApp";

const S = {
  bg: "#0B1120", surface: "#111827", surfaceHover: "#1a2438",
  border: "rgba(255,255,255,0.08)", borderHover: "rgba(0,229,255,0.25)",
  text: "#F9FAFB", muted: "#9CA3AF", dim: "#374151", disabled: "#1F2937",
  primary: "#00E5FF", success: "#10B981", warning: "#F59E0B", danger: "#EF4444", ai: "#A3E635",
  purple: "#7C3AED", orange: "#F97316",
};

function SysPageBg({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      minHeight: "100%", background: S.bg, padding: 24,
      backgroundImage: "linear-gradient(rgba(0,229,255,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(0,229,255,0.02) 1px,transparent 1px)",
      backgroundSize: "32px 32px",
    }}>
      {children}
    </div>
  );
}

function Card({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return <div style={{ background: S.surface, border: `1px solid ${S.border}`, borderRadius: 16, ...style }}>{children}</div>;
}

function Badge({ label, color }: { label: string; color: string }) {
  return <span style={{ padding: "3px 10px", borderRadius: 24, background: `${color}18`, color, fontSize: 11, fontWeight: 600, letterSpacing: "0.05em" }}>{label}</span>;
}

function KpiCard({ label, value, sub, color }: { label: string; value: string; sub?: string; color: string }) {
  return (
    <Card style={{ padding: "18px 20px" }}>
      <div style={{ fontSize: 22, fontWeight: 700, color, fontFamily: "'JetBrains Mono',monospace", letterSpacing: "-0.02em" }}>{value}</div>
      <div style={{ fontSize: 12, color: S.text, marginTop: 2, fontWeight: 500 }}>{label}</div>
      {sub && <div style={{ fontSize: 11, color: S.muted, marginTop: 2 }}>{sub}</div>}
    </Card>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SYSTEM HUB — SCR-072
// ─────────────────────────────────────────────────────────────────────────────

function SystemHub({ navigate }: { navigate: (r: ShyntraRoute) => void }) {
  const NAV_CARDS = [
    { label: "Integrations", icon: Link, desc: "Connected apps & APIs", stat: "8 active", color: S.primary, route: "system.integrations" as ShyntraRoute },
    { label: "Audit Logs", icon: Shield, desc: "User activity trail", stat: "14.2k events", color: S.warning, route: "system.audit" as ShyntraRoute },
    { label: "API Management", icon: Key, desc: "Keys, webhooks & limits", stat: "3 keys active", color: S.purple, route: "system.api" as ShyntraRoute },
    { label: "Platform Health", icon: Activity, desc: "Jobs, uptime & metrics", stat: "All operational", color: S.success, route: "system.health" as ShyntraRoute },
  ];

  const AI_CARDS = [
    { title: "API Health", conf: 97, pred: "All endpoints nominal", rec: "No action needed", color: S.success },
    { title: "Integration Status", conf: 91, pred: "1 degraded connector", rec: "Check WhatsApp webhook", color: S.warning },
    { title: "Audit Anomalies", conf: 84, pred: "Unusual access pattern", rec: "Review U-004 permissions", color: S.danger },
    { title: "Job Queue Health", conf: 94, pred: "Queue depth normal", rec: "Scheduled jobs on track", color: S.primary },
  ];

  const ACTIVITY = [
    { color: S.primary, cat: "API", msg: "API key AK-003 rotated by Super Admin", time: "5m ago" },
    { color: S.success, cat: "Integration", msg: "WhatsApp gateway reconnected successfully", time: "22m ago" },
    { color: S.warning, cat: "Audit", msg: "High-volume export detected: Tenant T-003", time: "1h ago" },
    { color: S.success, cat: "Health", msg: "All background jobs completed successfully", time: "2h ago" },
    { color: S.danger, cat: "Error", msg: "PDF service timeout spike: 4 failures resolved", time: "3h ago" },
  ];

  return (
    <SysPageBg>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
        <div>
          <h1 style={{ color: S.text, margin: 0, fontSize: 22, fontWeight: 600 }}>System</h1>
          <div style={{ color: S.muted, fontSize: 12, marginTop: 2 }}>Platform infrastructure · Integrations · Audit · API</div>
        </div>
        <div style={{ flex: 1 }} />
        <button style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 12, background: `${S.primary}15`, border: `1px solid ${S.primary}40`, color: S.primary, fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
          <RefreshCw size={13} /> Run Health Check
        </button>
      </div>

      {/* AI Strip */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 20 }}>
        {AI_CARDS.map((c, i) => (
          <Card key={`sys-hub-ai-${i}`} style={{ padding: "14px 16px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <span style={{ background: `${S.ai}18`, color: S.ai, fontSize: 9, fontWeight: 700, padding: "2px 7px", borderRadius: 24, letterSpacing: "0.1em" }}>AI</span>
              <span style={{ fontSize: 12, fontWeight: 600, color: S.text }}>{c.title}</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
              <div style={{ flex: 1, height: 3, background: S.dim, borderRadius: 2 }}>
                <div style={{ height: "100%", width: `${c.conf}%`, background: c.color, borderRadius: 2 }} />
              </div>
              <span style={{ fontSize: 10, color: c.color, fontWeight: 600 }}>{c.conf}%</span>
            </div>
            <div style={{ fontSize: 11, color: S.muted }}>{c.pred}</div>
            <div style={{ fontSize: 11, color: S.text, marginTop: 4 }}>{c.rec}</div>
          </Card>
        ))}
      </div>

      {/* KPI Row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 20 }}>
        <KpiCard label="Integrations Active" value="8" sub="of 10 configured" color={S.success} />
        <KpiCard label="Audit Events Today" value="1,247" sub="+14% vs yesterday" color={S.warning} />
        <KpiCard label="API Calls / hr" value="4,821" sub="within rate limits" color={S.primary} />
        <KpiCard label="Background Jobs" value="12" sub="0 failed, 0 pending" color={S.success} />
      </div>

      {/* Nav Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 20 }}>
        {NAV_CARDS.map((c) => {
          const Icon = c.icon;
          return (
            <button key={c.label} onClick={() => navigate(c.route)} style={{ background: S.surface, border: `1px solid ${S.border}`, borderRadius: 16, padding: "20px", cursor: "pointer", textAlign: "left", transition: "all 0.2s" }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = S.borderHover; e.currentTarget.style.boxShadow = "0 0 32px rgba(0,229,255,0.10)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = S.border; e.currentTarget.style.boxShadow = "none"; }}>
              <div style={{ width: 40, height: 40, borderRadius: 12, background: `${c.color}18`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 12 }}>
                <Icon size={18} color={c.color} />
              </div>
              <div style={{ fontSize: 14, fontWeight: 600, color: S.text, marginBottom: 4 }}>{c.label}</div>
              <div style={{ fontSize: 11, color: S.muted, marginBottom: 8 }}>{c.desc}</div>
              <div style={{ fontSize: 11, color: c.color, fontWeight: 500 }}>{c.stat}</div>
            </button>
          );
        })}
      </div>

      {/* Activity */}
      <Card style={{ padding: 0, overflow: "hidden" }}>
        <div style={{ padding: "14px 18px", borderBottom: `1px solid ${S.border}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: S.text }}>System Activity</span>
          <span style={{ fontSize: 11, color: S.muted }}>Live feed</span>
        </div>
        {ACTIVITY.map((a, i) => (
          <div key={`sys-act-${i}`} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 18px", borderBottom: i < ACTIVITY.length - 1 ? `1px solid ${S.border}` : "none" }}>
            <div style={{ width: 7, height: 7, borderRadius: "50%", background: a.color, flexShrink: 0, boxShadow: `0 0 8px ${a.color}80` }} />
            <span style={{ padding: "1px 7px", borderRadius: 4, background: `${a.color}15`, color: a.color, fontSize: 10, fontWeight: 600, flexShrink: 0 }}>{a.cat}</span>
            <span style={{ fontSize: 12, color: S.muted, flex: 1 }}>{a.msg}</span>
            <span style={{ fontSize: 11, color: S.dim, flexShrink: 0 }}>{a.time}</span>
          </div>
        ))}
      </Card>
    </SysPageBg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// INTEGRATIONS — SCR-073
// ─────────────────────────────────────────────────────────────────────────────

const INTEGRATIONS = [
  { id: "INT-001", name: "WhatsApp Business API", category: "Messaging", status: "Connected", lastSync: "2 min ago", icon: "📱", color: S.success },
  { id: "INT-002", name: "Razorpay Payments", category: "Payments", status: "Connected", lastSync: "15 min ago", icon: "💳", color: S.success },
  { id: "INT-003", name: "GST Portal (NIC)", category: "Compliance", status: "Connected", lastSync: "1h ago", icon: "🏛️", color: S.success },
  { id: "INT-004", name: "Tally Integration", category: "Accounting", status: "Degraded", lastSync: "3h ago", icon: "📊", color: S.warning },
  { id: "INT-005", name: "SMS Gateway (Twilio)", category: "Messaging", status: "Connected", lastSync: "8 min ago", icon: "💬", color: S.success },
  { id: "INT-006", name: "Google Calendar", category: "Productivity", status: "Connected", lastSync: "30 min ago", icon: "📅", color: S.success },
  { id: "INT-007", name: "Email (SendGrid)", category: "Messaging", status: "Connected", lastSync: "5 min ago", icon: "📧", color: S.success },
  { id: "INT-008", name: "DMS (OEM Portal)", category: "Auto", status: "Disconnected", lastSync: "Never", icon: "🚗", color: S.danger },
];

function Integrations() {
  const [search, setSearch] = useState("");
  const filtered = INTEGRATIONS.filter(i => !search || i.name.toLowerCase().includes(search.toLowerCase()) || i.category.toLowerCase().includes(search.toLowerCase()));

  return (
    <SysPageBg>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
        <div>
          <h1 style={{ color: S.text, margin: 0, fontSize: 22, fontWeight: 600 }}>Integrations</h1>
          <div style={{ color: S.muted, fontSize: 12, marginTop: 2 }}>Connected apps · API bridges · Status</div>
        </div>
        <div style={{ flex: 1 }} />
        <div style={{ display: "flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.04)", borderRadius: 12, padding: "7px 14px", border: `1px solid ${S.border}` }}>
          <Search size={13} color={S.muted} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search integrations..." style={{ background: "none", border: "none", outline: "none", color: S.text, fontSize: 12, width: 180 }} />
        </div>
        <button style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 12, background: `${S.primary}15`, border: `1px solid ${S.primary}40`, color: S.primary, fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
          <Plus size={13} /> Connect App
        </button>
      </div>

      {/* Status Summary */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginBottom: 20 }}>
        <KpiCard label="Connected" value={String(INTEGRATIONS.filter(i => i.status === "Connected").length)} color={S.success} />
        <KpiCard label="Degraded" value={String(INTEGRATIONS.filter(i => i.status === "Degraded").length)} color={S.warning} />
        <KpiCard label="Disconnected" value={String(INTEGRATIONS.filter(i => i.status === "Disconnected").length)} color={S.danger} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 14 }}>
        {filtered.map((intg) => (
          <Card key={intg.id} style={{ padding: "18px 20px", display: "flex", alignItems: "flex-start", gap: 14 }}>
            <div style={{ fontSize: 28, lineHeight: 1, flexShrink: 0 }}>{intg.icon}</div>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                <span style={{ fontSize: 14, fontWeight: 600, color: S.text }}>{intg.name}</span>
                <Badge label={intg.status} color={intg.color} />
              </div>
              <div style={{ fontSize: 11, color: S.muted, marginBottom: 8 }}>{intg.category} · Last sync: {intg.lastSync}</div>
              <div style={{ display: "flex", gap: 8 }}>
                <button style={{ padding: "5px 12px", borderRadius: 8, border: `1px solid ${S.border}`, background: "none", color: S.muted, fontSize: 11, cursor: "pointer" }}>Configure</button>
                <button style={{ padding: "5px 12px", borderRadius: 8, border: `1px solid ${S.primary}30`, background: `${S.primary}10`, color: S.primary, fontSize: 11, cursor: "pointer" }}>Test</button>
                {intg.status === "Disconnected" && (
                  <button style={{ padding: "5px 12px", borderRadius: 8, border: `1px solid ${S.success}40`, background: `${S.success}10`, color: S.success, fontSize: 11, cursor: "pointer" }}>Connect</button>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </SysPageBg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// AUDIT LOGS — SCR-074
// ─────────────────────────────────────────────────────────────────────────────

const AUDIT_LOGS = [
  { id: "AL-8821", user: "Admin · Primus", action: "UPDATE", entity: "User · U-005 role changed", ip: "103.24.55.12", result: "Success", time: "09:14:22" },
  { id: "AL-8820", user: "Ravi Advisor", action: "CREATE", entity: "Job Card JC-2041", ip: "103.24.55.44", result: "Success", time: "09:10:08" },
  { id: "AL-8819", user: "Suresh Nair", action: "UPDATE", entity: "Bay B-04 status → Occupied", ip: "192.168.1.22", result: "Success", time: "09:08:31" },
  { id: "AL-8818", user: "Admin · Primus", action: "DELETE", entity: "Template TMPL-009 removed", ip: "103.24.55.12", result: "Success", time: "09:01:47" },
  { id: "AL-8817", user: "Unknown", action: "LOGIN", entity: "Failed login attempt", ip: "45.82.33.107", result: "Failed", time: "08:57:09" },
  { id: "AL-8816", user: "Meena Sharma", action: "EXPORT", entity: "Customer list CSV export", ip: "192.168.1.31", result: "Success", time: "08:52:15" },
  { id: "AL-8815", user: "Kiran Patil", action: "VIEW", entity: "Invoice INV-1089 accessed", ip: "192.168.1.41", result: "Success", time: "08:44:50" },
  { id: "AL-8814", user: "Ravi Advisor", action: "CREATE", entity: "Inquiry INQ-1244 created", ip: "103.24.55.44", result: "Success", time: "08:38:19" },
];

const ACTION_COLORS: Record<string, string> = {
  CREATE: S.success, UPDATE: S.primary, DELETE: S.danger, LOGIN: S.warning, EXPORT: S.purple, VIEW: S.muted,
};

function AuditLogs() {
  const [search, setSearch] = useState("");
  const filtered = AUDIT_LOGS.filter(l => !search || l.user.toLowerCase().includes(search.toLowerCase()) || l.action.toLowerCase().includes(search.toLowerCase()) || l.entity.toLowerCase().includes(search.toLowerCase()));

  return (
    <SysPageBg>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
        <div>
          <h1 style={{ color: S.text, margin: 0, fontSize: 22, fontWeight: 600 }}>Audit Logs</h1>
          <div style={{ color: S.muted, fontSize: 12, marginTop: 2 }}>User activity trail · {AUDIT_LOGS.length} events today</div>
        </div>
        <div style={{ flex: 1 }} />
        <div style={{ display: "flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.04)", borderRadius: 12, padding: "7px 14px", border: `1px solid ${S.border}` }}>
          <Search size={13} color={S.muted} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Filter by user, action..." style={{ background: "none", border: "none", outline: "none", color: S.text, fontSize: 12, width: 200 }} />
        </div>
        <button style={{ padding: "8px 16px", borderRadius: 12, border: `1px solid ${S.border}`, background: "none", color: S.muted, fontSize: 12, cursor: "pointer" }}>Export CSV</button>
      </div>

      {/* Action filter chips */}
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        {["All", "CREATE", "UPDATE", "DELETE", "LOGIN", "EXPORT"].map(a => (
          <button key={`audit-filter-${a}`} style={{ padding: "4px 12px", borderRadius: 24, border: `1px solid ${a !== "All" ? `${ACTION_COLORS[a] ?? S.border}40` : S.border}`, background: "none", color: a !== "All" ? (ACTION_COLORS[a] ?? S.muted) : S.muted, fontSize: 11, cursor: "pointer" }}>{a}</button>
        ))}
      </div>

      <Card style={{ overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${S.border}` }}>
              {["Time", "Log ID", "User", "Action", "Entity", "IP Address", "Result"].map(h => (
                <th key={`audit-col-${h}`} style={{ padding: "10px 14px", textAlign: "left", color: S.muted, fontWeight: 500, whiteSpace: "nowrap" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((log, i) => (
              <tr key={log.id} style={{ borderBottom: i < filtered.length - 1 ? `1px solid ${S.border}` : "none" }}
                onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.02)")}
                onMouseLeave={e => (e.currentTarget.style.background = "none")}>
                <td style={{ padding: "11px 14px", color: S.dim, fontFamily: "'JetBrains Mono',monospace", fontSize: 11 }}>{log.time}</td>
                <td style={{ padding: "11px 14px", color: S.muted, fontFamily: "'JetBrains Mono',monospace", fontSize: 11 }}>{log.id}</td>
                <td style={{ padding: "11px 14px", color: S.text }}>{log.user}</td>
                <td style={{ padding: "11px 14px" }}><Badge label={log.action} color={ACTION_COLORS[log.action] ?? S.muted} /></td>
                <td style={{ padding: "11px 14px", color: S.muted }}>{log.entity}</td>
                <td style={{ padding: "11px 14px", color: S.dim, fontFamily: "'JetBrains Mono',monospace", fontSize: 11 }}>{log.ip}</td>
                <td style={{ padding: "11px 14px" }}><Badge label={log.result} color={log.result === "Success" ? S.success : S.danger} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </SysPageBg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// API MANAGEMENT — SCR-075
// ─────────────────────────────────────────────────────────────────────────────

const API_KEYS = [
  { id: "AK-001", name: "Production Mobile App", key: "sk_prod_••••••••••••3f8a", scope: "Full Access", created: "Jan 2024", lastUsed: "2 min ago", calls: "1.2M" },
  { id: "AK-002", name: "Analytics Dashboard", key: "sk_prod_••••••••••••9c2d", scope: "Read Only", created: "Mar 2024", lastUsed: "18 min ago", calls: "240K" },
  { id: "AK-003", name: "Webhook Receiver", key: "sk_prod_••••••••••••7b1e", scope: "Webhooks", created: "Jun 2024", lastUsed: "1h ago", calls: "86K" },
];

const WEBHOOKS = [
  { url: "https://erp.primus.com/hooks/jobs", events: "job.created, job.completed", status: "Active", lastFired: "2 min ago" },
  { url: "https://erp.primus.com/hooks/payments", events: "payment.received", status: "Active", lastFired: "15 min ago" },
  { url: "https://staging.primus.com/hooks/all", events: "All events", status: "Paused", lastFired: "3 days ago" },
];

function APIManagement() {
  return (
    <SysPageBg>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
        <div>
          <h1 style={{ color: S.text, margin: 0, fontSize: 22, fontWeight: 600 }}>API Management</h1>
          <div style={{ color: S.muted, fontSize: 12, marginTop: 2 }}>API keys · Webhooks · Rate limits</div>
        </div>
        <div style={{ flex: 1 }} />
        <button style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 12, background: `${S.primary}15`, border: `1px solid ${S.primary}40`, color: S.primary, fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
          <Plus size={13} /> Create API Key
        </button>
      </div>

      {/* API Keys */}
      <div style={{ marginBottom: 6 }}>
        <div style={{ fontSize: 11, color: S.muted, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 12 }}>API Keys</div>
        <Card style={{ overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
            <thead>
              <tr style={{ borderBottom: `1px solid ${S.border}` }}>
                {["Name", "Key", "Scope", "Total Calls", "Last Used", "Created", ""].map(h => (
                  <th key={`apikey-col-${h}`} style={{ padding: "10px 14px", textAlign: "left", color: S.muted, fontWeight: 500 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {API_KEYS.map((k, i) => (
                <tr key={k.id} style={{ borderBottom: i < API_KEYS.length - 1 ? `1px solid ${S.border}` : "none" }}
                  onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.02)")}
                  onMouseLeave={e => (e.currentTarget.style.background = "none")}>
                  <td style={{ padding: "12px 14px", color: S.text, fontWeight: 500 }}>{k.name}</td>
                  <td style={{ padding: "12px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: S.muted }}>{k.key}</td>
                  <td style={{ padding: "12px 14px" }}><Badge label={k.scope} color={k.scope === "Full Access" ? S.danger : k.scope === "Read Only" ? S.success : S.warning} /></td>
                  <td style={{ padding: "12px 14px", color: S.primary, fontFamily: "'JetBrains Mono',monospace" }}>{k.calls}</td>
                  <td style={{ padding: "12px 14px", color: S.muted }}>{k.lastUsed}</td>
                  <td style={{ padding: "12px 14px", color: S.dim }}>{k.created}</td>
                  <td style={{ padding: "12px 14px" }}>
                    <div style={{ display: "flex", gap: 8 }}>
                      <button style={{ padding: "4px 10px", borderRadius: 6, border: `1px solid ${S.warning}40`, background: `${S.warning}10`, color: S.warning, fontSize: 11, cursor: "pointer" }}>Rotate</button>
                      <button style={{ padding: "4px 10px", borderRadius: 6, border: `1px solid ${S.danger}30`, background: "none", color: S.danger, fontSize: 11, cursor: "pointer" }}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>

      {/* Webhooks */}
      <div style={{ marginTop: 24 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
          <div style={{ fontSize: 11, color: S.muted, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>Webhooks</div>
          <button style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 12px", borderRadius: 10, background: `${S.primary}10`, border: `1px solid ${S.primary}30`, color: S.primary, fontSize: 11, cursor: "pointer" }}>
            <Plus size={12} /> Add Webhook
          </button>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {WEBHOOKS.map((wh, i) => (
            <Card key={`wh-${i}`} style={{ padding: "14px 18px", display: "flex", alignItems: "center", gap: 14 }}>
              <Globe size={16} color={wh.status === "Active" ? S.success : S.dim} style={{ flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, color: S.text, fontFamily: "'JetBrains Mono',monospace", marginBottom: 3 }}>{wh.url}</div>
                <div style={{ fontSize: 11, color: S.muted }}>{wh.events} · Last fired: {wh.lastFired}</div>
              </div>
              <Badge label={wh.status} color={wh.status === "Active" ? S.success : S.dim} />
              <button style={{ padding: "5px 10px", borderRadius: 8, border: `1px solid ${S.primary}30`, background: `${S.primary}10`, color: S.primary, fontSize: 11, cursor: "pointer" }}>Test</button>
            </Card>
          ))}
        </div>
      </div>
    </SysPageBg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PLATFORM HEALTH — SCR-076
// ─────────────────────────────────────────────────────────────────────────────

const UPTIME_DATA = Array.from({ length: 24 }, (_, i) => ({
  hour: `${i}:00`,
  uptime: 99.5 + Math.random() * 0.5,
  latency: 30 + Math.random() * 40,
}));

const JOBS = [
  { name: "Invoice PDF Generator", status: "Running", lastRun: "09:10:00", nextRun: "09:20:00", duration: "1.2s" },
  { name: "WhatsApp Reminder Batch", status: "Completed", lastRun: "09:00:00", nextRun: "10:00:00", duration: "8.4s" },
  { name: "Database Backup", status: "Completed", lastRun: "03:00:00", nextRun: "15:00:00", duration: "2m 14s" },
  { name: "AI Model Sync", status: "Scheduled", lastRun: "Yesterday", nextRun: "23:00:00", duration: "—" },
  { name: "Audit Log Archiver", status: "Completed", lastRun: "08:00:00", nextRun: "20:00:00", duration: "34s" },
];

const JOB_STATUS_COLOR: Record<string, string> = { Running: S.primary, Completed: S.success, Scheduled: S.muted, Failed: S.danger };

function PlatformHealth() {
  return (
    <SysPageBg>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
        <div>
          <h1 style={{ color: S.text, margin: 0, fontSize: 22, fontWeight: 600 }}>Platform Health</h1>
          <div style={{ color: S.muted, fontSize: 12, marginTop: 2 }}>Uptime · Latency · Background jobs</div>
        </div>
        <div style={{ flex: 1 }} />
        <Badge label="All Systems Operational" color={S.success} />
      </div>

      {/* Infra metrics */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 20 }}>
        {[
          { label: "CPU Usage", value: "23%", color: S.success },
          { label: "Memory", value: "61%", color: S.warning },
          { label: "Disk I/O", value: "12%", color: S.success },
          { label: "Network Out", value: "4.2 MB/s", color: S.primary },
        ].map((m, i) => (
          <KpiCard key={`health-kpi-${i}`} label={m.label} value={m.value} color={m.color} />
        ))}
      </div>

      {/* Uptime chart */}
      <Card style={{ padding: "18px 20px", marginBottom: 16 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: S.text, marginBottom: 14 }}>24h Uptime & Latency</div>
        <ResponsiveContainer width="100%" height={160}>
          <LineChart data={UPTIME_DATA} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
            <XAxis dataKey="hour" tick={{ fill: S.dim, fontSize: 10 }} interval={3} />
            <YAxis tick={{ fill: S.dim, fontSize: 10 }} />
            <Tooltip contentStyle={{ background: S.surface, border: `1px solid ${S.border}`, borderRadius: 8, fontSize: 11 }} />
            <Line type="monotone" dataKey="latency" stroke={S.primary} dot={false} strokeWidth={2} name="Latency (ms)" />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* Background Jobs */}
      <div style={{ fontSize: 11, color: S.muted, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 12 }}>Background Jobs</div>
      <Card style={{ overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${S.border}` }}>
              {["Job Name", "Status", "Last Run", "Next Run", "Duration", ""].map(h => (
                <th key={`job-col-${h}`} style={{ padding: "10px 14px", textAlign: "left", color: S.muted, fontWeight: 500 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {JOBS.map((job, i) => (
              <tr key={`job-${i}`} style={{ borderBottom: i < JOBS.length - 1 ? `1px solid ${S.border}` : "none" }}
                onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.02)")}
                onMouseLeave={e => (e.currentTarget.style.background = "none")}>
                <td style={{ padding: "12px 14px", color: S.text, fontWeight: 500 }}>{job.name}</td>
                <td style={{ padding: "12px 14px" }}><Badge label={job.status} color={JOB_STATUS_COLOR[job.status]} /></td>
                <td style={{ padding: "12px 14px", color: S.muted, fontFamily: "'JetBrains Mono',monospace", fontSize: 11 }}>{job.lastRun}</td>
                <td style={{ padding: "12px 14px", color: S.dim, fontFamily: "'JetBrains Mono',monospace", fontSize: 11 }}>{job.nextRun}</td>
                <td style={{ padding: "12px 14px", color: S.dim }}>{job.duration}</td>
                <td style={{ padding: "12px 14px" }}>
                  <button style={{ display: "flex", alignItems: "center", gap: 5, padding: "4px 10px", borderRadius: 6, border: `1px solid ${S.border}`, background: "none", color: S.muted, fontSize: 11, cursor: "pointer" }}>
                    <Play size={11} /> Restart
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </SysPageBg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// EXPORT
// ─────────────────────────────────────────────────────────────────────────────

type SysSection = "hub" | "integrations" | "audit" | "api" | "health";

export function SystemSuite({ section, navigate }: { section: SysSection; navigate: (r: ShyntraRoute) => void }) {
  if (section === "integrations") return <Integrations />;
  if (section === "audit") return <AuditLogs />;
  if (section === "api") return <APIManagement />;
  if (section === "health") return <PlatformHealth />;
  return <SystemHub navigate={navigate} />;
}
