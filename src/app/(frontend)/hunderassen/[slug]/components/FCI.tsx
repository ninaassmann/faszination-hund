import type { Dogbreed } from '@/payload-types'
import { getFciStatusBadge } from '@/utils/fcibadges'

type Props = {
  fci?: Dogbreed['fci'] // optional
}

export function FCI({ fci }: Props) {
  if (!fci) return null // nichts rendern, wenn fci fehlt

  const {
    fciGroup,
    fciSection,
    fciStatus,
    fciAcceptanceDate,
    fciPublicationDate,
    fciSource,
    fciSourcePDF,
  } = fci

  return (
    <section className="mt-20 flex flex-col gap-2 card bg-base-100 shadow-sm overflow-clip">
      <div className="card-body justify-between">
        <div className="flex justify-between">
          <h2 className="max-w-2/3">FCI Informationen</h2>
          {fciStatus && getFciStatusBadge(fciStatus)}
        </div>
        {fciGroup && typeof fciGroup !== 'number' && <span>{fciGroup.name}</span>}

        {fciSection && typeof fciSection !== 'number' && <span>{fciSection.name}</span>}

        {fciAcceptanceDate && <span>Akzeptanz: {new Date(fciAcceptanceDate).getFullYear()}</span>}
        {fciPublicationDate && (
          <span>Publikation: {new Date(fciPublicationDate).getFullYear()}</span>
        )}

        <div className="card-actions justify-end">
          <div className="flex flex-wrap gap-2">
            {fciSource && (
              <a
                href={fciSource}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-soft"
              >
                FCI Website
              </a>
            )}
            {fciSourcePDF && (
              <a
                href={fciSourcePDF}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-soft"
              >
                PDF
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
