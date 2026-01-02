import React from 'react'

const Login: React.FC = () => {
  return (
    <div className="hidden lg:flex lg:w-1/2 bg-[#428C9F] p-12 flex-col justify-between relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'radial-gradient(circle at 2px 2px, rgba(255, 255, 255, 0.3) 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}
        ></div>
      </div>

      {/* Top Content */}
      <div className="relative z-10">
        {/* Logo and Company Name */}
        <div className="flex items-center gap-3 mb-10">
          <div className="bg-white/20 p-2.5 rounded-lg backdrop-blur-sm">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
              />
            </svg>
          </div>
          <span className="text-2xl font-bold text-white tracking-wide">KametiFund</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl font-bold text-white mb-6 leading-tight">
          Smart Financial Management for Your Community.
        </h1>

        {/* Subheading/Description */}
        <p className="text-white/90 text-lg mb-16 leading-relaxed max-w-lg">
          Join thousands of users managing their funds, collections, and withdrawals effortlessly
          with KametiFund.
        </p>

        {/* Stats Card */}
        <div className="bg-[#356D7F]/60 backdrop-blur-md rounded-2xl p-6 shadow-xl w-full max-w-sm border border-white/10 relative overflow-hidden">
          {/* Decorative background glow */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-teal-400/20 rounded-full blur-2xl -mr-16 -mt-16"></div>

          <div className="flex items-center justify-between mb-2 relative z-10">
            <span className="text-white/80 text-sm font-medium">Total Collection</span>
            <svg
              className="w-5 h-5 text-teal-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
              />
            </svg>
          </div>
          <div className="text-4xl font-bold text-white mb-4 relative z-10">₹42.5L</div>
          <div className="flex items-center gap-2 relative z-10">
            <span className="bg-teal-500/30 text-teal-100 text-xs font-semibold px-2 py-1 rounded-md border border-teal-500/30">
              +12.5%
            </span>
            <span className="text-white/70 text-sm">vs last month</span>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="relative z-10 text-white/60 text-sm font-medium">
        © 2024 KametiFund. All rights reserved.
      </div>
    </div>
  )
}

export default Login
