import type { Accordion as AccordionProps } from '@/payload-types'

type Props = {
  className?: string
} & AccordionProps

export const AccordionBlock: React.FC<Props> = (props) => {
  const { headline, text, accordions } = props

  return (
    <section className="py-28">
      <div className="container">
        <h2>{headline}</h2>
        <p className="max-w-[80%]">{text}</p>
        <div className="flex max-w-[80%] min-w-[18rem] flex-wrap items-center justify-center gap-2 overflow-x-hidden">
          {accordions?.map((entry, index) => {
            return (
              <details
                key={index}
                className="collapse collapse-plus border border-base-300"
                name="accordion-details"
                open={index === 0}
              >
                <summary className="collapse-title font-semibold">{entry.title}</summary>
                <div className="collapse-content text-sm">{entry.text}</div>
              </details>
            )
          })}
        </div>
      </div>
    </section>
  )
}
