export function getFciStatusBadge(status: string) {
  switch (status) {
    case 'recognized':
      return <div className="badge badge-success mt-1">Endgültig anerkannt</div>
    case 'provisional':
      return <div className="badge badge-warning">Provisorisch anerkannt</div>
    case 'not_recognized':
      return <div className="badge badge-error">Nicht anerkannt</div>
    default:
      return null
  }
}
