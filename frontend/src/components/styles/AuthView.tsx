import styled from 'styled-components'

export const AuthViewStyles = styled.div`
    height: 100vh;
    display: flex;
    text-align: center;
    flex-direction: column;
    background-color: ${({ theme }) => theme.colors.background };
    color: ${({ theme }) => theme.colors.text};
    padding: 10px;

    button {
        padding: 10px;
        background-color: white;
        border: none;

        &:hover {
            transform: scale(0.9);
            transition: all 300ms ;
        }
    }

    & section {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
`