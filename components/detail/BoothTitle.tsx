type Props = {
  name: string
  categories: string[]
  info: string
}

export default function BoothTitle({ name, categories, info }: Props) {
  return (
      <div className="flex flex-col gap-3 mt-[15px]">
        <div className="flex items-center gap-6">
            <span className="text-xl font-semibold">{name}</span>
            <div className="flex gap-2">
            {categories.map((category) => (
                <span
                key={category}
                className="w-[68px] p-2.5 text-center text-base border border-primary text-primary rounded-[43px]"
                >
                {category}
                </span>
            ))}
            </div>
        </div>
        <p className="max-h-19 text-base text-text-sub">{info}</p>
      </div>
  )
}