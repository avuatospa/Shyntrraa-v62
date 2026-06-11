import { useState } from "react";
import {
  Users, Shield, Settings, Bell, MessageSquare, Phone, Globe, Server,
  Activity, AlertCircle, CheckCircle, Edit2, Trash2, Plus, Search,
  ChevronRight, Zap, Key, Flag, BarChart3, Cpu, Database, TrendingUp,
  TrendingDown, Building2, Package, CreditCard, ToggleLeft, ToggleRight,
} from "lucide-react";
import {
  LineChart, Line, AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
} from "recharts";

// ─── Design Tokens ───────────────────────────────────────────────────────────
const T = {
  bg: "#0B1120",
  surface: "#111827",
  surfaceHover: "#1a2438",
  border: "rgba(255,255,255,0.08)",
  borderActive: "rgba(0,229,255,0.25)",
  text: "#F9FAFB",
  muted: "#9CA3AF",
  dim: "#374151",
  primary: "#00E5FF",
  success: "#10B981",
  warning: "#F59E0B",
  danger: "#EF4444",
  ai: "#A3E635",
  purple: "#7C3AED",
  amber: "#F59E0B",
  blue: "#00E5FF",
};

// ─── Type ────────────────────────────────────────────────────────────────────
export type AdminSection =
  | "admin.hub" | "admin.users" | "admin.roles" | "admin.permissions"
  | "admin.templates" | "admin.branding" | "admin.whatsapp" | "admin.settings"
  | "superadmin.hub" | "superadmin.tenants" | "superadmin.subscriptions"
  | "superadmin.feature-flags" | "superadmin.monitoring"
  | "superadmin.api-usage" | "superadmin.errors";

// ─── Shared Components ────────────────────────────────────────────────────────
function PageBg({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      background: T.bg,
      backgroundImage: "linear-gradient(rgba(0,229,255,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(0,229,255,0.02) 1px,transparent 1px)",
      backgroundSize: "32px 32px",
      minHeight: "100%",
      padding: 24,
      boxSizing: "border-box",
    }}>
      {children}
    </div>
  );
}

function Card({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 16, ...style }}>
      {children}
    </div>
  );
}

function Badge({ label, color }: { label: string; color: string }) {
  return (
    <span style={{ padding: "3px 10px", borderRadius: 6, background: `${color}22`, color, fontSize: 11, fontWeight: 600, letterSpacing: "0.03em" }}>
      {label}
    </span>
  );
}

function StatusDot({ active }: { active: boolean }) {
  return (
    <span style={{
      display: "inline-block", width: 8, height: 8, borderRadius: "50%",
      background: active ? T.success : T.dim, marginRight: 6,
    }} />
  );
}

function SecHeader({ label }: { label: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
      <div style={{ width: 4, height: 18, borderRadius: 2, background: T.primary }} />
      <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: T.muted }}>
        {label}
      </span>
    </div>
  );
}

function KpiCard({ label, value, trend, trendUp }: { label: string; value: string; trend?: string; trendUp?: boolean }) {
  return (
    <Card style={{ padding: "18px 20px", flex: 1, minWidth: 120 }}>
      <div style={{ fontSize: 11, color: T.muted, marginBottom: 8 }}>{label}</div>
      <div style={{ fontSize: 26, fontWeight: 700, color: T.text, fontFamily: "monospace", letterSpacing: "-0.02em" }}>{value}</div>
      {trend && (
        <div style={{ fontSize: 11, color: trendUp ? T.success : T.danger, marginTop: 6, display: "flex", alignItems: "center", gap: 4 }}>
          {trendUp ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
          {trend}
        </div>
      )}
    </Card>
  );
}

function AICard({ title, confidence, prediction, recommendation, action }: {
  title: string; confidence: number; prediction: string; recommendation: string; action: string;
}) {
  return (
    <Card style={{ padding: 16, flex: 1, minWidth: 180 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
        <span style={{ background: T.ai, color: "#000", fontSize: 10, fontWeight: 800, padding: "2px 7px", borderRadius: 4 }}>AI</span>
        <span style={{ fontSize: 12, fontWeight: 600, color: T.text }}>{title}</span>
      </div>
      <div style={{ fontSize: 11, color: T.muted, marginBottom: 6 }}>Confidence</div>
      <div style={{ background: T.dim, borderRadius: 4, height: 4, marginBottom: 4 }}>
        <div style={{ background: T.ai, height: 4, borderRadius: 4, width: `${confidence}%` }} />
      </div>
      <div style={{ fontSize: 10, color: T.ai, marginBottom: 8 }}>{confidence}%</div>
      <div style={{ fontSize: 11, color: T.text, marginBottom: 4 }}>{prediction}</div>
      <div style={{ fontSize: 10, color: T.muted, marginBottom: 10 }}>{recommendation}</div>
      <button style={{
        background: `${T.ai}18`, border: `1px solid ${T.ai}44`, color: T.ai,
        borderRadius: 6, padding: "5px 12px", fontSize: 11, cursor: "pointer",
      }}>{action}</button>
    </Card>
  );
}

function Btn({ label, icon, onClick, variant = "primary" }: {
  label: string; icon?: React.ReactNode; onClick?: () => void; variant?: "primary" | "danger" | "ghost";
}) {
  const bg = variant === "primary" ? T.primary : variant === "danger" ? T.danger : "transparent";
  const col = variant === "primary" ? "#000" : T.text;
  const brd = variant === "ghost" ? T.border : "transparent";
  return (
    <button onClick={onClick} style={{
      background: bg, color: col, border: `1px solid ${brd}`,
      borderRadius: 8, padding: "8px 16px", fontSize: 13, fontWeight: 600,
      cursor: "pointer", display: "flex", alignItems: "center", gap: 6,
    }}>
      {icon}{label}
    </button>
  );
}

function TableHeader({ cols }: { cols: string[] }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols.length}, 1fr)`, padding: "10px 16px", borderBottom: `1px solid ${T.border}` }}>
      {cols.map((c) => (
        <span key={c} style={{ fontSize: 11, fontWeight: 700, color: T.muted, textTransform: "uppercase", letterSpacing: "0.06em" }}>{c}</span>
      ))}
    </div>
  );
}

function TableRow({ cells, cols }: { cells: React.ReactNode[]; cols: number }) {
  return (
    <div style={{
      display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`,
      padding: "12px 16px", borderBottom: `1px solid ${T.border}`,
      alignItems: "center",
    }}>
      {cells.map((c, i) => (
        <div key={i} style={{ fontSize: 13, color: T.text }}>{c}</div>
      ))}
    </div>
  );
}

function AlertItem({ msg, type }: { msg: string; type: "danger" | "warning" | "info" }) {
  const col = type === "danger" ? T.danger : type === "warning" ? T.warning : T.primary;
  return (
    <div style={{
      display: "flex", alignItems: "flex-start", gap: 10,
      padding: "10px 14px", background: `${col}0d`, border: `1px solid ${col}33`,
      borderRadius: 10, marginBottom: 8,
    }}>
      <AlertCircle size={14} color={col} style={{ marginTop: 1, flexShrink: 0 }} />
      <span style={{ fontSize: 12, color: T.text }}>{msg}</span>
    </div>
  );
}

