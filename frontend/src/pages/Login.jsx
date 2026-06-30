import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const roleRedirects = {
  patient: '/patient', doctor: '/doctor',
  pharmacist: '/pharmacy', admin: '/admin'
};

export default function Login() {
  const [form, setForm]     = useState({ email: '', password: '' });
  const [error, setError]   = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate  = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); setError(''); setLoading(true);
    try {
      const user = await login(form.email, form.password);
      navigate(roleRedirects[user.role] || '/');
    } catch { setError('Invalid email or password. Please try again.'); }
    finally { setLoading(false); }
  };

  return (
    <>
      {/* Reset any host margin/padding */}
      <style>{`*{margin:0;padding:0;box-sizing:border-box;}body{overflow-x:hidden;}`}</style>

      <div style={s.root}>

        {/* ── NAVBAR ─────────────────────────── */}
        <nav style={s.nav}>
          <div style={s.navInner}>
            <div style={s.brand}>
              <div style={s.brandIcon}>✚</div>
              <div>
                <div style={s.brandName}>MediCare</div>
                <div style={s.brandSub}>Healthcare Management</div>
              </div>
            </div>
            <div style={s.navLinks}>
              {['Home','Services','Doctors','About','Contact'].map(l=>(
                <a key={l} href="#" style={s.navLink}>{l}</a>
              ))}
              <Link to="/register" style={s.navRegBtn}>Register Free</Link>
            </div>
          </div>
        </nav>

        {/* ── HERO ───────────────────────────── */}
        <section style={s.hero}>

          {/* Background circles */}
          <div style={{...s.circle, width:600,height:600,top:-200,left:-200,opacity:0.07}}/>
          <div style={{...s.circle, width:400,height:400,bottom:-100,left:'30%',opacity:0.05}}/>
          <div style={{...s.circle, width:300,height:300,top:'10%',right:'35%',opacity:0.04}}/>

          <div style={s.heroInner}>

            {/* LEFT — headline */}
            <div style={s.heroLeft}>

              <div style={s.trustBadge}>
                <span style={s.trustDot}/>
                🏥 &nbsp;Trusted by 50,000+ patients in Sri Lanka
              </div>

              <h1 style={s.heroH1}>
                Your Health,<br/>
                <span style={s.heroAccent}>Our Priority</span>
              </h1>

              <p style={s.heroP}>
                Access world-class healthcare services. Book appointments,
                manage prescriptions, and track your health records —
                all in one secure platform.
              </p>

              {/* Stats row */}
              <div style={s.statsRow}>
                {[
                  ['500+','Specialist Doctors'],
                  ['50k+','Happy Patients'],
                  ['24/7','Support Available'],
                  ['15+','Specialties'],
                ].map(([n,l])=>(
                  <div key={l} style={s.stat}>
                    <div style={s.statN}>{n}</div>
                    <div style={s.statL}>{l}</div>
                  </div>
                ))}
              </div>

              {/* Service pills */}
              <div style={s.pills}>
                {['📅 Appointments','💊 Pharmacy','🧪 Lab Tests','🚑 Emergency Care'].map(p=>(
                  <span key={p} style={s.pill}>{p}</span>
                ))}
              </div>
            </div>

            {/* RIGHT — login card */}
            <div style={s.card}>
              <div style={s.cardTop}>
                <div style={s.cardIcon}>✚</div>
                <h2 style={s.cardTitle}>Sign In to Portal</h2>
                <p style={s.cardSub}>Enter your credentials to continue</p>
              </div>

              {error && (
                <div style={s.alert}>⚠ {error}</div>
              )}

              <form onSubmit={handleSubmit} style={s.form}>
                <div style={s.field}>
                  <label style={s.label}>Email Address</label>
                  <input style={s.input}
                    type="email" placeholder="you@example.com"
                    value={form.email}
                    onChange={e=>setForm({...form,email:e.target.value})}
                    required/>
                </div>
                <div style={s.field}>
                  <label style={s.label}>Password</label>
                  <input style={s.input}
                    type="password" placeholder="Enter your password"
                    value={form.password}
                    onChange={e=>setForm({...form,password:e.target.value})}
                    required/>
                  <div style={s.forgot}><a href="#" style={s.forgotLink}>Forgot password?</a></div>
                </div>
                <button style={{...s.signBtn, opacity:loading?0.75:1}}
                  type="submit" disabled={loading}>
                  {loading ? '⏳ Signing in...' : 'Sign In →'}
                </button>
              </form>

              <div style={s.dividerRow}>
                <span style={s.divLine}/><span style={s.divTxt}>Quick sign in as</span><span style={s.divLine}/>
              </div>

              <div style={s.roleGrid}>
                {[
                  ['👤','Patient',    '#0284c7','patient'],
                  ['👨‍⚕️','Doctor',   '#059669','doctor'],
                  ['💊','Pharmacy',   '#7c3aed','pharmacist'],
                  ['🛡️','Admin',     '#dc2626','admin'],
                ].map(([icon,label,color,role])=>(
                  <div key={role} style={s.roleBtn}
                    onClick={()=>setForm({email:`${role}@test.com`,password:'123456'})}>
                    <span style={s.roleBtnIcon}>{icon}</span>
                    <span style={{...s.roleBtnLabel,color}}>{label}</span>
                  </div>
                ))}
              </div>

              <p style={s.noAccount}>
                No account?&nbsp;
                <Link to="/register" style={s.regLink}>Create one free →</Link>
              </p>
            </div>
          </div>
        </section>

        {/* ── SERVICES BAR ───────────────────── */}
        <section style={s.servBar}>
          {[
            ['📅','#0284c7','Book Appointment','Schedule in 60 seconds'],
            ['💊','#7c3aed','Order Medicines', 'Pharmacy home delivery'],
            ['🧪','#f59e0b','Lab Tests',        'View results online'],
            ['🚑','#dc2626','Emergency 24/7',   'Immediate assistance'],
          ].map(([icon,color,title,desc])=>(
            <div key={title} style={s.servCard}>
              <div style={{...s.servIcon,background:`${color}18`}}>
                <span style={{fontSize:22}}>{icon}</span>
              </div>
              <div>
                <div style={s.servTitle}>{title}</div>
                <div style={s.servDesc}>{desc}</div>
              </div>
            </div>
          ))}
        </section>

        {/* ── FOOTER ─────────────────────────── */}
        <footer style={s.footer}>
          <div style={s.footInner}>
            <span style={s.footLogo}>✚ MediCare</span>
            <span style={s.footText}>© 2026 MediCare Healthcare Management System · All rights reserved</span>
            <div style={s.footLinks}>
              {['Privacy','Terms','Support'].map(l=>(
                <a key={l} href="#" style={s.footLink}>{l}</a>
              ))}
            </div>
          </div>
        </footer>

      </div>
    </>
  );
}

