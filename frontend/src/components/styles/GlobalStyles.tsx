import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
    
    * {
        box-sizing: border-box;
    }

    body {
        font-family: 'Ubuntu';
        margin: 0;
    }

    input {
        border-top: none;     
        border-right: none;     
        border-left: none;      
        border-bottom: 1px solid #978e8e; 
        background-color: transparent;
        outline: none;
        color: white;
    }
`

export default GlobalStyles