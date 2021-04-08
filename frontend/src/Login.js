import React, { useState } from 'react'
import { useHistory } from 'react-router'

import styled from 'styled-components'
import Loader from './loader'
import './Toggle.css'

const LoginContainer = styled.div`
    position:absolute;
    display:table;
    width:100%;
    height:100%;
    background-color: #f3f3f3;
`
const Heading = styled.h1`
    text-align: center;
    margin-top: 14%;
    font-size: 35px;
    font-weight: 500;
    @media screen and (min-width: 500px) {
        margin-top: 4%;
    }
`
const Author = styled.p`
    display: flex; 
    justify-content: center;
    padding-right: 10px;
    align-items: center; 
    font-family: Roboto;
    font-size: 15px;
    font-weight: 500;
    color: #404040;
`
const Welcome = styled.div`
    margin-top: 25%;
    font-size: 20px;
    /* font-weight: bold; */
    @media screen and (min-width: 500px){
        margin-top: 8%;
        font-weight: bold;
    }
`
const InputContainer = styled.div`
    width: 74%;
    height: 35px;
    margin-top:10%;
    @media screen and (min-width: 500px) {
        width: 30%;
        margin-top: 5%;
    }
`

const Input = styled.input`
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
const Eye = styled.img`
    position: absolute;
    margin-top: 2%;
    margin-left: -30px;
    @media screen and (min-width: 500px) {
        margin-top: 0.5%;
    }
`
const LoginButton = styled.button`
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

const CancelButton = styled.button`
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

const Copyright = styled.span`
    position: absolute;
    left: 0%;
    right: 0%;
    bottom:3%;
    font-size: 15px;
    font-weight: 500;
    color: #404040;
`

const Login = () => {

    let history = useHistory()

    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false)
    const [password, setPassword] = useState('')

    //sending login request to backend
    const onLoginHandler = async () => {
        setLoading(true)
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/login`, {
                method: "POST",
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify({
                    password
                })
            })
            const data = await response.json()
            if(response.ok) {
                sessionStorage.setItem('loggedIn', true)
                sessionStorage.setItem('accessToken', data.accessToken)
                sessionStorage.setItem('darkMode', false)
                window.location.href = `/home`
            }
        }catch(err) {
            console.log(err)
        }
        setLoading(false)
    }

    return(
        <LoginContainer>
        <center>
        <Heading>Passwords</Heading>
        <Author>
            <img src="/user.svg" width="15px" height="15px" alt="author"/>
            &nbsp; Built by - Rupesh Raut
        </Author>
        <Welcome>Welcome back 👋</Welcome>
        <InputContainer>
            <Input 
                placeholder="Password" 
                type={visible? 'text':'password'} 
                onChange={(e) => setPassword(e.target.value)}/>
            <Eye 
                src={visible?'closedEye.svg':'eye.svg'} 
                width="20px" 
                height="20px" 
                alt="visibilityLogo"
                onClick={() => setVisible(!visible)}/>
        </InputContainer>
        <br/>
        <LoginButton 
            placeholder="Login" 
            onClick={onLoginHandler}>
            {loading ? <Loader></Loader> : 'Login'}
        </LoginButton>
        <br/>
        <CancelButton onClick={() => history.goBack()}>Cancel</CancelButton>
        <br/>
        <Copyright>@ 2021</Copyright>
        
        </center>
        </LoginContainer>
    )
}

export default Login