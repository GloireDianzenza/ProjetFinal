const form = document.querySelector("form");
const submit = document.querySelector("input[type=submit]");

form.addEventListener("submit",(event)=>{
    event.preventDefault();
    let formData = new FormData(form,submit);
    let attributes = ["email","password"];
    let password = formData.get("password");
    if(password.trim().length < 4){
        alert("The password must be at least 4 characters");
        document.querySelector("input[type=password]").value = "";
        return;
    }

    let user = {};
    for(let att of attributes){
        user[att] = formData.get(att);
    }
    
    fetch("http://localhost:3500/api/user/single/",{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            'Accept':"application/json",
        },
        body:JSON.stringify(user)
    })
    .then(response=>response.json())
    .then(data=>{
        if(data.id == undefined)
        {
            throw new Error("User not found");
        }
        else{
            if(data.admin == 1){
                window.location = 'accueil_admin.html?id='+data.id;
            }
            else{
                window.location = 'accueil.html?id='+data.id;
            }
        }
    })
    .catch(error=>{
        console.error("error ",error);
    })
})