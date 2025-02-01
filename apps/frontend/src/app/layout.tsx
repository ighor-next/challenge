import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import './globals.css'

const font = Roboto({
  subsets: ['latin'],
  weight: ['400', '700']
})

export const metadata: Metadata = {
  title: 'Tarefas',
  description: 'Gerenciador de Tarefas'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={font.className}>{children}</body>
    </html>
  )
}
