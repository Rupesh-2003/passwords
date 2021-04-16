import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import platform from 'platform'

import styled, { keyframes } from 'styled-components'
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
const Slide = keyframes`
    0% {
      transform: translateX(-100px);
    }
    100% {
      transform: skew(0deg);
    }
`
const WarningDiv = styled.div`
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

const Login = () => {

    const [locationPermission, setLocationPermission] = useState(false)

    
    useEffect(() => {
        var ipAddress;
        const fetchIp = async () => {
            try {
                const response = await fetch('https://api.ipify.org/?format=json', {
                    method: 'GET'
                })
                const data = await response.json()
                if(response.ok) {
                    ipAddress = data.ip
                }
            } catch(error) {
                console.log(error)
            }
        }
        // fetchIp()

        // if permission is denied
        function permissionDeniedhandler(err) {
            if(err.code === 1) {
                console.log("Error: Access is denied!");
            } else if( err.code === 2) {
                console.log("Error: Position is unavailable!");
            }
            setLocationPermission(false)
        }

        // if permission is given
        function permissionGivenHandler(position) {

            var current = new Date()

            var apikey = 'fa6fe7305eba47f7b62d139d57fea61c';
            var latitude = position.coords.latitude;
            var longitude = position.coords.longitude;
          
            var api_url = 'https://api.opencagedata.com/geocode/v1/json'
          
            var request_url = api_url
              + '?'
              + 'key=' + apikey
              + '&q=' + encodeURIComponent(latitude + ',' + longitude)
              + '&pretty=1'
              + '&no_annotations=1';
          
            // send request to get address from longitude and latitude
            var request = new XMLHttpRequest();
            request.open('GET', request_url, true);
          
            request.onload = function() {

                var data;

                if (request.status === 200){ 
                    // Success!
                    data = JSON.parse(request.responseText);
            
                } else if (request.status <= 500){ 
                    // We reached our target server, but it returned an error
                                        
                    data = JSON.parse(request.responseText);
                    console.log("unable to geocode! Response code: " + request.status);
                    console.log('error msg: ' + data.status.message);

                } else {
                    console.log("server error");
                }

                
                // console.log(log)
                const saveLog = async () => {

                    await fetchIp()
                    const log = {
                        ipAddress: ipAddress,
                        deviceDetails: platform.description,
                        date: current.toLocaleDateString(),
                        time: current.toLocaleTimeString(),
                        latitude,
                        longitude,
                        location: data.results[0].formatted
                    }

                    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/saveLog`, {
                        method: 'POST',
                        headers: {
                            'Content-type': 'application/json'
                        },
                        body: JSON.stringify({
                            log: log
                        })
                    })
                    if(!response.ok) {
                        console.log('Saving log in DB failed')
                    }
                }
                saveLog()
            }
          
            request.onerror = function() {
              // There was a connection error of some sort
              console.log("unable to connect to server");        
            };
          
            request.send();
            setLocationPermission(true)
        }
        navigator.geolocation.getCurrentPosition(permissionGivenHandler, permissionDeniedhandler)
    }, [])

    let history = useHistory()

    const [visible, setVisible] = useState(false)
    const [loading, setLoading] = useState(false)
    const [password, setPassword] = useState('')
    const [loginError, setLoginError] = useState(false)

    //sending login request to backend
    const onLoginHandler = async () => {
        setLoading(true)
        if(password && locationPermission) {
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
        else if(!password) {
            setLoginError("Password can't be blank !")
        }
        else {
            setLoginError('Please Enable location !')
        }
        setLoading(false)
        console.log(loginError)
    }

    useEffect(() => {
        const timeId = setTimeout(() => {
          // After 3 seconds set the show value to false
        //   setShow(false)
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
                    {loginError}
                </WarningDiv>}
        <center>
        <Copyright>@ 2021</Copyright>
        </center>
        </LoginContainer>
    )
}

export default Login