import React, { useState } from "react"

function Create() {
  const [title, setTitle] = useState<string>("")
  const [body, setBody] = useState<string>("")

  return (
    <form className="rounded-3xl w-full flex flex-col text-center my-5 p-5 border border-green-700">
      <div className="font-bold">New blog</div>
      <input
        className="border-green-800 w-1/3 mx-auto p-3 border-b-2 hover:w-full  transition-all duration-100"
        type="text"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value)
        }}
        placeholder={"Title"}
      />
      <input
        className="border-green-800 w-1/3 mx-auto p-3 border-b-2 hover:w-full transition-all duration-100"
        type="text"
        value={body}
        onChange={(e) => {
          setBody(e.target.value)
        }}
        placeholder={"Body"}
      />
      {title && body && (
        <input
          className="border-green-800 w-1/3 mx-auto p-3 border-b-2 hover:w-1/2  transition-all duration-100"
          type="submit"
          onClick={(e) => {
            e.preventDefault()
            // TODO createBlog(title, body)
          }}
        />
      )}
    </form>
  )
}

export default Create