// ─── Admin Hub ───────────────────────────────────────────────────────────────
function AdminHub({ navigate }: { navigate: (s: AdminSection) => void }) {
  const widgets: { icon: React.ReactNode; title: string; desc: string; stat: string; section: AdminSection }[] = [
    { icon: <Users size={20} />, title: "Users", desc: "Manage user accounts and invitations", stat: "47 users", section: "admin.users" },
    { icon: <Shield size={20} />, title: "Roles", desc: "Define roles and access levels", stat: "7 roles", section: "admin.roles" },
    { icon: <Key size={20} />, title: "Permissions", desc: "Screen-level permission matrix", stat: "56 rules", section: "admin.permissions" },
    { icon: <Bell size={20} />, title: "Templates", desc: "SMS, Email & WhatsApp templates", stat: "6 templates", section: "admin.templates" },
    { icon: <Globe size={20} />, title: "Branding", desc: "Logo, colors and fonts", stat: "Active", section: "admin.branding" },
    { icon: <MessageSquare size={20} />, title: "WhatsApp", desc: "Business API configuration", stat: "Connected", section: "admin.whatsapp" },
    { icon: <Settings size={20} />, title: "System Settings", desc: "Timezone, currency, fiscal year", stat: "IST / INR", section: "admin.settings" },
  ];

  const activities = [
    { time: "09:14 AM", msg: "Ravi Sharma invited as Service Advisor", user: "Meena Sharma" },
    { time: "08:50 AM", msg: "Role 'Vendor User' permissions updated", user: "Tenant Admin" },
    { time: "Yesterday", msg: "WhatsApp template 'Job Ready' approved", user: "System" },
    { time: "Yesterday", msg: "Kiran Patil account deactivated", user: "Admin" },
    { time: "2 days ago", msg: "Branding colors updated for Primus Motors", user: "Meena Sharma" },
  ];

  return (
    <PageBg>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
        <div>
          <div style={{ fontSize: 22, fontWeight: 700, color: T.text }}>Admin</div>
          <div style={{ fontSize: 12, color: T.muted, marginTop: 2 }}>Dashboard &gt; Admin</div>
        </div>
        <Btn label="+ Invite User" />
      </div>

      {/* AI Strip */}
      <SecHeader label="AI Insights" />
      <div style={{ display: "flex", gap: 12, marginBottom: 24, flexWrap: "wrap" }}>
        <AICard title="Permission Drift" confidence={87} prediction="3 users have elevated permissions beyond role baseline" recommendation="Review Service Advisor access to Finance module" action="Review Now" />
        <AICard title="License Utilization" confidence={92} prediction="Current plan supports 50 users — 47 active (94%)" recommendation="Upgrade plan before onboarding next hire" action="View Plan" />
        <AICard title="System Health" confidence={99} prediction="All services operational, latency nominal" recommendation="Schedule maintenance window in 12 days" action="View Status" />
        <AICard title="Active Sessions" confidence={95} prediction="23 concurrent sessions within normal range" recommendation="No anomalies detected in session patterns" action="View Sessions" />
      </div>

      {/* KPIs */}
      <SecHeader label="Overview" />
      <div style={{ display: "flex", gap: 12, marginBottom: 24, flexWrap: "wrap" }}>
        <KpiCard label="Total Users" value="47" trend="+2 this week" trendUp />
        <KpiCard label="Active Sessions" value="23" />
        <KpiCard label="Roles Defined" value="7" />
        <KpiCard label="Pending Invites" value="3" trend="Expires in 2 days" trendUp={false} />
      </div>

      {/* Widget Nav */}
      <SecHeader label="Administration" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: 12, marginBottom: 24 }}>
        {widgets.map((w) => (
          <Card key={w.section} style={{ padding: 18, cursor: "pointer", transition: "border-color 0.2s" }}
            onClick={() => navigate(w.section)}>
            <div style={{
              width: 40, height: 40, borderRadius: 10,
              background: `linear-gradient(135deg,${T.primary}22,${T.purple}22)`,
              display: "flex", alignItems: "center", justifyContent: "center",
              color: T.primary, marginBottom: 12,
            }}>
              {w.icon}
            </div>
            <div style={{ fontSize: 14, fontWeight: 600, color: T.text, marginBottom: 4 }}>{w.title}</div>
            <div style={{ fontSize: 12, color: T.muted, marginBottom: 10 }}>{w.desc}</div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontSize: 12, color: T.primary }}>{w.stat}</span>
              <ChevronRight size={14} color={T.muted} />
            </div>
          </Card>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        {/* Activity Feed */}
        <Card style={{ padding: 20 }}>
          <SecHeader label="Recent Activity" />
          {activities.map((a, i) => (
            <div key={i} style={{ display: "flex", gap: 12, paddingBottom: 12, marginBottom: 12, borderBottom: i < activities.length - 1 ? `1px solid ${T.border}` : "none" }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: T.primary, marginTop: 5, flexShrink: 0 }} />
              <div>
                <div style={{ fontSize: 12, color: T.text }}>{a.msg}</div>
                <div style={{ fontSize: 11, color: T.muted, marginTop: 2 }}>{a.time} · {a.user}</div>
              </div>
            </div>
          ))}
        </Card>

        {/* Alerts */}
        <Card style={{ padding: 20 }}>
          <SecHeader label="Alerts" />
          <AlertItem type="warning" msg="3 pending invites expire within 48 hours — resend or cancel to keep audit clean." />
          <AlertItem type="danger" msg="Permission drift detected: 2 Service Advisors have read access to Finance Reports." />
          <AlertItem type="info" msg="WhatsApp Business template 'Appointment Reminder' pending WABA approval." />
        </Card>
      </div>
    </PageBg>
  );
}

// ─── User Management ──────────────────────────────────────────────────────────
const USERS = [
  { id: "U-001", name: "Meena Sharma", email: "meena@primus.com", role: "Tenant Admin", branch: "Mumbai Central", status: "Active", lastLogin: "Today 9:14 AM" },
  { id: "U-002", name: "Rajesh Iyer", email: "rajesh@primus.com", role: "Branch Manager", branch: "Andheri West", status: "Active", lastLogin: "Today 8:50 AM" },
  { id: "U-003", name: "Priya Nair", email: "priya@primus.com", role: "Service Advisor", branch: "Mumbai Central", status: "Active", lastLogin: "Today 9:01 AM" },
  { id: "U-004", name: "Suresh Patil", email: "suresh@primus.com", role: "Technician", branch: "Bandra East", status: "Active", lastLogin: "Today 8:30 AM" },
  { id: "U-005", name: "Anita Desai", email: "anita@primus.com", role: "Finance User", branch: "Mumbai Central", status: "Active", lastLogin: "Yesterday" },
  { id: "U-006", name: "Kiran Kulkarni", email: "kiran@primus.com", role: "Technician", branch: "Andheri West", status: "Inactive", lastLogin: "3 days ago" },
  { id: "U-007", name: "Deepak Mehta", email: "deepak@primus.com", role: "Vendor User", branch: "Bandra East", status: "Active", lastLogin: "Today 7:45 AM" },
  { id: "U-008", name: "Kavitha Rao", email: "kavitha@primus.com", role: "Branch Manager", branch: "Bandra East", status: "Active", lastLogin: "Today 9:20 AM" },
];

