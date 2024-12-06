import { useState } from "react"

import {
  CREATELIFECONTRACT,
  createLifeContract,
  getMyLifeContracts,
  deleteLifeContract,
  getOneLife,
  UPDATELIFECONTRACT,
  updateLifeContract,
  rejectAPI,
  acceptAPI,
} from "@/lib/api/life"
import toast from "react-hot-toast"

import axios from "axios"

const useLife = () => {
  const [createLifePayload, setLifePayload] = useState<CREATELIFECONTRACT>({
    policy_type: "",
    face_amount: "",
    premium_mode: "",
    premium_amount: "",
    policy_term: "",
    benificiary_name: "",
    benificiary_relationship: "",
    contingent_benificiary_name: "",
    contingent_benificiary_relationship: "",
    effective_date: "",
    expiration_date: "",
  })

  const handleLifePayload = (key: keyof CREATELIFECONTRACT, value: any) => {
    setLifePayload((prev) => ({ ...prev, [key]: value }))
  }

  const createLife = async (token: string) => {
    if (!token) {
      throw new Error("Token is required")
    }

    console.log(
      "🚀 ~ file: life.ts ~ line 56 ~ createLife ~ createLifePayload",
      createLifePayload
    )

    try {
      const response = await createLifeContract(token, {
        ...createLifePayload,
        effective_date: createLifePayload.effective_date + "T00:00:00Z",
        expiration_date: createLifePayload.expiration_date + "T00:00:00Z",
        face_amount: parseInt(createLifePayload.face_amount),
        premium_amount: parseInt(createLifePayload.premium_amount),
        policy_term: parseInt(createLifePayload.policy_term),
      })
      if (response.status === 200) {
        toast.success("Life contract created successfully")
        window.location.href = "/dashboard/contracts/life"
      } else {
        toast.error(response?.data?.message ?? "Failed to create life contract")
      }
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ?? "Failed to create life contract"
      )
    }
  }

  const [lifeContracts, setLifeContracts] = useState<any>([])
  const getMines = async (token: string) => {
    if (!token) {
      throw new Error("Token is required")
    }
    try {
      const response = await getMyLifeContracts(token)
      if (response.status === 200) {
        setLifeContracts(response.data?.contracts)
      } else {
        toast.error(response?.data?.message ?? "Failed to fetch life contracts")
      }
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ?? "Failed to fetch life contracts"
      )
    }
  }

  const [life, setLife] = useState<any>({})
  const getOneLifeContract = async (token: string, id: string) => {
    if (!token) {
      throw new Error("Token is required")
    }
    try {
      const response = await getOneLife(token, id)
      if (response.status === 200) {
        setLife(response.data?.contract)
      } else {
        toast.error(response?.data?.message ?? "Failed to fetch life contract")
      }
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ?? "Failed to fetch life contract"
      )
    }
  }

  const deleteLife = async (token: string, id: string) => {
    if (!token) {
      throw new Error("Token is required")
    }
    try {
      const response = await deleteLifeContract(token, id)
      if (response.status === 200) {
        toast.success("Life contract deleted successfully")
        window.location.href = "/dashboard/contracts/life"
      } else {
        toast.error(response?.data?.message ?? "Failed to delete life contract")
      }
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ?? "Failed to delete life contract"
      )
    }
  }

  const [updateLifePayload, setUpdateLifePayload] =
    useState<UPDATELIFECONTRACT>({
      face_amount: "",
      premium_amount: "",
      policy_term: "",
      benificiary_name: "",
      effective_date: "",
      expiration_date: "",
    })

  const handleUpdateLifePayload = (
    key: keyof UPDATELIFECONTRACT,
    value: any
  ) => {
    setUpdateLifePayload((prev) => ({ ...prev, [key]: value }))
  }

  const updateLife = async (token: string, id: string) => {
    if (!token) {
      throw new Error("Token is required")
    }

    try {
      const response = await updateLifeContract(token, id, {
        ...updateLifePayload,
        effective_date: updateLifePayload.effective_date + "T00:00:00Z",
        expiration_date: updateLifePayload.expiration_date + "T00:00:00Z",
        face_amount: parseInt(updateLifePayload.face_amount),
        premium_amount: parseInt(updateLifePayload.premium_amount),
        policy_term: parseInt(updateLifePayload.policy_term),
      })
      if (response.status === 200) {
        toast.success("Life contract updated successfully")
        window.location.href = "/dashboard/contracts/life"
      } else {
        toast.error(response?.data?.message ?? "Failed to update life contract")
      }
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ?? "Failed to update life contract"
      )
    }
  }

  const getAll = async (token: string) => {
    if (!token) {
      throw new Error("Token is required")
    }
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND}/contract/life`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      if (response.status === 200) {
        setLifeContracts(response.data?.data)
      } else {
        toast.error(response?.data?.message ?? "Failed to fetch life contracts")
      }
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ?? "Failed to fetch life contracts"
      )
    }
  }

  const accept = async (token: string, id: string) => {
    if (!token) {
      throw new Error("Token is required")
    }
    try {
      const response = await acceptAPI(token, id)
      if (response.status === 200) {
        toast.success("Life contract accepted successfully")
        window.location.href = "/dashboard/contracts/life"
      } else {
        toast.error(response?.data?.message ?? "Failed to accept life contract")
      }
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ?? "Failed to accept life contract"
      )
    }
  }

  const reject = async (token: string, id: string) => {
    if (!token) {
      throw new Error("Token is required")
    }
    try {
      const response = await rejectAPI(token, id)
      if (response.status === 200) {
        toast.success("Life contract rejected successfully")
        window.location.href = "/dashboard/contracts/life"
      } else {
        toast.error(response?.data?.message ?? "Failed to reject life contract")
      }
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ?? "Failed to reject life contract"
      )
    }
  }

  return {
    createLifePayload,
    handleLifePayload,
    createLife,
    lifeContracts,
    getMines,

    life,
    getOneLifeContract,
    deleteLife,

    updateLifePayload,
    handleUpdateLifePayload,
    updateLife,
    getAll,

    accept,
    reject,
  }
}

export default useLife
