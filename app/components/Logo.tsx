export default function Logo({ variant = 'header' }: { variant?: 'header' | 'hero' }) {
  const isHero = variant === 'hero';
  
  return (
    <div className="inline-flex flex-col items-center">
      <div className="relative inline-block">
        <span 
          className={`font-heading font-bold tracking-tight ${
            isHero 
              ? 'text-6xl md:text-7xl text-[var(--color-primary)]' 
              : 'text-2xl text-[var(--color-primary)]'
          }`}
        >
          Piddle
        </span>
        {/* Strikethrough line */}
        <div 
          className={`absolute left-0 right-0 bg-white ${
            isHero 
              ? 'h-[3px] top-1/2 -translate-y-1/2' 
              : 'h-[2px] top-1/2 -translate-y-1/2'
          }`}
          style={{ 
            boxShadow: isHero ? '0 1px 2px rgba(0,0,0,0.1)' : 'none'
          }}
        />
      </div>
      {isHero && (
        <p className="text-white/80 text-sm md:text-base font-body mt-2 tracking-wide">
          Stop piddling around. Start building streaks.
        </p>
      )}
    </div>
  );
}
