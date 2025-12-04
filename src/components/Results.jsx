import React from 'react';

const Results = ({ score, total, onRestart }) => {
  return (
    <div className="liquid-glass-container">
      <div className="liquid-glass-content">
        <h2>Quiz Complete!</h2>
        <p style={{fontWeight: 500, fontSize: '1.13rem'}}>You scored {score} out of {total} questions correctly.</p>
        {score === total ? (
          <p style={{color: '#27ae60'}}>🎉 Perfect score! Excellent job!</p>
        ) : score >= total / 2 ? (
          <p style={{color: '#f39c12'}}>Good effort! Keep practicing to improve.</p>
        ) : (
          <p style={{color: '#e74c3c'}}>Better luck next time! Try again.</p>
        )}
        <button onClick={onRestart}>Take Another Quiz</button>
      </div>
    </div>
  );
};

export default Results;
