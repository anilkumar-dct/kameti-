import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import LoginPage from './components/Pages/LoginPage'
import DashboardPage from './components/Pages/DashboardPage'
import UsersPage from './components/Pages/UsersPage'
import KametiPage from './components/Pages/KametiPage'
import EnrollmentPage from './components/Pages/EnrollmentPage'
import PaymentPage from './components/Pages/PaymentPage'
import WithdrawalPage from './components/Pages/WithdrawalPage'
import SettingPage from './components/Pages/SettingPage'
import ImportPage from './components/Pages/ImportPage'

function App(): React.JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login Route */}
        <Route path="/login" element={<LoginPage />} />

        {/* Root redirect to login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Protected Routes with Layout */}
        <Route element={<Layout />}>
          <Route path="Dashboard" element={<DashboardPage />} />
          <Route path="Users" element={<UsersPage />} />
          <Route path="Kameti" element={<KametiPage />} />
          <Route path="Enrollment" element={<EnrollmentPage />} />
          <Route path="Payment" element={<PaymentPage />} />
          <Route path="withdrawls" element={<WithdrawalPage />} />
          <Route path="Setting" element={<SettingPage />} />
          <Route path="Import" element={<ImportPage />} />
        </Route>

        {/* Default redirect */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
