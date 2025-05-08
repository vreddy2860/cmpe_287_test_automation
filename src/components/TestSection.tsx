'use client';
import { useState } from 'react';
import axios from 'axios';

interface TestResult {
  question: string;
  chatgptAnswer: string;
  deepseekAnswer: string;
  passed: boolean;
}

export default function TestSection({ sectionId }: { sectionId: string }) {
  const [results, setResults] = useState<TestResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const runTests = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post('/api/test', { section: sectionId });
      setResults(response.data.results);
    } catch (error) {
      console.error('Error running tests:', error);
      setError('Failed to run tests. Please try again.');
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <button
        onClick={runTests}
        disabled={loading}
        className="mb-6 px-6 py-3 bg-emerald-500 text-white text-lg font-medium rounded-lg hover:bg-emerald-600 disabled:bg-slate-600 disabled:cursor-not-allowed shadow-lg shadow-emerald-500/30 transition-all duration-200"
      >
        {loading ? 'Running Tests...' : 'Run Tests'}
      </button>

      {error && (
        <div className="mb-6 p-4 bg-red-900/50 text-red-200 border-2 border-red-500 rounded-lg shadow-lg">
          {error}
        </div>
      )}

      <div className="space-y-6">
        {results.map((result, index) => (
          <div
            key={index}
            className={`p-6 rounded-lg shadow-xl ${result.passed 
              ? 'bg-emerald-900/50 border-2 border-emerald-500 text-emerald-100' 
              : 'bg-red-900/50 border-2 border-red-500 text-red-100'}`}
          >
            <h3 className="text-xl font-bold text-white mb-4">{result.question}</h3>
            <div className="space-y-4">
              <div className="bg-slate-800/50 p-4 rounded-lg">
                <p className="font-semibold text-blue-300 mb-2">ChatGPT Response:</p>
                <p className="text-slate-200">{result.chatgptAnswer}</p>
              </div>
              <div className="bg-slate-800/50 p-4 rounded-lg">
                <p className="font-semibold text-purple-300 mb-2">Deepseek Response:</p>
                <p className="text-slate-200">{result.deepseekAnswer}</p>
              </div>
              <div className="mt-4 flex items-center">
                <span className="font-medium text-white mr-2">Status:</span>
                {result.passed ? (
                  <span className="bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full border border-emerald-500">
                    ✅ Pass
                  </span>
                ) : (
                  <span className="bg-red-500/20 text-red-300 px-3 py-1 rounded-full border border-red-500">
                    ❌ Fail
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
