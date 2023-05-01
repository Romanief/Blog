import React from "react"

function Blog({ title, body }: { title: string; body: string }) {
  return (
    <div className="flex flex-col w-full p-3 border border-green-800 rounded-3xl mt-3">
      <div className="font-bold text-xl">{title}</div>
      <div className=" text-lg">{body}</div>
    </div>
  )
}

export default Blog
