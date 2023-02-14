import { useDisclosure } from "@chakra-ui/react";
import { createContext, useContext, useState } from "react";

const ModalContext = createContext<any>({});
export default function ModalContextProvider({ children }: any) {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [child, setChild] = useState<any>(null);
  return (
    <ModalContext.Provider value={{
      isOpen,
      onClose,
      onOpen,
      child,
      setChild
    }}>
      {children}
    </ModalContext.Provider>
  )
}

export const useModal = () => useContext(ModalContext);