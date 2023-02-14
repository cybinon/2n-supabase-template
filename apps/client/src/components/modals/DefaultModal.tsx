import { useModal } from "@/src/context/ModalContext";
import { Modal, ModalHeader, ModalCloseButton, ModalBody, ModalContent, ModalFooter } from "@chakra-ui/react"

export default function DefaulModal({ children, title, ...props }: any) {
  const { isOpen, onClose } = useModal()
  return (
    <Modal isOpen={isOpen} onClose={onClose} {...props}>
      <ModalContent>
        <ModalHeader>{title || ""}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {children}
        </ModalBody>
        <ModalFooter>
          {/* <p>Modal Footer</p> */}
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}