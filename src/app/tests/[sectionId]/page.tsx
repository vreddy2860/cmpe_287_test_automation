'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { use } from 'react';
import axios from 'axios';

interface TestCase {
  id: string;
  question: string;
  chatgptAnswer: string;
  deepseekAnswer: string;
  passed: boolean;
}

const sectionTitles: { [key: string]: string } = {
  'lexical': 'Lexical Syntax',
  'control': 'Control Flow',
  'class': 'Class and Method Structure',
  'data': 'Data Type and Variables'
};

const questions: { [key: string]: string[] } = {
  'lexical': [
    'What are the valid identifiers in Java?',
    'Explain Java comments syntax',
  ],
  'control': [
    'Explain if-else statement syntax',
    'How to write a for loop in Java',
  ],
  'class': [
    'What is the syntax for declaring a class?',
    'How to define a method in Java?',
  ],
  'data': [
    'List primitive data types in Java',
    'How to declare variables in Java',
  ],
};

export default function TestPage({ params }: { params: Promise<{ sectionId: string }> }) {
  const router = useRouter();
  const resolvedParams = use(params);
  const sectionId = resolvedParams.sectionId;

  useEffect(() => {
    // Validate section ID
    if (!sectionTitles[sectionId]) {
      router.push('/');
    }
  }, [sectionId, router]);
  const [testResults, setTestResults] = useState<{ [key: string]: TestCase | null }>({});
  const [loading, setLoading] = useState<{ [key: string]: boolean }>({});
  const [error, setError] = useState<{ [key: string]: string | null }>({});

  const runTest = async (questionId: string, question: string) => {
    setLoading(prev => ({ ...prev, [questionId]: true }));
    setError(prev => ({ ...prev, [questionId]: null }));

    try {
      const response = await axios.post('/api/test', { 
        section: sectionId,
        question: question
      });
      
      setTestResults(prev => ({
        ...prev,
        [questionId]: {
          id: questionId,
          question: question,
          ...response.data.results[0]
        }
      }));
    } catch (err) {
      setError(prev => ({
        ...prev,
        [questionId]: 'Failed to run test. Please try again.'
      }));
    } finally {
      setLoading(prev => ({ ...prev, [questionId]: false }));
    }
  };

  const sectionQuestions = questions[sectionId] || [];

  return (
    <main className="min-h-screen p-8 bg-slate-900">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-white">
            {sectionTitles[sectionId] || 'Tests'}
          </h1>
          <Link
            href="/"
            className="px-4 py-2 text-sm font-medium text-blue-300 border-2 border-blue-400 rounded-lg hover:bg-blue-500/10 transition-colors"
          >
            ← Back to Dashboard
          </Link>
        </div>

        <div className="space-y-6">
          {sectionQuestions.map((question, index) => {
            const questionId = `${sectionId}-${index}`;
            const result = testResults[questionId];

            return (
              <div key={questionId} className="bg-slate-800 rounded-lg p-6 border-2 border-slate-600">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-xl font-medium text-white flex-grow">{question}</h3>
                  <button
                    onClick={() => runTest(questionId, question)}
                    disabled={loading[questionId]}
                    className="px-4 py-2 bg-emerald-500 text-white font-medium rounded-lg hover:bg-emerald-600 
                      disabled:bg-slate-600 disabled:cursor-not-allowed shadow-lg shadow-emerald-500/30 
                      transition-all duration-200 whitespace-nowrap"
                  >
                    {loading[questionId] ? 'Running...' : 'Run Test'}
                  </button>
                </div>

                {error[questionId] && (
                  <div className="mt-4 p-3 bg-red-900/50 text-red-200 border-2 border-red-500 rounded-lg">
                    {error[questionId]}
                  </div>
                )}

                {result && (
                  <div className="mt-6 space-y-4">
                    <div className="bg-slate-900/50 p-4 rounded-lg">
                      <p className="font-semibold text-blue-300 mb-2">ChatGPT Response:</p>
                      <p className="text-slate-200">{result.chatgptAnswer}</p>
                    </div>
                    <div className="bg-slate-900/50 p-4 rounded-lg">
                      <p className="font-semibold text-purple-300 mb-2">Deepseek Response:</p>
                      <p className="text-slate-200">{result.deepseekAnswer}</p>
                    </div>
                    <div className="flex items-center">
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
                )}
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
