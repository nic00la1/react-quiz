import React from 'react'

const QuestionCard = ({data, onAnswer, showFeedback, selectedAnswer, currentQuestion, totalQuestions}) => {
    const {question, options, answer} = data;

    const getButtonStyle = (option) => {
        if (!showFeedback) return 'bg-indigo-700 hover:bg-indigo-600 hover:scale-[1.01]'; // domyślny styl przycisku

        if (option === answer) return 'bg-emerald-600'; // poprawna odpowiedź

        if (option === selectedAnswer) return 'bg-rose-600'; // zaznaczona błędna odpowiedź

        return 'bg-gray-600'; // pozostałe przyciski po udzieleniu odpowiedzi
    }

  return (
    <div className='bg-gray-800 p-6 rounded-2xl shadow-lg w-full max-w-xl border border-gray-700'>
        <div className='flex justify-between items-center mb-4'>
            <h2 className='text-lg font-medium text-gray-300'>
                Pytanie {currentQuestion + 1} z {totalQuestions}
            </h2>
        
            {/* Pasek postępu */}
            <span className='text-sm bg-gray-700 px-3 py-1 rounded-full'> 
                {
                    selectedAnswer 
                    ? Math.round(((currentQuestion + 1) / totalQuestions * 100)) + "% ukończono" // pokazuje postęp w procentach po udzieleniu odpowiedzi
                    : Math.round((currentQuestion / totalQuestions) * 100) + "% ukończono" // pokazuje postęp w procentach przed udzieleniem odpowiedzi
                }
            </span>
        </div>
      <p className='text-xl font-medium mb-6'>{question}</p>
      <div className='grid gap-3'>
        {
            options.map((option, index) => (
                <button className={`${getButtonStyle(option)} 
                text-left px-4 py-3 cursor-pointer rounded-lg text-white`}
                 key={index} 
                 onClick={() => onAnswer(option)}
                 disabled={showFeedback}>
                    {option}
                </button>
            ))
        }
      </div>
    </div>
  )
}

export default QuestionCard
