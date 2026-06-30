import Layout from '../../components/Layout';
import { StatCard, SectionCard, Badge, PrimaryBtn } from '../../components/UI';

const orders = [
  { patient:'Alice Johnson', medicine:'Metformin 500mg',    qty:30, doctor:'Dr. Mills',  status:'pending' },
  { patient:'Bob Williams',  medicine:'Atorvastatin 40mg',  qty:15, doctor:'Dr. Patel',  status:'pending' },
  { patient:'Carol Davis',   medicine:'Amoxicillin 250mg',  qty:21, doctor:'Dr. Raj',    status:'confirmed' },
  { patient:'David Lee',     medicine:'Amlodipine 5mg',     qty:30, doctor:'Dr. Fernando',status:'pending' },
];

export function PharmacyDashboard() {
  return (
    <Layout>
      <div style={s.banner}>
        <div>
          <h1 style={s.bannerTitle}>Pharmacy Dashboard 💊</h1>
          <p style={s.bannerSub}>Manage prescriptions, inventory, and dispensing operations.</p>
        </div>
        <PrimaryBtn color="#7c3aed">+ New Dispensing</PrimaryBtn>
      </div>

      <div style={s.statsGrid}>
        <StatCard icon="📋" label="Pending Orders"   value="7"   color="#7c3aed" trend={3} />
        <StatCard icon="✅" label="Dispensed Today"  value="24"  color="#059669" trend={15} />
        <StatCard icon="⚠️" label="Low Stock Items" value="3"   color="#f59e0b" sub="Needs reorder" />
        <StatCard icon="💊" label="Total Medicines"  value="248" color="#0284c7" />
      </div>

      <div style={s.grid}>
        <SectionCard title="Pending Prescriptions"
          action={<PrimaryBtn color="#7c3aed" small>Process All</PrimaryBtn>}>
          <table style={t.table}>
            <thead><tr>
              {['Patient','Medicine','Qty','Prescribed By','Status','Action'].map(h => <th key={h} style={t.th}>{h}</th>)}
            </tr></thead>
            <tbody>
              {orders.map((o,i) => (
                <tr key={i} style={t.tr}>
                  <td style={t.td}><span style={s.patName}>{o.patient}</span></td>
                  <td style={t.td}>{o.medicine}</td>
                  <td style={t.td}><span style={s.qty}>{o.qty}</span></td>
                  <td style={t.td}><span style={s.doc}>{o.doctor}</span></td>
                  <td style={t.td}><Badge status={o.status}/></td>
                  <td style={t.td}><button style={s.dispBtn}>Dispense</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </SectionCard>

        <div style={s.rightCol}>
          <SectionCard title="Low Stock Alert ⚠️">
            <div style={s.stockList}>
              {[['Paracetamol 500mg','12 units','#ef4444'],['Ibuprofen 400mg','28 units','#f59e0b'],['Amoxicillin 500mg','35 units','#f59e0b']].map(([name,stock,color]) => (
                <div key={name} style={s.stockRow}>
                  <div>
                    <div style={s.stockName}>{name}</div>
                    <div style={{...s.stockQty, color}}>{stock} remaining</div>
                  </div>
                  <button style={s.reorderBtn}>Reorder</button>
                </div>
              ))}
            </div>
          </SectionCard>
          <SectionCard title="Today's Summary">
            {[['Orders received','31'],['Dispensed','24'],['Pending','7'],['Revenue','LKR 45,200']].map(([k,v]) => (
              <div key={k} style={s.summaryRow}>
                <span style={s.summaryKey}>{k}</span>
                <span style={s.summaryVal}>{v}</span>
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
  banner:     { background:'linear-gradient(135deg,#2e1065,#7c3aed)', borderRadius:16, padding:'2rem', color:'#fff', display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'1.75rem' },
  bannerTitle:{ margin:0, fontSize:24, fontWeight:800 },
  bannerSub:  { margin:'6px 0 0', color:'rgba(255,255,255,0.75)', fontSize:13 },
  statsGrid:  { display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'1rem', marginBottom:'1.75rem' },
  grid:       { display:'grid', gridTemplateColumns:'1.5fr 1fr', gap:'1.5rem' },
  patName:    { fontWeight:700, color:'#0f172a' },
  qty:        { background:'#f1f5f9', borderRadius:6, padding:'2px 8px', fontWeight:700, fontSize:12 },
  doc:        { color:'#64748b', fontSize:12 },
  dispBtn:    { background:'#f5f3ff', color:'#7c3aed', border:'1px solid #ddd6fe', borderRadius:7, padding:'5px 12px', fontSize:12, fontWeight:600, cursor:'pointer' },
  rightCol:   { display:'flex', flexDirection:'column', gap:'1.25rem' },
  stockList:  { padding:'0.5rem 0' },
  stockRow:   { display:'flex', justifyContent:'space-between', alignItems:'center', padding:'0.875rem 1.5rem', borderBottom:'1px solid #f8fafc' },
  stockName:  { fontWeight:600, fontSize:13, color:'#0f172a' },
  stockQty:   { fontSize:12, fontWeight:600, marginTop:2 },
  reorderBtn: { background:'#f5f3ff', color:'#7c3aed', border:'none', borderRadius:7, padding:'5px 12px', fontSize:12, fontWeight:600, cursor:'pointer' },
  summaryRow: { display:'flex', justifyContent:'space-between', padding:'0.875rem 1.5rem', borderBottom:'1px solid #f8fafc' },
  summaryKey: { fontSize:13, color:'#64748b' },
  summaryVal: { fontSize:13, fontWeight:700, color:'#0f172a' },
};

export default PharmacyDashboard;
