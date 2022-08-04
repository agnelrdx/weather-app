import { Container, VStack, Text, Heading } from '@chakra-ui/react'

const NotFound = () => {
  return (
    <VStack justify="center" h="100%">
      <Container maxW="350px" textAlign="center">
        <Heading as="h1" size="lg" fontSize="80px" noOfLines={1}>
          404
        </Heading>
        <Text fontSize="md">The page you are looking for is not found. Please try a different route.</Text>
      </Container>
    </VStack>
  )
}

export default NotFound
