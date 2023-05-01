import { useState, useContext } from "react"

import Layout from "@/components/Layout"
import { loginContext } from "../../context/LoginContext"

function Login() {
  const [username, setUsername] = useState<string>("")
  const [password, setPassword] = useState<string>("")

  const { login } = useContext(loginContext)
  return (
    <>
      <Layout>
        <form className="flex flex-col mt-20 justify-between h-1/3 w-1/3 text-center text-xl">
          <div className="flex flex-col h-2/3 justify-between">
            <input
              type="text"
              className="mt-2 border-b-2 transition-all duration-100 border-green-800 w-4/5 focus:w-full focus:outline-none hover:w-full mx-auto text-center"
              placeholder="Insert Username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value)
              }}
            />

            <input
              type="password"
              className="mt-2 border-b-2 border-green-800 w-4/5 focus:w-full focus:outline-none hover:w-full mx-auto text-center  transition-all duration-100"
              placeholder="Insert Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
              }}
            />
          </div>

          {username != "" && password != "" && (
            <button
              className="border-green-800 w-1/3 mx-auto p-3 border-b-2 hover:w-1/2  transition-all duration-100"
              onClick={(e) => {
                e.preventDefault()
                login(username, password)
                setUsername("")
                setPassword("")
              }}
            >
              Login
            </button>
          )}
        </form>
      </Layout>
    </>
  )
}

export default Login
