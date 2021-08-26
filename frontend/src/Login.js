import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import Loader from './loader'
import './Toggle.css'
import { 
    LoginContainer,
    Heading,
    Author,
    Welcome,
    InputContainer,
    Input,
    Eye,
    LoginButton,
    CancelButton,
    Copyright,
    WarningDiv,
    PasswordContainer
} from './styledComponents/Login'

const Login = () => {

    let history = useHistory()

    const [visible, setVisible] = useState(false)
    const [loading, setLoading] = useState(false)
    const [password, setPassword] = useState('')
    const [loginError, setLoginError] = useState(false)

    //sending login request to backend
    const onLoginHandler = async () => {
        setLoading(true)
        if(password) {
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
                setLoginError(data.message)
            }catch(err) {
                console.log(err)
            }
        }
        else {
            setLoginError("Password can't be blank !")
        }
        setLoading(false)
    }

    useEffect(() => {
        const timeId = setTimeout(() => {
            setLoginError(false)
        }, 2000)
    
        return () => {
          clearTimeout(timeId)
        }
      }, [loginError]);
    

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
        </center>
                {loginError && 
                <WarningDiv>
                    {loginError}!
                </WarningDiv>}
        <center>
        <Copyright>@ 2021</Copyright>
        <PasswordContainer>password : testing</PasswordContainer>
        </center>
        </LoginContainer>
    )
}

export default Login