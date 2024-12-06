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
    let newUser = {};
    for(let att of attributes){
        newUser[att] = formData.get(att);
    }

    // Vérifie si l'email est déjà enregistré
    fetch("http://localhost:3500/api/user/user/exists/",{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            'Accept':"application/json",
        },
        body:JSON.stringify(newUser)
    })
    .then(response=>response.json())
    .then(data=>{
        if(data.email != undefined){
            if(data.admin == 1)alert("You're not supposed to use that mail !");
            else alert("This account already exists !");
            document.querySelector("input[type=email]").value = "";
            document.querySelector("input[type=password]").value = "";
            return;
        }
        else{
            //Insère l'utilisateur dans la base de données
            fetch("http://localhost:3500/api/user/",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                    'Accept':"application/json",
                },
                body:JSON.stringify(newUser)
            })
            .then(response=>response.json())
            .then(data=>{
                console.log(data);
                let today = new Date();
                let year = today.getFullYear().toString();
                let month = (today.getMonth() + 1 < 10 ? "0" : "") + (today.getMonth()+1).toString();
                let day = (today.getDate() + 1 < 10 ? "0" : "") + today.getDate().toString();
                newUser.date = year+"-"+month+"-"+day;

                //Génère un token
                fetch("http://localhost:3500/api/user/single/",{
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json",
                        'Accept':"application/json",
                    },
                    body:JSON.stringify(newUser)
                })
                .then(response=>response.json())
                .then(data=>{
                    if(data.token === undefined || data.error)
                    {
                        alert("User not recognized");
                        document.querySelector("input[type=password]").value = "";
                        document.querySelector("input[type=email]").value = "";
                        throw new Error("User not found");
                    }
                    else{
                        sessionStorage.setItem("data",JSON.stringify(data));
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
            .catch(error=>{console.error("error ",error)});
        }
    })
    .catch(error=>{console.error("error ",error)});
})