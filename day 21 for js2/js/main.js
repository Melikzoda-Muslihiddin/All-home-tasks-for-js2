import { showData, setToggleHandler } from "./dom.js";

const api = "http://localhost:3001/data";
let state = [];

export async function getData() {
  try {
    const { data } = await axios.get(api);
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function appendData() {
  state = await getData();
  showData(state);
}

export async function checkData(obj) {
  try {
    await axios.put(`${api}/${obj.id}`, obj);
  } catch (error) {
    console.error(error);
  }
}

setToggleHandler(async (id, checked) => {
  const user = state.find((el) => String(el.id) === String(id));
  if (!user) return;

  const updated = { ...user, status: checked };
  await checkData(updated);
  await appendData();
});

appendData();
