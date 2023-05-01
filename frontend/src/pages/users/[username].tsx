import React, { useContext } from "react"
import { useRouter } from "next/router"

import { dataContext } from "../../../context/DataContext"

function User() {
  const router = useRouter()
  const { username } = router.query

  const { getUserBlogs } = useContext(dataContext)

  const blogs = getUserBlogs(username)

  console.log(blogs)

  return (
    <div>
      User
      {blogs && <p>Ciao</p>}
    </div>
  )
}

export default User
