import type React from "react"
export function WavyBorder({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ filter: "drop-shadow(2px 2px 0px rgb(0 0 0 / 1))" }}
      >
        <rect
          x="2"
          y="2"
          width="calc(100% - 4px)"
          height="calc(100% - 4px)"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          vectorEffect="non-scaling-stroke"
          style={{
            strokeDasharray: "10 10",
            strokeLinecap: "round",
          }}
        />
      </svg>
      <div className="relative p-8 md:p-12">{children}</div>
    </div>
  )
}
