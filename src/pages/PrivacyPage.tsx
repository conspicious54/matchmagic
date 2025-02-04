import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { useEffect } from 'react';

function PrivacyPage() {
  useEffect(() => {
    document.title = 'Privacy Policy | PhotoMatchAI';
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-gray-100">
      <div className="container mx-auto px-4 py-12">
        <nav className="mb-12">
          <Link 
            to="/" 
            className="inline-flex items-center space-x-2 text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </Link>
        </nav>

        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
          
          <div className="prose prose-invert max-w-none">
            <h2>1. Information We Collect</h2>
            <p>We collect information you provide directly to us:</p>
            <ul>
              <li>Account information (name, email)</li>
              <li>Photos you upload for AI processing</li>
              <li>Usage data and preferences</li>
            </ul>

            <h2>2. How We Use Your Information</h2>
            <p>We use your information to:</p>
            <ul>
              <li>Provide and improve our services</li>
              <li>Train our AI models (with your consent)</li>
              <li>Communicate with you about our services</li>
              <li>Ensure security and prevent fraud</li>
            </ul>

            <h2>3. Data Storage and Security</h2>
            <p>We implement industry-standard security measures to protect your data.</p>

            <h2>4. Data Sharing</h2>
            <p>We do not sell your personal data. We may share data with:</p>
            <ul>
              <li>Service providers who assist our operations</li>
              <li>Law enforcement when required by law</li>
            </ul>

            <h2>5. Your Rights</h2>
            <p>You have the right to:</p>
            <ul>
              <li>Access your personal data</li>
              <li>Request data deletion</li>
              <li>Opt out of marketing communications</li>
              <li>Update your preferences</li>
            </ul>

            <h2>6. Cookies and Tracking</h2>
            <p>We use cookies and similar technologies to improve user experience.</p>

            <h2>7. Children's Privacy</h2>
            <p>Our services are not intended for users under 18 years old.</p>

            <h2>8. Changes to Privacy Policy</h2>
            <p>We may update this policy. Changes will be posted here.</p>

            <h2>9. Contact Us</h2>
            <p>Questions about privacy? Contact us at <a href="mailto:privacy@photomatch.ai" className="text-pink-500 hover:text-pink-400">privacy@photomatch.ai</a></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PrivacyPage;