import axios from "axios";
import { useState } from "react";
import styled from "styled-components";
import { Eye, EyeOff } from "lucide-react";

export default function Signin() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault(); // Prevent default form submission

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
        <LoginContainer>
            <LoginCard>
                <LogoStyle>
                    <LogoImg src="logo.jpeg" alt="Logo" />
                </LogoStyle>
                <TitleLogin>Logga in</TitleLogin>
                {error && <ErrorMessage>{error}</ErrorMessage>}
                <Form onSubmit={handleLogin}>
                    <label htmlFor="username">Användarnamn</label>
                    <input
                        id="username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Användarnamn"
                        required
                    />
                    <label htmlFor="password">Lösenord</label>
                    <PasswordInputContainer>
                        <input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Lösenord"
                            required
                        />
                        <PasswordToggleButton
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            aria-label={showPassword ? "Dölj lösenord" : "Visa lösenord"}
                        >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </PasswordToggleButton>
                    </PasswordInputContainer>
                    <ForgetPassword href="/forgot-password">
                        HAR DU GLÖMT LÖSENORDET?
                    </ForgetPassword>
                    <button type="submit">Logga in</button>
                </Form>
            </LoginCard>
        </LoginContainer>
    );
}

// Styled Components
const LogoStyle = styled.div`
    text-align: center;
`;

const LogoImg = styled.img`
    width: 190px;
`;

const TitleLogin = styled.h1`
    text-align: center;
    margin-bottom: 1.5rem;
`;

const LoginContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: calc(100vh - 80px);
    background: linear-gradient(135deg, #f0f4f8, #d9e2ec);
`;

const LoginCard = styled.div`
    background: #04162c;
    color: white;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    text-align: left;
    width: 100%;
    max-width: 400px;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1rem;

    label {
        font-weight: bold;
    }

    input {
        padding: 0.8rem;
        border: 1px solid #ccc;
        border-radius: 4px;
        font-size: 1rem;
        background-color: #fff;
        color: #333;
    }

    button[type="submit"] {
        padding: 0.8rem;
        background: #359a51;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-weight: bold;
        transition: background 0.3s;

        &:hover {
            background: #2a7a3f;
        }
    }
`;

const PasswordInputContainer = styled.div`
    position: relative;
    display: flex;
    align-items: center;

    input {
        flex: 1;
        padding-right: 40px; // Space for the toggle button
    }
`;

const PasswordToggleButton = styled.button`
    position: absolute;
    right: 10px;
    background: none;
    border: none;
    cursor: pointer;
    color: #ccc;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
        color: #359a51;
    }
`;

const ErrorMessage = styled.h2`
    color: #ff6b6b;
    text-align: center;
    margin-bottom: 1rem;
    font-size: 1rem;
    padding: 0.5rem;
    background-color: #fff3f3;
    border-radius: 4px;
`;

const ForgetPassword = styled.a`
    text-align: center;
    color: #359a51;
    text-decoration: none;
    font-size: 0.9rem;
    margin-top: 0.5rem;

    &:hover {
        text-decoration: underline;
    }
`;