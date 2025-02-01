import { ModeToggle } from '../modo-toggle'

export function Header() {
  return (
    <header className="w-full border-b border-b-muted px-10 py-4">
      <div className="flex justify-end">
        <ModeToggle />
      </div>
    </header>
  )
}
