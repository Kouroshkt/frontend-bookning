import styled from "styled-components";
import { TfiEmail } from "react-icons/tfi";
import { MdContactPhone } from "react-icons/md";
import { useState } from "react";

export default function Footer() {
    const [responseOfServer, setResponseOfServer] = useState();
    const [email, setEmail] = useState('');

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    async function SendEmailDefault() {
        if (!email) {
            setResponseOfServer("Skriv in ditt Epost.");
            return;
        }
        if (!isValidEmail(email)) {
            setResponseOfServer("Skriv in en giltig Epostadress.");
            return;
        }
        try {
            const response = await fetch("http://localhost:8080/email/sendnews", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: new URLSearchParams({ email }),
            });

            if (response.ok) {
                setResponseOfServer("E-post skickad!");
                setEmail(''); 
            } else {
                setResponseOfServer("Något gick fel...");
            }
        } catch (error) {
            console.error("Error sending email:", error);
            setResponseOfServer("Server kan inte skicka Epost.");
        }
    }

    return (
        <FooterSection>
            <ContactInfo>
                <PhoneInfo>
                    <Icon><MdContactPhone /></Icon>
                    <Title>Öppet helgfria vardagar 07.00-18.00</Title>
                    <TLNumber>+46712345678</TLNumber>
                </PhoneInfo>
                <LogoImg src="logo.jpeg" alt="" />
                <EmailInfo>
                    <Icon><TfiEmail /></Icon>
                    <Title>Vi svarar inom 24 timmar</Title>
                    <Email> info@kourosh.se</Email>
                </EmailInfo>
            </ContactInfo>
            <Line />
            <BottomSection>
                <Information>
                    <TitleInformation>
                        INFORMATION
                    </TitleInformation>
                    <LinkToConditions href="/villkor.pdf" target="_blank">
                        Villkor
                    </LinkToConditions>
                </Information>
                <Partner>
                    <TitleInformation>
                        PARTNER
                    </TitleInformation>
                    <LinkToPartner href="https://www.booking.com/" target="_blank">
                        Bookning.com
                    </LinkToPartner>
                </Partner>
                <News>
                    <TitleInformation>
                        NYHETSBREV
                    </TitleInformation>
                    <Title>
                        Prenumerera för att få nyheter<br></br> och speciella erbjudanden
                    </Title>
                    <EmailSending>
                        <InputEmail type="email" placeholder="E-postadress"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <ButtonEmail onClick={SendEmailDefault}>
                            SKICKA
                        </ButtonEmail>
                    </EmailSending>
                    {responseOfServer && <h4>{responseOfServer}</h4>}
                </News>
            </BottomSection>
        </FooterSection>
    );
}


const News = styled.div`

`

const LinkToPartner = styled.a`
  text-decoration: none;
  color: #b0c7ea;
  transition: color 0.5s ease;

  &:hover {
    color: #ff1900;
  }
`;


const Partner = styled.div`
`
const LinkToConditions = styled(LinkToPartner)``
const TitleInformation = styled.p`
font-size: large;
font-weight: 350;
`

const Information = styled.div`
`


const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: #dacad376;
`

const EmailInfo = styled.div`
text-align:center;
`
const Email = styled.p`
color: white;
font-size: 25px;
margin-top:9px;
margin-bottom: 20px;
font-weight: 400;
`
const Icon = styled.p`
color: white;
font-size: 35px;
margin-top:20px;
margin-bottom: 5px;
`

const PhoneInfo = styled.div`
text-align:center;
`
const Title = styled.p`
color: #b0c7ea;
font-size: 15px;
`
const TLNumber = styled.p`
color: white;
font-size: 28px;
margin-top:9px;
margin-bottom: 5px;
font-weight: 400;
`
const FooterSection = styled.div`
  background-color: #04162C;
  padding: 20px;
  height: auto;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  flex-wrap: wrap;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
`;

const BottomSection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  color: white;
  gap: 40px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
`;

const LogoImg = styled.img`
  width: 230px;

  @media (max-width: 768px) {
    width: 180px;
  }
`;

const InputEmail = styled.input`
  height: 30px;
  width: 200px;
  padding: 5px;
  margin-top: 10px;

  @media (max-width: 768px) {
    width: 100%;
    max-width: 250px;
  }
`;

const EmailSending = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const ButtonEmail = styled.button`
  height: 33px;
  color: white;
  background-color: #073874;
  transition: color 0.4s ease;
  border-radius: 5px;
  font-size: 13px;
  border: none;
  padding: 5px 15px;

  &:hover {
    background-color: #daddf4;
    color: #151515;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 768px) {
    width: 100%;
    max-width: 150px;
  }
`;
