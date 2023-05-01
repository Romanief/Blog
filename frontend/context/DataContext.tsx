import React, { createContext } from "react"

import { userType } from "./LoginContext"

export const dataContext = createContext<any>({})

export type blogType = {
  title: string
  body: string
  id: number
  author_id: number
  author: {
    username: string
  }
}

export default function DataContext({
  children,
}: {
  children: React.ReactNode
}) {
  const getBlogs = async () => {
    const response = await fetch("http://localhost:8000/blogs", {
      method: "GET",
      mode: "cors",
    })
    const data: Array<blogType> | undefined = await response.json()

    return data
  }

  const getBlog = async (id: number | null) => {
    if (!id) return

    const response = await fetch(`http://localhost:8000/blogs/${id}`, {
      method: "GET",
      mode: "cors",
    })
    const data: blogType | undefined = await response.json()

    return data
  }

  const getUser = async (username: string | null) => {
    if (!username) return

    const response = await fetch(`http://localhost:8000/users/${username}`, {
      method: "GET",
      mode: "cors",
    })
    const data: userType | undefined = await response.json()

    return data
  }

  const contextValue = {
    getBlogs,
    getBlog,
    getUser,
  }
  return (
    <dataContext.Provider value={contextValue}>{children}</dataContext.Provider>
  )
}
