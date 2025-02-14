import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CreateModelPage from './pages/CreateModelPage';
import PricingPage from './pages/PricingPage';
import PricingSubscribePage from './pages/PricingSubscribePage';
import AuthCallbackPage from './pages/AuthCallbackPage';
import DashboardPage from './pages/DashboardPage';
import GeneratingPage from './pages/GeneratingPage';
import TermsPage from './pages/TermsPage';
import PrivacyPage from './pages/PrivacyPage';
import AddCreditsPage from './pages/AddCreditsPage';
import ManagePlanPage from './pages/ManagePlanPage';
import CreatePage from './pages/CreatePage';
import { ProtectedRoute } from './components/auth/ProtectedRoute';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/create-model" element={
        <ProtectedRoute>
          <CreateModelPage />
        </ProtectedRoute>
      } />
      <Route path="/create" element={
        <ProtectedRoute>
          <CreatePage />
        </ProtectedRoute>
      } />
      <Route path="/generating" element={
        <ProtectedRoute>
          <GeneratingPage />
        </ProtectedRoute>
      } />
      <Route path="/pricing" element={<PricingPage />} />
      <Route path="/pricing/subscribe" element={
        <ProtectedRoute>
          <PricingSubscribePage />
        </ProtectedRoute>
      } />
      <Route path="/auth/callback" element={<AuthCallbackPage />} />
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <DashboardPage />
        </ProtectedRoute>
      } />
      <Route path="/add-credits" element={
        <ProtectedRoute>
          <AddCreditsPage />
        </ProtectedRoute>
      } />
      <Route path="/manage-plan" element={
        <ProtectedRoute>
          <ManagePlanPage />
        </ProtectedRoute>
      } />
      <Route path="/terms" element={<TermsPage />} />
      <Route path="/privacy" element={<PrivacyPage />} />
    </Routes>
  );
}

export default App;