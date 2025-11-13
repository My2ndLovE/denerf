import SmoothScroll from '@/components/ui/SmoothScroll'
import ScrollScene from '@/components/3d/ScrollScene'
import Hero from '@/components/sections/Hero'
import Section1 from '@/components/sections/Section1'
import Section2 from '@/components/sections/Section2'
import Section3 from '@/components/sections/Section3'
import Section4 from '@/components/sections/Section4'
import Section5 from '@/components/sections/Section5'
import Section6 from '@/components/sections/Section6'
import Section7 from '@/components/sections/Section7'
import Section8 from '@/components/sections/Section8'
import Section9 from '@/components/sections/Section9'
import Section10 from '@/components/sections/Section10'
import Section11 from '@/components/sections/Section11'
import Section13 from '@/components/sections/Section13'
import Section14 from '@/components/sections/Section14'

export default function Home() {
  return (
    <SmoothScroll>
      <div className="relative bg-black">
        {/* Fixed 3D Scene Background */}
        <ScrollScene />

        {/* Content Sections - 13 total (Hero + 13 shape sections) */}
        <div className="relative z-10">
          <Hero />
          <Section1 />
          <Section2 />
          <Section3 />
          <Section4 />
          <Section5 />
          <Section6 />
          <Section7 />
          <Section8 />
          <Section9 />
          <Section10 />
          <Section11 />
          <Section13 />
          <Section14 />
        </div>
      </div>
    </SmoothScroll>
  )
}
