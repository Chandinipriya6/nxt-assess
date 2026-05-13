import {createContext, useState} from 'react'

const EvaluationContext = createContext()

export const EvaluationProvider = ({children}) => {
  const [questions, setQuestions] = useState([])
  const [answers, setAnswers] = useState({})
  const [score, setScore] = useState(0)
  const [timeTaken, setTimeTaken] = useState(0)
  const [isTimeUp, setIsTimeUp] = useState(false)

  const resetAssessment = () => {
    setQuestions([])
    setAnswers({})
    setScore(0)
    setTimeTaken(0)
    setIsTimeUp(false)
  }

  return (
    <EvaluationContext.Provider
      value={{
        questions,
        setQuestions,
        answers,
        setAnswers,
        score,
        setScore,
        timeTaken,
        setTimeTaken,
        isTimeUp,
        setIsTimeUp,
        resetAssessment,
      }}
    >
      {children}
    </EvaluationContext.Provider>
  )
}

export default EvaluationContext