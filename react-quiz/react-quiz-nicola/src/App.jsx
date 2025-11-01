import { useState } from "react";
import Confetti from "react-confetti";
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
  };

  const goToNext = () => {
    if (currentQuestion + 1 < questions.length) { // sprawdza, czy są jeszcze pytania do wyświetlenia 
      setCurrentQuestion(currentQuestion + 1); // przechodzi do następnego pytania
      setSelectedAnswer(null); // resetuje zaznaczoną odpowiedź
      setShowFeedback(false); // ukrywa informację zwrotną
    }
    else {
      setIsFinished(true); // oznacza, że quiz się zakończył
    }
  };

  const restartQuiz = () => () => {
    setCurrentQuestion(0); // resetuje do pierwszego pytania
    setScore(0); // resetuje wynik
    setSelectedAnswer(null); // resetuje zaznaczoną odpowiedź 
    setShowFeedback(false); // ukrywa informację zwrotną
    setIsFinished(false); // ustawia quiz jako nieukończony
  }

  const calculateProgress = () => {
    if (isFinished) return 100;
    const baseProgress = (currentQuestion / questions.length) * 100; // postęp na podstawie ukończonych pytań
    const questionProgress = selectedAnswer ? (1 / questions.length) * 100 : 0; // dodatkowy postęp, jeśli odpowiedź została udzielona
    return baseProgress + questionProgress; // całkowity postęp
  }

  const percantege = (score / questions.length) * 100; // oblicza procentowy wynik
  const showConfetti = isFinished && percantege >= 50; // pokazuje konfetti, jeśli wynik jest 50% lub wyższy

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4 space-y-8">
      {showConfetti && <Confetti />}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-purple-600 mb-2">Nicola - Aplikacja Quizów</h1>
        <p className="text-gray-400">Sprawdź swoją wiedzę na temat Polski!</p>
      </div>
      
      <div className="w-full max-w-xl mb-6">
        <div className="bg-gray-700 h-3 rounded-full overflow-hidden">
          <div className="h-full bg-linear-to-r from-indigo-600 to-purple-600 duration-500 ease-out transition-all"
           style={{ width: `${calculateProgress()}%` }}></div>
        </div>
      </div>

      {!isFinished ? (
        <>
        <QuestionCard 
        showFeedback={showFeedback}
        onAnswer={handleAnswer} 
        data={questions[currentQuestion]} 
        currentQuestion={currentQuestion}
        totalQuestions={questions.length}
        selectedAnswer={selectedAnswer}
      />
      <div className="mt-6 min-h-[60px]">
        {showFeedback && (
          <button className="bg-linear-to-r from-indigo-600 to-purple-600 py-3 px-6 rounded-lg font-medium shadow-lg cursor-pointer" onClick={goToNext}>
            {currentQuestion + 1 < questions.length ? "Następne pytanie" : "Zobacz wynik"}
          </button>
        )}
      </div>
        </>
      ) : (
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Gratulacje! Zakończyłeś quiz!</h2>
          <p className="text-xl mb-6">Twój wynik: <span>{score}</span> z <span className="font-bold">{questions.length}</span> {" "}
             - co daje: <span className="font-semibold">{Math.round((score / questions.length) * 100)}%</span>
          </p>
          <button 
            className="bg-linear-to-r from-indigo-600 to-purple-600 py-3 px-6 rounded-lg font-medium shadow-lg cursor-pointer" 
            onClick={restartQuiz()}>
            Zresetuj Quiz
          </button>
        </div>
      )}
    </div>
  );
}

export default App;