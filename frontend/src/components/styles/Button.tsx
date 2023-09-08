import styled from 'styled-components'

type ButtonProps = {
    bg?: string
}

export const Button = styled.button<ButtonProps>`
    background-color: ${({ bg }) => bg || '#fff'};
    color: ${({ color }) => color || 'black'};
    padding: 10px;
    border: none;
    align-self: flex-start;
    cursor: pointer;

    &:hover {
        transform: scale(0.9);
        transition: all 300ms;
    }
`