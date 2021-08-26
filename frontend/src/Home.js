import React, { useEffect, useReducer, useState } from 'react'
import Item from './Item'
import './Toggle.css'
import { 
    HomeContainer,
    Heading,
    ListContainer,
    List,
    Line,
    AddNewItem,
    CheckImage,
    ItemName,
    PlusImage,
    Sublist,
    TitleInput,
    UsernameInput,
    PasswordInput,
    Save,
    Logout
} from './styledComponents/Home'

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
            title: event.target.value.split(' ').join('')
        })
    }

    const onUsernameChangeHandler = event => {
        dispatch({
            type: 'USERNAME',
            username: event.target.value.split(' ').join('')
        })

    }

    const onPasswordChangeHandler = event => {
        dispatch({
            type: 'PASSWORD',
            password: event.target.value.split(' ').join('')
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
            <ListContainer darkMode={darkMode}>
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
                <ItemName>{open? AddNewItemState.isTitleValid ? AddNewItemState.title : "Add new" : "Add new"}</ItemName>
                <PlusImage 
                    src="/plus.svg" 
                    onClick={() => setOpen(!open)} open={open}
                    alt="plusImage" 
                />
                {open && 
                    <Sublist>
                        <TitleInput 
                            placeholder="Title" 
                            onChange={(e) => onTitleChangeHandler(e)}
                        ></TitleInput>
                        <UsernameInput 
                            placeholder="Username" 
                            onChange={(e) => onUsernameChangeHandler(e)}
                        ></UsernameInput>
                        <PasswordInput 
                            placeholder="Password" 
                            onChange={(e) => onPasswordChangeHandler(e)}
                        ></PasswordInput>
                    </Sublist>  
                }
                {open && 
                    <Save 
                        src={AddNewItemState.isFormValid ? 'right.svg': 'rightYellow.svg'} 
                        alt="saveImage" 
                        onClick={onSaveHandler}
                    />
                }
            </AddNewItem>
            </ListContainer>
            <Logout onClick={onLogoutHandler}>Logout</Logout>
        </center>
        </HomeContainer>
    )
}

export default Home