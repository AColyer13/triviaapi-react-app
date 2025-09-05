import React from 'react';

// Helper to decode HTML entities
function decodeHtml(html) {
  const txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;
}

const Results = ({ userName, isCorrect, correctAnswer, onRestart }) => {
  return (
    <div className="liquid-glass-container">
      <div className="liquid-glass-content">
        <h2>Results</h2>
        {isCorrect ? (
          <p style={{fontWeight: 500, fontSize: '1.13rem', color: '#27ae60'}}>🎉 Great job, {userName}! You answered correctly!</p>
        ) : (
          <>
            <p style={{fontWeight: 500, fontSize: '1.13rem', color: '#e74c3c'}}>Sorry, {userName}, that's not correct.</p>
            <p style={{marginTop: '0.5em'}}>The correct answer was: <strong>{decodeHtml(correctAnswer)}</strong></p>
          </>
        )}
        <button onClick={onRestart}>Try Another Question</button>
      </div>
    </div>
  );
};

export default Results;