const roleColors: Record<string, string> = {
  "Super Admin": T.danger, "Tenant Admin": T.purple, "Branch Manager": T.primary,
  "Service Advisor": T.success, "Technician": T.warning, "Finance User": T.amber, "Vendor User": T.muted,
};

function UserManagement() {
  const [search, setSearch] = useState("");
  const filtered = USERS.filter((u) => !search || u.name.toLowerCase().includes(search.toLowerCase()));
  return (
    <PageBg>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
        <div style={{ fontSize: 22, fontWeight: 700, color: T.text }}>User Management</div>
        <div style={{ display: "flex", gap: 10 }}>
          <div style={{ position: "relative" }}>
            <Search size={14} color={T.muted} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)" }} />
            <input
              value={search} onChange={(e) => setSearch(e.target.value)}
              placeholder="Search users..."
              style={{
                background: T.surface, border: `1px solid ${T.border}`, color: T.text,
                borderRadius: 8, padding: "8px 12px 8px 30px", fontSize: 13, outline: "none",
              }}
            />
          </div>
          <Btn label="+ Invite User" />
        </div>
      </div>
      <Card>
        <TableHeader cols={["Name", "Email", "Role", "Branch", "Status", "Last Login", "Actions"]} />
        {filtered.map((u) => (
          <TableRow key={u.id} cols={7} cells={[
            <span style={{ fontWeight: 600 }}>{u.name}</span>,
            <span style={{ color: T.muted }}>{u.email}</span>,
            <Badge label={u.role} color={roleColors[u.role] || T.muted} />,
            <span style={{ color: T.muted }}>{u.branch}</span>,
            <span><StatusDot active={u.status === "Active"} />{u.status}</span>,
            <span style={{ color: T.muted }}>{u.lastLogin}</span>,
            <div style={{ display: "flex", gap: 8 }}>
              <button style={{ background: "none", border: "none", color: T.primary, cursor: "pointer" }}><Edit2 size={14} /></button>
              <button style={{ background: "none", border: "none", color: T.danger, cursor: "pointer" }}><Trash2 size={14} /></button>
            </div>,
          ]} />
        ))}
      </Card>
    </PageBg>
  );
}

// ─── Role Management ──────────────────────────────────────────────────────────
const ROLES = [
  { name: "Super Admin", users: 1, perms: 120, created: "Jan 1, 2024", status: "Active" },
  { name: "Tenant Admin", users: 2, perms: 98, created: "Jan 1, 2024", status: "Active" },
  { name: "Branch Manager", users: 4, perms: 72, created: "Jan 1, 2024", status: "Active" },
  { name: "Service Advisor", users: 12, perms: 45, created: "Jan 1, 2024", status: "Active" },
  { name: "Technician", users: 18, perms: 28, created: "Jan 1, 2024", status: "Active" },
  { name: "Finance User", users: 5, perms: 38, created: "Feb 3, 2024", status: "Active" },
  { name: "Vendor User", users: 5, perms: 14, created: "Mar 15, 2024", status: "Active" },
];

function RoleManagement() {
  return (
    <PageBg>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
        <div style={{ fontSize: 22, fontWeight: 700, color: T.text }}>Role Management</div>
        <Btn label="+ Create Role" />
      </div>
      <Card>
        <TableHeader cols={["Role Name", "Users", "Permissions", "Created", "Status", "Actions"]} />
        {ROLES.map((r) => (
          <TableRow key={r.name} cols={6} cells={[
            <span style={{ fontWeight: 600, color: roleColors[r.name] || T.text }}>{r.name}</span>,
            <span>{r.users}</span>,
            <span>{r.perms}</span>,
            <span style={{ color: T.muted }}>{r.created}</span>,
            <Badge label={r.status} color={T.success} />,
            <div style={{ display: "flex", gap: 8 }}>
              <button style={{ background: "none", border: "none", color: T.primary, cursor: "pointer" }}><Edit2 size={14} /></button>
              <button style={{ background: "none", border: "none", color: T.danger, cursor: "pointer" }}><Trash2 size={14} /></button>
            </div>,
          ]} />
        ))}
      </Card>
    </PageBg>
  );
}

// ─── Permission Matrix ────────────────────────────────────────────────────────
type PermLevel = "Hidden" | "Read" | "Full" | "Disabled";
const PERM_SCREENS = ["Dashboard", "Customer Master", "Job Cards", "Estimates", "Billing", "Vendors", "Finance", "Reports"];
const PERM_ROLES = ["Super Admin", "Tenant Admin", "Branch Manager", "Service Advisor", "Technician", "Finance User", "Vendor User"];
const PERM_DEFAULTS: PermLevel[][] = [
  ["Full","Full","Full","Read","Read","Read","Read"],
  ["Full","Full","Full","Full","Read","Read","Disabled"],
  ["Full","Full","Full","Full","Full","Disabled","Disabled"],
  ["Full","Full","Full","Full","Disabled","Disabled","Disabled"],
  ["Read","Read","Full","Read","Disabled","Disabled","Disabled"],
  ["Full","Full","Full","Disabled","Disabled","Disabled","Disabled"],
  ["Full","Full","Read","Disabled","Full","Full","Disabled"],
  ["Full","Full","Read","Disabled","Full","Full","Hidden"],
];

const permColor: Record<PermLevel, string> = {
  Hidden: T.dim, Disabled: T.warning, Read: T.primary, Full: T.success,
};

function PermissionMatrix() {
  const [matrix, setMatrix] = useState<PermLevel[][]>(PERM_DEFAULTS.map((r) => [...r]));
  const cycle: PermLevel[] = ["Hidden", "Disabled", "Read", "Full"];

  function toggle(r: number, c: number) {
    setMatrix((prev) => {
      const next = prev.map((row) => [...row]);
      const cur = next[r][c];
      const idx = cycle.indexOf(cur);
      next[r][c] = cycle[(idx + 1) % cycle.length];
      return next;
    });
  }

  return (
    <PageBg>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
        <div style={{ fontSize: 22, fontWeight: 700, color: T.text }}>Permission Matrix</div>
        <div style={{ display: "flex", gap: 8 }}>
          <Btn label="Reset" variant="ghost" onClick={() => setMatrix(PERM_DEFAULTS.map((r) => [...r]))} />
          <Btn label="Save Changes" />
        </div>
      </div>
      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        {(["Hidden","Disabled","Read","Full"] as PermLevel[]).map((p) => (
          <span key={p} style={{ fontSize: 11, color: permColor[p], background: `${permColor[p]}18`, padding: "2px 8px", borderRadius: 4 }}>{p}</span>
        ))}
        <span style={{ fontSize: 11, color: T.muted, marginLeft: 8 }}>Click chips to cycle levels</span>
      </div>
      <Card style={{ overflowX: "auto" }}>
        <div style={{ minWidth: 720 }}>
          <div style={{ display: "grid", gridTemplateColumns: `160px repeat(${PERM_ROLES.length}, 1fr)`, padding: "10px 16px", borderBottom: `1px solid ${T.border}` }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: T.muted, textTransform: "uppercase" }}>Screen</span>
            {PERM_ROLES.map((role) => (
              <span key={role} style={{ fontSize: 10, fontWeight: 700, color: T.muted, textTransform: "uppercase", letterSpacing: "0.05em" }}>{role.split(" ")[0]}</span>
            ))}
          </div>
          {PERM_SCREENS.map((screen, ri) => (
            <div key={screen} style={{ display: "grid", gridTemplateColumns: `160px repeat(${PERM_ROLES.length}, 1fr)`, padding: "10px 16px", borderBottom: `1px solid ${T.border}`, alignItems: "center" }}>
              <span style={{ fontSize: 13, color: T.text, fontWeight: 500 }}>{screen}</span>
              {PERM_ROLES.map((_, ci) => (
                <button key={ci} onClick={() => toggle(ri, ci)} style={{
                  background: `${permColor[matrix[ri][ci]]}18`,
                  border: `1px solid ${permColor[matrix[ri][ci]]}44`,
                  color: permColor[matrix[ri][ci]],
                  borderRadius: 5, padding: "3px 8px", fontSize: 10, cursor: "pointer", fontWeight: 600,
                }}>
                  {matrix[ri][ci]}
                </button>
              ))}
            </div>
          ))}
        </div>
      </Card>
    </PageBg>
  );
}

