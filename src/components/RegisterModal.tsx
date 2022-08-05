import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, Input, Stack, useToast } from '@chakra-ui/react'
import { useRef } from 'react'
import { useAppDispatch, useAppSelector } from 'hooks/redux'
import { UserState } from 'utils/types'
import { add } from 'slices/registeredUsersSlice'
import { v4 as uuidv4 } from 'uuid'

interface RegisterModalProps {
  isOpen: boolean
  onClose: () => void
}

const isExistingUser = (registeredUsers: UserState[], username: string) => {
  return registeredUsers.find(user => user.username === username)
}

const RegisterModal = ({ isOpen, onClose }: RegisterModalProps) => {
  const username = useRef<HTMLInputElement>(null)
  const password = useRef<HTMLInputElement>(null)
  const passwordRe = useRef<HTMLInputElement>(null)
  const city = useRef<HTMLInputElement>(null)
  const country = useRef<HTMLInputElement>(null)
  const toast = useToast()
  const registeredUsers = useAppSelector(state => state.registeredUsers)
  const dispatch = useAppDispatch()

  const handleSubmit = () => {
    if (!username.current?.value || !password.current?.value || !passwordRe.current?.value || !city.current?.value || !country.current?.value) {
      return toast({
        title: 'Enter all inputs.',
        status: 'error',
        isClosable: true,
        duration: 2000,
      })
    }

    if (password.current?.value !== passwordRe.current?.value) {
      return toast({
        title: 'Password do not match.',
        status: 'error',
        isClosable: true,
        duration: 2000,
      })
    }

    const existingUser = isExistingUser(registeredUsers.users, username.current?.value)
    if (existingUser) {
      return toast({
        title: 'User already exists.',
        status: 'error',
        isClosable: true,
        duration: 2000,
      })
    }

    dispatch(
      add({
        id: uuidv4(),
        username: username.current?.value,
        password: password.current?.value,
        city: city.current?.value,
        country: country.current?.value,
      })
    )
    toast({
      title: 'Successfully registered.',
      status: 'success',
      isClosable: true,
      duration: 2000,
    })
    onClose()
  }

  return (
    <Modal isOpen={isOpen} closeOnOverlayClick={false} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Register</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack spacing={4}>
            <Input ref={username} placeholder="Username" width="100%" variant="outline" />
            <Input ref={password} placeholder="Password" type="password" width="100%" variant="outline" />
            <Input ref={passwordRe} placeholder="Re enter password" type="password" width="100%" variant="outline" />
            <Input ref={city} placeholder="City" width="100%" variant="outline" />
            <Input ref={country} placeholder="Country" width="100%" variant="outline" />
          </Stack>
        </ModalBody>
        <ModalFooter>
          <Button variant="solid" colorScheme="teal" onClick={handleSubmit}>
            Register
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default RegisterModal
