'use client'

import { useFormFields } from '@payloadcms/ui'

export function ColorBox() {
  const backgroundColor = useFormFields(([fields]) => {
    // Find the backgroundColor field in the block context
    let bgValue = null

    // Look for content.X.backgroundColor pattern
    Object.entries(fields || {}).forEach(([key, field]) => {
      if (key.includes('backgroundColor') && field?.value) {
        bgValue = field.value
      }
    })

    return typeof bgValue === 'string' ? bgValue : 'var(--frontend-base-200)'
  })

  const displayColor = backgroundColor || 'var(--frontend-base-200)'

  return (
    <div className="mb-4">
      <label className="field-label">Farbvorschau</label>
      <div className="rounded h-10" style={{ backgroundColor: displayColor }}></div>
    </div>
  )
}
