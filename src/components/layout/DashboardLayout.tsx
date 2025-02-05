import { useState } from 'react';
import { DashboardTopBar } from '../portal/DashboardTopBar';
import { ModelSidebar } from '../portal/ModelSidebar';
import { Camera, Layout } from 'lucide-react';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [activeTab, setActiveTab] = useState<'content' | 'sidebar'>('content');

  return (
    <div className="min-h-screen bg-[#0A0A0F]">
      {/* Top Bar */}
      <DashboardTopBar />

      {/* Main Layout */}
      <div className="pt-16 flex min-h-screen">
        {/* Sidebar - Hidden on mobile */}
        <div className="hidden md:block">
          <ModelSidebar />
        </div>

        {/* Main Content */}
        <main className={`flex-1 p-8 md:ml-80 pb-24 md:pb-8 ${activeTab === 'sidebar' ? 'hidden' : 'block'} md:block`}>
          {children}
        </main>

        {/* Mobile Create Tab Content */}
        {activeTab === 'sidebar' && (
          <div className="w-full md:hidden">
            <ModelSidebar />
          </div>
        )}
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-900/95 border-t border-gray-800 md:hidden backdrop-blur-xl z-50">
        <div className="flex items-center justify-around h-16">
          <button
            onClick={() => setActiveTab('content')}
            className={`flex flex-col items-center justify-center flex-1 h-full space-y-1 ${
              activeTab === 'content' ? 'text-pink-500' : 'text-gray-400'
            }`}
          >
            <Layout className="w-5 h-5" />
            <span className="text-xs">Dashboard</span>
          </button>
          
          <button
            onClick={() => setActiveTab('sidebar')}
            className={`flex flex-col items-center justify-center flex-1 h-full space-y-1 ${
              activeTab === 'sidebar' ? 'text-pink-500' : 'text-gray-400'
            }`}
          >
            <Camera className="w-5 h-5" />
            <span className="text-xs">Create</span>
          </button>
        </div>
      </div>
    </div>
  );
}