import React from 'react'

import styled,{ keyframes} from 'styled-components'

const Spin = keyframes`
    0% {
    -webkit-transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }

  100% {
    -webkit-transform: rotate(360deg);
    -ms-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
`;

const LoaderDiv = styled.div`
    &::before, &::after {
        content: "";
        position: absolute;
        top: 2px;
        bottom: 0;
        left: 0;
        right: 0;
        margin-left: auto;
        margin-right: auto;
        width: 20px;
        height: 20px;
        border-radius: 100%;
        border: solid transparent 5px;
        border-top-color: #ffdf00;
    }

    &::before {
        z-index: 100;
        animation: ${Spin} 1s infinite;
    }

    &::after {
        border: 5px solid #ccc;
    }
`;


const Loader = () => {
    return(
        <LoaderDiv></LoaderDiv>
    )
}

export default Loader