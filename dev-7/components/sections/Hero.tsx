'use client'

export default function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center">
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto bg-black/20 backdrop-blur-md rounded-2xl p-8 md:p-12 border border-white/10">
        <h1 className="text-6xl md:text-8xl font-light tracking-tight mb-6 animate-fade-in text-purple-100">
          Morphic Evolution
        </h1>
        <p className="text-lg md:text-xl text-purple-300/80 font-light tracking-wide mb-8 animate-fade-in-delay">
          Journey through 13 transformations of digital matter—from data vortex to eternal loop
        </p>
        <div className="flex items-center justify-center gap-2 text-sm text-purple-400/60 animate-bounce">
          <span>↓</span>
          <span>Scroll to begin transformation</span>
        </div>
      </div>
    </section>
  )
}
