'use client';

interface FlameProps {
  size?: number;
}

export default function Flame({ size = 24 }: FlameProps) {
  return (
    <span 
      className="flame-animate inline-block"
      style={{ fontSize: `${size}px` }}
    >
      🔥
    </span>
  );
}
