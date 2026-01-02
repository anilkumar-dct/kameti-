import React, { useState } from 'react'

const LayoutHeader: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const currentDate = new Date().getDate()

  return (
    <div className="w-full bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between gap-6">
        {/* Left: Welcome Message */}
        <div className="flex items-center">
          <h1 className="text-xl font-bold text-gray-900">Welcome back, Admin! 👋</h1>
        </div>

        {/* Center: Search Bar */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search users, kametis..."
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-transparent rounded-lg focus:ring-2 focus:ring-[#428C9F] focus:border-transparent outline-none text-sm text-gray-700 placeholder-gray-400"
            />
          </div>
        </div>

        {/* Right: Icons */}
        <div className="flex items-center gap-4">
          {/* Grid/Window Icon with Plus and X */}
          <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors relative">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
              />
            </svg>
            {/* Plus sign in top-left */}
            <span className="absolute top-1 left-1 text-[8px] font-bold text-gray-700">+</span>
            {/* X in bottom-right */}
            <span className="absolute bottom-1 right-1 text-[8px] font-bold text-gray-700">×</span>
          </button>

          {/* Calendar Icon with Date */}
          <button className="relative w-10 h-10 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors flex items-center justify-center">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span className="absolute top-2 left-1/2 -translate-x-1/2 text-xs font-bold text-gray-900">
              {currentDate}
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default LayoutHeader
