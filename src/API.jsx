export async function fetchAllCar() {
    try {
        const response = await fetch('http://localhost:8080/car/getallcar');
        const data = await response.json();
        return data;
    } catch (error) {
        console.log('Error in fetchAllCar: ', error);
        throw error;
    }
}
export async function fetchCities() {
    try {
        const response = await fetch('http://localhost:8080/city/getall');
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.log('Error in fetchCities: ', error);
        throw error;
    }
}
export async function fetchCategories() {
    try {
        const responce = await fetch('http://localhost:8080/category/getall');
        const data = await responce.json();
        return data;
    } catch (error){
        console.log('Error in fetchCategories: ', error);
        throw error;
    }
}