// ─── Template Manager ─────────────────────────────────────────────────────────
const TEMPLATES = [
  { name: "Job Card Created", type: "WhatsApp", status: "Active", modified: "Today" },
  { name: "Vehicle Ready for Pickup", type: "WhatsApp", status: "Active", modified: "Yesterday" },
  { name: "Appointment Reminder", type: "SMS", status: "Pending Approval", modified: "2 days ago" },
  { name: "Invoice Generated", type: "Email", status: "Active", modified: "1 week ago" },
  { name: "Follow-up Service Due", type: "SMS", status: "Active", modified: "2 weeks ago" },
  { name: "Estimate Approval Request", type: "WhatsApp", status: "Draft", modified: "3 days ago" },
];

const typeColor: Record<string, string> = { WhatsApp: T.success, SMS: T.primary, Email: T.purple };
const tmplStatusColor: Record<string, string> = { Active: T.success, "Pending Approval": T.warning, Draft: T.muted };

function TemplateManager() {
  return (
    <PageBg>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
        <div style={{ fontSize: 22, fontWeight: 700, color: T.text }}>Template Manager</div>
        <Btn label="+ Create Template" />
      </div>
      <Card>
        <TableHeader cols={["Template Name", "Type", "Status", "Last Modified", "Actions"]} />
        {TEMPLATES.map((t) => (
          <TableRow key={t.name} cols={5} cells={[
            <span style={{ fontWeight: 600 }}>{t.name}</span>,
            <Badge label={t.type} color={typeColor[t.type]} />,
            <Badge label={t.status} color={tmplStatusColor[t.status]} />,
            <span style={{ color: T.muted }}>{t.modified}</span>,
            <div style={{ display: "flex", gap: 8 }}>
              <button style={{ background: "none", border: "none", color: T.primary, cursor: "pointer", fontSize: 12 }}>Preview</button>
              <button style={{ background: "none", border: "none", color: T.muted, cursor: "pointer" }}><Edit2 size={13} /></button>
              <button style={{ background: "none", border: "none", color: T.danger, cursor: "pointer" }}><Trash2 size={13} /></button>
            </div>,
          ]} />
        ))}
      </Card>
    </PageBg>
  );
}

// ─── Branding Config ──────────────────────────────────────────────────────────
function BrandingConfig() {
  const [primary, setPrimary] = useState("#00E5FF");
  const [accent, setAccent] = useState("#7C3AED");
  const [textCol, setTextCol] = useState("#F9FAFB");

  return (
    <PageBg>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
        <div style={{ fontSize: 22, fontWeight: 700, color: T.text }}>Branding Configuration</div>
        <Btn label="Save Branding" />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Logo Upload */}
          <Card style={{ padding: 20 }}>
            <SecHeader label="Logo" />
            <div style={{
              border: `2px dashed ${T.border}`, borderRadius: 12, padding: 32,
              display: "flex", flexDirection: "column", alignItems: "center", gap: 12,
              cursor: "pointer",
            }}>
              <Globe size={32} color={T.muted} />
              <div style={{ fontSize: 13, color: T.muted }}>Drop logo here or click to upload</div>
              <div style={{ fontSize: 11, color: T.dim }}>SVG, PNG or WEBP — max 2 MB</div>
              <button style={{ background: `${T.primary}18`, border: `1px solid ${T.borderActive}`, color: T.primary, borderRadius: 6, padding: "6px 16px", fontSize: 12, cursor: "pointer" }}>
                Browse File
              </button>
            </div>
          </Card>

          {/* Colors */}
          <Card style={{ padding: 20 }}>
            <SecHeader label="Brand Colors" />
            {[
              { label: "Primary Color", val: primary, set: setPrimary },
              { label: "Accent Color", val: accent, set: setAccent },
              { label: "Text Color", val: textCol, set: setTextCol },
            ].map((c) => (
              <div key={c.label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                <span style={{ fontSize: 13, color: T.text }}>{c.label}</span>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 28, height: 28, borderRadius: 6, background: c.val, border: `1px solid ${T.border}` }} />
                  <input type="color" value={c.val} onChange={(e) => c.set(e.target.value)}
                    style={{ background: "none", border: "none", cursor: "pointer", width: 32, height: 28 }} />
                  <span style={{ fontSize: 12, color: T.muted, fontFamily: "monospace" }}>{c.val}</span>
                </div>
              </div>
            ))}
          </Card>

          {/* Font */}
          <Card style={{ padding: 20 }}>
            <SecHeader label="Typography" />
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontSize: 13, color: T.text }}>Primary Font</span>
              <select style={{ background: T.surface, border: `1px solid ${T.border}`, color: T.text, borderRadius: 8, padding: "6px 12px", fontSize: 13 }}>
                <option>Inter</option>
                <option>Roboto</option>
                <option>Poppins</option>
              </select>
            </div>
          </Card>
        </div>

        {/* Preview */}
        <Card style={{ padding: 20 }}>
          <SecHeader label="Preview" />
          <div style={{ background: T.bg, borderRadius: 12, padding: 24, border: `1px solid ${T.border}` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
              <div style={{ width: 40, height: 40, borderRadius: 8, background: primary, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 800, color: "#000" }}>P</div>
              <div>
                <div style={{ fontSize: 16, fontWeight: 700, color: textCol }}>Primus Motors</div>
                <div style={{ fontSize: 11, color: T.muted }}>Authorized Service Center</div>
              </div>
            </div>
            <button style={{ background: primary, color: "#000", borderRadius: 8, padding: "8px 20px", fontSize: 13, fontWeight: 600, border: "none", cursor: "pointer", marginBottom: 12 }}>
              Primary Button
            </button>
            <div style={{ fontSize: 13, color: textCol, marginBottom: 8 }}>Sample notification text</div>
            <div style={{ height: 3, background: accent, borderRadius: 2 }} />
          </div>
        </Card>
      </div>
    </PageBg>
  );
}

