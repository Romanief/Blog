// Import dependencies
import express from "express"
import sessions from "express-session"
import cors from "cors"
import { Blog, PrismaClient, User } from "@prisma/client"
import bcrypt from "bcrypt"

require("dotenv").config() // Makes so that you can access .env variables

// * Server configurations
// Important constants
const app = express()
const prisma = new PrismaClient()
const port: number = 8000

// Server Middlewares
app.use(cors({ origin: "http://localhost:3000", credentials: true }))
app.use(express.json())
app.use(
  sessions({
    secret: process.env.SECRET_KEY!,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 6000000,
      secure: false,
    },
  })
)

// TypeScript configuration for accepted types in request.session
declare module "express-session" {
  export interface SessionData {
    user: User
  }
}

// * GET routes
// Returns available routes
app.get("/", (_, res) => {
  const routes: string[] = [
    "/login",
    "/logout",
    "/register",
    "/blogs",
    "/blogs/:id",
  ]
  return res.status(200).json(routes)
})

// Returns all blogs from one User, Login required
app.get("/blogs", async (req, res) => {
  let blogs: Blog[]

  // Attempt in getting blogs
  try {
    blogs = await prisma.blog.findMany({
      include: {
        author: {
          select: {
            username: true,
          },
        },
      },
    })
  } catch {
    return res.status(500).send("Something went wrong, try again later")
  }

  console.log(blogs)

  // No error occured, returning data to client
  return res.status(200).json(blogs)
})

// Returns a username and his id if exists
app.get("/users/:username", async (req, res) => {
  // retrieve username from params
  const username = req.params.username

  // Attempt retrieve username from db
  let user: User | null
  try {
    user = await prisma.user.findUnique({
      where: {
        username: username,
      },
    })
  } catch {
    return res.status(500).send("Something went wrong, please try again later")
  }

  // Error handler: User does not exist
  if (!user) return res.status(404).send("User does not exist")

  // No error encountered, send data
  return res.status(200).json({ username: user.username, id: user.id })
})

// Returns specific blog from unique id
app.get("/blogs/:id", async (req, res) => {
  // retrieve id from params
  const id = parseInt(req.params.id)

  // Attempt retrieve blog from db
  let blog: Blog | null
  try {
    blog = await prisma.blog.findUnique({
      where: { id: id },
    })
  } catch {
    return res.status(500).send("Something went wrong, please try again later")
  }

  // Error handler: No blog found
  if (!blog) return res.status(404).send("Blog not found")

  // No error encountered, send back data to client
  return res.status(200).json(blog)
})

// Logout
app.get("/logout", (req, res) => {
  req.session.destroy
  return res.status(200).send("Logged out")
})

// * POST routes
// Create user
app.post("/register", async (req, res) => {
  // Attempt to retrieve username
  const username: string | null = await req.body.username

  // Attempt to retrieve password
  // Error handler: Unable to retrieve password
  let hashedPassword: string | null
  try {
    console.log(req.body, req.body.password, username)
    hashedPassword = await bcrypt.hash(await req.body.password, 10) //Bycrpt crypts password using the salt (second argument, 10)
  } catch {
    return res.status(400).send("Password required")
  }

  // Error handler: unable to retrieve username
  if (!username) return res.status(400).send("Username required")

  // Error handler: User already exists
  if (await prisma.user.findUnique({ where: { username: username } }))
    return res.status(403).send(`User ${username} already exist`)

  // No error found so far: Create user in db
  await prisma.user.create({
    data: {
      username: username,
      password: hashedPassword,
    },
  })

  // Send user object back to client
  return res.status(201).json({ username: username })
})

