const url = new URL(window.location);
const searchParam = url.searchParams;
const id = searchParam.get("id");
if(id == null || id.trim() == '')window.location = "index.html";
let currentUser;
const re = /(?:\.([^.]+))?$/;

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

document.getElementById("return").addEventListener("click",()=>{
    window.location = "./accueil.html?id="+id;
})

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
    else if(ext === undefined || ext !== "gif")return;

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
        
        
    })
    .catch(error=>{
        console.error("Error: ",error);
        window.location = "index.html";
    })
})

previewBtn.addEventListener("click",()=>{
    let ext = re.exec(imgInput.value)[1];
    if(ext === undefined || ext !== "gif")return;
    previewImg.src = imgInput.value;
})