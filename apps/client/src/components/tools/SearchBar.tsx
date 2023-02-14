import { InputGroup, Input, InputRightAddon, Button } from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";

export default function SearchBar() {

  return (
    <InputGroup>
      <Input
        placeholder="Search"
        _focus={{ borderColor: "none", boxShadow: "none" }}
      />
      <InputRightAddon
        as={Button}
        bg={"pink.400"}
        color={"white"}
        _hover={{
          bg: "pink.500",
        }}
      ><FaSearch /></InputRightAddon>
    </InputGroup>
  );

}