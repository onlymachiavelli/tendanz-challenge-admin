import axios from "axios"
import { useState } from "react"

const useStat = () => {
  const [data, setData] = useState<any>({})
  const [status, setStatus] = useState<any>("idle")

  const getStat = async (token: string) => {
    setStatus("loading")
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND}/admin/stats`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      setData(res.data)
    } catch (error) {}
  }

  return { data, getStat }
}

export default useStat
