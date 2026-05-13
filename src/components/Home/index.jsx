import './index.css'
import {useNavigate} from 'react-router-dom'
import Header from '../Header'
import homeImage from '../../assets/home-exam-image.jpg'

const Home = () => {
  const navigate = useNavigate()

  const onClickStartAssessment = () => {
    navigate('/assessment')
  }

  return (
    <div className="home-container">
      <Header />

      <div className="home-content">
        <div className="home-text">
          <span className="badge">🚀 Reach New Heights</span>

          <h1>Welcome to Nxt Assess</h1>

          <p>
            Practice assessments, track your performance, and improve your
            skills with an interactive and easy-to-use assessment platform.
          </p>

          <button
            type="button"
            className="primary-button"
            onClick={onClickStartAssessment}
          >
            Start Assessment
          </button>
        </div>

        <div className="home-image-wrapper">
          <img
            src={homeImage}
            alt="assessment"
            className="home-image"
          />
        </div>
      </div>
    </div>
  )
}

export default Home