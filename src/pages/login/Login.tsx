import { useRef, useEffect } from 'react'
import { Container, VStack, Stack, Input, Avatar, Button, useToast, Link, useDisclosure } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from 'hooks/redux'
import { UserState } from 'utils/types'
import RegisterModal from 'components/RegisterModal'
import { addUserThunk } from 'slices/userSlice'
import Loading from 'components/Loading'

const isUserExists = (registeredUsers: UserState[], username: string) => {
  return registeredUsers.find(user => user.username === username)
}

const Login = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const registeredUsers = useAppSelector(state => state.registeredUsers)
  const user = useAppSelector(state => state.user)
  const toast = useToast()
  const username = useRef<HTMLInputElement>(null)
  const password = useRef<HTMLInputElement>(null)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (user.current.id !== '') {
      navigate('/dashboard')
    }
  }, [user, navigate])

  const handleClick = () => {
    if (!username.current?.value || !password.current?.value) {
      return toast({
        title: 'Enter all inputs.',
        status: 'error',
        isClosable: true,
        duration: 2000,
      })
    }

    const existingUser = isUserExists(registeredUsers, username.current?.value)
    if (!existingUser) {
      return toast({
        title: 'User does not exist.',
        status: 'error',
        isClosable: true,
        duration: 2000,
      })
    }

    if (password.current?.value !== existingUser.password) {
      return toast({
        title: 'Password does not match.',
        status: 'error',
        isClosable: true,
        duration: 2000,
      })
    }

    dispatch(addUserThunk(existingUser) as any)
  }

  return (
    <>
      {!user.isLoading && (
        <VStack justify="center" h="100%">
          <Container maxW="300px">
            <Stack spacing={4} align="center">
              <Avatar name="H i" />
              <Input ref={username} placeholder="Username" width="100%" variant="outline" />
              <Input ref={password} placeholder="Password" type="password" width="100%" variant="outline" />
              <Button colorScheme="teal" variant="solid" width="100%" onClick={handleClick}>
                Login
              </Button>
              <Link size="sm" color="teal.500" onClick={onOpen}>
                Register?
              </Link>
            </Stack>
          </Container>
        </VStack>
      )}

      {user.isLoading && <Loading />}

      <RegisterModal isOpen={isOpen} onClose={onClose} />
    </>
  )
}

export default Login
