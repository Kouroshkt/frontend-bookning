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
    const [error, setError] = useState("");
    const [termsAccepted, setTermsAccepted] = useState(false);

    const handleAccount = async (event) => {
        event.preventDefault();
        
        if (!termsAccepted) {
            setError("Du måste acceptera villkoren för att fortsätta.");
            return;
        }

        if (password !== repetPassword) {
            setError("Lösenorden matchar inte!");
            return;
        }

        if (password.length < 6) {
            setError("Lösenord måste vara minst 6 tecken långt!");
            return;
        }

        const nyUser = { name, lastName, email, username, password };
        try {
            const response = await axios.post("http://localhost:8080/user/adduser", nyUser);
            console.log("Konto skapat", response.data);
            setError("");
            localStorage.setItem("user", JSON.stringify(response.data));
            window.location.href = "/";
        } catch (err) {
            if (err.response && err.response.status === 409) {
                alert("E-postadressen är redan registrerad.");
                window.location.reload();
            } else {
                setError("Kan inte koppla till server. Försök igen senare.");
            }
            console.error(err);
        }
    };

    return (
        <FormContainer>
            <CreateForm onSubmit={handleAccount}>
                <LogoStyle>
                    <LogoImg src="logo.jpeg" alt="Logo" />
                </LogoStyle>
                <StyledTitle>Skapa Konto</StyledTitle>
                {error && <ErrorMessage>{error}</ErrorMessage>}
                <label htmlFor="name">Namn</label>
                <input
                    id="name"
                    value={name}
                    type="text"
                    onChange={(event) => setName(event.target.value)}
                    placeholder="Förnamn"
                    required
                />
                <label htmlFor="lastName">Efternamn</label>
                <input
                    id="lastName"
                    value={lastName}
                    type="text"
                    onChange={(event) => setLastName(event.target.value)}
                    placeholder="Efternamn"
                    required
                />
                <label htmlFor="email">Email</label>
                <input
                    id="email"
                    value={email}
                    type="email"
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="E-postadress"
                    required
                />
                <label htmlFor="username">Användarnamn</label>
                <input
                    id="username"
                    value={username}
                    type="text"
                    onChange={(event) => setUsername(event.target.value)}
                    placeholder="Användarnamn"
                    required
                />
                <label htmlFor="password">Lösenord</label>
                <input
                    id="password"
                    value={password}
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
                <CheckboxContainer>
                    <input
                        type="checkbox"
                        checked={termsAccepted}
                        onChange={(event) => setTermsAccepted(event.target.checked)}
                    />
                    <p>Jag accepterar <LinkToConditions href="villkor.pdf" target="_blank">
                    CAR RENT:s villkor
                    </LinkToConditions></p>
                </CheckboxContainer>
                <button type="submit">Skapa konto</button>
            </CreateForm>
        </FormContainer>
    );
}

const LinkToConditions = styled.a`
    color: #359a51;
    text-decoration: none;
    &:hover {
        text-decoration: underline;
    }
`;

const LogoStyle = styled.div`
    text-align: center;
`;

const LogoImg = styled.img`
    width: 190px;
`;

const StyledTitle = styled.h1`
    text-align: center;
`;

const FormContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: calc(120vh - 80px);
    background: linear-gradient(135deg, #f0f4f8, #d9e2ec);
`;

const CreateForm = styled.form`
    background: #04162c;
    color: white;
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
        background: #359a51;
        color: white;
        border: none;
        font-size: 1rem;
        border-radius: 4px;
        cursor: pointer;
        font-weight: bold;
        transition: background 0.3s;

        &:hover {
            background: #2a7a3f;
        }
    }
`;

const ErrorMessage = styled.p`
    color: red;
    font-weight: bold;
`;

const CheckboxContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin: 0.5rem 0;

    p {
        margin: 0;
    }
`;