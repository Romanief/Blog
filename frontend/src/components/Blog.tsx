import Link from "next/link"
import React, { useContext, useState } from "react"
import { loginContext } from "../../context/LoginContext"

import UpdateForm from "./UpdateForm"

function Blog({
  title,
  body,
  author,
  id,
}: {
  title: string
  body: string
  author: string
  id: number
}) {
  const { loggedUser } = useContext(loginContext)
  const [isHidden, setIsHidden] = useState<boolean>(true)
  return (
    <div className="flex flex-col w-full p-3 border border-green-800 rounded-3xl mt-3 transition-all duration-200 hover:bg-pale-broccoli">
      <div className="text-xl flex justify-between">
        <div className="font-bold">{title}</div>
        <Link href={`/users/${author}`}>{author}</Link>
      </div>

      <div className="text-xl flex justify-between">
        <div className=" text-lg">{body}</div>
        {author == loggedUser?.username && (
          <div
            onClick={() => {
              setIsHidden(!isHidden)
            }}
          >
            {isHidden ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="m14.06 9.02l.92.92L5.92 19H5v-.92l9.06-9.06M17.66 3c-.25 0-.51.1-.7.29l-1.83 1.83l3.75 3.75l1.83-1.83a.996.996 0 0 0 0-1.41l-2.34-2.34c-.2-.2-.45-.29-.71-.29zm-3.6 3.19L3 17.25V21h3.75L17.81 9.94l-3.75-3.75z"
                ></path>
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="m19.1 21.875l-6.375-6.35L7.25 21H3v-4.25l5.475-5.475l-6.35-6.35L3.55 3.5l16.975 16.975l-1.425 1.4ZM10.6 13.4l-.7-.7l.7.7l.7.7l-.7-.7Zm4.975-.725L14.15 11.25l.875-.875l-1.4-1.4l-.875.875l-1.425-1.425L13.6 6.15l4.25 4.25l-2.275 2.275Zm3.725-3.75l-4.25-4.2l1.4-1.4q.575-.575 1.413-.575t1.412.575l1.4 1.4q.575.575.6 1.388t-.55 1.387L19.3 8.925Zm-5.85 1.625ZM5 19h1.4l4.9-4.9l-1.4-1.4L5 17.6V19Z"
                />
              </svg>
            )}
          </div>
        )}
      </div>

      <div className={isHidden ? "hidden" : "block"} id="formDiv">
        <UpdateForm id={id} />
      </div>
    </div>
  )
}

export default Blog
