import { Link } from 'react-router-dom';

const Footer = ({ sidebarOffset = false }) => {
  return (
    <footer
      className={`w-full py-12 px-8 grid grid-cols-1 md:grid-cols-3 gap-8 items-center bg-slate-900 border-t-4 border-green-600 font-['Plus_Jakarta_Sans'] text-xs uppercase tracking-widest${sidebarOffset ? ' ml-64 w-[calc(100%-16rem)]' : ''}`}
    >
      <div className="space-y-4">
        <div className="text-lg font-bold text-white">KrushiMart</div>
        <p className="text-slate-500 normal-case tracking-normal text-sm leading-relaxed">
          Empowering farmers with direct access to global markets while ensuring consumers get the freshest harvest.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6 justify-center">
        <Link to="/about" className="text-slate-500 hover:text-green-400 transition-colors">About Us</Link>
        <Link to="/shop" className="text-slate-500 hover:text-green-400 transition-colors">Shop</Link>
        <Link to="/about" className="text-slate-500 hover:text-green-400 transition-colors">Contact Us</Link>
        <Link to="/about" className="text-slate-500 hover:text-green-400 transition-colors">Sustainability</Link>
      </div>

      <div className="text-right">
        <p className="text-slate-500">© 2026 KrushiMart. Future-Forward Growth.</p>
      </div>
    </footer>
  );
};

export default Footer;
