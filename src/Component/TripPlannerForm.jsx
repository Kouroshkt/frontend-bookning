import { useState } from "react";
import styled from "styled-components";
import axios from "axios";

export default function TripPlannerForm() {
  const [showForm, setShowForm] = useState(false);
  const [fromCity, setFromCity] = useState("");
  const [toCity, setToCity] = useState("");
  const [days, setDays] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!fromCity || !toCity || !days) {
      setError("Alla fält måste fyllas i.");
      return;
    }

    const message = `Jag vill resa från ${fromCity} till ${toCity} med bil. Hela restiden är ${days} dagar. Ge mig ett kort svar och separera varje dag med en ny rad,varje rad har mat tips och en turist plats och avstånd mellan städer och tidresa, det ska definieras med <br/> för radbytning, och spännande emojier.`;

    try {
      setLoading(true);
      setError("");
      setResponse("");

      const res = await axios.post("http://localhost:8080/ai/chat", { message });

      setResponse(res.data || "Inget svar från AI.");
    } catch (err) {
      console.error(err);
      setError("Fel vid kontakt med AI-servern.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      {!showForm ? (
        <>
          <Title>Vill du ha en planering för din resa?</Title>
          <Button onClick={() => setShowForm(true)}>Ja</Button>
        </>
      ) : (
        <>
          <Label>Från stad:</Label>
          <Input
            type="text"
            value={fromCity}
            onChange={(e) => setFromCity(e.target.value)}
            placeholder="t.ex. Stockholm"
          />

          <Label>Till stad:</Label>
          <Input
            type="text"
            value={toCity}
            onChange={(e) => setToCity(e.target.value)}
            placeholder="t.ex. Göteborg"
          />

          <Label>Antal dagar:</Label>
          <Input
            type="number"
            value={days}
            onChange={(e) => setDays(e.target.value)}
            placeholder="t.ex. 3"
          />

          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? "Skickar..." : "Skicka till AI"}
          </Button>

          {error && <ErrorText>{error}</ErrorText>}

          {response && (
            <ResponseBox>
              <strong>AI:</strong>
              <p dangerouslySetInnerHTML={{ __html: response }} />
            </ResponseBox>
          )}
        </>
      )}
    </Container>
  );
}

// Styling med styled-components
const Container = styled.div`
  max-width: 71%;
  margin: 2rem auto;
  padding: 1.5rem;
  border-radius: 12px;
  background: #f7f9fa;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  font-size: 1.4rem;
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  margin-top: 1rem;
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  margin-top: 0.3rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  box-sizing: border-box;
`;

const Button = styled.button`
  margin-top: 1rem;
  padding: 6px 12px;
  background-color: #0070f3;
  color: white;
  font-weight: 500;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  width: auto;
  min-width: 120px;

  &:hover {
    background-color: #0059c1;
  }

  &:disabled {
    background-color: #aaa;
    cursor: not-allowed;
  }
`;

const ResponseBox = styled.div`
  margin-top: 1.5rem;
  background-color: #eef6ff;
  border-left: 4px solid #0070f3;
  padding: 1rem;
  border-radius: 6px;
`;

const ErrorText = styled.p`
  margin-top: 1rem;
  color: red;
  font-weight: bold;
`;
