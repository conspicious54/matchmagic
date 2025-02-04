import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { useEffect } from 'react';

function TermsPage() {
  useEffect(() => {
    document.title = 'Terms of Service | PhotoMatchAI';
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
          <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
          
          <div className="prose prose-invert max-w-none">
            <h2>1. Acceptance of Terms</h2>
            <p>By accessing and using PhotoMatch AI, you agree to be bound by these Terms of Service.</p>

            <h2>2. Services Description</h2>
            <p>PhotoMatch AI provides AI-powered photo generation services for personal and professional use.</p>

            <h2>3. User Obligations</h2>
            <ul>
              <li>You must be at least 18 years old to use our services</li>
              <li>You must provide accurate information during registration</li>
              <li>You are responsible for maintaining the confidentiality of your account</li>
            </ul>

            <h2>4. Content Guidelines</h2>
            <p>Users must not upload or generate:</p>
            <ul>
              <li>Explicit or adult content</li>
              <li>Copyrighted material without permission</li>
              <li>Hateful or discriminatory content</li>
              <li>Content that violates any laws</li>
            </ul>

            <h2>5. Intellectual Property</h2>
            <p>You retain rights to your uploaded photos. Generated images are licensed for your personal use.</p>

            <h2>6. Privacy</h2>
            <p>Your privacy is important to us. Please review our <Link to="/privacy" className="text-pink-500 hover:text-pink-400">Privacy Policy</Link>.</p>

            <h2>7. Termination</h2>
            <p>We reserve the right to terminate or suspend accounts that violate these terms.</p>

            <h2>8. Changes to Terms</h2>
            <p>We may modify these terms at any time. Continued use constitutes acceptance of changes.</p>

            <h2>9. Contact</h2>
            <p>Questions about these terms? Contact us at <a href="mailto:support@photomatch.ai" className="text-pink-500 hover:text-pink-400">support@photomatch.ai</a></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TermsPage;