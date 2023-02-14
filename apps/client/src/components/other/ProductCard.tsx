import { useUser } from "@/src/context/UserContext";
import { Product } from "@/src/interface/product";
import { useCurrencyFormat } from "@/src/utils/CurrencyFormat";
import { Box, Button, ChakraProps, Heading, HStack, Image, Input, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import { useState } from "react";


export default function ProductCard({ data, ...props }: { data: Product } & ChakraProps) {
  const format = useCurrencyFormat();
  const {actions} = useUser()

  return (
    <Box w="100%" py={12}>
      <Box
        role={'group'}
        p={6}
        maxW={'330px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.800')}
        boxShadow={'2xl'}
        rounded={'lg'}
        pos={'relative'}
        zIndex={1}
        cursor="pointer"
        {...props}
      >
        <Box
          rounded={'lg'}
          mt={-12}
          pos={'relative'}
          height={'230px'}
          _after={{
            transition: 'all .3s ease',
            content: '""',
            w: 'full',
            h: 'full',
            pos: 'absolute',
            top: 5,
            left: 0,
            backgroundImage: `url(${data.image})`,
            filter: 'blur(15px)',
            zIndex: -1,
          }}
          _groupHover={{
            _after: {
              filter: 'blur(20px)',
            },
          }}>
          <Image
            rounded={'lg'}
            height={230}
            width={282}
            objectFit={'cover'}
            src={data.image}
          />
        </Box>
        <Stack pt={10} align={'center'}>
          <Text color={'gray.500'} fontSize={'sm'} textTransform={'uppercase'}>
            {data.brand}
          </Text>
          <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>
            {data.title}
          </Heading>
          <Stack direction={'column'} align={'center'}>
            <Text fontWeight={800} fontSize={'xl'}>
              {format(data.price)}
            </Text>
            <Text textDecoration={'line-through'} color={'gray.600'}>
              {format(data.oldPrice || 0)}
            </Text>
            <Button onClick={() => { actions?.addToBasket(data)}} colorScheme="pink">
              Сагслах
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Box>
  )
}

export const BasketProductCard = ({ data, quantity,...props }: { data: Product, quantity:number } & ChakraProps) => {
  const format = useCurrencyFormat();
  const {actions} = useUser();


  return (
    <Box w="100%" py={12}>
      <HStack
        role={'group'}
        p={6}
        justifyContent="space-between"
        // maxW={'330px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.800')}
        boxShadow={'2xl'}
        rounded={'lg'}
        pos={'relative'}
        zIndex={1}
        cursor="pointer"
        {...props}
      >
        <Box
          rounded={'lg'}
          mt={-12}
          pos={'relative'}
          height={'100px'}
          _after={{
            transition: 'all .3s ease',
            content: '""',
            w: 'full',
            h: 'full',
            pos: 'absolute',
            top: 5,
            left: 0,
            backgroundImage: `url(${data.image})`,
            filter: 'blur(15px)',
            zIndex: -1,
          }}
          _groupHover={{
            _after: {
              filter: 'blur(20px)',
            },
          }}>
          <Image
            rounded={'lg'}
            height={"100px"}
            width={"100px"}
            objectFit={'cover'}
            src={data.image}
          />
        </Box>
        <Stack align={'center'}>
          <Heading fontSize={'md'} fontFamily={'body'} fontWeight={500}>
            {data.title}
          </Heading>
          <NumberInput
            value={quantity}
            max={data.quantity}
            min={1}
            onChange={(value) => actions?.addToBasket(data, +value)}
            // keepWithinRange={false}
            clampValueOnBlur={false}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <Stack direction={'column'} align={'center'}>
            <Text fontWeight={800} fontSize={'md'}>
              {format(data.price * quantity)}
            </Text>
          </Stack>
          <Button w="100%" onClick={() => { actions?.removeFromBasket(data)}} colorScheme="pink">
            Хасах
          </Button>
        </Stack>
      </HStack>
    </Box>
  )
}