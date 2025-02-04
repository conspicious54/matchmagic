import { ArrowRight } from 'lucide-react';

export function HowItWorks() {
  const trainingPhotos = [
    "https://photoai.com/cdn-cgi/image/format=jpeg,fit=cover,height=500,width=500,quality=50/assets/training_examples/good/h.jpeg?1716128114",
    "https://photoai.com/cdn-cgi/image/format=jpeg,fit=cover,height=500,width=500,quality=50/assets/training_examples/good/g.jpeg?1708109686",
    "https://photoai.com/cdn-cgi/image/format=jpeg,fit=cover,height=500,width=500,quality=50/assets/training_examples/good/f.jpeg?1708109686",
    "https://photoai.com/cdn-cgi/image/format=jpeg,fit=cover,height=500,width=500,quality=50/assets/training_examples/good/e.jpeg?1708109686"
  ];

  return (
    <section id="how-it-works" className="py-32 relative overflow-hidden scroll-mt-20">
      <div className="absolute inset-0 bg-gradient-to-b from-pink-500/5 to-transparent"></div>
      <div className="container mx-auto px-4 relative">
        <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-white to-pink-500 bg-clip-text text-transparent">
          How It Works
        </h2>
        
        <div className="flex flex-col md:flex-row items-center justify-between max-w-6xl mx-auto">
          {/* Upload Section */}
          <div className="md:w-5/12 space-y-6">
            <h3 className="text-2xl font-bold mb-4">1. Upload Your Photos</h3>
            <p className="text-gray-400 text-lg mb-8">
              Share a few selfies with different angles and expressions. Our AI will learn your unique features.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {trainingPhotos.map((photo, index) => (
                <div key={index} className="relative group">
                  <img
                    src={photo}
                    alt={`Training photo ${index + 1}`}
                    className="w-full aspect-square object-cover rounded-lg transition-all duration-300 group-hover:scale-[1.02]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300" />
                </div>
              ))}
            </div>
          </div>

          {/* Arrow */}
          <div className="hidden md:flex items-center justify-center md:w-2/12">
            <div className="relative">
              <ArrowRight className="w-24 h-24 text-pink-500 animate-pulse" />
              <div className="absolute inset-0 bg-pink-500/20 blur-3xl -z-10"></div>
            </div>
          </div>

          {/* Generate Section */}
          <div className="md:w-5/12 space-y-6 mt-12 md:mt-0">
            <h3 className="text-2xl font-bold mb-4">2. Generate Amazing Photos</h3>
            <p className="text-gray-400 text-lg mb-8">
              Our AI creates stunning, professional photos that look 100% like you in various styles and settings.
            </p>
            <div className="relative group rounded-lg overflow-hidden">
              <img
                src="https://photoai.com/cdn-cgi/image/format=jpeg,width=1000,quality=75/https://r2.photoai.com/1695561449-e9051aae162ed3ceffbb01984a4372ef-6.jpg?1695561449"
                alt="Generated photo"
                className="w-full rounded-lg transition-all duration-300 group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}