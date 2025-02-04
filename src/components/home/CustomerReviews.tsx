export function CustomerReviews() {
  const reviews = [
    {
      name: "Michael R.",
      role: "Software Engineer",
      text: "Finally, professional-looking photos without the expensive photoshoot. The AI perfectly captured my style and personality.",
      image: "https://i.redd.it/izctonf8mrkb1.jpg"
    },
    {
      name: "James T.",
      role: "Marketing Manager",
      text: "This is a game-changer for my professional presence. The photos are stunning and save me hours of content creation time.",
      image: "https://i.redd.it/4ozdytgmt9ha1.jpg"
    },
    {
      name: "David K.",
      role: "Entrepreneur",
      text: "My matches increased by 300% after using these AI-generated photos. They look completely natural and show my best self!",
      image: "https://i.redd.it/5sa7axch0x2b1.jpg"
    }
  ];

  return (
    <section className="py-20 bg-black/50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {reviews.map((review) => (
            <div key={review.name} className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 hover:border-pink-500/30 transition-colors duration-300">
              <div className="flex items-center space-x-4 mb-4">
                <img
                  src={review.image}
                  alt={review.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold">{review.name}</h4>
                  <p className="text-gray-400 text-sm">{review.role}</p>
                </div>
              </div>
              <p className="text-gray-300">{review.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}