import React from 'react';

export default function QuoteCard() {
  return (
    <div className="bg-primary/95 rounded-xl p-8 text-white shadow-sm">
      <blockquote className="text-2xl md:text-3xl font-playfair italic leading-relaxed">
        "The cost of replacing an employee is often <span className="relative">2-3<span className="absolute bottom-0 left-0 w-full h-0.5 bg-accent/80"></span></span> times their salary when you factor in hiring, onboarding, and lost productivity."
      </blockquote>
      <footer className="mt-4 text-white/90 font-playfair">
        - Laszlo Bock, former Senior VP of People Operations at Google
      </footer>
    </div>
  );
}