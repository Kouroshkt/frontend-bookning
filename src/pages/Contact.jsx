import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import styled from 'styled-components';
import L from 'leaflet';

export function Contact() {
    return (
        <>
            <MapContainer center={[59.3111, 18.0686]} zoom={5.5} scrollWheelZoom={false} style={{ height: '500px', width: '100%' }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
                />
                {branches.map((branch) => (
                    <Marker key={branch.city} position={branch.position} icon={redIcon}>
                        <Popup>
                            <strong>{branch.city}</strong><br />
                            {branch.address}<br />
                            Tel: {branch.phone}
                        </Popup>
                    </Marker>
                ))}

            </MapContainer>


            <AdressSection>
                {branches.map((branch) => (
                    <AdressCard key={branch.city}>
                        <h3>{branch.city}</h3>
                        <p><strong>Adress:</strong> {branch.address}</p>
                        <p><strong>Telefon:</strong> {branch.phone}</p>
                        <p><strong>Öppettider:</strong><br />
                            {branch.hours}
                        </p>
                    </AdressCard>
                ))}
            </AdressSection>
        </>
    );
}
const redIcon = new L.Icon({
    iconUrl: '/icons/marker-icon-red.png',
    shadowUrl: '/icons/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});
const branches = [
    {
        city: "Stockholm",
        address: "\nStockholmsgatan 11\n 123 45 Stockholm",
        phone: "0123652685",
        hours: `Mån-Fre: 07:00–18:00\nLör: 09:00–13:00\nSön: Stängt\nGäller: 2025-04-23 – 2040-12-31`,
        position: [59.3293, 18.0686]
    },
    {
        city: "Malmö",
        address: "\nGamlamalmgatan 5\n 123 45 Malmö",
        phone: "0223650681",
        hours: `Mån-Fre: 07:00–18:00\nLör: 09:00–13:00\nSön: Stängt\nGäller: 2025-04-23 – 2040-12-31`,
        position: [55.6050, 13.0038]
    },
    {
        city: "Göteborg",
        address: "\nFörstamajgatan 7\n 123 45 Göteborg",
        phone: "0315456847",
        hours: `Mån-Fre: 07:00–18:00\nLör: 09:00–13:00\nSön: Stängt\nGäller: 2025-04-23 – 2040-12-31`,
        position: [57.7089, 11.9746]
    },
    {
        city: "Uppsala",
        address: "\nAndragatan 24\n 123 45 Uppsala",
        phone: "013652600",
        hours: `Mån-Fre: 07:00–18:00\nLör: 09:00–13:00\nSön: Stängt\nGäller: 2025-04-23 – 2040-12-31`,
        position: [59.8586, 17.6389]
    },
    {
        city: "Lund",
        address: "\nKungsgatan 14\n 123 45 Lund",
        phone: "0365894896",
        hours: `Mån-Fre: 07:00–18:00\nLör: 09:00–13:00\nSön: Stängt\nGäller: 2025-04-23 – 2040-12-31`,
        position: [55.7047, 13.1910]
    }
];




const AdressSection = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    padding: 2rem;
    background-color: #f9f9f9;
`;

const AdressCard = styled.div`
    background-color: white;
    padding: 1.5rem;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.08);
    line-height: 1.6;

    h3 {
        margin-bottom: 0.5rem;
        color: #333;
    }

    p {
        font-size: 0.95rem;
        white-space: pre-line;
        color: #555;
    }
`;
