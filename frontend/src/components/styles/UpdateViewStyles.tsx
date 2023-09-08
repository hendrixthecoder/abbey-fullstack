import styled from 'styled-components'

export const UpdateViewStyle = styled.div`
    background-color: black;
    color: white;
    height: 100vh;
    margin-top: -30px;
    padding: 10px;
    padding-top: 20px;

    button {
        padding: 10px;
        background-color: white;
        border: none;

        &:hover {
            transform: scale(0.9);
            transition: all 300ms ;
        }
    }
`