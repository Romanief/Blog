import Blog from "@/components/Blog"
import { useContext, useEffect, useState } from "react"
import { blogType, dataContext } from "../../context/DataContext"
import Layout from "../components/Layout"

export default function Home() {
  const { getUserBlogs, blogType } = useContext(dataContext)

  const [blogs, setBlogs] = useState<blogType[]>()

  useEffect(() => {
    getUserBlogs().then((result: blogType[]) => {
      setBlogs(result)
    })
  }, [])

  return (
    <div>
      <Layout>
        <div className="flex-col w-3/4 lg:w-1/2">
          {blogs?.map((x) => (
            <Blog title={x.title} body={x.body} />
          ))}
        </div>
      </Layout>
    </div>
  )
}
