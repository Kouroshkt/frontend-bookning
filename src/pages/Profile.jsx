import { useEffect, useState } from "react";
import styled from "styled-components";

export function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    async function fetchBookings() {
      try {
        const response = await fetch(`http://localhost:8080/carbookning/getcarbyuser?userId=${user.id}`);
        if (response.ok) {
          const data = await response.json();
          setBookings(data);
        } else {
          console.error("Fel vid hämtning av bokningar");
        }
      } catch (error) {
        console.error("Nätverksfel:", error);
      }
    }

    if (user?.id) {
      fetchBookings();
    }
  }, []);

  return (
    <Container>
      <Header>Hej {user.name}</Header>

      <ProfileInfo>
        <p><strong>Namn:</strong> {user.name} {user.lastName}</p>
        <p><strong>E-post:</strong> {user.email}</p>
        <p><strong>Adress:</strong> {user.address}</p>
      </ProfileInfo>

      <Header>Mina bokningar</Header>

      {bookings.length > 0 ? (
        <Table>
          <thead>
            <tr>
              <Th>Bil</Th>
              <Th>Från</Th>
              <Th>Till</Th>
              <Th>Pris</Th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b, index) => (
              <tr key={index}>
                <Td>{b.car.brand} {b.car.model}</Td>
                <Td>{b.startDate}</Td>
                <Td>{b.endDate}</Td>
                <Td>{b.car.price} per dag</Td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <NoBookings>Inga bokningar hittades.</NoBookings>
      )}
    </Container>
  );
}
const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  margin-bottom: 100px;
  padding: 2rem;
  font-family: Arial, sans-serif;
`;

const Header = styled.h2`
  color: #2c3e50;
`;

const ProfileInfo = styled.div`
  margin-bottom: 2rem;
  background-color: #f8f9fa;
  padding: 1rem;
  border-radius: 8px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: #ffffff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
`;

const Th = styled.th`
  text-align: left;
  padding: 12px;
  background-color: #007BFF;
  color: white;
`;

const Td = styled.td`
  padding: 12px;
  border-bottom: 1px solid #ddd;
`;

const NoBookings = styled.p`
  color: #888;
  margin-top: 1rem;
`;