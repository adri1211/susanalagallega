import type { Metadata } from 'next';
import { AdminSidebar } from '@/components/admin/AdminSidebar';

export const metadata: Metadata = {
  title: 'Admin | Susana La Gallega',
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F5F5F3] flex">
      <AdminSidebar />
      <main className="flex-1 ml-0 lg:ml-64 min-h-screen">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 lg:py-10">
          {children}
        </div>
      </main>
    </div>
  );
}
