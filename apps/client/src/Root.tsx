import { Box, Container, useColorMode } from "@chakra-ui/react";
import Head from "next/head";
import { useEffect } from "react";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { useUser } from "./context/UserContext";

export default function Root({ children, ...props }: any) {
  const { toggleColorMode, colorMode } = useColorMode();
  const {loading} = useUser()

  useEffect(() => {
    if (colorMode === "dark") toggleColorMode();
  }, [colorMode]);

  return (
    <>
      <Head>
        <title>MyApp</title>
        <meta name="description" content="Дэско" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box>
        <Navbar />
        <Container p={0} minH="80vh" maxW="container.lg" {...props}>
          {children}
        </Container>
        <Footer />
      </Box>
    </>
  )
}