# Trivia Quiz App

A modern, interactive quiz application built with React that fetches trivia questions from the Open Trivia Database API. Users can select categories and difficulty levels to customize their quiz experience.

## Features

- **Customizable Quizzes**: Choose from various categories (e.g., History, Science, Sports) and difficulty levels (Easy, Medium, Hard)
- **Multiple Choice Questions**: Each question includes one correct answer and three incorrect options
- **Real-time Feedback**: Immediate results after each answer with correct/incorrect indicators
- **Score Tracking**: Keeps track of correct answers throughout the quiz
- **Responsive Design**: Built with React Bootstrap for mobile-friendly interface
- **Error Handling**: Graceful handling of API failures and insufficient questions
- **Loading States**: Visual feedback during data fetching

## Technologies Used

- **Frontend Framework**: React 19.1.1
- **Build Tool**: Vite 7.1.2
- **Styling**: React Bootstrap 2.10.10
- **HTTP Client**: Axios 1.11.0 (though native fetch is used in the code)
- **Routing**: React Router DOM 7.8.2
- **Linting**: ESLint with React-specific rules
- **Deployment**: GitHub Pages

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/AColyer13/triviaapi-react-app.git
   cd triviaapi-react-app
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser** and navigate to `http://localhost:5173`

## Usage

1. **Home Page**: Select a category and difficulty level from the dropdown menus
2. **Start Quiz**: Click "Start Quiz" to begin
3. **Answer Questions**: Select one of the four multiple-choice answers
4. **View Results**: See immediate feedback after each answer
5. **Continue**: Click "Next Question" to proceed
6. **Final Score**: View your total score at the end
7. **Restart**: Start a new quiz with different settings

## Data Fetching Details

This application fetches trivia questions from the **Open Trivia Database** (OpenTDB), a free-to-use, user-contributed trivia question database.

### API Endpoint

The app uses the following API endpoint:
```
https://opentdb.com/api.php
```

### Request Parameters

The application constructs API requests with the following parameters:

- **`amount`**: Fixed at `5` (fetches 5 questions per quiz)
- **`category`**: User-selected category ID (e.g., 9 for General Knowledge, 21 for Sports)
- **`difficulty`**: User-selected difficulty (`easy`, `medium`, `hard`)
- **`type`**: Fixed at `multiple` (ensures multiple-choice questions only)

### Example API Call

When a user selects "History" category (ID: 23) and "Medium" difficulty, the generated URL is:
```
https://opentdb.com/api.php?amount=5&category=23&difficulty=medium&type=multiple
```

### Response Structure

The API returns a JSON response with the following structure:

```json
{
  "response_code": 0,
  "results": [
    {
      "category": "History",
      "type": "multiple",
      "difficulty": "medium",
      "question": "Encoded question text (HTML entities)",
      "correct_answer": "Encoded correct answer",
      "incorrect_answers": ["Encoded incorrect answer 1", "Encoded incorrect answer 2", "Encoded incorrect answer 3"]
    }
    // ... up to 5 questions
  ]
}
```

### Data Processing

1. **HTML Entity Decoding**: All question text and answers are HTML-encoded. The app uses a custom `decodeHtml` function to convert entities like `&quot;` to readable text by creating a temporary DOM element.

2. **Answer Shuffling**: For each question, the app combines the correct answer with the three incorrect answers and shuffles them using the Fisher-Yates algorithm to randomize the order.

3. **Error Handling**:
   - **Response Code Check**: Verifies `response_code === 0` (success)
   - **Question Count Validation**: Ensures at least 5 questions are returned
   - **Network Error Handling**: Catches fetch failures and displays user-friendly error messages

### Fetch Implementation

The data fetching is implemented in `src/App.jsx` in the `handleFormSubmit` function:

```javascript
const handleFormSubmit = async (e) => {
  // ... validation logic ...
  try {
    const url = `https://opentdb.com/api.php?amount=5&category=${formData.category}&difficulty=${formData.difficulty}&type=multiple`;
    const res = await fetch(url);
    const data = await res.json();
    if (data.response_code !== 0 || !data.results || data.results.length < 5) {
      setQuestionError('Not enough questions found. Try different options.');
      return;
    }
    setQuestions(data.results);
    setStep('question');
  } catch (err) {
    console.error('Error fetching questions:', err);
    setQuestionError('Failed to fetch questions. Please try again.');
  }
};
```

### Rate Limiting and Usage

- OpenTDB allows unlimited requests for non-commercial use
- No API key required
- Questions are cached and may be reused across sessions
- The API supports various encodings (default is URL encoding with HTML entities)

## Project Structure

```
src/
├── App.jsx              # Main application component with quiz logic
├── main.jsx             # Application entry point
├── index.css            # Global styles
├── App.css              # App-specific styles
├── components/
│   ├── Home.jsx         # Category/difficulty selection form
│   ├── QuestionForm.jsx # Question display and answer selection
│   ├── QuestionResult.jsx # Individual question result feedback
│   └── Results.jsx      # Final quiz results and score
└── assets/              # Static assets
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality checks

## Deployment

The application is deployed on GitHub Pages at: https://acolyer13.github.io/triviaapi-react-app/

To deploy updates:
1. Build the project: `npm run build`
2. Commit and push changes to the `main` branch
3. GitHub Actions automatically deploys to GitHub Pages

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and test thoroughly
4. Run linting: `npm run lint`
5. Commit your changes: `git commit -am 'Add new feature'`
6. Push to the branch: `git push origin feature-name`
7. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- [Open Trivia Database](https://opentdb.com/) for providing the trivia questions API
- [React](https://reactjs.org/) for the frontend framework
- [Vite](https://vitejs.dev/) for the build tool
- [React Bootstrap](https://react-bootstrap.github.io/) for UI components
