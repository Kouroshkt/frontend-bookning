import { useEffect, useState } from "react";
import { fetchAllCar , fetchCategories, fetchCities} from "../API";
export function useFetchData() {
    const [allCars, setCars] = useState([]);
    const [cities, setCities] = useState([]);
    const [categories , setCategories] = useState([]);
    const paymentsOptions=[
        {"id":1,"option":"Betala vid avlämning"},
        {"id":2,"option":"Betala med kort"},
        {"id":3,"option":"Betala med Klarna"}
    ]
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
    return {allCars , cities ,categories,paymentsOptions};
}