import React from 'react';
import { formatCurrency } from '../utils/formatters';

interface CostDisplayProps {
  label: string;
  value: number;
  tooltip: string;
}

export default function CostDisplay({ label, value, tooltip }: CostDisplayProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:border-primary/20 transition-colors duration-200">
      <div className="space-y-3">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold text-gray-800">{label}</h3>
          <span className="font-bold text-xl text-gray-800">
            {formatCurrency(value)}
          </span>
        </div>
        <div className="text-sm text-gray-600 leading-relaxed">
          {tooltip}
        </div>
      </div>
    </div>
  );
}