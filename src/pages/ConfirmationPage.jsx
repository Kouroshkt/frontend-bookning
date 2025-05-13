import { useLocation } from "react-router-dom";
import jsPDF from "jspdf";
import axios from "axios";
import styled from "styled-components";

export function ConfirmationPage() {
    const { state } = useLocation();
    const {
        user,
        car,
        startDate,
        endDate,
        rentalDays,
        payment,
        carsAddress,
        totalPrice,
    } = state || {};

    const handleDownloadPDF = () => {
        const doc = new jsPDF();
        doc.text(`Bekräftelse för bilbokning`, 10, 10);
        doc.text(`Namn: ${user.name} ${user.lastName}`, 10, 20);
        doc.text(`E-post: ${user.email}`, 10, 30);
        doc.text(`Bil: ${car.brand} ${car.model}`, 10, 40);
        doc.text(`Datum: ${startDate} till ${endDate}`, 10, 50);
        doc.text(`Betalning: ${payment}`, 10, 60);
        doc.text(`Totalpris: ${totalPrice} kr`, 10, 70);
        doc.save("bekraftelse.pdf");
    };
    let textEmail = `
Hej ${user.name},

Tack för din bokning!

Här kommer en bekräftelse på din bilbokning:
Bil: ${car.brand} ${car.model}
Period: ${startDate} till ${endDate} (${rentalDays} dagar)
Totalt pris: ${totalPrice} kr
Betalsätt: ${payment}

Vänligen hör av dig om du har några frågor.

Med vänliga hälsningar,
Ditt Biluthyrningsteam
`;

    const handleSendEmail = async () => {
        try {
            await axios.post("http://localhost:8080/email/send-confirmation", {
                email: user.email,
                name: user.name,
                message: textEmail,
            });
            alert("Mejlet har skickats!");
        } catch (err) {
            console.error(err);
            alert("Misslyckades att skicka mejlet.");
        }
    };

    


return (
    <Container>
        <Title>Bokningsbekräftelse</Title>
        <InfoTable>
            <Row>
                <Label>Namn:</Label>
                <Value>{user.name} {user.lastName}</Value>
            </Row>
            <Row>
                <Label>E-post:</Label>
                <Value>{user.email}</Value>
            </Row>
            <Row>
                <Label>Bil:</Label>
                <Value>{car.brand} {car.model}</Value>
            </Row>
            <Row>
                <Label>Datum:</Label>
                <Value>{startDate} till {endDate}</Value>
            </Row>
            <Row>
                <Label>Återlämningsadress:</Label>
                <Value>{carsAddress}</Value>
            </Row>
            <Row>
                <Label>Betalningsmetod:</Label>
                <Value>{payment}</Value>
            </Row>
            <Row>
                <Label>Totalpris:</Label>
                <Value>{totalPrice} kr</Value>
            </Row>
        </InfoTable>

        <ButtonContainer>
            <Button onClick={handleDownloadPDF}>Spara som PDF</Button>
            <Button onClick={handleSendEmail}>Skicka till e-post</Button>
        </ButtonContainer>
    </Container>
);
}


const Container = styled.div`
  max-width: 600px;
  margin: 4rem auto;
  padding: 2rem;
  background-color: #f8f8f8;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2rem;
  color: #333;
`;

const InfoTable = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 0.5rem 1rem;
`;

const Row = styled.div`
  display: contents;
`;

const Label = styled.div`
  font-weight: 600;
  color: #555;
`;

const Value = styled.div`
  color: #222;
`;

const ButtonContainer = styled.div`
  margin-top: 2rem;
  display: flex;
  justify-content: center;
  gap: 1rem;
`;

const Button = styled.button`
  background-color: #0077cc;
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background-color: #005fa3;
  }
`;
