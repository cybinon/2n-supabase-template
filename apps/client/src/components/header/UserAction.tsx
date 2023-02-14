import { HStack, IconButton, Menu, MenuButton, Button, Avatar, MenuList, MenuItem } from "@chakra-ui/react";
import { FaShoppingCart } from "react-icons/fa";
import Link from "next/link";
import { PROFILE_MENU } from "@/src/constant/navbar_const";
import { useUser } from "@/src/context/UserContext";


export default function UserActions() {
  const { user, actions } = useUser()
  return (
    <HStack spacing={5}>
      <IconButton
        bg="none"
        color="pink.400"
        borderRadius="50%"
        icon={<FaShoppingCart />}
        onClick={actions?.openBasket}
        aria-label={''}
      />
      <Menu>
        <MenuButton
          as={Button}
          rounded={'full'}
          variant={'link'}
          cursor={'pointer'}
          minW={0}>
          <Avatar src={user?.user_metadata?.avatar_url} size="sm" />
        </MenuButton>
        <MenuList zIndex={2}>
          {PROFILE_MENU.children.map((link: any) => <MenuItem key={link.label} as={Link} href={link.href}>{link.label}</MenuItem>)}
        </MenuList>
      </Menu>
    </HStack>
  )
}