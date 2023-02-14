import { useModal } from "@/src/context/ModalContext";
import { useUser } from "@/src/context/UserContext";
import { Product } from "@/src/interface/product";
import { Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerOverlay } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import AddressLine from "./AddressLine";
import { BasketProductCard } from "./ProductCard";

export default function ShopBasketDrawer({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [products, setProducts] = useState<{ info: Product, quantity: number }[]>([]);
  const { user, basket, actions, address, loading } = useUser()
  const { onOpen, setChild } = useModal();
  const router = useRouter();

  const handleCheckout = () => {
    if (!user) {
      actions?.signInOpen();
      return;
    }
    if (!address) {
      setChild(<AddressLine />);
      onOpen();
      return;
    }
    actions?.createOrder();
    router.push("/user");
    onClose();
  }
  useEffect(() => {
    setProducts(basket);
    // if (data) setProducts(data.items);
  }, [basket]);


  return (
    <Drawer
      placement="right"
      onClose={onClose}
      isOpen={isOpen}
      size="md"
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerBody>
          {
            products.map((item: any, index) => <BasketProductCard w={"100%"} key={item.id + index} data={item.info} quantity={item.quantity} />)
          }
        </DrawerBody>
        <DrawerFooter>
          <Button isLoading={loading} onClick={handleCheckout} w="100%" colorScheme='green'>
            {
              address ? "Захиалга үүсгэх" : "Хаяг оруулах"
            }
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}