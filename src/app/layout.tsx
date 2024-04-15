import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ConfigProvider } from 'antd'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ConfigProvider theme={{hashed: false, token: {
          fontFamily: 'inherit',
          colorPrimary: 'black',
          fontSize: 16, 
        }
        }}>
          {children}
        </ConfigProvider>
      </body>
    </html>
  )
}
