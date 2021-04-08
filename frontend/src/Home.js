import React, { useEffect, useReducer, useState } from 'react'
import styled from 'styled-components'

import Item from './Item'
import { RotatePlus, RotatePlus2 } from './Keyframes'
import './Toggle.css'

const HomeContainer = styled.div`
    position: absolute;
    width:100%;
    height:100%;
    margin: 0;
    padding: 0;
    background-color: ${props => props.dark ? "#121212" : "#f3f3f3"} ;
`

const Heading = styled.h1`
    margin-top: 6%;
    text-align: center;
    font-size: 35px;
    font-weight: 500;
    color: ${props => props.dark ? "#FFFFFF" : "black"} ;
    @media screen and (min-width: 500px) {
        margin-top: 3%;
    }
`

const List = styled.ul`
    list-style-type: none;
    width: 80%;
    height: auto;
    margin: 0;
    padding: 0;
    margin-top:0;
    @media screen and (min-width: 500px) {
        margin-top: 4%;
        width: 30%;
    }
`

const Line = styled.hr`
    width: 80%;
    height: 1px;
    background-color: #404040;
    border: none;
    margin-top: 15%;
    @media (min-width: 500px) {
        margin-top: 4%;
        width: 30%;
    }
`

const AddNewItem = styled.div`
    position: relative;
    list-style-type: none;
    display:flex;
    padding-top: 9px;
    box-sizing: border-box;
    background-color: white;
    width: 80%;
    height: ${props => props.open? 120: 40}px;
    font-size: 20px;
    border-radius: 10px;
    margin-top: 6%;
    box-shadow: 1px 1px 4px 0 rgba(0, 0, 0, 0.25);
    -webkit-transition: height 300ms ease-in-out;
    -moz-transition: height 300ms ease-in-out;
    -o-transition: height 300ms ease-in-out;
    transition: height 300ms ease-in-out;
    @media (min-width: 500px) {
        width: 30%;
        margin-top: 3%;
    }
`

const CheckImage = styled.img`
    margin-left: 5%;
    width: 20px;
    height: 20px;
`

const ItemName = styled.span`
    font-family: Roboto;
    font-size: 18px;
    margin-left: 5%;
`

const PlusImage = styled.img`
    position: absolute;
    float: right;
    right: 5%;
    width: 18px;
    height: 18px;
    transform: rotate(${props => props.open? -45: 0 }deg);
    animation: ${props => props.open? RotatePlus: RotatePlus2} 0.5s;
`

const Logout = styled.button`
    left: 0;
    right: 0;
    margin-left: auto;
    margin-right: auto;
    margin-top: 6%;
    width: 80%;
    height: 40px;
    background-color: #007FFF;
    border-radius: 10px;
    border: none;
    outline: none;
    color: #FFFFFF;
    font-family: Roboto;
    font-size: 18px;
    @media (min-width: 500px) {
        width: 30%;
        margin-top: 5%;
    }
`

const Sublist = styled.ul`
    position: absolute;
    list-style-type: none;
    padding: 0;
    height: 80px;
    width: 71%;
    margin-top: 25px;
    margin-left: 16%;
    text-align: left;
    font-size: 17px;
    @media (min-width: 500px) {
        margin-left: 14%;
        width: 76%;
    }
`

const UsernameInput = styled.input`
    font-size: 17px;
    font-family: Roboto;
    border: none;
    outline: none;
    background-color: transparent;
`

const PasswordInput = styled.input`
    font-size: 17px;
    font-family: Roboto;
    border: none;
    outline: none;
    background-color: transparent;
`

const TitleInput = styled.input`
    font-size: 17px;
    font-family: Roboto;
    border: none;
    outline: none;
    background-color: transparent;
`
const Save = styled.img`
    position: absolute;
    bottom: 10px;
    right: 5%;
    width: 18px;
    height: 18px;
`

const ListContainer = styled.div`
    width: 100%;
    height: 66vh;
    overflow: auto;
    margin-top: 15%;
    padding-bottom: 4px;
    @media (min-width: 500px){
        margin-top: 0;
    }
`

const isValid = (data) => {
    if(data.length > 0) 
        return true
    return false
}


const reducer = (state, action) => {
    switch(action.type) {
        case 'TITLE' :
            return {
                ...state,
                title: action.title,
                isTitleValid: isValid(action.title)
            }
        case 'USERNAME' :
            return{
                ...state,
                username: action.username,
                isUsernameValid: isValid(action.username)
            }
        case 'PASSWORD' :
            return {
                ...state,
                password: action.password,
                isPasswordValid: isValid(action.password)
            }
        case 'SET_FORM_STATE' :
            return {
                ...state,
                isFormValid: action.isFormValid
            }
        case 'RESET' :
            return {
                ...state,
                title: '',
                isTitleValid: false,
                username: '',
                isUsernameValid: false,
                password: '',
                isPasswordValid: false,
                isFormValid: false
            }
        default :
            return state
    }
} 

