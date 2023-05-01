import Link from "next/link"
import React from "react"

function Blog({
  title,
  body,
  author,
}: {
  title: string
  body: string
  author: string
}) {
  return (
    <div className="flex flex-col w-full p-3 border border-green-800 rounded-3xl mt-3 transition-all duration-200 hover:bg-pale-broccoli">
      <div className="text-xl flex justify-between">
        <div className="font-bold">{title}</div>
        <Link href={`/users/${author}`}>{author}</Link>
      </div>
      <div className=" text-lg">{body}</div>
    </div>
  )
}

export default Blog
