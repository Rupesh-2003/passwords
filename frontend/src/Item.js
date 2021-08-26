import React, { useState } from 'react'
import styled  from 'styled-components'
import { RotatePlus, RotatePlus2 } from './Keyframes'

const Container = styled.li`
    position: relative;
    list-style-type: none;
    display:flex;
    padding-top: 9px;
    box-sizing: border-box;
    background-color: ${props => props.dark? '#404040' : props.color? props.color: 'white'};
    width: 100%;
    height: ${props => props.open ? 120: 40}px;
    font-family: Roboto;
    font-size: 20px;
    border-radius: 10px;
    margin-bottom: 12px;
    box-shadow: 1px 1px 4px 0 rgba(0, 0, 0, 0.25);
    -webkit-transition: height 300ms ease-in-out;
    -moz-transition: height 300ms ease-in-out;
    -o-transition: height 300ms ease-in-out;
    transition: height 300ms ease-in-out;
    color: ${props => props.dark ? '#FFFFFF' : '#000000'};
`
const CheckImage = styled.img`
    margin-left: 5%;
    width: 20px;
    height: 20px;
`
const ItemName = styled.span`
    font-size: 18px;
    margin-left: 5%;
`
const PlusImage = styled.img`
    position: absolute;
    float: right;
    right: 5%;
    width: 18px;
    height: 18px;
    transform: rotate(${props => props.open? -45: 0}deg);
    animation: ${props => props.open? RotatePlus : RotatePlus2} 0.5s;
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
    color: ${props => props.dark ? 'white': 'black'};
    background-color: transparent;
    @media (min-width: 500px) {
        margin-left: 14%;
        width: 76%;
    }
`
const Subitem = styled.li`
`
const Input = styled.input`
    text-align: left;
    font-size: 17px;
    font-family: Roboto;
    padding: 0;
    border: none;
    outline: none;
    background-color: transparent;
    color: ${props => props.dark ? '#FFFFFF': '#000000'};
    &:focus {
        outline: none;
        border-bottom: solid dodgerblue 1.5px;
        border-bottom-left-radius: 2px;
        border-bottom-right-radius: 2px;
    }
`
const Edit = styled.img`
    position: absolute;
    bottom: 10px;
    right: 45px;
`
const Delete = styled.img`
    position: absolute;
    bottom: 10px;
    right: 15px;
    width: 17px;
    height: 17px;
`
const CopyToClipboard = styled.img`
    position: absolute;
    width: 15px; 
    height: 15px;
    right: 0;
    margin-top: 1px;
    background-color: transparent;
`

const Confirmation = styled.div`
    position: absolute;
    width: 35%;
    height: 30px;
    /* border: solid black 1px; */
    border-radius: 5px;
    /* top: 0; */
    right: 0;
    left: 0;
    bottom: 5px;
    margin: auto;
    background-color: white;
`

const Sure = styled.button`
    position: absolute;
    width: 60%;
    height: 20px;
    border-radius: 5px;
    color: white;
    font-family: Roboto;
    font-size: 10px;
    top:0;
    left: 5px; 
    bottom: 0;
    background-color: #FFA500;
    margin: auto;
    border: none;
    outline: none;
    &:focus {
        ${Container} {
            background-color: grey;
        }
    } 
`
const Cancel = styled.img.attrs({src: '/plus.svg'})`
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
    right: 5px;
    width: 13px;
    height: 13px;
    transform: rotate(-45deg);
`

