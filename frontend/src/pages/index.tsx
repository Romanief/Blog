import Blog from "@/components/Blog"
import { useContext, useEffect, useState } from "react"
import { blogType, dataContext } from "../../context/DataContext"
import Layout from "../components/Layout"

export default function Home() {
  const { getBlogs, blogType } = useContext(dataContext)

  const [blogs, setBlogs] = useState<blogType[]>()

  useEffect(() => {
    getBlogs().then((result: blogType[]) => {
      setBlogs(result)
    })
  }, [])

  return (
    <div>
      <Layout>
        <div className="flex-col w-3/4 lg:w-1/2">
          {blogs?.map((x, i) => (
            <Blog
              key={i}
              title={x.title}
              body={x.body}
              author={x.author.username}
            />
          ))}
        </div>
      </Layout>
    </div>
  )
}
