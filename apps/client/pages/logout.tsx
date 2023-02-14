import { Box } from "@chakra-ui/react";
import { useEffect } from "react";
import { useUser } from "../src/context/UserContext";
import { useRouter } from "next/router";

export default function Logout() {
  const { actions } = useUser();
  const router = useRouter();

  useEffect(() => {
   if(actions) actions.logout().then(() => router.push("/"));
  }, []);

  return (
    <Box>
      <h1>Logout</h1>
    </Box>
  )
}