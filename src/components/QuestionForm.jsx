import React, { useMemo } from 'react';

// Helper to decode HTML entities from API
function decodeHtml(html) {
  const txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;
}

function shuffle(array) {
  // Fisher-Yates shuffle
  let arr = array.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

const QuestionForm = ({ questionData, onAnswer, selectedAnswer, setSelectedAnswer, error, loading, apiError }) => {
  // Combine and shuffle answers only once per question
  const answers = useMemo(() => {
    if (!questionData) return [];
    const all = [
      questionData.correct_answer,
      ...questionData.incorrect_answers,
    ];
    return shuffle(all);
  }, [questionData]);

  if (loading) return <div>Loading question...</div>;
  if (apiError) return <div className="error">{apiError}</div>;
  if (!questionData) return null;

  return (
    <div className="liquid-glass-container">
      <div className="liquid-glass-content">
        <h2>Quiz Question</h2>
        <form onSubmit={onAnswer} style={{width: '100%', maxWidth: '22rem'}}>
          <div className="question-text" style={{marginBottom: '1.2em', fontWeight: 500, fontSize: '1.13rem', textAlign: 'center'}}>
            {decodeHtml(questionData.question)}
          </div>
          <div className="answers-group" style={{display: 'flex', flexDirection: 'column', gap: '0.7em', marginBottom: '1.2em'}}>
            {answers.map((ans, idx) => (
              <label key={idx} className="answer-option" style={{display: 'flex', alignItems: 'center', background: 'rgba(255,255,255,0.38)', borderRadius: '0.8em', padding: '0.5em 1em', cursor: 'pointer', boxShadow: '0 1px 4px 0 rgba(31,38,135,0.04)'}}>
                <input
                  type="radio"
                  name="answer"
                  value={ans}
                  checked={selectedAnswer === ans}
                  onChange={() => setSelectedAnswer(ans)}
                  style={{marginRight: '0.8em'}}
                />
                {decodeHtml(ans)}
              </label>
            ))}
          </div>
          {error && <div className="error">{error}</div>}
          <button type="submit">Submit Answer</button>
        </form>
      </div>
    </div>
  );
};

export default QuestionForm;
