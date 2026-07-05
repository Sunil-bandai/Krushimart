import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-background text-on-surface p-xl text-center">
          <div className="glass-panel p-xl rounded-2xl max-w-md">
            <span className="material-symbols-outlined text-error text-6xl mb-md">error</span>
            <h1 className="text-h2 font-h2 mb-sm">Something went wrong.</h1>
            <p className="text-on-surface-variant mb-lg">
              The application encountered an unexpected error. Please try refreshing the page.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-xl py-md bg-primary text-on-primary rounded-xl font-bold hover:scale-105 transition-all"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
