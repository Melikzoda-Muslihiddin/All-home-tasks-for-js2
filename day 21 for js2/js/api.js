import {showData} from "./dom.js"

const api = "http://localhost:3001/data"

export async function getData(){
    try {
        const {data} = await axios.get(api)
        return data
    } catch (error) {
        console.error(error);
    }
}
export async function appendData() {
    let data = await getData()
    console.log(data);
    showData(data)
}
export async function checkData(obj) {
    try {
        await axios.put(`${api}/${obj.id}`,obj)
    } catch (error) {
        console.error(error);
    }
}