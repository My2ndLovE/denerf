'use client'

export default function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center">
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <h1 className="text-6xl md:text-8xl font-light tracking-tight mb-6 animate-fade-in">
          Creative Portfolio
        </h1>
        <p className="text-lg md:text-xl text-gray-600 font-light tracking-wide mb-8 animate-fade-in-delay">
          Scroll to explore innovative design solutions
        </p>
        <div className="flex items-center justify-center gap-2 text-sm text-gray-400 animate-bounce">
          <span>↓</span>
          <span>Start scrolling to explore</span>
        </div>
      </div>
    </section>
  )
}
