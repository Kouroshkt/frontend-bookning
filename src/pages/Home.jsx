import { useEffect, useState } from "react";
import styled from "styled-components";
import { useFetchData } from "../Hooks/useFetchData";
import { Link } from "react-router-dom";

export default function Home() {
  const {allCars, cities } = useFetchData();
  const [categoriesByCityId, setCategoriesByCityId] = useState([]);
  const [cityId, setCityId] = useState(null);
  const [categoryId, setCategoryId] = useState(null);
  const [cars, setCars] = useState([]);
  const baseUrl = "http://localhost:8080";
  useEffect(() => {
    setCars(allCars || []);
  }, [allCars]);
  
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
    if (!cityId || !categoryId) {
      alert("Vänligen välj en stad och en biltyp.");
      return;
    }

    try {
      const response = await fetch(`${baseUrl}/car/getcar?cityId=${cityId}&carCategoryId=${categoryId}`);
      const data = await response.json();
      console.log(data);
      setCars(data || []);
    } catch (error) {
      console.error("Failed to fetch cars:", error);
    }
  };
  const ShowAllCar = async () => {
    setCars(allCars);
  };

  return (
    <StyledContainer>
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

        <StyledButton onClick={() => ShowCar()}>Sök</StyledButton>
        <StyledButton onClick={() => ShowAllCar()}>Vissa alla bilar</StyledButton>
      </StyledForm>

      <StyledCarList>
        {cars.length > 0 && (
          cars.map((car) => (
            <StyledCarItem key={car.id}>
              <CarLink to={`/carinfo/${car.id}`}>
              <TitleCar>{car.brand} {car.model}</TitleCar>
              <DescriptionCar>
                {car.color} ({car.seats} säten)
              </DescriptionCar>
              <DescriptionCar>
                {car.carCategory.categoryName}
              </DescriptionCar>
              <CityCar>{car.city.cityName}</CityCar>
              <img src={car.image} alt="Car image" />
              </CarLink>
            </StyledCarItem>
          ))
        )}
      </StyledCarList>
    </StyledContainer>
  );
}
const CarLink=styled(Link)`

`
const CityCar=styled.h4`
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
  gap: 1rem;
  margin-bottom: 2rem;
`;

const StyledSelect = styled.select`
  padding: 0.5rem;
  font-size: 1rem;
  width: 250px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background: white;
  &:hover {
    border-color: #2a5298;
  }
`;

const StyledButton = styled.button`
  padding: 0.8rem 1.2rem;
  font-size: 1rem;
  width: 250px;
  color: white;
  background: linear-gradient(135deg, #1e3c72, #2a5298);
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

const StyledCarItem = styled.div`
  background: white;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  text-align: center;

  img {
    width: 300px; 
    height: 200px; 
    object-fit: contain; /* Skalar proportionellt utan att klippa */
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

