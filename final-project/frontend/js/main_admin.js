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
            return;
        }
    }
    window.location = "index.html";
})