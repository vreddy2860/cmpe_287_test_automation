'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Home() {
  const router = useRouter();
  const [isNavigating, setIsNavigating] = useState(false);

  const handleNavigation = (sectionId: string) => {
    setIsNavigating(true);
    router.push(`/tests/${sectionId}`);
  };
  const sections = [
    { id: 'lexical', title: 'Lexical Syntax' },
    { id: 'control', title: 'Control Flow' },
    { id: 'class', title: 'Class and Method Structure' },
    { id: 'data', title: 'Data Type and Variables' },
  ];

  return (
    <main className="min-h-screen p-8 bg-slate-900">
      <h1 className="text-4xl font-bold text-center mb-8 text-white">Java Syntax Testing</h1>
      <div className="grid grid-cols-2 gap-6 max-w-4xl mx-auto mb-8">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => handleNavigation(section.id)}
            disabled={isNavigating}
            className="p-6 rounded-lg transition-all duration-200 text-lg font-medium 
              bg-slate-800 text-white hover:bg-slate-700 border-2 border-blue-400
              hover:shadow-lg hover:shadow-blue-500/30 hover:scale-105
              flex items-center justify-center text-center
              disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {section.title}
          </button>
        ))}
      </div>
    </main>
  );
}