/* ─── Styles ──────────────────────────────────────────── */
const s = {
  root:        { minHeight:'100vh', fontFamily:"'Inter','Segoe UI',system-ui,sans-serif", background:'#f8fafc', display:'flex', flexDirection:'column' },

  /* navbar */
  nav:         { position:'fixed', top:0, left:0, right:0, zIndex:100, background:'rgba(255,255,255,0.95)', backdropFilter:'blur(12px)', borderBottom:'1px solid rgba(226,232,240,0.8)', height:68 },
  navInner:    { maxWidth:'100%', padding:'0 3rem', height:'100%', display:'flex', alignItems:'center', justifyContent:'space-between' },
  brand:       { display:'flex', alignItems:'center', gap:'0.75rem', cursor:'pointer' },
  brandIcon:   { width:40, height:40, background:'linear-gradient(135deg,#0284c7,#0ea5e9)', borderRadius:12, display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontWeight:800, fontSize:20 },
  brandName:   { fontWeight:800, fontSize:17, color:'#0f172a', letterSpacing:'-0.3px' },
  brandSub:    { fontSize:11, color:'#94a3b8', marginTop:1 },
  navLinks:    { display:'flex', alignItems:'center', gap:'0.25rem' },
  navLink:     { padding:'8px 14px', color:'#374151', fontSize:14, fontWeight:500, textDecoration:'none', borderRadius:8, transition:'background 0.15s' },
  navRegBtn:   { marginLeft:'0.5rem', background:'linear-gradient(135deg,#0284c7,#0ea5e9)', color:'#fff', padding:'9px 20px', borderRadius:10, fontSize:14, fontWeight:700, textDecoration:'none' },

  /* hero */
  hero:        { flex:1, background:'linear-gradient(160deg,#0c0f1a 0%,#0c2a4a 45%,#0c4a7a 100%)', paddingTop:68, minHeight:'100vh', display:'flex', flexDirection:'column', justifyContent:'center', position:'relative', overflow:'hidden' },
  circle:      { position:'absolute', borderRadius:'50%', background:'#38bdf8' },
  heroInner:   { maxWidth:'100%', padding:'4rem 4rem 3rem', display:'flex', alignItems:'center', gap:'4rem', position:'relative', zIndex:2 },
  heroLeft:    { flex:1, color:'#fff', maxWidth:640 },

  trustBadge:  { display:'inline-flex', alignItems:'center', gap:'0.5rem', background:'rgba(56,189,248,0.12)', border:'1px solid rgba(56,189,248,0.3)', color:'#7dd3fc', padding:'8px 18px', borderRadius:30, fontSize:13, fontWeight:600, marginBottom:'1.75rem' },
  trustDot:    { width:8, height:8, borderRadius:'50%', background:'#22d3ee', boxShadow:'0 0 6px #22d3ee', flexShrink:0 },

  heroH1:      { fontSize:64, fontWeight:900, lineHeight:1.05, margin:'0 0 1.25rem', letterSpacing:'-2px' },
  heroAccent:  { background:'linear-gradient(90deg,#38bdf8,#818cf8)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' },
  heroP:       { fontSize:18, color:'#94a3b8', lineHeight:1.75, marginBottom:'2.25rem', maxWidth:520 },

  statsRow:    { display:'flex', gap:'2.5rem', marginBottom:'2rem' },
  stat:        {},
  statN:       { fontSize:32, fontWeight:900, color:'#38bdf8', lineHeight:1 },
  statL:       { fontSize:12, color:'#64748b', marginTop:4, fontWeight:500 },

  pills:       { display:'flex', flexWrap:'wrap', gap:'0.625rem' },
  pill:        { background:'rgba(255,255,255,0.08)', border:'1px solid rgba(255,255,255,0.15)', color:'#cbd5e1', padding:'7px 16px', borderRadius:30, fontSize:13, fontWeight:500 },

  /* login card */
  card:        { background:'#fff', borderRadius:24, padding:'2.5rem', width:420, flexShrink:0, boxShadow:'0 32px 80px rgba(0,0,0,0.5)', position:'relative' },
  cardTop:     { textAlign:'center', marginBottom:'1.75rem' },
  cardIcon:    { width:52, height:52, background:'linear-gradient(135deg,#0284c7,#0ea5e9)', borderRadius:16, display:'inline-flex', alignItems:'center', justifyContent:'center', color:'#fff', fontWeight:800, fontSize:24, marginBottom:'1rem' },
  cardTitle:   { margin:0, fontSize:22, fontWeight:800, color:'#0f172a' },
  cardSub:     { margin:'4px 0 0', fontSize:13, color:'#64748b' },

  alert:       { background:'#fef2f2', border:'1px solid #fecaca', color:'#dc2626', borderRadius:10, padding:'0.75rem 1rem', fontSize:13, marginBottom:'1rem' },

  form:        { display:'flex', flexDirection:'column', gap:'1rem' },
  field:       { display:'flex', flexDirection:'column', gap:5 },
  label:       { fontSize:13, fontWeight:600, color:'#374151' },
  input:       { padding:'12px 14px', border:'1.5px solid #e2e8f0', borderRadius:10, fontSize:14, color:'#0f172a', background:'#f8fafc', outline:'none', transition:'border 0.2s', width:'100%' },
  forgot:      { textAlign:'right', marginTop:4 },
  forgotLink:  { fontSize:12, color:'#0284c7', textDecoration:'none', fontWeight:500 },

  signBtn:     { padding:'14px', background:'linear-gradient(135deg,#0284c7,#0ea5e9)', color:'#fff', border:'none', borderRadius:12, fontSize:15, fontWeight:800, cursor:'pointer', letterSpacing:'0.3px', width:'100%', marginTop:4 },

  dividerRow:  { display:'flex', alignItems:'center', gap:'0.75rem', margin:'1.5rem 0 1rem' },
  divLine:     { flex:1, height:'1px', background:'#e2e8f0', display:'block' },
  divTxt:      { fontSize:12, color:'#94a3b8', whiteSpace:'nowrap' },

  roleGrid:    { display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0.625rem', marginBottom:'1.5rem' },
  roleBtn:     { display:'flex', alignItems:'center', justifyContent:'center', gap:'0.5rem', padding:'9px 12px', border:'1.5px solid #e2e8f0', borderRadius:10, cursor:'pointer', background:'#f8fafc', transition:'all 0.15s' },
  roleBtnIcon: { fontSize:16 },
  roleBtnLabel:{ fontSize:13, fontWeight:700 },

  noAccount:   { textAlign:'center', fontSize:13, color:'#94a3b8' },
  regLink:     { color:'#0284c7', fontWeight:700, textDecoration:'none' },

  /* services bar */
  servBar:     { background:'#fff', display:'grid', gridTemplateColumns:'repeat(4,1fr)', borderTop:'1px solid #e2e8f0', borderBottom:'1px solid #e2e8f0' },
  servCard:    { display:'flex', alignItems:'center', gap:'1rem', padding:'1.75rem 2rem', borderRight:'1px solid #f1f5f9', cursor:'pointer' },
  servIcon:    { width:52, height:52, borderRadius:14, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 },
  servTitle:   { fontWeight:700, fontSize:15, color:'#0f172a', marginBottom:3 },
  servDesc:    { fontSize:12, color:'#64748b', lineHeight:1.4 },

  /* footer */
  footer:      { background:'#0a0f1a', padding:'1.25rem 3rem' },
  footInner:   { display:'flex', alignItems:'center', justifyContent:'space-between' },
  footLogo:    { color:'#38bdf8', fontWeight:800, fontSize:15 },
  footText:    { color:'#475569', fontSize:12 },
  footLinks:   { display:'flex', gap:'1.5rem' },
  footLink:    { color:'#64748b', fontSize:12, textDecoration:'none' },
};