import React from "react"
import Navbar from "./Navbar"

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="w-screen h-screen">
      <Navbar />
      <div className="w-full h-full flex justify-center py-10">{children}</div>
    </main>
  )
}

export default Layout
