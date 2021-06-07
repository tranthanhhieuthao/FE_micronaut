import axios from "axios"


function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  else return ""
}
export default axios.create({
    baseURL: 'http://localhost:8080/',
    timeout: 1000,
    headers:{
      'Content-Type':'application/json',
                  'Acess-Control-Allow-Origin':'*',
                  'Authorization':`Bearer ${ getCookie("token")}`,
                  'Accept': "application/json"
      }
  });