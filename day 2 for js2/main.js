// let btn = document.querySelector(".btn")
// let allBtn = document.querySelectorAll(".btn")
// console.log(allBtn);
// allBtn.forEach((el,i)=>{
//     el.innerHTML = "ON" + (i+1)
//     el.onclick = () =>{
//         if(el.innerHTML = ("ON") + (1 + i)){
//             el.innerHTML = "OFF" + (1 + i)
//         }
//         else{
//             el.innerHTML = "ON" + (i+1)
//         }
//     }
// })
// console.log(btn);

let btn = document.querySelector(".btn")
let img2 = document.querySelector(".img2")
btn.onclick = () => {
    if(img2.alt == "OFF"){
        img2.src = "./photo1.jpg"
        btn.innerHTML = "OFF"
        img2.alt = "ON"
    }
    else{
        img2.src = "./ph2.jpg"
        btn.innerHTML = "ON"
        img2.alt = "OFF"
    }
}

// const all = document.querySelector(".all");
// all.style.width = "700px";
// all.style.height = "400px";
// all.style.background = "rgb(148, 71, 0)";
// all.style.borderRadius = "30px";
// all.style.margin = "auto"

// const gr = document.querySelector(".gr")
// gr.style.background = "white"
// gr.style.borderRadius = "100px"
// gr.style.lineHeight = "1px"
// gr.style.padding = "10px"
// gr.style.width = "85px"
// gr.style.marginTop = "30px"
// gr.style.margin = "30px"
// gr.style.display = "flex"


// const i = document.querySelector(".i")
// i.style.color = "rgb(148, 71, 0)"