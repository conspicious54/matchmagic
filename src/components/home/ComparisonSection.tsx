import { Check, X } from 'lucide-react';

export function ComparisonSection() {
  const services = [
    {
      title: "Midjourney 3",
      features: [
        { text: "Low resemblance", positive: false },
        { text: "Inconsistent character", positive: false },
        { text: "Medium photorealism", positive: true },
        { text: "Low resolution", positive: false },
        { text: "Maintains ethnicity", positive: true },
        { text: "Clear and sharp", positive: true }
      ]
    },
    {
      title: "Our Service",
      primary: true,
      features: [
        { text: "High resemblance", positive: true },
        { text: "Consistent character", positive: true },
        { text: "High photorealism", positive: true },
        { text: "High resolution", positive: true },
        { text: "Maintains ethnicity", positive: true },
        { text: "Clear and sharp", positive: true }
      ]
    },
    {
      title: "DALL-E 3",
      features: [
        { text: "No resemblance", positive: false },
        { text: "Inconsistent character", positive: false },
        { text: "Low photorealism", positive: false },
        { text: "No resolution", positive: false },
        { text: "Maintains ethnicity", positive: true },
        { text: "Clear and sharp", positive: false }
      ]
    }
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us?</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {services.map((service) => (
            <div
              key={service.title}
              className={`rounded-xl p-6 ${
                service.primary
                  ? 'bg-gradient-to-br from-pink-500/20 to-rose-500/20 border-pink-500/30'
                  : 'bg-gray-800/50 border-gray-700'
              } border`}
            >
              <h3 className="text-xl font-bold mb-6 text-center">{service.title}</h3>
              <ul className="space-y-4">
                {service.features.map((feature, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    {feature.positive ? (
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                    ) : (
                      <X className="w-5 h-5 text-red-500 flex-shrink-0" />
                    )}
                    <span className="text-gray-300">{feature.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}