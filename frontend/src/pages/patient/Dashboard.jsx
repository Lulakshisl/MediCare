import Layout from '../../components/Layout';
import { StatCard, SectionCard, Badge, PrimaryBtn } from '../../components/UI';
import { useAuth } from '../../context/AuthContext';

const appointments = [
  { doctor:'Dr. Sarah Mills',  spec:'Cardiologist',       date:'Jun 28, 2026', time:'10:30 AM', status:'confirmed' },
  { doctor:'Dr. Raj Patel',    spec:'General Physician',  date:'Jul 2, 2026',  time:'2:00 PM',  status:'pending' },
  { doctor:'Dr. Anne Fernando',spec:'Dermatologist',      date:'Jul 10, 2026', time:'9:00 AM',  status:'pending' },
];

export default function PatientDashboard() {
  const { user } = useAuth();
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  return (
    <Layout>
      {/* Welcome banner */}
      <div style={s.banner}>
        <div>
          <h1 style={s.bannerTitle}>{greeting}, {user?.name?.split(' ')[0]}! 👋</h1>
          <p style={s.bannerSub}>Welcome to your personal health dashboard. Stay on top of your healthcare journey.</p>
        </div>
        <PrimaryBtn color="#0284c7">+ Book Appointment</PrimaryBtn>
      </div>

      {/* Stats */}
      <div style={s.statsGrid}>
        <StatCard icon="📅" label="Upcoming Appointments" value="2"  color="#0284c7" trend={0} sub="Next: Jun 28" />
        <StatCard icon="💊" label="Active Prescriptions"  value="3"  color="#7c3aed" sub="2 refills pending" />
        <StatCard icon="🧪" label="Pending Lab Tests"     value="1"  color="#f59e0b" sub="Results due today" />
        <StatCard icon="✅" label="Visits This Month"     value="4"  color="#059669" trend={12} />
      </div>

      <div style={s.grid}>
        {/* Upcoming appointments */}
        <SectionCard title="Upcoming Appointments"
          action={<PrimaryBtn color="#0284c7" small>View all</PrimaryBtn>}>
          <div style={s.apptList}>
            {appointments.map((a,i) => (
              <div key={i} style={s.apptRow}>
                <div style={s.apptAvatar}>{a.doctor.split(' ')[1][0]}</div>
                <div style={s.apptInfo}>
                  <div style={s.apptDoc}>{a.doctor}</div>
                  <div style={s.apptSpec}>{a.spec}</div>
                </div>
                <div style={s.apptMeta}>
                  <div style={s.apptDate}>📅 {a.date}</div>
                  <div style={s.apptTime}>⏰ {a.time}</div>
                </div>
                <Badge status={a.status} />
              </div>
            ))}
          </div>
        </SectionCard>

        {/* Quick actions */}
        <div style={s.rightCol}>
          <SectionCard title="Quick Actions">
            <div style={s.actionGrid}>
              {[
                ['📅','#0284c7','Book Appointment','See a specialist today'],
                ['💊','#7c3aed','My Prescriptions','View & refill medicines'],
                ['🧪','#f59e0b','Lab Reports','Check test results'],
                ['📋','#059669','Medical History','Your complete records'],
                ['🏥','#dc2626','Find a Doctor','Browse specialists'],
                ['📞','#0891b2','Telemedicine','Video consultation'],
              ].map(([icon,color,title,desc]) => (
                <div key={title} style={s.actionCard}>
                  <div style={{...s.actionIcon, background:`${color}15`}}>
                    <span style={{fontSize:20}}>{icon}</span>
                  </div>
                  <div style={s.actionTitle}>{title}</div>
                  <div style={s.actionDesc}>{desc}</div>
                </div>
              ))}
            </div>
          </SectionCard>

          {/* Health tip */}
          <div style={s.tipCard}>
            <div style={s.tipBadge}>💡 Health Tip of the Day</div>
            <p style={s.tipText}>"Regular health checkups can help detect problems early. Schedule your annual physical today."</p>
            <div style={s.tipFooter}>— MediCare Health Team</div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

const s = {
  banner:      { background:'linear-gradient(135deg,#0284c7,#0ea5e9)', borderRadius:16, padding:'2rem', color:'#fff', display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'1.75rem' },
  bannerTitle: { margin:0, fontSize:24, fontWeight:800 },
  bannerSub:   { margin:'6px 0 0', color:'rgba(255,255,255,0.8)', fontSize:14 },
  statsGrid:   { display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'1rem', marginBottom:'1.75rem' },
  grid:        { display:'grid', gridTemplateColumns:'1.4fr 1fr', gap:'1.5rem' },
  apptList:    { padding:'0.5rem 0' },
  apptRow:     { display:'flex', alignItems:'center', gap:'1rem', padding:'1rem 1.5rem', borderBottom:'1px solid #f8fafc' },
  apptAvatar:  { width:42, height:42, borderRadius:12, background:'linear-gradient(135deg,#0284c7,#0ea5e9)', color:'#fff', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:700, flexShrink:0 },
  apptInfo:    { flex:1 },
  apptDoc:     { fontWeight:700, fontSize:14, color:'#0f172a' },
  apptSpec:    { fontSize:12, color:'#64748b', marginTop:2 },
  apptMeta:    { textAlign:'right' },
  apptDate:    { fontSize:12, color:'#374151', fontWeight:500 },
  apptTime:    { fontSize:12, color:'#94a3b8', marginTop:2 },
  rightCol:    { display:'flex', flexDirection:'column', gap:'1.25rem' },
  actionGrid:  { display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:'0.75rem', padding:'1rem 1.5rem' },
  actionCard:  { textAlign:'center', padding:'1rem 0.5rem', borderRadius:10, border:'1px solid #f1f5f9', cursor:'pointer', background:'#fafbfc' },
  actionIcon:  { width:44, height:44, borderRadius:12, display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 0.5rem' },
  actionTitle: { fontSize:12, fontWeight:700, color:'#0f172a' },
  actionDesc:  { fontSize:11, color:'#94a3b8', marginTop:2, lineHeight:1.3 },
  tipCard:     { background:'linear-gradient(135deg,#f0fdf4,#dcfce7)', border:'1px solid #bbf7d0', borderRadius:14, padding:'1.5rem' },
  tipBadge:    { fontSize:13, fontWeight:700, color:'#059669', marginBottom:'0.75rem' },
  tipText:     { fontSize:13, color:'#374151', lineHeight:1.7, fontStyle:'italic', margin:'0 0 0.5rem' },
  tipFooter:   { fontSize:11, color:'#6ee7b7', fontWeight:500 },
};
