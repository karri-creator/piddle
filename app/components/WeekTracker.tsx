'use client';

import { Check } from 'lucide-react';

const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

interface WeekTrackerProps {
  checkedDays: boolean[];
  currentDayIndex?: number;
}

export default function WeekTracker({ checkedDays, currentDayIndex = new Date().getDay() - 1 }: WeekTrackerProps) {
  // Adjust for Sunday being 0
  const adjustedCurrentDay = currentDayIndex < 0 ? 6 : currentDayIndex;
  
  return (
    <div className="flex justify-between items-center gap-2">
      {days.map((day, index) => {
        const isChecked = checkedDays[index];
        const isCurrent = index === adjustedCurrentDay;
        const isFuture = index > adjustedCurrentDay;
        
        return (
          <div key={index} className="flex flex-col items-center gap-1">
            <span className="text-xs font-body text-charcoal/50">{day}</span>
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                isChecked
                  ? 'bg-blue text-white'
                  : isCurrent
                  ? 'bg-sunshine border-2 border-sunshine'
                  : isFuture
                  ? 'bg-charcoal/5 border-2 border-charcoal/10'
                  : 'bg-charcoal/10 border-2 border-charcoal/20'
              }`}
            >
              {isChecked && <Check size={16} strokeWidth={3} />}
            </div>
          </div>
        );
      })}
    </div>
  );
}
