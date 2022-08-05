import { screen } from '@testing-library/react'
import { render } from 'utils/test-utils'
import { App } from './App'

it('renders learn react link', () => {
  render(<App />)
  const linkElement = screen.getByText(/learn chakra/i)
  expect(linkElement).toBeInTheDocument()
})
