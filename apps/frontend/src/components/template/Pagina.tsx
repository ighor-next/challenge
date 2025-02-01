export interface PaginaProps {
  children: any
  className?: string
  semCabecalho?: boolean
  semRodape?: boolean
}

export default function Pagina(props: PaginaProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <div
        className="flex-1 flex flex-col w-screen py-20"
        // style={{ background: 'url("/background.png")' }}
        style={{
          background:
            'radial-gradient(50% 50% at 50% 50%, #171717 0%, #121214 100%)'
        }}
      >
        <main className={` ${props.className ?? ''}`}>{props.children}</main>
      </div>
    </div>
  )
}
