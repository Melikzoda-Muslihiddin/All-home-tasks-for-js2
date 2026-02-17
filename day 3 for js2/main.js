// Task 1

let btn = document.querySelector(".btn")
let all = document.querySelector(".all")
let arr = ["red","blue","green","yellow","gray"]
arr.forEach((el,i)=>{
    btn.onclick = () =>{
        el = arr[Math.floor(Math.random()*arr.length)]
        all.style.backgroundColor = el
    }
})

// Task 2

let but1 = document.querySelector(".but1")
let inp = document.querySelector(".inp")

but1.onclick = () =>{
    alert(inp.value**2)
}

// Task 3

let all3 = document.querySelector(".all3")
let but2 = document.querySelector(".but2")
let a = "on"
but2.onclick = () =>{
    if(a=="on"){
        all3.style.backgroundColor = "black"
        a="off"
    }
    else if(a=="off"){
        all3.style.backgroundColor = "white"
        a="on"
    }
}

// Task 4

let but01 = document.querySelector(".but01")
let but0 = document.querySelector(".but0")
let score = document.querySelector(".score")
let cnt = 0
but01.onclick = () =>{
    cnt++
    score.innerHTML=cnt
}
but0.onclick = () =>{
    cnt = 0
    score.innerHTML=cnt
}