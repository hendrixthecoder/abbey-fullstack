import styled from 'styled-components'

export const NewTransferStyles = styled.div`
    flex: 1;

    & form {
        display: flex;
        flex-direction: column;
        gap: 20px;

        & button {
            margin: 50px;
        }
    }
`