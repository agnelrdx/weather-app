import { Provider } from 'react-redux'
import { render, RenderOptions } from '@testing-library/react'
import { ChakraProvider, theme } from '@chakra-ui/react'
import { store } from 'utils/store'

const AllProviders = ({ children }: { children?: React.ReactNode }) => (
  <Provider store={store}>
    <ChakraProvider theme={theme}>{children}</ChakraProvider>
  </Provider>
)

const customRender = (ui: React.ReactElement, options?: RenderOptions) => render(ui, { wrapper: AllProviders, ...options })

export { customRender as render }
