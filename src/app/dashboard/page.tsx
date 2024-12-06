"use client"

import { useSession } from "next-auth/react"
import { Layout } from "@/components/molecules"
import { Numbers, Clients } from "@/components/organisms"

const Page = () => {
  const {} = useSession()

  return (
    <Layout>
      <div className="w-full bg-gray-100 h-screen">
        {" "}
        <Numbers />
        <div className="w-4/5 m-auto">
          <p
            className="
          text-2xl text-center py-10
          "
          >
            List of Clients
          </p>
          <Clients />
        </div>
      </div>
    </Layout>
  )
}

export default Page
