import React, { useState } from "react"

function UpdateForm({ id }: { id: number }) {
  const [title, setTitle] = useState<string>("")
  const [body, setBody] = useState<string>("")

  const Update = async () => {
    console.log(title, body)
    const response = await fetch(`http://localhost:8000/blogs/${id}`, {
      method: "PUT",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-type": "applicaton/json",
      },
      body: JSON.stringify({
        title: title,
        body: body,
      }),
    })

    if (response.status != 200) return console.log("bad")

    response.json().then((data) => console.log(data))
  }

  return (
    <form className="mt-2 border-t p-2 flex flex-col bg-white/90 rounded-3xl">
      <input
        className="bg-transparent mt-2 p-3 border-b-2 transition-all duration-100 border-green-800 w-1/2 focus:w-full focus:outline-none hover:w-full mx-auto text-center"
        type={"text"}
        value={title}
        onChange={(e) => {
          setTitle(e.target.value)
        }}
        placeholder="Title"
      />
      <input
        className="bg-transparent mt-2 p-3 border-b-2 transition-all duration-100 border-green-800 w-1/2 focus:w-full focus:outline-none hover:w-full mx-auto text-center"
        type={"text"}
        value={body}
        onChange={(e) => {
          setBody(e.target.value)
        }}
        placeholder="Body"
      />
      {title && body && (
        <input
          className="bg-transparent mt-2 p-3 border-b-2 transition-all duration-100 border-green-800 w-1/2 focus:w-full focus:outline-none hover:w-full mx-auto text-center"
          type={"submit"}
          onClick={(e) => {
            e.preventDefault()
            Update()
            setTitle("")
            setBody("")
          }}
        />
      )}
    </form>
  )
}

export default UpdateForm
