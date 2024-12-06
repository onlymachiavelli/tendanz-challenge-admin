import axios from "axios"
import { useState } from "react"
import { toast } from "react-hot-toast"

const useClient = () => {
  const [clients, setClients] = useState([])
  const getClients = async (token: string) => {
    if (!token) {
      throw new Error("Token is required")
    }
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND}/admin/clients`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      setClients(res.data)
    } catch (e) {
      toast.error("Get clients error")

      console.error("Get clients error:", e)
    }
  }

  return {
    clients,
    getClients,
  }
}

export default useClient
