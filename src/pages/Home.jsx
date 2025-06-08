import { useState } from "react";
import styled from "styled-components";
import { useFetchData } from "../Hooks/useFetchData";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { CarPic } from "../Component/CarPic";
import TripPlannerForm from "../Component/TripPlannerForm";

export default function Home() {
  const { categories, cities } = useFetchData();
  const [cityId, setCityId] = useState(null);
  const [cars, setCars] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [rentalDays, setRentalDays] = useState(0);
  const [startDateToApi, setStartDateToApi] = useState(null);
  const [endDateToApi, setEndDateToApi] = useState(null);
  const today = new Date();
  const baseUrl = "http://localhost:8080";

  const formatDate = (date) => {
    if (!(date instanceof Date) || isNaN(date)) {
      console.warn("Invalid date provided:", date);
      return "";
    }
    return new Intl.DateTimeFormat("sv-SE", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(date);
  };

  const ShowCar = async () => {
    if (!cityId || !startDate || !endDate) {
      alert("För att fortsätta, vänligen fyll i alla obligatoriska fält.");
      return;
    }

    try {
      const formattedStartDate = formatDate(new Date(startDate));
      const formattedEndDate = formatDate(new Date(endDate));
      setStartDateToApi(formattedStartDate);
      setEndDateToApi(formattedEndDate);

      const response = await fetch(
        `${baseUrl}/car/getcarbyDate?cityId=${cityId}&startDate=${formattedStartDate}&endDate=${formattedEndDate}`
      );
      const data = await response.json();
      console.log(data);
      setCars(data || []);
    } catch (error) {
      console.error("Failed to fetch cars:", error);
    }
  };

  return (
    <StyledContainer>
      <StyledTitle>Våras kategori bilar</StyledTitle>
      <StyledCategories>
        {categories.map(
          (category) =>
            category.id < 5 && (
              <StyledCategoryItem key={category.id}>
                <StyledTitle>{category.categoryName}</StyledTitle>
                <img src={category.categoryImage} alt=" " />
                <p>{category.description}</p>
              </StyledCategoryItem>
            )
        )}
      </StyledCategories>

      <StyledInfoBox>
        <h5>Boka hyrbil online</h5>
        <p>
          <br />
          <b>
            <IoCheckmarkDoneSharp style={{ fontSize: "1.7rem" }} />
            Kostnadsfri avbokning<br />
            <IoCheckmarkDoneSharp style={{ fontSize: "1.7rem" }} />
            Trygg och erfaren leverantör
            <br />
            <br />
          </b>
        </p>
        <p>
          Hos oss kan du hyra bil i hela Sverige. Boka enkelt och välj bland ett
          stort utbud av hyrbilar, hos våra fantastiska biluthyrare på fler än
          10 orter från norr till söder. Välj station nedan och se tillgängliga
          bilar att hyra i nästa steg.
          <br />
          <br />
        </p>

        <StyledForm>
          <StyledSelect
            onChange={(e) => {
              const selectedCity = cities.find(
                (city) => city.cityName === e.target.value
              );
              if (selectedCity) {
                setCityId(selectedCity.id);
              } else {
                setCityId(null);
              }
            }}
          >
            <option value="">Välj stad</option>
            {cities.map((city) => (
              <option key={city.id} value={city.cityName}>
                {city.cityName}
              </option>
            ))}
          </StyledSelect>

          <StyledLabel>Hämtas: </StyledLabel>
          <StyledDatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            dateFormat="yyyy-MM-dd"
            placeholderText="Välj datum"
            minDate={today}
          />
          <StyledLabel>Lämnas: </StyledLabel>
          <StyledDatePicker
            selected={endDate}
            onChange={(date) => {
              setEndDate(date);
              if (startDate && date) {
                const start = new Date(startDate);
                const end = new Date(date);
                const rentalDays = Math.ceil(
                  (end - start) / (1000 * 60 * 60 * 24)
                );
                setRentalDays(rentalDays);
              }
            }}
            dateFormat="yyyy-MM-dd"
            placeholderText="Välj datum"
            minDate={
              startDate
                ? new Date(startDate).setDate(
                  new Date(startDate).getDate() + 1
                )
                : null
            }
          />
        </StyledForm>

        <StyledForm>
          <StyledButton onClick={() => ShowCar()}>FORTSÄTT</StyledButton>
        </StyledForm>
      </StyledInfoBox>

      <StyledCarList>
        {cars.length > 0 &&
          cars.map((car) => (
            <StyledCarItem key={car.id}>
              <CarLink
                to={`/carinfo/${car.id}/${startDateToApi}/${endDateToApi}/${rentalDays}`}
              >
                <TitleCar>
                  {car.brand} {car.model}
                </TitleCar>
                <DescriptionCar>
                  {car.color} ({car.seats} säten)
                </DescriptionCar>
                <DescriptionCar>
                  {car.carCategory.categoryName}
                </DescriptionCar>
                <CityCar>{car.city.cityName}</CityCar>
                <DescriptionCar>{car.price}kr</DescriptionCar>
                <img src={car.image} alt="Car image" />
              </CarLink>
            </StyledCarItem>
          ))}
      </StyledCarList>
      <TripPlannerForm />
      <CarPic />
    </StyledContainer>
  );
}

const StyledLabel = styled.label`
  font-size: 1rem;
  font-weight: bold;
  color: #333;
  display: block;
`;
const StyledTitle = styled.h1`
color:#0906aa;
text-align: center;
 @media (max-width: 768px) {
display: none;
  }
`;

const CarLink = styled(Link)`

`
const CityCar = styled.h4`
color: blue;
`
const DescriptionCar = styled.p`
font-size:16px;
`
const TitleCar = styled.h3`
font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`

const StyledContainer = styled.div`
  padding: 5rem;
  background-image: url("/0.jpg");
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 2rem 1rem;
  }
`;

const StyledForm = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
  }
