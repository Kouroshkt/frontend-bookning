import styled from "styled-components";
import { data, useParams } from "react-router-dom";
import { useFetchData } from "../Hooks/useFetchData";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export function CarInfo() {
  const { carId } = useParams();
  const { allCars } = useFetchData();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [checkDate, setCheckDate] = useState(null);
  const today = new Date();
  const formatDate = (date) => date.toISOString().split("T")[0];
  const baseUrl = "http://localhost:8080";


  const car = allCars.find((car) => car.id === parseInt(carId, 10));
  if (!car) {
    return <StyledMessage>Bilen kunde inte hittas</StyledMessage>;
  }
  async function CheckDate() {
    try {
      const formattedStartDate = formatDate(new Date(startDate)); 
      const formattedEndDate = formatDate(new Date(endDate));
      const response = await fetch(`${baseUrl}/carbookning/carcheck?
        carId=${carId}&startDate=${formattedStartDate}&endDate=${formattedEndDate}`);
      const data = await response.json();
      setCheckDate(data);
    } catch (error) {
      console.error("Failed to fetch CheckDate")
    }
    console.log(data)

  }

  return (
    <StyledCarInfoContainer>
      <StyledCarImage src={`http://localhost:3000/${car.image}`} alt={`${car.brand} ${car.model}`} />
      <StyledDetails>
        <StyledTitle>{car.brand} {car.model}</StyledTitle>
        <StyledInfo>Färg: {car.color}</StyledInfo>
        <StyledInfo>Antal säten: {car.seats}</StyledInfo>
        <StyledInfo>Kategori: {car.carCategory.categoryName}</StyledInfo>
        <StyledInfo>Stad: {car.city.cityName}</StyledInfo>
        <StyledInfo>{car.carCategory.description}</StyledInfo>
        <div>
          <StyledLabel>Hämtas: </StyledLabel>
          <StyledDatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            dateFormat="yyyy-MM-dd"
            placeholderText="Välj datum"
            minDate={today}
          />
        </div>
        <div>
          <StyledLabel>Lämnas: </StyledLabel>
          <StyledDatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            dateFormat="yyyy-MM-dd"
            placeholderText="Välj datum"
            minDate={startDate}
          />
        </div>
        <TidInformation>Hämtning och lämning sker kl: 10</TidInformation>
        <StyledButton onClick={() => CheckDate()}>Se om bilen är ledig</StyledButton>
        {!checkDate ? <TidInformation>På det datumet är bilen inte tillgänglig</TidInformation> :
          <TidInformation>Bilen är ledig för bokning!</TidInformation>}
      </StyledDetails>
    </StyledCarInfoContainer>
  );
}

const TidInformation = styled.p`
  font-size: 22px;
`;

const StyledCarInfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  background: linear-gradient(135deg, #f0f4f8, #d9e2ec);
  text-align: center;
`;

const StyledCarImage = styled.img`
  width: 550px;
  height: auto;
`;

const StyledDetails = styled.div`
  background: white;
  border-radius: 10px;
  padding: 2rem;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const StyledTitle = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  color: #1e3c72;
  margin-bottom: 1.5rem;
`;

const StyledInfo = styled.p`
  font-size: 1.2rem;
  text-align: left;
  margin: 0.3 rem 0;
  color: #333;
  margin-bottom: 1.5rem;
`;

const StyledMessage = styled.p`
  font-size: 1.5rem;
  color: red;
  text-align: center;
  margin-top: 5rem;
`;

const StyledLabel = styled.label`
  font-size: 1.2rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 0.5rem;
  display: block;
`;

const StyledDatePicker = styled(DatePicker)`
  padding: 0.8rem;
  font-size: 1rem;
  margin-bottom: 0.5rem;
  width: 250px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  &:focus {
    border-color: #2a5298;
  }
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
