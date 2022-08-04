import { Container, VStack, Spinner } from '@chakra-ui/react'

const Loading = () => {
  return (
    <VStack justify="center" h="100%">
      <Container maxW="350px" textAlign="center">
        <Spinner size="xl" color="blue.500" thickness="3px" />
      </Container>
    </VStack>
  )
}

export default Loading
