import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'
import Footer from '@/components/footer/Footer'
import CartProvider from '@/providers/CartProvider'
import { Toaster } from 'react-hot-toast'
import { getCurrentUser } from '@/actions/getCurrentUser'
import Navbar from '@/components/nav/Navbar'

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '700'] })

export const metadata: Metadata = {
  title: 'E-Shop',
  description: 'ECommerce app',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser()
  return (
    <html lang="en">
      <body className={`${poppins.className} text-slate-700`}>
        <Toaster toastOptions={{
          style: { background: 'rgb(51 65 85)', color: '#fff'}
        }} />
        <CartProvider>
          <div className=" flex flex-col max-h-screen">
            <Navbar />
            <main className=' flex-grow'>{children}</main>
            <Footer />
          </div>
        </CartProvider> 
      </body>
    </html>
  )
}
