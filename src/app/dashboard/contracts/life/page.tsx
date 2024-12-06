"use client"

import { useSession } from "next-auth/react"
import { Layout } from "@/components/molecules"

import { LifeList } from "@/components/organisms"

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal"

import { Button } from "@nextui-org/react"
import Link from "next/link"

const Page = () => {
  const {} = useSession()

  //some states
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  return (
    <Layout>
      <div className="w-3/4 m-auto pt-20 ">
        <LifeList />
      </div>
      <div className="fixed bottom-10 right-10">{}</div>
    </Layout>
  )
}

export default Page
