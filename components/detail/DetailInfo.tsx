type Props = {
  location: string
  date: string[]
}

export default function DetailInfo({ location, date }: Props) {
  return (
    <div className="flex gap-13 py-6 text-base border-y border-text-sub">
      <div className="flex flex-col gap-5 text-text-sub font-semibold shrink-0">
        <span>위치</span>
        <span>운영시간</span>
      </div>
      <div className="flex flex-col gap-5">
        <span>{location}</span>
        <div className="flex flex-col gap-2">
          {date.map((d, index) => (
            <span key={index}>{d}</span>
          ))}
        </div>
      </div>
    </div>
  )
}