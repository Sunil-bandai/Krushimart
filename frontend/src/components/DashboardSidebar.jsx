import { Link, useLocation } from 'react-router-dom';
import { getImageSrc } from '../utils/imageUtils';

/**
 * DashboardSidebar
 * Props:
 *  - title: string (e.g. "Farmer Dashboard" | "Admin Dashboard")
 *  - subtitle: string (e.g. "Premium Tier")
 *  - avatarSrc: string
 *  - navItems: Array<{ icon: string, label: string, to: string }>
 *  - ctaLabel: string
 *  - ctaIcon: string
 *  - ctaIcon: string
 *  - onCtaClick: function
 *  - iconNode: ReactNode (optional icon in place of avatar)
 */
const DashboardSidebar = ({
  title = 'Dashboard',
  subtitle = 'Premium Tier',
  avatarSrc,
  iconNode,
  navItems = [],
  ctaLabel = 'Add Product',
  ctaIcon = 'add',
  onCtaClick,
}) => {
  const location = useLocation();

  return (
    <aside className="fixed left-0 top-0 h-full flex flex-col pt-20 bg-slate-950/60 backdrop-blur-lg font-['Plus_Jakarta_Sans'] font-medium text-sm w-64 border-r border-white/10 shadow-2xl z-40">
      {/* Brand + User */}
      <div className="px-6 mb-10">
        <div className="text-xl font-bold text-green-400">KrushiMart</div>
        <div className="mt-4 flex items-center gap-3">
          {avatarSrc ? (
            <div className="w-10 h-10 rounded-full bg-surface-container overflow-hidden border border-white/10 flex-shrink-0">
              <img src={getImageSrc(avatarSrc)} alt="Profile" className="w-full h-full object-cover" />
            </div>
          ) : iconNode ? (
            <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center flex-shrink-0">
              {iconNode}
            </div>
          ) : null}
          <div>
            <p className="text-on-surface font-bold">{title}</p>
            <p className="text-xs text-slate-400">{subtitle}</p>
          </div>
        </div>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 px-4 space-y-2">
        {navItems.map(({ icon, label, to }) => {
          const isActive = location.pathname === to;
          return (
            <Link
              key={to}
              to={to}
              className={
                isActive
                  ? 'flex items-center gap-3 bg-green-500/20 text-green-400 border-r-4 border-green-500 px-4 py-3 rounded-r-lg hover:translate-x-1 duration-200'
                  : 'flex items-center gap-3 text-slate-400 hover:bg-white/5 px-4 py-3 transition-colors hover:translate-x-1 duration-200'
              }
            >
              <span className="material-symbols-outlined">{icon}</span>
              {label}
            </Link>
          );
        })}
      </nav>

      {/* CTA */}
      <div className="p-6">
        <button
          onClick={onCtaClick}
          className="w-full flex items-center justify-center gap-2 bg-primary text-on-primary py-3 rounded-xl font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform"
        >
          <span className="material-symbols-outlined">{ctaIcon}</span>
          {ctaLabel}
        </button>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
