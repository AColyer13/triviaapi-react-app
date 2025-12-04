
import React, { useState } from 'react';
import './App.css';
import Home from './components/Home';
import QuestionForm from './components/QuestionForm';
import QuestionResult from './components/QuestionResult';
import Results from './components/Results';

function App() {
  const [step, setStep] = useState('home'); // 'home' | 'question' | 'questionResult' | 'results'
  const [formData, setFormData] = useState({
    category: '',
    difficulty: '',
  });
  const [formError, setFormError] = useState('');
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questionError, setQuestionError] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [answerError, setAnswerError] = useState('');
  const [score, setScore] = useState(0);
  const [currentQuestionResult, setCurrentQuestionResult] = useState(null);

  // Handle input changes for Home form
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormError('');
  };

  // Handle Home form submit
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.category || !formData.difficulty) {
      setFormError('All fields are required.');
      return;
    }
    setLoading(true);
    setQuestionError('');
    setSelectedAnswer('');
    setAnswerError('');
    setScore(0);
    setCurrentQuestionIndex(0);
    // Fetch 5 questions from API
    try {
      const url = `https://opentdb.com/api.php?amount=5&category=${formData.category}&difficulty=${formData.difficulty}&type=multiple`;
      const res = await fetch(url);
      const data = await res.json();
      if (data.response_code !== 0 || !data.results || data.results.length < 5) {
        setQuestionError('Not enough questions found. Try different options.');
        setLoading(false);
        return;
      }
      setQuestions(data.results);
      setStep('question');
    } catch (err) {
      console.error('Error fetching questions:', err);
      setQuestionError('Failed to fetch questions. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle answer selection and submit
  const handleAnswer = (selectedAnswer) => {
    if (!selectedAnswer) {
      setAnswerError('Please select an answer.');
      return;
    }
    setAnswerError('');
    const currentQuestion = questions[currentQuestionIndex];
    const correct = selectedAnswer === currentQuestion.correct_answer;
    if (correct) {
      setScore(prev => prev + 1);
    }
    setCurrentQuestionResult({
      isCorrect: correct,
      correctAnswer: currentQuestion.correct_answer,
      selectedAnswer: selectedAnswer
    });
    setStep('questionResult');
  };

  // Handle proceeding to next question or final results
  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer('');
      setCurrentQuestionResult(null);
      setStep('question');
    } else {
      setStep('results');
    }
  };

  // Restart quiz
  const handleRestart = () => {
    setFormData({ category: '', difficulty: '' });
    setFormError('');
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setQuestionError('');
    setSelectedAnswer('');
    setAnswerError('');
    setScore(0);
    setCurrentQuestionResult(null);
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
      {step === 'question' && questions.length > 0 && (
        <QuestionForm
          questionData={questions[currentQuestionIndex]}
          onAnswer={handleAnswer}
          selectedAnswer={selectedAnswer}
          setSelectedAnswer={setSelectedAnswer}
          error={answerError}
          loading={loading}
          apiError={questionError}
          currentIndex={currentQuestionIndex}
          total={questions.length}
        />
      )}
      {step === 'questionResult' && currentQuestionResult && (
        <QuestionResult
          result={currentQuestionResult}
          onNext={handleNextQuestion}
          isLastQuestion={currentQuestionIndex === questions.length - 1}
        />
      )}
      {step === 'results' && (
        <Results
          score={score}
          total={questions.length}
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
