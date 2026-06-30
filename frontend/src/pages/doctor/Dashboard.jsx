import Layout from '../../components/Layout';
import { StatCard, SectionCard, Badge, PrimaryBtn } from '../../components/UI';
import { useAuth } from '../../context/AuthContext';

const todayPatients = [
  { name:'Alice Johnson',  age:34, time:'9:00 AM',  reason:'Chest pain',      status:'confirmed' },
  { name:'Bob Williams',   age:52, time:'10:30 AM', reason:'Diabetes check',  status:'confirmed' },
  { name:'Carol Davis',    age:28, time:'2:00 PM',  reason:'Annual physical', status:'pending' },
  { name:'David Lee',      age:45, time:'3:30 PM',  reason:'Hypertension',    status:'pending' },
];

export default function DoctorDashboard() {
  const { user } = useAuth();
  return (
    <Layout>
      <div style={s.banner}>
        <div>
          <h1 style={s.bannerTitle}>Welcome, Dr. {user?.name?.split(' ').slice(-1)[0]} 👨‍⚕️</h1>
          <p style={s.bannerSub}>{new Date().toLocaleDateString('en-US',{weekday:'long',year:'numeric',month:'long',day:'numeric'})} — You have 8 patients scheduled today.</p>
        </div>
        <PrimaryBtn color="#059669">+ Add Patient Note</PrimaryBtn>
      </div>

      <div style={s.statsGrid}>
        <StatCard icon="👥" label="Today's Patients"      value="8"  color="#059669" trend={5} sub="2 still pending" />
        <StatCard icon="📝" label="Prescriptions Written" value="12" color="#0284c7" trend={8} />
        <StatCard icon="🧪" label="Tests Ordered"         value="5"  color="#f59e0b" sub="3 results pending" />
        <StatCard icon="⭐" label="Patient Rating"        value="4.9" color="#7c3aed" sub="Based on 128 reviews" />
      </div>

      <div style={s.grid}>
        <SectionCard title="Today's Schedule"
          action={<PrimaryBtn color="#059669" small>View Calendar</PrimaryBtn>}>
          <table style={t.table}>
            <thead><tr>
              {['Time','Patient','Age','Reason','Status','Action'].map(h => <th key={h} style={t.th}>{h}</th>)}
            </tr></thead>
            <tbody>
              {todayPatients.map((p,i) => (
                <tr key={i} style={t.tr}>
                  <td style={t.td}><span style={s.time}>⏰ {p.time}</span></td>
                  <td style={t.td}>
                    <div style={s.patRow}>
                      <div style={s.patAvatar}>{p.name[0]}</div>
                      <span style={s.patName}>{p.name}</span>
                    </div>
                  </td>
                  <td style={t.td}><span style={s.age}>{p.age} yrs</span></td>
                  <td style={t.td}>{p.reason}</td>
                  <td style={t.td}><Badge status={p.status}/></td>
                  <td style={t.td}><button style={s.startBtn}>Start →</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </SectionCard>

        <div style={s.rightCol}>
          <div style={s.nextCard}>
            <div style={s.nextBadge}>⏭ NEXT PATIENT</div>
            <div style={s.nextName}>Alice Johnson</div>
            <div style={s.nextInfo}>34 yrs · Chest pain follow-up</div>
            <div style={s.nextTime}>⏰ 9:00 AM — in 15 minutes</div>
            <button style={s.consultBtn}>Start Consultation →</button>
          </div>

          <SectionCard title="Quick Actions">
            <div style={s.qList}>
              {[['📝','Write Prescription'],['🧪','Order Lab Test'],['📋','Patient History'],['📊','Generate Report'],['💬','Send Message']].map(([icon,label]) => (
                <div key={label} style={s.qItem}>
                  <span style={s.qIcon}>{icon}</span>
                  <span style={s.qLabel}>{label}</span>
                  <span style={s.qArrow}>›</span>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>
      </div>
    </Layout>
  );
}

const t = {
  table: { width:'100%', borderCollapse:'collapse' },
  th:    { textAlign:'left', padding:'10px 16px', fontSize:11, fontWeight:700, color:'#94a3b8', textTransform:'uppercase', letterSpacing:'0.6px', background:'#f8fafc', borderBottom:'1px solid #e2e8f0' },
  tr:    { borderBottom:'1px solid #f8fafc' },
  td:    { padding:'12px 16px', fontSize:13, color:'#374151', verticalAlign:'middle' },
};
const s = {
  banner:      { background:'linear-gradient(135deg,#064e3b,#059669)', borderRadius:16, padding:'2rem', color:'#fff', display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'1.75rem' },
  bannerTitle: { margin:0, fontSize:24, fontWeight:800 },
  bannerSub:   { margin:'6px 0 0', color:'rgba(255,255,255,0.75)', fontSize:13 },
  statsGrid:   { display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'1rem', marginBottom:'1.75rem' },
  grid:        { display:'grid', gridTemplateColumns:'1.5fr 1fr', gap:'1.5rem' },
  time:        { fontSize:12, color:'#374151', fontWeight:600, whiteSpace:'nowrap' },
  patRow:      { display:'flex', alignItems:'center', gap:'0.625rem' },
  patAvatar:   { width:30, height:30, borderRadius:8, background:'linear-gradient(135deg,#059669,#10b981)', color:'#fff', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:700, fontSize:12 },
  patName:     { fontWeight:600, color:'#0f172a' },
  age:         { color:'#64748b', fontSize:12 },
  startBtn:    { background:'#f0fdf4', color:'#059669', border:'1px solid #bbf7d0', borderRadius:7, padding:'5px 14px', fontSize:12, fontWeight:600, cursor:'pointer' },
  rightCol:    { display:'flex', flexDirection:'column', gap:'1.25rem' },
  nextCard:    { background:'linear-gradient(135deg,#064e3b,#065f46)', borderRadius:14, padding:'1.5rem', color:'#fff' },
  nextBadge:   { color:'#6ee7b7', fontSize:11, fontWeight:700, marginBottom:'0.75rem', letterSpacing:'0.5px' },
  nextName:    { fontSize:20, fontWeight:800, marginBottom:4 },
  nextInfo:    { color:'#a7f3d0', fontSize:13, marginBottom:6 },
  nextTime:    { color:'#6ee7b7', fontSize:12, marginBottom:'1rem' },
  consultBtn:  { width:'100%', padding:'10px', background:'rgba(255,255,255,0.15)', border:'1px solid rgba(255,255,255,0.2)', borderRadius:8, color:'#fff', fontSize:13, fontWeight:700, cursor:'pointer' },
  qList:       { padding:'0.5rem 0' },
  qItem:       { display:'flex', alignItems:'center', gap:'0.875rem', padding:'0.875rem 1.5rem', borderBottom:'1px solid #f8fafc', cursor:'pointer' },
  qIcon:       { fontSize:16, width:20, textAlign:'center' },
  qLabel:      { flex:1, fontSize:13, fontWeight:500, color:'#374151' },
  qArrow:      { color:'#94a3b8', fontSize:16 },
};
