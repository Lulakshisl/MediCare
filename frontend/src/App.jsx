import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import PatientDashboard from './pages/patient/Dashboard';
import DoctorDashboard from './pages/doctor/Dashboard';
import PharmacyDashboard from './pages/pharmacy/Dashboard';
import AdminDashboard from './pages/admin/Dashboard';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/patient" element={
            <ProtectedRoute roles={['patient']}><PatientDashboard /></ProtectedRoute>
          }/>
          <Route path="/doctor" element={
            <ProtectedRoute roles={['doctor']}><DoctorDashboard /></ProtectedRoute>
          }/>
          <Route path="/pharmacy" element={
            <ProtectedRoute roles={['pharmacist']}><PharmacyDashboard /></ProtectedRoute>
          }/>
          <Route path="/admin" element={
            <ProtectedRoute roles={['admin']}><AdminDashboard /></ProtectedRoute>
          }/>
          <Route path="/unauthorized" element={
            <div style={{textAlign:'center',marginTop:'20%',color:'#ef4444',fontFamily:'Inter,sans-serif'}}>
              <h2>403 — Access Denied</h2>
              <p style={{color:'#64748b',marginTop:8}}>You don't have permission to view this page.</p>
            </div>
          }/>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
