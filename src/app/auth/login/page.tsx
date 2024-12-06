"use client"
import { useEffect } from "react"
import { Button, Input } from "@nextui-org/react"
import Link from "next/link"
import { useAdmin } from "@/hooks"
import { useSession } from "next-auth/react"
const Page = () => {
  const { handleLoginPayload, login, loginPayload } = useAdmin()
  const { data, status } = useSession()
  useEffect(() => {
    if (status === "authenticated") {
      window.location.href = "/dashboard"
    }
  }, [])
  return (
    <>
      <div className="h-screen md:flex">
        <div className="relative overflow-hidden md:flex w-1/2 bg-gradient-to-tr from-blue-800 to-purple-700 i justify-around items-center hidden">
          <div>
            <h1 className="text-white font-bold text-4xl font-sans">
              Tendanz Insurrance
            </h1>
            <p className="text-white mt-1">
              Effortlessly manage all your insurance contracts with our
              user-friendly solution.
            </p>
            <Button
              type="button"
              as={Link}
              href="https://tendanz.com/"
              className=" w-1/2 bg-white text-indigo-800 mt-4 py-2  font-semibold mb-2"
            >
              Learn more About Us
            </Button>
          </div>
          <div className="absolute -bottom-32 -left-40 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
          <div className="absolute -bottom-40 -left-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
          <div className="absolute -top-40 -right-0 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
          <div className="absolute -top-20 -right-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
        </div>
        <div className="flex md:w-1/2 justify-center py-10 items-center bg-white">
          <form
            className="bg-white w-2/3"
            onSubmit={async (e) => {
              e.preventDefault()
              await login()
            }}
            method="post"
            action=""
          >
            <h1 className="text-gray-800 font-bold text-2xl mb-1">
              Hello Again to Tendanz Admin Center!
            </h1>
            <p className="text-sm font-normal text-gray-600 mb-7">
              Welcome Back
            </p>
            <div className="flex gap-3 flex-col">
              <Input
                label="Email Identifier"
                type="text"
                value={loginPayload.email}
                onChange={(e) => handleLoginPayload("email", e.target.value)}
              />
              <Input
                label="Password"
                value={loginPayload.password}
                onChange={(e) => handleLoginPayload("password", e.target.value)}
                type="password"
              />
            </div>
            <Button
              type="submit"
              className="block w-full bg-indigo-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2"
            >
              Login
            </Button>
          </form>
        </div>
      </div>
    </>
  )
}

export default Page
