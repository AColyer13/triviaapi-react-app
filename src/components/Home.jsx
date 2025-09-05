import React from 'react';

const categories = [
  { value: '', label: 'Select Category' },
  { value: '9', label: 'General Knowledge' },
  { value: '18', label: 'Science: Computers' },
  { value: '21', label: 'Sports' },
  { value: '23', label: 'History' },
];

const difficulties = [
  { value: '', label: 'Select Difficulty' },
  { value: 'easy', label: 'Easy' },
  { value: 'medium', label: 'Medium' },
  { value: 'hard', label: 'Hard' },
];


const Home = ({ formData, onChange, onSubmit, error }) => {
  return (
    <div className="liquid-glass-container">
      <div className="liquid-glass-content">
        <h1>React Trivia Quiz</h1>
        <p style={{marginBottom: '0.5em'}}>Welcome to the Open Trivia Quiz! Test your knowledge and see how many questions you can get right.</p>
        <ul className="instructions">
          <li>Enter your first name.</li>
          <li>Select a category and difficulty.</li>
          <li>Click Start to get your question!</li>
        </ul>
        <form className="quiz-form" onSubmit={onSubmit} style={{width: '100%', maxWidth: '22rem'}}>
          <div className="form-group">
            <label htmlFor="name">First Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={onChange}
              autoComplete="off"
              placeholder="Your first name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="category">Category:</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={onChange}
            >
              {categories.map((cat) => (
                <option key={cat.value} value={cat.value}>{cat.label}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="difficulty">Difficulty:</label>
            <select
              id="difficulty"
              name="difficulty"
              value={formData.difficulty}
              onChange={onChange}
            >
              {difficulties.map((diff) => (
                <option key={diff.value} value={diff.value}>{diff.label}</option>
              ))}
            </select>
          </div>
          {error && <div className="error">{error}</div>}
          <button type="submit">Start Quiz</button>
        </form>
      </div>
    </div>
  );
};

export default Home;
