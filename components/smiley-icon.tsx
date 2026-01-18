export function SmileyIcon({ className = "" }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <circle cx="50" cy="50" r="48" fill="currentColor" stroke="#1a1a1a" strokeWidth="3" />
        <circle cx="35" cy="40" r="5" fill="#1a1a1a" />
        <circle cx="65" cy="40" r="5" fill="#1a1a1a" />
        <path d="M 30 60 Q 50 75 70 60" fill="none" stroke="#1a1a1a" strokeWidth="3" strokeLinecap="round" />
      </svg>
    </div>
  )
}
