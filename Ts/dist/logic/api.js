import { ShowCategory, PopularLaptop, initLaptops } from "./dom.js";
const API_category = "http://localhost:3001/category";
const API_popular = "http://localhost:3001/popular";
const API_laptop = "http://localhost:3001/products";
export async function GetCategory() {
    try {
        const response = await axios.get(API_category);
        return response.data;
    }
    catch (error) {
        console.error(error);
    }
}
export async function GetPopular() {
    try {
        const response = await axios.get(API_popular);
        return response.data;
    }
    catch (error) {
        console.error(error);
    }
}
export async function GetLaptop() {
    try {
        const response = await axios.get(API_laptop);
        return response.data;
    }
    catch (error) {
        console.error(error);
    }
}
export async function appendData() {
    const data = await GetCategory();
    ShowCategory(data);
}
export async function appendPopularData() {
    const data = await GetPopular();
    PopularLaptop(data);
}
export async function appendLaptopData() {
    const data = await GetLaptop();
    initLaptops(data); 
}
