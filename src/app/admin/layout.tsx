import type { Metadata } from 'next';
import { headers } from 'next/headers';
import { AdminSidebar } from '@/components/admin/AdminSidebar';

export const metadata: Metadata = {
  title: 'Admin | Susana La Gallega',
  robots: { index: false, follow: false },
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const headersList = await headers();
  const pathname = headersList.get('x-pathname') || '';
  const isAuthPage = pathname === '/admin/login' || pathname === '/admin/register';

  if (isAuthPage) {
    return (
      <div style={{ minHeight: '100vh', background: '#1a2d4a', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }}>
        {children}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F4F3E4] flex">
      <AdminSidebar />
      <main className="flex-1 ml-0 lg:ml-64 min-h-screen">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 lg:py-10">
          {children}
        </div>
      </main>
    </div>
  );
}
