import styled from 'styled-components'
import { Slide } from '../Keyframes'

export const LoginContainer = styled.div`
    position:absolute;
    display:table;
    width:100%;
    height:100%;
    background-color: #f3f3f3;
`
export const Heading = styled.h1`
    text-align: center;
    margin-top: 14%;
    font-size: 35px;
    font-weight: 500;
    @media screen and (min-width: 500px) {
        margin-top: 4%;
    }
`
export const Author = styled.p`
    display: flex; 
    justify-content: center;
    padding-right: 10px;
    align-items: center; 
    font-family: Roboto;
    font-size: 15px;
    font-weight: 500;
    color: #404040;
`
export const Welcome = styled.div`
    margin-top: 25%;
    font-size: 20px;
    /* font-weight: bold; */
    @media screen and (min-width: 500px){
        margin-top: 8%;
        font-weight: bold;
    }
`
export const InputContainer = styled.div`
    width: 74%;
    height: 35px;
    margin-top:10%;
    @media screen and (min-width: 500px) {
        width: 30%;
        margin-top: 5%;
    }
`

export const Input = styled.input`
    box-sizing: border-box;
    /* margin-top:10%; */
    padding-left:12px;
    /* width: 74%;
    height: 35px; */
    width: 100%;
    height: 100%;
    border:none;
    border-radius: 10px;
    box-shadow: 1px 1px 4px 0 rgba(0, 0, 0, 0.25);
    background-color: #ffffff;
    font-family: Roboto;
    font-size: 16px;
    font-weight: 500;
    outline:none;

    &::placeholder{
        color: #000000;
    };
`
export const Eye = styled.img`
    position: absolute;
    margin-top: 2%;
    margin-left: -30px;
    @media screen and (min-width: 500px) {
        margin-top: 0.5%;
    }
`
export const LoginButton = styled.button`
    position: relative;
    margin-top:7%;
    width: 74%;
    height: 35px;
    border:none;
    border-radius: 10px;
    box-shadow: 1px 1px 4px 0 rgba(0, 0, 0, 0.25);
    background-color: #007fff;
    font-family: Roboto;
    font-size: 18px;
    font-weight: 500;
    outline:none;
    color:#FFFFFF;
    @media screen and (min-width: 500px){
        margin-top: 2%;
        width: 30%;
    }
`
export const CancelButton = styled.button`
    margin-top:6%;
    font-size: 18px;
    font-weight: 500;
    font-family: Roboto;
    color: #404040;
    background-color: transparent;
    border:none;
    outline:none;
    @media screen and (min-width: 500px) {
        margin-top: 3%;
    }
`
export const Copyright = styled.span`
    position: absolute;
    left: 0%;
    right: 0%;
    bottom:3%;
    font-size: 15px;
    font-weight: 500;
    color: #404040;
`
export const WarningDiv = styled.div`
    width: 40%;
    height: 20px;
    margin-top: 30%;
    background: #ffdb9b;
    border-right: 7px solid #ffa502;
    animation: ${Slide} 1s;
    font-size: 14px;
    padding-left: 5%;
    display: flex;
    align-items: center; 
    color: #404040; 
    @media screen and (min-width: 500px) {
        margin-top: 5%;
        width: 15%;
        padding-left: 2%;
        color: black;
    }  
`
export const PasswordContainer = styled.div`
    margin-top: 30px;
    font-family: Roboto;
    font-size: 15px;
    font-weight: 500;
    color: #404040;
`