// ─── WhatsApp Config ──────────────────────────────────────────────────────────
function WhatsAppConfig() {
  const [testPhone, setTestPhone] = useState("");
  return (
    <PageBg>
      <div style={{ fontSize: 22, fontWeight: 700, color: T.text, marginBottom: 20 }}>WhatsApp Configuration</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <Card style={{ padding: 20 }}>
            <SecHeader label="Connection Status" />
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <CheckCircle size={16} color={T.success} />
              <Badge label="Connected" color={T.success} />
            </div>
            <div style={{ display: "grid", gap: 12 }}>
              {[
                { label: "Phone Number", value: "+91 98765 43210" },
                { label: "Business Name", value: "Primus Motors" },
                { label: "WABA ID", value: "1234567890123456" },
                { label: "Verified", value: "Yes — Meta Business" },
              ].map((f) => (
                <div key={f.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 12, color: T.muted }}>{f.label}</span>
                  <span style={{ fontSize: 13, color: T.text, fontFamily: f.label === "Phone Number" || f.label === "WABA ID" ? "monospace" : "inherit" }}>{f.value}</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 16 }}>
              <Btn label="Disconnect" variant="danger" />
            </div>
          </Card>

          <Card style={{ padding: 20 }}>
            <SecHeader label="Flow Configuration" />
            <div style={{ marginBottom: 12 }}>
              <label style={{ fontSize: 12, color: T.muted, display: "block", marginBottom: 6 }}>Default Notification Template</label>
              <select style={{ width: "100%", background: T.surface, border: `1px solid ${T.border}`, color: T.text, borderRadius: 8, padding: "8px 12px", fontSize: 13 }}>
                <option>Job Card Created</option>
                <option>Vehicle Ready for Pickup</option>
                <option>Appointment Reminder</option>
              </select>
            </div>
            <Card style={{ padding: 12 }}>
              <div style={{ fontSize: 11, color: T.muted, marginBottom: 6 }}>Message Preview</div>
              <div style={{ fontSize: 12, color: T.text, lineHeight: 1.6 }}>
                Hi [Customer Name], your vehicle [Reg No] has been booked for service at Primus Motors, Mumbai Central. Job Card: [JC-XXXX]. Track status via link.
              </div>
            </Card>
          </Card>
        </div>

        <Card style={{ padding: 20 }}>
          <SecHeader label="Test Send" />
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 12, color: T.muted, display: "block", marginBottom: 6 }}>Phone Number</label>
            <input
              value={testPhone} onChange={(e) => setTestPhone(e.target.value)}
              placeholder="+91 XXXXX XXXXX"
              style={{ width: "100%", background: T.surface, border: `1px solid ${T.border}`, color: T.text, borderRadius: 8, padding: "8px 12px", fontSize: 13, outline: "none", boxSizing: "border-box" }}
            />
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 12, color: T.muted, display: "block", marginBottom: 6 }}>Template</label>
            <select style={{ width: "100%", background: T.surface, border: `1px solid ${T.border}`, color: T.text, borderRadius: 8, padding: "8px 12px", fontSize: 13 }}>
              <option>Job Card Created</option>
              <option>Vehicle Ready</option>
            </select>
          </div>
          <Btn label="Send Test Message" icon={<Phone size={14} />} />
          <div style={{ marginTop: 20, padding: 12, background: `${T.success}0d`, border: `1px solid ${T.success}33`, borderRadius: 8 }}>
            <div style={{ fontSize: 11, color: T.success, fontWeight: 600, marginBottom: 4 }}>Last Test — Today 8:44 AM</div>
            <div style={{ fontSize: 12, color: T.muted }}>Delivered to +91 98765 00001 — Status: Read</div>
          </div>
        </Card>
      </div>
    </PageBg>
  );
}

// ─── System Settings ──────────────────────────────────────────────────────────
function SystemSettings() {
  const fields = [
    { label: "Timezone", value: "Asia/Kolkata (IST)", options: ["Asia/Kolkata (IST)", "UTC", "Asia/Dubai"] },
    { label: "Currency", value: "INR — Indian Rupee", options: ["INR — Indian Rupee", "USD — US Dollar", "AED — UAE Dirham"] },
    { label: "Fiscal Year Start", value: "April 1", options: ["April 1", "January 1", "July 1"] },
    { label: "Date Format", value: "DD/MM/YYYY", options: ["DD/MM/YYYY", "MM/DD/YYYY", "YYYY-MM-DD"] },
    { label: "Language", value: "English (IN)", options: ["English (IN)", "Hindi", "Marathi"] },
    { label: "Tax Regime", value: "GST", options: ["GST", "VAT", "Non-Taxable"] },
  ];

  return (
    <PageBg>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
        <div>
          <div style={{ fontSize: 22, fontWeight: 700, color: T.text }}>System Settings</div>
          <div style={{ fontSize: 11, color: T.muted, marginTop: 2 }}>Last saved: Today at 9:00 AM by Meena Sharma</div>
        </div>
        <Btn label="Save Settings" />
      </div>
      <Card style={{ padding: 24 }}>
        <SecHeader label="Regional & Locale" />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          {fields.map((f) => (
            <div key={f.label}>
              <label style={{ fontSize: 12, color: T.muted, display: "block", marginBottom: 6 }}>{f.label}</label>
              <select defaultValue={f.value} style={{ width: "100%", background: T.surface, border: `1px solid ${T.border}`, color: T.text, borderRadius: 8, padding: "10px 12px", fontSize: 13, outline: "none" }}>
                {f.options.map((o) => <option key={o}>{o}</option>)}
              </select>
            </div>
          ))}
        </div>
      </Card>
    </PageBg>
  );
}

