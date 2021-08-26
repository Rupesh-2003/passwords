import styled from 'styled-components'
import { 
    RotatePlus, 
    RotatePlus2 
} from '../Keyframes'

export const HomeContainer = styled.div`
    position: absolute;
    width:100%;
    height:100%;
    margin: 0;
    padding: 0;
    background-color: ${props => props.dark ? "#121212" : "#f3f3f3"} ;
`
export const Heading = styled.h1`
    margin-top: 6%;
    text-align: center;
    font-size: 35px;
    font-weight: 500;
    color: ${props => props.dark ? "#FFFFFF" : "black"} ;
    @media screen and (min-width: 500px) {
        margin-top: 3%;
    }
`
export const ListContainer = styled.div`
    width: 100%;
    height: 66vh;
    overflow: auto;
    margin-top: 15%;
    padding-bottom: 4px;
    @media (min-width: 500px){
        height: 64vh;
        margin-top: 3%;
        ::-webkit-scrollbar {
            width: 5px;
            background-color: ${props => props.darkMode ? '#FFFFFF':'#989898'};
            border-radius: 5px;
        }
        ::-webkit-scrollbar-thumb {
            background-color: ${props => props.darkMode ? '#b284be':'#e1ad01'};
            border-radius: 5px;
        }
    }
`
export const List = styled.ul`
    list-style-type: none;
    width: 80%;
    height: auto;
    margin: 0;
    padding: 0;
    margin-top:0;
    @media screen and (min-width: 500px) {
        width: 30%;
    }
`

export const Line = styled.hr`
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
export const AddNewItem = styled.div`
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

export const CheckImage = styled.img`
    margin-left: 5%;
    width: 20px;
    height: 20px;
`
export const ItemName = styled.span`
    font-family: Roboto;
    font-size: 18pexport x;
    margin-left: 5%;
`
export const PlusImage = styled.img`
    position: absolute;
    float: right;
    right: 5%;
    width: 18px;
    height: 18px;
    transform: rotate(${props => props.open? -45: 0 }deg);
    animation: ${props => props.open? RotatePlus: RotatePlus2} 0.5s;
`
export const Sublist = styled.ul`
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
export const TitleInput = styled.input`
    font-size: 17px;
    font-family: Roboto;
    border: none;
    outline: none;
    background-color: transparent;
`
export const UsernameInput = styled.input`
    font-size: 17px;
    font-family: Roboto;
    border: none;
    outline: none;
    background-color: transparent;
`
export const PasswordInput = styled.input`
    font-size: 17px;
    font-family: Roboto;
    border: none;
    outline: none;
    background-color: transparent;
`
export const Save = styled.img`
    position: absolute;
    bottom: 10px;
    right: 5%;
    width: 18px;
    height: 18px;
`
export const Logout = styled.button`
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
    @media (min-height: 800px) {
        margin-top: 18%;
    }
`