function SkeletonCard() {
  return (
    <div className="ml-[30px] flex items-center gap-[13px] p-2.5 rounded-[10px] bg-white border border-text-sub2">
      <div className="w-[76px] h-[76px] rounded-[10px] bg-gray-200 animate-pulse shrink-0" />
      <div className="flex flex-col gap-3 flex-1 min-w-0">
        <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
        <div className="h-6 w-36 bg-gray-200 rounded animate-pulse" />
      </div>
    </div>
  );
}

function SkeletonSection({ cards = 3 }: { cards?: number }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2 items-start">
        <div className="w-[25px] h-[25px] rounded bg-gray-200 animate-pulse shrink-0" />
        <div className="flex flex-col gap-[2px] flex-1">
          <div className="h-7 w-28 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 w-44 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>
      {Array.from({ length: cards }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}

export default function Loading() {
  return (
    <main className="flex flex-col gap-12 mb-15">
      {/* ImageSwiper */}
      <div className="flex flex-col gap-2">
        <div className="px-[8.33%]">
          <div className="aspect-square w-full rounded-[10px] bg-gray-200 animate-pulse" />
        </div>
        <div className="flex justify-center gap-1.5 mt-2">
          <div className="w-5 h-2 rounded-full bg-gray-300 animate-pulse" />
          <div className="w-2 h-2 rounded-full bg-gray-200 animate-pulse" />
          <div className="w-2 h-2 rounded-full bg-gray-200 animate-pulse" />
        </div>
      </div>

      {/* NoticeBanner + StampShortcutButton */}
      <div className="flex flex-col px-4 gap-2">
        <div className="h-10 rounded-[10px] bg-gray-200 animate-pulse" />
        <div className="h-[106px] rounded-[10px] bg-gray-200 animate-pulse" />
      </div>

      {/* StageSection / BoothSection / FoodSection */}
      <section className="flex flex-col px-4 gap-8">
        <SkeletonSection cards={2} />
        <SkeletonSection cards={3} />
        <SkeletonSection cards={3} />
      </section>
    </main>
  );
}
