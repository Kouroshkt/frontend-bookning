import { useEffect, useState } from "react";
import styled from "styled-components";
import { useFetchData } from "../Hooks/useFetchData";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";


export default function Home() {
  const { categories, cities } = useFetchData();
  const [categoriesByCityId, setCategoriesByCityId] = useState([]);
  const [cityId, setCityId] = useState(null);
  const [categoryId, setCategoryId] = useState(null);
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

  useEffect(() => {
    if (cityId !== null) {
      async function fetchCategoriesByCityId() {
        try {
          const response = await fetch(`${baseUrl}/category/getcategory/${cityId}`);
          const data = await response.json();
          setCategoriesByCityId(data || []);
        } catch (error) {
          console.error("Failed to fetch categories by city ID:", error);
        }
      }
      fetchCategoriesByCityId();
    }

  }, [cityId]);

  const ShowCar = async () => {
    if (!cityId || !categoryId || !startDate || !endDate) {
      alert("För att fortsätta, vänligen fyll i alla obligatoriska fält.");
      return;
    }

    try {
      const formattedStartDate = formatDate(new Date(startDate));
      const formattedEndDate = formatDate(new Date(endDate));
      setStartDateToApi(formattedStartDate);
      setEndDateToApi(formattedEndDate);
      const response = await fetch(`${baseUrl}/car/getcarbyDate?cityId=${cityId}
        &carCategoryId=${categoryId}&startDate=${formattedStartDate}&endDate=${formattedEndDate}`);
      const data = await response.json();
      console.log(data)
      setCars(data || []);
    } catch (error) {
      console.error("Failed to fetch cars:", error);
    }
  };

  return (
    <StyledContainer>
      <StyledTitle> Våras kategori bilar </StyledTitle>
      <StyledCategories>
        {categories.map((category) => (category.id < 6 &&
          <StyledCategoryItem>
            <StyledTitle>{category.categoryName}</StyledTitle>
            <img src={category.categoryImage} />
            <p>{category.description}</p>
          </StyledCategoryItem>
        ))
        }
      </StyledCategories>
      <StyledForm>
        <StyledSelect
          onChange={(e) => {
            const selectedCity = cities.find((city) => city.cityName === e.target.value);
            if (selectedCity) {
              setCityId(selectedCity.id);
            } else {
              setCityId(null);
              setCategoriesByCityId([]);
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

        <StyledSelect
          onChange={(e) => {
            const selectedCategory = categoriesByCityId.find(
              (category) => category.categoryName === e.target.value
            );
            if (selectedCategory) {
              setCategoryId(selectedCategory.id);
            } else {
              setCategoryId(null);
            }
          }}
        >
          <option value="">Välj biltyp</option>
          {categoriesByCityId.map((category) => (
            <option key={category.id} value={category.categoryName}>
              {category.categoryName}
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
              const rentalDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24)); 
              setRentalDays(rentalDays);
            }
          }}
          dateFormat="yyyy-MM-dd"
          placeholderText="Välj datum"
          minDate={startDate ? new Date(startDate).setDate(new Date(startDate).getDate() + 1) : null}
        />

      </StyledForm>
      <StyledForm>
        <StyledButton onClick={() => ShowCar()}>FORTSÄTT</StyledButton>
      </StyledForm>

      <StyledCarList>
        {cars.length > 0 && (
          cars.map((car) => (
            <StyledCarItem key={car.id}>
              <CarLink to={`/carinfo/${car.id}/${startDateToApi}/${endDateToApi}/${rentalDays}`}>
                <TitleCar>{car.brand} {car.model}</TitleCar>
                <DescriptionCar>
                  {car.color} ({car.seats} säten)
                </DescriptionCar>
                <DescriptionCar>
                  {car.carCategory.categoryName}
                </DescriptionCar>
                <CityCar>{car.city.cityName}</CityCar>
                <DescriptionCar>
                  {car.price}kr
                </DescriptionCar>
                <img src={car.image} alt="Car image" />
              </CarLink>
            </StyledCarItem>
          ))
        )}
      </StyledCarList>
    </StyledContainer>
  );
}
const StyledLabel = styled.label`
  font-size: 1rem;
  font-weight: bold;
  color: #333;
  display: block;
`;
const StyledTitle = styled.h2`
color:#333;
text-align: center;
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
  background: linear-gradient(135deg, #f0f4f8, #d9e2ec);
  min-height: 100vh;
`;

const StyledForm = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
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
`;

const StyledCarList = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1.5rem;
`;
const StyledCategories = styled.div`
display: flex;
justify-content: center;
padding-bottom: 1rem;
flex-wrap: wrap;
gap: 1.5rem;
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
`;
const StyledCategoryItem = styled.div`
background: #566be598;
border-radius: 5px;
font-size: large;
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
`;

