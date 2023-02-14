import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Link,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useDisclosure,
  Container,
  Image,
} from '@chakra-ui/react';
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from '@chakra-ui/icons';
import { useUser } from '../context/UserContext';
import NLink from "next/link";
import { IoLogIn } from 'react-icons/io5';
import SearchBar from './tools/SearchBar';
import { useApp } from '../context/AppContext';
import UserActions from './header/UserAction';
import { PROFILE_MENU } from '../constant/navbar_const';

export default function Navbar() {
  const { isOpen, onToggle } = useDisclosure();
  const { user, loading, actions } = useUser();
  const { logo, settings } = useApp();

  console.log(settings)


  return (
    <Box>
      <Box
        borderBottom={`1px solid ${useColorModeValue('gray', 'white')}`}
      >
        <Container
          as={Flex}
          maxWidth={"container.lg"}
          minH={'60px'}
          py={{ base: 2 }}
          px={{ base: "30px" }}
          align={'center'}
        >
          <Flex
            flex={{ base: 1, md: 'auto' }}
            ml={{ base: -2 }}
            display={{ base: 'flex', md: 'none' }}>
            <IconButton
              onClick={onToggle}
              icon={
                isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
              }
              variant={'ghost'}
              aria-label={'Toggle Navigation'}
            />
          </Flex>
          <Flex fontSize={"21px"} flex={{ base: 1 }} display={{ base: 'none', md: 'flex' }} justify={{ base: 'center', md: 'start' }}>
            <Flex as={NLink} href="/">
              <Box minH="50px" minW="100px">
                <Image h="100%" src={logo} />
              </Box>
            </Flex>
          </Flex>
          <Flex px="10" w="100%" display={{ base: 'none', md: 'flex' }}>
            <SearchBar />
          </Flex>
          <Stack
            flex={{ base: 1, md: 0 }}
            justify={'flex-end'}
            direction={'row'}
            ml={5}
            spacing={6}>
            {
              loading ? "loading" :
                <Box>
                  {user ? <UserActions /> :
                    <Button
                      display={'inline-flex'}
                      fontSize={'sm'}
                      fontWeight={600}
                      onClick={actions?.signInOpen}
                      isLoading={loading}
                      color="white"
                      bg={'pink.300'}
                      _hover={{
                        bg: 'pink.400',
                      }}>
                      <IoLogIn size={"20px"} /> <Text display={{ base: "none", md: "inline-block" }} ml={1}>Нэвтрэх</Text>
                    </Button>
                  }
                </Box>
            }
          </Stack>
        </Container>

        <Collapse in={isOpen} animateOpacity>
          <Stack
            bg={useColorModeValue('white', 'gray.800')}
            p={4}
            display={{ md: 'none' }}>
            {
              loading ? "loading" :
                user ?
                  <MobileNavItem globToggle={onToggle} {...PROFILE_MENU} /> : <Button
                    display={'inline-flex'}
                    fontSize={'sm'}
                    fontWeight={600}
                    bg={'teal.400'}
                    onClick={actions?.signInOpen}
                    isLoading={loading}
                    _hover={{
                      bg: 'teal.300',
                    }}>
                   Нэвтрэх
                  </Button>

            }
            {NAV_ITEMS.map((navItem) => (
              <MobileNavItem globToggle={onToggle} key={navItem.label} {...navItem} />
            ))}
          </Stack>
        </Collapse>
      </Box>
      <Box display={{ base: 'block', md: 'none  ' }} >
        <SearchBar />
      </Box>
    </Box>
  )
}
const DesktopNav = () => {
  const linkColor = useColorModeValue('gray.600', 'gray.200');
  const linkHoverColor = useColorModeValue('gray.800', 'white');
  const popoverContentBgColor = useColorModeValue('white', 'gray.800');

  return (
    <Stack direction={'row'} spacing={4}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={'hover'} placement={'bottom-start'}>
            <PopoverTrigger>
              <Link
                as={NLink}
                p={2}
                href={navItem.href ?? '#'}
                fontSize={'sm'}
                fontWeight={500}
                color={linkColor}
                _hover={{
                  textDecoration: 'none',
                  color: linkHoverColor,
                }}>
                {navItem.label}
              </Link>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={'xl'}
                bg={popoverContentBgColor}
                p={4}
                rounded={'xl'}
                minW={'sm'}>
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

const DesktopSubNav = ({ label, href, subLabel }: NavItem) => {
  return (
    <Link
      as={NLink}
      href={href}
      role={'group'}
      display={'block'}
      p={2}
      rounded={'md'}
      _hover={{ bg: useColorModeValue('pink.50', 'gray.900') }}>
      <Stack direction={'row'} align={'center'}>
        <Box>
          <Text
            transition={'all .3s ease'}
            _groupHover={{ color: 'pink.400' }}
            fontWeight={500}>
            {label}
          </Text>
          <Text fontSize={'sm'}>{subLabel}</Text>
        </Box>
        <Flex
          transition={'all .3s ease'}
          transform={'translateX(-10px)'}
          opacity={0}
          _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
          justify={'flex-end'}
          align={'center'}
          flex={1}>
          <Icon color={'pink.400'} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Link>
  );
};

const MobileNavItem = ({ label, children, href, globToggle }: NavItem) => {
  const { isOpen, onToggle } = useDisclosure();
  const toggler = () => {
    if (children) onToggle()
    else if (globToggle) globToggle();
  }
  return (
    <Stack spacing={4} onClick={toggler}>
      <Flex
        py={2}
        as={NLink}
        href={href ?? '#'}
        justify={'space-between'}
        align={'center'}
        _hover={{
          textDecoration: 'none',
        }}>
        <Text
          fontWeight={600}
          color={useColorModeValue('gray.600', 'gray.200')}>
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={'all .25s ease-in-out'}
            transform={isOpen ? 'rotate(180deg)' : ''}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={'solid'}
          borderColor={useColorModeValue('gray.200', 'gray.700')}
          align={'start'}>
          {children &&
            children.map((child) => (
              <Link onClick={globToggle} as={NLink} key={child.label} py={2} href={child.href}>
                {child.label}
              </Link>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

interface NavItem {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  globToggle?: () => void;
  href?: string;
}


const NAV_ITEMS: Array<NavItem> = [
  {
    label: 'Home',
    href: "/",
  },
  // {
  //   label: 'How It Works',
  //   href: "/how_it_works",
  //   // children: [
  //   //   {
  //   //     label: 'Job Board',
  //   //     subLabel: 'Find your dream design job',
  //   //     href: '#',
  //   //   },
  //   // ],
  // },
];