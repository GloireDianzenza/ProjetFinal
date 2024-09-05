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
    fetch("http://localhost:3500/api/post/user",{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            'Accept':"application/json",
        },
        body:JSON.stringify({email:currentUser.email})
    })
    .then(response=>response.json())
    .then(data=>{
        for(let post of data){
            let dateSplit = post.date.split("-");
            let year = parseInt(dateSplit[0]);
            let month = parseInt(dateSplit[1])-1;
            let day = parseInt(dateSplit[2]);
            
            let currentDate = new Date(year,month,day);
            post.dateAlt = currentDate;
        }
        data.sort((a,b)=>{
            return b.dateAlt - a.dateAlt;
        });
        data.sort((a,b)=>{
            return b.dateAlt - a.dateAlt;
        });
        
        for(let post of data){
            console.table(post);
            let newPost = `
                <div class="post p-3 shadow-xl rounded-lg border-black border border-opacity-10 min-w-32 text-center">
                    <input type="hidden" name="PostId" value="${post.id}">
                    <h2 class="text-left">${currentUser.email}</h2>
                    <strong class="text-center">${post.date}</strong>
                    <img src="${post.image != null ? post.image : ""}" class="w-80 h-auto">
                    <p class="text-left">${post.texte != null ? post.texte : ""}</p>
                    <div class="buttons">
                        <a href="edit_post.html"><button class="editBtn bg-green-300 p-1.5 rounded-lg hover:font-bold hover:bg-white transition duration-300 ease-in-out">Modifier post</button></a>
                        <button class="deleteBtn bg-red-300 p-1.5 rounded-lg hover:font-bold hover:bg-white transition duration-300 ease-in-out">Supprimer post</button>
                    </div>
                </div>
            `;
            document.querySelector(".posts").innerHTML += newPost;
        }

        document.querySelectorAll(".editBtn").forEach((val,index)=>{
            val.parentNode.href += "?id=" + id + "&post="+val.parentNode.parentNode.parentNode.getElementsByTagName("input")[0].value;
        })
        
        document.querySelectorAll(".deleteBtn").forEach((val,index)=>{
            val.addEventListener("click",()=>{
                let postID = val.parentNode.parentNode.getElementsByTagName("input")[0].value;
                postID = parseInt(postID);
                
                if(window.confirm("Do you really wanna delete this post ?")){
                    fetch("http://localhost:3500/api/post",{
                        method:"DELETE",
                        headers:{
                            "Content-Type":"application/json",
                            'Accept':"application/json",
                        },
                        body:JSON.stringify({id:postID})
                    })
                    .then(response=>response.json())
                    .then(data=>{
                        console.log(data);
                        window.location = "your_posts.html?id="+id;
                    })
                    .catch(error=>{
                        console.error("Error: ",error);
                    })
                }
            })
        });
    })
    .catch(error=>{
        console.error("Error: ",error);
        document.querySelector(".posts").innerHTML = "";
    });


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