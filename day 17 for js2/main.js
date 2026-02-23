let API ='https://6991ca7c6279728b01555696.mockapi.io/users'
let box=document.querySelector(".box")
let indoDilaog = document.querySelector(".indoDilaog")
let closeInfo = document.querySelector(".closeInfo")
async function getUsers() {
    try {
        let response=await axios.get(API)
        showUsers(response.data)
    } catch (error) {
        console.log(error)
    }
}


closeInfo.onclick = ()=>{
    indoDilaog.close()
}

function showUsers(users){
users.forEach(el=> {
    let tr=document.createElement("tr")
    let tdAvatar=document.createElement("img")
    let tdName=document.createElement("td")
    let tdDate=document.createElement("td")
    let tdRole=document.createElement("td")
    let tdStatus=document.createElement("td")
    let tdActions=document.createElement("td")
    let deleteBtn=document.createElement("button")
   let  infoBtn=document.createElement("button")
    let editBtn=document.createElement("button")
    tdAvatar.src=el.avatar
    tdAvatar.style.width="80px"
    tdName.innerHTML=el.name
tdDate.innerHTML=el.date
tdRole.innerHTML=el.role
tdStatus.innerHTML=el.status?"active":"inactive"
tdStatus.style.color=el.status?"green":"red"
deleteBtn.innerHTML="🗑️"
editBtn.innerHTML="✒️"
infoBtn.innerHTML="ℹ️"
infoBtn.onclick= ()=>{
    indoDilaog.show()
}
deleteBtn.classList.toggle("del")
editBtn.classList.toggle("edit")
infoBtn.classList.toggle("info")

tdActions.append(deleteBtn,editBtn,infoBtn)
tr.append(tdAvatar,tdName,tdDate,tdRole,tdStatus,tdActions)
box.append(tr)
});
}

getUsers()