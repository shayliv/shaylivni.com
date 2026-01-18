export function DeskIllustration() {
  return (
    <div className="w-full py-16 bg-background flex items-center justify-center overflow-hidden">
      <svg viewBox="0 0 800 400" className="w-full max-w-5xl h-auto" xmlns="http://www.w3.org/2000/svg">
        {/* Desk surface - main polygon */}
        <polygon points="100,180 700,180 720,200 80,200" fill="#2C2C2C" stroke="#1A1A1A" strokeWidth="3" />

        {/* Desk surface top edge highlight */}
        <polygon points="100,180 700,180 690,175 110,175" fill="#3D3D3D" />

        {/* Left front leg */}
        <polygon points="120,200 140,200 145,380 115,380" fill="#2C2C2C" stroke="#1A1A1A" strokeWidth="2" />

        {/* Left back leg */}
        <polygon points="100,180 120,180 115,360 95,360" fill="#1A1A1A" />

        {/* Right front leg */}
        <polygon points="660,200 680,200 685,380 655,380" fill="#2C2C2C" stroke="#1A1A1A" strokeWidth="2" />

        {/* Right back leg */}
        <polygon points="680,180 700,180 695,360 675,360" fill="#1A1A1A" />

        {/* Horizontal support bar - left */}
        <polygon points="115,320 145,320 147,330 113,330" fill="#3D3D3D" />

        {/* Horizontal support bar - right */}
        <polygon points="655,320 685,320 687,330 653,330" fill="#3D3D3D" />

        {/* Object 1: Abstract wooden bowl/cup - coral accent */}
        <ellipse cx="200" cy="165" rx="35" ry="20" fill="#E8956F" />
        <ellipse cx="200" cy="165" rx="30" ry="16" fill="#D97757" />
        <ellipse cx="200" cy="160" rx="30" ry="16" fill="#E8956F" />

        {/* Object 2: Blue sphere */}
        <circle cx="320" cy="170" r="25" fill="#4A7C7E" />
        <circle cx="315" cy="165" r="25" fill="#5A9296" opacity="0.8" />
        <ellipse cx="318" cy="160" rx="8" ry="6" fill="#7DB5B8" opacity="0.6" />

        {/* Object 3: Pink circular object */}
        <ellipse cx="280" cy="175" rx="30" ry="12" fill="#E8956F" />
        <ellipse cx="280" cy="170" rx="28" ry="10" fill="#F5A881" />

        {/* Object 4: Abstract rectangular device/book */}
        <polygon points="360,175 420,175 422,190 358,190" fill="#2C2C2C" stroke="#1A1A1A" strokeWidth="2" />
        <polygon points="360,175 420,175 420,172 360,172" fill="#3D3D3D" />

        {/* Object 5: Small coffee cup - sage green */}
        <polygon points="550,175 580,175 578,190 552,190" fill="#8FA888" />
        <ellipse cx="565" cy="175" rx="15" ry="6" fill="#9BB894" />
        <ellipse cx="565" cy="173" rx="12" ry="5" fill="#6B7C66" opacity="0.3" />

        {/* Object 6: Articulated figure - simplified abstract */}
        <ellipse cx="620" cy="165" rx="8" ry="8" fill="#B8956F" />
        <line x1="620" y1="173" x2="620" y2="145" stroke="#A0845F" strokeWidth="3" />
        <line x1="620" y1="150" x2="635" y2="135" stroke="#A0845F" strokeWidth="3" />
        <line x1="620" y1="150" x2="605" y2="140" stroke="#A0845F" strokeWidth="3" />
        <line x1="620" y1="175" x2="610" y2="155" stroke="#A0845F" strokeWidth="2.5" />
        <line x1="620" y1="175" x2="630" y2="155" stroke="#A0845F" strokeWidth="2.5" />
        <circle cx="620" cy="165" r="6" fill="#C9A67C" />

        {/* Shadow underneath desk */}
        <ellipse cx="400" cy="385" rx="320" ry="15" fill="#1A1A1A" opacity="0.15" />
      </svg>
    </div>
  )
}
