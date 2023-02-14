import { useRouter } from "next/router";
import { useState, useEffect, createContext, useContext } from "react";
import { supabase } from "../lib/Store";
import LoginModal from "../components/modals/LoginModal";
import { UserContextType } from "../interface/user";
import { User } from "@supabase/supabase-js";
import { useModal } from "./ModalContext";
import ShopBasketDrawer from "../components/other/ShopBasketDrawer";
import { useDisclosure, useToast } from "@chakra-ui/react";
import { Product } from "../interface/product";
import DefaulModal from "../components/modals/DefaultModal";
import { useAxios } from "../utils/axiosHook";


export const UserContext = createContext<UserContextType>({ loading: true, basket: [] });
export default function UserContextProvider({ children }: any) {
  const toast = useToast();
  const [user, setUser] = useState<User | undefined>();
  const [basket, setBasket] = useState<{ info: Product, quantity: number }[]>([]);
  const [accessToken, setAccessToken] = useState<string | undefined>();
  const { onOpen, setChild, child } = useModal();
  const basketDrawerController = useDisclosure();
  const [loading, setLoading] = useState(true);
  const [address, setAddress] = useState<string | undefined>();
  const router = useRouter();
  const { fetch } = useAxios("/user/info/update", {}, "POST");
  const { fetch: fetchAddress } = useAxios("/user/order/create", {}, "POST");

  const refreshSession = async () => {
    supabase.auth.getUser().then(async ({ data, error }) => {
      if (error) throw error;
      const token = await supabase.auth.getSession();
      localStorage.setItem("a_token", token.data?.session?.access_token || "");
      setAccessToken(token.data?.session?.access_token);
      setUser(data.user ? data.user : undefined);
    }).catch((error) => {
      console.log(error)
    }).finally(() => {
      setLoading(false);
    });
  }

  const logout = async () => {
    setLoading(true);
    await supabase.auth.signOut().catch(e => console.log(e))
    setUser(undefined);
    setLoading(false);
  }

  const signIn = (provider: "google" | "facebook") => {
    setLoading(true);
    supabase.auth.signInWithOAuth({
      provider,
    }).then(({ data, error }: any) => {
      if (error) throw error;
      setUser(data.user ? data.user : {});
    }).catch((error) => {
      console.log(error)
    }).finally(() => {
      setLoading(false);
    });
  }

  const addToBasket = (item: Product, quant?: number) => {
    let index = 0;
    let bItem = basket.find((i, ind) => {
      index = ind;
      return i.info.id === item.id
    });
    if (!bItem) {
      bItem = { info: item, quantity: 0 };
      index = basket.length;
      basket[index] = bItem;
    }
    bItem.quantity = quant ? quant : bItem.quantity + 1;
    setBasket([...basket]);
    localStorage.setItem("lb_basket", JSON.stringify(basket));
    basketDrawerController.onOpen();
  }

  const removeFromBasket = (item: Product) => {
    setBasket(basket.filter((i: any) => i.info.id !== item.id));
    localStorage.setItem("lb_basket", JSON.stringify(basket));
  }

  const addressSet = async (address: string) => {
    setLoading(true);
    const data = JSON.parse(address);
    await fetch({
      city: data.city,
      district: data.district,
      address: data.address,
      phone: data.phone,
    }).then(() => {
      toast({
        title: "Хаяг амжилттай шинэчлэгдлээ.",
        status: "success",
        duration: 3000,
        isClosable: true,
      })
      setAddress(address);
    }).catch(() => {
      toast({
        title: "Хаяг шинэчлэхэд алдаа гарлаа.",
        status: "error",
        duration: 3000,
        isClosable: true,
      })
    }).finally(() => setLoading(false));
  }

  const createOrder = async () => {
    setLoading(true);
    await fetchAddress({
      address: address ? JSON.parse(address) : undefined,
      products: basket.map(i => ({ id: i.info.id, quantity: i.quantity }))
    }).then(() => {
      toast({
        title: "Захиалга амжилттай бүртгэгдлээ.",
        status: "success",
        duration: 3000,
        isClosable: true,
      })
      // setBasket([]);
      // localStorage.setItem("lb_basket", JSON.stringify(basket));
      // router.push("/user/orders");
    }).catch(() => {
      toast({
        title: "Захиалга бүртгэхэд алдаа гарлаа.",
        status: "error",
        duration: 3000,
        isClosable: true,
      })
    }).finally(() => setLoading(false));
  
  }

  useEffect(() => {
    refreshSession();
    const basket = localStorage.getItem("lb_basket");
    if (basket) setBasket(JSON.parse(basket));
  }, [router]);

  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        accessToken,
        basket,
        address,
        actions: {
          openBasket: basketDrawerController.onOpen || (() => { }),
          addToBasket,
          removeFromBasket,
          createOrder,
          signInOpen: () => {
            setChild(<LoginModal signIn={signIn} />);
            onOpen();
          },
          setAddress: addressSet,
          refreshSession,
          logout,
          signIn
        }
      }}
    >
      {children}
      <DefaulModal>
        {child}
      </DefaulModal>
      <ShopBasketDrawer onClose={basketDrawerController.onClose} isOpen={basketDrawerController.isOpen} />
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext)
