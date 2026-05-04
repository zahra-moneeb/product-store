import { useEffect } from 'react'
import { useSelector } from 'react-redux'

const ThemeProvider = ({ children }) => {
  const theme = useSelector((state) => state.theme.mode)

  useEffect(() => {
    const root = document.documentElement

    if (theme === 'dark') {
      root.classList.add('dark')
      root.classList.remove('light')
    } else {
      root.classList.add('light')
      root.classList.remove('dark')
    }
  }, [theme])

  return children
}

export default ThemeProvider