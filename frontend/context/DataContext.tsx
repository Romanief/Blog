import React, { createContext, useState } from "react"

export const dataContext = createContext<any>({})

export default function DataContext({
  children,
}: {
  children: React.ReactNode
}) {
  type user = {
    username: string
    id: number
  }

  const getUserBlogs = async (user: user | null) => {
    if (!user) return

    const response = await fetch("http://localhost:8000/blogs", {
      method: "GET",
      mode: "cors",
      credentials: "include",
    })

    return await response.json()
  }

  const getBlog = async (id: number | null) => {
    if (!id) return

    const response = await fetch(`http://localhost:8000/blogs/${id}`, {
      method: "GET",
      mode: "cors",
    })

    return await response.json()
  }

  const contextValue = {
    getUserBlogs,
    getBlog,
  }
  return (
    <dataContext.Provider value={contextValue}>{children}</dataContext.Provider>
  )
}