// ─── Super Admin Hub ──────────────────────────────────────────────────────────
function SuperAdminHub({ navigate }: { navigate: (s: AdminSection) => void }) {
  const widgets: { icon: React.ReactNode; title: string; desc: string; stat: string; section: AdminSection }[] = [
    { icon: <Building2 size={20} />, title: "Tenants", desc: "Manage all tenant accounts", stat: "148 tenants", section: "superadmin.tenants" },
    { icon: <CreditCard size={20} />, title: "Subscriptions", desc: "Plans, billing & renewals", stat: "₹24.6L MRR", section: "superadmin.subscriptions" },
    { icon: <Flag size={20} />, title: "Feature Flags", desc: "Toggle platform features per tenant", stat: "8 flags", section: "superadmin.feature-flags" },
    { icon: <Activity size={20} />, title: "Monitoring", desc: "Latency, errors, queue depth", stat: "P99 124ms", section: "superadmin.monitoring" },
    { icon: <BarChart3 size={20} />, title: "API Usage", desc: "Per-tenant API consumption", stat: "1.2M calls/mo", section: "superadmin.api-usage" },
    { icon: <AlertCircle size={20} />, title: "Error Logs", desc: "Platform-wide error tracking", stat: "3 open", section: "superadmin.errors" },
  ];

  const activities = [
    { time: "08:30 AM", msg: "New tenant 'AutoFix Pune' onboarded on Growth plan", user: "System" },
    { time: "07:55 AM", msg: "API rate limit breach — Tenant ID 10042", user: "System Alert" },
    { time: "Yesterday", msg: "Feature flag 'Analytics Pro' enabled for 12 tenants", user: "Super Admin" },
    { time: "Yesterday", msg: "Subscription upgrade: City Cars Mumbai → Enterprise", user: "Billing" },
    { time: "2 days ago", msg: "Scheduled maintenance completed successfully", user: "Ops" },
  ];

  return (
    <PageBg>
      {/* SA Banner */}
      <div style={{
        background: `${T.danger}22`, border: `1px solid ${T.danger}55`, borderRadius: 10,
        padding: "10px 18px", marginBottom: 20, display: "flex", alignItems: "center", gap: 10,
      }}>
        <Shield size={16} color={T.danger} />
        <span style={{ fontSize: 12, fontWeight: 700, color: T.danger, letterSpacing: "0.1em" }}>SUPER ADMIN — Elevated Access Active. All actions are logged.</span>
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
        <div>
          <div style={{ fontSize: 22, fontWeight: 700, color: T.text }}>Super Admin</div>
          <div style={{ fontSize: 12, color: T.muted }}>Platform Control Center</div>
        </div>
        <Btn label="+ Create Tenant" />
      </div>

      <SecHeader label="AI Platform Insights" />
      <div style={{ display: "flex", gap: 12, marginBottom: 24, flexWrap: "wrap" }}>
        <AICard title="Tenant Risk" confidence={78} prediction="4 tenants showing payment delay signals" recommendation="Proactively contact before next renewal cycle" action="View At Risk" />
        <AICard title="Platform Usage" confidence={94} prediction="Usage up 18% MoM — infrastructure scaling needed in 6 weeks" recommendation="Pre-provision additional capacity" action="Scale Plan" />
        <AICard title="Growth Signals" confidence={88} prediction="3 Starter tenants likely to upgrade within 30 days" recommendation="Trigger upgrade nudge campaign" action="Run Campaign" />
        <AICard title="API Health" confidence={97} prediction="API response time stable at P99 124ms" recommendation="Optimize Tenant 10042 query pattern" action="Investigate" />
      </div>

      <SecHeader label="Platform Overview" />
      <div style={{ display: "flex", gap: 12, marginBottom: 24, flexWrap: "wrap" }}>
        <KpiCard label="Total Tenants" value="148" trend="+6 this month" trendUp />
        <KpiCard label="MRR" value="₹24.6L" trend="+12% MoM" trendUp />
        <KpiCard label="Uptime" value="99.97%" trend="+0.01% vs last month" trendUp />
        <KpiCard label="Error Rate" value="0.03%" trend="-0.01% vs last month" trendUp />
      </div>

      <SecHeader label="Platform Management" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: 12, marginBottom: 24 }}>
        {widgets.map((w) => (
          <Card key={w.section} style={{ padding: 18, cursor: "pointer" }} onClick={() => navigate(w.section)}>
            <div style={{
              width: 40, height: 40, borderRadius: 10,
              background: `linear-gradient(135deg,${T.danger}22,${T.purple}22)`,
              display: "flex", alignItems: "center", justifyContent: "center", color: T.danger, marginBottom: 12,
            }}>
              {w.icon}
            </div>
            <div style={{ fontSize: 14, fontWeight: 600, color: T.text, marginBottom: 4 }}>{w.title}</div>
            <div style={{ fontSize: 12, color: T.muted, marginBottom: 10 }}>{w.desc}</div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontSize: 12, color: T.danger }}>{w.stat}</span>
              <ChevronRight size={14} color={T.muted} />
            </div>
          </Card>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <Card style={{ padding: 20 }}>
          <SecHeader label="Platform Activity" />
          {activities.map((a, i) => (
            <div key={i} style={{ display: "flex", gap: 12, paddingBottom: 12, marginBottom: 12, borderBottom: i < activities.length - 1 ? `1px solid ${T.border}` : "none" }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: T.danger, marginTop: 5, flexShrink: 0 }} />
              <div>
                <div style={{ fontSize: 12, color: T.text }}>{a.msg}</div>
                <div style={{ fontSize: 11, color: T.muted, marginTop: 2 }}>{a.time} · {a.user}</div>
              </div>
            </div>
          ))}
        </Card>
        <Card style={{ padding: 20 }}>
          <SecHeader label="Alerts" />
          <AlertItem type="danger" msg="Tenant 10042 exceeded API rate limit 3 times in past 24 hours — auto-throttle applied." />
          <AlertItem type="warning" msg="4 tenants have overdue invoices totaling ₹1.2L — escalation required." />
          <AlertItem type="info" msg="Scheduled DB maintenance window: Sunday 2:00–4:00 AM IST. Notify tenants." />
        </Card>
      </div>
    </PageBg>
  );
}

// ─── Tenant Management ────────────────────────────────────────────────────────
const TENANTS = [
  { id: "T-001", name: "Primus Motors", plan: "Enterprise", status: "Active", branches: 3, mrr: "₹48,000", created: "Jan 2024" },
  { id: "T-002", name: "City Cars Mumbai", plan: "Growth", status: "Active", branches: 2, mrr: "₹18,000", created: "Feb 2024" },
  { id: "T-003", name: "AutoFix Pune", plan: "Starter", status: "Active", branches: 1, mrr: "₹6,000", created: "May 2024" },
  { id: "T-004", name: "SpeedWheels Nashik", plan: "Growth", status: "Active", branches: 2, mrr: "₹18,000", created: "Mar 2024" },
  { id: "T-005", name: "Garage King Nagpur", plan: "Starter", status: "Suspended", branches: 1, mrr: "₹0", created: "Apr 2024" },
  { id: "T-006", name: "MotoServ Thane", plan: "Enterprise", status: "Active", branches: 4, mrr: "₹48,000", created: "Jan 2024" },
];

const planColor: Record<string, string> = { Starter: T.muted, Growth: T.primary, Enterprise: T.purple };

function TenantManagement() {
  const [search, setSearch] = useState("");
  const filtered = TENANTS.filter((t) => !search || t.name.toLowerCase().includes(search.toLowerCase()));
  return (
    <PageBg>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
        <div style={{ fontSize: 22, fontWeight: 700, color: T.text }}>Tenant Management</div>
        <div style={{ display: "flex", gap: 10 }}>
          <div style={{ position: "relative" }}>
            <Search size={14} color={T.muted} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)" }} />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search tenants..."
              style={{ background: T.surface, border: `1px solid ${T.border}`, color: T.text, borderRadius: 8, padding: "8px 12px 8px 30px", fontSize: 13, outline: "none" }} />
          </div>
          <Btn label="+ Create Tenant" />
        </div>
      </div>
      <Card>
        <TableHeader cols={["Tenant ID", "Name", "Plan", "Status", "Branches", "MRR", "Created", "Actions"]} />
        {filtered.map((t) => (
          <TableRow key={t.id} cols={8} cells={[
            <span style={{ fontFamily: "monospace", fontSize: 12, color: T.muted }}>{t.id}</span>,
            <span style={{ fontWeight: 600 }}>{t.name}</span>,
            <Badge label={t.plan} color={planColor[t.plan]} />,
            <span><StatusDot active={t.status === "Active"} />{t.status}</span>,
            <span>{t.branches}</span>,
            <span style={{ fontFamily: "monospace" }}>{t.mrr}</span>,
            <span style={{ color: T.muted }}>{t.created}</span>,
            <div style={{ display: "flex", gap: 8 }}>
              <button style={{ background: "none", border: "none", color: T.warning, cursor: "pointer", fontSize: 11 }}>Suspend</button>
              <button style={{ background: "none", border: "none", color: T.primary, cursor: "pointer" }}><Edit2 size={13} /></button>
            </div>,
          ]} />
        ))}
      </Card>
    </PageBg>
  );
}

