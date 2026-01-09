export function ColorBox({ color }: { color: string }) {
  return <div className={`p-4 mb-4 rounded bg-${color}`}></div>
}
