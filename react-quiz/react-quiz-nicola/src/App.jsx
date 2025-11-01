import { useState } from "react";
import QuestionCard from "./components/QuestionCard";
import { questions } from "./data/questions";

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleAnswer = (option) => {
    if (showFeedback) return; // zapobiega wielokrotnemu kliknięciu na odpowiedź 

    setSelectedAnswer(option); 
    setShowFeedback(true); 

    // aktualizacja wyniku, jeśli odpowiedź jest poprawna
    if (option === questions[currentQuestion].answer) {
      setScore(score + 1);
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4 space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-purple-600 mb-2">Nicola - Aplikacja Quizów</h1>
        <p className="text-gray-400">Sprawdź swoją wiedzę na temat Polski!</p>
      </div>
      <p>Wynik: {score}</p>
      <QuestionCard onAnswer={handleAnswer} data={questions[currentQuestion]} />
    </div>
  );
}

export default App;