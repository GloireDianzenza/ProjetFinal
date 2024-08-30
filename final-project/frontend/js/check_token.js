fetch("http://localhost:3500/api/user/user/token/validate")
.then(response=>response.json())
.then(data=>{
    console.log(data)
})
.catch(error=>{
    console.error("Error: ",error);
})