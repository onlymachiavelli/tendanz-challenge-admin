"use client"
import { useStat } from "@/hooks"
import { useEffect } from "react"
import { useSession } from "next-auth/react"

const ShowNumbers = () => {
  const { data, getStat } = useStat()
  const { data: sessionData } = useSession()

  useEffect(() => {
    if ((sessionData as any)?.token) {
      getStat((sessionData as any).token)
    }
  }, [sessionData, getStat])
  return (
    <>
      <main className="py-6 px-12 space-y-12 bg-gray-100  w-full">
        <div className="flex flex-col h-full w-full mx-auto  space-y-6">
          <section className="flex flex-col mx-auto bg-white rounded-lg p-6 shadow-md space-y-6 w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 w-full min-w-0">
              <div className="flex flex-col px-6 py-2 bg-white shadow rounded-lg overflow-hidden">
                <div className="flex flex-col items-center space-y-2">
                  <div className="text-6xl font-bold tracking-tight leading-none text-blue-500">
                    {data?.clients}
                  </div>
                  <div className="text-lg font-medium text-blue-500">
                    Total Clients
                  </div>
                </div>
              </div>

              <div className="flex flex-col px-6 py-2 bg-white shadow rounded-lg overflow-hidden">
                <div className="flex flex-col items-center space-y-2">
                  <div className="text-6xl font-bold tracking-tight leading-none text-amber-500">
                    {data?.contracts}
                  </div>
                  <div className="text-lg font-medium text-amber-600">
                    Total Contracts
                  </div>
                </div>
              </div>

              <div className="flex flex-col px-6 py-2 bg-white shadow rounded-lg overflow-hidden">
                <div className="flex flex-col items-center space-y-2">
                  <div className="text-6xl font-bold tracking-tight leading-none text-red-500">
                    {data?.pending_contracts}
                  </div>

                  <div className="text-lg font-medium text-red-600">
                    Pending Contracts
                  </div>
                </div>
              </div>

              <div className="flex flex-col px-6 py-2 bg-white shadow rounded-lg overflow-hidden">
                <div className="flex flex-col items-center space-y-2">
                  <div className="text-6xl font-bold tracking-tight leading-none text-amber-500">
                    {data?.accepted_contracts}
                  </div>
                  <div className="text-lg font-medium text-amber-600">
                    Accepted Contracts
                  </div>
                </div>
              </div>

              <div className="flex flex-col px-6 py-2 bg-white shadow rounded-lg overflow-hidden">
                <div className="flex flex-col items-center space-y-2">
                  <div className="text-6xl font-bold tracking-tight leading-none text-red-500">
                    {data?.rejected_contracts}
                  </div>

                  <div className="text-lg font-medium text-red-600">
                    Rejected Contracts
                  </div>
                </div>
              </div>

              <div className="flex flex-col px-6 py-2 bg-white shadow rounded-lg overflow-hidden">
                <div className="flex flex-col items-center space-y-2">
                  <div className="text-6xl font-bold tracking-tight leading-none text-primary-900">
                    {data?.total}
                  </div>
                  <div className="text-lg font-medium text-primary-900">
                    Total Contracts
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  )
}
export default ShowNumbers
