import { users } from "./type";
const api: string = "http://localhost:3001/users";

let box: HTMLElement | null = document.querySelector(".box");
let onModal = document.querySelector<HTMLButtonElement>(".onModal");
let addModal: HTMLElement | null = document.querySelector(".addModal");
let addForm: HTMLElement | null = document.querySelector(".addForm");
let addUser: HTMLElement | null = document.querySelector(".addUser");
let offModal: HTMLElement | null = document.querySelector(".offModal");

onModal.onclick = () => {
    addModal?.showModal()
}
offModal.onclick=()=>{
    addModal?.close()
}

async function getUsers() {
  try {
    let { data: users }:users = await axios.get();
    return data;
  } catch (error) {
    console.error(error);
  }
}
 async function init() {
    let data = await getUsers()
 }
 init()