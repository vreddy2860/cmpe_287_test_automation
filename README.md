# Java Syntax Testing Platform

A web-based platform for testing and comparing Java syntax explanations using Large Language Models (LLMs). This project aims to provide consistent and accurate Java programming language explanations by comparing responses from multiple LLM instances.

## Features

### Test Categories
1. **Lexical Syntax**
   - Valid identifiers in Java
   - Java comments syntax

2. **Control Flow**
   - If-else statement syntax
   - For loop implementation

3. **Class and Method Structure**
   - Class declaration syntax
   - Method definition guidelines

4. **Data Types and Variables**
   - Primitive data types
   - Variable declaration rules

### Key Features
- Side-by-side comparison of responses from two LLM instances
- Individual test case execution
- Real-time response validation
- Modern, responsive UI with dark theme
- Clear pass/fail indicators for each test

## Technology Stack

- **Frontend**: Next.js 14 with App Router
- **Styling**: Tailwind CSS
- **API Integration**: Meta's Llama API
- **State Management**: React Hooks
- **HTTP Client**: Axios

## Getting Started

### Prerequisites
- Node.js 18.17 or later
- Meta Llama API access

### Environment Setup
1. Clone the repository
2. Create a `.env.local` file with your API key:
   ```env
   DEEPSEEK_API_KEY=your_llama_api_key
   ```

### Installation
```bash
npm install
npm run dev
```

Open [http://localhost:3001](http://localhost:3001) to view the application.

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── test/         # API endpoints
│   ├── tests/
│   │   └── [sectionId]/  # Dynamic test pages
│   └── page.tsx          # Main dashboard
├── components/           # Reusable components
└── styles/              # Global styles
```

## API Integration

The platform uses two instances of the Llama API with different prompting strategies:

1. **First Instance**
   - Role: Java Expert
   - Temperature: 0.7
   - Focused on detailed, accurate responses

2. **Second Instance**
   - Role: Java Instructor
   - Temperature: 0.8
   - Emphasizes clear, educational explanations

## Testing Methodology

1. Each test case is run against both LLM instances
2. Responses are compared for consistency
3. Tests pass when both instances provide valid responses
4. Results show side-by-side comparisons for analysis

## Contributing

1. Fork the repository
2. Create a feature branch
3. Submit a pull request

## License

MIT License - See LICENSE file for details
