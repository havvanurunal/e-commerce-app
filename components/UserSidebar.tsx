'use client';

import Link from 'next/link';
import { User, ShoppingCart } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

const menuItems = [
  { href: '/user/profile', label: 'Profile', icon: User },
  { href: '/user/orders', label: 'Orders', icon: ShoppingCart },
];

export function UserSidebar() {
  const pathname = usePathname();
  const { isMobile, setOpenMobile } = useSidebar();

  useEffect(() => {
    if (isMobile) {
      setOpenMobile(false);
    }
  }, [pathname]);
  return (
    <Sidebar className='rounded-lg overflow-hidden border border-gray-200 bg-white sticky'>
      <SidebarHeader className='px-4 py-5 border-b-2 border-gray-200'>
        <Link
          href='/admin'
          className='text-base font-semibold text-gray-900 tracking-tight'
        >
          My Profile
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton asChild>
                    <Link
                      href={item.href}
                      className='flex items-center gap-3 text-gray-600 hover:text-gray-900  hover:bg-gray-100 px-4 py-2'
                    >
                      <item.icon size={16} />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
