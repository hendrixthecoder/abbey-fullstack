import styled from 'styled-components'

export const LoginViewStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.background };
  color: ${({ theme }) => theme.colors.text };

`