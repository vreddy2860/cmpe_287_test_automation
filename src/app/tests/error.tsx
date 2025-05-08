'use client';
 
import { useEffect } from 'react';
import Link from 'next/link';
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);
 
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-8">
      <div className="text-center space-y-6">
        <h2 className="text-3xl font-bold text-white">Something went wrong!</h2>
        <div className="space-x-4">
          <button
            onClick={() => reset()}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Try again
          </button>
          <Link
            href="/"
            className="px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors inline-block"
          >
            Go back home
          </Link>
        </div>
      </div>
    </div>
  );
}
