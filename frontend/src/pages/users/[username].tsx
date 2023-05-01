import React, { useState, useEffect, useContext } from "react"
import { useRouter } from "next/router"

import Layout from "@/components/Layout"
import { userType } from "../../../context/LoginContext"
import { blogType, dataContext } from "../../../context/DataContext"
import Blog from "@/components/Blog"

function User() {
  const router = useRouter()
  const { username } = router.query

  const { getUser, getBlogs } = useContext(dataContext)

  const [user, setUser] = useState<userType>()
  const [blogs, setBlogs] = useState<blogType[]>()

  useEffect(() => {
    getUser(username)
      .then((result: userType) => {
        setUser(result)
      })
      .then(() => {
        getBlogs().then((result: blogType[]) => {
          setBlogs(result)
        })
      })
    console.log(blogs, user)
  }, [username])

  return (
    <div>
      <Layout>
        <div className="flex-col w-3/4 lg:w-1/2">
          <div>{user ? user.username : "No user"}</div>
          <div>
            {blogs ? (
              blogs
                .filter((x) => x.author.username == user?.username)
                .map((x, i) => (
                  <Blog
                    key={i}
                    title={x.title}
                    body={x.body}
                    author={x.author.username}
                  />
                ))
            ) : (
              <div>No blog found</div>
            )}
          </div>
        </div>
      </Layout>
    </div>
  )
}

export default User
