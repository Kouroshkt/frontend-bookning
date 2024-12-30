export async function fetchAllCar() {
    try {
        const response = await fetch('http://localhost:8080/car/getallcar');
        const data = await response.json();
        console.log(data);
        return data;
    } catch(error){
        console.log('Error in fetchAllCar: ',error);
        throw error;
    }
}
export async function fetchCities() {
    try{
        const response = await fetch('http://localhost:8080/city/getall');
        const data= await response.json();
        console.log(data);
        return data;
    }
    catch(error){
        console.log('Error in fetchCities: ',error);
        throw error;
    }
}