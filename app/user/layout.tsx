import type { ReactNode } from 'react';
import { requireUser } from '@/lib/authz';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { UserSidebar } from '@/components/UserSidebar';

export default async function UserLayout({
  children,
}: {
  children: ReactNode;
}) {
  await requireUser();

  return (
    <div className='min-h-screen bg-gray-50 text-gray-900'>
      <SidebarProvider>
        <main className='mx-auto flex w-full max-w-7xl gap-4 px-6 py-6 md:gap-6 md:py-8'>
          <UserSidebar />
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
