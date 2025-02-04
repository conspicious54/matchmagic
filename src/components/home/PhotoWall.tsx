import { useState } from 'react';
import { Maximize2, ZoomIn } from 'lucide-react';
import { useAuth } from '../auth/AuthContext';

export function PhotoWall() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleGoogleSignIn = () => {
    // @ts-ignore - Google is added via script tag
    if (window.google) {
      window.google.accounts.id.prompt();
    }
  };

  const examplePhotos = [
    "https://preview.redd.it/hiring-ai-artist-hyper-realistic-human-images-v0-njvnx7w1ykjc1.png?width=768&format=png&auto=webp&s=cd2539150174a752ccbd19e2620b85eee59f084d",
    "https://preview.redd.it/realistic-ordinary-woman-which-image-could-fool-you-v0-vx63py4h2dzb1.png?width=1080&crop=smart&auto=webp&s=6fa0dd213ca17b03a51fe14b50213a1cb46b78b6",
    "https://i.redd.it/portraits-of-average-looking-humans-v0-8zbbxzwawtic1.jpg?width=1024&format=pjpg&auto=webp&s=8a27e2a4e699a1bd3197f46992b776165330d9ed",
    "https://preview.redd.it/are-these-real-or-ai-v0-yiuwoc3ewr2c1.png?width=640&crop=smart&auto=webp&s=cedbcc3c52966b83bba007275d9303cbcab5eae1",
    "https://photoai.com/cdn-cgi/image/format=jpeg,fit=cover,width=1024,height=1536,quality=85/https://r2-us-west.photoai.com/1725083404-1a0e88162957d7d7d642b6367c5c872f-1.png",
    "https://photoai.com/cdn-cgi/image/format=jpeg,fit=cover,width=1024,height=1536,quality=85/https://r2-us-west.photoai.com/1725057488-0aab73c411bf4f26eb027632164c5505-1.png",
    "https://photoai.com/cdn-cgi/image/format=jpeg,fit=cover,width=1024,height=1536,quality=85/https://r2-us-west.photoai.com/1725037177-90364f0fc033bff790331b917e6c83fd-1.png",
    "https://photoai.com/cdn-cgi/image/format=jpeg,fit=cover,width=1024,height=1536,quality=85/https://r2-us-west.photoai.com/1726223738-432ce73ddf6df05a8c15058ba9d3aa2f-3.png",
    "https://photoai.com/cdn-cgi/image/format=jpeg,fit=cover,width=1024,height=1536,quality=85/https://r2-us-west.photoai.com/1726197487-2024252e2d1d4f7700839208b78b0311-4.png",
    "https://photoai.com/cdn-cgi/image/format=jpeg,fit=cover,width=1024,height=1536,quality=85/https://r2-us-west.photoai.com/1725042606-ee76e84a7dffb2f59031752651677493-1.png",
    "https://photoai.com/cdn-cgi/image/format=jpeg,fit=cover,width=1024,height=1536,quality=85/https://r2-us-west.photoai.com/1726234309-ce6ed0816a56fdae2d80bfae69e944d7-4.png",
    "https://photoai.com/cdn-cgi/image/format=jpeg,fit=cover,width=1024,height=1536,quality=85/https://r2-us-west.photoai.com/1726195700-e1b170f5774a7205ce12febb8adb3088-3.png"
  ];

  return (
    <section className="py-20 bg-black/50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-6" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Generated With Our AI</h2>
        
        {/* Powered by 360VisionAI Blurb */}
        <div className="flex justify-center mb-12">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/30 via-fuchsia-500/30 to-pink-500/30 blur-xl opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative px-6 py-3 bg-gradient-to-r from-purple-600/10 via-fuchsia-500/10 to-pink-500/10 backdrop-blur-sm rounded-lg border border-purple-500/20">
              <span className="text-lg font-medium bg-gradient-to-r from-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
                🪄 Powered by 360VisionAI
              </span>
            </div>
          </div>
        </div>

        {/* Mosaic Gallery */}
        <div className="columns-2 md:columns-4 gap-4 mb-12">
          {examplePhotos.map((photo, i) => (
            <div
              key={i}
              className="relative group cursor-pointer break-inside-avoid mb-4"
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => setSelectedImage(photo)}
            >
              <img
                src={photo}
                alt="AI Generated"
                className="w-full rounded-lg transition-all duration-300 group-hover:scale-[1.02]"
              />
              <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center`}>
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <button className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full flex items-center space-x-2 hover:bg-white/30 transition-colors">
                    <Maximize2 className="w-5 h-5" />
                    <span>View Full Size</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="max-w-md mx-auto text-center">
          <p className="text-xl text-gray-300 mb-6">
            Ready to create your own stunning photos?
          </p>
          <button
            onClick={handleGoogleSignIn}
            className="w-full px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-lg font-semibold hover:from-pink-600 hover:to-rose-600 transition-all duration-300"
          >
            Get Started Now
          </button>
        </div>

        {/* Full-size image modal */}
        {selectedImage && (
          <div 
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 cursor-zoom-out"
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative max-w-7xl max-h-[90vh]">
              <img
                src={selectedImage}
                alt="AI Generated Full Size"
                className="max-w-full max-h-[90vh] object-contain rounded-lg"
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-white/30 transition-colors"
              >
                <ZoomIn className="w-6 h-6" />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}