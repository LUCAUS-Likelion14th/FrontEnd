export default function Marquee({ text }: { text: string }) {
  return (
    <div className="overflow-hidden group">
      <span className="inline-block animate-marquee group-hover:[animation-play-state:paused]">
        {text}&nbsp;&nbsp;&nbsp;&nbsp;{text}&nbsp;&nbsp;&nbsp;&nbsp;{text}
      </span>
    </div>
  );
}
