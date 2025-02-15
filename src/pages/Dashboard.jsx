import { useState } from "react"
import { useSelector } from "react-redux"
import { Outlet } from "react-router-dom"
import Sidebar from "../components/core/Dashboard/Sidebar"
import { AiOutlineMenu } from "react-icons/ai"

function Dashboard() {
  const { loading: profileLoading } = useSelector((state) => state.profile)
  const { loading: authLoading } = useSelector((state) => state.auth)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  if (profileLoading || authLoading) {
    return (
      <div className="grid min-h-screen place-items-center">
        <div className="spinner"></div>
      </div>
    )
  }

  return (
    <div className="flex h-screen  translate-y-14 bg-richblack-800">
      {/* Sidebar - Fixed for Desktop, Toggle for Mobile */}
      <div className={`fixed md:relative inset-y-0 left-0 z-50 w-64 bg-richblack-900 transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}>
        <Sidebar />
      </div>

      {/* Hamburger Menu for Small Screens */}
      <button className=" absolute top-16 left-4 md:hidden text-white" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
        <AiOutlineMenu size={24} />
      </button>

      {/* Main Content (Adding Padding to Avoid Overlap with Navbar) */}
      <div className="flex-1 overflow-auto pt-[4rem] md:pt-0">
        <div className="mx-auto w-11/12 max-w-[1000px] py-10">
          <Outlet />
        </div>
      </div>

      {/* Overlay for Sidebar on Mobile */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" onClick={() => setIsSidebarOpen(false)}></div>
      )}
    </div>
  )
}

export default Dashboard
