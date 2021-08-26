import { keyframes } from 'styled-components'

export const RotatePlus = keyframes`
    0% {
        transform: rotate(0deg)
    }
    100% {
        transform: rotate(-45deg)
    }
`;

export const RotatePlus2 = keyframes`
    0% {
        transform: rotate(-45deg)
    }
    100% {
        transform: rotate(0deg)
    }
`
export const Slide = keyframes`
    0% {
      transform: translateX(-100px);
    }
    100% {
      transform: skew(0deg);
    }
`