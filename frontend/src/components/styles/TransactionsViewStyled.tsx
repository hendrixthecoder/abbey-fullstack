import styled from 'styled-components'

export const TransactionStyles = styled.div`
    background-color: black;
    color: white;
    min-height: 100vh;
    overflow: scroll;
    
    & table {
        width: 100%;
        background-color: black;
    }

    & tr {
        border: 1px solid;
        text-align: center;
    }

    & tbody tr td {
        padding: 5px;
    }

    & tbody tr:nth-child(even) {
        background-color: #BEBBBB;
    }

    & thead th {
        background-color: #BEBBBB;
        padding: 10px;
        color: black;

    }
`