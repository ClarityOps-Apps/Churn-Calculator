import React, { useState } from 'react';
import { Lightbulb, ChevronDown, ArrowLeft } from 'lucide-react';
import QuoteCard from './QuoteCard';
import CostDisplay from './CostDisplay';
import Footer from './Footer';
import { formatCurrency, formatNumberWithCommas } from '../utils/formatters';

interface CostCalculatorProps {
  onBack?: () => void;
}

export default function CostCalculator({ onBack }: CostCalculatorProps) {
  const [salary, setSalary] = useState<string>('');
  const [costs, setCosts] = useState<Record<string, number>>({});
  const [baseSalary, setBaseSalary] = useState<number>(0);
  const [selectedMultiplier, setSelectedMultiplier] = useState<number>(1.5);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const multipliers = [1.25, 1.5, 1.75, 2, 2.25, 2.5, 2.75, 3];

  const handleSalaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    setSalary(formatNumberWithCommas(value));
  };

  const calculateChurnCost = (salaryValue: string, multiplier: number) => {
    const salaryNum = parseInt(salaryValue.replace(/,/g, ''), 10);
    if (!salaryNum || isNaN(salaryNum)) return;

    setBaseSalary(salaryNum);
    const baseCost = salaryNum * multiplier;
    const additionalCost = baseCost - salaryNum;

    const calculatedCosts = {
      trainingCost: Math.round(additionalCost * 0.075),
      recruitmentCost: Math.round(additionalCost * 0.20),
      impactCost: Math.round(additionalCost * 0.10),
      productivityLossCost: Math.round(additionalCost * 0.40),
      lostKnowledgeCost: Math.round(additionalCost * 0.075),
      exitCost: Math.round(additionalCost * 0.15),
    };

    setCosts(calculatedCosts);
  };

  const handleMultiplierChange = (multiplier: number) => {
    setSelectedMultiplier(multiplier);
    setIsDropdownOpen(false);
    if (salary) {
      calculateChurnCost(salary, multiplier);
    }
  };

  const tooltips = {
    trainingCost: "The cost of onboarding and training one new hire.",
    impactCost: "The cultural, engagement, and productivity among associated employees.",
    lostKnowledgeCost: "The cost of losing institutional knowledge when experienced employees leave.",
    recruitmentCost: "Advertising, resume reviews, interviewing, Offer Negotiations, Recruiting Commissions, and all associated administrative fees.",
    productivityLossCost: "The costs associated with lost output while the business is trying to replace the role.",
    exitCost: "These costs include severance pay, unused vacation, benefits payouts, and administrative processing, and more."
  };

  const totalCost = Object.values(costs).reduce((acc, curr) => acc + curr, 0);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            {onBack && (
              <button
                onClick={onBack}
                className="flex items-center gap-2 text-gray-500 hover:text-gray-700 transition-colors duration-200"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back</span>
              </button>
            )}
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
      
      <div className="flex-grow py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <QuoteCard />
          
          <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
              How Much Is Employment Churn Costing You?
            </h2>
            <p className="text-center text-gray-600 mb-8">
              Calculate Your True Cost of Employee Turnover
            </p>

            <div className="space-y-6">
              <div className="flex flex-col md:flex-row gap-4 items-start">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Salary of Employee
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                      $
                    </span>
                    <input
                      type="text"
                      value={salary}
                      onChange={handleSalaryChange}
                      className="w-full pl-8 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                      placeholder="Enter annual salary"
                    />
                  </div>
                </div>

                <div className="w-full md:w-auto">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cost Multiplier
                  </label>
                  <div className="relative inline-block w-full md:w-auto">
                    <button
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className="w-full md:w-auto flex items-center justify-between gap-2 py-3 px-4 rounded-lg text-sm font-medium bg-white border border-gray-200 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors"
                    >
                      <span>{selectedMultiplier}x multiplier</span>
                      <ChevronDown className="w-4 h-4 text-gray-500" />
                    </button>
                    {isDropdownOpen && (
                      <div className="absolute z-10 mt-1 w-full md:w-40 bg-white border border-gray-200 rounded-lg shadow-sm">
                        {multipliers.map((multiplier) => (
                          <button
                            key={multiplier}
                            onClick={() => handleMultiplierChange(multiplier)}
                            className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${
                              selectedMultiplier === multiplier ? 'bg-gray-50 font-medium' : ''
                            }`}
                          >
                            {multiplier}x multiplier
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <button
                onClick={() => calculateChurnCost(salary, selectedMultiplier)}
                className="w-full bg-accent text-white py-3 rounded-lg font-medium hover:bg-accent/90 transition-colors duration-200"
              >
                Calculate Churn Cost
              </button>

              {Object.keys(costs).length > 0 && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                    {Object.entries(costs).map(([key, value]) => (
                      <CostDisplay
                        key={key}
                        label={key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                        value={value}
                        tooltip={tooltips[key as keyof typeof tooltips]}
                      />
                    ))}
                  </div>

                  <div className="mt-8 p-6 bg-white rounded-xl border-2 border-accent/20">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-xl font-semibold text-gray-800">
                        Additional Churn Cost Beyond Salary:
                      </h2>
                      <span className="text-sm font-medium text-gray-600 bg-gray-50 px-3 py-1 rounded-full border border-gray-200">
                        {selectedMultiplier}x multiplier
                      </span>
                    </div>
                    <div className="text-3xl font-bold text-gray-800">
                      {formatCurrency(totalCost)}
                    </div>
                    <p className="text-sm text-gray-600 mt-2">
                      This represents the additional costs beyond the base salary of {formatCurrency(baseSalary)}
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}