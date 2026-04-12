import type { ReactNode } from 'react';
import { requireAdmin } from '@/lib/authz';
import { AdminSidebar } from '@/components/AdminSidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  await requireAdmin();

  return (
    <div className='min-h-screen bg-gray-50 text-gray-900'>
      <SidebarProvider>
        <main className='mx-auto flex w-full max-w-7xl gap-4 px-6 py-6 md:gap-6 md:py-8'>
          <AdminSidebar />
          <SidebarInset>
            <section className='flex-1 rounded-2xl border border-gray-200 bg-white p-4 md:p-6'>
              {children}
            </section>
          </SidebarInset>
        </main>
      </SidebarProvider>
    </div>
  );
}
