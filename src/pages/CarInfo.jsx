import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useFetchData } from "../Hooks/useFetchData";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export function CarInfo() {
    const { carId } = useParams();
    const { allCars } = useFetchData();
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const car = allCars.find((car) => car.id === parseInt(carId, 10));
    if (!car) {
        return <StyledMessage>Bilen kunde inte hittas</StyledMessage>;
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
            </StyledDetails>
            <StyledDate>
                <div> 
                    <StyledLabel>Hämtas: </StyledLabel>
                    <StyledDatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        dateFormat="yyyy-MM-dd"
                        placeholderText="Välj datum"
                    />
                </div>
                <div>
                    <StyledLabel>Lämnas: </StyledLabel>
                    <StyledDatePicker
                        selected={endDate}
                        onChange={(date) => setEndDate(date)}
                        dateFormat="yyyy-MM-dd"
                        placeholderText="Välj datum"
                    />
                </div>
            </StyledDate>
            <TidInformation>Hämtning och lämning sker kl: 10</TidInformation>
            <StyledButton>Boka bilen</StyledButton>
        </StyledCarInfoContainer>
    );
}
const TidInformation= styled.p`
font-size: large;
`
const StyledCarInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3rem 2rem;  
  background: linear-gradient(135deg, #f0f4f8, #d9e2ec);
  min-height: 100vh;
  text-align: center;
`;

const StyledCarImage = styled.img`
  width: 450px;
  height: auto;
  object-fit: contain;
  border-radius: 10px;
  margin-bottom: 2rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const StyledDetails = styled.div`
  background: white;
  border-radius: 10px;
  padding: 2rem;
  width: 100%;
  max-width: 450px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const StyledTitle = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  color: #1e3c72;
  margin-bottom: 1rem;
`;

const StyledInfo = styled.p`
  font-size: 1.2rem;
  margin: 0.5rem 0;
  color: #333;
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

const StyledDate = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem; 
  margin-top: 2rem;
`;

const StyledDatePicker = styled(DatePicker)`
  padding: 0.8rem;
  font-size: 1rem;
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
