import axios from "axios";
import { useState } from "react";
import styled from "styled-components";

export default function Signin() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async () => {
        if (!username || !password) {
            return setError("Glöm inte att fylla i användarnamn och lösenord.");
        }
        try {
            const response = await axios.post("http://localhost:8080/user/login", {
                username,
                password,
            });
            localStorage.setItem("user", JSON.stringify(response.data));
            window.location.href = "/";
        } catch (err) {
            setError("Inloggning misslyckades. Kontrollera dina uppgifter.");
            console.error(err);
        }
    };

    return (
        <>
            <LoginContainer>
                <LoginCard>
                    <TitleLogin>Logga in</TitleLogin>
                    {error && <ErrorMessage>{error}</ErrorMessage>}
                    <Form>
                        <label htmlFor="username">Användarnamn</label>
                        <input
                            id="username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Användarnamn"
                        />
                        <label htmlFor="password">Lösenord</label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Lösenord"
                        />
                        <button onClick={handleLogin}>Logga in</button>
                    </Form>
                </LoginCard>
            </LoginContainer>
        </>
    );
}

const TitleLogin = styled.h1`
text-align: center;
`;
const LoginContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: calc(100vh - 80px); /* Tar hänsyn till navbarhöjden */
    background: linear-gradient(135deg, #1e3c72, #2a5298);
`;

const LoginCard = styled.div`
    background: white;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    text-align: left;
    width: 100%;
    max-width: 400px;
`;

const Form = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;

    input {
        padding: 0.8rem;
        border: 1px solid #ccc;
        border-radius: 4px;
        font-size: 1rem;
    }

    button {
        padding: 0.8rem;
        background: #1e3c72;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-weight: bold;
        transition: background 0.3s;

        &:hover {
            background: #2a5298;
        }
    }
`;

const ErrorMessage = styled.h2`
    color: red;
    text-align: center;
    margin-bottom: 1rem;
`;

