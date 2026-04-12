'use client';

import Link from 'next/link';
import { LayoutGrid, PlusSquare, ShoppingCart, Settings } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

const menuItems = [
  { href: '/admin/products', label: 'Products', icon: LayoutGrid },
  { href: '/admin/products/new', label: 'Add new product', icon: PlusSquare },
  { href: '/admin/orders', label: 'Orders', icon: ShoppingCart },
];

export function AdminSidebar() {
  return (
    <Sidebar
      collapsible='none'
      className='rounded-2xl border border-gray-200 bg-white'
    >
      <SidebarHeader className='px-4 py-5 border-b border-gray-200'>
        <Link
          href='/admin'
          className='text-base font-semibold text-gray-900 tracking-tight'
        >
          Admin Panel
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
