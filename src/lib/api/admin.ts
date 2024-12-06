import axios from "axios"

interface LOGIN {
  email: string
  password: string
}

const login = async (data: LOGIN) => {
  if (!data.email || !data.password) {
    throw new Error("All fields are required")
  }
  return await axios.post(
    `${process.env.NEXT_PUBLIC_BACKEND}/admin/login`,
    data
  )
}

export { login }
