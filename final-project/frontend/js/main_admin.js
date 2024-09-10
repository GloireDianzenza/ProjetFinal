const url = new URL(window.location);
const searchParam = url.searchParams;
const id = searchParam.get("id");
if(id == null || id.trim() == '')window.location = "index.html";
let currentUser;

async function define(){
    let request = await fetch("http://localhost:3500/api/user/user/"+id);
    let data = await request.json();
    return data;
}

define().then(data=>{
    currentUser = data;
})
.then(async ()=>{
    // console.log(currentUser);
    let request = await fetch("http://localhost:3500/api/user/admin");
    let data = await request.json();
    for(let admin of data){
        if(admin.id == currentUser.id){
            getPosts();
            return;
        }
    }
    window.location = "index.html";
})

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
})

async function getPosts() {
    console.log("ss");
}