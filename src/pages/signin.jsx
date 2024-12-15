import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

export default function Signin() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const handelLogin = async () => {
        if (!username || !password) {
            return setError("Glöm inte att fyla Anvöndernamn och Lösenord")
        }
        try {
            const response = await axios.post("http://localhost:8080/user/login"
                , { username, password });
                localStorage.setItem("user",JSON.stringify(response))
                window.location.href="/";
        }
        catch{
            setError("Inloggning misslyckas. Kontrollera dina uppgifter.");
            console.error(error);
        }
    
    }
    return (
        <LoginContainer>
            {error && <h3>{error}</h3>}
            <h1>Login Sidan</h1>
            <label> Användarenamn</label>
            <input type="Username" value={username}
                onChange={(event) => { setUsername(event.target.value) }} />
            <label> Lösenord</label>
            <input type="Password" value={password}
                onChange={(event) => { setPassword(event.target.value) }} />
                <br/>
            <button onClick={handelLogin}>Logga in</button>
            <p>Eller skapa ett konto</p>
            <button><Link to="/createaccount" >Skappa konto</Link>
            </button>
        </LoginContainer>
    );
}
const LoginContainer= styled.div`
display: grid;
justify-content: center;
`