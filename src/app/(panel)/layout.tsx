import { Header } from '@/components/header'

export default function PanelLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <Header />
      <section className="container mx-auto mt-10 flex h-auto w-full flex-col gap-4">
        {children}
      </section>
    </main>
  )
}
