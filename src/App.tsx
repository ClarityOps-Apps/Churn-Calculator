import React, { useState } from 'react';
import CostCalculator from './components/CostCalculator';
import Welcome from './components/Welcome';

function App() {
  const [showCalculator, setShowCalculator] = useState(false);
  const [collectedEmail, setCollectedEmail] = useState<string | undefined>();

  const handleContinue = (email?: string) => {
    setCollectedEmail(email);
    setShowCalculator(true);
  };

  const handleBack = () => {
    setShowCalculator(false);
  };

  if (!showCalculator) {
    return <Welcome onContinue={handleContinue} />;
  }

  return <CostCalculator onBack={handleBack} />;
}

export default App;