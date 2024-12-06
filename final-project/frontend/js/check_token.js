if(!sessionStorage.getItem("data"))window.location = "index.html";
const newData = JSON.parse(sessionStorage.getItem("data"));
const token = newData.token;