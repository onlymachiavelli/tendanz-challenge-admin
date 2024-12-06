"use client"

import React, { useEffect } from "react"
import { useClient } from "@/hooks"
import { useSession } from "next-auth/react"
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Tooltip,
  Dropdown,
  DropdownTrigger,
  Button,
  DropdownMenu,
  DropdownItem,
  Link,
} from "@nextui-org/react"
import { CiCircleChevDown } from "react-icons/ci"

const columns = [
  { name: "ID", uid: "id" },
  { name: "First Name", uid: "first_name" },
  { name: "Last Name", uid: "last_name" },
  { name: "Email", uid: "email" },
  { name: "Phone", uid: "phone" },
]

const statusColorMap: any = {
  approved: "success",
  pending: "warning",
  rejected: "danger",
}

const LifeList = () => {
  const { clients, getClients } = useClient()
  const { data, status } = useSession()

  useEffect(() => {
    if ((data as any)?.token) {
      getClients((data as any)?.token)
    }
  }, [data])

  const renderCell = React.useCallback((item: any, columnKey: React.Key) => {
    const cellValue = item[columnKey as keyof typeof item]

    switch (columnKey) {
      default:
        return cellValue
    }
  }, [])

  if (!clients?.length) {
    return <p className="text-center text-gray-500">No contracts found.</p>
  }

  return (
    <Table aria-label="Life Contracts Table">
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.uid}>{column.name}</TableColumn>}
      </TableHeader>
      <TableBody items={clients}>
        {(item: any) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}

export default LifeList
