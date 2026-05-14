// import {useState} from 'react'
// import {Navigate, useNavigate} from 'react-router-dom'
// import Cookies from 'js-cookie'

// const Login = () => {
//   const navigate = useNavigate()

//   const [username, setUsername] = useState('rahul')
//   const [password, setPassword] = useState('rahul@2021')
//   const [showPassword, setShowPassword] = useState(false)
//   const [errorMsg, setErrorMsg] = useState('')

//   const token = Cookies.get('jwt_token')

//   if (token) {
//     return <Navigate to="/" replace />
//   }

//   const onSubmitForm = async event => {
//     event.preventDefault()

// const response = await fetch('/api/login', {
//     method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({username, password}),
//     })

//     const data = await response.json()

//     if (response.ok) {
//       Cookies.set('jwt_token', data.jwt_token, {expires: 7})
//       navigate('/', {replace: true})
//     } else {
//       setErrorMsg(data.error_msg)
//       }
//   }

//   return (
//     <div>
//       <img
//         src="https://assets.ccbp.in/frontend/react-js/nxt-assess/login-img.png"
//         alt="login website logo"
//         width="150"
//       />

//       <form onSubmit={onSubmitForm}>
//         <div>
//           <label htmlFor="username">Username</label>
//           <input
//             id="username"
//             value={username}
//             onChange={e => setUsername(e.target.value)}
//           />
//         </div>
//         <div>
//           <label htmlFor="password">Password</label>
//           <input
//             id="password"
//             type={showPassword ? 'text' : 'password'}
//             value={password}
//             onChange={e => setPassword(e.target.value)}
//           />
//         </div>

//         <div>
//           <input
//             id="showPassword"
//             type="checkbox"
//             checked={showPassword}
//             onChange={e => setShowPassword(e.target.checked)}
//           />
//           <label htmlFor="showPassword">Show Password</label>
//         </div>
//         <button type="submit">Login</button>

//         {errorMsg && <p>*{errorMsg}</p>}
//       </form>
//     </div>
//   )
// }
// export default Login
import './index.css'
import {useState} from 'react'
import {Navigate, useNavigate} from 'react-router-dom'
import Cookies from 'js-cookie'

const Login = () => {
  const navigate = useNavigate()

  const [username, setUsername] = useState('rahul')
  const [password, setPassword] = useState('rahul@2021')
  const [showPassword, setShowPassword] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const token = Cookies.get('jwt_token')

  if (token) {
    return <Navigate to="/" replace />
  }

  const onSubmitForm = async event => {
    event.preventDefault()

    const apiUrl =
  import.meta.env.DEV
    ? '/api/login'
    : 'https://apis.ccbp.in/login'

const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({username, password}),
    })

    const data = await response.json()

    if (response.ok) {
      Cookies.set('jwt_token', data.jwt_token, {expires: 7})
      navigate('/', {replace: true})
    } else {
      setErrorMsg(data.error_msg)
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-assess/login-img.png"
          alt="login website logo"
          className="login-logo"
        />

        <form className="login-form" onSubmit={onSubmitForm}>
          <div className="input-group">
            <label className="input-label" htmlFor="username">
              Username
            </label>
            <input
              className="input-field"
              id="username"
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label className="input-label" htmlFor="password">
              Password
            </label>
            <input
              className="input-field"
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>

          <div className="checkbox-row">
            <input
              className="checkbox-input"
              id="showPassword"
              type="checkbox"
              checked={showPassword}
              onChange={e => setShowPassword(e.target.checked)}
            />
            <label className="checkbox-label" htmlFor="showPassword">
              Show Password
            </label>
          </div>

          <button className="login-button" type="submit">
            Login
          </button>

          {errorMsg && <p className="error-msg">*{errorMsg}</p>}
        </form>
      </div>
    </div>
  )
}

export default Login