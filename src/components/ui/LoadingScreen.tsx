'use client'

export default function LoadingScreen() {
  return (
    <main className="flex items-center justify-center min-h-screen">
      <div className="flex items-center gap-3">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="w-2 h-2 rounded-full bg-primary"
            style={{
              animation: "dot-fade 1.2s ease-in-out infinite",
              animationDelay: `${i * 0.3}s`,
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes dot-fade {
          0%, 100% { opacity: 0.2; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.2); }
        }
      `}</style>
    </main>
  );
}
