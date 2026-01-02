import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidepanel from './Sidepanel'
import LayoutHeader from './LayoutHeader'

const Layout: React.FC = () => {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      {/* Left Sidebar */}
      <Sidepanel />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <LayoutHeader />

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default Layout
