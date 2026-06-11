import { useState } from "react";
import {
  LayoutDashboard, Users, Truck, DollarSign, BarChart2, Settings, Shield,
  Bell, LogOut, ChevronDown, ChevronRight, Building2, GitBranch, Calendar,
  Search, Menu, X, Wrench, Activity, Cpu,
} from "lucide-react";
import { DashboardSuite } from "./shyntraa/DashboardSuite";
import { OperationsSuite } from "./shyntraa/OperationsSuite";
import { CustomerBillingSuite } from "./shyntraa/CustomerBillingSuite";
import { VendorFinanceSuite } from "./shyntraa/VendorFinanceSuite";
import { AdminSuite } from "./shyntraa/AdminSuite";
import { SystemSuite } from "./shyntraa/SystemSuite";

// UDA v1.3 — RCM: all 64 routes
export type ShyntraRoute =
  | "dashboard.executive" | "dashboard.branch" | "dashboard.sa"
  | "dashboard.technician" | "dashboard.finance" | "dashboard.vendor" | "dashboard.superadmin"
  | "customers.hub" | "customers.master" | "customers.inquiries" | "customers.appointments"
  | "customers.inspections" | "customers.jobcards" | "customers.estimates"
  | "customers.billing" | "customers.payments" | "customers.360"
  | "operations.hub" | "operations.bays" | "operations.technicians"
  | "operations.workflow" | "operations.delivery"
  | "vendors.hub" | "vendors.master" | "vendors.requests"
  | "vendors.orders" | "vendors.goods-receipt"
  | "finance.hub" | "finance.payments" | "finance.receipts" | "finance.journal"
  | "finance.ledger" | "finance.trial-balance" | "finance.pl"
  | "finance.balance" | "finance.cashflow"
  | "reporting.hub" | "reporting.catalog" | "reporting.analytics"
  | "admin.hub" | "admin.users" | "admin.roles" | "admin.permissions"
  | "admin.templates" | "admin.branding" | "admin.whatsapp" | "admin.settings"
  | "superadmin.hub" | "superadmin.tenants" | "superadmin.subscriptions"
  | "superadmin.feature-flags" | "superadmin.monitoring"
  | "superadmin.api-usage" | "superadmin.errors"
  | "system.hub" | "system.integrations" | "system.audit"
  | "system.api" | "system.health";

interface NavChild { label: string; route: ShyntraRoute }
interface NavItem {
  key: string; label: string; icon: React.ReactNode;
  route?: ShyntraRoute; children?: NavChild[];
}

