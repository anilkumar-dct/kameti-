import React from 'react'
import Login from '../Auth/Login'
import LoginForm from '../Auth/LoginForm'

const LoginPage: React.FC = () => {
  return (
    <div className="min-h-screen flex">
      <Login />
      <LoginForm />
    </div>
  )
}

export default LoginPage
