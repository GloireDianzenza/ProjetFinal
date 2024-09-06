const url = new URL(window.location);
const searchParam = url.searchParams;
const id = searchParam.get("id");const postID = searchParam.get("post");
if(id == null || id.trim() == '' || postID == null || postID.trim() == '')window.location = "index.html";
let currentUser,currentPost;

async function define(){
    let request = await fetch("http://localhost:3500/api/user/user/"+id);
    let data = await request.json();
    request = await fetch("http://localhost:3500/api/post/"+postID);
    let data2 = await request.json();
    return [data,data2];
}

define().then(lst=>{
    currentUser = lst[0];
    currentPost = lst[1];
})
.then(()=>{
    console.log(currentUser,currentPost);
    if(currentUser.error || currentPost.error){
        window.location = "index.html";
    }
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
});

document.getElementById("return").addEventListener("click",()=>{
    window.location = "accueil.html?id="+id;
})

let form = document.querySelector("form");
let submitter = document.querySelector("input[type=submit]");

form.addEventListener("submit",(event)=>{
    event.preventDefault();
    let formData = new FormData(form,submitter);
    let keys = ["UserId","PostId","value"];
    formData.set("UserId",id);
    formData.set("PostId",postID);
    if(formData.get("value") == undefined || formData.get("value") == null  || formData.get("value").trim() === ""){
        return;
    }
    
    let newComment = {};
    for(let k of keys){
        newComment[k] = formData.get(k);
    }
    
    fetch("http://localhost:3500/api/comment/",{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            'Accept':"application/json",
        },
        body:JSON.stringify(newComment)
    })
    .then(response=>response.json())
    .then(data=>{
        console.log(data);
        window.location = "accueil.html?id="+id;
    })
    .catch(error=>{
        console.log(error);
    })
})