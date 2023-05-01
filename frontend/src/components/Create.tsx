import { create } from "domain"
import React, { useState, useContext } from "react"
import { createSemanticDiagnosticsBuilderProgram } from "typescript"

import DataContext, { dataContext } from "../../context/DataContext"

function Create() {
  const { getBlogs } = useContext(dataContext)

  const [title, setTitle] = useState<string>("")
  const [body, setBody] = useState<string>("")

  const Create = async (title: string, body: string) => {
    if (!title || !body) return

    const response = await fetch("http://localhost:8000/blogs", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        body: body,
      }),
      credentials: "include",
    })

    if (response.status == 201) {
      getBlogs()
      setTitle("")
      setBody("")
    }
  }

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
            Create(title, body)
          }}
        />
      )}
    </form>
  )
}

export default Create
