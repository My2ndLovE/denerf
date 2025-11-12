import SmoothScroll from '@/components/ui/SmoothScroll'
import ScrollScene from '@/components/3d/ScrollScene'
import Hero from '@/components/sections/Hero'
import Section1 from '@/components/sections/Section1'
import Section2 from '@/components/sections/Section2'
import Section3 from '@/components/sections/Section3'

export default function Home() {
  return (
    <SmoothScroll>
      <div className="relative">
        {/* Fixed 3D Scene Background */}
        <ScrollScene />

        {/* Content Sections */}
        <div className="relative z-10">
          <Hero />
          <Section1 />
          <Section2 />
          <Section3 />
        </div>
      </div>
    </SmoothScroll>
  )
}
