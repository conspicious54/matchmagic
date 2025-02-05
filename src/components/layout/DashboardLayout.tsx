import { useState } from 'react';
import { DashboardTopBar } from '../portal/DashboardTopBar';
import { ModelSidebar } from '../portal/ModelSidebar';
import { Camera, Image, Layout, Menu } from 'lucide-react';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
        <main className={`flex-1 p-8 md:ml-80 pb-24 md:pb-8 ${isMobileMenuOpen ? 'hidden' : 'block'}`}>
          {children}
        </main>

        {/* Mobile Sidebar Overlay - Centered Content */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setIsMobileMenuOpen(false)}>
            <div className="absolute inset-0 flex items-center justify-center p-4" onClick={e => e.stopPropagation()}>
              <div className="w-full max-w-md bg-[#0A0A0F] rounded-xl overflow-hidden">
                <ModelSidebar />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-900/95 border-t border-gray-800 md:hidden backdrop-blur-xl z-50">
        <div className="flex items-center justify-around h-16">
          <button
            onClick={() => {
              setActiveTab('content');
              setIsMobileMenuOpen(false);
            }}
            className={`flex flex-col items-center justify-center flex-1 h-full space-y-1 ${
              activeTab === 'content' ? 'text-pink-500' : 'text-gray-400'
            }`}
          >
            <Layout className="w-5 h-5" />
            <span className="text-xs">Dashboard</span>
          </button>
          
          <button
            onClick={() => {
              setActiveTab('sidebar');
              setIsMobileMenuOpen(true);
            }}
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