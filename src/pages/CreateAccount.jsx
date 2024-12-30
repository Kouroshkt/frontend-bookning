import axios from "axios";
import { useState } from "react";
import styled from "styled-components";

export default function CreateAccount() {
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [repetPassword, setRepetPassword] = useState("");
    const [address, setAddress] = useState("");
    const [error, setError] = useState("");

    const handleAccount = async (event) => {
        event.preventDefault();
        if (password !== repetPassword) {
            setError("Lösenorden matchar inte!");
            return;
        }
        if (password.length < 6) {
            setError("Lösenord måste vara minst 6 tecken långt!");
            return;
        }

        const nyUser = { name, lastName, email, username, password, address };
        try {
            const response = await axios.post("http://localhost:8080/user/adduser", nyUser);
            console.log("Konto skapat", response.data);
            setError("");
            window.location.href = "/signin";
        } catch (err) {
            setError("Kan inte koppla till server. Försök igen senare.");
            console.error(err);
        }
    };

    return (
        <>
            <FormContainer>
                <CreateForm onSubmit={handleAccount}>
                    <h1>Skapa Konto</h1>
                    {error && <ErrorMessage>{error}</ErrorMessage>}
                    <label htmlFor="name">Namn</label>
                    <input
                        id="name"
                        type="text"
                        onChange={(event) => setName(event.target.value)}
                        placeholder="Förnamn"
                        required
                    />
                    <label htmlFor="lastName">Efternamn</label>
                    <input
                        id="lastName"
                        type="text"
                        onChange={(event) => setLastName(event.target.value)}
                        placeholder="Efternamn"
                        required
                    />
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder="E-postadress"
                        required
                    />
                    <label htmlFor="username">Användarnamn</label>
                    <input
                        id="username"
                        type="text"
                        onChange={(event) => setUsername(event.target.value)}
                        placeholder="Användarnamn"
                        required
                    />
                    <label htmlFor="password">Lösenord</label>
                    <input
                        id="password"
                        type="password"
                        onChange={(event) => setPassword(event.target.value)}
                        placeholder="Lösenord"
                        required
                    />
                    <label htmlFor="repetPassword">Bekräfta lösenord</label>
                    <input
                        id="repetPassword"
                        type="password"
                        onChange={(event) => setRepetPassword(event.target.value)}
                        placeholder="Bekräfta lösenord"
                        required
                    />
                    <label htmlFor="address">Adress</label>
                    <input
                        id="address"
                        type="text"
                        onChange={(event) => setAddress(event.target.value)}
                        placeholder="Adress"
                        required
                    />
                    <button type="submit">Skapa konto</button>
                </CreateForm>
            </FormContainer>
        </>
    );
}

// Styled-components
const FormContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: calc(100vh - 80px); /* Tar hänsyn till navbarhöjden */
    background: linear-gradient(135deg, #1e3c72, #2a5298);
`;

const CreateForm = styled.form`
    background: white;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
    max-width: 400px;

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

const ErrorMessage = styled.p`
    color: red;
    font-weight: bold;
`;

