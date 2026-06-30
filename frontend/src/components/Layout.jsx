import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const roleConfig = {
  patient:    {
    color:'#0284c7', bg:'#f0f9ff', navBg:'#fff',
    nav:[
      { label:'Dashboard',     path:'/patient' },
      { label:'Book Appointment', path:'/patient/appointments' },
      { label:'Prescriptions', path:'/patient/prescriptions' },
      { label:'Lab Tests',     path:'/patient/tests' },
    ]
  },
  doctor:     {
    color:'#059669', bg:'#f0fdf4', navBg:'#fff',
    nav:[
      { label:'Dashboard',     path:'/doctor' },
      { label:'Appointments',  path:'/doctor/appointments' },
      { label:'My Patients',   path:'/doctor/patients' },
      { label:'Prescriptions', path:'/doctor/prescriptions' },
    ]
  },
  pharmacist: {
    color:'#7c3aed', bg:'#f5f3ff', navBg:'#fff',
    nav:[
      { label:'Dashboard',     path:'/pharmacy' },
      { label:'Pending Orders',path:'/pharmacy/orders' },
      { label:'Inventory',     path:'/pharmacy/inventory' },
      { label:'Dispensed',     path:'/pharmacy/dispensed' },
    ]
  },
  admin:      {
    color:'#dc2626', bg:'#fff5f5', navBg:'#fff',
    nav:[
      { label:'Dashboard',     path:'/admin' },
      { label:'Users',         path:'/admin/users' },
      { label:'Appointments',  path:'/admin/appointments' },
      { label:'Reports',       path:'/admin/reports' },
      { label:'Settings',      path:'/admin/settings' },
    ]
  },
};

const roleLabel = {
  patient:'Patient Portal', doctor:'Doctor Portal',
  pharmacist:'Pharmacy Panel', admin:'Admin Console'
};

