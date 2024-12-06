import React from "react"
import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenuItem,
  NavbarMenu,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  User,
} from "@nextui-org/react"
import { useSession } from "next-auth/react"
const NavigationBar = () => {
  const { data, status } = useSession()
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)

  return (
    <Navbar
      maxWidth="full"
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        />
      </NavbarContent>

      <NavbarContent className="sm:hidden pr-3" justify="center">
        <NavbarBrand>
          {}
          <p className="font-bold text-inherit">Tendanz</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarBrand>
          {}
          <p className="font-bold text-inherit">Tendanz</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <User
            name={
              (data as any)?.user?.firstName +
              " " +
              (data as any)?.user?.lastName
            }
            description={
              <Link href="https://tendanz.com" size="sm" isExternal>
                @{(data as any)?.user?.email.split("@")[0]}
              </Link>
            }
            avatarProps={{
              src: "https://robohash.org/stefan-two",
            }}
          />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}

export default NavigationBar
