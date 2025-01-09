import { useEffect, useState } from "react";
import { fetchAllCar , fetchCategories, fetchCities} from "../API";
export function useFetchData() {
    const [allCars, setCars] = useState([]);
    const [cities, setCities] = useState([]);
    const [categories , setCategories] = useState([]);
    async function fetchData() {
        try {
            const carsData = await fetchAllCar();
            const citiesData = await fetchCities();
            const categoriesData = await fetchCategories();
            setCars(carsData);
            setCities(citiesData);
            setCategories(categoriesData)

        } catch {
            console.error('Error fetching data:');
        }
    }
    useEffect(() => {
        fetchData();
    }, []);
    return {allCars , cities ,categories};
}