// UDA v1.3 — NAR App-C: 9 top-level modules, 43 sub-items
const NAV: NavItem[] = [
  {
    key: "dashboard", label: "Dashboard", icon: <LayoutDashboard size={15} />,
    children: [
      { label: "Executive", route: "dashboard.executive" },
      { label: "Branch Manager", route: "dashboard.branch" },
      { label: "Service Advisor", route: "dashboard.sa" },
      { label: "Technician", route: "dashboard.technician" },
      { label: "Finance", route: "dashboard.finance" },
      { label: "Vendor", route: "dashboard.vendor" },
      { label: "Super Admin", route: "dashboard.superadmin" },
    ],
  },
  {
    key: "customers", label: "Customer Management", icon: <Users size={15} />,
    children: [
      { label: "Customer Hub", route: "customers.hub" },
      { label: "Customer Master", route: "customers.master" },
      { label: "Inquiries", route: "customers.inquiries" },
      { label: "Appointments", route: "customers.appointments" },
      { label: "Inspections", route: "customers.inspections" },
      { label: "Job Cards", route: "customers.jobcards" },
      { label: "Estimates", route: "customers.estimates" },
      { label: "Billing", route: "customers.billing" },
      { label: "Payments", route: "customers.payments" },
      { label: "Customer 360", route: "customers.360" },
    ],
  },
  {
    key: "operations", label: "Operations", icon: <Activity size={15} />,
    children: [
      { label: "Operations Hub", route: "operations.hub" },
      { label: "Bays", route: "operations.bays" },
      { label: "Technicians", route: "operations.technicians" },
      { label: "Workflow Monitor", route: "operations.workflow" },
      { label: "Delivery", route: "operations.delivery" },
    ],
  },
  {
    key: "vendors", label: "Vendor Management", icon: <Truck size={15} />,
    children: [
      { label: "Vendor Hub", route: "vendors.hub" },
      { label: "Vendor Master", route: "vendors.master" },
      { label: "Purchase Requests", route: "vendors.requests" },
      { label: "Purchase Orders", route: "vendors.orders" },
      { label: "Goods Receipt", route: "vendors.goods-receipt" },
    ],
  },
  {
    key: "finance", label: "Financial Management", icon: <DollarSign size={15} />,
    children: [
      { label: "Finance Hub", route: "finance.hub" },
      { label: "Payments", route: "finance.payments" },
      { label: "Receipts", route: "finance.receipts" },
      { label: "Journals", route: "finance.journal" },
      { label: "Ledger", route: "finance.ledger" },
      { label: "Trial Balance", route: "finance.trial-balance" },
      { label: "Profit & Loss", route: "finance.pl" },
      { label: "Balance Sheet", route: "finance.balance" },
      { label: "Cash Flow", route: "finance.cashflow" },
    ],
  },
  {
    key: "reporting", label: "Reporting", icon: <BarChart2 size={15} />,
    children: [
      { label: "Reporting Hub", route: "reporting.hub" },
      { label: "Standard Reports", route: "reporting.catalog" },
      { label: "Analytics", route: "reporting.analytics" },
    ],
  },
  {
    key: "admin", label: "Admin", icon: <Settings size={15} />,
    children: [
      { label: "Admin Hub", route: "admin.hub" },
      { label: "Users", route: "admin.users" },
      { label: "Roles", route: "admin.roles" },
      { label: "Permissions", route: "admin.permissions" },
      { label: "Templates", route: "admin.templates" },
      { label: "Branding", route: "admin.branding" },
      { label: "WhatsApp", route: "admin.whatsapp" },
      { label: "System Settings", route: "admin.settings" },
    ],
  },
  {
    key: "superadmin", label: "Super Admin", icon: <Shield size={15} />,
    children: [
      { label: "Super Admin Hub", route: "superadmin.hub" },
      { label: "Tenants", route: "superadmin.tenants" },
      { label: "Subscriptions", route: "superadmin.subscriptions" },
      { label: "Feature Flags", route: "superadmin.feature-flags" },
      { label: "Monitoring", route: "superadmin.monitoring" },
      { label: "API Usage", route: "superadmin.api-usage" },
      { label: "Error Logs", route: "superadmin.errors" },
    ],
  },
  {
    key: "system", label: "System", icon: <Cpu size={15} />,
    children: [
      { label: "System Hub", route: "system.hub" },
      { label: "Integrations", route: "system.integrations" },
      { label: "Audit Logs", route: "system.audit" },
      { label: "API Management", route: "system.api" },
      { label: "Platform Health", route: "system.health" },
    ],
  },
];

const TENANTS = ["Primus Auto Group", "SpeedCraft Workshops", "Urban Motors"];
const BRANCHES = ["Mumbai Central", "Andheri West", "Bandra East"];
const FY = ["FY 2025–26", "FY 2024–25", "FY 2023–24"];

// DTF App-D tokens
const T = {
  bg: "#0B1120", surface: "#111827", surfaceHover: "#1a2438",
  border: "rgba(255,255,255,0.08)", borderActive: "rgba(0,229,255,0.25)",
  primary: "#00E5FF", success: "#10B981", warning: "#F59E0B", danger: "#EF4444",
  text: "#F9FAFB", muted: "#9CA3AF", dim: "#374151", disabled: "#1F2937",
};

