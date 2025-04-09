import React, { useState } from 'react';
import { useForm } from '@formspree/react';
import { Lightbulb, Mail } from 'lucide-react';
import Footer from './Footer';

interface WelcomeProps {
  onContinue: (email?: string) => void;
}

export default function Welcome({ onContinue }: WelcomeProps) {
  const [state, handleSubmit] = useForm(import.meta.env.VITE_FORMSPREE_FORM_ID);
  const [email, setEmail] = useState('');
  const [showError, setShowError] = useState(false);

  const handleContactClick = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setShowError(true);
      return;
    }
    
    const personalDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'aol.com'];
    const emailDomain = email.split('@')[1]?.toLowerCase();
    
    if (personalDomains.includes(emailDomain)) {
      setShowError(true);
      return;
    }

    handleSubmit(e);
    onContinue(email);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Lightbulb className="w-8 h-8 text-accent" />
            <h1 className="text-2xl font-bold text-gray-800">
              ClarityOps
            </h1>
          </div>
        </div>
      </header>

      <div className="border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <h2 className="text-4xl font-playfair text-primary text-center">
            Employee <span className="relative inline-block">Churn<span className="absolute -bottom-1 left-0 w-full h-0.5 bg-accent/80"></span></span> Calculator
          </h2>
        </div>
      </div>

      <div className="flex-grow px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 md:p-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              How Much Is Employment Churn Costing You?
            </h2>

            <div className="bg-gray-50 rounded-lg border border-gray-200 p-6 mb-8">
              <p className="text-lg text-gray-700 mb-4">
                This calculator is free for our business community.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                If you would like to learn more about how to reduce your employment churn by 10-50%, 
                then enter your business email address and we'll follow up with more information on how we can help!
              </p>
              <div className="flex items-center gap-2 text-gray-700">
                <div className="font-playfair italic">Garrett Delph</div>
                <div className="text-gray-400">|</div>
                <div className="font-medium">ClarityOps</div>
              </div>
            </div>

            <form onSubmit={handleContactClick} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Business Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setShowError(false);
                    }}
                    className={`w-full pl-10 pr-4 py-3 border ${
                      showError ? 'border-red-500' : 'border-gray-200'
                    } rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors`}
                    placeholder="Enter your business email"
                  />
                </div>
                {showError && (
                  <p className="mt-2 text-sm text-red-600">
                    Please enter a valid business email address.
                  </p>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  type="button"
                  onClick={() => onContinue()}
                  className="flex-1 bg-gray-50 text-gray-700 border border-gray-200 py-3 px-6 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-200"
                >
                  Calculator Only
                </button>
                <button
                  type="submit"
                  disabled={state.submitting}
                  className="flex-1 bg-accent text-white py-3 px-6 rounded-lg font-medium hover:bg-accent/90 transition-colors duration-200"
                >
                  Calculator and Contact
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}