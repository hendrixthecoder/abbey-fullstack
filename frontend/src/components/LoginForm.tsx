import { Navigate } from 'react-router-dom'
import { login } from '../services/login'
import { Button } from './styles/Button'
import { Flex } from './styles/Flex'
import { Form } from './styles/Form'
import { LoginViewStyle } from './styles/LoginViewStyles'
import { useContext, useState } from 'react'
import UserContext from '../context/UserContext'


const LoginForm = () => {
  const [user, setUser] = useContext(UserContext)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const isLoggedIn = localStorage.getItem('user')

  if(isLoggedIn) {
    return <Navigate to='/'/>
  }

  const handleLogin = async (e: React.MouseEvent) => {
    e.preventDefault()

    try {
      const { data } = await login({ username, password })
      const user = JSON.stringify(data)
      localStorage.setItem('user', user)
      
      setUser(data)
      setUsername('')
      setPassword('')
    } catch (error) {
      console.log(error);
    }

  }

  return (
    <>
      <LoginViewStyle>
        <Flex direction='column'>
          <h1>LOGIN</h1>
          <Form onSubmit={() => handleLogin}>
            <Flex direction='column'>
              <label htmlFor="username">Username</label>
              <input type="text" required={true} value={username} onChange={(e) => setUsername(e.target.value)} name='username' />
            </Flex>
            <Flex direction='column'>
              <label htmlFor="password">Password</label>
              <input type="password" required id='password' name='password' value={password} onChange={(e) => setPassword(e.target.value)} />
            </Flex>
            <Button onClick={handleLogin} color='black'>Login</Button>
          </Form>
        </Flex>
      </LoginViewStyle>
    </>
  )
}


export default LoginForm