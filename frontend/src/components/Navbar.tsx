import { useContext } from "react"
import Link from "next/link"

import { loginContext } from "../../context/LoginContext"

function Navbar() {
  const { user, logout } = useContext(loginContext)
  const options = ["Something new", "Discover"]
  return (
    <div className="w-full flex justify-evenly pt-10 align-bottom border-b-2 bg-pale-broccoli/70">
      <div className="text-xl flex justify-around w-3/4 font-bold">
        {options.map((x, i) => (
          <p key={i} className="hover:underline cursor-pointer pt-5">
            {x}
          </p>
        ))}
      </div>

      <div className="text-5xl font-extrabold cursor-pointer translate-y-4">
        <a href="/">
          <span className="text-green-800">B</span>loggoloush
        </a>
      </div>

      <div className="text-xl flex justify-around w-3/4 font-bold">
        {user ? (
          <>
            <Link href={`/users/${user.username}`}>
              <p className="hover:underline cursor-pointer pt-5">
                {user.username}
              </p>
            </Link>
            <p className="hover:underline cursor-pointer pt-5" onClick={logout}>
              Logout
            </p>
          </>
        ) : (
          <>
            <a href="/Login">
              <p className="hover:underline cursor-pointer pt-5">Login</p>
            </a>
            <a href="/Register">
              <p className="hover:underline cursor-pointer pt-5">Register</p>
            </a>
          </>
        )}
      </div>
    </div>
  )
}

export default Navbar