const Item = (props) => {

    const [open, setOpen] = useState(false)
    const [editMode, setEditMode] = useState(false)
    const [askDeleteConfirmation, setDeleteConfirmation] = useState(false)
    const [askEditConfirmation, setEditConfirmation] = useState(false)
    const [username, setUsername] = useState(props.username)
    const [password, setPassword] = useState(props.password)
    
    const toggleContainer = () => {
        if(open){
            setOpen(false)
            setEditMode(false)
            setDeleteConfirmation(false)
        }
        setOpen(!open)
    }

    const onEditButtonHandler = () => {
        if(askEditConfirmation)
            return
        if(editMode) {
            if(username === "" || password === "") {
                
                setUsername(props.username)
                setPassword(props.password)

                console.log("username or password is blank")
                setEditMode(!editMode)
                return
            }
            if(props.username === username && props.password === password){
                setEditMode(!editMode)
                return
            }
            setEditConfirmation(true)
        }
        setEditMode(!editMode)
    }

    const onSureEditHandler = async () => {
        const item = {
            title: props.name,
            username: props.username,
            password: props.password,
            newUsername: username,
            newPassword: password,
        }

        const data = await props.onEditHandler(item)
        if(data) {
            setUsername(data.username)
            setPassword(data.password)
            setEditConfirmation(false)
            return
        }
        setUsername(props.username)
        setPassword(props.password)
        setEditConfirmation(false)
    }

    const onDeleteHandler = () => {
        if(open && !editMode && !askDeleteConfirmation) {
            setDeleteConfirmation(true)
        }
    }

    const onSureDeleteHandler = () => {
        const item = {
            title: props.name,
            username: props.username,
            password: props.password
        }
        const response = props.onDeleteHandler(item)
        if(response){
            toggleContainer()
        }
    }

    const onCancelEditHandler = () => {
        setEditConfirmation(false)
        setUsername(props.username)
        setPassword(props.password)
    }
    
    return(
        <Container open={open} color={askDeleteConfirmation || askEditConfirmation? '#E8E8E8' : ''} dark={props.darkMode}>
            <CheckImage src={editMode ? 'checkYellow.svg':'check.svg'} alt="CheckMark"/>
            <ItemName>{props.name}</ItemName>
            <PlusImage  src={props.darkMode ? 'plus2.svg':"/plus.svg"} alt="plusImage" onClick={toggleContainer} open={open}/>
            <br/>
            {open && !editMode &&
                <Sublist dark={props.darkMode}>
                    <Subitem>{username}
                        <CopyToClipboard src={props.darkMode ? 'copyToClipboard2.svg' : 'copyToClipboard.svg'} onClick={() => navigator.clipboard.writeText(username)}/>
                    </Subitem>
                    <Subitem>{password}
                        <CopyToClipboard src={props.darkMode ? 'copyToClipboard2.svg' : 'copyToClipboard.svg'} onClick={() => navigator.clipboard.writeText(password)}/>
                    </Subitem>
                    {askDeleteConfirmation && <Confirmation>
                        <Sure onClick={onSureDeleteHandler}>Sure</Sure>
                        <Cancel onClick={() => setDeleteConfirmation(false)}/>
                    </Confirmation>}
                    {askEditConfirmation && <Confirmation>
                        <Sure onClick={onSureEditHandler}>Edit</Sure>
                        <Cancel onClick={onCancelEditHandler}/>  
                    </Confirmation>}
                </Sublist>  
            }
            {open && editMode && 
                <Sublist>
                    <Input  
                        defaultValue={username} 
                        onChange={(e) => {setUsername(e.target.value.split(' ').join(''))}}
                        dark={props.darkMode}
                    />
                    <Input 
                        defaultValue={password} 
                        onChange={(e) => {setPassword(e.target.value.split(' ').join(''))}}
                        dark={props.darkMode}
                    />
                </Sublist>
            }
            {open && 
                <Edit 
                    src={editMode?'right.svg': props.darkMode ? 'pen.png' : 'pen.svg'} 
                    width="15px" 
                    height="15px" 
                    onClick={onEditButtonHandler}
                />
            }
            {open && 
                <Delete 
                    src={props.darkMode ? 'dustbin2.svg' : 'dustbin.svg'} 
                    onClick={onDeleteHandler}
                />
            }
        </Container>
    )
}

export default Item