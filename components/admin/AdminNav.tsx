"use client"
import React from 'react'
import Container from '../Container'
import Link from 'next/link'
import AdminNavItem from './AdminNavItem'
import { MdDashboard, MdDns, MdFormatListBulleted, MdLibraryAdd } from 'react-icons/md'
import { usePathname } from 'next/navigation'

const AdminNav = () => {
    const pathname = usePathname();
  return (
    <div className='w-full shadow-sm to-20% border-b-[1px] pt-4'>
        <Container>
            <div className="flex flex-row items-center justify-between md:justify-center gap-8 md:gap-12 overflow-x-auto flex-nowrap">
                <Link href={`/admin`}>
                    <AdminNavItem label='Summary' icon={MdDashboard} selected={pathname === '/admin'}/>
                </Link>
                <Link href={`/admin/add-products`}>
                    <AdminNavItem label='Add Products' icon={MdLibraryAdd} selected={pathname === '/add-product'}/>
                </Link>
                <Link href={`/admin/mange-products`}>
                    <AdminNavItem label='Mange Product' icon={MdDns} selected={pathname === '/admin/mange-products'}/>
                </Link>
                <Link href={`/admin/manage-orders`}>
                    <AdminNavItem label='Order' icon={MdFormatListBulleted} selected={pathname === '/admin/manage-orders'}/>
                </Link>
            </div>
        </Container>
    </div>
  )
}

export default AdminNav