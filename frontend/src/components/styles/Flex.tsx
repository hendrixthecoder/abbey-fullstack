import styled from 'styled-components'

type FlexProps = {
    direction?: string
}

export const Flex = styled.div<FlexProps>`
    display: flex;
    flex-direction: ${({ direction }) => direction || 'row'};
    justify-content: space-between;

    & input {
        color: white;
    }
    
`