import axios from "axios"

interface CREATELIFECONTRACT {
  policy_type: string
  face_amount: any
  premium_mode: any
  premium_amount: any
  policy_term: any
  benificiary_name: string
  benificiary_relationship: string
  contingent_benificiary_name: string
  contingent_benificiary_relationship: string
  effective_date: string
  expiration_date: string
}

interface UPDATELIFECONTRACT {
  face_amount: any

  premium_amount: any

  policy_term: any

  benificiary_name: string

  expiration_date: string

  effective_date: string
}

const createLifeContract = async (token: string, data: CREATELIFECONTRACT) => {
  if (!token) {
    throw new Error("Token is required")
  }

  return await axios.post(
    `${process.env.NEXT_PUBLIC_BACKEND}/contract/life`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
}

const getMyLifeContracts = async (token: string) => {
  if (!token) {
    throw new Error("Token is required")
  }

  return await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND}/contract/life/mine`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
}

const getOneLife = async (token: string, id: string) => {
  if (!token) {
    throw new Error("Token is required")
  }

  return await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND}/contract/life/mine/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
}

const deleteLifeContract = async (token: string, id: string) => {
  if (!token) {
    throw new Error("Token is required")
  }

  return await axios.delete(
    `${process.env.NEXT_PUBLIC_BACKEND}/contract/life/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
}

const updateLifeContract = async (
  token: string,
  id: string,
  data: UPDATELIFECONTRACT
) => {
  if (!token) {
    throw new Error("Token is required")
  }

  return await axios.patch(
    `${process.env.NEXT_PUBLIC_BACKEND}/contract/life/${id}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
}

const rejectAPI = async (token: string, id: string) => {
  if (!token) {
    throw new Error("Token is required")
  }

  return await axios.put(
    `${process.env.NEXT_PUBLIC_BACKEND}/contract/life/${id}/reject`,
    {
      message: "Contract rejected, Call US",
    },

    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
}

const acceptAPI = async (token: string, id: string) => {
  if (!token) {
    throw new Error("Token is required")
  }

  return await axios.put(
    `${process.env.NEXT_PUBLIC_BACKEND}/contract/life/${id}/accept`,

    {
      message: "Contract accepted",
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
}

export {
  createLifeContract,
  getMyLifeContracts,
  getOneLife,
  deleteLifeContract,
  updateLifeContract,
  rejectAPI,
  acceptAPI,
}

export type { CREATELIFECONTRACT, UPDATELIFECONTRACT }
