import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import { useFetchData } from "../Hooks/useFetchData";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import axios from "axios";

export function CarInfo() {
  const { carId, startDate, endDate, rentalDays } = useParams();
  const { allCars, cities, paymentsOptions } = useFetchData();
  const user = JSON.parse(localStorage.getItem("user"));

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [carsAddress, setCarsAddress] = useState("");
  const [payment, setPayment] = useState("");
  const [error, setError] = useState("");
  const [isOver21, setIsOver21] = useState(false);
  const [hasLicense, setHasLicense] = useState(false);

  const car = allCars.find((car) => car.id === parseInt(carId, 10));
  const navigate = useNavigate();

  if (!car) {
    return <StyledMessage>Bilen kunde inte hittas</StyledMessage>;
  }

  let carPrice = parseFloat(car.price);
  let totalPrice = rentalDays * carPrice;

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
      window.location.reload();
    } catch (err) {
      setError("Inloggning misslyckades. Kontrollera dina uppgifter.");
      console.error(err);
    }
  };

  const handleBooking = () => {
    if (!carsAddress || !payment) {
      setError("Du måste välja betalningsmetod och återlämningsadress.");
      return;
    }

    if (!isOver21 || !hasLicense) {
      setError("Du måste bekräfta att du är minst 21 år gammal och har giltigt svenskt körkort.");
      return;
    }

    const bookingData = {
      user,
      car,
      startDate,
      endDate,
      rentalDays,
      payment,
      carsAddress,
      totalPrice,
    };

    navigate("/confirmation", { state: bookingData });
  };

  return (
    <StyledCarInfoContainer>
      <StyledDetails>
        <StyledCarImage
          src={`http://localhost:3000/${car.image}`}
          alt={`${car.brand} ${car.model}`}
        />
        <StyledTitle>
          {car.brand} {car.model}
        </StyledTitle>
        <StyledInfoCar>
          Utforska en {car.brand} {car.model} med {car.seats} säten. Denna bil tillhör kategorin
          "{car.carCategory.categoryName}" och finns tillgänglig i {car.city.cityName}.&nbsp;
          <b>{car.carCategory.description}.</b>
        </StyledInfoCar>

        {user ? (
          <CustomerInformation>
            <UserTitle>Din profilinformation</UserTitle>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <CustomerInfo>
              <StyledInfo>Namn</StyledInfo>
              <UserInfo>{user.name}</UserInfo>
            </CustomerInfo>
            <CustomerInfo>
              <StyledInfo>Efternamn</StyledInfo>
              <UserInfo>{user.lastName}</UserInfo>
            </CustomerInfo>
            <CustomerInfo>
              <StyledInfo>Epost adress</StyledInfo>
              <UserInfo>{user.email}</UserInfo>
            </CustomerInfo>
            <TidInformation>Bilen ska hämtas kl. 10:00</TidInformation>
            <CustomerInfo>
              <StyledInfo>Hämtningsdatum:</StyledInfo>
              <UserInfo>{startDate}</UserInfo>
            </CustomerInfo>
            <CustomerInfo>
              <StyledInfo>Hämtnings stad:</StyledInfo>
              <UserInfo>{car.city.cityName}</UserInfo>
            </CustomerInfo>
            <CustomerInfo>
              <StyledInfo>Adress:</StyledInfo>
              <UserInfo>{car.city.carsAddress}</UserInfo>
            </CustomerInfo>
            <TidInformation>Bilen ska lämnas tillbaka senast kl. 9:00</TidInformation>
            <CustomerInfo>
              <StyledInfo>Återlämningsdatum:</StyledInfo>
              <UserInfo>{endDate}</UserInfo>
            </CustomerInfo>
            <CustomerInfo>
              <StyledInfo>Återlämning stad:</StyledInfo>
              <StyledSelect
                onChange={(e) => {
                  const selectedCity = cities.find(
                    (city) => city.cityName === e.target.value
                  );
                  setCarsAddress(selectedCity ? selectedCity.carsAddress : null);
                }}
              >
                <option value="">Välj stad</option>
                {cities.map((city) => (
                  <option key={city.id} value={city.cityName}>
                    {city.cityName}
                  </option>
                ))}
              </StyledSelect>
            </CustomerInfo>

            {carsAddress && (
              <CustomerInfo>
                <StyledInfo>Adress:</StyledInfo>
                <UserInfo>{carsAddress}</UserInfo>
              </CustomerInfo>
            )}

            <CustomerInfo>
              <StyledInfo>Total pris:</StyledInfo>
              <UserInfo>
                {rentalDays}(Antal dagar) × {carPrice} = {totalPrice} kr
              </UserInfo>
            </CustomerInfo>

            <TidInformation>Val av betalningsmetod</TidInformation>
            <CustomerInfo>
              <StyledInfo>Betalningsmetod:</StyledInfo>
              <StyledSelect
                onChange={(e) => {
                  const selectedPayment = paymentsOptions.find(
                    (p) => p.option === e.target.value
                  );
                  setPayment(selectedPayment ? selectedPayment.option : null);
                }}
              >
                <option value="">Välj betalningsmetod</option>
                {paymentsOptions.map((payment) => (
                  <option key={payment.id} value={payment.option}>
                    {payment.option}
                  </option>
                ))}
              </StyledSelect>
            </CustomerInfo>

            <StyledCheckbox>
              <input
                type="checkbox"
                checked={isOver21}
                onChange={(e) => setIsOver21(e.target.checked)}
              />
              <label>Jag är minst 21 år gammal</label>
            </StyledCheckbox>
            <StyledCheckbox>
              <input
                type="checkbox"
                checked={hasLicense}
                onChange={(e) => setHasLicense(e.target.checked)}
              />
              <label>Jag har giltigt svenskt körkort</label>
            </StyledCheckbox>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <StyledButton onClick={handleBooking}>Boka bilen</StyledButton>
          </CustomerInformation>
        ) : (
          <LoginCard>
            {!user && (
              <StyledLoginAlarm>
                För att kunna boka bilen behöver du <br />
                <b>Logga in</b>
              </StyledLoginAlarm>
            )}
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
        )}
      </StyledDetails>
    </StyledCarInfoContainer>
  );
}


const StyledCarInfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  background: linear-gradient(135deg, #f0f4f8, #d9e2ec);
  text-align: center;
  padding-top: 50px;
  padding-bottom: 50px;
`;

const StyledDetails = styled.div`
  background: white;
  border-radius: 10px;
  padding: 2rem;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const StyledCarImage = styled.img`
  width: 450px;
  height: auto;
`;

const StyledTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  color: #1e3c72;
  margin-bottom: 1.5rem;
`;

const StyledInfoCar = styled.p`
  font-size: 17px;
  font-weight: 500;
  color: white;
  line-height: 2;
  background: #2a5298;
  border-radius: 10px;
  padding: 2rem;
  max-width: 450px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.121);
`;

const CustomerInformation = styled.div`
  padding-bottom: 1rem;
`;

const UserTitle = styled.p`
  font-size: 20px;
  font-weight: 600;
  color: #28a745;
`;

const CustomerInfo = styled.div`
  display: flex;
  padding-bottom: 1rem;
  justify-content: space-between;
`;

const StyledInfo = styled.label`
  font-size: 1rem;
  font-weight: 500;
  color: #333333;
`;

const UserInfo = styled.label`
  color: #2a5298;
  font-weight: 600;
  font-size: 1rem;
`;

const TidInformation = styled.p`
  font-size: 20px;
  font-weight: 600;
  color: #28a745;
`;

const StyledSelect = styled.select`
  padding: 0.8rem;
  font-size: 0.8rem;
  width: 200px;
  border: 1px solid #28a745;
  border-radius: 5px;
  background: white;
  &:hover {
    border-color: #2a5298;
  }
`;

const StyledCheckbox = styled.div`
  display: flex;
  font-weight: 500;
  margin-bottom: 1rem;
  gap: 0.5rem;
`;

const StyledButton = styled.button`
  background-color: #2a5298;
  color: white;
  font-size: 1.2rem;
  font-weight: bold;
  padding: 0.8rem 2rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 2rem;
  &:hover {
    background-color: #1a3c6c;
  }
`;

const StyledLoginAlarm = styled.h2`
  text-align: center;
  background: #f60404;
  border-radius: 10px;
  color: white;
  padding: 2rem;
`;

const LoginCard = styled.div``;

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
    font-size: 1rem;
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

const StyledMessage = styled.p`
  font-size: 1.5rem;
  color: red;
  text-align: center;
  margin-top: 5rem;
`;
