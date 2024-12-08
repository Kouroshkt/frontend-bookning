import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Signin() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const handelLogin = async () => {
        if (!username || !password) {
            return setError("Glöm inte att fyla Anvöndernamn och Lösenord")
        }
        try {
            const response = await axios.post("http:/localhost:8080/user/login"
                , { username, password });
                console.log(response);
        }
        catch{
            setError("Inloggning misslyckas. Kontrollera dina uppgifter.");
            console.error(error);
        }
    
    }
    return (
        <div>
            <h1>Login Sidan</h1>
            <label> Användarenamn</label>
            <input type="text" value={username}
                onChange={(event) => { setUsername(event.target.value) }} />
            <label> Lösenord</label>
            <input type="text" value={password}
                onChange={(event) => { setPassword(event.target.value) }} />
            <button onClick={handelLogin}>Logga in</button>
            <p>Eller skapa ett konto</p>
            <Link to="/createaccount" >Skappa konto</Link>
        </div>
    );
}