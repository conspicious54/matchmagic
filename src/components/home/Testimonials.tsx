export function Testimonials() {
  const logos = [
    {
      src: "https://logos-world.net/wp-content/uploads/2021/07/BBC-Emblem.png",
      alt: "BBC",
      width: 60
    },
    {
      src: "https://vivintpromotions.com/wp-content/uploads/2018/01/Forbes-logo-white.png",
      alt: "Forbes",
      width: 90
    },
    {
      src: "https://www.washingtonpost.com/wp-stat/paywall/USW/images/thewashingtonpost-white-@3x.png",
      alt: "Washington Post",
      width: 140
    },
    {
      src: "https://www.marketmakers.co.uk/wp-content/uploads/2020/01/460x215-TheGuardian-White-1.png",
      alt: "The Guardian",
      width: 120
    },
    {
      src: "https://jointhespree.com/wp-content/uploads/2021/06/techcrunch-logo-white.png",
      alt: "TechCrunch",
      width: 100
    },
    {
      src: "https://axisfinancialgp.com/wp-content/uploads/2024/12/cnet-logo-black-and-white.png",
      alt: "CNet",
      width: 80
    },
    {
      src: "https://cdn-static.bizzabo.com/bizzabo.users.files/F5xGpp7vTmiDo1cpWlZQ_NicePng_la-times-logo-png_3524337.png",
      alt: "LA Times",
      width: 100
    }
  ];

  return (
    <section className="py-8 bg-black/30 backdrop-blur-sm overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="relative max-w-7xl mx-auto">
          {/* Create a mask for the scrolling content */}
          <div className="relative overflow-hidden">
            {/* Single row of logos */}
            <div className="flex items-center space-x-16 animate-[scroll_30s_linear_infinite]">
              {logos.map((logo, index) => (
                <div key={`row1-${index}`} className="flex-shrink-0 flex items-center">
                  <img 
                    src={logo.src}
                    alt={logo.alt}
                    style={{ width: logo.width }}
                    className="opacity-75 hover:opacity-100 transition-opacity duration-300"
                  />
                </div>
              ))}
              {/* Duplicate logos for seamless scrolling */}
              {logos.map((logo, index) => (
                <div key={`row1-dup-${index}`} className="flex-shrink-0 flex items-center">
                  <img 
                    src={logo.src}
                    alt={logo.alt}
                    style={{ width: logo.width }}
                    className="opacity-75 hover:opacity-100 transition-opacity duration-300"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Gradient masks for smooth fade effect */}
          <div className="absolute top-0 left-0 h-full w-32 bg-gradient-to-r from-black/30 to-transparent pointer-events-none"></div>
          <div className="absolute top-0 right-0 h-full w-32 bg-gradient-to-l from-black/30 to-transparent pointer-events-none"></div>
        </div>
      </div>
    </section>
  );
}