import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axiosInstance';

const roles = [
  { value:'patient',    icon:'🧑‍⚕️', label:'Patient',       desc:'Book appointments & view records' },
  { value:'doctor',     icon:'👨‍⚕️', label:'Doctor',        desc:'Manage patients & write prescriptions' },
  { value:'pharmacist', icon:'💊',   label:'Pharmacist',    desc:'Handle pharmacy orders & inventory' },
  { value:'admin',      icon:'🛡️',  label:'Administrator', desc:'Full system management access' },
];

export default function Register() {
  const [form, setForm] = useState({ name:'', email:'', password:'', role:'patient' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); setError(''); setLoading(true);
    try {
      await api.post('/auth/register', form);
      navigate('/login');
    } catch (err) { setError(err.response?.data?.message || 'Registration failed. Please try again.'); }
    finally { setLoading(false); }
  };

  return (
    <div style={s.page}>
      {/* Navbar */}
      <nav style={s.nav}>
        <div style={s.navInner}>
          <div style={s.navLogo}>
            <div style={s.logoIcon}>✚</div>
            <div>
              <div style={s.logoName}>MediCare</div>
              <div style={s.logoTag}>Healthcare Management</div>
            </div>
          </div>
          <Link to="/login" style={s.navBtn}>Sign In</Link>
        </div>
      </nav>

      <div style={s.body}>
        <div style={s.card}>
          <div style={s.cardLeft}>
            <h2 style={s.leftTitle}>Join MediCare</h2>
            <p style={s.leftDesc}>Create your account and access Sri Lanka's most advanced healthcare management platform.</p>
            <div style={s.benefits}>
              {[['✅','Free account — no credit card needed'],
                ['🔒','Your data is private and secure'],
                ['📱','Access on any device, anywhere'],
                ['⚡','Get started in under 2 minutes'],
              ].map(([icon,text]) => (
                <div key={text} style={s.benefit}>
                  <span>{icon}</span>
                  <span style={s.benefitText}>{text}</span>
                </div>
              ))}
            </div>
            <div style={s.statsRow}>
              {[['50k+','Patients'],['500+','Doctors'],['15+','Specialties']].map(([n,l]) => (
                <div key={l} style={s.stat}>
                  <div style={s.statNum}>{n}</div>
                  <div style={s.statLabel}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={s.cardRight}>
            <h3 style={s.formTitle}>Create Account</h3>
            <p style={s.formSub}>Fill in your details below</p>
            {error && <div style={s.alert}>{error}</div>}
            <form onSubmit={handleSubmit} style={s.form}>
              <div style={s.row}>
                <div style={s.field}>
                  <label style={s.label}>Full Name</label>
                  <input style={s.input} placeholder="Dr. Jane Smith"
                    value={form.name} onChange={e => setForm({...form, name:e.target.value})} required />
                </div>
                <div style={s.field}>
                  <label style={s.label}>Email Address</label>
                  <input style={s.input} type="email" placeholder="jane@hospital.com"
                    value={form.email} onChange={e => setForm({...form, email:e.target.value})} required />
                </div>
              </div>
              <div style={s.field}>
                <label style={s.label}>Password</label>
                <input style={s.input} type="password" placeholder="Minimum 6 characters"
                  value={form.password} onChange={e => setForm({...form, password:e.target.value})} required />
              </div>
              <div style={s.field}>
                <label style={s.label}>Select Your Role</label>
                <div style={s.roleGrid}>
                  {roles.map(r => (
                    <div key={r.value}
                      style={{...s.roleCard, ...(form.role===r.value ? s.roleActive : {})}}
                      onClick={() => setForm({...form, role:r.value})}>
                      <div style={s.roleTop}>
                        <span style={s.roleIcon}>{r.icon}</span>
                        {form.role===r.value && <span style={s.check}>✓</span>}
                      </div>
                      <div style={s.roleLabel}>{r.label}</div>
                      <div style={s.roleDesc}>{r.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
              <button style={{...s.btn, opacity:loading?0.8:1}} disabled={loading}>
                {loading ? 'Creating account...' : 'Create My Account →'}
              </button>
            </form>
            <p style={s.signIn}>Already have an account? <Link to="/login" style={s.link}>Sign in here</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
}

const s = {
  page:      { minHeight:'100vh', background:'#f0f6ff', fontFamily:"'Inter','Segoe UI',sans-serif" },
  nav:       { background:'#fff', borderBottom:'1px solid #e2e8f0' },
  navInner:  { maxWidth:1200, margin:'0 auto', padding:'0 2rem', height:64, display:'flex', alignItems:'center', justifyContent:'space-between' },
  navLogo:   { display:'flex', alignItems:'center', gap:'0.75rem' },
  logoIcon:  { width:36, height:36, background:'linear-gradient(135deg,#0284c7,#0ea5e9)', borderRadius:10, display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontWeight:700, fontSize:18 },
  logoName:  { fontWeight:700, fontSize:16, color:'#0f172a' },
  logoTag:   { fontSize:11, color:'#64748b' },
  navBtn:    { background:'#0284c7', color:'#fff', padding:'8px 18px', borderRadius:8, fontSize:14, fontWeight:600, textDecoration:'none' },
  body:      { padding:'3rem 2rem', display:'flex', justifyContent:'center', alignItems:'center', minHeight:'calc(100vh - 64px)' },
  card:      { background:'#fff', borderRadius:24, overflow:'hidden', display:'flex', maxWidth:960, width:'100%', boxShadow:'0 20px 60px rgba(0,0,0,0.1)' },
  cardLeft:  { background:'linear-gradient(160deg,#0f172a,#0369a1)', padding:'3rem', flex:'0 0 340px', color:'#fff' },
  leftTitle: { margin:'0 0 0.75rem', fontSize:26, fontWeight:800 },
  leftDesc:  { color:'#94a3b8', fontSize:14, lineHeight:1.7, marginBottom:'2rem' },
  benefits:  { display:'flex', flexDirection:'column', gap:'0.875rem', marginBottom:'2.5rem' },
  benefit:   { display:'flex', alignItems:'center', gap:'0.75rem', fontSize:13, color:'#cbd5e1' },
  benefitText:{ lineHeight:1.4 },
  statsRow:  { display:'flex', gap:'1.5rem' },
  stat:      {},
  statNum:   { fontSize:22, fontWeight:800, color:'#38bdf8' },
  statLabel: { fontSize:11, color:'#94a3b8', marginTop:2 },
  cardRight: { flex:1, padding:'3rem' },
  formTitle: { margin:0, fontSize:22, fontWeight:700, color:'#0f172a' },
  formSub:   { margin:'4px 0 1.5rem', fontSize:13, color:'#64748b' },
  alert:     { background:'#fef2f2', border:'1px solid #fecaca', color:'#dc2626', borderRadius:8, padding:'0.75rem', fontSize:13, marginBottom:'1rem' },
  form:      { display:'flex', flexDirection:'column', gap:'1.25rem' },
  row:       { display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1rem' },
  field:     { display:'flex', flexDirection:'column', gap:5 },
  label:     { fontSize:13, fontWeight:600, color:'#374151' },
  input:     { padding:'11px 14px', border:'1.5px solid #e2e8f0', borderRadius:10, fontSize:14, color:'#0f172a', background:'#f8fafc', outline:'none' },
  roleGrid:  { display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0.75rem' },
  roleCard:  { border:'1.5px solid #e2e8f0', borderRadius:12, padding:'1rem', cursor:'pointer', background:'#f8fafc', transition:'all 0.15s' },
  roleActive:{ border:'1.5px solid #0284c7', background:'#f0f9ff', boxShadow:'0 0 0 3px rgba(2,132,199,0.12)' },
  roleTop:   { display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:4 },
  roleIcon:  { fontSize:20 },
  check:     { background:'#0284c7', color:'#fff', borderRadius:'50%', width:18, height:18, display:'flex', alignItems:'center', justifyContent:'center', fontSize:11, fontWeight:700 },
  roleLabel: { fontWeight:600, fontSize:13, color:'#0f172a' },
  roleDesc:  { fontSize:11, color:'#94a3b8', marginTop:2, lineHeight:1.4 },
  btn:       { padding:'13px', background:'linear-gradient(135deg,#0284c7,#0ea5e9)', color:'#fff', border:'none', borderRadius:10, fontSize:15, fontWeight:700, cursor:'pointer' },
  signIn:    { textAlign:'center', fontSize:13, color:'#94a3b8', marginTop:'1.25rem' },
  link:      { color:'#0284c7', fontWeight:600, textDecoration:'none' },
};
