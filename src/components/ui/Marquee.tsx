export default function Marquee({ text }: { text: string }) {
  return (
    <div className="overflow-hidden flex-1 min-w-0 group @container">
      <div className="flex animate-marquee w-max">
        <span className="shrink-0 min-w-[100cqi] whitespace-nowrap group-hover:[animation-play-state:paused]">
          {text}
        </span>
        <span className="shrink-0 min-w-[100cqi] whitespace-nowrap group-hover:[animation-play-state:paused]" aria-hidden="true">
          {text}
        </span>
      </div>
    </div>
  );
}
