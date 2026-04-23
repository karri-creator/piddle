import Image from 'next/image';

export default function Logo({ variant = 'header' }: { variant?: 'header' | 'hero' }) {
  const isHero = variant === 'hero';
  
  return (
    <div className="inline-flex flex-col items-center">
      <Image 
        src="/images/piddle-logo.png"
        alt="Piddle"
        width={isHero ? 400 : 140}
        height={isHero ? 120 : 42}
        className={isHero ? 'w-[280px] md:w-[400px] h-auto' : 'w-[140px] h-auto'}
        priority
      />
      {isHero && (
        <p className="text-white/80 text-sm md:text-base font-body mt-2 tracking-wide">
          Stop piddling around. Start building streaks.
        </p>
      )}
    </div>
  );
}
