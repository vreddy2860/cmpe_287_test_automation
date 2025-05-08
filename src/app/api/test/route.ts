import { NextResponse } from 'next/server';

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

async function callDeepseekAPI(prompt: string) {
  try {
    console.log('Calling Llama API (First Instance) with prompt:', prompt);
    const response = await fetch('https://llama.developer.meta.com/playground/chat/?team_id=659665806832665', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'Llama-4-Maverick-17B-128E-Instruct-FP8',
        messages: [{ 
          role: 'user', 
          content: `You are a Java expert. Please provide a detailed and accurate answer to this question about Java: ${prompt}` 
        }],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Llama API (First Instance) error response:', errorText);
      throw new Error(`Llama API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Llama API (First Instance) response:', data);
    return data.choices[0].message.content;
  } catch (error) {
    console.error('Error calling Llama API (First Instance):', error);
    throw error;
  }
}

async function callChatGPTAPI(prompt: string) {
  try {
    console.log('Calling Llama API (Second Instance) with prompt:', prompt);
    const response = await fetch('https://llama.developer.meta.com/playground/chat/?team_id=659665806832665', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`,
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        model: 'Llama-4-Maverick-17B-128E-Instruct-FP8',
        messages: [{ 
          role: 'user', 
          content: `Act as a Java programming language instructor. Please explain this Java concept in a clear and concise way: ${prompt}` 
        }],
        temperature: 0.8,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Llama API (Second Instance) error response:', errorText);
      throw new Error(`Llama API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Llama API (Second Instance) response:', data);
    return data.choices[0].message.content;
  } catch (error) {
    console.error('Error calling Llama API (Second Instance):', error);
    throw error;
  }
}

export async function POST(request: Request) {
  try {
    const { section, question } = await request.json();
    
    if (!section || !questions[section as keyof typeof questions]) {
      return NextResponse.json({ error: 'Invalid section' }, { status: 400 });
    }

    // If a specific question is provided, only test that question
    const questionsToTest = question 
      ? [question]
      : questions[section as keyof typeof questions];

    const results = [];

    for (const q of questionsToTest) {
      try {
        // Call both APIs in parallel
        const [deepseekAnswer, chatgptAnswer] = await Promise.all([
          callDeepseekAPI(q),
          callChatGPTAPI(q)
        ]);
        
        // Compare answers to determine if they agree
        const passed = deepseekAnswer.length > 0 && chatgptAnswer.length > 0;

        results.push({
          question: q,
          chatgptAnswer,
          deepseekAnswer,
          passed,
        });
      } catch (error) {
        console.error('Error processing question:', error);
        results.push({
          question: q,
          chatgptAnswer: 'Error fetching response',
          deepseekAnswer: 'Error fetching response',
          passed: false,
        });
      }
    }

    return NextResponse.json({ results });
  } catch (error) {
    console.error('Error in API route:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