`;

const StyledSelect = styled.select`
  padding: 0.8rem;
  font-size: 1rem;
  width: 200px;
  border: 1px solid #28a745;
  border-radius: 5px;
  background: white;

  &:hover {
    border-color: #2a5298;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const StyledDatePicker = styled(DatePicker)`
  padding: 0.8rem;
  font-size: 1rem;
  width: 200px;
  border: 1px solid #28a745;
  border-radius: 5px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:focus {
    border-color: #2a5298;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const StyledInfoBox = styled.div`
  background-color: #ffffffd1;
  padding: 2rem;
  width: 70%;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: 2rem auto;
  text-align: center;

  h5 {
    font-size: 2.5rem;
    color: #2a5298;
    margin-bottom: 1rem;
  }

  p {
    font-size: 1.3rem;
    line-height: 1.6;
  }

  b {
    color: #28a745;
  }

  @media (max-width: 768px) {
    width: 90%;
    padding: 1rem;

    h5 {
      font-size: 1.5rem;
    }

    p {
      font-size: 1rem;
    }
  }
`;

const StyledCarItem = styled.div`
  background: white;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  text-align: center;

  img {
    width: 300px;
    height: 200px;
    object-fit: contain;
    border-radius: 5px;
    margin-top: 1rem;
  }

  &:hover {
    transform: scale(1.05);

    img {
      transform: scale(1.5);
    }
  }

  @media (max-width: 768px) {
    img {
      width: 100%;
      height: auto;
    }
  }
`;

const StyledCategoryItem = styled.div`
  background: #566be598;
  border-radius: 5px;
  font-size: large;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  text-align: center;

  img {
    width: 250px;
    height: 150px;
    object-fit: contain;
    border-radius: 5px;
    margin-top: 1rem;
  }

  @media (max-width: 768px) {
    img {
      width: 100%;
      height: auto;
    }
  }
`;

const StyledButton = styled.button`
  padding: 0.8rem 1.2rem;
  font-size: 1rem;
  width: 200px;
  color: white;
  background: #28a745;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  text-transform: uppercase;
  font-weight: bold;

  &:hover {
    background: linear-gradient(135deg, #2a5298, #1e3c72);
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const StyledCarList = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin-bottom: 3rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const StyledCategories = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: 1rem;
  flex-wrap: wrap;
  gap: 1rem;

  @media (max-width: 768px) {
    display: none;
  }
`;


