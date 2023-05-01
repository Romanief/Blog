import { useContext } from "react"
import Link from "next/link"

import { loginContext } from "../../context/LoginContext"

function Navbar() {
  const { loggedUser, logout } = useContext(loginContext)
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
        <Link href="/">
          <span className="text-green-800">B</span>loggoloush
        </Link>
      </div>

      <div className="text-xl flex justify-around w-3/4 font-bold">
        {loggedUser ? (
          <>
            <Link href={`/users/${loggedUser.username}`}>
              <p className="hover:underline cursor-pointer pt-5">
                {loggedUser.username}
              </p>
            </Link>
            <p className="hover:underline cursor-pointer pt-5" onClick={logout}>
              Logout
            </p>
          </>
        ) : (
          <>
            <Link href="/Login">
              <p className="hover:underline cursor-pointer pt-5">Login</p>
            </Link>
            <Link href="/Register">
              <p className="hover:underline cursor-pointer pt-5">Register</p>
            </Link>
          </>
        )}
      </div>
    </div>
  )
}

export default Navbar
