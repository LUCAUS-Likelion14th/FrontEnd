export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-32">
      <div className="w-10 h-10 rounded-full border-[3px] border-text-sub2 border-t-primary animate-spin" />
      <p className="text-text-sub text-sm font-medium">불러오는 중 ..</p>
    </div>
  );
}
