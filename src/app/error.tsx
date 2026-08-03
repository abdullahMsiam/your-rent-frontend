'use client';

export default function ErrorBoundary({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center space-y-4">
      <h2 className="text-2xl font-bold text-slate-900">Something went wrong!</h2>
      <p className="text-slate-500 text-sm max-w-md">{error.message || 'An unexpected error occurred while loading this page.'}</p>
      <button
        onClick={() => reset()}
        className="bg-slate-900 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-slate-800 transition"
      >
        Try Again
      </button>
    </div>
  );
}