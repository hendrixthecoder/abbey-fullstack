import styled from 'styled-components'

export const AuthViewStyles = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
    background-color: ${({ theme }) => theme.colors.background };
    color: ${({ theme }) => theme.colors.text};
    padding: 10px;
`