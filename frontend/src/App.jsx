import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Gallery from './pages/Gallery';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// Admin Components
import AdminLayout from "./layout/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import HeroSettingsAdmin from "./pages/admin/HeroSettingsAdmin";
import ProcessSettingsAdmin from "./pages/admin/ProcessSettingsAdmin";
import WhyChooseUsAdmin from "./pages/admin/WhyChooseUsAdmin";
import AboutSettingsAdmin from "./pages/admin/AboutSettingsAdmin";
import FooterSettingsAdmin from "./pages/admin/FooterSettingsAdmin";  // 🔥 ADD THIS
import ServicesAdmin from "./pages/admin/ServicesAdmin";
import FAQsAdmin from "./pages/admin/FAQsAdmin";
import GalleriesAdmin from "./pages/admin/GalleriesAdmin";
import ContactsAdmin from "./pages/admin/ContactsAdmin";
import QuotesAdmin from "./pages/admin/QuotesAdmin";

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/about" element={<Layout><About /></Layout>} />
        <Route path="/services" element={<Layout><Services /></Layout>} />
        <Route path="/gallery" element={<Layout><Gallery /></Layout>} />
        <Route path="/faq" element={<Layout><FAQ /></Layout>} />
        <Route path="/contact" element={<Layout><Contact /></Layout>} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Admin Routes */}
        <Route path="/admin" element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }>
          <Route index element={<Dashboard />} />
          <Route path="hero" element={<HeroSettingsAdmin />} />
          <Route path="process" element={<ProcessSettingsAdmin />} />
          <Route path="why-choose-us" element={<WhyChooseUsAdmin />} />
          <Route path="about" element={<AboutSettingsAdmin />} />
          <Route path="footer" element={<FooterSettingsAdmin />} />  {/* 🔥 ADD THIS */}
          <Route path="services" element={<ServicesAdmin />} />
          <Route path="faqs" element={<FAQsAdmin />} />
          <Route path="galleries" element={<GalleriesAdmin />} />
          <Route path="contacts" element={<ContactsAdmin />} />
          <Route path="quotes" element={<QuotesAdmin />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;