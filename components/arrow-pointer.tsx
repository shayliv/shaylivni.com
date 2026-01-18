export function ArrowPointer() {
  return (
    <div className="absolute top-8 right-12 md:right-16 z-30 animate-bounce">
      <div className="relative">
        <div
          className="absolute -top-4 right-0 font-bold text-5xl md:text-6xl text-accent transform -rotate-12"
          style={{ fontFamily: "Comic Sans MS, cursive" }}
        >
          me
        </div>

        <svg
          width="140"
          height="160"
          viewBox="0 0 140 160"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute top-10 right-8"
        >
          {/* Smooth curvy arrow path from text */}
          <path
            d="M100 20 Q 85 40, 75 55 Q 65 70, 55 85 Q 48 100, 42 115 Q 38 125, 35 135"
            stroke="currentColor"
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            className="text-accent"
          />
          {/* Rounded arrow head */}
          <path
            d="M35 135 Q 30 125, 25 120 M35 135 Q 45 130, 50 128"
            stroke="currentColor"
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-accent"
          />
        </svg>
      </div>
    </div>
  )
}
