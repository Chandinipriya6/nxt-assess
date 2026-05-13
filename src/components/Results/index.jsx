import './index.css'
import {useContext} from 'react'
import {useNavigate} from 'react-router-dom'
import EvaluationContext from '../../context/EvaluationContext'
import Header from '../Header'

const Results = () => {
  const navigate = useNavigate()

  const {score, timeTaken, isTimeUp, resetAssessment} =
    useContext(EvaluationContext)

  const onReattempt = () => {
    resetAssessment()
    navigate('/assessment')
  }

  const minutes = Math.floor(timeTaken / 60)
  const seconds = timeTaken % 60

  return (
    <div className="results-container">
      <Header />

      <div className="results-card">
        <img
          src={
            isTimeUp
              ? 'https://assets.ccbp.in/frontend/react-js/nxt-assess/time-up-img.png'
              : 'https://assets.ccbp.in/frontend/react-js/nxt-assess/submit-img.png'
          }
          alt={isTimeUp ? 'time up' : 'submit'}
          className="results-image"
        />

        <h1>{isTimeUp ? 'Time is Up!' : 'Assessment Submitted'}</h1>

        <p>Score: {score}</p>

        {!isTimeUp && (
          <p>
            Time Taken: {minutes}:{String(seconds).padStart(2, '0')}
          </p>
        )}

        <button
          type="button"
          className="primary-button"
          onClick={onReattempt}
        >
          Reattempt
        </button>
      </div>
    </div>
  )
}

export default Results