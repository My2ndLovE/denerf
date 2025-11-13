'use client';

interface ContentSectionsProps {
  scrollProgress: number;
  sectionIndex: number;
}

export default function ContentSections({ scrollProgress, sectionIndex }: ContentSectionsProps) {
  // Calculate opacity for this specific section
  const getSectionOpacity = () => {
    const totalSections = 6;
    const sectionWidth = 1 / totalSections; // 0.1667
    const sectionStart = sectionIndex * sectionWidth;
    const sectionEnd = (sectionIndex + 1) * sectionWidth;

    const fadeZone = sectionWidth * 0.25; // 25% of section width for fading

    // Before section starts
    if (scrollProgress < sectionStart - fadeZone) {
      return 0;
    }

    // After section ends
    if (scrollProgress > sectionEnd + fadeZone) {
      return 0;
    }

    // Fading in (approaching from previous section)
    if (scrollProgress < sectionStart) {
      const fadeProgress = (scrollProgress - (sectionStart - fadeZone)) / fadeZone;
      return Math.max(0, Math.min(1, fadeProgress));
    }

    // Fading out (transitioning to next section)
    if (scrollProgress > sectionEnd) {
      const fadeProgress = ((sectionEnd + fadeZone) - scrollProgress) / fadeZone;
      return Math.max(0, Math.min(1, fadeProgress));
    }

    // Fully visible - within section bounds [sectionStart, sectionEnd]
    return 1;
  };

  const opacity = getSectionOpacity();

  // Don't render if not visible
  if (opacity < 0.01) {
    return null;
  }

  // Get section-specific text color based on background
  const getTextColor = () => {
    const colors = [
      'text-cyan-100', // Ocean (Section 0)
      'text-purple-100', // Twilight (Section 1)
      'text-orange-100', // Fire (Section 2)
      'text-emerald-100', // Forest (Section 3)
      'text-rose-100', // Sunset (Section 4)
      'text-amber-100', // Cosmic (Section 5)
    ];
    return colors[sectionIndex] || colors[0];
  };

  const getAccentColor = () => {
    const colors = [
      'border-cyan-300', // Ocean
      'border-purple-300', // Twilight
      'border-orange-300', // Fire
      'border-emerald-300', // Forest
      'border-rose-300', // Sunset
      'border-amber-300', // Cosmic
    ];
    return colors[sectionIndex] || colors[0];
  };

  const textColor = getTextColor();
  const accentColor = getAccentColor();

  return (
    <div
      className="relative w-full h-full flex items-center justify-center pointer-events-auto"
      style={{
        opacity,
        transform: `scale(${0.95 + opacity * 0.05})`,
        transition: 'opacity 0.3s ease-out, transform 0.3s ease-out',
      }}
    >
      {/* Section 0: Hero */}
      {sectionIndex === 0 && (
        <div className="max-w-4xl mx-auto px-8 text-center">
          <div className="mb-16">
            <h1 className={`text-7xl md:text-8xl font-light ${textColor} mb-8 tracking-tight leading-[0.9]`}>
              Digital
              <br />
              <span className="font-extralight opacity-80">Excellence</span>
            </h1>
            <p className={`text-lg ${textColor} opacity-90 leading-relaxed max-w-xl mx-auto font-light`}>
              Crafting sophisticated digital experiences through precision engineering and thoughtful design
            </p>
          </div>
        </div>
      )}

      {/* Section 1: Approach */}
      {sectionIndex === 1 && (
        <div className="max-w-5xl mx-auto px-8">
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <h2 className={`text-5xl font-light ${textColor} mb-6 tracking-tight`}>Our Approach</h2>
              <p className={`${textColor} opacity-90 leading-relaxed text-lg font-light`}>
                We believe in the power of simplicity. Every line of code, every pixel, every interaction is intentional.
              </p>
            </div>
            <div className="space-y-8">
              {[
                { title: 'Strategic', desc: 'Aligned with your business objectives' },
                { title: 'Refined', desc: 'Attention to every detail' },
                { title: 'Scalable', desc: 'Built for growth and evolution' },
                { title: 'Timeless', desc: 'Design that endures' }
              ].map((item, idx) => (
                <div key={idx} className={`border-l ${accentColor} pl-6`}>
                  <h3 className={`text-xl font-normal ${textColor} mb-2`}>{item.title}</h3>
                  <p className={`${textColor} opacity-80 font-light`}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Section 2: Services */}
      {sectionIndex === 2 && (
        <div className="max-w-5xl mx-auto px-8">
          <h2 className={`text-5xl font-light ${textColor} mb-16 tracking-tight`}>Capabilities</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'Digital Strategy', desc: 'Comprehensive planning and roadmapping' },
              { title: 'Product Design', desc: 'User-centered interface and experience' },
              { title: 'Engineering', desc: 'Robust, scalable technical solutions' },
              { title: 'Cloud Architecture', desc: 'Modern infrastructure and deployment' },
              { title: 'Data & Analytics', desc: 'Insights that drive decisions' },
              { title: 'Optimization', desc: 'Continuous improvement and refinement' }
            ].map((service, idx) => (
              <div key={idx} className="group">
                <div className={`border-t ${accentColor} pt-6`}>
                  <h3 className={`text-lg font-normal ${textColor} mb-3 group-hover:opacity-70 transition-opacity`}>
                    {service.title}
                  </h3>
                  <p className={`text-sm ${textColor} opacity-80 font-light leading-relaxed`}>{service.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Section 3: Work */}
      {sectionIndex === 3 && (
        <div className="max-w-5xl mx-auto px-8">
          <h2 className={`text-5xl font-light ${textColor} mb-16 tracking-tight`}>Selected Work</h2>
          <div className="space-y-12">
            {[
              { title: 'Apex Financial', category: 'FinTech Platform', year: '2024' },
              { title: 'Meridian Health', category: 'Healthcare Portal', year: '2023' },
              { title: 'Quantum Analytics', category: 'Data Visualization', year: '2023' },
              { title: 'Nexus Commerce', category: 'E-Commerce Platform', year: '2024' }
            ].map((project, idx) => (
              <div
                key={idx}
                className={`border-t ${accentColor} pt-6 pb-6 group cursor-pointer hover:border-opacity-70 transition-all`}
              >
                <div className="flex justify-between items-baseline">
                  <div>
                    <h3 className={`text-2xl font-normal ${textColor} mb-2 group-hover:opacity-70 transition-opacity`}>
                      {project.title}
                    </h3>
                    <p className={`text-sm ${textColor} opacity-70 font-light`}>{project.category}</p>
                  </div>
                  <span className={`text-sm ${textColor} opacity-60 font-light`}>{project.year}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Section 4: Expertise */}
      {sectionIndex === 4 && (
        <div className="max-w-4xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className={`text-5xl font-light ${textColor} mb-6 tracking-tight`}>Expertise</h2>
            <p className={`text-lg ${textColor} opacity-90 font-light max-w-2xl mx-auto leading-relaxed`}>
              A decade of experience building digital products that matter
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-12 text-center">
            <div>
              <div className={`text-5xl font-light ${textColor} mb-2`}>150+</div>
              <div className={`text-sm ${textColor} opacity-80 font-light`}>Projects Delivered</div>
            </div>
            <div>
              <div className={`text-5xl font-light ${textColor} mb-2`}>12</div>
              <div className={`text-sm ${textColor} opacity-80 font-light`}>Years Experience</div>
            </div>
            <div>
              <div className={`text-5xl font-light ${textColor} mb-2`}>45</div>
              <div className={`text-sm ${textColor} opacity-80 font-light`}>Team Members</div>
            </div>
          </div>
        </div>
      )}

      {/* Section 5: Contact */}
      {sectionIndex === 5 && (
        <div className="max-w-3xl mx-auto px-8 text-center">
          <h2 className={`text-5xl md:text-6xl font-light ${textColor} mb-8 tracking-tight`}>
            Let's Create
            <br />
            <span className="font-extralight opacity-80">Something Exceptional</span>
          </h2>
          <p className={`text-lg ${textColor} opacity-90 mb-12 font-light max-w-xl mx-auto leading-relaxed`}>
            We're selective about the projects we take on. If you're committed to excellence, we'd like to hear from you.
          </p>
          <div className="space-y-6">
            <div>
              <a
                href="mailto:hello@studio.com"
                className={`text-lg ${textColor} hover:opacity-70 transition-opacity font-light`}
              >
                hello@studio.com
              </a>
            </div>
            <div className={`flex justify-center gap-8 text-sm ${textColor} opacity-80`}>
              <a href="#" className="hover:opacity-60 transition-opacity font-light">LinkedIn</a>
              <a href="#" className="hover:opacity-60 transition-opacity font-light">Twitter</a>
              <a href="#" className="hover:opacity-60 transition-opacity font-light">Dribbble</a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
