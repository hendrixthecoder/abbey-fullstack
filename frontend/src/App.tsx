import { ThemeProvider } from 'styled-components'
import GlobalStyles from './components/styles/GlobalStyles'
import { useContext } from 'react'
import AuthArea from './components/AuthArea'
import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import LoginForm from './components/LoginForm'
import UserContext from './context/UserContext'
import Transactions from './components/Transactions'
import Friends from './components/Friends'
import UpdateView from './components/UpdateView'

const theme = {
  colors: {
    background: '#08090D',
    text: '#ffffff'
  }
}


function App() {  
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setUser] = useContext(UserContext) 

  useEffect(() => {
    const storageUser = localStorage.getItem('user')
    storageUser && setUser(JSON.parse(storageUser))
  }, [setUser])
  

  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Routes>
          <Route path='/' element={<AuthArea />} />
          <Route path='/transactions' element={<Transactions />} />
          <Route path='/friends' element={<Friends />} />
          <Route path='/update-profile' element={<UpdateView />} />
          <Route path='/login' element={<LoginForm />} />
        </Routes>
      </ThemeProvider>
    </>
  )
}

export default App
