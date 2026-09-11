import React from 'react';

interface FareDisplayProps {
  amount: number;
  taxes: number;
  className?: string;
}

export const FareDisplay: React.FC<FareDisplayProps> = ({ amount, taxes, className = '' }) => {
  const total = amount + taxes;

  return (
    <div className={`inline-flex items-center gap-1.5 relative group cursor-pointer ${className}`}>
      <span className="font-semibold text-slate-900">
        ₹{amount.toLocaleString('en-IN')} <span className="text-xs font-normal text-slate-500">+ taxes</span>
      </span>
      <div className="inline-flex items-center justify-center w-4 h-4 text-[10px] font-bold text-slate-600 bg-slate-100 border border-slate-300 rounded-full group-hover:bg-slate-200">
        i
      </div>
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block w-48 bg-slate-900 text-white text-xs rounded-lg p-2.5 shadow-xl z-50">
        <div className="flex justify-between mb-1">
          <span className="text-slate-400">Fare Displayed:</span>
          <span className="font-medium">₹{amount.toLocaleString('en-IN')}</span>
        </div>
        <div className="flex justify-between mb-1">
          <span className="text-slate-400">Taxes & Fees:</span>
          <span className="font-medium">₹{taxes.toLocaleString('en-IN')}</span>
        </div>
        <div className="flex justify-between pt-1 border-t border-slate-700 font-bold text-sky-400">
          <span>Total Fare:</span>
          <span>₹{total.toLocaleString('en-IN')}</span>
        </div>
      </div>
    </div>
  );
};
