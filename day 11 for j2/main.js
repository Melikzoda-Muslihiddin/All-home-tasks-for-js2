const api = "https://6991ca7c6279728b01555696.mockapi.io/users"
const box = document.querySelector(".box")
const Form = document.querySelector('.Form');

async function GetUser(){
    try{
        let resonse = await fetch(api)
        let data = await resonse.json()
        showUser(data)
    }catch(error){
        console.error(error)
    }
}

function showUser(data = []){
    box.innerHTML = ""
    data?.forEach(el => {
        let h2 = document.createElement("h2")
        let p1 = document.createElement("p")
        let img1 = document.createElement("img")
        h2.innerHTML = el.name
        p1.innerHTML = el.Age
        img1.innerHTML = el.avatar
        box.append(h2,p1,img1)
    });
}   
GetUser()