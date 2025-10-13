import { Info } from 'lucide-react'

export function StatusAlert({ text, variant }: { text: string; variant: string }) {
  return (
    <div className="p-4 pl-5 mb-4 rounded bg-cyan-950/50 border-cyan-500/50 border-1 flex gap-5 items-center">
      {variant === 'info' && <Info />}
      <p>{text}</p>
    </div>
  )
}
