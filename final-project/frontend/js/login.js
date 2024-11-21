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
    
    //Recherche l'utilisateur via les données du formulaire
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
            alert("User not recognized");
            document.querySelector("input[type=password]").value = "";
            document.querySelector("input[type=email]").value = "";
            throw new Error("User not found");
        }
        else{

                let today = new Date();
                let year = today.getFullYear().toString();
                let month = (today.getMonth() + 1 < 10 ? "0" : "") + (today.getMonth()+1).toString();
                let day = (today.getDate() + 1 < 10 ? "0" : "") + today.getDate().toString();

            //Génère un token
            fetch("http://localhost:3500/api/user/user/token/generate",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                    'Accept':"application/json",
                },
                body:JSON.stringify({id:data.id,date:year+"-"+month+"-"+day})
            })
            .then(response=>response.json())
            .then(data2=>{
                console.log(data2);

                if(data.admin == 1){
                    window.location = 'accueil_admin.html?id='+data.id;
                }
                else{
                    window.location = 'accueil.html?id='+data.id;
                }
            })
            .catch(error=>{
                throw new Error(error);
            })
        }
    })
    .catch(error=>{
        console.error("error ",error);
    })
})