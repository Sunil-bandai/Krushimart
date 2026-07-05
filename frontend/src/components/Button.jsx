/**
 * Button – KrushiMart design-system button
 * Props:
 *  - variant: 'primary' | 'outline' | 'ghost' | 'glass' (default: 'primary')
 *  - size: 'sm' | 'md' | 'lg' (default: 'md')
 *  - icon: string (material symbol name, optional)
 *  - iconPosition: 'left' | 'right' (default: 'left')
 *  - disabled: bool
 *  - className: string (additional classes)
 *  - All other button props (onClick, type, etc.)
 */
const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  disabled = false,
  className = '',
  ...props
}) => {
  const base =
    'inline-flex items-center justify-center gap-2 font-bold rounded-xl transition-all duration-150 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed';

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-body-md',
    lg: 'px-xl py-md text-h3',
  };

  const variants = {
    primary:
      'bg-primary text-on-primary shadow-lg shadow-primary/20 hover:brightness-110',
    outline:
      'border border-primary text-primary hover:bg-primary/10',
    ghost:
      'text-slate-300 hover:text-white hover:bg-white/10',
    glass:
      'glass-panel text-white border border-white/20 hover:bg-white/10',
  };

  const iconEl = icon && (
    <span className="material-symbols-outlined text-[1em]">{icon}</span>
  );

  return (
    <button
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
      disabled={disabled}
      {...props}
    >
      {icon && iconPosition === 'left' && iconEl}
      {children}
      {icon && iconPosition === 'right' && iconEl}
    </button>
  );
};

export default Button;
