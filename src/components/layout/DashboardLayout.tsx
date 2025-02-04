import { DashboardTopBar } from '../portal/DashboardTopBar';
import { ModelSidebar } from '../portal/ModelSidebar';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-[#0A0A0F]">
      {/* Top Bar */}
      <DashboardTopBar />

      {/* Main Layout */}
      <div className="pt-16 flex min-h-screen">
        {/* Sidebar */}
        <ModelSidebar />

        {/* Main Content */}
        <main className="flex-1 p-8 ml-80">
          {children}
        </main>
      </div>
    </div>
  );
}