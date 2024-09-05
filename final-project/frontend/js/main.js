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
.then(()=>{
    console.log(currentUser);
    if(currentUser.error){
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

async function getPosts(){
    let request = await fetch("http://localhost:3500/api/post/");
    let result = await request.json();
    for(let post of result){
        let dateSplit = post.date.split("-");
        let year = parseInt(dateSplit[0]);
        let month = parseInt(dateSplit[1])-1;
        let day = parseInt(dateSplit[2]);
        
        let currentDate = new Date(year,month,day);
        post.dateAlt = currentDate;
    }
    result.sort((a,b)=>{
        return b.dateAlt - a.dateAlt;
    });
    result.sort((a,b)=>{
        return b.dateAlt - a.dateAlt;
    });
    console.log(result);
    
    for(let post of result){
        let userMail = null;

        fetch("http://localhost:3500/api/user/user/"+post.UserId)
            .then(response=>response.json())
            .then(data2=>{
                userMail = data2.email;

                let newerPost = `
                    <h2 class="text-left">${userMail}</h2>
                    <strong class="text-center">${post.date}</strong>
                    <img src="${post.image}" alt="">
                    <p class="text-left">${post.texte != null ? post.texte : ""}</p>
                    </div>
                `;
                let pst = document.createElement("div");
                pst.classList.add("post","p-3","shadow-xl","rounded-lg","border-black","border-opacity-10","min-w-60","text-center","flex","flex-col","gap-5");
                pst.innerHTML = newerPost;
                document.querySelector(".posts").appendChild(pst);
            })
            .catch(error=>{
                throw new Error(error);
            });
    }

    newPost.closest("a").href += id;
    viewPosts.closest("a").href += id;
}
getPosts();