// Login user
app.post("/login", async (req, res) => {
  // Attempt getting username from request body
  const username: string | null = req.body.username
  const password: string | null = req.body.password

  // Error handler: Username || Password == Undefined
  if (!username || !password)
    return res
      .status(400)
      .send("Missing required fields. required fields = [username, password]")

  // Attempt retrieving user from db
  const user: User | null = await prisma.user.findUnique({
    where: {
      username: username,
    },
  })

  // Error handler: user does not exist
  if (!user) return res.status(404).send(`User ${username} does not exist`)

  // Error handler: Wrong password
  const hashedPassword: string = user.password
  if (!(await bcrypt.compare(password, hashedPassword)))
    return res.status(403).send("Incorrect password")

  // No error found, logging user in
  req.session.user = user

  // Return data to client
  res.status(200).json({ username: user.username, id: user.id })
})

// Create Blog
app.post("/blogs", async (req, res) => {
  // Initialise variables
  const user: User | undefined = req.session.user
  let blog: Blog

  // Error handler: Login required
  if (!user) return res.status(403).send("Login required")

  // Attempt retrieving title and body from request
  const title: string | undefined = req.body.title
  const body: string | undefined = req.body.body

  // Error handler: Title || Body == Undefined
  if (!title || !body)
    return res
      .status(400)
      .send("Missing required fields, required fields = [title, body]")

  // Attempting creating new blog
  try {
    blog = await prisma.blog.create({
      data: { title: title, body: body, author_id: user.id },
    })
  } catch {
    return res.status(500).send("Something went wrong. Please try again later")
  }

  // No error occured, sending back blog to client
  res.status(201).json(blog)
})

// * PUT routes
// Modifies blog from unique id, Login required
app.put("/blogs/:id", async (req, res) => {
  // Attempt retrieving user
  // Error handling: Login required
  const user: User | undefined = req.session.user
  if (!user) return res.status(403).send("Login required")

  // Retrieve id, new title and new body from request body
  const id = parseInt(req.params.id)
  const title: string | undefined = req.body.title
  const body: string | undefined = req.body.body
  console.log(body, title)

  // Attempt retrieve post from db
  let blog: Blog | null
  try {
    blog = await prisma.blog.findUnique({
      where: { id: id },
    })
  } catch {
    return res.status(500).send("Somethig went wrong, try again later")
  }

  // Error handler: No blog found
  if (!blog) return res.status(404).send("No blog found")

  // Error handler: Logged in user is not author of blog
  if (blog.author_id != req.session.user?.id)
    return res.status(403).send("You have no authorization to update this blog")

  // Error handler: Title || Body == Undefined
  if (!body || !title)
    return res
      .status(400)
      .send("Missing required fields. requiredFields = [title, body]")

  // Attempt modifying blog
  try {
    blog = await prisma.blog.update({
      where: { id: id },
      data: { title: title, body: body },
    })
  } catch {
    return res.status(500).send("Something went wrong please try again later")
  }

  // No error occured, sending data back to client
  return res.status(200).json(blog)
})

// * DELETE routes
// Deletes blog from unique id, Login required
app.delete("/blogs/:id", async (req, res) => {
  // Attempt retrieving id and user
  const id = parseInt(req.params.id)
  const userId: Number | undefined = req.session.user?.id

  // Error handler: Login required
  if (!userId) return res.status(403).send("Login required")

  // Attempt retrieving blog from database
  let blog: Blog | null
  try {
    blog = await prisma.blog.findUnique({
      where: { id: id },
    })
  } catch {
    return res.status(500).send("Something went wrong, please try again later")
  }

  // Error handler: No blog found
  if (!blog) return res.status(404).send("No blog found")

  // Error handler: User is not blog's author
  if (blog.id != userId)
    return res.status(403).send("You have no authorization to delete this blog")

  // Delete blog from database
  try {
    await prisma.blog.delete({ where: { id: id } })
  } catch {
    return res.status(500).send("Something went wrong, please try again later")
  }

  // No error occured, send response to client
  return res.status(200).send("Successfully deleted.")
})

// * Run server
app.listen(port, () => {
  console.log("Server listening on port:", port)
})
