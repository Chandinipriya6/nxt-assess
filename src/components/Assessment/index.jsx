import './index.css'
import {useContext, useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import EvaluationContext from '../../context/EvaluationContext'
import Header from '../Header'

const TOTAL_TIME = 600

const Assessment = () => {
  const navigate = useNavigate()

  const {
    questions,
    setQuestions,
    answers,
    setAnswers,
    setScore,
    setTimeTaken,
    setIsTimeUp,
  } = useContext(EvaluationContext)

  const [status, setStatus] = useState('loading')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [secondsLeft, setSecondsLeft] = useState(TOTAL_TIME)

  useEffect(() => {
    const getQuestions = async () => {
      setStatus('loading')

     const response = await fetch('/api/assess/questions') 

      if (response.ok) {
        const data = await response.json()
        setQuestions(data.questions)
        setStatus('success')
      } else {
        setStatus('failure')
      }
    }

    if (questions.length === 0) {
      getQuestions()
    } else {
      setStatus('success')
    }
  }, [questions.length, setQuestions])

  useEffect(() => {
    if (status !== 'success') {
      return undefined
    }

    if (secondsLeft === 0) {
      submitAssessment(true)
      return undefined
    }

    const timerId = setTimeout(() => {
      setSecondsLeft(prev => prev - 1)
    }, 1000)

    return () => clearTimeout(timerId)
  }, [secondsLeft, status])

  const onSelectOption = optionId => {
    setAnswers(prev => ({
      ...prev,
      [questions[currentIndex].id]: optionId,
    }))
  }

  const calculateScore = () => {
    let total = 0

    questions.forEach(question => {
      const selectedId = answers[question.id]

      const correctOption = question.options.find(
        option => option.is_correct === 'true',
      )

      if (correctOption && selectedId === correctOption.id) {
        total += 1
      }
    })

    return total
  }

  const submitAssessment = isTimeUp => {
    setScore(calculateScore())
    setTimeTaken(TOTAL_TIME - secondsLeft)
    setIsTimeUp(isTimeUp)
    navigate('/results')
  }

  const formatTime = () => {
    const minutes = Math.floor(secondsLeft / 60)
    const seconds = secondsLeft % 60
    return `${minutes}:${String(seconds).padStart(2, '0')}`
  }

  if (status === 'loading') {
    return (
      <div className="loader-container" data-testid="loader">
        <p>Loading...</p>
      </div>
    )
  }

  if (status === 'failure') {
    return (
      <div className="not-found-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-assess/failure-img.png"
          alt="failure view"
          className="not-found-image"
        />

        <h1>Something went wrong</h1>

        <button
          type="button"
          className="primary-button"
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    )
  }

  const currentQuestion = questions[currentIndex]
  const selectedOption = answers[currentQuestion.id]

  const answeredCount = Object.keys(answers).length
  const unansweredCount = questions.length - answeredCount

  return (
    <div className="assessment-container">
      <Header />

      <div className="assessment-content">
        <div className="question-card">
          <div className="timer">⏱ {formatTime()}</div>

          <p className="question-count">
            <strong>Question {currentIndex + 1}</strong> of {questions.length}
          </p>

          <h2 className="question-text">
            {currentQuestion.question_text}
          </h2>

          <ul className="options-list">
            {currentQuestion.options.map(option => {
              const isSelected = selectedOption === option.id

              return (
                <li key={option.id}>
                  <button
                    type="button"
                    className={`option-button ${
                      isSelected ? 'selected' : ''
                    }`}
                    onClick={() => onSelectOption(option.id)}
                  >
                    {option.text}
                  </button>
                </li>
              )
            })}
          </ul>

          {currentIndex < questions.length - 1 ? (
            <button
              type="button"
              className="action-button"
              onClick={() => setCurrentIndex(prev => prev + 1)}
            >
              Next Question
            </button>
          ) : (
            <button
              type="button"
              className="action-button"
              onClick={() => submitAssessment(false)}
            >
              Submit Assessment
            </button>
          )}
        </div>

        <div className="sidebar-card">
          <p className="summary-text">
            <strong>Answered Questions:</strong> {answeredCount}
          </p>

          <p className="summary-text">
            <strong>Unanswered Questions:</strong> {unansweredCount}
          </p>

          <div className="palette">
            {questions.map((question, index) => {
              const isActive = index === currentIndex

              return (
                <button
                  key={question.id}
                  type="button"
                  className={isActive ? 'active' : ''}
                  onClick={() => setCurrentIndex(index)}
                >
                  {index + 1}
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Assessment