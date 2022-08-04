import { Suspense, lazy } from 'react'
import { ChakraProvider, theme } from '@chakra-ui/react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Loading from 'components/Loading'

const LoginPage = lazy(() => import('pages/login/Login'))
const DashboardPage = lazy(() => import('pages/dashbaord/Dashboard'))
const NotFoundPage = lazy(() => import('pages/misc/NotFound'))

export const App = () => (
  <ChakraProvider theme={theme}>
    <Suspense fallback={<Loading />}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/404" element={<NotFoundPage />} />
          <Route path="*" element={<Navigate replace to="/404" />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  </ChakraProvider>
)
