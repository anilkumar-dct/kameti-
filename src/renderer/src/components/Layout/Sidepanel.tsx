import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

interface MenuItem {
  label: string
  icon: React.ReactNode
  path: string
  active?: boolean
}

interface MenuSection {
  title: string
  items: MenuItem[]
}

const Sidepanel: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const menuSections: MenuSection[] = [
    {
      title: 'MAIN MENU',
      items: [
        {
          label: 'Dashboard',
          path: '/Dashboard',
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
              />
            </svg>
          )
        }
      ]
    },
    {
      title: 'KAMETI MANAGEMENT',
      items: [
        {
          label: 'Users',
          path: '/Users',
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          )
        },
        {
          label: 'Kametis',
          path: '/Kameti',
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
          )
        },
        {
          label: 'Enrollments',
          path: '/Enrollment',
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
              />
            </svg>
          )
        }
      ]
    },
    {
      title: 'TRANSACTION',
      items: [
        {
          label: 'Payments',
          path: '/Payment',
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          )
        },
        {
          label: 'Withdrawals',
          path: '/withdrawls',
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          )
        }
      ]
    },
    {
      title: 'MANAGE',
      items: [
        {
          label: 'Settings',
          path: '/Setting',
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          )
        },
        {
          label: 'Import',
          path: '/Import',
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
          )
        }
      ]
    }
  ]

  const handleItemClick = (path: string): void => {
    navigate(path)
  }

  const isActive = (path: string): boolean => {
    return location.pathname === path
  }

  return (
    <div className="w-64 bg-gray-50 h-screen flex flex-col">
      {/* Logo Section */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#428C9F] rounded-lg flex items-center justify-center">
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
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <span className="text-xl font-semibold text-[#428C9F]">KametiFund</span>
        </div>
      </div>

      {/* Menu Sections */}
      <div className="flex-1 overflow-y-auto py-4">
        {menuSections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="mb-6">
            <h3 className="px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
              {section.title}
            </h3>
            <div className="space-y-1">
              {section.items.map((item) => {
                const active = isActive(item.path)
                return (
                  <button
                    key={item.label}
                    onClick={() => handleItemClick(item.path)}
                    className={`w-full flex items-center gap-3 px-6 py-3 text-sm font-medium transition-colors ${
                      active ? 'bg-[#428C9F] text-white' : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <span className={active ? 'text-white' : 'text-gray-600'}>{item.icon}</span>
                    <span>{item.label}</span>
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      {/* User Profile Section */}
      <div className="border-t border-gray-200 p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#428C9F] rounded-full flex items-center justify-center text-white font-semibold">
            AK
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-gray-900">Admin Kumar</p>
            <p className="text-xs text-gray-500">Owner</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidepanel
