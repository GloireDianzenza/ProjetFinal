fetch("http://localhost:3500/api/user/user/token/validate/"+new URL(window.location).searchParams.get("id"))
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

//Opération pour vérifier le token renseigné dans .env