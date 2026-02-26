const api = "http://localhost:3001/members";

async function getMembers() {
  try {
    const { data } = await axios.get(api);
    return data;
  } catch (error) {
    console.error(error);
  }
}

async function addMember(member) {
  try {
    const { data } = await axios.post(api, member);
    return data;
  } catch (error) {
    console.error(error);
  }
}

async function updateMember(id, member) {
  try {
    const { data } = await axios.put(`${api}/${id}`, member);
    return data;
  } catch (error) {
    console.error(error);
  }
}

async function statusMember(id, patch) {
  try {
    const { data } = await axios.patch(`${api}/${id}`, patch);
    return data;
  } catch (error) {
    console.error(error);
  }
}

async function deleteMember(id) {
  try {
    await axios.delete(`${api}/${id}`);
    return true;
  } catch (error) {
    console.error(error);
  }
}

export { getMembers,addMember,updateMember,statusMember,deleteMember};