export function ShyntraaApp() {
  const [route, setRoute] = useState<ShyntraRoute>("dashboard.executive");
  const [expanded, setExpanded] = useState<Record<string, boolean>>({ dashboard: true });
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [tenant, setTenant] = useState(TENANTS[0]);
  const [branch, setBranch] = useState(BRANCHES[0]);
  const [fy, setFy] = useState(FY[0]);
  const [notifOpen, setNotifOpen] = useState(false);

  const navigate = (r: ShyntraRoute) => { setRoute(r); setNotifOpen(false); };

  const routeLabel = NAV.flatMap((n) =>
    n.children
      ? n.children.map((c) => ({ route: c.route, label: `${n.label} › ${c.label}` }))
      : [{ route: n.route!, label: n.label }]
  ).find((x) => x.route === route)?.label ?? route;

  return (
    <div style={{
      display: "flex", height: "100vh", overflow: "hidden",
      background: T.bg, color: T.text,
      fontFamily: "'Inter', system-ui, sans-serif",
      backgroundImage: "linear-gradient(rgba(0,229,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,0.02) 1px, transparent 1px)",
      backgroundSize: "32px 32px",
    }}>
      {/* SIDEBAR — CMP-002 */}
      <aside style={{
        width: sidebarOpen ? 252 : 0, minWidth: sidebarOpen ? 252 : 0,
        background: T.surface, borderRight: `1px solid ${T.border}`,
        display: "flex", flexDirection: "column",
        overflow: "hidden", transition: "width 0.2s, min-width 0.2s", flexShrink: 0,
      }}>
        {/* Logo */}
        <div style={{ padding: "16px 14px 12px", borderBottom: `1px solid ${T.border}`, flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: "linear-gradient(135deg,#F59E0B,#F97316)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 12px rgba(245,158,11,0.35)" }}>
              <Wrench size={15} color="#000" />
            </div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, letterSpacing: 2, color: T.text }}>SHYNTRAA</div>
              <div style={{ fontSize: 9, color: T.dim, letterSpacing: 0.5 }}>Automotive OS v2</div>
            </div>
          </div>
        </div>

        {/* Context Selectors */}
        <div style={{ padding: "10px 10px 6px", borderBottom: `1px solid ${T.border}`, flexShrink: 0 }}>
          <CtxSelect label="Tenant" value={tenant} options={TENANTS} onChange={setTenant} icon={<Building2 size={10} />} />
          <CtxSelect label="Branch" value={branch} options={BRANCHES} onChange={setBranch} icon={<GitBranch size={10} />} />
          <CtxSelect label="Fin Year" value={fy} options={FY} onChange={setFy} icon={<Calendar size={10} />} />
        </div>

        {/* Nav — NAR App-C */}
        <nav style={{ flex: 1, overflowY: "auto", padding: "6px 6px 0", scrollbarWidth: "none" }}>
          {NAV.map((item) => {
            const isExpanded = expanded[item.key];
            const hasActiveChild = item.children?.some((c) => c.route === route);
            return (
              <div key={item.key}>
                <button
                  onClick={() => setExpanded((p) => ({ ...p, [item.key]: !p[item.key] }))}
                  style={{
                    width: "100%", display: "flex", alignItems: "center", gap: 8,
                    padding: "6px 8px", borderRadius: 6, background: hasActiveChild ? "rgba(0,229,255,0.05)" : "none",
                    border: "none", color: hasActiveChild ? T.muted : T.dim,
                    cursor: "pointer", textAlign: "left", fontSize: 11.5, fontWeight: hasActiveChild ? 500 : 400,
                  }}
                  onMouseEnter={(e) => { if (!hasActiveChild) e.currentTarget.style.background = "rgba(255,255,255,0.03)"; }}
                  onMouseLeave={(e) => { if (!hasActiveChild) e.currentTarget.style.background = "none"; }}
                >
                  <span style={{ color: hasActiveChild ? T.primary : T.dim, flexShrink: 0 }}>{item.icon}</span>
                  <span style={{ flex: 1 }}>{item.label}</span>
                  <span style={{ color: T.dim, flexShrink: 0 }}>
                    {isExpanded ? <ChevronDown size={11} /> : <ChevronRight size={11} />}
                  </span>
                </button>
                {isExpanded && (
                  <div style={{ paddingLeft: 22, paddingBottom: 2 }}>
                    {item.children!.map((child) => {
                      const active = route === child.route;
                      return (
                        <button
                          key={child.route}
                          onClick={() => navigate(child.route)}
                          style={{
                            width: "100%", display: "block", padding: "4px 8px",
                            borderRadius: 4, background: active ? "rgba(0,229,255,0.08)" : "none",
                            border: "none", color: active ? T.primary : T.dim,
                            cursor: "pointer", textAlign: "left", fontSize: 11,
                            borderLeft: active ? `2px solid ${T.primary}` : "2px solid transparent",
                            marginBottom: 1,
                          }}
                          onMouseEnter={(e) => { if (!active) { e.currentTarget.style.color = T.muted; e.currentTarget.style.background = "rgba(255,255,255,0.02)"; } }}
                          onMouseLeave={(e) => { if (!active) { e.currentTarget.style.color = T.dim; e.currentTarget.style.background = "none"; } }}
                        >
                          {child.label}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Logout */}
        <div style={{ padding: "8px 6px", borderTop: `1px solid ${T.border}`, flexShrink: 0 }}>
          <button style={{ width: "100%", display: "flex", alignItems: "center", gap: 8, padding: "6px 8px", borderRadius: 6, background: "none", border: "none", color: T.dim, cursor: "pointer", fontSize: 11.5 }}
            onMouseEnter={(e) => (e.currentTarget.style.color = T.danger)}
            onMouseLeave={(e) => (e.currentTarget.style.color = T.dim)}>
            <LogOut size={13} /><span>Logout</span>
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {/* TOPBAR — CMP-003 */}
        <header style={{
          height: 52, flexShrink: 0, background: "rgba(17,24,39,0.95)",
          backdropFilter: "blur(12px)", borderBottom: `1px solid ${T.border}`,
          display: "flex", alignItems: "center", gap: 10, padding: "0 16px",
        }}>
          <button onClick={() => setSidebarOpen((v) => !v)}
            style={{ background: "none", border: "none", color: T.dim, cursor: "pointer", padding: 4, borderRadius: 4 }}
            onMouseEnter={(e) => (e.currentTarget.style.color = T.muted)}
            onMouseLeave={(e) => (e.currentTarget.style.color = T.dim)}>
            {sidebarOpen ? <X size={15} /> : <Menu size={15} />}
          </button>

          {/* CMP-004 Breadcrumb */}
          <div style={{ flex: 1, fontSize: 12, color: T.muted, display: "flex", alignItems: "center", gap: 5 }}>
            <span style={{ color: T.dim }}>Shyntraa</span>
            <ChevronRight size={10} color={T.dim} />
            <span style={{ color: T.text }}>{routeLabel}</span>
          </div>

          {/* CMP-005 Global Search */}
          <div style={{ display: "flex", alignItems: "center", gap: 7, background: "rgba(255,255,255,0.04)", borderRadius: 6, padding: "4px 10px", border: `1px solid ${T.border}`, cursor: "text" }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = T.borderActive)}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = T.border)}>
            <Search size={12} color={T.dim} />
            <input placeholder="Search or ⌘K" style={{ background: "none", border: "none", outline: "none", color: T.muted, fontSize: 11.5, width: 130 }} />
          </div>

          {/* Context chips */}
          <div style={{ display: "flex", gap: 5 }}>
            <Chip label={tenant.split(" ")[0]} />
            <Chip label={branch.split(" ")[0]} />
            <Chip label="FY 25–26" accent />
          </div>

          {/* Notifications */}
          <div style={{ position: "relative" }}>
            <button onClick={() => setNotifOpen((v) => !v)}
              style={{ background: "none", border: "none", color: T.dim, cursor: "pointer", padding: 5, borderRadius: 4, position: "relative" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = T.muted)}
              onMouseLeave={(e) => (e.currentTarget.style.color = T.dim)}>
              <Bell size={15} />
              <span style={{ position: "absolute", top: 3, right: 3, width: 6, height: 6, borderRadius: "50%", background: T.danger }} />
            </button>
            {notifOpen && <NotifPanel onClose={() => setNotifOpen(false)} />}
          </div>

          {/* Avatar */}
          <div style={{ width: 28, height: 28, borderRadius: "50%", background: "linear-gradient(135deg,#F59E0B,#F97316)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, color: "#000", cursor: "pointer", flexShrink: 0 }}>
            SA
          </div>
        </header>

        {/* PAGE CONTENT */}
        <main style={{ flex: 1, overflowY: "auto", overflowX: "hidden" }}>
          <RouteRenderer route={route} navigate={navigate} />
        </main>
      </div>
    </div>
  );
}

function CtxSelect({ label, value, options, onChange, icon }: {
  label: string; value: string; options: string[]; onChange: (v: string) => void; icon: React.ReactNode;
}) {
  return (
    <div style={{ marginBottom: 4 }}>
      <div style={{ fontSize: 9, color: T.dim, letterSpacing: 0.6, textTransform: "uppercase", marginBottom: 1, paddingLeft: 2 }}>{label}</div>
      <div style={{ position: "relative" }}>
        <span style={{ position: "absolute", left: 6, top: "50%", transform: "translateY(-50%)", color: T.dim, pointerEvents: "none" }}>{icon}</span>
        <select value={value} onChange={(e) => onChange(e.target.value)} style={{ width: "100%", padding: "3px 20px 3px 20px", background: "rgba(255,255,255,0.03)", border: `1px solid ${T.border}`, borderRadius: 4, color: T.muted, fontSize: 10, outline: "none", cursor: "pointer", appearance: "none" }}>
          {options.map((o) => <option key={o} value={o} style={{ background: T.surface }}>{o}</option>)}
        </select>
        <ChevronDown size={9} style={{ position: "absolute", right: 5, top: "50%", transform: "translateY(-50%)", color: T.dim, pointerEvents: "none" }} />
      </div>
    </div>
  );
}

function Chip({ label, accent }: { label: string; accent?: boolean }) {
  return (
    <div style={{ padding: "2px 7px", borderRadius: 4, fontSize: 10, background: accent ? "rgba(0,229,255,0.08)" : "rgba(255,255,255,0.04)", color: accent ? T.primary : T.dim, border: `1px solid ${accent ? "rgba(0,229,255,0.2)" : T.border}` }}>
      {label}
    </div>
  );
}

const NOTIFS = [
  { id: 1, cat: "Job Card", msg: "JC-2041 moved to QC stage", time: "2m ago", read: false },
  { id: 2, cat: "Inquiry", msg: "New inquiry — Raj Mehta, BMW 5 Series", time: "14m ago", read: false },
  { id: 3, cat: "Billing", msg: "Invoice INV-1089 approved", time: "1h ago", read: false },
  { id: 4, cat: "Appointment", msg: "Rescheduled: Arjun K. 3pm → 5pm", time: "2h ago", read: true },
  { id: 5, cat: "System", msg: "Backup completed successfully", time: "3h ago", read: true },
  { id: 6, cat: "Workflow", msg: "Bay 4 now available", time: "4h ago", read: true },
];

const CAT_COLOR: Record<string, string> = {
  "Job Card": "#3B82F6", Inquiry: "#A855F7", Billing: "#22C55E",
  Appointment: "#F59E0B", System: "#64748B", Workflow: "#F97316",
};

function NotifPanel({ onClose: _ }: { onClose: () => void }) {
  return (
    <div style={{ position: "absolute", right: 0, top: 40, width: 300, background: "#0f1623", border: `1px solid ${T.border}`, borderRadius: 10, boxShadow: "0 20px 60px rgba(0,0,0,0.6)", zIndex: 999 }}>
      <div style={{ padding: "10px 12px 8px", borderBottom: `1px solid ${T.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 12, fontWeight: 500, color: T.text }}>Notifications</span>
        <span style={{ fontSize: 10, color: T.primary, cursor: "pointer" }}>Mark all read</span>
      </div>
      <div style={{ maxHeight: 300, overflowY: "auto" }}>
        {NOTIFS.map((n) => (
          <div key={n.id} style={{ padding: "8px 12px", borderBottom: `1px solid rgba(255,255,255,0.04)`, display: "flex", gap: 8, background: n.read ? "none" : "rgba(0,229,255,0.02)" }}>
            <span style={{ padding: "1px 5px", borderRadius: 3, fontSize: 9, fontWeight: 600, background: `${CAT_COLOR[n.cat] ?? "#64748B"}22`, color: CAT_COLOR[n.cat] ?? "#64748B", whiteSpace: "nowrap", marginTop: 1 }}>{n.cat}</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 11, color: n.read ? T.dim : "#CBD5E1" }}>{n.msg}</div>
              <div style={{ fontSize: 10, color: T.dim, marginTop: 1 }}>{n.time}</div>
            </div>
            {!n.read && <span style={{ width: 5, height: 5, borderRadius: "50%", background: T.primary, marginTop: 4, flexShrink: 0 }} />}
          </div>
        ))}
      </div>
    </div>
  );
}

// Route dispatch — BMR App-I
function RouteRenderer({ route, navigate }: { route: ShyntraRoute; navigate: (r: ShyntraRoute) => void }) {
  if (route.startsWith("dashboard.")) return <DashboardSuite variant={route.split(".")[1] as any} />;
  if (route.startsWith("customers.")) return <CustomerBillingSuite section={route.split(".")[1] as any} navigate={navigate} />;
  if (route.startsWith("operations.")) return <OperationsSuite section={route.split(".")[1] as any} navigate={navigate} />;
  if (route.startsWith("vendors.") || route.startsWith("finance.") || route.startsWith("reporting.")) return <VendorFinanceSuite section={route as any} navigate={navigate} />;
  if (route.startsWith("admin.") || route.startsWith("superadmin.")) return <AdminSuite section={route as any} navigate={navigate} />;
  if (route.startsWith("system.")) return <SystemSuite section={route.split(".")[1] as any} navigate={navigate} />;
  return <div style={{ padding: 32, color: T.dim, fontSize: 13 }}>Route not found: {route}</div>;
}
