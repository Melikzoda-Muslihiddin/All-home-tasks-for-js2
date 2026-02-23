



const btnBodyModeDark = document.querySelector('.btnBodyModeDark');
const btnBodyModeLight = document.querySelector('.btnBodyModeLight');
const body = document.querySelector('.body');

btnBodyModeDark.onclick = () =>{
    body.style.backgroundColor = "black"
    body.style.color = "white"
}
btnBodyModeLight.onclick = () =>{
    body.style.backgroundColor = "white"
    body.style.color = "black"
}