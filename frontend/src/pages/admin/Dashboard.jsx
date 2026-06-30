import Layout from '../../components/Layout';
import { StatCard, SectionCard, Badge, PrimaryBtn } from '../../components/UI';

const users = [
  { name:'Alice Johnson',  role:'patient',    email:'alice@email.com',  joined:'Jun 25, 2026', status:'active' },
  { name:'Dr. Sam Torres', role:'doctor',     email:'sam@hospital.com', joined:'Jun 24, 2026', status:'active' },
  { name:'Mary Pharma',    role:'pharmacist', email:'mary@pharma.com',  joined:'Jun 23, 2026', status:'active' },
  { name:'John Smith',     role:'patient',    email:'john@email.com',   joined:'Jun 22, 2026', status:'active' },
];

const roleColor = { patient:'#0284c7', doctor:'#059669', pharmacist:'#7c3aed', admin:'#dc2626' };

export default function AdminDashboard() {
  return (
    <Layout>
      <div style={s.banner}>
        <div>
          <h1 style={s.bannerTitle}>Admin Console 🛡️</h1>
          <p style={s.bannerSub}>Full system overview and management — MediCare Healthcare Platform</p>
        </div>
        <div style={{display:'flex', gap:'0.75rem'}}>
          <PrimaryBtn color="#fff" onClick={()=>{}}>
            <span style={{color:'#dc2626', fontWeight:700}}>+ Add User</span>
          </PrimaryBtn>
          <PrimaryBtn color="#dc2626">Generate Report</PrimaryBtn>
        </div>
      </div>

      <div style={s.statsGrid}>
        <StatCard icon="👥" label="Total Users"           value="1,284" color="#0284c7" trend={12} sub="This month" />
        <StatCard icon="📅" label="Appointments Today"    value="87"    color="#059669" trend={5} />
        <StatCard icon="💊" label="Prescriptions Issued"  value="243"   color="#7c3aed" trend={8} />
        <StatCard icon="🧪" label="Tests Processed"       value="56"    color="#f59e0b" trend={-3} />
      </div>

      <div style={s.grid}>
        <SectionCard title="Recent User Registrations"
          action={<PrimaryBtn color="#dc2626" small>View all users</PrimaryBtn>}>
          <table style={t.table}>
            <thead><tr>
              {['User','Role','Email','Joined','Status','Action'].map(h => <th key={h} style={t.th}>{h}</th>)}
            </tr></thead>
            <tbody>
              {users.map((u,i) => (
                <tr key={i} style={t.tr}>
                  <td style={t.td}>
                    <div style={s.userRow}>
                      <div style={{...s.avatar, background:roleColor[u.role]}}>{u.name[0]}</div>
                      <span style={s.userName}>{u.name}</span>
                    </div>
                  </td>
                  <td style={t.td}>
                    <span style={{...s.roleBadge, background:`${roleColor[u.role]}15`, color:roleColor[u.role]}}>
                      {u.role}
                    </span>
                  </td>
                  <td style={t.td}><span style={s.email}>{u.email}</span></td>
                  <td style={t.td}><span style={s.date}>{u.joined}</span></td>
                  <td style={t.td}><Badge status={u.status}/></td>
                  <td style={t.td}>
                    <div style={{display:'flex', gap:6}}>
                      <button style={s.editBtn}>Edit</button>
                      <button style={s.viewBtn}>View</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </SectionCard>

        <div style={s.rightCol}>
          <SectionCard title="System Health">
            {[['API Server','Operational','#10b981'],['Database','Connected','#10b981'],['Auth Service','Operational','#10b981'],['File Storage','Degraded','#f59e0b'],['Email Service','Operational','#10b981']].map(([svc,status,color]) => (
              <div key={svc} style={s.healthRow}>
                <span style={s.svcName}>{svc}</span>
                <span style={{display:'flex',alignItems:'center',gap:5,fontSize:12,fontWeight:600,color}}>
                  <span style={{width:7,height:7,borderRadius:'50%',background:color}}/>
                  {status}
                </span>
              </div>
            ))}
          </SectionCard>

          <div style={s.statCard}>
            <div style={s.statCardTitle}>Platform Statistics</div>
            {[['System Uptime','99.8%'],['Avg Response Time','124ms'],['Active Sessions','47'],['Storage Used','2.4 GB']].map(([k,v]) => (
              <div key={k} style={s.statRow}>
                <span style={s.statKey}>{k}</span>
                <span style={s.statVal}>{v}</span>
              </div>
            ))}
          </div>

          <SectionCard title="Role Distribution">
            {[['Patients','1,102','#0284c7'],['Doctors','98','#059669'],['Pharmacists','42','#7c3aed'],['Admins','12','#dc2626']].map(([role,count,color]) => (
              <div key={role} style={s.roleRow}>
                <span style={{...s.roleDot, background:color}}/>
                <span style={s.roleName}>{role}</span>
                <div style={s.roleBar}>
                  <div style={{height:'100%', borderRadius:3, background:color, width:`${(parseInt(count.replace(',',''))/1284*100)}%`, transition:'width 1s'}}/>
                </div>
                <span style={{...s.roleCount, color}}>{count}</span>
              </div>
            ))}
          </SectionCard>
        </div>
      </div>
    </Layout>
  );
}

const t = { table:{width:'100%',borderCollapse:'collapse'}, th:{textAlign:'left',padding:'10px 16px',fontSize:11,fontWeight:700,color:'#94a3b8',textTransform:'uppercase',letterSpacing:'0.6px',background:'#f8fafc',borderBottom:'1px solid #e2e8f0'}, tr:{borderBottom:'1px solid #f8fafc'}, td:{padding:'12px 16px',fontSize:13,color:'#374151',verticalAlign:'middle'} };
const s = {
  banner:      { background:'linear-gradient(135deg,#450a0a,#dc2626)', borderRadius:16, padding:'2rem', color:'#fff', display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'1.75rem' },
  bannerTitle: { margin:0, fontSize:24, fontWeight:800 },
  bannerSub:   { margin:'6px 0 0', color:'rgba(255,255,255,0.75)', fontSize:13 },
  statsGrid:   { display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'1rem', marginBottom:'1.75rem' },
  grid:        { display:'grid', gridTemplateColumns:'1.5fr 1fr', gap:'1.5rem' },
  userRow:     { display:'flex', alignItems:'center', gap:'0.625rem' },
  avatar:      { width:30, height:30, borderRadius:8, display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontWeight:700, fontSize:12 },
  userName:    { fontWeight:700, color:'#0f172a' },
  roleBadge:   { borderRadius:20, padding:'3px 10px', fontSize:11, fontWeight:700, textTransform:'capitalize' },
  email:       { color:'#64748b', fontSize:12 },
  date:        { color:'#94a3b8', fontSize:12 },
  editBtn:     { background:'#f1f5f9', border:'none', borderRadius:6, padding:'4px 10px', fontSize:12, fontWeight:600, cursor:'pointer', color:'#374151' },
  viewBtn:     { background:'#fef2f2', border:'none', borderRadius:6, padding:'4px 10px', fontSize:12, fontWeight:600, cursor:'pointer', color:'#dc2626' },
  rightCol:    { display:'flex', flexDirection:'column', gap:'1.25rem' },
  healthRow:   { display:'flex', justifyContent:'space-between', alignItems:'center', padding:'0.75rem 1.5rem', borderBottom:'1px solid #f8fafc' },
  svcName:     { fontSize:13, fontWeight:500, color:'#374151' },
  statCard:    { background:'linear-gradient(135deg,#450a0a,#7f1d1d)', borderRadius:14, padding:'1.5rem' },
  statCardTitle:{ color:'#fca5a5', fontSize:12, fontWeight:700, marginBottom:'1rem', letterSpacing:'0.5px' },
  statRow:     { display:'flex', justifyContent:'space-between', marginBottom:10 },
  statKey:     { fontSize:13, color:'#fca5a5' },
  statVal:     { fontSize:13, fontWeight:800, color:'#fff' },
  roleRow:     { display:'flex', alignItems:'center', gap:'0.75rem', padding:'0.75rem 1.5rem', borderBottom:'1px solid #f8fafc' },
  roleDot:     { width:8, height:8, borderRadius:'50%', flexShrink:0 },
  roleName:    { fontSize:13, fontWeight:500, color:'#374151', width:80 },
  roleBar:     { flex:1, height:6, background:'#f1f5f9', borderRadius:3, overflow:'hidden' },
  roleCount:   { fontSize:13, fontWeight:700, width:50, textAlign:'right' },
};
