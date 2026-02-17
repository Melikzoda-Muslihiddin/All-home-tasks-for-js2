const button = document.querySelector('.button');
const massage = document.querySelector('.massage');
let arrive = false
let promise = new Promise((resolve,reject)=>{
    if(Math.random<0.5){
        resolve("Success")
    }
    else if(Math.random>0.49){
        reject("Failed")
    }
})

button.onclick = () => {
    promise
    .then((value)=>{
        massage.innerHTML = value
    })
    .catch((value)=>{
        massage.innerHTML = value
    })
}

let clock = document.querySelector(".clock")
setInterval(()=>{
    let date = new Date()
    clock.innerHTML = date.toLocaleTimeString()
},1000)     