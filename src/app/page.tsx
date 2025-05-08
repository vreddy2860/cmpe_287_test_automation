'use client';
import { useState } from 'react';
import TestSection from '@/components/TestSection';

export default function Home() {
  const [activeSection, setActiveSection] = useState('');

  const sections = [
    { id: 'lexical', title: 'Lexical Syntax' },
    { id: 'control', title: 'Control Flow' },
    { id: 'class', title: 'Class and Method Structure' },
    { id: 'data', title: 'Data Type and Variables' },
  ];

  return (
    <main className="min-h-screen p-8 bg-gray-50">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Java Syntax Testing</h1>
      <div className="grid grid-cols-2 gap-4 max-w-4xl mx-auto mb-8">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => setActiveSection(section.id)}
            className={`p-4 rounded-lg transition-all duration-200 ${
              activeSection === section.id
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-800 border-2 border-blue-500 hover:bg-blue-50'
            }`}
          >
            {section.title}
          </button>
        ))}
      </div>
      {activeSection && <TestSection sectionId={activeSection} />}
    </main>
  );
}
