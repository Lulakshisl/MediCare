export function StatCard({ icon, label, value, color='#0284c7', trend, sub }) {
  return (
    <div style={s.card}>
      <div style={s.top}>
        <div>
          <div style={s.value}>{value}</div>
          <div style={s.label}>{label}</div>
          {sub && <div style={s.sub}>{sub}</div>}
        </div>
        <div style={{...s.iconBox, background:`${color}15`}}>
          <span style={{fontSize:26}}>{icon}</span>
        </div>
      </div>
      {trend !== undefined && (
        <div style={{...s.trend, color: trend >= 0 ? '#10b981' : '#ef4444'}}>
          {trend >= 0 ? '↑' : '↓'} {Math.abs(trend)}% from last month
        </div>
      )}
    </div>
  );
}

export function SectionCard({ title, action, children }) {
  return (
    <div style={c.card}>
      <div style={c.header}>
        <h3 style={c.title}>{title}</h3>
        {action && <div>{action}</div>}
      </div>
      <div>{children}</div>
    </div>
  );
}

export function Badge({ status }) {
  const map = {
    pending:   ['#fef9c3','#854d0e','#eab308'],
    confirmed: ['#dcfce7','#166534','#22c55e'],
    completed: ['#dbeafe','#1e40af','#3b82f6'],
    cancelled: ['#fee2e2','#991b1b','#ef4444'],
    active:    ['#dcfce7','#166534','#22c55e'],
    dispensed: ['#dbeafe','#1e40af','#3b82f6'],
    ordered:   ['#fef9c3','#854d0e','#eab308'],
  };
  const [bg, text, dot] = map[status] || map.pending;
  return (
    <span style={{background:bg, color:text, borderRadius:20, padding:'4px 12px', fontSize:12, fontWeight:600, display:'inline-flex', alignItems:'center', gap:5}}>
      <span style={{width:6, height:6, borderRadius:'50%', background:dot}}/>
      {status.charAt(0).toUpperCase()+status.slice(1)}
    </span>
  );
}

export function PrimaryBtn({ children, color='#0284c7', onClick, small }) {
  return (
    <button style={{background:color, color:'#fff', border:'none', borderRadius:8,
      padding: small ? '6px 14px' : '10px 20px',
      fontSize: small ? 12 : 14, fontWeight:600, cursor:'pointer'}}
      onClick={onClick}>
      {children}
    </button>
  );
}

export function Table({ headers, rows }) {
  return (
    <table style={t.table}>
      <thead>
        <tr>{headers.map(h => <th key={h} style={t.th}>{h}</th>)}</tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i} style={t.tr}>
            {row.map((cell, j) => <td key={j} style={t.td}>{cell}</td>)}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

const s = {
  card:    { background:'#fff', borderRadius:14, padding:'1.5rem', border:'1px solid #e2e8f0', boxShadow:'0 1px 3px rgba(0,0,0,0.04)' },
  top:     { display:'flex', justifyContent:'space-between', alignItems:'flex-start' },
  value:   { fontSize:32, fontWeight:800, color:'#0f172a', lineHeight:1 },
  label:   { fontSize:14, color:'#374151', fontWeight:600, marginTop:6 },
  sub:     { fontSize:12, color:'#94a3b8', marginTop:3 },
  iconBox: { width:56, height:56, borderRadius:14, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 },
  trend:   { fontSize:12, fontWeight:600, marginTop:12, paddingTop:12, borderTop:'1px solid #f1f5f9' },
};
const c = {
  card:   { background:'#fff', borderRadius:14, border:'1px solid #e2e8f0', boxShadow:'0 1px 3px rgba(0,0,0,0.04)', overflow:'hidden' },
  header: { display:'flex', justifyContent:'space-between', alignItems:'center', padding:'1.25rem 1.5rem', borderBottom:'1px solid #f1f5f9' },
  title:  { margin:0, fontSize:15, fontWeight:700, color:'#0f172a' },
};
const t = {
  table: { width:'100%', borderCollapse:'collapse' },
  th:    { textAlign:'left', padding:'10px 16px', fontSize:11, fontWeight:700, color:'#94a3b8', textTransform:'uppercase', letterSpacing:'0.6px', background:'#f8fafc', borderBottom:'1px solid #e2e8f0' },
  tr:    { borderBottom:'1px solid #f8fafc', transition:'background 0.1s' },
  td:    { padding:'12px 16px', fontSize:13, color:'#374151', verticalAlign:'middle' },
};
