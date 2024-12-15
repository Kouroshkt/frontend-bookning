import axios from "axios";
import { useState } from "react"
import styled from 'styled-components';

export default function CreateAccount() {
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [repetPassword, setRepetPassword] = useState("");
    const [address, setAdress] = useState("");
    const [error, setError] = useState("");
    const handelAccount = async (event) => {
        event.preventDefault();
        if (password !== repetPassword) {
            setError("Lösenorden matchar inte!")
            return
        }
        if (password.length<6){
            setError("Lösenord måste vara 6 bokstavär!")
            return
        }
        else {
            const nyUser = {
                name, lastName, email, username, password, address
            }
            try {
                const response = await axios.post("http://localhost:8080/user/adduser", nyUser);
                console.log("Konto skapat", response.data)
                setError("");
                window.location.href = "/signin";
            }
            catch (err) {
                setError("Kan inte koppla till server");
                console.error(error, err);
            }
        }


    }
    return (

        <form onSubmit={handelAccount}>
            <CreateContainer>
                <h3>{error}</h3>
                <label>Namn</label>
                <input onChange={(event) => { setName(event.target.value) }} required />
                <label>Efternamn</label>
                <input onChange={(event) => { setLastName(event.target.value) }} required />
                <label>Email</label>
                <input type="Email" onChange={(event) => { setEmail(event.target.value) }} required />
                <label>Användarnamn</label>
                <input onChange={(event) => { setUsername(event.target.value) }} required />
                <label>Lösenord</label>
                <input type="Password" onChange={(event) => { setPassword(event.target.value) }} required />
                <label>skriv om Lösenord</label>
                <input type="Password" onChange={(event) => { setRepetPassword(event.target.value) }} required />
                <label>Adress</label>
                <input onChange={(event) => { setAdress(event.target.value) }} required />
                <br />
                <button type="submit" >Skapa konto</button>
            </CreateContainer>
        </form>
    )
}
const CreateContainer = styled.div`
display: grid;
justify-content: center;
gap: 3px;
`