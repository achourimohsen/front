import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import "./form.css"
import { toast } from 'react-toastify'
import { useDispatch } from "react-redux"
import { loginUser } from '../../redux/apiCalls/authApiCall'
import { EyeInvisibleOutlined, EyeOutlined} from "@ant-design/icons"

const Login = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [visible, setVisible] = useState(false)

  const dispatch = useDispatch()

  // Form Submit Handler
  const formSubmitHandler = (e) => {
    e.preventDefault()
    if(email.trim() === "") return toast.error("Email is required")
    if(password.trim() === "") return toast.error("Password is required")
    
    dispatch(loginUser({ email, password }))
  }
  return (
    <section className="form-container">
      <h1 className="form-title">Login to your account</h1>

      <form onSubmit={formSubmitHandler} className="form">

        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-input"
            id='email'
            placeholder='example@gmail.com'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <div className="form-input-container">
            <input
              type={visible ? "text" : "password"}
              className="form-input"
              id='password'
              placeholder='********'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="visibility-toggle"
              onClick={() => setVisible(!visible)}
            >
              {visible ? <EyeOutlined /> : <EyeInvisibleOutlined />}
            </button>
          </div>          
        </div>

        <button 
        className="form-btn" 
        type='submit'
        >Login</button>

      </form>

      <div className="form-footer">
        Did you forgot your password ??
        <Link to="/forgot-password">Forgot Password</Link>
      </div>

    </section>
  )
}

export default Login