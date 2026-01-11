import type { Accordion as AccordionProps } from '@/payload-types'

type Props = {
  className?: string
} & AccordionProps

export const AccordionBlock: React.FC<Props> = (props) => {
  const { title, text, accordions } = props

  return (
    <section className="py-28">
      <div className="container">
        <h2>{title}</h2>
        <p className="max-w-[80%]">{text}</p>
        <div className="flex max-w-[80%] min-w-[18rem] flex-wrap items-center justify-center gap-2 overflow-x-hidden">
          {accordions?.map((entry, index) => {
            return (
              <div
                key={index}
                className="collapse collapse-plus bg-base-100 border border-base-300"
              >
                <input type="radio" name="my-accordion-3" />
                <div className="collapse-title font-semibold">{entry.title}</div>
                <div className="collapse-content text-sm">{entry.text}</div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
