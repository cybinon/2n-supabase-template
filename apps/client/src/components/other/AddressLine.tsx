import { useModal } from "@/src/context/ModalContext";
import { useUser } from "@/src/context/UserContext";
import { useAxios } from "@/src/utils/axiosHook";
import { Button, Input, Select, Stack } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function AddressLine() {
  const user = useUser();
  const { onClose } = useModal();
  const {fetch} = useAxios("/user/info", {}, "get");
  const [address, setAddress] = useState({
    city: "Улаанбаатар",
    district: "Хан-Уул",
    address: "",
    phone: "",
  });

  useEffect(() => {
    fetch().then((res) => {
      setAddress({
        city: res.city || "Улаанбаатар",
        district: res.district || "Хан-Уул",
        address: res.address || "",
        phone: res.phone || "",
      });
    })
  }, [])

  const handleChange = (e: any) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    user?.actions?.setAddress(JSON.stringify(address));
    onClose();
  };

  return (
    <Stack spacing={5}>
      <Input onChange={handleChange} name="city" placeholder="Хот / Аймаг" value={address.city} readOnly />
      <Select onChange={handleChange} name="district" value={address.district}>
        <option value="Баянзүрх">Баянзүрх</option>
        <option value="Баянгол">Баянгол</option>
        <option value="Хан-Уул">Хан-Уул</option>
        <option value="Сүхбаатар">Сүхбаатар</option>
        <option value="Сонгинохайрхан">Сонгинохайрхан</option>
        <option value="Чингэлтэй">Чингэлтэй</option>
      </Select>
      <Input onChange={handleChange} name="address" placeholder="Дэлгэрэнгүй хаяг" value={address.address} />
      <Input onChange={handleChange} type="number" name="phone" placeholder="Утас" value={address.phone} />
      <Button onClick={handleSave} colorScheme={"green"}>Хаяг оруулах</Button>
    </Stack>
  )

}