export default function Logo({ variant = 'header' }: { variant?: 'header' | 'hero' }) {
  const isHero = variant === 'hero';
  
  return (
    <div className="inline-flex flex-col items-center">
      <span 
        className={`font-logo text-black ${isHero ? 'text-6xl md:text-8xl' : 'text-3xl'}`}
      >
        piddle
      </span>
      {isHero && (
        <p className="text-white/80 text-sm md:text-base font-body mt-2 tracking-wide">
          Stop piddling around. Start building streaks.
        </p>
      )}
    </div>
  );
}
