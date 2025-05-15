import { useEffect, useState } from "react";

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
    }, [user]);

    return (
        <>
            <h2>Hej {user.name}</h2>
            <p>
                <strong>Uppgifter:</strong><br />
                Namn: {user.name}<br />
                Efternamn: {user.lastName}<br />
                E-post: {user.email}<br />
                Adress: {user.address}
            </p>

            <h2>Mina bokningar</h2>
            {bookings.length > 0 ? (
                bookings.map((b, index) => (
                    <div key={index}>
                        <p><strong>Bil:</strong> {b.car.brand} {b.car.model}</p>
                        <p><strong>Från:</strong> {b.startDate}</p>
                        <p><strong>Till:</strong> {b.endDate}</p>
                        <hr />
                    </div>
                ))
            ) : (
                <p>Inga bokningar hittades.</p>
            )}
        </>
    );
}
