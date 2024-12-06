import React, { useEffect } from "react"
import { useLife } from "@/hooks"
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
} from "@nextui-org/react"
import { CiCircleChevDown } from "react-icons/ci"
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react"

const columns = [
  { name: "ID", uid: "id" },
  { name: "Policy Type", uid: "policy_type" },
  { name: "Face Amount", uid: "face_amount" },
  { name: "Premium Mode", uid: "premium_mode" },
  { name: "Premium Amount", uid: "premium_amount" },
  { name: "Policy Term", uid: "policy_term" },
  { name: "Beneficiary", uid: "benificiary_name" },
  { name: "Relationship", uid: "benificiary_relationship" },
  { name: "Status", uid: "status" },
  { name: "Action", uid: "action" },
]

const statusColorMap: any = {
  approved: "success",
  pending: "warning",
  rejected: "danger",
}

const LifeList = () => {
  const { lifeContracts, getAll, reject, accept } = useLife()
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [select, setSelect] = React.useState<any>({})
  const { data } = useSession()

  useEffect(() => {
    if ((data as any)?.token) {
      getAll((data as any)?.token)
    }
  }, [data, getAll])

  const renderCell = (item: any, columnKey: React.Key) => {
    const cellValue =
      item?.life_contract[columnKey as keyof typeof item.life_contract]

    switch (columnKey) {
      case "status":
        return (
          <Chip
            color={statusColorMap[cellValue] || "default"}
            variant="dot"
            size="sm"
          >
            {cellValue?.toUpperCase()}
          </Chip>
        )
      case "benificiary_name":
        return (
          <Tooltip
            content={`Relationship: ${item.life_contract.benificiary_relationship}`}
          >
            {cellValue}
          </Tooltip>
        )
      case "action":
        return (
          <div className="relative flex justify-end items-center gap-2 z-[100]">
            <Dropdown className="bg-white  border-1 border-default-200">
              <DropdownTrigger>
                <Button isIconOnly radius="full" size="sm" variant="light">
                  <CiCircleChevDown size={20} />
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem>
                  <Button
                    color="success"
                    fullWidth
                    className="text-white"
                    onClick={() => {
                      setSelect(item.life_contract)
                      onOpen()
                    }}
                  >
                    View Contract Details
                  </Button>
                </DropdownItem>
                <DropdownItem
                  style={{
                    display:
                      item.life_contract.status === "pending"
                        ? "block"
                        : "none",
                  }}
                >
                  <Button
                    color="warning"
                    fullWidth
                    className="text-white"
                    onClick={() => {
                      if ((data as any)?.token) {
                        accept((data as any)?.token, item.life_contract.id)
                      }
                    }}
                  >
                    Accept Contract
                  </Button>
                </DropdownItem>
                <DropdownItem
                  style={{
                    display:
                      item.life_contract.status === "pending"
                        ? "block"
                        : "none",
                  }}
                >
                  <Button
                    color="danger"
                    fullWidth
                    className="text-white"
                    onClick={async () => {
                      if ((data as any)?.token) {
                        await reject(
                          (data as any)?.token,
                          item.life_contract.id
                        )
                      }
                    }}
                  >
                    Reject Contract
                  </Button>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        )
      default:
        return cellValue
    }
  }

  if (!lifeContracts?.length) {
    return <p className="text-center text-gray-500">No contracts found.</p>
  }

  return (
    <>
      <Table aria-label="Life Contracts Table">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.uid}>{column.name}</TableColumn>
          )}
        </TableHeader>
        <TableBody items={lifeContracts}>
          {(item: any) => (
            <TableRow key={item.life_contract.id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        size={"3xl"}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Contract Details
              </ModalHeader>
              <ModalBody>
                <table className="table-auto w-full text-left border-collapse border border-gray-200">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="border border-gray-300 px-4 py-2">
                        Field
                      </th>
                      <th className="border border-gray-300 px-4 py-2">
                        Value
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(select).map(([key, value]) => (
                      <tr key={key}>
                        <td className="border border-gray-300 px-4 py-2 font-medium">
                          {key.replace(/_/g, " ")}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          {value?.toString() || "N/A"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

export default LifeList
