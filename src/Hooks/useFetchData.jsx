import { useEffect, useState } from "react";
import { fetchAllCar , fetchCities} from "../API";
export function useFetchData() {
    const [allCars, setCars] = useState([]);
    const [cities, setCities] = useState([]);
    console.log(allCars)
    async function fetchData() {
        try {
            const carsData = await fetchAllCar();
            const citiesData = await fetchCities();
            setCars(carsData);
            setCities(citiesData);

        } catch {
            console.error('Error fetching data:');
        }
    }
    useEffect(() => {
        fetchData();
    }, []);
    return {allCars , cities};
}