import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import "./form.css"
import { toast } from 'react-toastify'

const ForgotPassword = () => {

  const [email, setEmail] = useState("")

  // Form Submit Handler
  const formSubmitHandler = (e) => {
    e.preventDefault()
    if(email.trim() === "") return toast.error("Email is required")
    console.log({ email })
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
            placeholder='Enter ur email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <button className="form-btn"type='submit'>Submit</button>
      </form>
    </section>
  )
}

export default ForgotPassword