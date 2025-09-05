
import React, { useState } from 'react';
import './App.css';
import Home from './components/Home';
import QuestionForm from './components/QuestionForm';
import Results from './components/Results';

function App() {
  const [step, setStep] = useState('home'); // 'home' | 'question' | 'results'
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    difficulty: '',
  });
  const [formError, setFormError] = useState('');
  const [questionData, setQuestionData] = useState(null);
  const [questionError, setQuestionError] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [answerError, setAnswerError] = useState('');
  const [isCorrect, setIsCorrect] = useState(null);

  // Handle input changes for Home form
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormError('');
  };

  // Handle Home form submit
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.category || !formData.difficulty) {
      setFormError('All fields are required.');
      return;
    }
    setLoading(true);
    setQuestionError('');
    setSelectedAnswer('');
    setAnswerError('');
    setIsCorrect(null);
    // Fetch question from API
    try {
      const url = `https://opentdb.com/api.php?amount=1&category=${formData.category}&difficulty=${formData.difficulty}&type=multiple`;
      const res = await fetch(url);
      const data = await res.json();
      if (data.response_code !== 0 || !data.results || !data.results[0]) {
        setQuestionError('No question found. Try different options.');
        setLoading(false);
        return;
      }
      setQuestionData(data.results[0]);
      setStep('question');
    } catch (err) {
      setQuestionError('Failed to fetch question. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle answer selection and submit
  const handleAnswer = (e) => {
    e.preventDefault();
    if (!selectedAnswer) {
      setAnswerError('Please select an answer.');
      return;
    }
    setAnswerError('');
    const correct = selectedAnswer === questionData.correct_answer;
    setIsCorrect(correct);
    setStep('results');
  };

  // Restart quiz
  const handleRestart = () => {
    setFormData({ name: '', category: '', difficulty: '' });
    setFormError('');
    setQuestionData(null);
    setQuestionError('');
    setSelectedAnswer('');
    setAnswerError('');
    setIsCorrect(null);
    setStep('home');
  };

  return (
    <div className="App">
      {step === 'home' && (
        <Home
          formData={formData}
          onChange={handleFormChange}
          onSubmit={handleFormSubmit}
          error={formError}
        />
      )}
      {step === 'question' && questionData && (
        <QuestionForm
          questionData={questionData}
          onAnswer={handleAnswer}
          selectedAnswer={selectedAnswer}
          setSelectedAnswer={setSelectedAnswer}
          error={answerError}
          loading={loading}
          apiError={questionError}
        />
      )}
      {step === 'results' && (
        <Results
          userName={formData.name}
          isCorrect={isCorrect}
          correctAnswer={questionData?.correct_answer}
          onRestart={handleRestart}
        />
      )}
      {step === 'question' && questionError && (
        <div className="error">{questionError}</div>
      )}
    </div>
  );
}

export default App;
