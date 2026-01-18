export function MarqueeBanner({ text, className = "" }: { text: string; className?: string }) {
  return (
    <div className={`overflow-hidden bg-secondary border-y-4 border-foreground py-3 ${className}`}>
      <div className="flex animate-marquee whitespace-nowrap">
        {[...Array(10)].map((_, i) => (
          <span key={i} className="mx-8 text-xl md:text-2xl font-heading font-bold uppercase tracking-wide">
            {text} <span className="inline-block w-2 h-2 bg-foreground rounded-full mx-4" />
          </span>
        ))}
      </div>
    </div>
  )
}
