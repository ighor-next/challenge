import { Header } from '@/components/header'

export default function PanelLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <Header />
      <section className="container mx-auto flex h-auto w-full max-w-6xl flex-1 flex-col gap-6 py-10">
        {children}
      </section>
    </main>
  )
}
