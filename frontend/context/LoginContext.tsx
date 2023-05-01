import React, { createContext, useState } from "react"

export const loginContext = createContext<any>({})

export default function LoginContext({
  children,
}: {
  children: React.ReactNode
}) {
  type User = {
    username: string
    id: number
  }

  const [cookie, setCookie] = useState<string | null>(null)
  const [user, setUser] = useState<User | null>(null)

  const login = async (username: string, password: string) => {
    const response = await fetch("http://localhost:8000/Login", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })

    if (response.status == 200) {
      await response.json().then((data) => {
        setUser(data)
      })
    } else {
      console.log(response.statusText)
    }

    setCookie(null)
  }

  const logout = async () => {
    const response = await fetch("http://localhost:8000/logout", {
      method: "GET",
      mode: "cors",
    })

    if (response.status == 200) {
      setUser(null)
      setCookie(null)
    }
  }

  const register = async (username: string, password: string) => {
    const response = await fetch("http://localhost:8000/register", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })

    if (response.status == 201) {
      await response.json().then((data) => {
        console.log(data)
        login(username, password)
      })
    }
  }

  const contextValue = {
    user,
    cookie,
    login,
    logout,
    register,
  }

  return (
    <loginContext.Provider value={contextValue}>
      {children}
    </loginContext.Provider>
  )
}
