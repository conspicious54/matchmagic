import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardTopBar } from '../portal/DashboardTopBar';
import { ModelSidebar } from '../portal/ModelSidebar';
import { Camera, Layout } from 'lucide-react';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0A0A0F]">
      {/* Top Bar */}
      <DashboardTopBar />

      {/* Main Layout */}
      <div className="pt-16 flex min-h-[calc(100vh-4rem)]">
        {/* Sidebar - Hidden on mobile */}
        <div className="hidden md:block w-80 flex-shrink-0">
          <ModelSidebar />
        </div>

        {/* Main Content */}
        <div className="flex-1 md:ml-80">
          <div className="max-w-[1400px] mx-auto p-4 md:p-8 pb-24 md:pb-8">
            {children}
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-900/95 border-t border-gray-800 md:hidden backdrop-blur-xl z-50">
        <div className="flex items-center justify-around h-16">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex flex-col items-center justify-center flex-1 h-full space-y-1 text-gray-400"
          >
            <Layout className="w-5 h-5" />
            <span className="text-xs">Dashboard</span>
          </button>
          
          <button
            onClick={() => navigate('/create')}
            className="flex flex-col items-center justify-center flex-1 h-full space-y-1 text-gray-400"
          >
            <Camera className="w-5 h-5" />
            <span className="text-xs">Create</span>
          </button>
        </div>
      </div>
    </div>
  );
}