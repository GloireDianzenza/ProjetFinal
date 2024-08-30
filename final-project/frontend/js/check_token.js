fetch("http://localhost:3500/api/user/user/token/validate")
.then(response=>response.json())
.then(data=>{
    console.log(data)
    if(data.error){
         window.location = "index.html"
    }
})
.catch(error=>{
    console.error("Error: ",error);
    window.location = "index.html"
})