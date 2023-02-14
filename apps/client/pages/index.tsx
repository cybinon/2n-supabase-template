import { Container, Center, Grid } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import ProductCard from '@/src/components/other/ProductCard'
import { Product } from '@/src/interface/product';
import { useAxios } from '@/src/utils/axiosHook';

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const {loaded, fetch} = useAxios<{count: 0, items: Product[]}>("/product", {}, "get");

  useEffect(() => {
    fetch().then((data) => setProducts(data.items));
  }, []);

  return (
    <>
      <Container mt="10px" minW="100%">
        {/* <Hero /> */}
        <Center>
          <Grid w="100%" templateColumns={["repeat(1, 1fr)", "repeat(2, 1fr)", "repeat(3, 1fr)"]} gap={6}>
            {
              loaded ? products.map((item: any) => <ProductCard w={"100%"} key={item.id} data={item} />) : null
            }
          </Grid>
        </Center>
      </Container>
    </>
  )
}