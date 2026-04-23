'use client';

interface MascotProps {
  mood?: 'happy' | 'excited' | 'thinking' | 'waving';
  size?: 'sm' | 'md' | 'lg';
  animate?: boolean;
}

export default function Mascot({ mood = 'happy', size = 'md', animate = true }: MascotProps) {
  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-20 h-20',
    lg: 'w-32 h-32',
  };

  const faces = {
    happy: { eyes: '^', mouth: 'u' },
    excited: { eyes: '>', mouth: 'D' },
    thinking: { eyes: '.', mouth: '-' },
    waving: { eyes: '^', mouth: 'v' },
  };

  return (
    <div className={`relative ${sizeClasses[size]} ${animate ? 'float' : ''}`}>
      {/* Body */}
      <div className="w-full h-full bg-sunshine rounded-full relative shadow-lg">
        {/* Face */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {/* Eyes */}
          <div className="flex gap-2 mb-1">
            <div className="w-1.5 h-1.5 bg-charcoal rounded-full"></div>
            <div className="w-1.5 h-1.5 bg-charcoal rounded-full"></div>
          </div>
          {/* Mouth */}
          <div className="w-3 h-1.5 border-b-2 border-charcoal rounded-b-full"></div>
        </div>
        
        {/* Arms for waving */}
        {mood === 'waving' && (
          <div className="absolute -right-2 top-1/4 w-4 h-1.5 bg-sunshine rounded-full wiggle origin-left"></div>
        )}
        
        {/* Excited sparkles */}
        {mood === 'excited' && (
          <>
            <div className="absolute -top-1 -right-1 text-sunshine text-xs">✨</div>
            <div className="absolute -top-2 left-0 text-sunshine text-xs">✨</div>
          </>
        )}
      </div>
    </div>
  );
}
