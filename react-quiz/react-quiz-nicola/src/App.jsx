import { useState } from "react";
import QuestionCard from "./components/QuestionCard";
import { questions } from "./data/questions";

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
 
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4 space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-purple-600 mb-2">Nicola - Aplikacja Quizów</h1>
        <p className="text-gray-400">Sprawdź swoją wiedzę na temat Polski!</p>
      </div>
      <QuestionCard data={questions[currentQuestion]} />
    </div>
  );
}

export default App;