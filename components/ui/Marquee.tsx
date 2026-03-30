export default function Marquee({ text }: { text: string }) {
  return (
    <div className="overflow-hidden whitespace-nowrap hover:[animation-play-state:paused] w-full p-[10px] rounded-[10px] bg-white text-black">
      <span className="inline-block animate-marquee">
        {text}&nbsp;&nbsp;&nbsp;&nbsp;{text}&nbsp;&nbsp;&nbsp;&nbsp;{text}
      </span>
    </div>
  );
}