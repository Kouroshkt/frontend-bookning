import { useState, useEffect } from "react";
import styled from "styled-components";

export function CarPic() {
  const carImage = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % carImage.length);
    }, 3000);

    return () => clearInterval(interval); // Rensa intervall på unmount
  }, [carImage.length]);

  return (
    <SliderContainer>
      <CarImage
        src={`/${carImage[currentIndex]}.jpg`}
        alt={`Car ${carImage[currentIndex]}`}
      />
    </SliderContainer>
  );
}

const SliderContainer = styled.div`
  width: 73%;
  margin: 2rem auto;
  overflow: hidden;
  border-radius: 15px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
`;

const CarImage = styled.img`
  width: 100%;
  object-fit: cover;
  transition: opacity 0.5s ease-in-out;
`;
