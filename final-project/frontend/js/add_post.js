const url = new URL(window.location);
const searchParam = url.searchParams;
const id = searchParam.get("id");
if(id == null || id.trim() == '')window.location = "index.html";
let currentUser;
const re = /(?:\.([^.]+))?$/;


//Vérifier si le bon utilisateur est connecté, sinon sortie immédiate
async function define(){
    let request = await fetch("http://localhost:3500/api/user/user/"+id);
    let data = await request.json();
    return data;
}

define().then(data=>{
    currentUser = data;
})
.then(()=>{
    console.log(currentUser);
    if(currentUser.error){
        window.location = "index.html";
    }
});

//Déconnexion
logout.addEventListener("click",()=>{
    fetch("http://localhost:3500/api/user/reset",{
        method:"PUT",
        headers:{
            "Content-Type":"application/json",
            'Accept':"application/json",
        }
    })
    .then(response=>response.json())
    .then(data=>{
        console.log(data);
        window.location = "index.html";
    })
});

//Bouton retour
document.getElementById("return").addEventListener("click",()=>{
    window.location = "./accueil.html?id="+id;
})

//Récupérer l'id de l'utilisateur, générer la date d'aujourd'hui et la convertir en texte, ensuite récupérer le texte et l'image pour le nouveau post avant d'envoyer le tout dans la base de données
let userID = parseInt(id);
let currentDate = new Date();
let newDate = currentDate.getFullYear().toString()+"-"+((currentDate.getMonth()+1 < 10 ? "0" : "") + (currentDate.getMonth()+1)).toString()+"-"
+((currentDate.getDate() < 10 ? "0" : "") + (currentDate.getDate())).toString();
let form = document.querySelector("form");
let submitter = document.querySelector("input[type=submit]");

form.addEventListener("submit",(event)=>{
    event.preventDefault();
    let text = txtInput.value;
    let img = imgInput.value;
    let ext = re.exec(img)[1];
    if((ext === undefined || ext !== "gif") && text.trim() === "")return;
    else if((ext === undefined || ext !== "gif") && img.trim() !== "")return;
    //N'accapter que les gif
    //Return déclenché si (l'image n'est pas sous forme gif et texte vide) ou (image pas gif et input image non vide)

    //Récupérer données utilisateur actuel
    fetch("http://localhost:3500/api/user/user/"+id)
    .then(response=>response.json())
    .then(data=>{
        mail.value = data.email;
        let formData = new FormData(form,submitter);
        let keys = ["email","texte","image"];
        let newPost = {};
        for(let k of keys){
            newPost[k] = formData.get(k);
        }
        newPost.date = newDate;
        
        //Ajout du post
        fetch("http://localhost:3500/api/post/",{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                'Accept':"application/json",
            },
            body:JSON.stringify(newPost)
        })
        .then(response=>response.json())
        .then(data=>{
            console.log(data);
            window.location = "accueil.html?id="+id;
        })
    })
    .catch(error=>{
        console.error("Error: ",error);
        window.location = "index.html";
    })
})

//Remplit l'image avec le texte de l'input
previewBtn.addEventListener("click",()=>{
    let ext = re.exec(imgInput.value)[1];
    if(ext === undefined || ext !== "gif")return;
    previewImg.src = imgInput.value;
})