export default function Layout({ children }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const role = user?.role || 'patient';
  const cfg  = roleConfig[role] || roleConfig.patient;

  return (
    <div style={{ fontFamily:"'Inter','Segoe UI',sans-serif", minHeight:'100vh', background:'#f8fafc' }}>

      {/* Top bar */}
      <div style={{...s.topBar, background: cfg.color}}>
        <div style={s.topInner}>
          <div style={s.topLeft}>
            <span style={s.topIcon}>✚</span>
            <span style={s.topName}>MediCare</span>
            <span style={s.topSep}>|</span>
            <span style={s.topRole}>{roleLabel[role]}</span>
          </div>
          <div style={s.topRight}>
            <span style={s.topInfo}>📞 +94 11 234 5678</span>
            <span style={s.topInfo}>✉ info@medicare.lk</span>
          </div>
        </div>
      </div>

      {/* Main navbar */}
      <nav style={s.nav}>
        <div style={s.navInner}>
          {/* Logo */}
          <div style={s.logo} onClick={() => navigate(`/${role}`)}>
            <div style={{...s.logoBox, background: cfg.color}}>✚</div>
            <div>
              <div style={s.logoName}>MediCare</div>
              <div style={s.logoSub}>Healthcare System</div>
            </div>
          </div>

          {/* Nav links */}
          <div style={s.navLinks}>
            {cfg.nav.map(item => {
              const active = location.pathname === item.path;
              return (
                <div key={item.path}
                  style={{...s.navLink, ...(active ? {...s.navActive, color:cfg.color, borderBottom:`2px solid ${cfg.color}`} : {})}}
                  onClick={() => navigate(item.path)}>
                  {item.label}
                </div>
              );
            })}
          </div>

          {/* User menu */}
          <div style={s.userArea}>
            <div style={s.userBtn} onClick={() => setMenuOpen(!menuOpen)}>
              <div style={{...s.avatar, background:cfg.color}}>
                {user?.name?.[0]?.toUpperCase()}
              </div>
              <div style={s.userMeta}>
                <div style={s.userName}>{user?.name}</div>
                <div style={s.userRole}>{role}</div>
              </div>
              <span style={{color:'#94a3b8', fontSize:12}}>{menuOpen ? '▲' : '▼'}</span>
            </div>
            {menuOpen && (
              <div style={s.dropdown}>
                <div style={s.dropItem}>👤 My Profile</div>
                <div style={s.dropItem}>⚙️ Settings</div>
                <div style={s.dropDivider}/>
                <div style={{...s.dropItem, color:'#dc2626'}}
                  onClick={() => { logout(); navigate('/login'); setMenuOpen(false); }}>
                  ← Sign Out
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Breadcrumb */}
      <div style={s.breadcrumb}>
        <div style={s.breadInner}>
          <span style={s.breadHome} onClick={() => navigate(`/${role}`)}>🏠 Home</span>
          <span style={s.breadSep}>›</span>
          <span style={{...s.breadCurrent, color:cfg.color}}>
            {cfg.nav.find(n => n.path === location.pathname)?.label || 'Dashboard'}
          </span>
        </div>
      </div>

      {/* Page content */}
      <main style={s.main}>
        {children}
      </main>

      {/* Footer */}
      <footer style={s.footer}>
        <div style={s.footerInner}>
          <span style={{...s.footerLogo, color:cfg.color}}>✚ MediCare</span>
          <span style={s.footerText}>© 2026 MediCare Healthcare Management System</span>
          <div style={s.footerLinks}>
            <a href="#" style={s.footerLink}>Privacy Policy</a>
            <a href="#" style={s.footerLink}>Terms of Service</a>
            <a href="#" style={s.footerLink}>Contact Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

const s = {
  topBar:      { padding:'6px 0' },
  topInner:    { maxWidth:1200, margin:'0 auto', padding:'0 2rem', display:'flex', justifyContent:'space-between', alignItems:'center' },
  topLeft:     { display:'flex', alignItems:'center', gap:'0.5rem', color:'rgba(255,255,255,0.9)', fontSize:13 },
  topIcon:     { fontWeight:700 },
  topName:     { fontWeight:700 },
  topSep:      { opacity:0.5 },
  topRole:     { opacity:0.85 },
  topRight:    { display:'flex', gap:'1.5rem', color:'rgba(255,255,255,0.8)', fontSize:12 },
  topInfo:     {},
  nav:         { background:'#fff', borderBottom:'2px solid #e2e8f0', boxShadow:'0 2px 8px rgba(0,0,0,0.06)' },
  navInner:    { maxWidth:1200, margin:'0 auto', padding:'0 2rem', height:68, display:'flex', alignItems:'center', gap:'2rem' },
  logo:        { display:'flex', alignItems:'center', gap:'0.75rem', cursor:'pointer', flexShrink:0, marginRight:'1rem' },
  logoBox:     { width:40, height:40, borderRadius:10, display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontWeight:700, fontSize:20 },
  logoName:    { fontWeight:800, fontSize:17, color:'#0f172a' },
  logoSub:     { fontSize:11, color:'#94a3b8' },
  navLinks:    { display:'flex', alignItems:'center', gap:0, flex:1 },
  navLink:     { padding:'0 1rem', height:68, display:'flex', alignItems:'center', fontSize:14, fontWeight:500, color:'#374151', cursor:'pointer', borderBottom:'2px solid transparent', whiteSpace:'nowrap', transition:'all 0.15s' },
  navActive:   {},
  userArea:    { position:'relative', flexShrink:0 },
  userBtn:     { display:'flex', alignItems:'center', gap:'0.625rem', padding:'6px 12px', border:'1.5px solid #e2e8f0', borderRadius:10, cursor:'pointer', background:'#f8fafc' },
  avatar:      { width:32, height:32, borderRadius:8, display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontWeight:700, fontSize:13 },
  userMeta:    {},
  userName:    { fontWeight:600, fontSize:13, color:'#0f172a' },
  userRole:    { fontSize:11, color:'#64748b', textTransform:'capitalize' },
  dropdown:    { position:'absolute', top:'calc(100% + 8px)', right:0, background:'#fff', border:'1px solid #e2e8f0', borderRadius:12, width:200, boxShadow:'0 8px 24px rgba(0,0,0,0.1)', zIndex:200 },
  dropItem:    { padding:'10px 16px', fontSize:13, color:'#374151', cursor:'pointer', fontWeight:500 },
  dropDivider: { height:'1px', background:'#f1f5f9', margin:'4px 0' },
  breadcrumb:  { background:'#f1f5f9', borderBottom:'1px solid #e2e8f0' },
  breadInner:  { maxWidth:1200, margin:'0 auto', padding:'8px 2rem', display:'flex', alignItems:'center', gap:'0.5rem', fontSize:13 },
  breadHome:   { color:'#64748b', cursor:'pointer' },
  breadSep:    { color:'#94a3b8' },
  breadCurrent:{ fontWeight:600 },
  main:        { maxWidth:1200, margin:'0 auto', padding:'2rem' },
  footer:      { background:'#0f172a', marginTop:'4rem', padding:'1.25rem 2rem' },
  footerInner: { maxWidth:1200, margin:'0 auto', display:'flex', alignItems:'center', justifyContent:'space-between' },
  footerLogo:  { fontWeight:700, fontSize:15 },
  footerText:  { color:'#475569', fontSize:12 },
  footerLinks: { display:'flex', gap:'1.5rem' },
  footerLink:  { color:'#64748b', fontSize:12, textDecoration:'none' },
};
