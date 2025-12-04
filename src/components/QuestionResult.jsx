import React from 'react';

// Helper to decode HTML entities
function decodeHtml(html) {
  const txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;
}

const QuestionResult = ({ result, onNext, isLastQuestion }) => {
  return (
    <div className="liquid-glass-container">
      <div className="liquid-glass-content">
        <h2>Question Result</h2>
        {result.isCorrect ? (
          <p style={{fontWeight: 500, fontSize: '1.13rem', color: '#27ae60'}}>🎉 Correct! You got it right!</p>
        ) : (
          <>
            <p style={{fontWeight: 500, fontSize: '1.13rem', color: '#e74c3c'}}>❌ Sorry, that's not correct.</p>
            <p style={{marginTop: '0.5em'}}>The correct answer was: <strong>{decodeHtml(result.correctAnswer)}</strong></p>
            <p style={{marginTop: '0.5em', fontSize: '0.9rem', color: '#7f8c8d'}}>
              You selected: {decodeHtml(result.selectedAnswer)}
            </p>
          </>
        )}
        <button onClick={onNext}>
          {isLastQuestion ? 'View Final Results' : 'Next Question'}
        </button>
      </div>
    </div>
  );
};

export default QuestionResult;