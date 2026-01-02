import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const LoginForm: React.FC = () => {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)

  return (
    <div className="w-full lg:w-1/2 flex items-center justify-center bg-white p-8">
      <div className="w-full max-w-md">
        {/* Welcome Message */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back! 👋</h2>
          <p className="text-gray-600">Please sign in to access your dashboard.</p>
        </div>

        {/* Login Form */}
        <form
          className="space-y-6"
          onSubmit={(e) => {
            e.preventDefault()
            navigate('/Dashboard')
          }}
        >
          {/* Email Address Input */}
          <div>
            <label htmlFor="email" className="block text-sm font-bold text-gray-600 mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="name@company.com"
              className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-lg focus:ring-2 focus:ring-[#428C9F] focus:border-transparent outline-none transition"
            />
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="password" className="block text-sm font-bold text-gray-600 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-lg focus:ring-2 focus:ring-[#428C9F] focus:border-transparent outline-none transition pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
              >
                {showPassword ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                    />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Options Row */}
          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 text-[#428C9F] border-gray-300 rounded focus:ring-[#428C9F]"
              />
              <span className="ml-2 text-sm text-gray-600">Remember me</span>
            </label>
            <a href="#" className="text-sm text-[#428C9F] hover:text-[#367282] font-medium">
              Forgot password?
            </a>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            className="w-full bg-[#428C9F] text-white py-3 rounded-lg font-semibold hover:bg-[#367282] focus:outline-none focus:ring-2 focus:ring-[#428C9F] focus:ring-offset-2 transition shadow-md hover:shadow-lg"
          >
            Sign in to Dashboard
          </button>
        </form>

        {/* Separator */}
        <div className="my-8 flex items-center">
          <div className="flex-1 border-t border-gray-200"></div>
          <span className="px-4 text-sm text-gray-400">Or continue with</span>
          <div className="flex-1 border-t border-gray-200"></div>
        </div>

        {/* Social Login Buttons */}
        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#428C9F] transition"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            <span className="text-sm font-medium text-gray-700">Google</span>
          </button>
          <button
            type="button"
            className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#428C9F] transition"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path
                fillRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-1.027-.013-1.845-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482C19.138 20.197 22 16.425 22 12.017 22 6.484 17.522 2 12 2z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-sm font-medium text-gray-700">GitHub</span>
          </button>
        </div>

        {/* Create Account Link */}
        <div className="mt-8 text-center">
          <span className="text-sm text-gray-600">Don&apos;t have an account? </span>
          <a href="#" className="text-sm text-[#428C9F] hover:text-[#367282] font-semibold">
            Create an account
          </a>
        </div>
      </div>
    </div>
  )
}

export default LoginForm
