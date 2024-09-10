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
    fetch("http://localhost:3500/api/post/")
    .then(response=>response.json())
    .then(async data=>{
        console.log(data);
        for(let post of data){
            let request1 = await fetch("http://localhost:3500/api/user/user/"+post.UserId);
            let dataUser = await request1.json();

            let request2 = await fetch("http://localhost:3500/api/comment/list",{method:"POST",headers:{"Content-Type":"application/json","Accept":"application/json",},body:JSON.stringify({id:post.id})});
            let dataComment = await request2.json();
            console.log(dataComment);
            let commentHTML = "";
            for(let comment of dataComment){
                
                let request3 = await fetch("http://localhost:3500/api/user/user/"+comment.UserId);
                let commentUser = await request3.json();

                commentHTML += `
                    <div class="comment flex flex-col justify-around items-center">
                            <h2 class="text-left">${commentUser.email}</h2>
                            <p class="text-xs">${comment.value}</p>
                    </div>
                `;
            }

            let newPost = `
                <div class="post p-3 shadow-xl rounded-lg border-black border border-opacity-10 min-w-32 text-center flex flex-col gap-4">
                    <h2 class="text-left">${dataUser.email}</h2>
                    <strong class="text-center">${post.date}</strong>
                    <img src="${post.image}" alt="">
                    <p class="text-left">${post.texte}</p>
                    <div class="comments flex flex-col justify-start items-center overflow-x-hidden overflow-y-scroll max-h-32 gap-2">
                        ${commentHTML}
                    </div>
                    <div class="buttons flex justify-center items-center text-xs gap-2">
                        <button type="button" class="bg-yellow-300 p-2 rounded-md hover:font-bold hover:bg-white transition duration-300 ease-in-out">Comment</button>
                        <a href="edit_post_admin.html"><button class="editBtn bg-green-300 p-1.5 rounded-lg hover:font-bold hover:bg-white transition duration-300 ease-in-out">Modifier post</button></a>
                        <button class="deleteBtn bg-red-300 p-1.5 rounded-lg hover:font-bold hover:bg-white transition duration-300 ease-in-out">Supprimer post</button>
                    </div>
                </div>
            `;
            document.querySelector(".posts").innerHTML += newPost;
        }
    })
    .catch(error=>console.error("Error: ",error));
}