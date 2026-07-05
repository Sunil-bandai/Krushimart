import { useRouteError, Link } from 'react-router-dom';

const NotFoundPage = () => {
  const error = useRouteError();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-on-surface p-xl text-center">
      <div className="glass-panel p-xl rounded-2xl max-w-md">
        <span className="material-symbols-outlined text-primary text-6xl mb-md">explore</span>
        <h1 className="text-h2 font-h2 mb-sm">404 — Page Not Found</h1>
        <p className="text-on-surface-variant mb-lg">
          {error?.statusText || 'The page you are looking for does not exist or has been moved.'}
        </p>
        <Link
          to="/"
          className="inline-block px-xl py-md bg-primary text-on-primary rounded-xl font-bold hover:scale-105 transition-all"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
