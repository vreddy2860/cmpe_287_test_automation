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

  const runTests = async () => {
    setLoading(true);
    try {
      const response = await axios.post('/api/test', { section: sectionId });
      setResults(response.data.results);
    } catch (error) {
      console.error('Error running tests:', error);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <button
        onClick={runTests}
        disabled={loading}
        className="mb-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-gray-400"
      >
        {loading ? 'Running Tests...' : 'Run Tests'}
      </button>

      <div className="space-y-4">
        {results.map((result, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg ${
              result.passed ? 'bg-green-100' : 'bg-red-100'
            }`}
          >
            <h3 className="font-bold">{result.question}</h3>
            <div className="mt-2">
              <p><strong>ChatGPT:</strong> {result.chatgptAnswer}</p>
              <p><strong>Deepseek:</strong> {result.deepseekAnswer}</p>
              <p className="mt-2">
                Status: {result.passed ? '✅ Pass' : '❌ Fail'}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
