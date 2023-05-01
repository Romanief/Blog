import React from "react"
import { useRouter } from "next/router"

import Layout from "@/components/Layout"

function User() {
  const router = useRouter()
  const { username } = router.query

  return (
    <div>
      <Layout>
        <div>User</div>
      </Layout>
    </div>
  )
}

export default User
