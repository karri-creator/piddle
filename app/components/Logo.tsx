export default function Logo({ variant = 'header' }: { variant?: 'header' | 'hero' }) {
  const isHero = variant === 'hero';
  
  return (
    <div className="inline-flex flex-col items-start">
      <span 
        className={`font-logo text-charcoal ${isHero ? 'text-5xl md:text-6xl' : 'text-2xl'}`}
      >
        piddle
      </span>
      {isHero && (
        <p className="text-charcoal/70 text-base font-body mt-1">
          small efforts. <span className="text-blue font-semibold">big streaks.</span>
        </p>
      )}
    </div>
  );
}
