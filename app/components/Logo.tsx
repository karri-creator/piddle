export default function Logo() {
  return (
    <div className="flex items-center space-x-3">
      <div className="relative">
        <div className="w-10 h-10 bg-[var(--color-hero)] rounded-2xl flex items-center justify-center shadow-[0_20px_40px_rgba(0,0,0,0.12)]">
          <span className="text-[var(--color-surface)] font-bold text-lg">P</span>
        </div>
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-[var(--color-secondary)] rounded-full" />
      </div>
      <div>
        <div className="text-2xl font-heading text-[var(--color-neutral)] tracking-tight">Piddle</div>
        <div className="text-xs uppercase tracking-[0.24em] text-gray-500">Stop Piddling Around!</div>
      </div>
    </div>
  );
}