const Home = () => {
    
    const [open, setOpen] = useState(false)
    const [list, setList] = useState([])
    const [darkMode, setDarkMode] = useState(JSON.parse(sessionStorage.getItem('darkMode')))

    useEffect(() => {
        const fetchList = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/getPasswordList`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/',
                        'Authorization': 'Bearer '+ sessionStorage.getItem('accessToken')
                    }
                })
                const data = await response.json()
                if(response.ok) {
                    setList(data.list)
                }
            } catch(error) {
                console.log(error)
            }
        }

        fetchList()
    }, [])
   
    const [AddNewItemState, dispatch] = useReducer(reducer, {
        title: '',
        isTitleValid: false,
        username: '',
        isUsernameValid: false,
        password: '',
        isPasswordValid: false,
        isFormValid: false
    })

    const onTitleChangeHandler = event => {
        dispatch({
            type: 'TITLE',
            title: event.target.value,
        })
    }

    const onUsernameChangeHandler = event => {
        dispatch({
            type: 'USERNAME',
            username: event.target.value
        })

    }

    const onPasswordChangeHandler = event => {
        dispatch({
            type: 'PASSWORD',
            password: event.target.value
        })
    }

    //Saving new password
    const onSaveHandler = async () => {
        if(AddNewItemState.isFormValid) {
            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/addPassword`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization' : 'Bearer '+ sessionStorage.getItem('accessToken')
                    },
                    body: JSON.stringify({
                        title: AddNewItemState.title,
                        username: AddNewItemState.username,
                        password: AddNewItemState.password
                    })
                })
                if(!response.ok){
                    setOpen(false)
                    dispatch({
                        type: 'RESET'
                    })
                    return
                }
                var newList = list
                newList.push({
                    title: AddNewItemState.title,
                    username: AddNewItemState.username,
                    password: AddNewItemState.password
                })
                setList(newList)
                setOpen(false)
                dispatch({
                    type: 'RESET'
                })
                console.log('%c Password added successfully ','color: white; background-color: #228b22')
                return
            } catch (error) {
                console.log(error)
            }
        } 
    }

    //Deleting password from session storage and db
    const onDeleteHandler = async (item) => {
        let newPasswordList = list.filter((p) => {
            if(p.title === item.title && p.username === item.username && p.password === item.password)
                return false
            return true
        })
        
        try{
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/deletePassword`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : 'Bearer '+ sessionStorage.getItem('accessToken')
                },
                body: JSON.stringify({
                    title: item.title,
                    username: item.username
                })
            })

            const data = await response.json()
            if(response.ok) {
                setList(newPasswordList)
                console.log('%c Password Deleted successfully ','color: white; background-color: #ce2029')
                return true
            }
            console.log(data.message)
            return false
        } catch(error) {
            console.log(error)
        }
    }

    //Saving the edited password in session storage and db
    const onEditHandler = async (item) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/editPassword`, {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json',
                    'Authorization': 'Bearer '+ sessionStorage.getItem('accessToken')
                }, 
                body: JSON.stringify({
                    title: item.title,
                    oldUsername: item.username,
                    newUsername: item.newUsername,
                    oldPassword: item.password,
                    password: item.newPassword
                })
            })
            const data = await response.json()
            if(response.ok) {
                setList(data.list)
                console.log('%c Password Edited successfully ','color: white; background-color: #e1ad01')
                return data.item
            }
            return false
        } catch(err) {
            console.log(err)
        }
    }

    const onLogoutHandler = () => {
        sessionStorage.setItem('loggedIn', false)
        sessionStorage.setItem('accessToken', '')
        sessionStorage.setItem('passwordList', '')
        window.location.href = `/`  
    }

    useEffect(() => {
        if(AddNewItemState.isTitleValid && AddNewItemState.isUsernameValid && AddNewItemState.isPasswordValid) {
            dispatch({
                type: 'SET_FORM_STATE',
                isFormValid: true
            })
        }
        else {
            dispatch({
                type: 'SET_FORM_STATE',
                isFormValid: false
            })
        }
    }, [AddNewItemState.isTitleValid, AddNewItemState.isUsernameValid, AddNewItemState.isPasswordValid])

    let num = 1

    const onDarkModeTogglerHandler = () => {
        const checkbox = document.getElementById('checkbox')
        if(checkbox.checked){
            setDarkMode(true)
            sessionStorage.setItem('darkMode', true)
            return
        }
        setDarkMode(false)
        sessionStorage.setItem('darkMode', false)
    }

    return(
        <HomeContainer dark={darkMode}>
        <center>
            <Heading dark={darkMode}>Passwords
                <label className="switch">
                    <input 
                        type="checkbox" 
                        id="checkbox" 
                        onClick={onDarkModeTogglerHandler}
                        onChange={onDarkModeTogglerHandler}
                        checked={darkMode}
                    > 
                    </input>
                    <span className="slider round"></span>
                </label>
            </Heading>
            <ListContainer>
            <List>
                {list.map(list => {
                    return <Item 
                        key={num++}
                        name={list.title}
                        username={list.username}
                        password={list.password}
                        onDeleteHandler = {onDeleteHandler}
                        onEditHandler = {onEditHandler}
                        darkMode = {darkMode}
                        >
                    </Item>
                })}
            </List>
            {list.length >0 && <Line/>}
            <AddNewItem open={open}>
                <CheckImage src="/checkYellow.svg" alt="checkMark"/>
                <ItemName>{AddNewItemState.isTitleValid ? AddNewItemState.title : "Add new"}</ItemName>
                <PlusImage src="/plus.svg" alt="plusImage" onClick={() => setOpen(!open)} open={open}/>
                {open && 
                    <Sublist>
                        <TitleInput placeholder="Title" onChange={(e) => onTitleChangeHandler(e)}></TitleInput>
                        <UsernameInput placeholder="Username" onChange={(e) => onUsernameChangeHandler(e)}></UsernameInput>
                        <PasswordInput placeholder="Password" onChange={(e) => onPasswordChangeHandler(e)}></PasswordInput>
                    </Sublist>  
                }
                {open && <Save src={AddNewItemState.isFormValid ? 'right.svg': 'rightYellow.svg'} alt="saveImage" onClick={onSaveHandler}/>}
            </AddNewItem>
            </ListContainer>
            <Logout onClick={onLogoutHandler}>Logout</Logout>
        </center>
        </HomeContainer>
    )
}

export default Home