// ─── Subscription Management ──────────────────────────────────────────────────
const SUBS = [
  { tenant: "Primus Motors", plan: "Enterprise", status: "Active", mrr: "₹48,000", renewal: "Jan 1, 2025" },
  { tenant: "City Cars Mumbai", plan: "Growth", status: "Active", mrr: "₹18,000", renewal: "Feb 15, 2025" },
  { tenant: "AutoFix Pune", plan: "Starter", status: "Active", mrr: "₹6,000", renewal: "May 3, 2025" },
  { tenant: "SpeedWheels Nashik", plan: "Growth", status: "Past Due", mrr: "₹18,000", renewal: "Mar 28, 2024" },
  { tenant: "Garage King Nagpur", plan: "Starter", status: "Suspended", mrr: "₹0", renewal: "—" },
  { tenant: "MotoServ Thane", plan: "Enterprise", status: "Active", mrr: "₹48,000", renewal: "Jan 1, 2025" },
];

const subStatusColor: Record<string, string> = { Active: T.success, "Past Due": T.warning, Suspended: T.danger };

function SubscriptionManagement() {
  return (
    <PageBg>
      <div style={{ fontSize: 22, fontWeight: 700, color: T.text, marginBottom: 20 }}>Subscription Management</div>
      <Card>
        <TableHeader cols={["Tenant", "Plan", "Status", "MRR", "Next Renewal", "Actions"]} />
        {SUBS.map((s) => (
          <TableRow key={s.tenant} cols={6} cells={[
            <span style={{ fontWeight: 600 }}>{s.tenant}</span>,
            <Badge label={s.plan} color={planColor[s.plan]} />,
            <Badge label={s.status} color={subStatusColor[s.status]} />,
            <span style={{ fontFamily: "monospace" }}>{s.mrr}</span>,
            <span style={{ color: T.muted }}>{s.renewal}</span>,
            <div style={{ display: "flex", gap: 8 }}>
              <button style={{ background: "none", border: "none", color: T.success, cursor: "pointer", fontSize: 11 }}>Upgrade</button>
              <button style={{ background: "none", border: "none", color: T.primary, cursor: "pointer" }}><Edit2 size={13} /></button>
            </div>,
          ]} />
        ))}
      </Card>
    </PageBg>
  );
}

// ─── Feature Flags ────────────────────────────────────────────────────────────
const FLAGS = [
  { name: "AI Insights", desc: "Job card and revenue AI analysis", enabled: 142, modified: "2 days ago", on: true },
  { name: "WhatsApp Integration", desc: "WABA messaging for job updates", enabled: 138, modified: "1 week ago", on: true },
  { name: "Bulk Export", desc: "CSV/Excel export of reports", enabled: 90, modified: "2 weeks ago", on: true },
  { name: "Multi-Branch", desc: "Enable multi-branch operations", enabled: 56, modified: "1 week ago", on: true },
  { name: "Analytics Pro", desc: "Advanced analytics dashboards", enabled: 12, modified: "Today", on: false },
  { name: "API Access", desc: "REST API for third-party integrations", enabled: 24, modified: "3 days ago", on: true },
  { name: "Custom Branding", desc: "White-label branding per tenant", enabled: 18, modified: "1 week ago", on: false },
  { name: "Auto-Billing", desc: "Automated GST invoice generation", enabled: 104, modified: "Yesterday", on: true },
];

function FeatureFlags() {
  const [flags, setFlags] = useState(FLAGS);
  return (
    <PageBg>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
        <div style={{ fontSize: 22, fontWeight: 700, color: T.text }}>Feature Flags</div>
      </div>
      <Card>
        <TableHeader cols={["Flag Name", "Description", "Enabled Tenants", "Status", "Last Modified", "Toggle"]} />
        {flags.map((f, i) => (
          <TableRow key={f.name} cols={6} cells={[
            <span style={{ fontWeight: 600 }}>{f.name}</span>,
            <span style={{ color: T.muted, fontSize: 12 }}>{f.desc}</span>,
            <span style={{ fontFamily: "monospace" }}>{f.enabled}</span>,
            <Badge label={f.on ? "Enabled" : "Disabled"} color={f.on ? T.success : T.dim} />,
            <span style={{ color: T.muted }}>{f.modified}</span>,
            <button onClick={() => setFlags((prev) => prev.map((fl, j) => j === i ? { ...fl, on: !fl.on } : fl))}
              style={{ background: "none", border: "none", cursor: "pointer", color: f.on ? T.success : T.dim }}>
              {f.on ? <ToggleRight size={22} /> : <ToggleLeft size={22} />}
            </button>,
          ]} />
        ))}
      </Card>
    </PageBg>
  );
}

// ─── Platform Monitoring ──────────────────────────────────────────────────────
const latencyData = [
  { t: "00:00", ms: 118 }, { t: "01:00", ms: 105 }, { t: "02:00", ms: 99 },
  { t: "03:00", ms: 112 }, { t: "04:00", ms: 124 }, { t: "05:00", ms: 116 },
];

function PlatformMonitoring() {
  return (
    <PageBg>
      <div style={{ fontSize: 22, fontWeight: 700, color: T.text, marginBottom: 20 }}>Platform Monitoring</div>
      <div style={{ display: "flex", gap: 12, marginBottom: 24, flexWrap: "wrap" }}>
        <KpiCard label="P99 Latency" value="124ms" trend="+6ms vs prev hour" trendUp={false} />
        <KpiCard label="Error Rate" value="0.03%" trend="-0.01% improving" trendUp />
        <KpiCard label="Active Requests" value="847" />
        <KpiCard label="Queue Depth" value="12" trend="Within normal range" trendUp />
      </div>

      <Card style={{ padding: 20, marginBottom: 20 }}>
        <SecHeader label="P99 Latency — Last 6 Hours" />
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={latencyData}>
            <XAxis dataKey="t" tick={{ fill: T.muted, fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: T.muted, fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 8, color: T.text, fontSize: 12 }} />
            <Line key="line1" type="monotone" dataKey="ms" stroke={T.primary} strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      <Card style={{ padding: 20 }}>
        <SecHeader label="Active Alerts" />
        <AlertItem type="warning" msg="Tenant 10042 P99 latency spiked to 340ms at 04:12 AM — auto-throttle applied." />
        <AlertItem type="danger" msg="Queue depth hit 48 at 03:30 AM — resolved within 4 minutes." />
        <AlertItem type="info" msg="Database replication lag: 12ms (within acceptable threshold of 50ms)." />
      </Card>
    </PageBg>
  );
}

