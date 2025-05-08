import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const questions = {
  lexical: [
    'What are the valid identifiers in Java?',
    'Explain Java comments syntax',
  ],
  control: [
    'Explain if-else statement syntax',
    'How to write a for loop in Java',
  ],
  class: [
    'What is the syntax for declaring a class?',
    'How to define a method in Java?',
  ],
  data: [
    'List primitive data types in Java',
    'How to declare variables in Java',
  ],
};

export async function POST(request: Request) {
  try {
    const { section } = await request.json();
    
    if (!section || !questions[section as keyof typeof questions]) {
      return NextResponse.json({ error: 'Invalid section' }, { status: 400 });
    }

    const sectionQuestions = questions[section as keyof typeof questions];
    const results = [];

    for (const question of sectionQuestions) {
      try {
        // Simulate responses for now (remove this in production)
        const chatgptAnswer = `Sample ChatGPT answer for: ${question}`;
        const deepseekAnswer = `Sample Deepseek answer for: ${question}`;
        
        // Simulate validation (implement proper validation in production)
        const passed = Math.random() > 0.5;

        results.push({
          question,
          chatgptAnswer,
          deepseekAnswer,
          passed,
        });
      } catch (error) {
        console.error('Error processing question:', error);
      }
    }

    return NextResponse.json({ results });
  } catch (error) {
    console.error('Error in API route:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
