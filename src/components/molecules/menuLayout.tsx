"use client"
import { Sidebar, Navbar } from "./../organisms"

const Layout = ({ ...props }) => {
  return (
    <main className="w-full h-screen flex items-center justify-center">
      <aside className="w-1/6 h-full">
        <Sidebar />
      </aside>
      <aside className="w-5/6 h-full ">
        <Navbar />
        {props.children}
      </aside>
    </main>
  )
}

export default Layout