// ─── API Usage ────────────────────────────────────────────────────────────────
const apiChartData = [
  { month: "Jan", calls: 820000 }, { month: "Feb", calls: 940000 },
  { month: "Mar", calls: 1020000 }, { month: "Apr", calls: 980000 },
  { month: "May", calls: 1150000 }, { month: "Jun", calls: 1200000 },
];

const API_TENANTS = [
  { tenant: "Primus Motors", calls: 48200, limit: 60000, last: "Today 09:18 AM" },
  { tenant: "MotoServ Thane", calls: 52100, limit: 60000, last: "Today 09:15 AM" },
  { tenant: "City Cars Mumbai", calls: 18400, limit: 30000, last: "Today 09:10 AM" },
  { tenant: "SpeedWheels Nashik", calls: 14200, limit: 30000, last: "Today 08:55 AM" },
  { tenant: "AutoFix Pune", calls: 4100, limit: 10000, last: "Today 08:44 AM" },
];

function APIUsage() {
  return (
    <PageBg>
      <div style={{ fontSize: 22, fontWeight: 700, color: T.text, marginBottom: 20 }}>API Usage</div>
      <Card style={{ padding: 20, marginBottom: 20 }}>
        <SecHeader label="API Calls — Last 6 Months" />
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={apiChartData}>
            <XAxis dataKey="month" tick={{ fill: T.muted, fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: T.muted, fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`} />
            <Tooltip contentStyle={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 8, color: T.text, fontSize: 12 }} formatter={(v: number) => [`${(v / 1000).toFixed(0)}K calls`, "Calls"]} />
            <Area key="calls" type="monotone" dataKey="calls" stroke={T.primary} fill="transparent" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </Card>

      <Card>
        <TableHeader cols={["Tenant", "Calls This Month", "Rate Limit", "Usage %", "Last Call"]} />
        {API_TENANTS.map((t) => {
          const pct = Math.round((t.calls / t.limit) * 100);
          return (
            <TableRow key={t.tenant} cols={5} cells={[
              <span style={{ fontWeight: 600 }}>{t.tenant}</span>,
              <span style={{ fontFamily: "monospace" }}>{t.calls.toLocaleString()}</span>,
              <span style={{ fontFamily: "monospace" }}>{t.limit.toLocaleString()}</span>,
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ flex: 1, background: T.dim, borderRadius: 4, height: 6, maxWidth: 80 }}>
                  <div style={{ background: pct > 85 ? T.danger : pct > 60 ? T.warning : T.success, height: 6, borderRadius: 4, width: `${pct}%` }} />
                </div>
                <span style={{ fontSize: 12, color: pct > 85 ? T.danger : T.muted }}>{pct}%</span>
              </div>,
              <span style={{ color: T.muted, fontSize: 12 }}>{t.last}</span>,
            ]} />
          );
        })}
      </Card>
    </PageBg>
  );
}

// ─── Error Logs ───────────────────────────────────────────────────────────────
const ERRORS = [
  { ts: "09:14:22", msg: "DatabaseConnectionTimeout: pool exhausted", tenant: "Primus Motors", severity: "Error", status: "Open" },
  { ts: "08:55:10", msg: "RateLimitExceeded: tenant 10042 burst", tenant: "SpeedWheels Nashik", severity: "Warning", status: "Auto-Resolved" },
  { ts: "08:44:05", msg: "WhatsAppAPIError: 429 too many requests", tenant: "City Cars Mumbai", severity: "Warning", status: "Open" },
  { ts: "07:30:18", msg: "PaymentGatewayTimeout: stripe webhook delayed", tenant: "MotoServ Thane", severity: "Error", status: "Resolved" },
  { ts: "06:12:44", msg: "AuthTokenExpiry: refresh loop detected", tenant: "AutoFix Pune", severity: "Info", status: "Resolved" },
  { ts: "Yesterday", msg: "BulkExportOOM: memory limit hit during export", tenant: "Primus Motors", severity: "Error", status: "Resolved" },
  { ts: "Yesterday", msg: "SchedulerMissedRun: invoice cron skipped slot", tenant: "System", severity: "Warning", status: "Resolved" },
  { ts: "2 days ago", msg: "SSLCertWarning: cert expires in 14 days", tenant: "System", severity: "Info", status: "Open" },
];

const sevColor: Record<string, string> = { Error: T.danger, Warning: T.warning, Info: T.primary };
const errStatusColor: Record<string, string> = { Open: T.danger, Resolved: T.success, "Auto-Resolved": T.warning };

function ErrorLogs() {
  const [sev, setSev] = useState("All");
  const filtered = sev === "All" ? ERRORS : ERRORS.filter((e) => e.severity === sev);
  return (
    <PageBg>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
        <div style={{ fontSize: 22, fontWeight: 700, color: T.text }}>Error Logs</div>
        <div style={{ display: "flex", gap: 8 }}>
          {["All", "Error", "Warning", "Info"].map((s) => (
            <button key={s} onClick={() => setSev(s)} style={{
              background: sev === s ? `${T.primary}22` : "none",
              border: `1px solid ${sev === s ? T.primary : T.border}`,
              color: sev === s ? T.primary : T.muted,
              borderRadius: 6, padding: "5px 12px", fontSize: 12, cursor: "pointer",
            }}>{s}</button>
          ))}
        </div>
      </div>
      <Card>
        <TableHeader cols={["Timestamp", "Error Message", "Tenant", "Severity", "Status", "Action"]} />
        {filtered.map((e, i) => (
          <TableRow key={i} cols={6} cells={[
            <span style={{ fontFamily: "monospace", fontSize: 11, color: T.muted }}>{e.ts}</span>,
            <span style={{ fontSize: 12, maxWidth: 260 }}>{e.msg}</span>,
            <span style={{ color: T.muted, fontSize: 12 }}>{e.tenant}</span>,
            <Badge label={e.severity} color={sevColor[e.severity]} />,
            <Badge label={e.status} color={errStatusColor[e.status]} />,
            <button style={{ background: "none", border: `1px solid ${T.border}`, color: T.muted, borderRadius: 5, padding: "3px 10px", fontSize: 11, cursor: "pointer" }}>
              View Trace
            </button>,
          ]} />
        ))}
      </Card>
    </PageBg>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────
export function AdminSuite({ section, navigate }: { section: AdminSection; navigate: (s: AdminSection) => void }) {
  switch (section) {
    case "admin.hub": return <AdminHub navigate={navigate} />;
    case "admin.users": return <UserManagement />;
    case "admin.roles": return <RoleManagement />;
    case "admin.permissions": return <PermissionMatrix />;
    case "admin.templates": return <TemplateManager />;
    case "admin.branding": return <BrandingConfig />;
    case "admin.whatsapp": return <WhatsAppConfig />;
    case "admin.settings": return <SystemSettings />;
    case "superadmin.hub": return <SuperAdminHub navigate={navigate} />;
    case "superadmin.tenants": return <TenantManagement />;
    case "superadmin.subscriptions": return <SubscriptionManagement />;
    case "superadmin.feature-flags": return <FeatureFlags />;
    case "superadmin.monitoring": return <PlatformMonitoring />;
    case "superadmin.api-usage": return <APIUsage />;
    case "superadmin.errors": return <ErrorLogs />;
    default: return <AdminHub navigate={navigate} />;
  }
}
